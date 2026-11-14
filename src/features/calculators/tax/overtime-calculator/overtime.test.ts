import { describe, expect, it } from "vitest";
import {
  calculateCaliforniaOvertime,
  calculateSimpleOvertime,
  calculateWeeklyOvertime,
} from "./overtime";

describe("calculateSimpleOvertime", () => {
  it("pays time and a half in simple mode", () => {
    const r = calculateSimpleOvertime({ hourlyRate: 20, regularHours: 40, overtimeHours: 10, multiplier: 1.5 });
    expect(r.regularPay).toBe(800);
    expect(r.overtimePay).toBe(300);
    expect(r.totalGross).toBe(1100);
    expect(r.totalHours).toBe(50);
    expect(r.effectiveHourlyRate).toBe(22);
    expect(r.overtimeRate).toBe(30);
  });

  it("pays double time when the multiplier is 2", () => {
    const r = calculateSimpleOvertime({ hourlyRate: 25, regularHours: 40, overtimeHours: 5, multiplier: 2 });
    expect(r.regularPay).toBe(1000);
    expect(r.overtimePay).toBe(250);
    expect(r.totalGross).toBe(1250);
  });

  it("supports a custom multiplier", () => {
    const r = calculateSimpleOvertime({ hourlyRate: 20, regularHours: 40, overtimeHours: 4, multiplier: 1.75 });
    expect(r.overtimeRate).toBe(35);
    expect(r.overtimePay).toBe(140);
    expect(r.totalGross).toBe(940);
  });

  it("rejects negative hours and a zero multiplier", () => {
    expect(() => calculateSimpleOvertime({ hourlyRate: 20, regularHours: -1, overtimeHours: 0, multiplier: 1.5 })).toThrow(RangeError);
    expect(() => calculateSimpleOvertime({ hourlyRate: 20, regularHours: 40, overtimeHours: 0, multiplier: 0 })).toThrow(RangeError);
  });
});

describe("calculateWeeklyOvertime (FLSA)", () => {
  it("splits a 50 hour week into 40 regular and 10 at 1.5x", () => {
    const r = calculateWeeklyOvertime({ hourlyRate: 20, totalHours: 50 });
    expect(r.regularHours).toBe(40);
    expect(r.overtimeHours).toBe(10);
    expect(r.regularPay).toBe(800);
    expect(r.overtimePay).toBe(300);
    expect(r.totalGross).toBe(1100);
  });

  it("pays no overtime at or below 40 hours", () => {
    const r = calculateWeeklyOvertime({ hourlyRate: 20, totalHours: 35 });
    expect(r.regularHours).toBe(35);
    expect(r.overtimeHours).toBe(0);
    expect(r.totalGross).toBe(700);
    const exact = calculateWeeklyOvertime({ hourlyRate: 20, totalHours: 40 });
    expect(exact.overtimeHours).toBe(0);
    expect(exact.totalGross).toBe(800);
  });
});

describe("calculateCaliforniaOvertime", () => {
  it("splits a 14 hour day into 8 regular, 4 at 1.5x and 2 at 2x", () => {
    const r = calculateCaliforniaOvertime({ hourlyRate: 20, dailyHours: [14, 0, 0, 0, 0, 0, 0] });
    expect(r.days[0].regularHours).toBe(8);
    expect(r.days[0].overtime15Hours).toBe(4);
    expect(r.days[0].doubleTimeHours).toBe(2);
    expect(r.regularPay).toBe(160);
    expect(r.overtime15Pay).toBe(120);
    expect(r.doubleTimePay).toBe(80);
    expect(r.totalGross).toBe(360);
  });

  it("applies daily overtime across five 10 hour days with no weekly extra", () => {
    const r = calculateCaliforniaOvertime({ hourlyRate: 20, dailyHours: [10, 10, 10, 10, 10, 0, 0] });
    expect(r.regularHours).toBe(40);
    expect(r.overtime15Hours).toBe(10);
    expect(r.doubleTimeHours).toBe(0);
    expect(r.totalGross).toBe(1100);
  });

  it("converts straight time over 40 in the week to 1.5x", () => {
    const r = calculateCaliforniaOvertime({ hourlyRate: 10, dailyHours: [8, 8, 8, 8, 8, 8, 0] });
    expect(r.regularHours).toBe(40);
    expect(r.overtime15Hours).toBe(8);
    expect(r.totalGross).toBe(520);
  });

  it("pays the seventh consecutive day at 1.5x for the first 8 hours", () => {
    const r = calculateCaliforniaOvertime({ hourlyRate: 10, dailyHours: [8, 8, 8, 8, 8, 8, 8] });
    expect(r.days[6].isSeventhConsecutiveDay).toBe(true);
    expect(r.days[6].regularHours).toBe(0);
    // Seventh day contributes 8 at 1.5x, weekly rule adds 8 more at 1.5x.
    expect(r.overtime15Hours).toBe(16);
    expect(r.regularHours).toBe(40);
    expect(r.totalGross).toBe(640);
  });

  it("pays hours beyond 8 on the seventh consecutive day at 2x", () => {
    const r = calculateCaliforniaOvertime({ hourlyRate: 10, dailyHours: [8, 8, 8, 8, 8, 8, 10] });
    expect(r.days[6].overtime15Hours).toBe(8);
    expect(r.days[6].doubleTimeHours).toBe(2);
    expect(r.doubleTimeHours).toBe(2);
  });

  it("rejects the wrong number of days and hours over 24", () => {
    expect(() => calculateCaliforniaOvertime({ hourlyRate: 10, dailyHours: [8, 8] })).toThrow(RangeError);
    expect(() => calculateCaliforniaOvertime({ hourlyRate: 10, dailyHours: [25, 0, 0, 0, 0, 0, 0] })).toThrow(RangeError);
  });
});
