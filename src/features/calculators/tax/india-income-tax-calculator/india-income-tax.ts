/**
 * India income tax calculator logic, financial year 2025-26
 * (assessment year 2026-27), comparing the old regime with the new
 * regime under section 115BAC as revised by the Union Budget 2025.
 *
 * Sources (official): the Income-tax Act, 1961 as amended by the
 * Finance Act, 2025; Income Tax Department slab announcements for
 * FY 2025-26.
 *
 * New regime highlights modelled here:
 * - Slabs: nil to Rs 4 lakh, then 5, 10, 15, 20, 25 and 30 percent.
 * - Standard deduction for salaried taxpayers: Rs 75,000.
 * - Section 87A rebate up to Rs 60,000 when taxable income is at most
 *   Rs 12 lakh, with marginal relief just above that line, which is
 *   what makes a gross salary of Rs 12.75 lakh tax free.
 * - Surcharge capped at 25 percent.
 *
 * Old regime highlights modelled here:
 * - Slabs by age group, standard deduction Rs 50,000.
 * - Section 87A rebate up to Rs 12,500 when taxable income is at most
 *   Rs 5 lakh.
 * - User supplied deductions (80C, 80D, HRA and so on) reduce taxable
 *   income under this regime only.
 *
 * Health and education cess of 4 percent applies on tax plus surcharge
 * in both regimes. Surcharge marginal relief is applied at each
 * surcharge threshold.
 */

export interface TaxBand {
  /** Upper edge of the band, or null for the open top band. */
  upTo: number | null;
  ratePercent: number;
}

export const NEW_REGIME_BANDS: TaxBand[] = [
  { upTo: 400_000, ratePercent: 0 },
  { upTo: 800_000, ratePercent: 5 },
  { upTo: 1_200_000, ratePercent: 10 },
  { upTo: 1_600_000, ratePercent: 15 },
  { upTo: 2_000_000, ratePercent: 20 },
  { upTo: 2_400_000, ratePercent: 25 },
  { upTo: null, ratePercent: 30 },
];

export const OLD_REGIME_BANDS_BELOW_60: TaxBand[] = [
  { upTo: 250_000, ratePercent: 0 },
  { upTo: 500_000, ratePercent: 5 },
  { upTo: 1_000_000, ratePercent: 20 },
  { upTo: null, ratePercent: 30 },
];

export const OLD_REGIME_BANDS_60_TO_80: TaxBand[] = [
  { upTo: 300_000, ratePercent: 0 },
  { upTo: 500_000, ratePercent: 5 },
  { upTo: 1_000_000, ratePercent: 20 },
  { upTo: null, ratePercent: 30 },
];

export const OLD_REGIME_BANDS_ABOVE_80: TaxBand[] = [
  { upTo: 500_000, ratePercent: 0 },
  { upTo: 1_000_000, ratePercent: 20 },
  { upTo: null, ratePercent: 30 },
];

export const NEW_STANDARD_DEDUCTION = 75_000;
export const OLD_STANDARD_DEDUCTION = 50_000;
export const NEW_REBATE_LIMIT = 1_200_000;
export const NEW_REBATE_MAX = 60_000;
export const OLD_REBATE_LIMIT = 500_000;
export const OLD_REBATE_MAX = 12_500;
export const CESS_PERCENT = 4;

interface SurchargeStep {
  /** Surcharge applies when taxable income exceeds this amount. */
  above: number;
  ratePercent: number;
}

const NEW_SURCHARGE_STEPS: SurchargeStep[] = [
  { above: 5_000_000, ratePercent: 10 },
  { above: 10_000_000, ratePercent: 15 },
  { above: 20_000_000, ratePercent: 25 },
];

const OLD_SURCHARGE_STEPS: SurchargeStep[] = [
  { above: 5_000_000, ratePercent: 10 },
  { above: 10_000_000, ratePercent: 15 },
  { above: 20_000_000, ratePercent: 25 },
  { above: 50_000_000, ratePercent: 37 },
];

export type IndiaAgeGroup = "below60" | "60to80" | "above80";
export type IndiaRegime = "old" | "new";

export interface IndiaTaxInput {
  /** Gross annual salary income in rupees. */
  grossAnnualIncome: number;
  /**
   * Total deductions claimed under the old regime beyond the standard
   * deduction (80C, 80D, HRA exemption and similar). Defaults to zero.
   */
  oldRegimeDeductions?: number;
  /** Age group, which changes the old regime basic exemption. */
  ageGroup?: IndiaAgeGroup;
}

export interface IndiaRegimeResult {
  regime: IndiaRegime;
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  slabTax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  netIncome: number;
  effectiveRatePercent: number;
}

