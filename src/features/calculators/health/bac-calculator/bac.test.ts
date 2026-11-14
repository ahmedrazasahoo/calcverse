import { describe, expect, it } from "vitest";
import { alcoholGrams, calculateBac } from "./bac";

describe("alcoholGrams", () => {
  it("one beer has about 14 g of pure alcohol", () => {
    expect(alcoholGrams(355, 5)).toBeCloseTo(14.0, 1);
  });
  it("four beers total about 56 g", () => {
    expect(alcoholGrams(355, 5) * 4).toBeCloseTo(56.0, 1);
  });
});

describe("calculateBac worked example: 80 kg man, 4 beers", () => {
  const grams = alcoholGrams(355, 5) * 4;
  it("peak BAC is 0.103 percent", () => {
    const r = calculateBac({ sex: "male", weightKg: 80, totalAlcoholGrams: grams, hours: 0 });
    expect(r?.peakBac).toBeCloseTo(0.103, 3);
    expect(r?.currentBac).toBeCloseTo(0.103, 3);
  });
  it("after 2 hours of elimination BAC is 0.073", () => {
    const r = calculateBac({ sex: "male", weightKg: 80, totalAlcoholGrams: grams, hours: 2 });
    expect(r?.currentBac).toBeCloseTo(0.073, 3);
  });
  it("counts hours until thresholds from now", () => {
    const r = calculateBac({ sex: "male", weightKg: 80, totalAlcoholGrams: grams, hours: 2 });
    // current 0.073 is already below 0.08, needs (0.073-0.05)/0.015 to reach 0.05
    expect(r?.hoursUntil008).toBe(0);
    expect(r?.hoursUntil005).toBeCloseTo(1.53, 2);
    expect(r?.hoursUntilZero).toBeCloseTo(4.87, 2);
  });
  it("a female body composition factor gives a higher BAC for the same drinks", () => {
    const m = calculateBac({ sex: "male", weightKg: 80, totalAlcoholGrams: grams, hours: 0 });
    const f = calculateBac({ sex: "female", weightKg: 80, totalAlcoholGrams: grams, hours: 0 });
    expect(f!.peakBac).toBeGreaterThan(m!.peakBac);
  });
  it("BAC never goes below zero", () => {
    const r = calculateBac({ sex: "male", weightKg: 80, totalAlcoholGrams: grams, hours: 24 });
    expect(r?.currentBac).toBe(0);
    expect(r?.hoursUntilZero).toBe(0);
  });
  it("rejects bad input", () => {
    expect(calculateBac({ sex: "male", weightKg: 0, totalAlcoholGrams: 10, hours: 0 })).toBeNull();
    expect(calculateBac({ sex: "male", weightKg: 80, totalAlcoholGrams: -1, hours: 0 })).toBeNull();
  });
});
