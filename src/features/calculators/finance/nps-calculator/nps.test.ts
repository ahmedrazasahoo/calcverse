import { describe, expect, it } from "vitest";
import { calculateNps } from "./nps";

describe("calculateNps", () => {
  it("computes the corpus at 60 from the annuity due formula", () => {
    // Formula: corpus = P * [((1 + i)^n - 1) / i] * (1 + i)
    // P = 5000, age 40, so n = 240 months, return 12%, so i = 0.01
    // corpus = 5000 * [((1.01)^240 - 1) / 0.01] * 1.01 = 4,995,739.60 approx
    const result = calculateNps({
      monthlyContribution: 5000,
      currentAge: 40,
      expectedReturnPercent: 12,
    });
    expect(result.corpus).toBeCloseTo(4_995_739.6, 0);
    expect(result.months).toBe(240);
    expect(result.totalInvested).toBe(1_200_000);
    expect(result.gains).toBeCloseTo(3_795_739.6, 0);
  });

  it("splits the corpus into annuity and lump sum, and derives the pension", () => {
    const result = calculateNps({
      monthlyContribution: 5000,
      currentAge: 40,
      expectedReturnPercent: 12,
      annuityPurchasePercent: 40,
      annuityRatePercent: 6,
    });
    // Annuity corpus is 40% of the corpus, lump sum is the other 60%.
    expect(result.annuityCorpus).toBeCloseTo(result.corpus * 0.4, 2);
    expect(result.lumpSum).toBeCloseTo(result.corpus * 0.6, 2);
    // Pension is annuity corpus times rate over 12.
    expect(result.monthlyPension).toBeCloseTo((result.annuityCorpus * 0.06) / 12, 2);
    expect(result.monthlyPension).toBeCloseTo(9_991.48, 1);
  });

  it("handles a zero return without dividing by zero", () => {
    const result = calculateNps({
      monthlyContribution: 5000,
      currentAge: 40,
      expectedReturnPercent: 0,
    });
    // With i = 0, corpus = P * n = 5000 * 240
    expect(result.corpus).toBe(1_200_000);
    expect(result.gains).toBe(0);
  });

  it("grows more at a higher return than at a lower return", () => {
    const high = calculateNps({ monthlyContribution: 5000, currentAge: 30, expectedReturnPercent: 12 });
    const low = calculateNps({ monthlyContribution: 5000, currentAge: 30, expectedReturnPercent: 8 });
    expect(high.corpus).toBeGreaterThan(low.corpus);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateNps({ monthlyContribution: 5000, currentAge: 17, expectedReturnPercent: 10 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateNps({ monthlyContribution: 5000, currentAge: 60, expectedReturnPercent: 10 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateNps({ monthlyContribution: 5000, currentAge: 65, expectedReturnPercent: 10 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateNps({
        monthlyContribution: 5000,
        currentAge: 40,
        expectedReturnPercent: 10,
        annuityPurchasePercent: 30,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateNps({ monthlyContribution: 0, currentAge: 40, expectedReturnPercent: 10 }),
    ).toThrow(RangeError);
  });
});
