import { describe, expect, it } from "vitest";
import { buildChart, formatMilitary, spokenMilitary, to12, to24 } from "./military";

describe("to24", () => {
  it("converts the boundary hours correctly", () => {
    expect(to24(12, 0, "AM")).toEqual({ hour24: 0, minute: 0 });
    expect(to24(12, 0, "PM")).toEqual({ hour24: 12, minute: 0 });
    expect(to24(1, 30, "PM")).toEqual({ hour24: 13, minute: 30 });
    expect(to24(11, 45, "PM")).toEqual({ hour24: 23, minute: 45 });
    expect(to24(9, 15, "AM")).toEqual({ hour24: 9, minute: 15 });
  });

  it("throws on out of range input", () => {
    expect(() => to24(0, 0, "AM")).toThrow(RangeError);
    expect(() => to24(13, 0, "AM")).toThrow(RangeError);
    expect(() => to24(5, 60, "AM")).toThrow(RangeError);
  });
});

describe("to12", () => {
  it("converts 0, 12, 13 and 23 hours", () => {
    expect(to12(0, 0).display).toBe("12:00 AM");
    expect(to12(12, 0).display).toBe("12:00 PM");
    expect(to12(13, 5).display).toBe("1:05 PM");
    expect(to12(23, 59).display).toBe("11:59 PM");
    expect(to12(9, 30)).toMatchObject({ hour12: 9, ampm: "AM" });
  });
});

describe("formatMilitary", () => {
  it("pads to four digits at the boundary hours", () => {
    expect(formatMilitary(0, 0)).toBe("0000 hours");
    expect(formatMilitary(12, 0)).toBe("1200 hours");
    expect(formatMilitary(13, 30)).toBe("1330 hours");
    expect(formatMilitary(23, 45)).toBe("2345 hours");
    expect(formatMilitary(9, 5)).toBe("0905 hours");
  });
});

describe("spokenMilitary", () => {
  it("reads whole hours in the hundred style", () => {
    expect(spokenMilitary(0, 0)).toBe("zero hundred hours");
    expect(spokenMilitary(9, 0)).toBe("zero nine hundred hours");
    expect(spokenMilitary(12, 0)).toBe("twelve hundred hours");
    expect(spokenMilitary(13, 0)).toBe("thirteen hundred hours");
    expect(spokenMilitary(23, 0)).toBe("twenty three hundred hours");
  });

  it("reads times with minutes as two pairs", () => {
    expect(spokenMilitary(14, 30)).toBe("fourteen thirty hours");
    expect(spokenMilitary(9, 5)).toBe("zero nine zero five hours");
    expect(spokenMilitary(0, 30)).toBe("zero zero thirty hours");
    expect(spokenMilitary(23, 59)).toBe("twenty three fifty nine hours");
  });
});

describe("buildChart", () => {
  it("has 24 rows matching the conversions", () => {
    const chart = buildChart();
    expect(chart).toHaveLength(24);
    expect(chart[0]).toEqual({
      hour24: 0,
      display12: "12:00 AM",
      military: "0000 hours",
      spoken: "zero hundred hours",
    });
    expect(chart[13].display12).toBe("1:00 PM");
    expect(chart[13].military).toBe("1300 hours");
    expect(chart[23].spoken).toBe("twenty three hundred hours");
  });
});
