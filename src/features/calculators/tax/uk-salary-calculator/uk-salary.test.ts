import { describe, expect, it } from "vitest";
import { calculateUkSalary, personalAllowanceFor } from "./uk-salary";

describe("calculateUkSalary, tax year 2025-26", () => {
  it("computes take home pay on a GBP 30,000 salary", () => {
    const result = calculateUkSalary({ grossAnnualSalary: 30_000 });
    expect(result.personalAllowance).toBe(12_570);
    expect(result.taxableIncome).toBe(17_430);
    expect(result.incomeTax).toBe(3_486);
    expect(result.nationalInsurance).toBeCloseTo(1_394.4, 2);
    expect(result.netAnnual).toBeCloseTo(25_119.6, 2);
    expect(result.marginalTaxBand).toBe("Basic rate");
  });

  it("computes take home pay on a GBP 50,000 salary", () => {
    const result = calculateUkSalary({ grossAnnualSalary: 50_000 });
    expect(result.incomeTax).toBe(7_486);
    expect(result.nationalInsurance).toBeCloseTo(2_994.4, 2);
    expect(result.netAnnual).toBeCloseTo(39_519.6, 2);
  });

  it("charges the 2 percent NI rate above the upper earnings limit", () => {
    const result = calculateUkSalary({ grossAnnualSalary: 60_000 });
    // NI: 8% of (50,270 - 12,570) = 3,016 plus 2% of 9,730 = 194.60.
    expect(result.nationalInsurance).toBeCloseTo(3_210.6, 2);
    expect(result.marginalTaxBand).toBe("Higher rate");
  });

  it("tapers the personal allowance away by GBP 125,140", () => {
    expect(personalAllowanceFor(100_000)).toBe(12_570);
    expect(personalAllowanceFor(110_000)).toBe(7_570);
    expect(personalAllowanceFor(125_140)).toBe(0);
    expect(personalAllowanceFor(200_000)).toBe(0);
  });

  it("taxes a GBP 125,140 salary across all three bands", () => {
    const result = calculateUkSalary({ grossAnnualSalary: 125_140 });
    // 7,540 at 20% + 29,948 at 40% + 5,656.50 at 45%.
    expect(result.incomeTax).toBeCloseTo(43_144.5, 2);
    expect(result.marginalTaxBand).toBe("Additional rate");
  });

  it("treats pension contributions as salary sacrifice", () => {
    const plain = calculateUkSalary({ grossAnnualSalary: 50_000 });
    const withPension = calculateUkSalary({
      grossAnnualSalary: 50_000,
      pensionPercent: 5,
    });
    expect(withPension.pensionContribution).toBe(2_500);
    expect(withPension.incomeTax).toBeLessThan(plain.incomeTax);
    expect(withPension.nationalInsurance).toBeLessThan(plain.nationalInsurance);
  });

  it("adds Plan 2 student loan repayments above the threshold", () => {
    const result = calculateUkSalary({
      grossAnnualSalary: 40_000,
      studentLoanPlan: "plan2",
    });
    // 9% of (40,000 - 27,295) = 1,143.45.
    expect(result.studentLoanRepayment).toBeCloseTo(1_143.45, 2);
  });

  it("charges no student loan below the threshold", () => {
    const result = calculateUkSalary({
      grossAnnualSalary: 25_000,
      studentLoanPlan: "plan2",
    });
    expect(result.studentLoanRepayment).toBe(0);
  });

  it("rejects invalid input", () => {
    expect(() => calculateUkSalary({ grossAnnualSalary: -1 })).toThrow(RangeError);
    expect(() =>
      calculateUkSalary({ grossAnnualSalary: 30_000, pensionPercent: 100 }),
    ).toThrow(RangeError);
  });
});
