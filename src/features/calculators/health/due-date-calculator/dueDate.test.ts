import { describe, expect, it } from "vitest";
import { dueDateFromConception, dueDateFromLmp, gestationalAge } from "./dueDate";

describe("dueDateFromLmp (Naegele's rule)", () => {
  it("adds 280 days to the last period", () => {
    // 1 January 2026 plus 280 days is 8 October 2026.
    const result = dueDateFromLmp("2026-01-01");
    expect(result?.dueDate).toBe("2026-10-08");
    expect(result?.estimatedConceptionDate).toBe("2026-01-15");
  });

  it("handles a leap year start", () => {
    // 15 February 2024 plus 280 days is 21 November 2024.
    expect(dueDateFromLmp("2024-02-15")?.dueDate).toBe("2024-11-21");
  });

  it("rejects invalid dates", () => {
    expect(dueDateFromLmp("2026-02-30")).toBeNull();
    expect(dueDateFromLmp("")).toBeNull();
  });
});

describe("dueDateFromConception", () => {
  it("adds 266 days to the conception date", () => {
    // Matches the LMP example: conception 15 January 2026, due 8 October 2026.
    const result = dueDateFromConception("2026-01-15");
    expect(result?.dueDate).toBe("2026-10-08");
    expect(result?.estimatedLastPeriodDate).toBe("2026-01-01");
  });

  it("rejects invalid dates", () => {
    expect(dueDateFromConception("15-01-2026")).toBeNull();
  });
});

describe("gestationalAge", () => {
  it("counts whole weeks and spare days", () => {
    // 28 days after 1 January is exactly 4 weeks.
    expect(gestationalAge("2026-01-01", "2026-01-29")).toEqual({ weeks: 4, days: 0, totalDays: 28 });
    // 30 days is 4 weeks and 2 days.
    expect(gestationalAge("2026-01-01", "2026-01-31")).toEqual({ weeks: 4, days: 2, totalDays: 30 });
  });

  it("returns zero on the first day", () => {
    expect(gestationalAge("2026-01-01", "2026-01-01")).toEqual({ weeks: 0, days: 0, totalDays: 0 });
  });

  it("rejects dates before the last period and implausible gaps", () => {
    expect(gestationalAge("2026-01-10", "2026-01-01")).toBeNull();
    expect(gestationalAge("2026-01-01", "2027-06-01")).toBeNull();
    expect(gestationalAge("bad", "2026-01-01")).toBeNull();
  });
});
