/**
 * US federal tax refund estimator logic for tax year 2026.
 *
 * Pure and framework free. Works through the same broad steps as a
 * Form 1040: total income, adjustments, adjusted gross income (AGI),
 * the standard deduction, taxable income, ordinary bracket tax, the
 * child tax credit and other dependent credit, the earned income tax
 * credit (EITC), withholding, and finally a refund or an amount owed.
 *
 * This is an estimator, not a tax return. It uses the standard
 * deduction only, one combined adjustments field, and a simplified
 * refundable child tax credit (see the note on ACTC below). State tax,
 * itemised deductions, self employment tax and most other credits are
 * deliberately out of scope.
 *
 * 2026 figures: IRS Revenue Procedure 2025-32.
 */

export type FilingStatus = "single" | "mfj" | "hoh";

export interface BracketBand {
  /** Upper limit of taxable income in this band. Infinity for the top band. */
  upTo: number;
  /** Marginal rate in this band, as a decimal, for example 0.12. */
  rate: number;
}

/** 2026 standard deduction by filing status. */
export const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
};

/**
 * 2026 ordinary income brackets. The brief supplied the upper limit of
 * each band for the 10, 12, 22, 24, 32 and 35 percent rates; everything
 * above the last limit is taxed at 37 percent.
 */
export const BRACKETS_2026: Record<FilingStatus, BracketBand[]> = {
  single: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 24800, rate: 0.1 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17700, rate: 0.1 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

/** Ordinary bracket tax on a taxable income figure. */
export function ordinaryTax(taxableIncome: number, status: FilingStatus): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) return 0;
  let tax = 0;
  let lower = 0;
  for (const band of BRACKETS_2026[status]) {
    if (taxableIncome <= lower) break;
    const slice = Math.min(taxableIncome, band.upTo) - lower;
    if (slice > 0) tax += slice * band.rate;
    lower = band.upTo;
  }
  return round2(tax);
}

/** Marginal rate (decimal) that applies to the next dollar of taxable income. */
export function marginalRate(taxableIncome: number, status: FilingStatus): number {
  for (const band of BRACKETS_2026[status]) {
    if (taxableIncome < band.upTo) return band.rate;
  }
  return 0.37;
}

/** 2026 child tax credit per child under 17, before any phase-out. */
export const CTC_PER_CHILD = 2200;
/** 2026 credit per other dependent. */
export const ODC_PER_DEPENDENT = 500;
/** 2026 cap on the refundable additional child tax credit, per child. */
export const ACTC_CAP_PER_CHILD = 1700;

export interface EitcParams {
  /** Income at which the maximum credit is reached. */
  earnedIncomeAmount: number;
  maxCredit: number;
  phaseInRate: number;
  phaseOutRate: number;
  /** Phase-out threshold for single and head of household filers. */
  thresholdOther: number;
  /** Phase-out threshold for married filing jointly. */
  thresholdMfj: number;
}

/**
 * 2026 EITC parameters by number of qualifying children (index 3 means
 * three or more). Source: IRS Revenue Procedure 2025-32, section 4.06,
 * with the credit and phase-out percentages from Internal Revenue Code
 * section 32(b)(1). Checked November 2026.
 */
export const EITC_2026: EitcParams[] = [
  { earnedIncomeAmount: 8680, maxCredit: 664, phaseInRate: 0.0765, phaseOutRate: 0.0765, thresholdOther: 10860, thresholdMfj: 18140 },
  { earnedIncomeAmount: 13020, maxCredit: 4427, phaseInRate: 0.34, phaseOutRate: 0.1598, thresholdOther: 23890, thresholdMfj: 31160 },
  { earnedIncomeAmount: 18290, maxCredit: 7316, phaseInRate: 0.4, phaseOutRate: 0.2106, thresholdOther: 23890, thresholdMfj: 31160 },
  { earnedIncomeAmount: 18290, maxCredit: 8231, phaseInRate: 0.45, phaseOutRate: 0.2106, thresholdOther: 23890, thresholdMfj: 31160 },
];

/**
 * Estimated EITC using the standard formula: the credit phases in at a
 * fixed percentage of earned income up to the maximum, holds on a
 * plateau, then phases out at a fixed percentage of the amount by
 * which the greater of AGI or earned income exceeds the threshold.
 * The IRS reads the final figure from a table in $50 bands, so a real
 * return can differ by a few dollars.
 */
export function calculateEitc(
  earnedIncome: number,
  agi: number,
  status: FilingStatus,
  qualifyingChildren: number,
): number {
  const idx = Math.min(3, Math.max(0, Math.trunc(qualifyingChildren)));
  const p = EITC_2026[idx];
  if (!Number.isFinite(earnedIncome) || earnedIncome <= 0) return 0;
  const phasedIn = Math.min(p.maxCredit, p.phaseInRate * earnedIncome);
  const threshold = status === "mfj" ? p.thresholdMfj : p.thresholdOther;
  const phaseBase = Math.max(agi, earnedIncome);
  let credit = phasedIn;
  if (phaseBase > threshold) {
    const phasedOut = Math.max(0, p.maxCredit - p.phaseOutRate * (phaseBase - threshold));
    credit = Math.min(phasedIn, phasedOut);
  }
  return round2(credit);
}

export interface TaxRefundInput {
  filingStatus: FilingStatus;
  /** Wages and salaries. Treated as earned income for the EITC. */
  wages: number;
  /** Other income, for example interest, pensions or rental profit. */
  otherIncome: number;
  /** Combined adjustments to income, for example pretax 401(k), HSA or student loan interest. */
  adjustments: number;
  /** Federal income tax already withheld, for example from a W-2. */
  federalWithheld: number;
  /** Children under 17 who qualify for the child tax credit. */
  childrenUnder17: number;
  /** Other dependents who qualify for the $500 credit. */
  otherDependents: number;
  /** Qualifying children for the EITC: 0, 1, 2 or 3 (3 means three or more). */
  eitcChildren: number;
}

