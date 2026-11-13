import { describe, expect, it } from "vitest";
import { calculateBmr, feetInchesToCm, katchMcArdleBmr, poundsToKg } from "./bmr";

const male = { sex: "male" as const, ageYears: 30, weightKg: 80, heightCm: 178 };
const female = { sex: "female" as const, ageYears: 28, weightKg: 65, heightCm: 165 };

describe("calculateBmr with Mifflin St Jeor (default)", () => {
  it("computes the reference male value", () => {
    // 10*80 + 6.25*178 - 5*30 + 5 = 1767.5
    expect(calculateBmr(male)).toBeCloseTo(1767.5, 5);
  });

  it("computes the reference female value", () => {
    // 10*65 + 6.25*165 - 5*28 - 161 = 1380.25
    expect(calculateBmr(female)).toBeCloseTo(1380.25, 5);
  });
});

describe("calculateBmr with Harris Benedict original (1919)", () => {
  it("computes the male value", () => {
    // 66.5 + 13.75*80 + 5.003*178 - 6.75*30 = 1854.534
    expect(calculateBmr(male, "harris-original")).toBeCloseTo(1854.534, 3);
  });

  it("computes the female value", () => {
    // 655.1 + 9.563*65 + 1.850*165 - 4.676*28 = 1451.017
    expect(calculateBmr(female, "harris-original")).toBeCloseTo(1451.017, 3);
  });
});

describe("calculateBmr with Harris Benedict revised (1984)", () => {
  it("computes the male value", () => {
    // 88.362 + 13.397*80 + 4.799*178 - 5.677*30 = 1844.034
    expect(calculateBmr(male, "harris-revised")).toBeCloseTo(1844.034, 3);
  });

  it("computes the female value", () => {
    // 447.593 + 9.247*65 + 3.098*165 - 4.330*28 = 1438.578
    expect(calculateBmr(female, "harris-revised")).toBeCloseTo(1438.578, 3);
  });
});

describe("calculateBmr validation", () => {
  it("rejects out of range input for every formula", () => {
    const bad = { sex: "male" as const, ageYears: 0, weightKg: 80, heightCm: 178 };
    expect(calculateBmr(bad, "mifflin")).toBeNull();
    expect(calculateBmr(bad, "harris-original")).toBeNull();
    expect(calculateBmr(bad, "harris-revised")).toBeNull();
    expect(calculateBmr({ ...male, weightKg: Number.NaN })).toBeNull();
  });
});

describe("katchMcArdleBmr", () => {
  it("computes BMR from lean mass", () => {
    // 70 kg at 20 percent body fat gives 56 kg lean mass: 370 + 21.6*56 = 1579.6
    expect(katchMcArdleBmr(70, 20)).toBeCloseTo(1579.6, 5);
  });

  it("rejects impossible body fat values", () => {
    expect(katchMcArdleBmr(70, 0)).toBeNull();
    expect(katchMcArdleBmr(70, 95)).toBeNull();
    expect(katchMcArdleBmr(-70, 20)).toBeNull();
  });
});

describe("unit conversions", () => {
  it("converts pounds and feet/inches", () => {
    expect(poundsToKg(100)).toBeCloseTo(45.359, 2);
    expect(feetInchesToCm(5, 10)).toBeCloseTo(177.8, 5);
  });
});
