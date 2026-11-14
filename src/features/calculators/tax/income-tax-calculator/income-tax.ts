/**
 * Generic income tax estimator logic for India, the United States and
 * the United Kingdom.
 *
 * This is an estimator, not a full tax return. Each country function
 * uses the same published figures as the detailed country calculators
 * on this site, simplified to a single gross yearly income with no
 * extra deductions, credits or reliefs beyond the standard ones noted
 * for each country. For an exact figure, use the detailed calculator
 * for that country.
 *
 * India: new regime for FY 2025-26, matching the India income tax
 * calculator on this site. Standard deduction 75,000, slabs from nil
 * to 30 percent, section 87A rebate up to 60,000 when taxable income
 * is at most 1,200,000, marginal relief just above that line, and a
 * 4 percent health and education cess. Surcharge at very high incomes
 * is not modelled in this estimator.
 *
 * United States: federal income tax for 2025, single filer, matching
 * the published IRS brackets, plus FICA payroll taxes. State tax is a
 * flat estimate on gross income at a rate the user sets.
 *
 * United Kingdom: England, Wales and Northern Ireland bands for
 * 2025-26, matching the UK salary calculator on this site, including
 * the personal allowance taper above 100,000 and Class 1 National
 * Insurance. Pension contributions and student loan repayments are
 * not modelled here; the detailed UK calculator covers them.
 */

export type IncomeTaxCountry = "india" | "us" | "uk";

export interface TaxBreakdownItem {
  label: string;
  amount: number;
}

export interface IncomeTaxEstimate {
  gross: number;
  /** All taxes and payroll deductions combined, for the country. */
  totalTax: number;
  net: number;
  effectiveRatePercent: number;
  /** Top slab or bracket rate that applies to this income. */
  marginalRatePercent: number;
  breakdown: TaxBreakdownItem[];
}

export interface IndiaTaxResult extends IncomeTaxEstimate {
  country: "india";
  standardDeduction: number;
  taxableIncome: number;
  slabTax: number;
  rebate: number;
  cess: number;
}

export interface UsTaxResult extends IncomeTaxEstimate {
  country: "us";
  standardDeduction: number;
  taxableIncome: number;
  federal: number;
  socialSecurity: number;
  medicare: number;
  state: number;
}

export interface UkTaxResult extends IncomeTaxEstimate {
  country: "uk";
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
}

