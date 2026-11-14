/**
 * RD (Recurring Deposit) calculator logic, Indian bank style.
 *
 * A fixed amount is deposited at the start of every month. Interest
 * compounds quarterly: at the end of every third month the bank credits
 * interest equal to the current balance times the quarterly rate,
 * which is the annual rate divided by 100 and then divided by 4.
 * The result is built by simulating month by month, which matches how
 * the balance actually moves in the account.
 */

export interface RdInput {
  /** Amount deposited every month. Must be greater than zero. */
  monthlyDeposit: number;
  /** Annual interest rate in percent, for example 7 means 7%. */
  annualRatePercent: number;
  /** Tenure in years. Fractions are allowed, for example 1.5 years. */
  years: number;
}

export interface RdYearRow {
  year: number;
  /** Total deposited by the end of this year. */
  totalDeposited: number;
  /** Balance at the end of this year, including credited interest. */
  balance: number;
}

export interface RdResult {
  totalDeposited: number;
  maturityValue: number;
  totalInterest: number;
  yearlyBreakdown: RdYearRow[];
}

export const MAX_RD_YEARS = 50;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateRd(input: RdInput): RdResult {
  if (!Number.isFinite(input.monthlyDeposit) || input.monthlyDeposit <= 0) {
    throw new RangeError("Monthly deposit must be greater than zero.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (!Number.isFinite(input.years) || input.years <= 0 || input.years > MAX_RD_YEARS) {
    throw new RangeError(`Tenure must be greater than 0 and at most ${MAX_RD_YEARS} years.`);
  }

  const months = Math.round(input.years * 12);
  if (months < 1) {
    throw new RangeError("Tenure must be at least one month.");
  }
  const quarterlyRate = input.annualRatePercent / 100 / 4;

  let balance = 0;
  let deposited = 0;
  const yearlyBreakdown: RdYearRow[] = [];

  for (let month = 1; month <= months; month += 1) {
    // Deposit lands at the start of the month.
    balance += input.monthlyDeposit;
    deposited += input.monthlyDeposit;
    // Interest is credited at the end of every third month.
    if (month % 3 === 0) {
      balance += balance * quarterlyRate;
    }
    if (month % 12 === 0 || month === months) {
      yearlyBreakdown.push({
        year: Math.ceil(month / 12),
        totalDeposited: round2(deposited),
        balance: round2(balance),
      });
    }
  }

  const totalDeposited = round2(deposited);
  const maturityValue = round2(balance);
  return {
    totalDeposited,
    maturityValue,
    totalInterest: round2(maturityValue - totalDeposited),
    yearlyBreakdown,
  };
}