export interface TaxRefundResult {
  totalIncome: number;
  agi: number;
  standardDeduction: number;
  taxableIncome: number;
  /** Tax from the ordinary brackets, before credits. */
  bracketTax: number;
  /** Child tax credit allowed after the phase-out, before splitting. */
  childTaxCredit: number;
  /** Other dependent credit allowed after the phase-out. */
  otherDependentCredit: number;
  /** Part of the credits used against the bracket tax. */
  nonrefundableCreditsUsed: number;
  /** Refundable additional child tax credit (simplified, see below). */
  additionalChildTaxCredit: number;
  eitc: number;
  /** Tax left after nonrefundable credits. */
  taxAfterCredits: number;
  /** Withholding plus refundable credits. */
  totalPayments: number;
  /** Positive when money comes back, negative when tax is still owed. */
  refundOrOwed: number;
  isRefund: boolean;
  /** Refund amount (positive) or zero. */
  refund: number;
  /** Amount still owed (positive) or zero. */
  amountOwed: number;
  /** Tax after nonrefundable credits as a percentage of AGI. */
  effectiveRatePercent: number;
  /** Marginal bracket rate in percent. */
  marginalRatePercent: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function assertAmount(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be zero or more.`);
  }
}

function assertCount(value: number, label: string): void {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0 || value > 20) {
    throw new RangeError(`${label} must be a whole number between 0 and 20.`);
  }
}

export function calculateTaxRefund(input: TaxRefundInput): TaxRefundResult {
  assertAmount(input.wages, "Wages");
  assertAmount(input.otherIncome, "Other income");
  assertAmount(input.adjustments, "Adjustments");
  assertAmount(input.federalWithheld, "Federal tax withheld");
  assertCount(input.childrenUnder17, "Children under 17");
  assertCount(input.otherDependents, "Other dependents");
  if (!Number.isInteger(input.eitcChildren) || input.eitcChildren < 0 || input.eitcChildren > 3) {
    throw new RangeError("EITC qualifying children must be 0, 1, 2 or 3 (three or more).");
  }

  const totalIncome = round2(input.wages + input.otherIncome);
  const agi = Math.max(0, round2(totalIncome - input.adjustments));
  const standardDeduction = STANDARD_DEDUCTION_2026[input.filingStatus];
  const taxableIncome = Math.max(0, round2(agi - standardDeduction));
  const bracketTax = ordinaryTax(taxableIncome, input.filingStatus);

  // Child tax credit and other dependent credit, with the joint
  // phase-out: $50 lost per $1,000 (or part of $1,000) of AGI over the
  // threshold. The reduction is applied to the other dependent credit
  // first, so the child tax credit survives longest. That ordering is
  // a stated simplification of this estimator.
  const ctcGross = CTC_PER_CHILD * input.childrenUnder17;
  const odcGross = ODC_PER_DEPENDENT * input.otherDependents;
  const phaseOutStart = input.filingStatus === "mfj" ? 400000 : 200000;
  const excess = Math.max(0, agi - phaseOutStart);
  const reduction = excess > 0 ? Math.ceil(excess / 1000) * 50 : 0;
  const totalAllowed = Math.max(0, ctcGross + odcGross - reduction);
  const childTaxCredit = Math.min(ctcGross, totalAllowed);
  const otherDependentCredit = round2(totalAllowed - childTaxCredit);

  // Nonrefundable credits run the tax down to zero, child tax credit
  // first. Whatever child tax credit is left over can come back as the
  // refundable additional child tax credit, capped at $1,700 per child.
  // Simplification: the real ACTC is 15 percent of earned income over
  // $2,500 and follows its own worksheet; this estimator pays the
  // unused credit up to the cap instead, as stated in the page copy.
  const ctcUsed = Math.min(childTaxCredit, bracketTax);
  const odcUsed = Math.min(otherDependentCredit, bracketTax - ctcUsed);
  const nonrefundableCreditsUsed = round2(ctcUsed + odcUsed);
  const taxAfterCredits = round2(bracketTax - nonrefundableCreditsUsed);
  const unusedCtc = round2(childTaxCredit - ctcUsed);
  const additionalChildTaxCredit = Math.min(unusedCtc, ACTC_CAP_PER_CHILD * input.childrenUnder17);

  const eitc = calculateEitc(input.wages, agi, input.filingStatus, input.eitcChildren);

  const totalPayments = round2(input.federalWithheld + additionalChildTaxCredit + eitc);
  const refundOrOwed = round2(totalPayments - taxAfterCredits);

  return {
    totalIncome,
    agi,
    standardDeduction,
    taxableIncome,
    bracketTax,
    childTaxCredit: round2(childTaxCredit),
    otherDependentCredit,
    nonrefundableCreditsUsed,
    additionalChildTaxCredit: round2(additionalChildTaxCredit),
    eitc,
    taxAfterCredits,
    totalPayments,
    refundOrOwed,
    isRefund: refundOrOwed >= 0,
    refund: refundOrOwed > 0 ? refundOrOwed : 0,
    amountOwed: refundOrOwed < 0 ? -refundOrOwed : 0,
    effectiveRatePercent: agi > 0 ? round2((taxAfterCredits / agi) * 100) : 0,
    marginalRatePercent: round2(marginalRate(taxableIncome, input.filingStatus) * 100),
  };
}
