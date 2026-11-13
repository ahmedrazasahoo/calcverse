import { describe, expect, it } from "vitest";
import {
  calculateBmi,
  classifyBmi,
  feetInchesToCm,
  healthyWeightRangeKg,
  kgToPounds,
  poundsToKg,
} from "./bmi";

describe("calculateBmi", () => {
  it("computes BMI for 80 kg at 178 cm", () => {
    // 80 / 1.78^2 = 25.249...
    expect(calculateBmi(80, 178)).toBeCloseTo(25.25, 2);
  });

  it("computes BMI for 60 kg at 165 cm", () => {
    // 60 / 1.65^2 = 22.038...
    expect(calculateBmi(60, 165)).toBeCloseTo(22.04, 2);
  });

  it("rejects out of range input", () => {
    expect(calculateBmi(0, 178)).toBeNull();
    expect(calculateBmi(80, 20)).toBeNull();
    expect(calculateBmi(Number.NaN, 178)).toBeNull();
    expect(calculateBmi(80, Number.POSITIVE_INFINITY)).toBeNull();
  });
});

describe("classifyBmi (WHO bands)", () => {
  it("classifies the healthy band including its edges", () => {
    expect(classifyBmi(18.5)?.key).toBe("healthy");
    expect(classifyBmi(24.9)?.key).toBe("healthy");
    expect(classifyBmi(22)?.label).toBe("Healthy weight");
  });

  it("classifies underweight bands", () => {
    expect(classifyBmi(15.5)?.key).toBe("severe-thinness");
    expect(classifyBmi(16.5)?.key).toBe("moderate-thinness");
    expect(classifyBmi(18)?.key).toBe("mild-thinness");
  });

  it("classifies overweight and obesity bands", () => {
    expect(classifyBmi(25)?.key).toBe("overweight");
    expect(classifyBmi(29.9)?.key).toBe("overweight");
    expect(classifyBmi(30)?.key).toBe("obese-class-1");
    expect(classifyBmi(37)?.key).toBe("obese-class-2");
    expect(classifyBmi(45)?.key).toBe("obese-class-3");
  });

  it("rejects unusable values", () => {
    expect(classifyBmi(0)).toBeNull();
    expect(classifyBmi(-3)).toBeNull();
    expect(classifyBmi(Number.NaN)).toBeNull();
  });
});

describe("healthyWeightRangeKg", () => {
  it("gives the healthy range for 178 cm", () => {
    const range = healthyWeightRangeKg(178);
    // 1.78^2 = 3.1684; 18.5 * 3.1684 = 58.62, 24.9 * 3.1684 = 78.89
    expect(range?.minKg).toBeCloseTo(58.62, 2);
    expect(range?.maxKg).toBeCloseTo(78.89, 2);
  });

  it("rejects out of range heights", () => {
    expect(healthyWeightRangeKg(20)).toBeNull();
  });
});

describe("unit conversions", () => {
  it("converts between pounds and kilograms", () => {
    expect(poundsToKg(100)).toBeCloseTo(45.359, 2);
    expect(kgToPounds(45.359237)).toBeCloseTo(100, 2);
  });

  it("converts feet and inches to centimetres", () => {
    expect(feetInchesToCm(5, 10)).toBeCloseTo(177.8, 5);
  });
});
