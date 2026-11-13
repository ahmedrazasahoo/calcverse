import { describe, expect, it } from "vitest";
import { idealWeight } from "./idealWeight";

describe("idealWeight for a man of 178 cm", () => {
  // 178 cm is 70.08 inches, so 10.08 inches over the 5 foot base.
  const result = idealWeight(178, "male");

  it("computes the Devine value", () => {
    // 50 + 2.3 * 10.08 = 73.18
    expect(result?.devineKg).toBeCloseTo(73.18, 1);
  });

  it("computes the Robinson value", () => {
    // 52 + 1.9 * 10.08 = 71.15
    expect(result?.robinsonKg).toBeCloseTo(71.15, 1);
  });

  it("computes the Miller value", () => {
    // 56.2 + 1.41 * 10.08 = 70.41
    expect(result?.millerKg).toBeCloseTo(70.41, 1);
  });

  it("computes the Hamwi value", () => {
    // 48 + 2.7 * 10.08 = 75.21
    expect(result?.hamwiKg).toBeCloseTo(75.21, 1);
  });

  it("averages the four formulas", () => {
    expect(result?.averageKg).toBeCloseTo(72.49, 1);
  });

  it("returns the healthy BMI range for the height", () => {
    expect(result?.bmiRangeKg.minKg).toBeCloseTo(58.62, 1);
    expect(result?.bmiRangeKg.maxKg).toBeCloseTo(78.89, 1);
  });
});

describe("idealWeight for a woman of 165 cm", () => {
  // 165 cm is 64.96 inches, so 4.96 inches over the base.
  const result = idealWeight(165, "female");

  it("uses the female coefficients", () => {
    // Devine: 45.5 + 2.3 * 4.96 = 56.91
    expect(result?.devineKg).toBeCloseTo(56.91, 1);
    // Robinson: 49 + 1.7 * 4.96 = 57.43
    expect(result?.robinsonKg).toBeCloseTo(57.43, 1);
  });
});

describe("idealWeight validation", () => {
  it("rejects out of range heights", () => {
    expect(idealWeight(80, "male")).toBeNull();
    expect(idealWeight(260, "female")).toBeNull();
    expect(idealWeight(Number.NaN, "male")).toBeNull();
  });
});
