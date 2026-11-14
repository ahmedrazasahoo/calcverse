/**
 * Simple interest calculator logic.
 *
 * Interest = P * (r / 100) * t
 * where P is the principal, r is the annual rate in percent, and t is
 * the time expressed in years. Months are divided by 12 and days by 365
 * so any time unit converts to the same yearly basis.
 */

export type TimeUnit = "years" | "months" | "days";

export interface SimpleInterestInput {
  /** Starting amount. Must be greater than zero. */
  principal: number;
  /** Annual interest rate in percent, for example 7.5 means 7.5%. */
  annualRatePercent: number;
  /** Length of time in the chosen unit. Must be greater than zero. */
  timeValue: number;
  /** Unit for timeValue. */
  timeUnit: TimeUnit;
}

export interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
  /** The time converted to years, used in the formula. */
  timeInYears: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function timeToYears(timeValue: number, timeUnit: TimeUnit): number {
  if (timeUnit === "years") return timeValue;
  if (timeUnit === "months") return timeValue / 12;
  return timeValue / 365;
}

export function calculateSimpleInterest(
  input: SimpleInterestInput,
): SimpleInterestResult {
  if (!Number.isFinite(input.principal) || input.principal <= 0) {
    throw new RangeError("Principal must be greater than zero.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (!Number.isFinite(input.timeValue) || input.timeValue <= 0) {
    throw new RangeError("Time must be greater than zero.");
  }
  if (input.timeUnit !== "years" && input.timeUnit !== "months" && input.timeUnit !== "days") {
    throw new RangeError("Time unit must be years, months or days.");
  }

  const timeInYears = timeToYears(input.timeValue, input.timeUnit);
  const interest = round2(input.principal * (input.annualRatePercent / 100) * timeInYears);

  return {
    interest,
    totalAmount: round2(input.principal + interest),
    timeInYears: Math.round(timeInYears * 1_000_000) / 1_000_000,
  };
}
