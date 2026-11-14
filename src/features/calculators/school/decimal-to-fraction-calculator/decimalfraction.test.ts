import { describe, expect, it } from "vitest";
import {
  approximateFraction,
  convertDecimal,
  formatFraction,
  formatMixed,
  gcd,
  nearestInchFraction,
  parseDecimalString,
  toMixed,
} from "./decimalfraction";

describe("helpers", () => {
  it("finds the greatest common divisor", () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(7, 13)).toBe(1);
  });

  it("parses plain decimals and rejects junk", () => {
    expect(parseDecimalString("1.375")?.value).toBe(1.375);
    expect(parseDecimalString("-0.5")?.negative).toBe(true);
    expect(parseDecimalString("abc")).toBeNull();
    expect(parseDecimalString("")).toBeNull();
    expect(parseDecimalString("1.2.3")).toBeNull();
  });
});

describe("convertDecimal exact conversions", () => {
  it("converts 0.75 to 3/4", () => {
    const r = convertDecimal("0.75");
    expect(r).not.toBeNull();
    expect(r?.exact).toEqual({ n: 3, d: 4 });
    expect(r?.fractionText).toBe("3/4");
    expect(r?.mixedText).toBe("3/4");
  });

  it("converts 1.375 to 11/8 and the mixed number 1 3/8", () => {
    const r = convertDecimal("1.375");
    expect(r?.exact).toEqual({ n: 11, d: 8 });
    expect(r?.fractionText).toBe("11/8");
    expect(r?.mixedText).toBe("1 3/8");
    expect(r?.mixed).toEqual({ whole: 1, numerator: 3, denominator: 8 });
  });

  it("handles negatives and whole numbers", () => {
    expect(convertDecimal("-1.5")?.exact).toEqual({ n: -3, d: 2 });
    expect(convertDecimal("-1.5")?.mixedText).toBe("-1 1/2");
    expect(convertDecimal("3")?.exact).toEqual({ n: 3, d: 1 });
    expect(convertDecimal("0")?.exact).toEqual({ n: 0, d: 1 });
  });

  it("returns null for invalid input", () => {
    expect(convertDecimal("hello")).toBeNull();
  });
});

describe("approximateFraction", () => {
  it("approximates 0.3333 as 1/3 with max denominator 100", () => {
    const r = convertDecimal("0.3333", 100);
    expect(r?.approximation).toEqual({ n: 1, d: 3 });
    expect(r?.isExactWithinLimit).toBe(false);
    expect(r?.steps.length).toBeGreaterThan(2);
  });

  it("approximates pi to 22/7 at denominator 10 and 355/113 at 200", () => {
    expect(approximateFraction(Math.PI, 10).fraction).toEqual({ n: 22, d: 7 });
    expect(approximateFraction(Math.PI, 200).fraction).toEqual({ n: 355, d: 113 });
  });

  it("keeps the exact fraction when it fits the limit", () => {
    const r = convertDecimal("0.75", 100);
    expect(r?.isExactWithinLimit).toBe(true);
    expect(r?.approximation).toEqual({ n: 3, d: 4 });
  });
});

describe("formatting", () => {
  it("formats fractions and mixed numbers", () => {
    expect(formatFraction({ n: 6, d: 8 })).toBe("3/4");
    expect(formatFraction({ n: 4, d: 1 })).toBe("4");
    expect(formatMixed(toMixed({ n: -5, d: 2 }))).toBe("-2 1/2");
  });
});

describe("nearestInchFraction", () => {
  it("converts 2.4375 to exactly 2 7/16 at sixteenth precision", () => {
    const r = nearestInchFraction(2.4375, 16);
    expect(r.whole).toBe(2);
    expect(r.numerator).toBe(7);
    expect(r.denominator).toBe(16);
    expect(r.text).toBe("2 7/16 inches");
    expect(r.error).toBe(0);
  });

  it("rounds to the nearest unit and simplifies", () => {
    // 0.26 is closest to 4/16, which simplifies to 1/4.
    const r = nearestInchFraction(0.26, 16);
    expect(r.text).toBe("1/4 inches");
  });

  it("carries into the next whole inch when the fraction fills up", () => {
    const r = nearestInchFraction(2.999, 16);
    expect(r.text).toBe("3 inches");
  });

  it("gives finer answers at 64 precision", () => {
    const r = nearestInchFraction(1.1, 64);
    // 0.1 x 64 = 6.4 units, rounds to 6, which is 3/32.
    expect(r.numerator).toBe(3);
    expect(r.denominator).toBe(32);
    expect(r.text).toBe("1 3/32 inches");
  });
});
