/**
 * General loan calculator logic.
 *
 * Works in years plus months (the way most lenders quote terms) and adds
 * the question borrowers actually ask after the monthly payment: what
 * happens if I pay a little extra every month? The extra payment scenario
 * is simulated month by month against the standard schedule.
 */

export interface LoanInput {
  /** Amount borrowed. Must be greater than zero. */
  principal: number;
  /** Nominal annual interest rate in percent. */
  annualRatePercent: number;
  /** Term length in whole years. Combined with termMonths. */
  termYears: number;
  /** Extra months on top of termYears, 0 to 11. Defaults to zero. */
  termMonths?: number;
  /** Optional extra amount paid every month on top of the payment. */
  extraMonthlyPayment?: number;
}

export interface LoanScheduleRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface LoanScenario {
  /** Actual number of months the loan runs. */
  months: number;
  totalInterest: number;
  totalPayment: number;
  schedule: LoanScheduleRow[];
}

export interface LoanResult {
  /** Contractual monthly payment before any extra payments. */
  monthlyPayment: number;
  termInMonths: number;
  /** Standard schedule with no extra payments. */
  standard: LoanScenario;
  /** Schedule with the extra monthly payment, equal to standard if none. */
  withExtra: LoanScenario;
  /** Months cut from the term by paying extra. */
  monthsSaved: number;
  /** Interest avoided by paying extra. */
  interestSaved: number;
}

export const PAYMENTS_PER_YEAR = 12;
export const MAX_TERM_MONTHS = 600;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function simulate(
  principal: number,
  monthlyRateDecimal: number,
  basePayment: number,
  extraMonthlyPayment: number,
  maxMonths: number,
): LoanScenario {
  const schedule: LoanScheduleRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  let month = 0;

  while (balance > 0 && month < maxMonths) {
    month += 1;
    const interestPaid = round2(balance * monthlyRateDecimal);
    let payment = round2(basePayment + extraMonthlyPayment);
    let principalPaid = round2(payment - interestPaid);
    if (principalPaid >= balance || month === maxMonths) {
      principalPaid = round2(balance);
      payment = round2(principalPaid + interestPaid);
    }
    balance = round2(balance - principalPaid);
    totalInterest = round2(totalInterest + interestPaid);
    schedule.push({ month, payment, principalPaid, interestPaid, balance });
  }

  return {
    months: schedule.length,
    totalInterest,
    totalPayment: round2(principal + totalInterest),
    schedule,
  };
}

export function calculateLoan(input: LoanInput): LoanResult {
  const termMonthsPart = input.termMonths ?? 0;
  const extraMonthlyPayment = input.extraMonthlyPayment ?? 0;
  const termInMonths = input.termYears * PAYMENTS_PER_YEAR + termMonthsPart;

  if (!Number.isFinite(input.principal) || input.principal <= 0) {
    throw new RangeError("Principal must be a positive number.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (
    !Number.isFinite(termInMonths) ||
    termInMonths < 1 ||
    termInMonths > MAX_TERM_MONTHS ||
    Math.floor(termInMonths) !== termInMonths
  ) {
    throw new RangeError(
      `Term must total between 1 and ${MAX_TERM_MONTHS} whole months.`,
    );
  }
  if (!Number.isFinite(extraMonthlyPayment) || extraMonthlyPayment < 0) {
    throw new RangeError("Extra monthly payment must be zero or greater.");
  }

  const r = input.annualRatePercent / 100 / PAYMENTS_PER_YEAR;
  const monthlyPayment =
    r === 0
      ? round2(input.principal / termInMonths)
      : round2(
          (input.principal * r * Math.pow(1 + r, termInMonths)) /
            (Math.pow(1 + r, termInMonths) - 1),
        );

  const standard = simulate(input.principal, r, monthlyPayment, 0, termInMonths);
  const withExtra =
    extraMonthlyPayment > 0
      ? simulate(input.principal, r, monthlyPayment, extraMonthlyPayment, termInMonths)
      : standard;

  return {
    monthlyPayment,
    termInMonths,
    standard,
    withExtra,
    monthsSaved: standard.months - withExtra.months,
    interestSaved: round2(standard.totalInterest - withExtra.totalInterest),
  };
}
