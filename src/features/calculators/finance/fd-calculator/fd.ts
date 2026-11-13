/**
 * FD (Fixed Deposit) calculator logic.
 *
 * Indian banks compound fixed deposits quarterly by default, so quarterly
 * is the default frequency here. Maturity uses the standard compound
 * interest formula:
 *
 * A = P * (1 + r / (100 * n)) ^ (n * t)
 * where n is the number of compounding periods per year and t is years.
 */

export type CompoundingFrequency = "yearly" | "half-yearly" | "quarterly" | "monthly";

export const COMPOUNDING_PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  yearly: 1,
  "half-yearly": 2,
  quarterly: 4,
  monthly: 12,
};

export interface FdInput {
  /** Deposit amount. Must be greater than zero. */
  principal: number;
  /** Annual interest rate in percent, for example 6.8 means 6.8%. */
  annualRatePercent: number;
  /** Tenure in years. Fractions are allowed, for example 2.5 years. */
  years: number;
  /** How often interest is compounded. Defaults to quarterly. */
  compounding?: CompoundingFrequency;
}

export interface FdResult {
  principal: number;
  maturityValue: number;
  totalInterest: number;
  /** The yearly growth rate equivalent to the chosen compounding. */
  effectiveAnnualRatePercent: number;
  compounding: CompoundingFrequency;
}

export const MAX_FD_YEARS = 50;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateFd(input: FdInput): FdResult {
  const compounding: CompoundingFrequency = input.compounding ?? "quarterly";
  if (!Number.isFinite(input.principal) || input.principal <= 0) {
    throw new RangeError("Principal must be a positive number.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (!Number.isFinite(input.years) || input.years <= 0 || input.years > MAX_FD_YEARS) {
    throw new RangeError(`Tenure must be greater than 0 and at most ${MAX_FD_YEARS} years.`);
  }

  const n = COMPOUNDING_PERIODS_PER_YEAR[compounding];
  const maturityValue = round2(
    input.principal * Math.pow(1 + input.annualRatePercent / 100 / n, n * input.years),
  );
  const effectiveAnnualRatePercent =
    (Math.pow(1 + input.annualRatePercent / 100 / n, n) - 1) * 100;

  return {
    principal: input.principal,
    maturityValue,
    totalInterest: round2(maturityValue - input.principal),
    effectiveAnnualRatePercent: Math.round(effectiveAnnualRatePercent * 100) / 100,
    compounding,
  };
}
