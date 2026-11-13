/**
 * Pakistan salary income tax calculator logic.
 *
 * Salaried individuals are taxed under Division I, Part I of the First
 * Schedule to the Income Tax Ordinance, 2001. A person counts as salaried
 * when salary is more than 75 percent of total taxable income.
 *
 * Sources (official):
 * - Tax year 2025-26: Finance Act, 2025 (Federal Board of Revenue, FBR).
 *   Six slabs from 0 to 35 percent. A surcharge of 9 percent under
 *   section 4AB applies on the tax where taxable income exceeds
 *   Rs 10,000,000.
 * - Tax year 2026-27: Finance Act, 2026 (gazetted 26 June 2026, effective
 *   1 July 2026). Eight slabs, the 35 percent band moved from Rs 4.1
 *   million to Rs 7 million, and the section 4AB surcharge withdrawn for
 *   salaried individuals.
 *
 * Each slab is stored exactly as the Schedule states it: a fixed amount
 * of tax accumulated at the slab floor, plus a rate on the excess.
 */

export interface PakistanTaxSlab {
  /** Lower bound of the slab (exclusive of the previous slab ceiling). */
  from: number;
  /** Upper bound of the slab, or null for the open-ended top slab. */
  upTo: number | null;
  /** Tax accumulated at the slab floor, in rupees. */
  fixedAmount: number;
  /** Marginal rate in percent on income above the slab floor. */
  ratePercent: number;
}

export interface PakistanTaxYear {
  id: string;
  label: string;
  financeAct: string;
  slabs: PakistanTaxSlab[];
  /** Section 4AB surcharge, or null when it does not apply to salary. */
  surcharge: { incomeThreshold: number; ratePercent: number } | null;
}

export const PAKISTAN_TAX_YEARS: Record<"2025-26" | "2026-27", PakistanTaxYear> = {
  "2025-26": {
    id: "2025-26",
    label: "Tax Year 2025-26",
    financeAct: "Finance Act, 2025",
    surcharge: { incomeThreshold: 10_000_000, ratePercent: 9 },
    slabs: [
      { from: 0, upTo: 600_000, fixedAmount: 0, ratePercent: 0 },
      { from: 600_000, upTo: 1_200_000, fixedAmount: 0, ratePercent: 1 },
      { from: 1_200_000, upTo: 2_200_000, fixedAmount: 6_000, ratePercent: 11 },
      { from: 2_200_000, upTo: 3_200_000, fixedAmount: 116_000, ratePercent: 23 },
      { from: 3_200_000, upTo: 4_100_000, fixedAmount: 346_000, ratePercent: 30 },
      { from: 4_100_000, upTo: null, fixedAmount: 616_000, ratePercent: 35 },
    ],
  },
  "2026-27": {
    id: "2026-27",
    label: "Tax Year 2026-27",
    financeAct: "Finance Act, 2026",
    surcharge: null, // Withdrawn for salaried individuals by the Finance Act, 2026.
    slabs: [
      { from: 0, upTo: 600_000, fixedAmount: 0, ratePercent: 0 },
      { from: 600_000, upTo: 1_200_000, fixedAmount: 0, ratePercent: 1 },
      { from: 1_200_000, upTo: 2_200_000, fixedAmount: 6_000, ratePercent: 11 },
      { from: 2_200_000, upTo: 3_200_000, fixedAmount: 116_000, ratePercent: 20 },
      { from: 3_200_000, upTo: 4_100_000, fixedAmount: 316_000, ratePercent: 25 },
      { from: 4_100_000, upTo: 5_600_000, fixedAmount: 541_000, ratePercent: 29 },
      { from: 5_600_000, upTo: 7_000_000, fixedAmount: 976_000, ratePercent: 32 },
      { from: 7_000_000, upTo: null, fixedAmount: 1_424_000, ratePercent: 35 },
    ],
  },
};

export type PakistanTaxYearId = keyof typeof PAKISTAN_TAX_YEARS;

export interface PakistanSalaryTaxInput {
  /** Annual taxable salary in rupees. Monthly input is converted by the UI. */
  annualTaxableIncome: number;
  /** Which tax year table to apply. */
  taxYear: PakistanTaxYearId;
}

export interface PakistanSalaryTaxResult {
  taxYear: PakistanTaxYearId;
  annualTaxableIncome: number;
  /** Slab tax before any surcharge. */
  taxBeforeSurcharge: number;
  surcharge: number;
  totalTax: number;
  /** Income left after tax. */
  netAnnualIncome: number;
  monthlyTax: number;
  netMonthlyIncome: number;
  /** Total tax as a percentage of income. */
  effectiveRatePercent: number;
  /** Marginal rate of the slab the income falls in. */
  marginalRatePercent: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculatePakistanSalaryTax(
  input: PakistanSalaryTaxInput,
): PakistanSalaryTaxResult {
  const { annualTaxableIncome } = input;
  if (!Number.isFinite(annualTaxableIncome) || annualTaxableIncome < 0) {
    throw new RangeError("Annual income must be zero or greater.");
  }
  const year = PAKISTAN_TAX_YEARS[input.taxYear];
  if (!year) {
    throw new RangeError(`Unknown tax year: ${String(input.taxYear)}`);
  }

  const slab =
    year.slabs.find(
      (s) => annualTaxableIncome > s.from && (s.upTo === null || annualTaxableIncome <= s.upTo),
    ) ?? year.slabs[0];

  const taxBeforeSurcharge = round2(
    slab.fixedAmount + ((annualTaxableIncome - slab.from) * slab.ratePercent) / 100,
  );
  const surcharge =
    year.surcharge && annualTaxableIncome > year.surcharge.incomeThreshold
      ? round2((taxBeforeSurcharge * year.surcharge.ratePercent) / 100)
      : 0;
  const totalTax = round2(taxBeforeSurcharge + surcharge);

  return {
    taxYear: input.taxYear,
    annualTaxableIncome,
    taxBeforeSurcharge,
    surcharge,
    totalTax,
    netAnnualIncome: round2(annualTaxableIncome - totalTax),
    monthlyTax: round2(totalTax / 12),
    netMonthlyIncome: round2((annualTaxableIncome - totalTax) / 12),
    effectiveRatePercent:
      annualTaxableIncome > 0
        ? Math.round((totalTax / annualTaxableIncome) * 10000) / 100
        : 0,
    marginalRatePercent: slab.ratePercent,
  };
}
