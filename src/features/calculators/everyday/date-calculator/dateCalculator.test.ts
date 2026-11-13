import { describe, expect, it } from "vitest";
import { addToDate, dateDifference } from "./dateCalculator";

describe("dateDifference", () => {
  it("counts plain days within a month", () => {
    const result = dateDifference("2026-01-01", "2026-01-31");
    expect(result?.totalDays).toBe(30);
    expect(result?.years).toBe(0);
    expect(result?.months).toBe(0);
    expect(result?.days).toBe(30);
    expect(result?.reversed).toBe(false);
  });

  it("splits weekdays and weekend days", () => {
    // The span runs from the start date up to the day before the end
    // date, so this counts 1 to 30 January 2026. 1 January 2026 is a
    // Thursday; those 30 days hold 22 weekdays and 8 weekend days.
    const result = dateDifference("2026-01-01", "2026-01-31");
    expect(result?.weekdays).toBe(22);
    expect(result?.weekendDays).toBe(8);
  });

  it("breaks a long span into years, months and days", () => {
    const result = dateDifference("2025-03-15", "2026-01-20");
    expect(result?.totalDays).toBe(311);
    expect(result?.years).toBe(0);
    expect(result?.months).toBe(10);
    expect(result?.days).toBe(5);
    expect(result?.fullWeeks).toBe(44);
    expect(result?.leftoverDays).toBe(3);
  });

  it("handles a whole number of years", () => {
    const result = dateDifference("2024-02-29", "2026-02-28");
    expect(result?.years).toBe(1);
    expect(result?.months).toBe(11);
    expect(result?.days).toBe(30);
  });

  it("accepts reversed dates and flags them", () => {
    const result = dateDifference("2026-01-31", "2026-01-01");
    expect(result?.totalDays).toBe(30);
    expect(result?.reversed).toBe(true);
    expect(result?.startDate).toBe("2026-01-01");
    expect(result?.endDate).toBe("2026-01-31");
  });

  it("returns zero for the same date twice", () => {
    const result = dateDifference("2026-01-01", "2026-01-01");
    expect(result?.totalDays).toBe(0);
    expect(result?.weekdays).toBe(0);
  });

  it("rejects invalid dates", () => {
    expect(dateDifference("2026-02-30", "2026-03-01")).toBeNull();
    expect(dateDifference("2026-01-01", "tomorrow")).toBeNull();
  });
});

describe("addToDate", () => {
  it("adds plain days across a year boundary", () => {
    expect(addToDate("2026-12-31", { days: 1 })).toBe("2027-01-01");
    expect(addToDate("2026-01-15", { weeks: 2 })).toBe("2026-01-29");
  });

  it("clamps the day when adding months to the 31st", () => {
    expect(addToDate("2026-01-31", { months: 1 })).toBe("2026-02-28");
    expect(addToDate("2024-01-31", { months: 1 })).toBe("2024-02-29");
  });

  it("adds years and months together", () => {
    expect(addToDate("2025-06-15", { years: 1, months: 2 })).toBe("2026-08-15");
  });

  it("subtracts with sign -1", () => {
    expect(addToDate("2026-03-01", { days: 1 }, -1)).toBe("2026-02-28");
    expect(addToDate("2026-03-31", { months: 1 }, -1)).toBe("2026-02-28");
  });

  it("rejects negative or invalid durations and dates", () => {
    expect(addToDate("2026-01-01", { days: -3 })).toBeNull();
    expect(addToDate("2026-02-30", { days: 1 })).toBeNull();
  });
});
