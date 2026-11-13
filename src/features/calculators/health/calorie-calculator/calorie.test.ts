import { describe, expect, it } from "vitest";
import { caloriePlan, weeklyChangeKg } from "./calorie";

const female = { sex: "female" as const, ageYears: 28, weightKg: 65, heightCm: 165 };

describe("caloriePlan", () => {
  it("computes BMR and maintenance for the reference person", () => {
    // BMR 1380.25 (Mifflin), maintenance 1380.25 * 1.375 = 1897.84
    const plan = caloriePlan(female, 1.375);
    expect(plan?.bmr).toBeCloseTo(1380.25, 5);
    expect(plan?.maintenance).toBeCloseTo(1897.84, 2);
  });

  it("builds six goals stepping around maintenance", () => {
    const plan = caloriePlan(female, 1.375);
    const byKey = new Map(plan?.goals.map((g) => [g.key, g]));
    expect(byKey.get("maintain")?.calories).toBeCloseTo(1897.84, 2);
    expect(byKey.get("lose")?.calories).toBeCloseTo(1397.84, 2);
    expect(byKey.get("gain")?.calories).toBeCloseTo(2397.84, 2);
    expect(byKey.get("mild-lose")?.adjustmentPerDay).toBe(-250);
  });

  it("clamps the fast lose target at the safe floor and adjusts the estimate", () => {
    const plan = caloriePlan(female, 1.375);
    const fast = plan?.goals.find((g) => g.key === "fast-lose");
    // Raw target would be 897.84, floor lifts it to 1200.
    expect(fast?.calories).toBe(1200);
    // Real adjustment is 1200 - 1897.84 = -697.84 per day.
    expect(fast?.weeklyChangeKg).toBeCloseTo(-0.634, 2);
  });

  it("rejects out of range input", () => {
    expect(caloriePlan({ ...female, ageYears: 0 }, 1.375)).toBeNull();
    expect(caloriePlan({ ...female, weightKg: -1 }, 1.375)).toBeNull();
    expect(caloriePlan(female, 0.5)).toBeNull();
    expect(caloriePlan(female, Number.NaN)).toBeNull();
  });
});

describe("weeklyChangeKg", () => {
  it("maps a 500 kcal daily deficit to about 0.45 kg per week", () => {
    expect(weeklyChangeKg(-500)).toBeCloseTo(-0.4545, 3);
    expect(weeklyChangeKg(250)).toBeCloseTo(0.2273, 3);
    expect(weeklyChangeKg(0)).toBe(0);
  });
});
