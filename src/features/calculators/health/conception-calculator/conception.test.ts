import { describe, expect, it } from "vitest";
import { calculateConception } from "./conception";

// Formula: conception = due date minus 266 days, LMP = due date minus
// 280 days, and in LMP mode conception = LMP plus 14 days. The likely
// window is the conception date plus or minus 3 days (7 days wide).

describe("calculateConception in due-date mode", () => {
  it("counts back 266 days from the due date", () => {
    // 8 October 2026 minus 266 days is 15 January 2026.
    const result = calculateConception("due-date", { y: 2026, m: 10, d: 8 });
    expect(result.conceptionDateIso).toBe("2026-01-15");
    expect(result.lmpEstimateIso).toBe("2026-01-01");
    expect(result.dueDateIso).toBe("2026-10-08");
  });

  it("gives a likely window exactly 7 days wide", () => {
    const result = calculateConception("due-date", { y: 2026, m: 10, d: 8 });
    expect(result.windowStartIso).toBe("2026-01-12");
    expect(result.windowEndIso).toBe("2026-01-18");
  });
});

describe("calculateConception in lmp mode", () => {
  it("is the exact inverse of due-date mode", () => {
    // LMP 1 January 2026 gives conception 15 January 2026 and due date
    // 8 October 2026, matching the due-date example above.
    const result = calculateConception("lmp", { y: 2026, m: 1, d: 1 });
    expect(result.conceptionDateIso).toBe("2026-01-15");
    expect(result.dueDateIso).toBe("2026-10-08");
    expect(result.windowStartIso).toBe("2026-01-12");
    expect(result.windowEndIso).toBe("2026-01-18");
    expect(result.lmpEstimateIso).toBeNull();
  });

  it("round trips: feeding the lmp mode due date back gives the same conception", () => {
    const fromLmp = calculateConception("lmp", { y: 2025, m: 6, d: 20 });
    const fromDue = calculateConception("due-date", fromLmp.dueDate!);
    expect(fromDue.conceptionDateIso).toBe(fromLmp.conceptionDateIso);
    expect(fromDue.lmpEstimateIso).toBe("2025-06-20");
  });
});

describe("calculateConception in birth-date mode", () => {
  it("counts back 266 days from the birth date as an estimate", () => {
    const result = calculateConception("birth-date", { y: 2026, m: 10, d: 8 });
    expect(result.conceptionDateIso).toBe("2026-01-15");
    expect(result.lmpEstimateIso).toBe("2026-01-01");
    expect(result.dueDateIso).toBeNull();
  });
});

describe("calculateConception validation", () => {
  it("rejects impossible calendar dates", () => {
    expect(() =>
      calculateConception("due-date", { y: 2026, m: 4, d: 31 }),
    ).toThrow(RangeError);
    expect(() => calculateConception("lmp", { y: 2026, m: 0, d: 10 })).toThrow(
      RangeError,
    );
  });
});
