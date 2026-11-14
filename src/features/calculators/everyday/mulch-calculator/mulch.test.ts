import { describe, expect, it } from "vitest";
import { calculateMulch } from "./mulch";

describe("calculateMulch", () => {
  it("100 sq ft at 3 in is 25 cu ft and 0.926 cu yd", () => {
    const r = calculateMulch({ areaSqFt: 100, depthIn: 3 });
    expect(r.volumeCuFt).toBe(25);
    expect(r.volumeCuYd).toBeCloseTo(0.926, 3);
  });
  it("bag counts round up: 25 cu ft needs 13 two cu ft bags and 9 three cu ft bags", () => {
    const r = calculateMulch({ areaSqFt: 100, depthIn: 3 });
    expect(r.bags2CuFt).toBe(13);
    expect(r.bags3CuFt).toBe(9);
  });
  it("length by width area matches direct area", () => {
    const a = calculateMulch({ lengthFt: 10, widthFt: 10, depthIn: 3 });
    const b = calculateMulch({ areaSqFt: 100, depthIn: 3 });
    expect(a.volumeCuFt).toBe(b.volumeCuFt);
    expect(a.areaSqFt).toBe(100);
  });
  it("2 inches deep halves relative check: 100 sq ft at 2 in", () => {
    expect(calculateMulch({ areaSqFt: 100, depthIn: 2 }).volumeCuFt).toBeCloseTo(16.667, 2);
  });
  it("throws on bad depth", () => {
    expect(() => calculateMulch({ areaSqFt: 100, depthIn: 0 })).toThrow(RangeError);
  });
});