export interface IndiaTaxComparison {
  oldRegime: IndiaRegimeResult;
  newRegime: IndiaRegimeResult;
  betterRegime: IndiaRegime | "equal";
  /** Tax saved by choosing the better regime. */
  savings: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Progressive tax on a taxable income using a band table. */
export function progressiveTax(taxableIncome: number, bands: TaxBand[]): number {
  let tax = 0;
  let lower = 0;
  for (const band of bands) {
    const upper = band.upTo ?? Number.POSITIVE_INFINITY;
    if (taxableIncome <= lower) break;
    const slice = Math.min(taxableIncome, upper) - lower;
    tax += (slice * band.ratePercent) / 100;
    lower = upper;
  }
  return round2(tax);
}

function surchargeRateFor(income: number, steps: SurchargeStep[]): number {
  let rate = 0;
  for (const step of steps) {
    if (income > step.above) rate = step.ratePercent;
  }
  return rate;
}

/**
 * Surcharge with marginal relief: tax plus surcharge at an income just
 * above a threshold never exceeds the liability at the threshold plus
 * the extra income earned.
 */
function computeSurcharge(
  taxAfterRebate: number,
  taxableIncome: number,
  bands: TaxBand[],
  steps: SurchargeStep[],
): number {
  const rate = surchargeRateFor(taxableIncome, steps);
  if (rate === 0 || taxAfterRebate === 0) return 0;
  let surcharge = (taxAfterRebate * rate) / 100;

  const crossed = steps.filter((s) => taxableIncome > s.above);
  const threshold = crossed[crossed.length - 1].above;
  const taxAtThreshold = progressiveTax(threshold, bands);
  const lowerRate = surchargeRateFor(threshold, steps);
  const liabilityAtThreshold = taxAtThreshold + (taxAtThreshold * lowerRate) / 100;
  const maxPayable = liabilityAtThreshold + (taxableIncome - threshold);
  if (taxAfterRebate + surcharge > maxPayable) {
    surcharge = Math.max(0, maxPayable - taxAfterRebate);
  }
  return round2(surcharge);
}

function computeRegime(
  regime: IndiaRegime,
  grossAnnualIncome: number,
  oldRegimeDeductions: number,
  ageGroup: IndiaAgeGroup,
): IndiaRegimeResult {
  const isNew = regime === "new";
  const standardDeduction = isNew ? NEW_STANDARD_DEDUCTION : OLD_STANDARD_DEDUCTION;
  const otherDeductions = isNew ? 0 : oldRegimeDeductions;
  const taxableIncome = Math.max(
    0,
    grossAnnualIncome - standardDeduction - otherDeductions,
  );
  const bands = isNew
    ? NEW_REGIME_BANDS
    : ageGroup === "60to80"
      ? OLD_REGIME_BANDS_60_TO_80
      : ageGroup === "above80"
        ? OLD_REGIME_BANDS_ABOVE_80
        : OLD_REGIME_BANDS_BELOW_60;

  const slabTax = progressiveTax(taxableIncome, bands);

  let rebate = 0;
  let taxAfterRebate = slabTax;
  if (isNew) {
    if (taxableIncome <= NEW_REBATE_LIMIT) {
      rebate = Math.min(slabTax, NEW_REBATE_MAX);
      taxAfterRebate = slabTax - rebate;
    } else {
      // Marginal relief: tax cannot exceed the income above Rs 12 lakh.
      taxAfterRebate = Math.min(slabTax, taxableIncome - NEW_REBATE_LIMIT);
    }
  } else if (taxableIncome <= OLD_REBATE_LIMIT) {
    rebate = Math.min(slabTax, OLD_REBATE_MAX);
    taxAfterRebate = slabTax - rebate;
  }

  const surcharge = computeSurcharge(
    taxAfterRebate,
    taxableIncome,
    bands,
    isNew ? NEW_SURCHARGE_STEPS : OLD_SURCHARGE_STEPS,
  );
  const cess = round2(((taxAfterRebate + surcharge) * CESS_PERCENT) / 100);
  const totalTax = round2(taxAfterRebate + surcharge + cess);

  return {
    regime,
    grossIncome: grossAnnualIncome,
    standardDeduction,
    otherDeductions,
    taxableIncome,
    slabTax,
    rebate,
    surcharge,
    cess,
    totalTax,
    netIncome: round2(grossAnnualIncome - totalTax),
    effectiveRatePercent:
      grossAnnualIncome > 0
        ? Math.round((totalTax / grossAnnualIncome) * 10000) / 100
        : 0,
  };
}

export function calculateIndiaIncomeTax(input: IndiaTaxInput): IndiaTaxComparison {
  if (!Number.isFinite(input.grossAnnualIncome) || input.grossAnnualIncome < 0) {
    throw new RangeError("Gross income must be zero or greater.");
  }
  const deductions = input.oldRegimeDeductions ?? 0;
  if (!Number.isFinite(deductions) || deductions < 0) {
    throw new RangeError("Deductions must be zero or greater.");
  }
  const ageGroup: IndiaAgeGroup = input.ageGroup ?? "below60";

  const newRegime = computeRegime("new", input.grossAnnualIncome, deductions, ageGroup);
  const oldRegime = computeRegime("old", input.grossAnnualIncome, deductions, ageGroup);

  const betterRegime: IndiaRegime | "equal" =
    newRegime.totalTax === oldRegime.totalTax
      ? "equal"
      : newRegime.totalTax < oldRegime.totalTax
        ? "new"
        : "old";

  return {
    oldRegime,
    newRegime,
    betterRegime,
    savings: round2(Math.abs(newRegime.totalTax - oldRegime.totalTax)),
  };
}
