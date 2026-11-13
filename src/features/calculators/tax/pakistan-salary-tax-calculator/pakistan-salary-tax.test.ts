import { describe, expect, it } from "vitest";
import {
  calculatePakistanSalaryTax,
  PAKISTAN_TAX_YEARS,
} from "./pakistan-salary-tax";

describe("Pakistan salary tax, tax year 2025-26 (Finance Act, 2025)", () => {
  it("charges nothing up to Rs 600,000", () => {
    const result = calculatePakistanSalaryTax({
      annualTaxableIncome: 600_000,
      taxYear: "2025-26",
    });
    expect(result.totalTax).toBe(0);
  });

  it("charges 1 percent of the excess at Rs 1,200,000 for a total of 6,000", () => {
    const result = calculatePakistanSalaryTax({
      annualTaxableIncome: 1_200_000,
      taxYear: "2025-26",
    });
    expect(result.totalTax).toBe(6_000);
    expect(result.marginalRatePercent).toBe(1);
  });

  it("reaches the published fixed amounts at each slab ceiling", () => {
    expect(
      calculatePakistanSalaryTax({ annualTaxableIncome: 2_200_000, taxYear: "2025-26" })
        .taxBeforeSurcharge,
    ).toBe(116_000);
    expect(
      calculatePakistanSalaryTax({ annualTaxableIncome: 3_200_000, taxYear: "2025-26" })
        .taxBeforeSurcharge,
    ).toBe(346_000);
    expect(
      calculatePakistanSalaryTax({ annualTaxableIncome: 4_100_000, taxYear: "2025-26" })
        .taxBeforeSurcharge,
    ).toBe(616_000);
  });

  it("applies the 9 percent surcharge above Rs 10 million", () => {
    const result = calculatePakistanSalaryTax({
      annualTaxableIncome: 12_000_000,
      taxYear: "2025-26",
    });
    // Slab tax: 616,000 + 35% of 7,900,000 = 3,381,000. Surcharge 9% = 304,290.
    expect(result.taxBeforeSurcharge).toBe(3_381_000);
    expect(result.surcharge).toBe(304_290);
    expect(result.totalTax).toBe(3_685_290);
  });

  it("charges no surcharge at exactly Rs 10 million", () => {
    const result = calculatePakistanSalaryTax({
      annualTaxableIncome: 10_000_000,
      taxYear: "2025-26",
    });
    expect(result.surcharge).toBe(0);
  });
});

describe("Pakistan salary tax, tax year 2026-27 (Finance Act, 2026)", () => {
  it("keeps the first two slabs unchanged", () => {
    expect(
      calculatePakistanSalaryTax({ annualTaxableIncome: 2_200_000, taxYear: "2026-27" })
        .totalTax,
    ).toBe(116_000);
  });

  it("reaches Rs 1,424,000 at the Rs 7 million ceiling of the 32 percent slab", () => {
    const result = calculatePakistanSalaryTax({
      annualTaxableIncome: 7_000_000,
      taxYear: "2026-27",
    });
    expect(result.totalTax).toBe(1_424_000);
    expect(result.marginalRatePercent).toBe(32);
  });

  it("applies 35 percent only above Rs 7 million and charges no surcharge", () => {
    const result = calculatePakistanSalaryTax({
      annualTaxableIncome: 12_000_000,
      taxYear: "2026-27",
    });
    // 1,424,000 + 35% of 5,000,000 = 3,174,000, and no surcharge at all.
    expect(result.totalTax).toBe(3_174_000);
    expect(result.surcharge).toBe(0);
  });

  it("matches the published fixed amount at Rs 3,200,000", () => {
    expect(
      calculatePakistanSalaryTax({ annualTaxableIncome: 3_200_000, taxYear: "2026-27" })
        .totalTax,
    ).toBe(316_000);
  });
});

describe("slab table integrity", () => {
  it("has continuous fixed amounts in both years", () => {
    for (const year of Object.values(PAKISTAN_TAX_YEARS)) {
      for (let i = 1; i < year.slabs.length; i += 1) {
        const prev = year.slabs[i - 1];
        const current = year.slabs[i];
        const expected =
          prev.fixedAmount +
          ((prev.upTo! - prev.from) * prev.ratePercent) / 100;
        expect(current.fixedAmount).toBeCloseTo(expected, 2);
        expect(current.from).toBe(prev.upTo);
      }
    }
  });

  it("rejects negative income and unknown years", () => {
    expect(() =>
      calculatePakistanSalaryTax({ annualTaxableIncome: -1, taxYear: "2025-26" }),
    ).toThrow(RangeError);
    expect(() =>
      calculatePakistanSalaryTax({
        annualTaxableIncome: 1000,
        // @ts-expect-error deliberately invalid year
        taxYear: "2030-31",
      }),
    ).toThrow(RangeError);
  });
});
