/**
 * PPF (Public Provident Fund) calculator logic, India.
 *
 * Assumption used throughout: the full yearly deposit is made at the
 * start of the financial year, by 5 April, so each year the deposit
 * earns a full year of interest. Interest is credited once a year:
 *
 * interest for the year = (opening balance + yearly deposit) * rate / 100
 * closing balance = opening balance + yearly deposit + interest
 *
 * The yearly deposit is capped at 150000, the current PPF limit per
 * financial year. The standard account runs for 15 years and can be
 * extended in blocks of 5 years; this logic accepts any whole number
 * of years from 5 to 50 so shorter illustrations and long extensions
 * can both be modelled.
 */

export interface PpfInput {
  /** Amount deposited once each year. Must be above 0 and at most 150000. */
  yearlyDeposit: number;
  /** Annual interest rate in percent, for example 7.1 means 7.1%. */
  annualRatePercent: number;
  /** Number of years. Whole number from 5 to 50. */
  years: number;
}

export interface PpfYearRow {
  year: number;
  opening: number;
  deposit: number;
  interest: number;
  closing: number;
}

export interface PpfResult {
  totalDeposited: number;
  totalInterest: number;
  maturityValue: number;
  yearlyBreakdown: PpfYearRow[];
}

export const MAX_PPF_YEARLY_DEPOSIT = 150000;
export const MIN_PPF_YEARS = 5;
export const MAX_PPF_YEARS = 50;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculatePpf(input: PpfInput): PpfResult {
  if (!Number.isFinite(input.yearlyDeposit) || input.yearlyDeposit <= 0) {
    throw new RangeError("Yearly deposit must be greater than zero.");
  }
  if (input.yearlyDeposit > MAX_PPF_YEARLY_DEPOSIT) {
    throw new RangeError(
      `Yearly deposit must be at most ${MAX_PPF_YEARLY_DEPOSIT}, the PPF yearly limit.`,
    );
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (
    !Number.isFinite(input.years) ||
    !Number.isInteger(input.years) ||
    input.years < MIN_PPF_YEARS ||
    input.years > MAX_PPF_YEARS
  ) {
    throw new RangeError(
      `Years must be a whole number from ${MIN_PPF_YEARS} to ${MAX_PPF_YEARS}.`,
    );
  }

  let opening = 0;
  let totalInterest = 0;
  const yearlyBreakdown: PpfYearRow[] = [];

  for (let year = 1; year <= input.years; year += 1) {
    const interest = round2((opening + input.yearlyDeposit) * (input.annualRatePercent / 100));
    const closing = round2(opening + input.yearlyDeposit + interest);
    yearlyBreakdown.push({
      year,
      opening: round2(opening),
      deposit: input.yearlyDeposit,
      interest,
      closing,
    });
    totalInterest += interest;
    opening = closing;
  }

  const totalDeposited = round2(input.yearlyDeposit * input.years);
  const maturityValue = round2(opening);
  return {
    totalDeposited,
    totalInterest: round2(totalInterest),
    maturityValue,
    yearlyBreakdown,
  };
}
