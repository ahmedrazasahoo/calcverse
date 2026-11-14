import { describe, expect, it } from "vitest";
import {
  convertWallTime,
  differenceText,
  formatClock,
  formatDifference,
  parseDateTimeLocal,
  zoneOffsetMinutes,
} from "./tz";

const NY = "America/New_York";
const LA = "America/Los_Angeles";
const CHICAGO = "America/Chicago";
const DENVER = "America/Denver";
const LONDON = "Europe/London";

describe("zoneOffsetMinutes", () => {
  it("reads New York as UTC-5 in winter and UTC-4 in summer", () => {
    expect(zoneOffsetMinutes(NY, new Date(Date.UTC(2026, 0, 15, 17, 0)))).toBe(-300);
    expect(zoneOffsetMinutes(NY, new Date(Date.UTC(2026, 6, 15, 16, 0)))).toBe(-240);
  });

  it("reads London as UTC+0 in winter and UTC+1 in summer", () => {
    expect(zoneOffsetMinutes(LONDON, new Date(Date.UTC(2026, 0, 15, 12, 0)))).toBe(0);
    expect(zoneOffsetMinutes(LONDON, new Date(Date.UTC(2026, 6, 15, 12, 0)))).toBe(60);
  });

  it("reads Los Angeles as UTC-8 in winter", () => {
    expect(zoneOffsetMinutes(LA, new Date(Date.UTC(2026, 0, 15, 20, 0)))).toBe(-480);
  });
});

describe("convertWallTime", () => {
  it("converts noon Eastern to 9:00 AM Pacific in winter", () => {
    const { result } = convertWallTime({ y: 2026, mo: 1, d: 15, h: 12, mi: 0 }, NY, LA);
    expect(result).toEqual({ y: 2026, mo: 1, d: 15, h: 9, mi: 0, weekday: "Thursday" });
  });

  it("converts noon Eastern to 5:00 PM in London in winter", () => {
    const { result } = convertWallTime({ y: 2026, mo: 1, d: 15, h: 12, mi: 0 }, NY, LONDON);
    expect(result).toEqual({ y: 2026, mo: 1, d: 15, h: 17, mi: 0, weekday: "Thursday" });
  });

  it("converts noon London to 7:00 AM Eastern in summer", () => {
    const { result } = convertWallTime({ y: 2026, mo: 7, d: 15, h: 12, mi: 0 }, LONDON, NY);
    expect(result).toEqual({ y: 2026, mo: 7, d: 15, h: 7, mi: 0, weekday: "Wednesday" });
  });

  it("handles the March week when the US is on daylight time and Europe is not", () => {
    // US daylight saving starts 8 March 2026, Europe's starts 29 March,
    // so on 15 March the New York to London gap is 4 hours, not 5.
    const { result } = convertWallTime({ y: 2026, mo: 3, d: 15, h: 12, mi: 0 }, NY, LONDON);
    expect(result).toEqual({ y: 2026, mo: 3, d: 15, h: 16, mi: 0, weekday: "Sunday" });
  });

  it("converts noon Eastern to 11:00 AM Central", () => {
    const { result } = convertWallTime({ y: 2026, mo: 1, d: 15, h: 12, mi: 0 }, NY, CHICAGO);
    expect(result.h).toBe(11);
    expect(result.mi).toBe(0);
  });

  it("converts noon Mountain to 2:00 PM Eastern in summer", () => {
    const { result } = convertWallTime({ y: 2026, mo: 7, d: 15, h: 12, mi: 0 }, DENVER, NY);
    expect(result).toEqual({ y: 2026, mo: 7, d: 15, h: 14, mi: 0, weekday: "Wednesday" });
  });

  it("keeps minutes intact across zones", () => {
    const { result } = convertWallTime({ y: 2026, mo: 1, d: 15, h: 9, mi: 30 }, LA, CHICAGO);
    expect(result.h).toBe(11);
    expect(result.mi).toBe(30);
  });

  it("rolls over to the next day when the conversion crosses midnight", () => {
    const { result } = convertWallTime({ y: 2026, mo: 1, d: 15, h: 23, mi: 0 }, NY, LONDON);
    expect(result).toEqual({ y: 2026, mo: 1, d: 16, h: 4, mi: 0, weekday: "Friday" });
  });
});

describe("differenceText", () => {
  const january = new Date(Date.UTC(2026, 0, 15, 17, 0));
  const marchGap = new Date(Date.UTC(2026, 2, 15, 16, 0));

  it("describes Pacific as 3 hours behind Eastern", () => {
    expect(differenceText(NY, LA, january)).toBe("3 hours behind");
  });

  it("describes Eastern as 3 hours ahead of Pacific", () => {
    expect(differenceText(LA, NY, january)).toBe("3 hours ahead");
  });

  it("describes London as 5 hours ahead of Eastern in winter", () => {
    expect(differenceText(NY, LONDON, january)).toBe("5 hours ahead");
  });

  it("narrows to 4 hours in the March mismatch week", () => {
    expect(differenceText(NY, LONDON, marchGap)).toBe("4 hours ahead");
  });

  it("reports the same time for a zone compared with itself", () => {
    expect(differenceText(NY, NY, january)).toBe("the same time");
  });
});

describe("formatDifference", () => {
  it("formats whole hours", () => {
    expect(formatDifference(180)).toBe("3 hours");
    expect(formatDifference(60)).toBe("1 hour");
  });

  it("formats hours and minutes together", () => {
    expect(formatDifference(90)).toBe("1 hour 30 minutes");
    expect(formatDifference(330)).toBe("5 hours 30 minutes");
  });

  it("formats minutes on their own and ignores the sign", () => {
    expect(formatDifference(-30)).toBe("30 minutes");
  });
});

describe("formatClock", () => {
  it("formats morning, noon and midnight correctly", () => {
    expect(formatClock({ y: 2026, mo: 1, d: 1, h: 9, mi: 5 })).toBe("9:05 AM");
    expect(formatClock({ y: 2026, mo: 1, d: 1, h: 12, mi: 0 })).toBe("12:00 PM");
    expect(formatClock({ y: 2026, mo: 1, d: 1, h: 0, mi: 0 })).toBe("12:00 AM");
  });
});

describe("parseDateTimeLocal", () => {
  it("parses a datetime-local value", () => {
    expect(parseDateTimeLocal("2026-01-15T12:00")).toEqual({ y: 2026, mo: 1, d: 15, h: 12, mi: 0 });
  });

  it("rejects empty and malformed values", () => {
    expect(parseDateTimeLocal("")).toBeNull();
    expect(parseDateTimeLocal("15/01/2026 12:00")).toBeNull();
    expect(parseDateTimeLocal("2026-13-15T12:00")).toBeNull();
  });
});
