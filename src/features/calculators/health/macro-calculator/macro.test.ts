import { describe, expect, it } from "vitest";
import { calculateMacros, goalCalories, mifflinBmr, PRESETS } from "./macro";

describe("mifflinBmr", () => {
  it("matches the hand computed male case", () => {
    // 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
    expect(mifflinBmr("male", 30, 80, 180)).toBe(1780);
  });
  it("uses minus 161 for females", () => {
    expect(mifflinBmr("female", 30, 80, 180)).toBe(1614);
  });
});

describe("calculateMacros reference case", () => {
  const r = calculateMacros({
    sex: "male", age: 30, weightKg: 80, heightCm: 180,
    activity: 1.55, goal: "maintain", split: PRESETS.balanced.split,
  });
  it("gives TDEE of 2759 at moderate activity", () => {
    expect(r?.tdee).toBeCloseTo(2759, 5);
    expect(r?.calories).toBeCloseTo(2759, 5);
  });
  it("splits balanced macros into grams", () => {
    expect(r?.proteinGrams).toBeCloseTo(206.93, 2);
    expect(r?.carbGrams).toBeCloseTo(275.9, 2);
    expect(r?.fatGrams).toBeCloseTo(91.97, 2);
  });
  it("reports the calorie split per macro", () => {
    expect(r?.proteinKcal).toBeCloseTo(827.7, 1);
    expect(r?.carbKcal).toBeCloseTo(1103.6, 1);
    expect(r?.fatKcal).toBeCloseTo(827.7, 1);
  });
});

describe("goalCalories", () => {
  it("subtracts 500 to lose and adds 300 to gain", () => {
    expect(goalCalories(2759, "lose")).toBe(2259);
    expect(goalCalories(2759, "gain")).toBe(3059);
    expect(goalCalories(2759, "maintain")).toBe(2759);
  });
  it("never drops a lose target below the 1200 floor", () => {
    expect(goalCalories(1500, "lose")).toBe(1200);
  });
});

describe("validation", () => {
  it("flags a custom split that does not sum to 100", () => {
    const r = calculateMacros({ sex: "female", age: 30, weightKg: 65, heightCm: 165, activity: 1.375, goal: "maintain", split: { carbPct: 40, proteinPct: 30, fatPct: 20 } });
    expect(r?.splitValid).toBe(false);
  });
  it("rejects an unknown activity multiplier", () => {
    expect(calculateMacros({ sex: "male", age: 30, weightKg: 80, heightCm: 180, activity: 1.4, goal: "maintain", split: PRESETS.balanced.split })).toBeNull();
  });
  it("keto preset sums to 100", () => {
    const s = PRESETS.keto.split;
    expect(s.carbPct + s.proteinPct + s.fatPct).toBe(100);
  });
});
