/**
 * No Tax on Overtime deduction estimator, IRC 225.
 * Rules checked November 2026, tax years 2025 to 2028.
 *
 * Only the premium half of time and a half counts: overtime hours
 * times 0.5 times the regular rate, and only for overtime the FLSA
 * requires (hours over 40 in a week for most workers).
 * Cap: 12500 single, 25000 married filing jointly.
 * Phase out: minus 100 for every 1000 (or fraction of 1000) of MAGI
 * above 150000 single or 300000 joint. Zero at 275000 / 550000.
 * The deduction sits on top of the standard deduction, is claimed
 * on Schedule 1-A, and married filers must file jointly. Overtime
 * pay itself is still taxed for withholding and FICA purposes.
 */

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export type OvertimeFilingStatus = "single" | "marriedFilingJointly";

export const OVERTIME_CAP: Record<OvertimeFilingStatus, number> = {
  single: 12500,
  marriedFilingJointly: 25000,
};

export const OVERTIME_THRESHOLD: Record<OvertimeFilingStatus, number> = {
  single: 150000,
  marriedFilingJointly: 300000,
};

export function qualifiedPremiumFromHours(input: {
  hourlyRate: number;
  overtimeHoursPerWeek: number;
  weeksPerYear: number;
}): number {
  const { hourlyRate, overtimeHoursPerWeek, weeksPerYear } = input;
  if (![hourlyRate, overtimeHoursPerWeek, weeksPerYear].every((n) => Number.isFinite(n) && n >= 0)) {
    throw new RangeError("Rate, hours and weeks must be zero or greater.");
  }
  return round2(overtimeHoursPerWeek * weeksPerYear * 0.5 * hourlyRate);
}

export function phaseOutReduction(magi: number, threshold: number): number {
  if (!Number.isFinite(magi) || magi < 0) throw new RangeError("MAGI must be zero or greater.");
  if (magi <= threshold) return 0;
  const steps = Math.ceil((magi - threshold) / 1000);
  return steps * 100;
}

export interface NoTaxOnOvertimeInput {
  filingStatus: OvertimeFilingStatus;
  magi: number;
  /** Annual qualified overtime premium in dollars. */
  qualifiedPremium: number;
  marginalRatePercent: number;
}

export interface NoTaxOnOvertimeResult {
  qualifiedPremium: number;
  cap: number;
  cappedAmount: number;
  phaseOutReduction: number;
  finalDeduction: number;
  estimatedTaxSaved: number;
  isFullyPhasedOut: boolean;
}

export function calculateNoTaxOnOvertime(input: NoTaxOnOvertimeInput): NoTaxOnOvertimeResult {
  if (!Number.isFinite(input.qualifiedPremium) || input.qualifiedPremium < 0) {
    throw new RangeError("Qualified premium must be zero or greater.");
  }
  if (!Number.isFinite(input.marginalRatePercent) || input.marginalRatePercent < 0 || input.marginalRatePercent > 100) {
    throw new RangeError("Marginal rate must be between 0 and 100 percent.");
  }
  const cap = OVERTIME_CAP[input.filingStatus];
  const threshold = OVERTIME_THRESHOLD[input.filingStatus];
  const cappedAmount = Math.min(round2(input.qualifiedPremium), cap);
  const reduction = phaseOutReduction(input.magi, threshold);
  const finalDeduction = round2(Math.max(0, cappedAmount - reduction));
  return {
    qualifiedPremium: round2(input.qualifiedPremium),
    cap,
    cappedAmount,
    phaseOutReduction: reduction,
    finalDeduction,
    estimatedTaxSaved: round2(finalDeduction * (input.marginalRatePercent / 100)),
    isFullyPhasedOut: cappedAmount > 0 && finalDeduction === 0 && reduction > 0,
  };
}
