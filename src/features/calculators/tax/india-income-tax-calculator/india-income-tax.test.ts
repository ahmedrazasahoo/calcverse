import { describe, expect, it } from "vitest";
import { calculateIndiaIncomeTax, progressiveTax, NEW_REGIME_BANDS } from "./india-income-tax";

describe("India income tax, new regime (Budget 2025)", () => {
  it("makes a gross salary of Rs 12.75 lakh completely tax free", () => {
    const result = calculateIndiaIncomeTax({ grossAnnualIncome: 1_275_000 });
    expect(result.newRegime.taxableIncome).toBe(1_200_000);
    expect(result.newRegime.slabTax).toBe(60_000);
    expect(result.newRegime.rebate).toBe(60_000);
    expect(result.newRegime.totalTax).toBe(0);
  });

  it("applies marginal relief just above Rs 12 lakh of taxable income", () => {
    const result = calculateIndiaIncomeTax({ grossAnnualIncome: 1_300_000 });
    // Taxable 12.25 lakh, slab tax 63,750, capped at the 25,000 excess, plus 4% cess.
    expect(result.newRegime.taxableIncome).toBe(1_225_000);
    expect(result.newRegime.totalTax).toBe(26_000);
  });

  it("computes a mid-range salary with no rebate", () => {
    const result = calculateIndiaIncomeTax({ grossAnnualIncome: 2_000_000 });
    // Taxable 19.25 lakh: 20,000 + 40,000 + 60,000 + 65,000 = 185,000, plus cess.
    expect(result.newRegime.slabTax).toBe(185_000);
    expect(result.newRegime.totalTax).toBe(192_400);
  });
});

describe("India income tax, old regime", () => {
  it("computes tax for a Rs 7 lakh salary with no extra deductions", () => {
    const result = calculateIndiaIncomeTax({ grossAnnualIncome: 700_000 });
    // Taxable 6.5 lakh: 12,500 at 5% band plus 30,000 at 20% band = 42,500, plus cess.
    expect(result.oldRegime.taxableIncome).toBe(650_000);
    expect(result.oldRegime.totalTax).toBe(44_200);
  });

  it("wipes out tax at Rs 5 lakh taxable through the 87A rebate", () => {
    const result = calculateIndiaIncomeTax({ grossAnnualIncome: 550_000 });
    expect(result.oldRegime.taxableIncome).toBe(500_000);
    expect(result.oldRegime.rebate).toBe(12_500);
    expect(result.oldRegime.totalTax).toBe(0);
  });

  it("rewards deductions that only the old regime allows", () => {
    const without = calculateIndiaIncomeTax({ grossAnnualIncome: 1_500_000 });
    const withDeductions = calculateIndiaIncomeTax({
      grossAnnualIncome: 1_500_000,
      oldRegimeDeductions: 400_000,
    });
    expect(withDeductions.oldRegime.totalTax).toBeLessThan(without.oldRegime.totalTax);
    expect(withDeductions.newRegime.totalTax).toBe(without.newRegime.totalTax);
  });

  it("gives senior citizens the higher basic exemption in the old regime", () => {
    const result = calculateIndiaIncomeTax({
      grossAnnualIncome: 350_000,
      ageGroup: "60to80",
    });
    // Standard deduction 50,000 leaves 300,000, exactly the senior exemption.
    expect(result.oldRegime.taxableIncome).toBe(300_000);
    expect(result.oldRegime.totalTax).toBe(0);
  });
});

describe("regime comparison", () => {
  it("recommends the new regime at Rs 12.75 lakh and reports the saving", () => {
    const result = calculateIndiaIncomeTax({ grossAnnualIncome: 1_275_000 });
    expect(result.betterRegime).toBe("new");
    expect(result.savings).toBe(result.oldRegime.totalTax);
  });

  it("rejects negative input", () => {
    expect(() => calculateIndiaIncomeTax({ grossAnnualIncome: -1 })).toThrow(RangeError);
    expect(() =>
      calculateIndiaIncomeTax({ grossAnnualIncome: 1000, oldRegimeDeductions: -5 }),
    ).toThrow(RangeError);
  });
});

describe("progressiveTax", () => {
  it("taxes only the slice inside each band", () => {
    // At 12 lakh under the new regime: 20,000 plus 40,000.
    expect(progressiveTax(1_200_000, NEW_REGIME_BANDS)).toBe(60_000);
    expect(progressiveTax(400_000, NEW_REGIME_BANDS)).toBe(0);
  });
});
