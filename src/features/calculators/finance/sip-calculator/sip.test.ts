import { describe, expect, it } from "vitest";
import { calculateSip } from "./sip";

describe("calculateSip", () => {
  it("projects 10,000 a month at 12% for 10 years to about 23.2 lakh", () => {
    const result = calculateSip({
      monthlyInvestment: 10_000,
      expectedAnnualReturnPercent: 12,
      years: 10,
    });
    expect(result.investedAmount).toBe(1_200_000);
    // Widely published figure for this classic example is near Rs 23.23 lakh.
    expect(result.maturityValue).toBeGreaterThan(2_300_000);
    expect(result.maturityValue).toBeLessThan(2_350_000);
    expect(result.estimatedGain).toBeCloseTo(
      result.maturityValue - result.investedAmount,
      2,
    );
    expect(result.yearlyBreakdown).toHaveLength(10);
  });

  it("returns contributions only when the return is zero", () => {
    const result = calculateSip({
      monthlyInvestment: 5_000,
      expectedAnnualReturnPercent: 0,
      years: 5,
    });
    expect(result.maturityValue).toBe(300_000);
    expect(result.estimatedGain).toBe(0);
  });

  it("grows faster with a longer horizon at the same return", () => {
    const ten = calculateSip({
      monthlyInvestment: 5_000,
      expectedAnnualReturnPercent: 12,
      years: 10,
    });
    const twenty = calculateSip({
      monthlyInvestment: 5_000,
      expectedAnnualReturnPercent: 12,
      years: 20,
    });
    expect(twenty.maturityValue).toBeGreaterThan(ten.maturityValue * 2);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateSip({ monthlyInvestment: 0, expectedAnnualReturnPercent: 12, years: 10 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateSip({
        monthlyInvestment: 1000,
        expectedAnnualReturnPercent: -2,
        years: 10,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateSip({ monthlyInvestment: 1000, expectedAnnualReturnPercent: 12, years: 0 }),
    ).toThrow(RangeError);
  });
});
