/**
 * UK salary (take home pay) calculator logic, tax year 2025-26.
 *
 * Covers England, Wales and Northern Ireland income tax bands, the
 * personal allowance with its taper above GBP 100,000, Class 1 National
 * Insurance employee contributions, optional salary sacrifice pension
 * contributions, and optional student loan repayments.
 *
 * Sources (official): HMRC income tax rates and allowances and National
 * Insurance rates for 2025-26 (gov.uk); student loan repayment
 * thresholds from the Student Loans Company for 2025-26.
 * Scottish taxpayers pay income tax on different bands set by the
 * Scottish Parliament, so Scotland is out of scope and flagged in the UI.
 */

/** Standard personal allowance for 2025-26, in pounds. */
export const PERSONAL_ALLOWANCE = 12_570;
/** Income above which the personal allowance tapers away. */
export const ALLOWANCE_TAPER_THRESHOLD = 100_000;
/** The allowance falls by GBP 1 for every GBP 2 above the threshold. */
export const ALLOWANCE_TAPER_RATIO = 2;

/** Taxable income bands for England, Wales and Northern Ireland, 2025-26. */
export interface UkTaxBand {
  upTo: number | null;
  ratePercent: number;
  label: string;
}

export const INCOME_TAX_BANDS: UkTaxBand[] = [
  { upTo: 37_700, ratePercent: 20, label: "Basic rate" },
  { upTo: 112_570, ratePercent: 40, label: "Higher rate" },
  { upTo: null, ratePercent: 45, label: "Additional rate" },
];

/** Class 1 employee National Insurance, annualised thresholds, 2025-26. */
export const NI_PRIMARY_THRESHOLD = 12_570;
export const NI_UPPER_EARNINGS_LIMIT = 50_270;
export const NI_MAIN_RATE_PERCENT = 8;
export const NI_ADDITIONAL_RATE_PERCENT = 2;

export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgraduate";

export interface StudentLoanTerms {
  label: string;
  /** Annual earnings above which repayments apply, in pounds. */
  threshold: number;
  ratePercent: number;
}

export const STUDENT_LOAN_TERMS: Record<
  Exclude<StudentLoanPlan, "none">,
  StudentLoanTerms
> = {
  plan1: { label: "Plan 1", threshold: 26_065, ratePercent: 9 },
  plan2: { label: "Plan 2", threshold: 27_295, ratePercent: 9 },
  plan4: { label: "Plan 4", threshold: 31_395, ratePercent: 9 },
  plan5: { label: "Plan 5", threshold: 25_000, ratePercent: 9 },
  postgraduate: { label: "Postgraduate loan", threshold: 21_000, ratePercent: 6 },
};

export interface UkSalaryInput {
  /** Gross annual salary in pounds, before any pension sacrifice. */
  grossAnnualSalary: number;
  /**
   * Optional pension contribution as a percent of gross salary, treated
   * as salary sacrifice: it reduces pay before tax and National
   * Insurance. Defaults to zero.
   */
  pensionPercent?: number;
  /** Optional student loan plan. Defaults to none. */
  studentLoanPlan?: StudentLoanPlan;
}

export interface UkSalaryResult {
  grossAnnualSalary: number;
  pensionContribution: number;
  /** Pay after salary sacrifice pension, the base for tax and NI. */
  taxablePay: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  studentLoanRepayment: number;
  totalDeductions: number;
  /** Take home pay per year. */
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
  /** Total deductions as a percentage of the gross salary. */
  effectiveRatePercent: number;
  /** Highest income tax band reached. */
  marginalTaxBand: string;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Personal allowance after the taper for incomes above GBP 100,000. */
export function personalAllowanceFor(taxablePay: number): number {
  if (taxablePay <= ALLOWANCE_TAPER_THRESHOLD) return PERSONAL_ALLOWANCE;
  const reduction = Math.floor(
    (taxablePay - ALLOWANCE_TAPER_THRESHOLD) / ALLOWANCE_TAPER_RATIO,
  );
  return Math.max(0, PERSONAL_ALLOWANCE - reduction);
}

export function calculateUkSalary(input: UkSalaryInput): UkSalaryResult {
  const pensionPercent = input.pensionPercent ?? 0;
  const plan: StudentLoanPlan = input.studentLoanPlan ?? "none";

  if (!Number.isFinite(input.grossAnnualSalary) || input.grossAnnualSalary < 0) {
    throw new RangeError("Gross salary must be zero or greater.");
  }
  if (!Number.isFinite(pensionPercent) || pensionPercent < 0 || pensionPercent >= 100) {
    throw new RangeError("Pension percent must be at least 0 and under 100.");
  }

  const pensionContribution = round2((input.grossAnnualSalary * pensionPercent) / 100);
  const taxablePay = round2(input.grossAnnualSalary - pensionContribution);
  const personalAllowance = personalAllowanceFor(taxablePay);
  const taxableIncome = Math.max(0, taxablePay - personalAllowance);

  let incomeTax = 0;
  let lower = 0;
  let marginalTaxBand = "No tax";
  for (const band of INCOME_TAX_BANDS) {
    const upper = band.upTo ?? Number.POSITIVE_INFINITY;
    if (taxableIncome <= lower) break;
    const slice = Math.min(taxableIncome, upper) - lower;
    incomeTax += (slice * band.ratePercent) / 100;
    marginalTaxBand = band.label;
    lower = upper;
  }
  incomeTax = round2(incomeTax);

  let nationalInsurance = 0;
  if (taxablePay > NI_PRIMARY_THRESHOLD) {
    const mainSlice =
      Math.min(taxablePay, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD;
    nationalInsurance += (mainSlice * NI_MAIN_RATE_PERCENT) / 100;
    if (taxablePay > NI_UPPER_EARNINGS_LIMIT) {
      nationalInsurance +=
        ((taxablePay - NI_UPPER_EARNINGS_LIMIT) * NI_ADDITIONAL_RATE_PERCENT) / 100;
    }
  }
  nationalInsurance = round2(nationalInsurance);

  let studentLoanRepayment = 0;
  if (plan !== "none") {
    const terms = STUDENT_LOAN_TERMS[plan];
    if (taxablePay > terms.threshold) {
      studentLoanRepayment = round2(
        ((taxablePay - terms.threshold) * terms.ratePercent) / 100,
      );
    }
  }

  const totalDeductions = round2(
    pensionContribution + incomeTax + nationalInsurance + studentLoanRepayment,
  );
  const netAnnual = round2(input.grossAnnualSalary - totalDeductions);

  return {
    grossAnnualSalary: input.grossAnnualSalary,
    pensionContribution,
    taxablePay,
    personalAllowance,
    taxableIncome,
    incomeTax,
    nationalInsurance,
    studentLoanRepayment,
    totalDeductions,
    netAnnual,
    netMonthly: round2(netAnnual / 12),
    netWeekly: round2(netAnnual / 52),
    effectiveRatePercent:
      input.grossAnnualSalary > 0
        ? Math.round((totalDeductions / input.grossAnnualSalary) * 10000) / 100
        : 0,
    marginalTaxBand,
  };
}
