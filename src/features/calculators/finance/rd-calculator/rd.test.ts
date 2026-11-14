import { describe, expect, it } from "vitest";
import { calculateRd } from "./rd";

describe("calculateRd", () => {
  it("returns exactly the deposits at a zero rate", () => {
    const result = calculateRd({ monthlyDeposit: 2000, annualRatePercent: 0, years: 3 });
    expect(result.totalDeposited).toBe(72000);
    expect(result.maturityValue).toBe(72000);
    expect(result.totalInterest).toBe(0);
  });

  it("matches a hand worked quarterly simulation for one year", () => {
    // Rules: deposit 1000 at the start of each month, rate 12 percent a
    // year, so each quarter credits 3 percent of the balance.
    // Month 3 balance 3000, interest 90, balance 3090.
    // Month 6 balance 6090, interest 182.70, balance 6272.70.
    // Month 9 balance 9272.70, interest 278.181, balance 9550.881.
    // Month 12 balance 12550.881, interest 376.52643, balance 12927.40743.
    const result = calculateRd({ monthlyDeposit: 1000, annualRatePercent: 12, years: 1 });
    expect(result.totalDeposited).toBe(12000);
    expect(result.maturityValue).toBeCloseTo(12927.41, 2);
    expect(result.totalInterest).toBeCloseTo(927.41, 2);
  });

  it("earns more over five years than the same plan earns at a zero rate", () => {
    const withRate = calculateRd({ monthlyDeposit: 5000, annualRatePercent: 7, years: 5 });
    const zeroRate = calculateRd({ monthlyDeposit: 5000, annualRatePercent: 0, years: 5 });
    expect(withRate.totalDeposited).toBe(zeroRate.totalDeposited);
    expect(withRate.maturityValue).toBeGreaterThan(zeroRate.maturityValue);
    expect(withRate.totalInterest).toBeGreaterThan(0);
  });

  it("builds a yearly breakdown that ends at the maturity value", () => {
    const result = calculateRd({ monthlyDeposit: 1000, annualRatePercent: 7, years: 2 });
    expect(result.yearlyBreakdown).toHaveLength(2);
    expect(result.yearlyBreakdown[0].totalDeposited).toBe(12000);
    expect(result.yearlyBreakdown[1].totalDeposited).toBe(24000);
    expect(result.yearlyBreakdown[1].balance).toBe(result.maturityValue);
  });

  it("rejects invalid input", () => {
    expect(() => calculateRd({ monthlyDeposit: 0, annualRatePercent: 7, years: 1 })).toThrow(
      RangeError,
    );
    expect(() => calculateRd({ monthlyDeposit: 1000, annualRatePercent: -1, years: 1 })).toThrow(
      RangeError,
    );
    expect(() => calculateRd({ monthlyDeposit: 1000, annualRatePercent: 7, years: 0 })).toThrow(
      RangeError,
    );
  });
});
