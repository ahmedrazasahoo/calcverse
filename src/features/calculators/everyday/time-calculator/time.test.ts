import { describe, expect, it } from "vitest";
import {
  addDurations,
  durationBetweenTimes,
  formatDuration,
  fromSeconds,
  subtractDurations,
  toSeconds,
} from "./time";

// Formula: total seconds = days * 86400 + hours * 3600 + minutes * 60 + seconds

describe("toSeconds and fromSeconds", () => {
  it("converts a duration to seconds and back", () => {
    const d = { days: 1, hours: 2, minutes: 3, seconds: 4 };
    expect(toSeconds(d)).toBe(93784);
    expect(fromSeconds(93784)).toEqual(d);
  });

  it("normalises oversized parts", () => {
    expect(fromSeconds(toSeconds({ days: 0, hours: 0, minutes: 90, seconds: 0 }))).toEqual({
      days: 0,
      hours: 1,
      minutes: 30,
      seconds: 0,
    });
  });
});

describe("addDurations", () => {
  it("adds 1 hour 30 minutes and 45 minutes to get 2 hours 15 minutes", () => {
    const result = addDurations(
      { days: 0, hours: 1, minutes: 30, seconds: 0 },
      { days: 0, hours: 0, minutes: 45, seconds: 0 },
    );
    expect(result).toEqual({ days: 0, hours: 2, minutes: 15, seconds: 0 });
  });
});

describe("subtractDurations", () => {
  it("borrows correctly: 2 hours minus 1 hour 30 minutes is 30 minutes", () => {
    const result = subtractDurations(
      { days: 0, hours: 2, minutes: 0, seconds: 0 },
      { days: 0, hours: 1, minutes: 30, seconds: 0 },
    );
    expect(result).toEqual({ days: 0, hours: 0, minutes: 30, seconds: 0 });
  });

  it("throws when subtracting a longer duration from a shorter one", () => {
    expect(() =>
      subtractDurations(
        { days: 0, hours: 0, minutes: 10, seconds: 0 },
        { days: 0, hours: 1, minutes: 0, seconds: 0 },
      ),
    ).toThrow(RangeError);
  });
});

describe("durationBetweenTimes", () => {
  it("finds 8 hours 30 minutes between 09:15 and 17:45", () => {
    const result = durationBetweenTimes("09:15", "17:45");
    expect(result.duration).toEqual({ days: 0, hours: 8, minutes: 30, seconds: 0 });
    expect(result.totalSeconds).toBe(30600);
    expect(result.overnight).toBe(false);
  });

  it("treats an earlier end time as the next day", () => {
    const result = durationBetweenTimes("23:00", "01:00");
    expect(result.duration).toEqual({ days: 0, hours: 2, minutes: 0, seconds: 0 });
    expect(result.overnight).toBe(true);
  });

  it("supports seconds in clock times", () => {
    const result = durationBetweenTimes("10:00:30", "10:01:00");
    expect(result.totalSeconds).toBe(30);
  });
});

describe("formatDuration", () => {
  it("formats a full duration as plain text", () => {
    expect(formatDuration({ days: 2, hours: 3, minutes: 15, seconds: 10 })).toBe(
      "2 days, 3 hours, 15 minutes, 10 seconds",
    );
  });

  it("skips zero parts and keeps a zero duration readable", () => {
    expect(formatDuration({ days: 0, hours: 0, minutes: 30, seconds: 0 })).toBe("30 minutes");
    expect(formatDuration({ days: 0, hours: 0, minutes: 0, seconds: 0 })).toBe("0 seconds");
  });
});

describe("validation", () => {
  it("throws on a negative duration part", () => {
    expect(() => toSeconds({ days: 0, hours: -1, minutes: 0, seconds: 0 })).toThrow(RangeError);
    expect(() => addDurations({ days: 0, hours: 0, minutes: -5, seconds: 0 }, { days: 0, hours: 0, minutes: 0, seconds: 0 })).toThrow(
      RangeError,
    );
  });

  it("throws on an invalid clock time", () => {
    expect(() => durationBetweenTimes("25:00", "26:00")).toThrow(RangeError);
  });
});
