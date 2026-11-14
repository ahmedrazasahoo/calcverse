import { describe, expect, it } from "vitest";
import { calculateGratuity } from "./gratuity";

describe("calculateGratuity", () => {
  it("computes India gratuity as 15/26 of salary times years", () => {
    // Formula: (15 / 26) * 60,000 * 10 = 346,153.85 approx
    const result = calculateGratuity({ country: "india", monthlySalary: 60_000, yearsOfService: 10 });
    expect(result.amount).toBeCloseTo(346_153.85, 2);
    expect(result.eligible).toBe(true);
    expect(result.capped).toBe(false);
    expect(result.yearsCounted).toBe(10);
  });

  it("still computes an India amount below five years but flags it not eligible", () => {
    const result = calculateGratuity({ country: "india", monthlySalary: 60_000, yearsOfService: 3 });
    expect(result.amount).toBeCloseTo(103_846.15, 2);
    expect(result.eligible).toBe(false);
  });

  it("rounds an India part year above six months up to a full year", () => {
    const result = calculateGratuity({ country: "india", monthlySalary: 60_000, yearsOfService: 10.7 });
    expect(result.yearsCounted).toBe(11);
    const short = calculateGratuity({ country: "india", monthlySalary: 60_000, yearsOfService: 10.4 });
    expect(short.yearsCounted).toBe(10);
  });

  it("caps India gratuity at 20 lakh", () => {
    // (15 / 26) * 200,000 * 40 = 4,615,384.62, above the cap.
    const result = calculateGratuity({ country: "india", monthlySalary: 200_000, yearsOfService: 40 });
    expect(result.amount).toBe(2_000_000);
    expect(result.capped).toBe(true);
  });

  it("computes UAE gratuity from 21 then 30 days per year", () => {
    // Days = 5 * 21 + 2 * 30 = 165, daily wage = 9,000 / 30 = 300, amount = 49,500
    const result = calculateGratuity({ country: "uae", monthlySalary: 9_000, yearsOfService: 7 });
    expect(result.daysAccrued).toBe(165);
    expect(result.dailyWage).toBe(300);
    expect(result.amount).toBe(49_500);
    expect(result.eligible).toBe(true);
  });

  it("caps UAE gratuity at two years of salary", () => {
    // Days = 5 * 21 + 35 * 30 = 1,155, daily 333.33, raw 385,000, cap = 10,000 * 24
    const result = calculateGratuity({ country: "uae", monthlySalary: 10_000, yearsOfService: 40 });
    expect(result.amount).toBe(240_000);
    expect(result.capped).toBe(true);
  });

  it("computes Qatar gratuity as three weeks of salary per year", () => {
    // Weekly pay = 10,000 * 12 / 52 = 2,307.69, amount = 4 * 3 * 2,307.69 = 27,692.31 approx
    const result = calculateGratuity({ country: "qatar", monthlySalary: 10_000, yearsOfService: 4 });
    expect(result.weeklyPay).toBeCloseTo(2_307.69, 2);
    expect(result.amount).toBeCloseTo(27_692.31, 2);
    expect(result.eligible).toBe(true);
    expect(result.capped).toBe(false);
  });

  it("flags Qatar service under one year as not eligible", () => {
    const result = calculateGratuity({ country: "qatar", monthlySalary: 10_000, yearsOfService: 0.5 });
    expect(result.eligible).toBe(false);
  });

  it("rejects invalid input", () => {
    expect(() =>
      calculateGratuity({ country: "india", monthlySalary: 0, yearsOfService: 10 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateGratuity({ country: "uae", monthlySalary: 9_000, yearsOfService: -1 }),
    ).toThrow(RangeError);
  });
});
