import { describe, expect, it } from "vitest";
import { calculateSimpleInterest } from "./simple-interest";

describe("calculateSimpleInterest", () => {
  it("computes interest from the formula P times r times t over 100", () => {
    // Interest = 10000 * 7.5 / 100 * 3 = 2250. Total = 12250.
    const result = calculateSimpleInterest({
      principal: 10000,
      annualRatePercent: 7.5,
      timeValue: 3,
      timeUnit: "years",
    });
    expect(result.interest).toBe(2250);
    expect(result.totalAmount).toBe(12250);
    expect(result.timeInYears).toBe(3);
  });

  it("converts months to years before applying the formula", () => {
    // 18 months = 1.5 years. Interest = 12000 * 10 / 100 * 1.5 = 1800.
    const result = calculateSimpleInterest({
      principal: 12000,
      annualRatePercent: 10,
      timeValue: 18,
      timeUnit: "months",
    });
    expect(result.timeInYears).toBe(1.5);
    expect(result.interest).toBe(1800);
    expect(result.totalAmount).toBe(13800);
  });

  it("converts days to years using 365 days", () => {
    // 365 days = 1 year. Interest = 5000 * 6 / 100 * 1 = 300.
    const result = calculateSimpleInterest({
      principal: 5000,
      annualRatePercent: 6,
      timeValue: 365,
      timeUnit: "days",
    });
    expect(result.timeInYears).toBe(1);
    expect(result.interest).toBe(300);
  });

  it("returns zero interest at a zero rate", () => {
    const result = calculateSimpleInterest({
      principal: 8000,
      annualRatePercent: 0,
      timeValue: 5,
      timeUnit: "years",
    });
    expect(result.interest).toBe(0);
    expect(result.totalAmount).toBe(8000);
  });

  it("earns more over a longer time at the same rate", () => {
    const short = calculateSimpleInterest({
      principal: 10000,
      annualRatePercent: 8,
      timeValue: 2,
      timeUnit: "years",
    });
    const long = calculateSimpleInterest({
      principal: 10000,
      annualRatePercent: 8,
      timeValue: 5,
      timeUnit: "years",
    });
    expect(long.interest).toBeGreaterThan(short.interest);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateSimpleInterest({ principal: 0, annualRatePercent: 7, timeValue: 1, timeUnit: "years" }),
    ).toThrow(RangeError);
    expect(() =>
      calculateSimpleInterest({ principal: 1000, annualRatePercent: -1, timeValue: 1, timeUnit: "years" }),
    ).toThrow(RangeError);
    expect(() =>
      calculateSimpleInterest({ principal: 1000, annualRatePercent: 7, timeValue: 0, timeUnit: "years" }),
    ).toThrow(RangeError);
  });
});
