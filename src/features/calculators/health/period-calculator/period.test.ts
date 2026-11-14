import { describe, expect, it } from "vitest";
import { calculatePeriod } from "./period";
import { formatParts } from "@/lib/dates";

const base = {
  lastPeriod: { y: 2026, m: 1, d: 1 },
  cycleLength: 28,
  periodLength: 5,
  today: { y: 2026, m: 1, d: 10 },
};

describe("calculatePeriod", () => {
  it("predicts the next period 28 days after the last one", () => {
    const r = calculatePeriod(base);
    expect(r?.nextPeriods[0]).toEqual({ y: 2026, m: 1, d: 29 });
    expect(formatParts(r!.nextPeriods[0])).toBe("January 29, 2026");
  });
  it("predicts three period starts", () => {
    const r = calculatePeriod(base);
    expect(r?.nextPeriods).toEqual([
      { y: 2026, m: 1, d: 29 },
      { y: 2026, m: 2, d: 26 },
      { y: 2026, m: 3, d: 26 },
    ]);
  });
  it("estimates ovulation 14 days before the next period", () => {
    expect(calculatePeriod(base)?.ovulation).toEqual({ y: 2026, m: 1, d: 15 });
  });
  it("gives a fertile window from 5 days before to 1 day after ovulation", () => {
    const r = calculatePeriod(base);
    expect(r?.fertileStart).toEqual({ y: 2026, m: 1, d: 10 });
    expect(r?.fertileEnd).toEqual({ y: 2026, m: 1, d: 16 });
  });
  it("counts days until the next period from today", () => {
    expect(calculatePeriod(base)?.daysUntilNextPeriod).toBe(19);
  });
  it("ends the next period after the period length", () => {
    expect(calculatePeriod(base)?.nextPeriodEnd).toEqual({ y: 2026, m: 2, d: 2 });
  });
  it("rejects cycle lengths outside 21 to 45", () => {
    expect(calculatePeriod({ ...base, cycleLength: 20 })).toBeNull();
    expect(calculatePeriod({ ...base, cycleLength: 46 })).toBeNull();
  });
});
