import { describe, expect, it } from "vitest";
import {
  convertDistance,
  distanceFromTimeAndPace,
  finishTimeSeconds,
  formatDuration,
  formatPace,
  paceSecondsPerUnit,
  parseDurationToSeconds,
  solvePace,
  speedPerHour,
} from "./pace";

describe("parseDurationToSeconds", () => {
  it("parses hours, minutes and seconds", () => {
    expect(parseDurationToSeconds("1:45:30")).toBe(6330);
  });

  it("parses minutes and seconds", () => {
    expect(parseDurationToSeconds("45:30")).toBe(2730);
    expect(parseDurationToSeconds("7:30")).toBe(450);
  });

  it("reads a bare number as minutes", () => {
    expect(parseDurationToSeconds("45")).toBe(2700);
  });

  it("rejects malformed values", () => {
    expect(parseDurationToSeconds("")).toBeNull();
    expect(parseDurationToSeconds("1:75:00")).toBeNull();
    expect(parseDurationToSeconds("abc")).toBeNull();
    expect(parseDurationToSeconds("1:2:3:4")).toBeNull();
  });
});

describe("the pace triangle", () => {
  it("finds pace from time and distance", () => {
    // 10 km in 50 minutes is exactly 300 seconds per kilometre.
    expect(paceSecondsPerUnit(3000, 10)).toBe(300);
    expect(formatPace(300, "km")).toBe("5:00 /km");
  });

  it("finds finish time from pace and distance", () => {
    // 6:00 per km over a marathon is 15190.2 seconds, about 4:13:10.
    const total = finishTimeSeconds(360, 42.195);
    expect(total).toBeCloseTo(15190.2, 1);
    expect(formatDuration(total as number)).toBe("4:13:10");
  });

  it("finds distance from time and pace", () => {
    expect(distanceFromTimeAndPace(3600, 300)).toBe(12);
  });

  it("computes speed per hour", () => {
    // 10 km in 50 minutes is 12 km per hour.
    expect(speedPerHour(3000, 10)).toBeCloseTo(12, 5);
  });

  it("rejects zero and negative inputs", () => {
    expect(paceSecondsPerUnit(0, 10)).toBeNull();
    expect(paceSecondsPerUnit(3000, 0)).toBeNull();
    expect(finishTimeSeconds(-300, 10)).toBeNull();
  });
});

describe("solvePace", () => {
  it("solves for the missing distance", () => {
    const result = solvePace({ totalSeconds: 3600, paceSecondsPerUnit: 300 });
    expect(result?.distance).toBe(12);
    expect(result?.speedPerHour).toBeCloseTo(12, 5);
  });

  it("solves for the missing time", () => {
    const result = solvePace({ distance: 5, paceSecondsPerUnit: 360 });
    expect(result?.totalSeconds).toBe(1800);
  });

  it("solves for the missing pace", () => {
    const result = solvePace({ distance: 5, totalSeconds: 1800 });
    expect(result?.paceSecondsPerUnit).toBe(360);
  });

  it("needs exactly one missing value", () => {
    expect(solvePace({ distance: 5, totalSeconds: 1800, paceSecondsPerUnit: 360 })).toBeNull();
    expect(solvePace({ distance: 5 })).toBeNull();
  });
});

describe("formatDuration and convertDistance", () => {
  it("formats durations with and without hours", () => {
    expect(formatDuration(6330)).toBe("1:45:30");
    expect(formatDuration(2730)).toBe("45:30");
    expect(formatDuration(300)).toBe("5:00");
  });

  it("converts between kilometres and miles", () => {
    expect(convertDistance(1, "mi", "km")).toBeCloseTo(1.609344, 5);
    expect(convertDistance(10, "km", "mi")).toBeCloseTo(6.2137, 3);
    expect(convertDistance(10, "km", "km")).toBe(10);
  });
});
