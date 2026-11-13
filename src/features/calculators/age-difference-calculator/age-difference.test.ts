import { describe, expect, it } from "vitest";
import { calculateAgeDifference } from "./age-difference";

describe("calculateAgeDifference", () => {
  it("computes the gap between two birthdays", () => {
    const result = calculateAgeDifference("1990-03-10", "1994-09-25");
    expect(result).not.toBeNull();
    expect(result!.diff).toEqual({ years: 4, months: 6, days: 15 });
    expect(result!.earlier).toEqual({ y: 1990, m: 3, d: 10 });
    expect(result!.later).toEqual({ y: 1994, m: 9, d: 25 });
  });

  it("gives the same answer when the dates are swapped", () => {
    const forward = calculateAgeDifference("1990-03-10", "1994-09-25");
    const swapped = calculateAgeDifference("1994-09-25", "1990-03-10");
    expect(swapped!.diff).toEqual(forward!.diff);
    expect(swapped!.totalDays).toBe(forward!.totalDays);
  });

  it("reports zero for two births on the same day", () => {
    const result = calculateAgeDifference("2001-07-07", "2001-07-07");
    expect(result!.sameDay).toBe(true);
    expect(result!.diff).toEqual({ years: 0, months: 0, days: 0 });
  });

  it("borrows month lengths correctly across a year boundary", () => {
    const result = calculateAgeDifference("2000-12-31", "2001-01-01");
    expect(result!.diff).toEqual({ years: 0, months: 0, days: 1 });
    expect(result!.totalDays).toBe(1);
  });

  it("returns null for invalid dates", () => {
    expect(calculateAgeDifference("2023-02-30", "2000-01-01")).toBeNull();
    expect(calculateAgeDifference("not-a-date", "2000-01-01")).toBeNull();
  });
});
