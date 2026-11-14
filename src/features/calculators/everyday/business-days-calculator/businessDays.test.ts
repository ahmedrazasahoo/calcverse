import { describe, expect, it } from "vitest";
import { addBusinessDays, businessDaysBetween, holidaysForYear } from "./businessDays";

describe("usHolidays via holidaysForYear", () => {
  it("places Thanksgiving on the fourth Thursday of November 2026", () => {
    const holidays = holidaysForYear("us", 2026);
    expect(holidays).toContainEqual({ date: "2026-11-26", name: "Thanksgiving Day" });
  });

  it("observes Independence Day on Friday 3 July 2026 because 4 July is a Saturday", () => {
    const holidays = holidaysForYear("us", 2026);
    expect(holidays).toContainEqual({ date: "2026-07-03", name: "Independence Day (observed)" });
    expect(holidays.map((h) => h.date)).not.toContain("2026-07-04");
  });

  it("observes Christmas on Friday 24 December 2021 because 25 December is a Saturday", () => {
    const holidays = holidaysForYear("us", 2021);
    expect(holidays).toContainEqual({ date: "2021-12-24", name: "Christmas Day (observed)" });
  });

  it("puts the observed New Year holiday for 2022 on 31 December 2021", () => {
    // 1 January 2022 is a Saturday, so the federal observed day is the
    // Friday before, which belongs to the previous calendar year.
    const holidays = holidaysForYear("us", 2022);
    expect(holidays).toContainEqual({ date: "2021-12-31", name: "New Year's Day (observed)" });
  });

  it("includes the Monday holidays and Juneteenth for 2026", () => {
    const dates = holidaysForYear("us", 2026).map((h) => h.date);
    expect(dates).toContain("2026-01-19"); // Martin Luther King Jr. Day
    expect(dates).toContain("2026-05-25"); // Memorial Day
    expect(dates).toContain("2026-06-19"); // Juneteenth, a Friday in 2026
    expect(dates).toContain("2026-09-07"); // Labor Day
    expect(dates).toHaveLength(11);
  });
});

describe("ukHolidays via holidaysForYear", () => {
  it("computes the Easter based holidays for 2026", () => {
    const holidays = holidaysForYear("uk", 2026);
    expect(holidays).toContainEqual({ date: "2026-04-03", name: "Good Friday" });
    expect(holidays).toContainEqual({ date: "2026-04-06", name: "Easter Monday" });
  });

  it("keeps Christmas Day on Friday 25 December 2026 and moves Boxing Day to Monday 28 December", () => {
    // 26 December 2026 is a Saturday, so Boxing Day gets a substitute
    // day on the Monday after.
    const holidays = holidaysForYear("uk", 2026);
    expect(holidays).toContainEqual({ date: "2026-12-25", name: "Christmas Day" });
    expect(holidays).toContainEqual({ date: "2026-12-28", name: "Boxing Day (substitute day)" });
    expect(holidays.map((h) => h.date)).not.toContain("2026-12-26");
  });

  it("moves Christmas Day to Tuesday 27 December 2022 because 25 December is a Sunday", () => {
    const holidays = holidaysForYear("uk", 2022);
    expect(holidays).toContainEqual({ date: "2022-12-27", name: "Christmas Day (substitute day)" });
    expect(holidays).toContainEqual({ date: "2022-12-26", name: "Boxing Day" });
  });

  it("includes the Monday bank holidays for 2026", () => {
    const dates = holidaysForYear("uk", 2026).map((h) => h.date);
    expect(dates).toContain("2026-05-04"); // Early May
    expect(dates).toContain("2026-05-25"); // Spring
    expect(dates).toContain("2026-08-31"); // Summer
    expect(dates).toHaveLength(8);
  });
});

