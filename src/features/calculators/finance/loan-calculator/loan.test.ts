import { describe, expect, it } from "vitest";
import { calculateLoan } from "./loan";

describe("calculateLoan", () => {
  it("matches the standard payment for 200,000 at 6% over 5 years", () => {
    const result = calculateLoan({
      principal: 200_000,
      annualRatePercent: 6,
      termYears: 5,
    });
    expect(result.monthlyPayment).toBeCloseTo(3866.56, 2);
    expect(result.termInMonths).toBe(60);
    expect(result.standard.months).toBe(60);
    expect(result.standard.schedule[59].balance).toBe(0);
    // With no extra payment the two scenarios are identical.
    expect(result.monthsSaved).toBe(0);
    expect(result.interestSaved).toBe(0);
  });

  it("combines years and extra months into the term", () => {
    const result = calculateLoan({
      principal: 50_000,
      annualRatePercent: 0,
      termYears: 2,
      termMonths: 6,
    });
    expect(result.termInMonths).toBe(30);
    expect(result.monthlyPayment).toBeCloseTo(1666.67, 2);
  });

  it("shows that extra payments shorten the term and cut interest", () => {
    const result = calculateLoan({
      principal: 200_000,
      annualRatePercent: 6,
      termYears: 5,
      extraMonthlyPayment: 500,
    });
    expect(result.withExtra.months).toBeLessThan(result.standard.months);
    expect(result.monthsSaved).toBeGreaterThan(0);
    expect(result.interestSaved).toBeGreaterThan(0);
    expect(result.withExtra.schedule[result.withExtra.schedule.length - 1].balance).toBe(0);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateLoan({ principal: 0, annualRatePercent: 6, termYears: 5 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateLoan({ principal: 1000, annualRatePercent: 6, termYears: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateLoan({
        principal: 1000,
        annualRatePercent: 6,
        termYears: 5,
        extraMonthlyPayment: -10,
      }),
    ).toThrow(RangeError);
  });
});
