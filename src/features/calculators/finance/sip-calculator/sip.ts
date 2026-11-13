/**
 * SIP (Systematic Investment Plan) calculator logic.
 *
 * Models a fixed monthly investment growing at a constant expected annual
 * return, compounded monthly. Contributions are treated as made at the
 * start of each month (annuity due), which is how most fund platforms
 * present SIP projections.
 *
 * FV = P * (((1 + i)^n - 1) / i) * (1 + i)
 * where P is the monthly amount, i is the monthly return, n is months.
 */

export interface SipInput {
  /** Amount invested every month. Must be greater than zero. */
  monthlyInvestment: number;
  /** Expected annual return in percent, for example 12 means 12%. */
  expectedAnnualReturnPercent: number;
  /** Investment horizon in years. Must be greater than zero. */
  years: number;
}

export interface SipYearRow {
  year: number;
  /** Total contributed by the end of this year. */
  investedAmount: number;
  /** Projected value at the end of this year. */
  value: number;
  /** Projected gain at the end of this year. */
  estimatedGain: number;
}

export interface SipResult {
  investedAmount: number;
  estimatedGain: number;
  maturityValue: number;
  yearlyBreakdown: SipYearRow[];
}

export const MONTHS_PER_YEAR = 12;

/** Sensible planning bounds for the projection. */
export const MAX_YEARS = 60;
export const MAX_RETURN_PERCENT = 50;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function assertValidInput(input: SipInput): void {
  if (!Number.isFinite(input.monthlyInvestment) || input.monthlyInvestment <= 0) {
    throw new RangeError("Monthly investment must be a positive number.");
  }
  if (
    !Number.isFinite(input.expectedAnnualReturnPercent) ||
    input.expectedAnnualReturnPercent < 0 ||
    input.expectedAnnualReturnPercent > MAX_RETURN_PERCENT
  ) {
    throw new RangeError(
      `Expected return must be between 0 and ${MAX_RETURN_PERCENT} percent.`,
    );
  }
  if (!Number.isFinite(input.years) || input.years <= 0 || input.years > MAX_YEARS) {
    throw new RangeError(`Years must be greater than 0 and at most ${MAX_YEARS}.`);
  }
}

/** Projected value of the monthly contributions after a given month count. */
function valueAfterMonths(
  monthlyInvestment: number,
  monthlyRate: number,
  months: number,
): number {
  if (monthlyRate === 0) return monthlyInvestment * months;
  return (
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate)
  );
}

export function calculateSip(input: SipInput): SipResult {
  assertValidInput(input);
  const { monthlyInvestment, expectedAnnualReturnPercent, years } = input;
  const monthlyRate = expectedAnnualReturnPercent / 100 / MONTHS_PER_YEAR;
  const totalMonths = Math.round(years * MONTHS_PER_YEAR);

  const maturityValue = round2(
    valueAfterMonths(monthlyInvestment, monthlyRate, totalMonths),
  );
  const investedAmount = round2(monthlyInvestment * totalMonths);
  const estimatedGain = round2(maturityValue - investedAmount);

  const yearlyBreakdown: SipYearRow[] = [];
  const wholeYears = Math.floor(years);
  for (let year = 1; year <= wholeYears; year += 1) {
    const months = year * MONTHS_PER_YEAR;
    const value = round2(valueAfterMonths(monthlyInvestment, monthlyRate, months));
    const invested = round2(monthlyInvestment * months);
    yearlyBreakdown.push({
      year,
      investedAmount: invested,
      value,
      estimatedGain: round2(value - invested),
    });
  }

  return { investedAmount, estimatedGain, maturityValue, yearlyBreakdown };
}
