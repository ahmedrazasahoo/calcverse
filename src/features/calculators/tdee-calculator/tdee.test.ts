import { describe, expect, it } from "vitest";
import {
  calculateBmr,
  calculateTdee,
  calorieTargets,
  feetInchesToCm,
  macroSplit,
  poundsToKg,
} from "./tdee";

describe("calculateBmr (Mifflin St Jeor)", () => {
  it("computes the reference male value", () => {
    // 10*80 + 6.25*178 - 5*30 + 5 = 1767.5
    expect(calculateBmr({ sex: "male", ageYears: 30, weightKg: 80, heightCm: 178 })).toBeCloseTo(1767.5, 5);
  });

  it("computes the reference female value", () => {
    // 10*65 + 6.25*165 - 5*28 - 161 = 1380.25
    expect(calculateBmr({ sex: "female", ageYears: 28, weightKg: 65, heightCm: 165 })).toBeCloseTo(1380.25, 5);
  });

  it("rejects out of range input", () => {
    expect(calculateBmr({ sex: "male", ageYears: 0, weightKg: 80, heightCm: 178 })).toBeNull();
    expect(calculateBmr({ sex: "male", ageYears: 30, weightKg: -5, heightCm: 178 })).toBeNull();
    expect(calculateBmr({ sex: "male", ageYears: 30, weightKg: 80, heightCm: 20 })).toBeNull();
    expect(calculateBmr({ sex: "male", ageYears: 30, weightKg: Number.NaN, heightCm: 178 })).toBeNull();
  });
});

describe("calculateTdee", () => {
  it("multiplies BMR by the activity factor", () => {
    expect(calculateTdee(1767.5, 1.55)).toBeCloseTo(2739.625, 5);
    expect(calculateTdee(1500, 1.2)).toBeCloseTo(1800, 5);
  });
});

describe("calorieTargets", () => {
  it("steps 500 kcal either side of maintenance", () => {
    const targets = calorieTargets(2500);
    expect(targets.maintain).toBe(2500);
    expect(targets.lose).toBe(2000);
    expect(targets.gain).toBe(3000);
  });

  it("never suggests a target below the safe floor", () => {
    expect(calorieTargets(1500).lose).toBe(1200);
  });
});

describe("macroSplit", () => {
  it("splits 2000 kcal into 150g protein, 200g carbs, about 67g fat", () => {
    const macros = macroSplit(2000);
    expect(macros.proteinGrams).toBeCloseTo(150, 5);
    expect(macros.carbsGrams).toBeCloseTo(200, 5);
    expect(macros.fatGrams).toBeCloseTo(66.667, 2);
  });
});

describe("unit conversions", () => {
  it("converts pounds to kilograms", () => {
    expect(poundsToKg(100)).toBeCloseTo(45.359, 2);
  });

  it("converts feet and inches to centimetres", () => {
    expect(feetInchesToCm(5, 10)).toBeCloseTo(177.8, 5);
  });
});
