import { describe, expect, it } from "vitest";
import { gcd, scaleRatio, simplifyRatio, solveMissing } from "./ratio";

describe("gcd", () => {
  it("finds the greatest common divisor", () => {
    // Formula: largest whole number dividing both, gcd(12, 18) = 6.
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(7, 13)).toBe(1);
  });
});

describe("simplifyRatio", () => {
  it("divides both parts by their gcd", () => {
    // 12 : 18 divided by gcd 6 gives 2 : 3.
    const result = simplifyRatio([12, 18]);
    expect(result.simplified).toEqual([2, 3]);
    expect(result.oneToN).toEqual([1, 1.5]);
  });

  it("handles decimal parts by scaling first", () => {
    // 2.5 : 5 is 25 : 50 scaled by ten, and 25 divides out to 1 : 2.
    const result = simplifyRatio([2.5, 5]);
    expect(result.simplified).toEqual([1, 2]);
  });

  it("simplifies three part ratios", () => {
    expect(simplifyRatio([10, 15, 25]).simplified).toEqual([2, 3, 5]);
  });

  it("rejects zeros, negatives and wrong part counts", () => {
    expect(() => simplifyRatio([0, 5])).toThrow(RangeError);
    expect(() => simplifyRatio([-2, 4])).toThrow(RangeError);
    expect(() => simplifyRatio([5])).toThrow(RangeError);
    expect(() => simplifyRatio([])).toThrow(RangeError);
  });
});

describe("scaleRatio", () => {
  it("scales parts so they add up to the target total", () => {
    // 2 : 3 has 5 parts in total, 100 / 5 = 20 per part, giving 40 and 60.
    expect(scaleRatio([2, 3], 100, "total")).toEqual([40, 60]);
  });

  it("scales parts so the first part hits the target", () => {
    // First part 2 must become 10, a factor of 5, so 3 becomes 15.
    expect(scaleRatio([2, 3], 10, "firstPart")).toEqual([10, 15]);
  });

  it("rejects a zero target", () => {
    expect(() => scaleRatio([2, 3], 0, "total")).toThrow(RangeError);
  });
});

describe("solveMissing", () => {
  it("solves a : b = c : x with x = b times c divided by a", () => {
    // 3 : 4 = 9 : x, so x = 4 x 9 / 3 = 12.
    expect(solveMissing(3, 4, 9)).toBe(12);
  });

  it("rejects a zero first value", () => {
    expect(() => solveMissing(0, 4, 9)).toThrow(RangeError);
  });
});
