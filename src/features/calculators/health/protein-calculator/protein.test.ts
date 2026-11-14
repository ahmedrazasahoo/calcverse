import { describe, expect, it } from "vitest";
import { calculateProtein, PROTEIN_FACTORS } from "./protein";

describe("PROTEIN_FACTORS", () => {
  it("has the six evidence based factors in order", () => {
    expect(PROTEIN_FACTORS.map((f) => f.gramsPerKg)).toEqual([0.8, 1.0, 1.2, 1.4, 1.8, 2.2]);
  });
  it("keys are unique", () => {
    expect(new Set(PROTEIN_FACTORS.map((f) => f.key)).size).toBe(6);
  });
});

describe("calculateProtein 70 kg case", () => {
  const r = calculateProtein(70, "active");
  it("recommends 84 g at 1.2 g per kg", () => {
    expect(r?.recommendedGrams).toBeCloseTo(84, 5);
  });
  it("gives a range from factor minus 0.2 to plus 0.2", () => {
    expect(r?.lowGrams).toBeCloseTo(70, 5);
    expect(r?.highGrams).toBeCloseTo(98, 5);
  });
  it("splits across 3, 4 and 5 meals", () => {
    expect(r?.perMeal.map((m) => Math.round(m.grams))).toEqual([28, 21, 17]);
  });
  it("reports grams per pound of body weight", () => {
    expect(r?.gramsPerLbBodyWeight).toBeCloseTo(0.544, 3);
  });
});

describe("bounds", () => {
  it("never lets the low end fall below 0.8 g per kg", () => {
    const r = calculateProtein(70, "sedentary");
    expect(r?.lowGrams).toBeCloseTo(56, 5);
  });
  it("strength at 70 kg gives 126 g", () => {
    expect(calculateProtein(70, "strength")?.recommendedGrams).toBeCloseTo(126, 5);
  });
  it("rejects unknown factors and bad weights", () => {
    expect(calculateProtein(70, "nope")).toBeNull();
    expect(calculateProtein(5, "active")).toBeNull();
  });
});
