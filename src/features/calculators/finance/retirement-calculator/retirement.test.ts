import { describe, expect, it } from "vitest";
import { calculateRetirement } from "./retirement";

describe("calculateRetirement", () => {
  it("projects savings and end of month contributions from the formula", () => {
    // Formula: S * (1 + i)^n + P * [((1 + i)^n - 1) / i]
    // S = 50000, P = 500, age 30 to 60, so n = 360, return 8%, so i = 8/1200
    // = 546,786.48 + 745,179.72 = 1,291,966.21 approx
    const result = calculateRetirement({
      currentAge: 30,
      retirementAge: 60,
      currentSavings: 50_000,
      monthlyContribution: 500,
      expectedReturnPercent: 8,
    });
    expect(result.projectedCorpus).toBeCloseTo(1_291_966.21, 0);
    expect(result.yearsToRetirement).toBe(30);
    expect(result.totalContributions).toBe(230_000);
    expect(result.growth).toBeCloseTo(1_061_966.21, 0);
    expect(result.shortfall).toBeNull();
    expect(result.monthlyNeeded).toBeNull();
  });

  it("handles a zero return as simple addition", () => {
    const result = calculateRetirement({
      currentAge: 40,
      retirementAge: 50,
      currentSavings: 10_000,
      monthlyContribution: 100,
      expectedReturnPercent: 0,
    });
    // 10,000 + 100 * 120 months = 22,000, with no growth.
    expect(result.projectedCorpus).toBe(22_000);
    expect(result.growth).toBe(0);
  });

  it("reports zero shortfall when the goal is already reachable", () => {
    const result = calculateRetirement({
      currentAge: 30,
      retirementAge: 60,
      currentSavings: 50_000,
      monthlyContribution: 500,
      expectedReturnPercent: 8,
      goalAmount: 1_000_000,
    });
    expect(result.shortfall).toBe(0);
    // Monthly needed solves P from the formula for the part of the goal
    // not covered by current savings growth: about 304.10.
    expect(result.monthlyNeeded).toBeCloseTo(304.1, 1);
  });

  it("reports a shortfall and a higher monthly need for a bigger goal", () => {
    const result = calculateRetirement({
      currentAge: 40,
      retirementAge: 50,
      currentSavings: 10_000,
      monthlyContribution: 100,
      expectedReturnPercent: 0,
      goalAmount: 100_000,
    });
    // Zero rate: corpus 22,000, shortfall 78,000, needed = 90,000 / 120 = 750.
    expect(result.shortfall).toBe(78_000);
    expect(result.monthlyNeeded).toBe(750);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateRetirement({
        currentAge: 60,
        retirementAge: 60,
        currentSavings: 1000,
        monthlyContribution: 100,
        expectedReturnPercent: 8,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateRetirement({
        currentAge: 50,
        retirementAge: 40,
        currentSavings: 1000,
        monthlyContribution: 100,
        expectedReturnPercent: 8,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateRetirement({
        currentAge: 30,
        retirementAge: 60,
        currentSavings: 0,
        monthlyContribution: 0,
        expectedReturnPercent: 8,
      }),
    ).toThrow(RangeError);
  });
});
