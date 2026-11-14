import { describe, expect, it } from "vitest";
import { bagsNeeded, calculateConcrete } from "./concrete";

describe("calculateConcrete", () => {
  it("10x10 ft slab 4 in thick is 33.33 cu ft and 1.235 cu yd before waste", () => {
    const r = calculateConcrete({ mode: "slab", unit: "imperial", length: 10, width: 10, thickness: 4, wastePercent: 0 });
    expect(r.volumeCuFt).toBeCloseTo(33.333, 2);
    expect(r.volumeCuYd).toBeCloseTo(1.235, 2);
    expect(r.volumeCuM).toBeCloseTo(0.944, 2);
  });

  it("applies 10 percent waste before bags", () => {
    const r = calculateConcrete({ mode: "slab", unit: "imperial", length: 10, width: 10, thickness: 4, wastePercent: 10 });
    expect(r.volumeWithWasteCuFt).toBeCloseTo(36.667, 2);
    expect(r.bags[60]).toBe(Math.ceil(36.667 / 0.45));
    expect(r.bags[80]).toBe(Math.ceil(36.667 / 0.6));
  });

  it("footing volume uses depth", () => {
    const r = calculateConcrete({ mode: "footing", unit: "imperial", length: 20, width: 2, thickness: 12, wastePercent: 0 });
    expect(r.volumeCuFt).toBeCloseTo(40, 6);
  });

  it("round column volume uses pi r squared h", () => {
    const r = calculateConcrete({ mode: "column", unit: "imperial", diameter: 12, height: 8, wastePercent: 0 });
    expect(r.volumeCuFt).toBeCloseTo(Math.PI * 0.5 * 0.5 * 8, 6);
  });

  it("metric slab matches the imperial equivalent", () => {
    const metric = calculateConcrete({ mode: "slab", unit: "metric", length: 3.048, width: 3.048, thickness: 0.1016, wastePercent: 0 });
    expect(metric.volumeCuFt).toBeCloseTo(33.333, 1);
  });

  it("bag yields round up", () => {
    expect(bagsNeeded(0.45, 60)).toBe(1);
    expect(bagsNeeded(0.46, 60)).toBe(2);
    expect(bagsNeeded(0.3, 40)).toBe(1);
    expect(bagsNeeded(0.6, 80)).toBe(1);
  });

  it("throws on missing dimensions", () => {
    expect(() => calculateConcrete({ mode: "slab", unit: "imperial", length: 10, wastePercent: 0 })).toThrow(RangeError);
  });
});
