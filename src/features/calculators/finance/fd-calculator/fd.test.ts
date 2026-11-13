import { describe, expect, it } from "vitest";
import { calculateFd } from "./fd";

describe("calculateFd", () => {
  it("compounds quarterly by default, the Indian bank standard", () => {
    const result = calculateFd({ principal: 100_000, annualRatePercent: 7, years: 1 });
    // (1 + 0.07/4)^4 = 1.071859...
    expect(result.maturityValue).toBeCloseTo(107_185.9, 1);
    expect(result.compounding).toBe("quarterly");
    expect(result.effectiveAnnualRatePercent).toBeCloseTo(7.19, 2);
  });

  it("matches simple multiplication for yearly compounding over two years", () => {
    const result = calculateFd({
      principal: 50_000,
      annualRatePercent: 10,
      years: 2,
      compounding: "yearly",
    });
    expect(result.maturityValue).toBe(60_500);
    expect(result.totalInterest).toBe(10_500);
  });

  it("earns more with monthly compounding than yearly at the same rate", () => {
    const monthly = calculateFd({
      principal: 100_000,
      annualRatePercent: 7,
      years: 3,
      compounding: "monthly",
    });
    const yearly = calculateFd({
      principal: 100_000,
      annualRatePercent: 7,
      years: 3,
      compounding: "yearly",
    });
    expect(monthly.maturityValue).toBeGreaterThan(yearly.maturityValue);
  });

  it("returns the principal untouched at a zero rate", () => {
    const result = calculateFd({ principal: 25_000, annualRatePercent: 0, years: 5 });
    expect(result.maturityValue).toBe(25_000);
    expect(result.totalInterest).toBe(0);
  });

  it("rejects invalid input", () => {
    expect(() => calculateFd({ principal: 0, annualRatePercent: 7, years: 1 })).toThrow(
      RangeError,
    );
    expect(() =>
      calculateFd({ principal: 1000, annualRatePercent: -1, years: 1 }),
    ).toThrow(RangeError);
    expect(() => calculateFd({ principal: 1000, annualRatePercent: 7, years: 0 })).toThrow(
      RangeError,
    );
  });
});
