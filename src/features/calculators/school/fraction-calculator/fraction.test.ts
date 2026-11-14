import { describe, expect, it } from "vitest";
import { calculateFraction, gcd, simplifyFraction, toImproper, toMixed } from "./fraction";

// Worked by hand: 1 1/2 = 3/2 and 2/3 stays 2/3. Common denominator 6
// gives 9/6 + 4/6 = 13/6, which is 2 1/6 as a mixed number.

describe("helpers", () => {
  it("finds the greatest common divisor", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(7, 13)).toBe(1);
    expect(gcd(0, 5)).toBe(5);
  });

  it("simplifies and forces a positive denominator", () => {
    expect(simplifyFraction(6, 8)).toEqual({ n: 3, d: 4 });
    expect(simplifyFraction(3, -6)).toEqual({ n: -1, d: 2 });
    expect(simplifyFraction(0, 9)).toEqual({ n: 0, d: 1 });
  });

  it("converts mixed numbers to improper fractions", () => {
    expect(toImproper({ whole: 1, numerator: 1, denominator: 2 })).toEqual({ n: 3, d: 2 });
    expect(toImproper({ whole: -1, numerator: 1, denominator: 2 })).toEqual({ n: -3, d: 2 });
    expect(toImproper({ whole: 0, numerator: 2, denominator: 3 })).toEqual({ n: 2, d: 3 });
  });

  it("converts back to mixed form, including zero", () => {
    expect(toMixed({ n: 13, d: 6 })).toEqual({ whole: 2, numerator: 1, denominator: 6 });
    expect(toMixed({ n: 0, d: 5 })).toEqual({ whole: 0, numerator: 0, denominator: 1 });
  });
});

describe("calculateFraction", () => {
  it("adds a mixed number and a fraction: 1 1/2 + 2/3 = 13/6 = 2 1/6", () => {
    const result = calculateFraction(
      { whole: 1, numerator: 1, denominator: 2 },
      { whole: 0, numerator: 2, denominator: 3 },
      "add",
    );
    expect(result.improper).toEqual({ n: 13, d: 6 });
    expect(result.mixed).toEqual({ whole: 2, numerator: 1, denominator: 6 });
    expect(result.decimal).toBeCloseTo(13 / 6, 10);
    expect(result.steps.length).toBeGreaterThan(2);
    expect(result.steps[0]).toContain("Convert to improper fractions");
  });

  it("handles subtraction crossing zero with a correct negative mixed form", () => {
    // 1/2 minus 1 1/4 = 2/4 minus 5/4 = -3/4.
    const result = calculateFraction(
      { whole: 0, numerator: 1, denominator: 2 },
      { whole: 1, numerator: 1, denominator: 4 },
      "subtract",
    );
    expect(result.improper).toEqual({ n: -3, d: 4 });
    expect(result.mixed).toEqual({ whole: 0, numerator: -3, denominator: 4 });
    expect(result.decimal).toBeCloseTo(-0.75, 10);
    // A larger negative: 1/2 minus 3 = -5/2 = -2 1/2.
    const bigger = calculateFraction(
      { whole: 0, numerator: 1, denominator: 2 },
      { whole: 3, numerator: 0, denominator: 1 },
      "subtract",
    );
    expect(bigger.improper).toEqual({ n: -5, d: 2 });
    expect(bigger.mixed).toEqual({ whole: -2, numerator: 1, denominator: 2 });
  });

  it("multiplies and simplifies: 2/3 x 3/4 = 6/12 = 1/2", () => {
    const result = calculateFraction(
      { whole: 0, numerator: 2, denominator: 3 },
      { whole: 0, numerator: 3, denominator: 4 },
      "multiply",
    );
    expect(result.improper).toEqual({ n: 1, d: 2 });
    expect(result.decimal).toBe(0.5);
    expect(result.steps.some((s) => s.includes("Simplify by dividing top and bottom by 6"))).toBe(
      true,
    );
  });

  it("divides by flipping: 1/2 divided by 1/4 = 2", () => {
    const result = calculateFraction(
      { whole: 0, numerator: 1, denominator: 2 },
      { whole: 0, numerator: 1, denominator: 4 },
      "divide",
    );
    expect(result.improper).toEqual({ n: 2, d: 1 });
    expect(result.mixed).toEqual({ whole: 2, numerator: 0, denominator: 1 });
    expect(result.decimal).toBe(2);
  });

  it("returns zero cleanly when the result cancels out", () => {
    const result = calculateFraction(
      { whole: 0, numerator: 3, denominator: 4 },
      { whole: 0, numerator: 3, denominator: 4 },
      "subtract",
    );
    expect(result.improper).toEqual({ n: 0, d: 1 });
    expect(result.mixed).toEqual({ whole: 0, numerator: 0, denominator: 1 });
    expect(result.decimal).toBe(0);
  });

  it("throws when dividing by a zero fraction", () => {
    expect(() =>
      calculateFraction(
        { whole: 0, numerator: 1, denominator: 2 },
        { whole: 0, numerator: 0, denominator: 5 },
        "divide",
      ),
    ).toThrow(RangeError);
  });

  it("throws on a zero denominator and on non integer parts", () => {
    expect(() =>
      calculateFraction(
        { whole: 0, numerator: 1, denominator: 0 },
        { whole: 0, numerator: 1, denominator: 2 },
        "add",
      ),
    ).toThrow(RangeError);
    expect(() =>
      calculateFraction(
        { whole: 0, numerator: 0.5, denominator: 2 },
        { whole: 0, numerator: 1, denominator: 2 },
        "add",
      ),
    ).toThrow(RangeError);
  });
});
