import { toUtcMs, type DateParts } from "@/lib/dates";

export interface PeriodInput {
  lastPeriod: DateParts;
  cycleLength: number;
  periodLength: number;
  today: DateParts;
}

export interface PeriodResult {
  nextPeriods: DateParts[];
  nextPeriodEnd: DateParts;
  ovulation: DateParts;
  fertileStart: DateParts;
  fertileEnd: DateParts;
  daysUntilNextPeriod: number;
}

export function addDays(p: DateParts, days: number): DateParts {
  const d = new Date(toUtcMs(p) + days * 86400000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
}

export function signedDaysBetween(from: DateParts, to: DateParts): number {
  return Math.round((toUtcMs(to) - toUtcMs(from)) / 86400000);
}

/** Cycle estimates only. Returns null for out of range input. */
export function calculatePeriod(input: PeriodInput): PeriodResult | null {
  const { lastPeriod, cycleLength, periodLength, today } = input;
  if (!Number.isInteger(cycleLength) || cycleLength < 21 || cycleLength > 45) return null;
  if (!Number.isInteger(periodLength) || periodLength < 1 || periodLength > 14) return null;
  const nextPeriods = [1, 2, 3].map((i) => addDays(lastPeriod, cycleLength * i));
  const ovulation = addDays(lastPeriod, cycleLength - 14);
  return {
    nextPeriods,
    nextPeriodEnd: addDays(nextPeriods[0], periodLength - 1),
    ovulation,
    fertileStart: addDays(ovulation, -5),
    fertileEnd: addDays(ovulation, 1),
    daysUntilNextPeriod: signedDaysBetween(today, nextPeriods[0]),
  };
}
