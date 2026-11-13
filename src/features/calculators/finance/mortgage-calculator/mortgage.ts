/**
 * US mortgage calculator logic.
 *
 * Breaks the monthly payment into the parts US borrowers actually see on a
 * statement: principal and interest, property tax, homeowner's insurance,
 * HOA dues and PMI. PMI (private mortgage insurance) is charged when the
 * down payment is under 20 percent and is modelled until the balance
 * reaches 80 percent of the home price, the point where it can normally
 * be cancelled.
 */

export interface MortgageInput {
  /** Purchase price of the home. Must be greater than zero. */
  homePrice: number;
  /** Down payment in currency. Must be less than the home price. */
  downPayment: number;
  /** Nominal annual interest rate in percent. */
  annualRatePercent: number;
  /** Loan term in years, commonly 30, 20 or 15. */
  termYears: number;
  /** Annual property tax in currency. Optional, defaults to zero. */
  annualPropertyTax?: number;
  /** Annual homeowner's insurance premium in currency. Optional. */
  annualHomeInsurance?: number;
  /** Monthly HOA dues. Optional, defaults to zero. */
  monthlyHoa?: number;
  /**
   * Annual PMI rate in percent of the loan amount, for example 0.5.
   * Applied only when the down payment is under 20 percent.
   * Optional, defaults to zero (no PMI line shown).
   */
  pmiAnnualRatePercent?: number;
}

export interface MortgageMonthRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPaymentPercent: number;
  /** Monthly principal and interest only. */
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  /** Monthly PMI while it applies, zero once it drops off or if not charged. */
  monthlyPmi: number;
  /** Number of months PMI is charged for. */
  pmiMonths: number;
  /** Full monthly outlay in the first month, including PMI if charged. */
  totalMonthlyPayment: number;
  /** Monthly outlay after PMI drops off. */
  totalMonthlyAfterPmi: number;
  totalInterest: number;
  /** Principal plus interest over the life of the loan. */
  totalCostOfLoan: number;
  schedule: MortgageMonthRow[];
}

/** Down payment share below which lenders normally require PMI. */
export const PMI_DOWN_PAYMENT_THRESHOLD_PERCENT = 20;
/** Loan to value at which PMI can normally be cancelled. */
export const PMI_REMOVAL_LTV_PERCENT = 80;
export const MONTHS_PER_YEAR = 12;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const annualPropertyTax = input.annualPropertyTax ?? 0;
  const annualHomeInsurance = input.annualHomeInsurance ?? 0;
  const monthlyHoa = input.monthlyHoa ?? 0;
  const pmiAnnualRatePercent = input.pmiAnnualRatePercent ?? 0;

  if (!Number.isFinite(input.homePrice) || input.homePrice <= 0) {
    throw new RangeError("Home price must be a positive number.");
  }
  if (
    !Number.isFinite(input.downPayment) ||
    input.downPayment < 0 ||
    input.downPayment >= input.homePrice
  ) {
    throw new RangeError("Down payment must be less than the home price.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (!Number.isFinite(input.termYears) || input.termYears < 1 || input.termYears > 50) {
    throw new RangeError("Term must be between 1 and 50 years.");
  }
  for (const [label, value] of [
    ["Property tax", annualPropertyTax],
    ["Home insurance", annualHomeInsurance],
    ["HOA dues", monthlyHoa],
    ["PMI rate", pmiAnnualRatePercent],
  ] as const) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`${label} must be zero or greater.`);
    }
  }

  const loanAmount = round2(input.homePrice - input.downPayment);
  const downPaymentPercent = (input.downPayment / input.homePrice) * 100;
  const months = Math.round(input.termYears * MONTHS_PER_YEAR);
  const r = input.annualRatePercent / 100 / MONTHS_PER_YEAR;

  const monthlyPrincipalAndInterest =
    r === 0
      ? round2(loanAmount / months)
      : round2(
          (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1),
        );

  const pmiApplies =
    downPaymentPercent < PMI_DOWN_PAYMENT_THRESHOLD_PERCENT && pmiAnnualRatePercent > 0;
  const monthlyPmi = pmiApplies
    ? round2((loanAmount * pmiAnnualRatePercent) / 100 / MONTHS_PER_YEAR)
    : 0;
  const pmiCutoffBalance = (input.homePrice * PMI_REMOVAL_LTV_PERCENT) / 100;

  const schedule: MortgageMonthRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;
  let pmiMonths = 0;

  for (let month = 1; month <= months; month += 1) {
    if (pmiApplies && balance > pmiCutoffBalance) pmiMonths = month;
    const interestPaid = round2(balance * r);
    let principalPaid = round2(monthlyPrincipalAndInterest - interestPaid);
    let payment = monthlyPrincipalAndInterest;
    if (month === months || principalPaid >= balance) {
      principalPaid = round2(balance);
      payment = round2(principalPaid + interestPaid);
    }
    balance = round2(balance - principalPaid);
    totalInterest = round2(totalInterest + interestPaid);
    schedule.push({ month, payment, principalPaid, interestPaid, balance });
    if (balance <= 0) break;
  }

  const monthlyPropertyTax = round2(annualPropertyTax / MONTHS_PER_YEAR);
  const monthlyHomeInsurance = round2(annualHomeInsurance / MONTHS_PER_YEAR);
  const escrowAndDues = monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa;

  return {
    loanAmount,
    downPaymentPercent: Math.round(downPaymentPercent * 100) / 100,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa,
    monthlyPmi,
    pmiMonths,
    totalMonthlyPayment: round2(monthlyPrincipalAndInterest + escrowAndDues + monthlyPmi),
    totalMonthlyAfterPmi: round2(monthlyPrincipalAndInterest + escrowAndDues),
    totalInterest,
    totalCostOfLoan: round2(loanAmount + totalInterest),
    schedule,
  };
}
