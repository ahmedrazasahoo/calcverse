import { describe, expect, it } from "vitest";
import { calculateSquareRoot, primeFactorisation } from "./square-root";

describe("calculateSquareRoot", () => {
  it("finds an exact root for a perfect square", () => {
    // Formula: root is the number that times itself gives the value, 12 x 12 = 144.
    const result = calculateSquareRoot(144);
    expect(result.root).toBe(12);
    expect(result.isPerfectSquare).toBe(true);
    expect(result.simplified).toEqual({ coefficient: 12, radicand: 1 });
    expect(result.nearestBelow).toBeNull();
    expect(result.nearestAbove).toBeNull();
  });

  it("simplifies 72 into 6 sqrt(2)", () => {
    // 72 = 2 x 2 x 2 x 3 x 3, pairs (2 x 2) and (3 x 3) come out, one 2 stays in.
    const result = calculateSquareRoot(72);
    expect(result.simplified.coefficient).toBe(6);
    expect(result.simplified.radicand).toBe(2);
    expect(result.isPerfectSquare).toBe(false);
    expect(result.root).toBeCloseTo(8.48528137423857, 10);
    expect(result.steps[0]).toBe("72 = 2 x 2 x 2 x 3 x 3");
    expect(result.steps[2]).toBe("Root = 2 x 3 x sqrt(2) = 6 sqrt(2)");
  });

  it("returns zero for zero", () => {
    const result = calculateSquareRoot(0);
    expect(result.root).toBe(0);
    expect(result.isPerfectSquare).toBe(true);
  });

  it("keeps a prime under the root untouched", () => {
    // 2 has no factor pair, so the simplified form is 1 sqrt(2).
    const result = calculateSquareRoot(2);
    expect(result.simplified).toEqual({ coefficient: 1, radicand: 2 });
    expect(result.root).toBeCloseTo(1.41421356237, 10);
    expect(result.nearestBelow).toEqual({ value: 1, root: 1 });
    expect(result.nearestAbove).toEqual({ value: 4, root: 2 });
  });

  it("brackets a non perfect square with its neighbours", () => {
    // 50 sits between 49 (7 squared) and 64 (8 squared).
    const result = calculateSquareRoot(50);
    expect(result.nearestBelow).toEqual({ value: 49, root: 7 });
    expect(result.nearestAbove).toEqual({ value: 64, root: 8 });
  });

  it("rejects negative and non finite input", () => {
    expect(() => calculateSquareRoot(-4)).toThrow(RangeError);
    expect(() => calculateSquareRoot(Number.NaN)).toThrow(RangeError);
    expect(() => calculateSquareRoot(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});

describe("primeFactorisation", () => {
  it("splits a composite number into primes", () => {
    expect(primeFactorisation(72)).toEqual([2, 2, 2, 3, 3]);
    expect(primeFactorisation(13)).toEqual([13]);
  });
});
