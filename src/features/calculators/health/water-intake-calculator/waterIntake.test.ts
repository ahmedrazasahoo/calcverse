import { describe, expect, it } from "vitest";
import { dailyWaterIntake } from "./waterIntake";

describe("dailyWaterIntake", () => {
  it("computes the weight based amount for a resting day", () => {
    // 70 kg * 35 ml = 2450 ml
    const result = dailyWaterIntake({ weightKg: 70, exerciseMinutes: 0, climate: "temperate" });
    expect(result?.milliliters).toBeCloseTo(2450, 5);
    expect(result?.liters).toBeCloseTo(2.45, 5);
    expect(result?.cups).toBeCloseTo(9.8, 5);
    expect(result?.exerciseMilliliters).toBe(0);
  });

  it("adds water for exercise", () => {
    // 60 minutes adds 2 * 355 = 710 ml, total 3160 ml.
    const result = dailyWaterIntake({ weightKg: 70, exerciseMinutes: 60, climate: "temperate" });
    expect(result?.milliliters).toBeCloseTo(3160, 5);
    expect(result?.exerciseMilliliters).toBeCloseTo(710, 5);
  });

  it("scales the total in hot weather", () => {
    // (2450 + 710) * 1.2 = 3792 ml
    const result = dailyWaterIntake({ weightKg: 70, exerciseMinutes: 60, climate: "hot" });
    expect(result?.milliliters).toBeCloseTo(3792, 5);
  });

  it("reports fluid ounces", () => {
    const result = dailyWaterIntake({ weightKg: 70, exerciseMinutes: 0, climate: "temperate" });
    // 2450 / 29.5735 = 82.84 fl oz
    expect(result?.fluidOunces).toBeCloseTo(82.84, 1);
  });

  it("rejects out of range input", () => {
    expect(dailyWaterIntake({ weightKg: 0, exerciseMinutes: 0, climate: "temperate" })).toBeNull();
    expect(dailyWaterIntake({ weightKg: 70, exerciseMinutes: -10, climate: "temperate" })).toBeNull();
    expect(dailyWaterIntake({ weightKg: 70, exerciseMinutes: 0, climate: "arctic" as never })).toBeNull();
  });
});
