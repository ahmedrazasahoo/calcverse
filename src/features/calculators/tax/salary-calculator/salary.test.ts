import { describe, expect, it } from "vitest";
import { convertPay, estimateTakeHome } from "./salary";

describe("convertPay", () => {
  it("converts 25 per hour at 40 hours a week to a full year", () => {
    // Yearly = 25 times 40 times 52 = 52,000.
    // Monthly = 52,000 / 12 = 4,333.33. Weekly = 1,000. Daily = 200.
    const result = convertPay({ amount: 25, period: "hourly", hoursPerWeek: 40, weeksPerYear: 52 });
    expect(result.yearly).toBe(52_000);
    expect(result.monthly).toBe(4_333.33);
    expect(result.weekly).toBe(1_000);
    expect(result.daily).toBe(200);
    expect(result.hourly).toBe(25);
  });

  it("converts a yearly salary back to an hourly rate", () => {
    // Hourly = 120,000 / (40 times 52) = 120,000 / 2,080 = 57.69.
    const result = convertPay({ amount: 120_000, period: "yearly" });
    expect(result.hourly).toBe(57.69);
    expect(result.monthly).toBe(10_000);
    expect(result.weekly).toBe(2_307.69);
    expect(result.daily).toBe(461.54);
  });

  it("round trips through monthly pay", () => {
    const monthly = convertPay({ amount: 5_000, period: "monthly" });
    expect(monthly.yearly).toBe(60_000);
    const back = convertPay({ amount: monthly.yearly, period: "yearly" });
    expect(back.monthly).toBe(5_000);
  });

  it("respects a shorter working week", () => {
    // 20 per hour, 20 hours a week, 52 weeks = 20,800 a year.
    const result = convertPay({ amount: 20, period: "hourly", hoursPerWeek: 20 });
    expect(result.yearly).toBe(20_800);
    expect(result.weekly).toBe(400);
    expect(result.daily).toBe(80);
  });

  it("rejects invalid conversion input", () => {
    expect(() => convertPay({ amount: 0, period: "hourly" })).toThrow(RangeError);
    expect(() => convertPay({ amount: -5, period: "monthly" })).toThrow(RangeError);
    expect(() => convertPay({ amount: 25, period: "hourly", hoursPerWeek: 0 })).toThrow(RangeError);
    expect(() => convertPay({ amount: 25, period: "hourly", hoursPerWeek: 169 })).toThrow(RangeError);
  });
});

describe("estimateTakeHome", () => {
  it("estimates US take home on 52,000", () => {
    // Taxable = 52,000 - 15,000 = 37,000.
    // Federal = 1,192.50 (10 percent of 11,925) + 3,009 (12 percent
    // of 25,075) = 4,201.50.
    // FICA = 52,000 times 7.65 percent = 3,978.
    // Total deductions = 8,179.50, net = 43,820.50.
    const result = estimateTakeHome({ grossYearly: 52_000, country: "us" });
    expect(result.totalDeductions).toBe(8_179.5);
    expect(result.net).toBe(43_820.5);
    expect(result.monthlyNet).toBe(3_651.71);
  });

  it("estimates UK take home on 60,000", () => {
    // Income tax 11,432 plus National Insurance 3,210.60, as worked
    // out in the income tax estimator tests, total 14,642.60.
    const result = estimateTakeHome({ grossYearly: 60_000, country: "uk" });
    expect(result.totalDeductions).toBeCloseTo(14_642.6, 2);
    expect(result.net).toBeCloseTo(45_357.4, 2);
  });

  it("applies a flat custom rate", () => {
    // 20 percent of 60,000 = 12,000 tax, net 48,000.
    const result = estimateTakeHome({ grossYearly: 60_000, country: "custom", flatTaxPercent: 20 });
    expect(result.totalDeductions).toBe(12_000);
    expect(result.net).toBe(48_000);
    expect(result.monthlyNet).toBe(4_000);
  });

  it("adds a US state estimate on top of federal tax and FICA", () => {
    const noState = estimateTakeHome({ grossYearly: 52_000, country: "us" });
    const withState = estimateTakeHome({ grossYearly: 52_000, country: "us", stateRatePercent: 5 });
    // State = 5 percent of 52,000 = 2,600 extra.
    expect(withState.totalDeductions).toBe(noState.totalDeductions + 2_600);
  });

  it("returns the full gross on zero deductions and rejects invalid input", () => {
    const result = estimateTakeHome({ grossYearly: 0, country: "custom", flatTaxPercent: 20 });
    expect(result.net).toBe(0);
    expect(() => estimateTakeHome({ grossYearly: -1, country: "us" })).toThrow(RangeError);
    expect(() => estimateTakeHome({ grossYearly: 10_000, country: "custom", flatTaxPercent: 101 })).toThrow(RangeError);
  });
});
