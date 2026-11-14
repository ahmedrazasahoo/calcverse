import { describe, expect, it } from "vitest";
import { longDivide, longDivideDecimal } from "./longdivision";

// Worked by hand: 945 / 7.
// 7 into 9 goes 1 (1 x 7 = 7, remainder 2), bring down 4 to make 24.
// 7 into 24 goes 3 (3 x 7 = 21, remainder 3), bring down 5 to make 35.
// 7 into 35 goes 5 exactly. Quotient 135, remainder 0, three steps.

describe("longDivide", () => {
  it("divides 945 by 7 to get 135 remainder 0 with three steps", () => {
    const r = longDivide(945, 7);
    expect(r.quotient).toBe(135);
    expect(r.remainder).toBe(0);
    expect(r.steps).toHaveLength(3);
    expect(r.steps[0]).toMatchObject({
      partialDividend: 9,
      times: 1,
      product: 7,
      remainderAfter: 2,
      broughtDown: 4,
    });
    expect(r.steps[1]).toMatchObject({
      partialDividend: 24,
      times: 3,
      product: 21,
      remainderAfter: 3,
      broughtDown: 5,
    });
    expect(r.steps[2]).toMatchObject({
      partialDividend: 35,
      times: 5,
      product: 35,
      remainderAfter: 0,
      broughtDown: null,
    });
    expect(r.steps[0].description).toContain("7 goes into 9 one time");
  });

  it("divides 7 by 2 to get 3 remainder 1", () => {
    const r = longDivide(7, 2);
    expect(r.quotient).toBe(3);
    expect(r.remainder).toBe(1);
    expect(r.steps).toHaveLength(1);
  });

  it("handles a dividend smaller than the divisor", () => {
    const r = longDivide(3, 8);
    expect(r.quotient).toBe(0);
    expect(r.remainder).toBe(3);
  });

  it("handles zero and negative dividends by sign", () => {
    expect(longDivide(0, 5).quotient).toBe(0);
    expect(longDivide(0, 5).remainder).toBe(0);
    const neg = longDivide(-945, 7);
    expect(neg.quotient).toBe(-135);
    expect(neg.remainder).toBe(0);
    const negRem = longDivide(-7, 2);
    expect(negRem.quotient).toBe(-3);
    expect(negRem.remainder).toBe(-1);
  });

  it("throws on divide by zero and negative divisors", () => {
    expect(() => longDivide(10, 0)).toThrow(RangeError);
    expect(() => longDivide(10, -3)).toThrow(RangeError);
    expect(() => longDivide(10.5, 2)).toThrow(RangeError);
  });
});

describe("longDivideDecimal", () => {
  it("divides 10 by 3 to 3 places giving 3.333", () => {
    const r = longDivideDecimal(10, 3, 3);
    expect(r.quotientText).toBe("3.333");
    expect(r.exact).toBe(false);
    expect(r.finalRemainder).toBe(1);
  });

  it("divides 7 by 2 exactly to 4 places giving 3.5000", () => {
    const r = longDivideDecimal(7, 2, 4);
    expect(r.quotientText).toBe("3.5000");
    expect(r.exact).toBe(true);
  });

  it("defaults to 4 places", () => {
    expect(longDivideDecimal(1, 4).quotientText).toBe("0.2500");
    expect(longDivideDecimal(1, 4).exact).toBe(true);
  });

  it("carries the sign for a negative dividend", () => {
    expect(longDivideDecimal(-10, 4, 2).quotientText).toBe("-2.50");
  });

  it("throws on divide by zero", () => {
    expect(() => longDivideDecimal(5, 0)).toThrow(RangeError);
  });
});
