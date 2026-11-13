import { describe, expect, it } from "vitest";
import {
  formatDuration,
  formatTime12h,
  minutesBetweenTimes,
  minutesToDecimalHours,
  shiftClockTime,
  totalShiftMinutes,
  workShift,
} from "./hoursCalculator";

describe("minutesBetweenTimes", () => {
  it("counts a normal daytime span", () => {
    expect(minutesBetweenTimes("09:00", "17:30")).toBe(510);
  });

  it("treats an earlier end time as an overnight shift", () => {
    expect(minutesBetweenTimes("22:00", "06:00")).toBe(480);
    expect(minutesBetweenTimes("23:30", "00:30")).toBe(60);
  });

  it("returns zero for equal times", () => {
    expect(minutesBetweenTimes("09:00", "09:00")).toBe(0);
  });

  it("rejects bad times", () => {
    expect(minutesBetweenTimes("9am", "17:30")).toBeNull();
    expect(minutesBetweenTimes("09:00", "25:00")).toBeNull();
  });
});

describe("workShift", () => {
  it("takes the unpaid break out of the shift", () => {
    const shift = workShift("09:00", "17:30", 30);
    expect(shift?.grossMinutes).toBe(510);
    expect(shift?.netMinutes).toBe(480);
    expect(shift?.decimalHours).toBeCloseTo(8, 5);
    expect(shift?.durationLabel).toBe("8 h");
  });

  it("handles an overnight shift with a break", () => {
    const shift = workShift("22:00", "06:00", 60);
    expect(shift?.netMinutes).toBe(420);
    expect(shift?.decimalHours).toBeCloseTo(7, 5);
  });

  it("rejects a break longer than the shift", () => {
    expect(workShift("09:00", "10:00", 90)).toBeNull();
    expect(workShift("09:00", "10:00", -5)).toBeNull();
  });
});

describe("shiftClockTime", () => {
  it("moves forward across midnight", () => {
    expect(shiftClockTime("23:30", 90)).toEqual({ time: "01:00", dayOffset: 1 });
  });

  it("moves backward across midnight", () => {
    expect(shiftClockTime("01:00", -120)).toEqual({ time: "23:00", dayOffset: -1 });
  });

  it("stays on the same day for small shifts", () => {
    expect(shiftClockTime("09:15", 45)).toEqual({ time: "10:00", dayOffset: 0 });
  });
});

describe("totals and formatting", () => {
  it("totals a week of shifts", () => {
    const shifts = [
      { start: "09:00", end: "17:00", breakMinutes: 60 },
      { start: "09:00", end: "17:00", breakMinutes: 60 },
      { start: "09:00", end: "13:00", breakMinutes: 0 },
    ];
    // 420 + 420 + 240 = 1080 net minutes, an 18 hour week.
    expect(totalShiftMinutes(shifts)).toBe(1080);
  });

  it("returns null when any shift in the list is invalid", () => {
    expect(totalShiftMinutes([{ start: "09:00", end: "bad", breakMinutes: 0 }])).toBeNull();
  });

  it("formats durations and decimal hours", () => {
    expect(formatDuration(510)).toBe("8 h 30 min");
    expect(formatDuration(60)).toBe("1 h");
    expect(formatDuration(45)).toBe("45 min");
    expect(minutesToDecimalHours(90)).toBeCloseTo(1.5, 5);
    expect(formatTime12h("17:30")).toBe("5:30 PM");
  });
});
