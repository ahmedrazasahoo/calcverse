import { describe, expect, it } from "vitest";
import { calculatePregnancy } from "./pregnancy";

// Formula: due date = LMP + 280 days, conception = LMP + 14 days,
// gestational age = floor(days since LMP / 7) weeks plus remainder days.

describe("calculatePregnancy", () => {
  it("adds 280 days for the due date and 14 days for conception", () => {
    // 1 January 2026 plus 280 days is 8 October 2026.
    const result = calculatePregnancy(
      { y: 2026, m: 1, d: 1 },
      { y: 2026, m: 1, d: 1 },
    );
    expect(result.dueDateIso).toBe("2026-10-08");
    expect(result.conceptionEstimateIso).toBe("2026-01-15");
    expect(result.daysRemaining).toBe(280);
    expect(result.progressPercent).toBe(0);
  });

  it("gives 10 weeks 0 days exactly 70 days after the LMP", () => {
    // 1 January 2026 plus 70 days is 12 March 2026, and 70 / 7 = 10 weeks.
    const result = calculatePregnancy(
      { y: 2026, m: 1, d: 1 },
      { y: 2026, m: 3, d: 12 },
    );
    expect(result.daysSinceLmp).toBe(70);
    expect(result.gestationalWeeks).toBe(10);
    expect(result.gestationalDays).toBe(0);
    expect(result.trimester).toBe(1);
    expect(result.daysRemaining).toBe(210);
    expect(result.progressPercent).toBe(25);
    expect(result.notStarted).toBe(false);
    expect(result.overdue).toBe(false);
  });

  it("respects trimester boundaries at weeks 13, 14, 27 and 28", () => {
    const lmp = { y: 2026, m: 1, d: 1 };
    // Week 13 day 6 is day 97 and still trimester 1. Day 98 starts week 14.
    expect(
      calculatePregnancy(lmp, { y: 2026, m: 4, d: 8 }).trimester,
    ).toBe(1);
    expect(
      calculatePregnancy(lmp, { y: 2026, m: 4, d: 9 }).trimester,
    ).toBe(2);
    // Week 27 ends on day 195 (trimester 2). Day 196 starts week 28 (trimester 3).
    expect(
      calculatePregnancy(lmp, { y: 2026, m: 7, d: 15 }).trimester,
    ).toBe(2);
    expect(
      calculatePregnancy(lmp, { y: 2026, m: 7, d: 16 }).trimester,
    ).toBe(3);
  });

  it("flags an overdue pregnancy past day 280", () => {
    // Due date is 8 October 2026. Ten days later is 18 October 2026.
    const result = calculatePregnancy(
      { y: 2026, m: 1, d: 1 },
      { y: 2026, m: 10, d: 18 },
    );
    expect(result.daysSinceLmp).toBe(290);
    expect(result.daysRemaining).toBe(-10);
    expect(result.overdue).toBe(true);
    expect(result.progressPercent).toBe(100);
    expect(result.trimester).toBe(3);
  });

  it("returns a notStarted result instead of throwing when today is before the LMP", () => {
    const result = calculatePregnancy(
      { y: 2026, m: 6, d: 1 },
      { y: 2026, m: 5, d: 20 },
    );
    expect(result.notStarted).toBe(true);
    expect(result.gestationalWeeks).toBe(0);
    expect(result.gestationalDays).toBe(0);
    expect(result.progressPercent).toBe(0);
    expect(result.dueDateIso).toBe("2027-03-08");
  });

  it("builds dated milestones with done flags relative to today", () => {
    const result = calculatePregnancy(
      { y: 2026, m: 1, d: 1 },
      { y: 2026, m: 3, d: 12 },
    );
    expect(result.milestones).toHaveLength(10);
    // Week 4 falls on LMP plus 28 days, which is 29 January 2026, already passed.
    expect(result.milestones[0]).toMatchObject({
      week: 4,
      dateIso: "2026-01-29",
      done: true,
    });
    // Week 40 is the due date itself, 8 October 2026, still ahead.
    expect(result.milestones[9]).toMatchObject({
      week: 40,
      dateIso: "2026-10-08",
      done: false,
    });
  });

  it("rejects impossible calendar dates", () => {
    expect(() =>
      calculatePregnancy({ y: 2026, m: 2, d: 30 }, { y: 2026, m: 3, d: 1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculatePregnancy({ y: 2026, m: 1, d: 1 }, { y: 2026, m: 13, d: 1 }),
    ).toThrow(RangeError);
  });
});
