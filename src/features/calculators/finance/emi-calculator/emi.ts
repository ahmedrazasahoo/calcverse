/**
 * EMI (Equated Monthly Instalment) calculator logic.
 *
 * Pure, framework-free math for fixed-rate amortising loans.
 * Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1), where r is the
 * monthly interest rate and n is the number of monthly payments.
 * When the rate is zero, EMI is simply principal / months.
 */

export interface EmiInput {
  /** Loan amount in the chosen currency. Must be greater than zero. */
  principal: number;
  /** Nominal annual interest rate in percent, for example 8.5 means 8.5%. */
  annualRatePercent: number;
  /** Loan tenure in whole months. Must be at least 1. */
  tenureMonths: number;
}

export interface AmortizationRow {
  month: number;
  /** Total amount paid this month. */
  payment: number;
  /** Part of the payment that reduced the loan balance. */
  principalPaid: number;
  /** Part of the payment that went to interest. */
  interestPaid: number;
  /** Balance remaining after this payment. */
  balance: number;
}

export interface EmiResult {
  /** Fixed monthly payment. */
  emi: number;
  /** Sum of every payment over the full tenure. */
  totalPayment: number;
  /** Total interest paid over the full tenure. */
  totalInterest: number;
  /** Month by month amortisation schedule. */
  schedule: AmortizationRow[];
}

export type LoanType = "home" | "car" | "personal";

export interface LoanPreset {
  label: string;
  /** Typical mid-range annual rate in percent, used as a sensible default. */
  typicalRatePercent: number;
  /** Typical tenure in months, used as a sensible default. */
  typicalTenureMonths: number;
  note: string;
}

/**
 * Indicative defaults for the three most searched loan types.
 * Rates are typical market ranges as of 2026 and are only starting points;
 * the user can always overwrite them.
 */
export const LOAN_PRESETS: Record<LoanType, LoanPreset> = {
  home: {
    label: "Home loan",
    typicalRatePercent: 8.5,
    typicalTenureMonths: 240,
    note: "Home loans carry the lowest rates because the property secures the loan.",
  },
  car: {
    label: "Car loan",
    typicalRatePercent: 9.5,
    typicalTenureMonths: 60,
    note: "Car loans sit in the middle, with shorter tenures of three to seven years.",
  },
  personal: {
    label: "Personal loan",
    typicalRatePercent: 12.5,
    typicalTenureMonths: 36,
    note: "Personal loans are unsecured, so rates are higher and tenures shorter.",
  },
};

/** Interest is charged twelve times a year on standard EMI loans. */
export const PAYMENTS_PER_YEAR = 12;

/** Upper guard so a typo cannot create an endless schedule. */
export const MAX_TENURE_MONTHS = 600;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function assertValidInput(input: EmiInput): void {
  if (!Number.isFinite(input.principal) || input.principal <= 0) {
    throw new RangeError("Principal must be a positive number.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (
    !Number.isFinite(input.tenureMonths) ||
    input.tenureMonths < 1 ||
    input.tenureMonths > MAX_TENURE_MONTHS ||
    Math.floor(input.tenureMonths) !== input.tenureMonths
  ) {
    throw new RangeError(
      `Tenure must be a whole number of months between 1 and ${MAX_TENURE_MONTHS}.`,
    );
  }
}

/** Monthly interest rate as a decimal fraction. */
export function monthlyRate(annualRatePercent: number): number {
  return annualRatePercent / 100 / PAYMENTS_PER_YEAR;
}

export function calculateEmi(input: EmiInput): EmiResult {
  assertValidInput(input);
  const { principal, annualRatePercent, tenureMonths } = input;
  const r = monthlyRate(annualRatePercent);

  const emiRaw =
    r === 0
      ? principal / tenureMonths
      : (principal * r * Math.pow(1 + r, tenureMonths)) /
        (Math.pow(1 + r, tenureMonths) - 1);
  const emi = round2(emiRaw);

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;

  for (let month = 1; month <= tenureMonths; month += 1) {
    const interestPaid = round2(balance * r);
    let principalPaid = round2(emi - interestPaid);
    let payment = emi;
    // Final month: clear exactly what is left so the balance ends at zero.
    if (month === tenureMonths || principalPaid >= balance) {
      principalPaid = round2(balance);
      payment = round2(principalPaid + interestPaid);
    }
    balance = round2(balance - principalPaid);
    totalInterest = round2(totalInterest + interestPaid);
    schedule.push({ month, payment, principalPaid, interestPaid, balance });
    if (balance <= 0) break;
  }

  const totalPayment = round2(principal + totalInterest);
  return { emi, totalPayment, totalInterest, schedule };
}