describe("businessDaysBetween", () => {
  it("counts business and weekend days across January 2026 without a holiday calendar", () => {
    // The start date is never counted, so this covers 2 to 31 January:
    // 30 days holding 21 weekdays and 9 weekend days.
    const result = businessDaysBetween("2026-01-01", "2026-01-31");
    expect(result?.totalDays).toBe(30);
    expect(result?.weekendDays).toBe(9);
    expect(result?.holidayDays).toBe(0);
    expect(result?.businessDays).toBe(21);
    expect(result?.reversed).toBe(false);
  });

  it("removes Martin Luther King Jr. Day when the US calendar is on", () => {
    const result = businessDaysBetween("2026-01-01", "2026-01-31", "us");
    expect(result?.holidayDays).toBe(1);
    expect(result?.businessDays).toBe(20);
    expect(result?.holidays).toEqual([{ date: "2026-01-19", name: "Martin Luther King Jr. Day" }]);
  });

  it("splits the Christmas 2026 week differently for the US and UK calendars", () => {
    // 22 to 31 December 2026 holds 8 weekdays and 2 weekend days. The
    // US list removes only Christmas Day; the UK list also removes the
    // Boxing Day substitute on Monday 28 December.
    const us = businessDaysBetween("2026-12-21", "2026-12-31", "us");
    expect(us?.totalDays).toBe(10);
    expect(us?.weekendDays).toBe(2);
    expect(us?.holidayDays).toBe(1);
    expect(us?.businessDays).toBe(7);

    const uk = businessDaysBetween("2026-12-21", "2026-12-31", "uk");
    expect(uk?.holidayDays).toBe(2);
    expect(uk?.businessDays).toBe(6);
  });

  it("accepts reversed dates and flags them", () => {
    const result = businessDaysBetween("2026-01-31", "2026-01-01");
    expect(result?.reversed).toBe(true);
    expect(result?.businessDays).toBe(21);
    expect(result?.startDate).toBe("2026-01-01");
    expect(result?.endDate).toBe("2026-01-31");
  });

  it("returns zero for the same date twice", () => {
    const result = businessDaysBetween("2026-01-01", "2026-01-01", "us");
    expect(result?.totalDays).toBe(0);
    expect(result?.businessDays).toBe(0);
  });

  it("rejects invalid dates", () => {
    expect(businessDaysBetween("2026-02-30", "2026-03-01")).toBeNull();
    expect(businessDaysBetween("2026-01-01", "next Friday")).toBeNull();
  });
});

describe("addBusinessDays", () => {
  it("moves forward over a weekend", () => {
    // Friday 20 November 2026 plus one business day is Monday 23 November.
    expect(addBusinessDays("2026-11-20", 1)).toBe("2026-11-23");
  });

  it("skips Thanksgiving when the US calendar is on", () => {
    // Five business days from Friday 20 November 2026: without holidays
    // the fifth day is Friday 27 November. Thanksgiving on Thursday 26
    // pushes the landing to Monday 30 November.
    expect(addBusinessDays("2026-11-20", 5)).toBe("2026-11-27");
    expect(addBusinessDays("2026-11-20", 5, "us")).toBe("2026-11-30");
  });

  it("moves backward the same way", () => {
    // Five business days before Monday 15 June 2026 is Monday 8 June.
    expect(addBusinessDays("2026-06-15", -5)).toBe("2026-06-08");
  });

  it("returns the start date for a count of zero, even on a weekend", () => {
    expect(addBusinessDays("2026-11-21", 0, "us")).toBe("2026-11-21");
  });

  it("crosses the year boundary and skips New Year Day with the US calendar", () => {
    expect(addBusinessDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addBusinessDays("2026-12-31", 1, "us")).toBe("2027-01-04");
  });

  it("rejects invalid dates and counts", () => {
    expect(addBusinessDays("2026-02-30", 5)).toBeNull();
    expect(addBusinessDays("2026-01-01", 2.5)).toBeNull();
    expect(addBusinessDays("2026-01-01", 100_001)).toBeNull();
  });
});
