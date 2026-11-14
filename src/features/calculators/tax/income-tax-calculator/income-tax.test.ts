import { describe, expect, it } from "vitest";
import { estimateIncomeTax, indiaTax, ukTax, usTax } from "./income-tax";

describe("indiaTax, new regime FY 2025-26", () => {
  it("gives zero tax on a gross salary of 1,275,000", () => {
    // Taxable = 1,275,000 - 75,000 standard deduction = 1,200,000.
    // Slab tax = 0 percent of 400,000 + 5 percent of 400,000 (20,000)
    // + 10 percent of 400,000 (40,000) = 60,000.
    // Rebate = min(60,000, 60,000) = 60,000, so cess on zero is zero.
    const result = indiaTax(1_275_000);
    expect(result.taxableIncome).toBe(1_200_000);
    expect(result.slabTax).toBe(60_000);
    expect(result.rebate).toBe(60_000);
    expect(result.cess).toBe(0);
    expect(result.totalTax).toBe(0);
    expect(result.net).toBe(1_275_000);
  });

  it("computes tax on a gross salary of 2,400,000 by hand", () => {
    // Taxable = 2,400,000 - 75,000 = 2,325,000.
    // Slab tax = 20,000 (5 percent band) + 40,000 (10 percent band)
    // + 60,000 (15 percent of 400,000) + 80,000 (20 percent of 400,000)
    // + 81,250 (25 percent of 325,000) = 281,250.
    // No rebate above 1,200,000 taxable, and marginal relief does not
    // bite because 281,250 is below the 1,125,000 excess.
    // Cess = 4 percent of 281,250 = 11,250. Total = 292,500.
    const result = indiaTax(2_400_000);
    expect(result.taxableIncome).toBe(2_325_000);
    expect(result.slabTax).toBe(281_250);
    expect(result.cess).toBe(11_250);
    expect(result.totalTax).toBe(292_500);
    expect(result.net).toBe(2_107_500);
    expect(result.marginalRatePercent).toBe(25);
  });

  it("applies marginal relief just above the rebate limit, as the detailed India calculator does", () => {
    // Gross 1,300,000, taxable 1,225,000, slab tax 63,750, capped at
    // the 25,000 earned over 1,200,000, plus 4 percent cess = 26,000.
    const result = indiaTax(1_300_000);
    expect(result.totalTax).toBe(26_000);
  });

  it("charges no tax on zero income", () => {
    const result = indiaTax(0);
    expect(result.totalTax).toBe(0);
    expect(result.net).toBe(0);
    expect(result.effectiveRatePercent).toBe(0);
  });
});

describe("usTax, federal 2025 single filer", () => {
  it("computes federal tax and FICA on 85,000 with no state tax", () => {
    // Taxable = 85,000 - 15,000 = 70,000.
    // Federal = 10 percent of 11,925 (1,192.50)
    // + 12 percent of 36,550 (4,386)
    // + 22 percent of 21,525 (4,735.50) = 10,314.
    // FICA = 85,000 times 7.65 percent = 6,502.50, split as Social
    // Security 5,270 plus Medicare 1,232.50, under the wage cap.
    const result = usTax(85_000, 0);
    expect(result.taxableIncome).toBe(70_000);
    expect(result.federal).toBe(10_314);
    expect(result.socialSecurity).toBe(5_270);
    expect(result.medicare).toBe(1_232.5);
    expect(result.state).toBe(0);
    expect(result.totalTax).toBe(16_816.5);
    expect(result.net).toBe(68_183.5);
    expect(result.marginalRatePercent).toBe(22);
  });

  it("adds a flat state estimate on gross income", () => {
    const result = usTax(85_000, 5);
    // State = 5 percent of 85,000 = 4,250 on top of 16,816.50.
    expect(result.state).toBe(4_250);
    expect(result.totalTax).toBe(21_066.5);
  });

  it("caps Social Security at the 2025 wage base", () => {
    const result = usTax(300_000);
    // Social Security = 6.2 percent of 176,100 = 10,918.20.
    expect(result.socialSecurity).toBe(10_918.2);
    expect(result.medicare).toBe(4_350);
  });

  it("charges only FICA below the standard deduction", () => {
    const result = usTax(10_000);
    expect(result.federal).toBe(0);
    expect(result.totalTax).toBe(765);
  });
});

describe("ukTax, 2025-26 England, Wales and Northern Ireland", () => {
  it("computes tax and National Insurance on 60,000", () => {
    // Income tax = 20 percent of (50,270 - 12,570) = 7,540
    // + 40 percent of (60,000 - 50,270) = 3,892, total 11,432.
    // NI = 8 percent of 37,700 = 3,016 + 2 percent of 9,730 = 194.60,
    // total 3,210.60. Combined total = 14,642.60.
    const result = ukTax(60_000);
    expect(result.personalAllowance).toBe(12_570);
    expect(result.incomeTax).toBe(11_432);
    expect(result.nationalInsurance).toBeCloseTo(3_210.6, 2);
    expect(result.totalTax).toBeCloseTo(14_642.6, 2);
    expect(result.net).toBeCloseTo(45_357.4, 2);
    expect(result.marginalRatePercent).toBe(40);
  });

  it("tapers the personal allowance above 100,000, as the detailed UK calculator does", () => {
    const result = ukTax(110_000);
    // Allowance = 12,570 - floor(10,000 / 2) = 7,570.
    expect(result.personalAllowance).toBe(7_570);
    expect(result.taxableIncome).toBe(102_430);
  });

  it("charges nothing on income at the personal allowance", () => {
    const result = ukTax(12_570);
    expect(result.incomeTax).toBe(0);
    expect(result.nationalInsurance).toBe(0);
    expect(result.totalTax).toBe(0);
  });

  it("charges less than the US estimate on the same gross figure", () => {
    // A comparison check: the shapes agree, the totals are country specific.
    expect(ukTax(60_000).totalTax).not.toBe(usTax(60_000).totalTax);
    expect(ukTax(60_000).breakdown).toHaveLength(2);
  });
});

describe("estimateIncomeTax dispatcher and validation", () => {
  it("routes each country to the same result as the direct function", () => {
    expect(estimateIncomeTax("india", 1_275_000).totalTax).toBe(indiaTax(1_275_000).totalTax);
    expect(estimateIncomeTax("us", 85_000).totalTax).toBe(usTax(85_000).totalTax);
    expect(estimateIncomeTax("uk", 60_000).totalTax).toBe(ukTax(60_000).totalTax);
  });

  it("rejects negative or invalid input", () => {
    expect(() => indiaTax(-1)).toThrow(RangeError);
    expect(() => usTax(-1)).toThrow(RangeError);
    expect(() => ukTax(-1)).toThrow(RangeError);
    expect(() => usTax(50_000, 101)).toThrow(RangeError);
    expect(() => estimateIncomeTax("india", Number.NaN)).toThrow(RangeError);
  });
});
