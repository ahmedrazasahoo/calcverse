import { describe, expect, it } from "vitest";
import { percentOf, percentageChange, whatPercent } from "./percentage";

describe("percentOf", () => {
  it("finds a percentage of a number", () => {
    expect(percentOf(15, 200)).toBeCloseTo(30, 5);
    expect(percentOf(100, 42)).toBeCloseTo(42, 5);
    expect(percentOf(0, 42)).toBe(0);
    expect(percentOf(250, 40)).toBeCloseTo(100, 5);
  });
});

describe("whatPercent", () => {
  it("expresses a part as a percentage of the whole", () => {
    expect(whatPercent(45, 180)).toBeCloseTo(25, 5);
    expect(whatPercent(250, 200)).toBeCloseTo(125, 5);
  });

  it("returns null when the whole is zero instead of dividing by zero", () => {
    expect(whatPercent(10, 0)).toBeNull();
  });
});

describe("percentageChange", () => {
  it("reports an increase", () => {
    const result = percentageChange(120, 150);
    expect(result!.change).toBeCloseTo(25, 5);
    expect(result!.direction).toBe("increase");
  });

  it("reports a decrease as a negative change", () => {
    const result = percentageChange(200, 150);
    expect(result!.change).toBeCloseTo(-25, 5);
    expect(result!.direction).toBe("decrease");
  });

  it("reports no change", () => {
    const result = percentageChange(80, 80);
    expect(result!.change).toBe(0);
    expect(result!.direction).toBe("no-change");
  });

  it("returns null when the starting value is zero", () => {
    expect(percentageChange(0, 50)).toBeNull();
  });

  it("handles a negative starting value using its magnitude", () => {
    const result = percentageChange(-50, 50);
    expect(result!.change).toBeCloseTo(200, 5);
    expect(result!.direction).toBe("increase");
  });
});
