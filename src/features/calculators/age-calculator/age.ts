/**
 * Age calculation logic, built on the shared date helpers in src/lib/dates.
 * All dates are calendar dates with no time component, so results are
 * identical in every timezone.
 */
import {
  diffYmd,
  parseDateInput,
  toUtcMs,
  totalDaysBetween,
  type DateParts,
  type Ymd,
} from "@/lib/dates";

export interface AgeResult {
  age: Ymd;
  totalDays: number;
  totalWeeks: number;
  extraDays: number;
  nextBirthday: DateParts;
  daysToNextBirthday: number;
}

export type AgeOutcome =
  | { ok: true; result: AgeResult }
  | { ok: false; error: "invalid-date" | "target-before-birth" };

const DAYS_PER_WEEK = 7;

/**
 * Next yearly return of the birth month and day strictly after `at`.
 * A 29 February birthday is observed on 28 February in common years.
 */
export function nextBirthday(birth: DateParts, at: DateParts): DateParts {
  const candidate = (year: number): DateParts => {
    const lastDay = new Date(Date.UTC(year, birth.m, 0)).getUTCDate();
    return { y: year, m: birth.m, d: Math.min(birth.d, lastDay) };
  };
  const thisYear = candidate(at.y);
  if (toUtcMs(thisYear) > toUtcMs(at)) return thisYear;
  return candidate(at.y + 1);
}

/** Exact age of someone born on `dobValue`, measured at `targetValue`. Both are yyyy-mm-dd strings. */
export function calculateAge(dobValue: string, targetValue: string): AgeOutcome {
  const birth = parseDateInput(dobValue);
  const at = parseDateInput(targetValue);
  if (!birth || !at) return { ok: false, error: "invalid-date" };
  if (toUtcMs(at) < toUtcMs(birth)) return { ok: false, error: "target-before-birth" };

  const age = diffYmd(birth, at);
  const totalDays = totalDaysBetween(birth, at);
  const next = nextBirthday(birth, at);
  return {
    ok: true,
    result: {
      age,
      totalDays,
      totalWeeks: Math.floor(totalDays / DAYS_PER_WEEK),
      extraDays: totalDays % DAYS_PER_WEEK,
      nextBirthday: next,
      daysToNextBirthday: totalDaysBetween(at, next),
    },
  };
}
