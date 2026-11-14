/**
 * No Tax on Tips deduction estimator, IRC 224.
 * Rules checked November 2026, tax years 2025 to 2028.
 *
 * Up to 25000 of qualified tips per return, the same cap for every
 * filing status. Phase out: minus 100 for every 1000 (or fraction
 * of 1000) of MAGI above 150000 single or head of household, or
 * 300000 married filing jointly. Zero at 400000 / 550000.
 * Married filing separately is not eligible. For the self employed,
 * the deduction cannot exceed net income from that business.
 * Payroll taxes still apply. Claimed on Schedule 1-A Part II.
 */

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export type TipsFilingStatus =
  | "single"
  | "headOfHousehold"
  | "marriedFilingJointly"
  | "marriedFilingSeparately";

export const TIPS_CAP = 25000;

export function tipsThreshold(status: TipsFilingStatus): number {
  return status === "marriedFilingJointly" ? 300000 : 150000;
}

export function phaseOutReduction(magi: number, threshold: number): number {
  if (!Number.isFinite(magi) || magi < 0) throw new RangeError("MAGI must be zero or greater.");
  if (magi <= threshold) return 0;
  return Math.ceil((magi - threshold) / 1000) * 100;
}

export interface NoTaxOnTipsInput {
  filingStatus: TipsFilingStatus;
  magi: number;
  annualTips: number;
  marginalRatePercent: number;
  selfEmployed?: boolean;
  /** Required when selfEmployed is true. */
  netIncome?: number;
}

export interface NoTaxOnTipsResult {
  eligible: boolean;
  ineligibleReason: string | null;
  annualTips: number;
  cap: number;
  cappedAmount: number;
  phaseOutReduction: number;
  finalDeduction: number;
  estimatedTaxSaved: number;
  isFullyPhasedOut: boolean;
}

export function calculateNoTaxOnTips(input: NoTaxOnTipsInput): NoTaxOnTipsResult {
  if (!Number.isFinite(input.annualTips) || input.annualTips < 0) {
    throw new RangeError("Annual tips must be zero or greater.");
  }
  if (!Number.isFinite(input.marginalRatePercent) || input.marginalRatePercent < 0 || input.marginalRatePercent > 100) {
    throw new RangeError("Marginal rate must be between 0 and 100 percent.");
  }
  if (!Number.isFinite(input.magi) || input.magi < 0) {
    throw new RangeError("MAGI must be zero or greater.");
  }
  const base = {
    annualTips: round2(input.annualTips),
    cap: TIPS_CAP,
  };
  if (input.filingStatus === "marriedFilingSeparately") {
    return {
      ...base,
      eligible: false,
      ineligibleReason: "Married filing separately filers are not eligible for the tips deduction. Filing jointly is required for married couples to claim it.",
      cappedAmount: 0,
      phaseOutReduction: 0,
      finalDeduction: 0,
      estimatedTaxSaved: 0,
      isFullyPhasedOut: false,
    };
  }
  let cappedAmount = Math.min(round2(input.annualTips), TIPS_CAP);
  if (input.selfEmployed) {
    const net = input.netIncome ?? 0;
    if (!Number.isFinite(net) || net < 0) throw new RangeError("Net income must be zero or greater.");
    cappedAmount = Math.min(cappedAmount, round2(net));
  }
  const reduction = phaseOutReduction(input.magi, tipsThreshold(input.filingStatus));
  const finalDeduction = round2(Math.max(0, cappedAmount - reduction));
  return {
    ...base,
    eligible: true,
    ineligibleReason: null,
    cappedAmount,
    phaseOutReduction: reduction,
    finalDeduction,
    estimatedTaxSaved: round2(finalDeduction * (input.marginalRatePercent / 100)),
    isFullyPhasedOut: cappedAmount > 0 && finalDeduction === 0 && reduction > 0,
  };
}