interface Band {
  upTo: number | null;
  ratePercent: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function validateGross(grossYearly: number): void {
  if (!Number.isFinite(grossYearly) || grossYearly < 0) {
    throw new RangeError("Gross income must be zero or greater.");
  }
}

/** Progressive tax on an amount using bands measured from zero. */
function progressive(amount: number, bands: Band[]): { tax: number; marginalRatePercent: number } {
  let tax = 0;
  let lower = 0;
  let marginal = 0;
  for (const band of bands) {
    const upper = band.upTo ?? Number.POSITIVE_INFINITY;
    if (amount <= lower) break;
    const slice = Math.min(amount, upper) - lower;
    tax += (slice * band.ratePercent) / 100;
    marginal = band.ratePercent;
    lower = upper;
  }
  return { tax: round2(tax), marginalRatePercent: marginal };
}

function effectiveRate(totalTax: number, gross: number): number {
  return gross > 0 ? Math.round((totalTax / gross) * 10000) / 100 : 0;
}

// India, new regime FY 2025-26. Identical to NEW_REGIME_BANDS and the
// rebate and cess constants in the India income tax calculator.
export const INDIA_STANDARD_DEDUCTION = 75_000;
export const INDIA_BANDS: Band[] = [
  { upTo: 400_000, ratePercent: 0 },
  { upTo: 800_000, ratePercent: 5 },
  { upTo: 1_200_000, ratePercent: 10 },
  { upTo: 1_600_000, ratePercent: 15 },
  { upTo: 2_000_000, ratePercent: 20 },
  { upTo: 2_400_000, ratePercent: 25 },
  { upTo: null, ratePercent: 30 },
];
export const INDIA_REBATE_LIMIT = 1_200_000;
export const INDIA_REBATE_MAX = 60_000;
export const INDIA_CESS_PERCENT = 4;

export function indiaTax(grossYearly: number): IndiaTaxResult {
  validateGross(grossYearly);
  const taxableIncome = Math.max(0, grossYearly - INDIA_STANDARD_DEDUCTION);
  const { tax: slabTax, marginalRatePercent } = progressive(taxableIncome, INDIA_BANDS);

  // Section 87A rebate, with the marginal relief the detailed India
  // calculator applies just above the rebate limit: tax there cannot
  // exceed the income earned over 1,200,000.
  let rebate = 0;
  let taxAfterRebate = slabTax;
  if (taxableIncome <= INDIA_REBATE_LIMIT) {
    rebate = Math.min(slabTax, INDIA_REBATE_MAX);
    taxAfterRebate = slabTax - rebate;
  } else {
    taxAfterRebate = Math.min(slabTax, taxableIncome - INDIA_REBATE_LIMIT);
  }

  const cess = round2((taxAfterRebate * INDIA_CESS_PERCENT) / 100);
  const totalTax = round2(taxAfterRebate + cess);

  const breakdown: TaxBreakdownItem[] = [
    { label: "Income tax after rebate", amount: round2(taxAfterRebate) },
    { label: "Health and education cess (4 percent)", amount: cess },
  ];

  return {
    country: "india",
    gross: grossYearly,
    totalTax,
    net: round2(grossYearly - totalTax),
    effectiveRatePercent: effectiveRate(totalTax, grossYearly),
    marginalRatePercent,
    breakdown,
    standardDeduction: INDIA_STANDARD_DEDUCTION,
    taxableIncome,
    slabTax,
    rebate,
    cess,
  };
}

// United States, federal 2025 single filer brackets on taxable income.
export const US_STANDARD_DEDUCTION = 15_000;
export const US_BRACKETS: Band[] = [
  { upTo: 11_925, ratePercent: 10 },
  { upTo: 48_475, ratePercent: 12 },
  { upTo: 103_350, ratePercent: 22 },
  { upTo: 197_300, ratePercent: 24 },
  { upTo: 250_525, ratePercent: 32 },
  { upTo: 626_350, ratePercent: 35 },
  { upTo: null, ratePercent: 37 },
];
export const US_SOCIAL_SECURITY_RATE_PERCENT = 6.2;
export const US_SOCIAL_SECURITY_WAGE_CAP = 176_100;
export const US_MEDICARE_RATE_PERCENT = 1.45;

export function usTax(grossYearly: number, stateRatePercent = 0): UsTaxResult {
  validateGross(grossYearly);
  if (!Number.isFinite(stateRatePercent) || stateRatePercent < 0 || stateRatePercent > 100) {
    throw new RangeError("State tax rate must be between 0 and 100 percent.");
  }
  const taxableIncome = Math.max(0, grossYearly - US_STANDARD_DEDUCTION);
  const { tax: federal, marginalRatePercent } = progressive(taxableIncome, US_BRACKETS);
  const socialSecurity = round2(
    (Math.min(grossYearly, US_SOCIAL_SECURITY_WAGE_CAP) * US_SOCIAL_SECURITY_RATE_PERCENT) / 100,
  );
  const medicare = round2((grossYearly * US_MEDICARE_RATE_PERCENT) / 100);
  const state = round2((grossYearly * stateRatePercent) / 100);
  const totalTax = round2(federal + socialSecurity + medicare + state);

  const breakdown: TaxBreakdownItem[] = [
    { label: "Federal income tax", amount: federal },
    { label: "Social Security (6.2 percent)", amount: socialSecurity },
    { label: "Medicare (1.45 percent)", amount: medicare },
  ];
  if (state > 0) {
    breakdown.push({ label: "State tax (flat estimate)", amount: state });
  }

  return {
    country: "us",
    gross: grossYearly,
    totalTax,
    net: round2(grossYearly - totalTax),
    effectiveRatePercent: effectiveRate(totalTax, grossYearly),
    marginalRatePercent,
    breakdown,
    standardDeduction: US_STANDARD_DEDUCTION,
    taxableIncome,
    federal,
    socialSecurity,
    medicare,
    state,
  };
}

// United Kingdom, 2025-26. Bands and thresholds identical to the UK
// salary calculator: the tax bands apply to taxable income after the
// personal allowance, and the allowance tapers above 100,000.
export const UK_PERSONAL_ALLOWANCE = 12_570;
export const UK_TAPER_THRESHOLD = 100_000;
export const UK_TAX_BANDS: Band[] = [
  { upTo: 37_700, ratePercent: 20 },
  { upTo: 112_570, ratePercent: 40 },
  { upTo: null, ratePercent: 45 },
];
export const UK_NI_PRIMARY_THRESHOLD = 12_570;
export const UK_NI_UPPER_LIMIT = 50_270;
export const UK_NI_MAIN_RATE_PERCENT = 8;
export const UK_NI_ADDITIONAL_RATE_PERCENT = 2;

export function ukPersonalAllowanceFor(grossYearly: number): number {
  if (grossYearly <= UK_TAPER_THRESHOLD) return UK_PERSONAL_ALLOWANCE;
  const reduction = Math.floor((grossYearly - UK_TAPER_THRESHOLD) / 2);
  return Math.max(0, UK_PERSONAL_ALLOWANCE - reduction);
}

export function ukTax(grossYearly: number): UkTaxResult {
  validateGross(grossYearly);
  const personalAllowance = ukPersonalAllowanceFor(grossYearly);
  const taxableIncome = Math.max(0, grossYearly - personalAllowance);
  const { tax: incomeTax, marginalRatePercent } = progressive(taxableIncome, UK_TAX_BANDS);

  let nationalInsurance = 0;
  if (grossYearly > UK_NI_PRIMARY_THRESHOLD) {
    const mainSlice = Math.min(grossYearly, UK_NI_UPPER_LIMIT) - UK_NI_PRIMARY_THRESHOLD;
    nationalInsurance += (mainSlice * UK_NI_MAIN_RATE_PERCENT) / 100;
    if (grossYearly > UK_NI_UPPER_LIMIT) {
      nationalInsurance += ((grossYearly - UK_NI_UPPER_LIMIT) * UK_NI_ADDITIONAL_RATE_PERCENT) / 100;
    }
  }
  nationalInsurance = round2(nationalInsurance);

  const totalTax = round2(incomeTax + nationalInsurance);

  return {
    country: "uk",
    gross: grossYearly,
    totalTax,
    net: round2(grossYearly - totalTax),
    effectiveRatePercent: effectiveRate(totalTax, grossYearly),
    marginalRatePercent,
    breakdown: [
      { label: "Income tax", amount: incomeTax },
      { label: "National Insurance", amount: nationalInsurance },
    ],
    personalAllowance,
    taxableIncome,
    incomeTax,
    nationalInsurance,
  };
}

export function estimateIncomeTax(
  country: IncomeTaxCountry,
  grossYearly: number,
  stateRatePercent = 0,
): IndiaTaxResult | UsTaxResult | UkTaxResult {
  if (country === "india") return indiaTax(grossYearly);
  if (country === "us") return usTax(grossYearly, stateRatePercent);
  if (country === "uk") return ukTax(grossYearly);
  throw new RangeError(`Unknown country: ${String(country)}`);
}
