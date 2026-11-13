import { describe, expect, it } from "vitest";
import { calculateAge, nextBirthday } from "./age";

describe("calculateAge", () => {
  it("computes an exact age with borrowing across months", () => {
    const outcome = calculateAge("1995-06-15", "2025-11-14");
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.age).toEqual({ years: 30, months: 4, days: 30 });
  });

  it("steps the year up exactly on the birthday", () => {
    const outcome = calculateAge("1995-06-15", "2025-06-15");
    if (!outcome.ok) throw new Error("expected ok");
    expect(outcome.result.age).toEqual({ years: 30, months: 0, days: 0 });
    expect(outcome.result.daysToNextBirthday).toBe(365);
  });

  it("counts leap days in the total days figure", () => {
    // 1 Jan 2000 to 1 Jan 2001 spans the leap day of 2000: 366 days.
    const outcome = calculateAge("2000-01-01", "2001-01-01");
    if (!outcome.ok) throw new Error("expected ok");
    expect(outcome.result.totalDays).toBe(366);
    expect(outcome.result.age).toEqual({ years: 1, months: 0, days: 0 });
  });

  it("handles a 29 February birthday in a common year", () => {
    const outcome = calculateAge("2000-02-29", "2023-02-28");
    if (!outcome.ok) throw new Error("expected ok");
    expect(outcome.result.age).toEqual({ years: 22, months: 11, days: 30 });
    // Observed on 28 February in common years, so the next birthday is 29 Feb 2024.
    expect(outcome.result.nextBirthday).toEqual({ y: 2024, m: 2, d: 29 });
  });

  it("rejects impossible calendar dates", () => {
    expect(calculateAge("2023-02-30", "2025-01-01").ok).toBe(false);
    expect(calculateAge("15-06-1995", "2025-01-01").ok).toBe(false);
    expect(calculateAge("", "2025-01-01").ok).toBe(false);
  });

  it("rejects a target date before the birth date", () => {
    const outcome = calculateAge("2000-01-01", "1999-01-01");
    expect(outcome).toEqual({ ok: false, error: "target-before-birth" });
  });

  it("reports zero age on the birth date itself", () => {
    const outcome = calculateAge("2024-05-05", "2024-05-05");
    if (!outcome.ok) throw new Error("expected ok");
    expect(outcome.result.age).toEqual({ years: 0, months: 0, days: 0 });
    expect(outcome.result.totalDays).toBe(0);
  });
});

describe("nextBirthday", () => {
  it("returns this year's birthday when it is still ahead", () => {
    expect(nextBirthday({ y: 1990, m: 12, d: 25 }, { y: 2025, m: 6, d: 1 })).toEqual({
      y: 2025,
      m: 12,
      d: 25,
    });
  });

  it("moves to next year once the day has passed", () => {
    expect(nextBirthday({ y: 1990, m: 1, d: 10 }, { y: 2025, m: 6, d: 1 })).toEqual({
      y: 2026,
      m: 1,
      d: 10,
    });
  });
});
