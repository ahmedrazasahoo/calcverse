import { describe, expect, it } from "vitest";
import { calculateCompoundInterest } from "./compound-interest";

describe("calculateCompoundInterest", () => {
  it("grows 10,000 at 10% yearly to 12,100 in two years", () => {
    const result = calculateCompoundInterest({
      principal: 10_000,
      annualRatePercent: 10,
      years: 2,
      compounding: "yearly",
    });
    expect(result.finalBalance).toBe(12_100);
    expect(result.totalInterest).toBe(2_100);
    expect(result.yearlyBreakdown).toHaveLength(2);
  });

  it("adds monthly contributions on a monthly schedule", () => {
    const result = calculateCompoundInterest({
      principal: 10_000,
      annualRatePercent: 12,
      years: 1,
      compounding: "monthly",
      monthlyContribution: 100,
    });
    // Principal grows to 11,268.25; 12 end-of-month deposits of 100 grow to 1,268.25.
    expect(result.finalBalance).toBeCloseTo(12_536.5, 1);
    expect(result.totalContributions).toBe(11_200);
  });

  it("compounds daily faster than yearly at the same headline rate", () => {
    const daily = calculateCompoundInterest({
      principal: 10_000,
      annualRatePercent: 10,
      years: 5,
      compounding: "daily",
    });
    const yearly = calculateCompoundInterest({
      principal: 10_000,
      annualRatePercent: 10,
      years: 5,
      compounding: "yearly",
    });
    expect(daily.finalBalance).toBeGreaterThan(yearly.finalBalance);
  });

  it("handles a zero rate with contributions only", () => {
    const result = calculateCompoundInterest({
      principal: 0,
      annualRatePercent: 0,
      years: 2,
      compounding: "monthly",
      monthlyContribution: 250,
    });
    expect(result.finalBalance).toBe(6_000);
    expect(result.totalInterest).toBe(0);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateCompoundInterest({
        principal: -1,
        annualRatePercent: 5,
        years: 2,
        compounding: "yearly",
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateCompoundInterest({
        principal: 0,
        annualRatePercent: 5,
        years: 2,
        compounding: "yearly",
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateCompoundInterest({
        principal: 100,
        annualRatePercent: 5,
        years: 0,
        compounding: "yearly",
      }),
    ).toThrow(RangeError);
  });
});
