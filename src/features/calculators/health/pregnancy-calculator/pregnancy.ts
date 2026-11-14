/**
 * Pregnancy progress logic, pure and framework free.
 *
 * Dating uses the standard clinical convention: pregnancy is counted
 * from the first day of the last menstrual period (LMP). The estimated
 * due date is LMP plus 280 days (40 weeks), conception is estimated at
 * LMP plus 14 days, and trimesters run weeks 0 to 13, 14 to 27, and
 * 28 onwards. All dates are plain DateParts (YYYY-MM-DD) values and all
 * arithmetic is done in UTC so results never shift with time zones.
 * "Today" is passed in by the caller so tests stay deterministic.
 */

import { daysInMonth, toUtcMs, type DateParts } from "@/lib/dates";

export type { DateParts };

export const GESTATION_DAYS = 280;
export const CONCEPTION_OFFSET_DAYS = 14;
export const DAYS_PER_WEEK = 7;

const MS_PER_DAY = 86_400_000;

function isValidParts(p: DateParts): boolean {
  return (
    Number.isInteger(p.y) &&
    Number.isInteger(p.m) &&
    Number.isInteger(p.d) &&
    p.m >= 1 &&
    p.m <= 12 &&
    p.d >= 1 &&
    p.d <= daysInMonth(p.y, p.m)
  );
}

function assertValid(p: DateParts, label: string): void {
  if (!isValidParts(p)) {
    throw new RangeError(`${label} is not a valid calendar date.`);
  }
}

/** Shifts a date by a signed number of days, using UTC arithmetic. */
export function addDaysToParts(parts: DateParts, days: number): DateParts {
  assertValid(parts, "Date");
  if (!Number.isFinite(days)) {
    throw new RangeError("Days to add must be a finite number.");
  }
  const date = new Date(toUtcMs(parts) + Math.trunc(days) * MS_PER_DAY);
  return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() };
}

/** Signed whole days from a to b (positive when b is after a). */
export function daysBetween(a: DateParts, b: DateParts): number {
  return Math.round((toUtcMs(b) - toUtcMs(a)) / MS_PER_DAY);
}

/** Formats date parts back to a YYYY-MM-DD string. */
export function toIso(p: DateParts): string {
  const mm = String(p.m).padStart(2, "0");
  const dd = String(p.d).padStart(2, "0");
  return `${p.y}-${mm}-${dd}`;
}

export interface PregnancyMilestone {
  week: number;
  label: string;
  /** The date this milestone week starts, LMP plus week times 7 days. */
  date: DateParts;
  dateIso: string;
  /** True when today has reached this milestone date. */
  done: boolean;
}

export interface PregnancyResult {
  lmp: DateParts;
  today: DateParts;
  /** True when today is before the LMP, so the pregnancy has not started yet on paper. */
  notStarted: boolean;
  /** True when today is past the due date. */
  overdue: boolean;
  dueDate: DateParts;
  dueDateIso: string;
  conceptionEstimate: DateParts;
  conceptionEstimateIso: string;
  /** Whole days from the LMP to today. Negative when notStarted. */
  daysSinceLmp: number;
  gestationalWeeks: number;
  gestationalDays: number;
  /** 1 for weeks 0 to 13, 2 for 14 to 27, 3 for 28 and beyond. */
  trimester: 1 | 2 | 3;
  /** 280 minus daysSinceLmp. Negative when overdue. */
  daysRemaining: number;
  /** Share of the 280 days completed, clamped to 0 to 100. */
  progressPercent: number;
  milestones: PregnancyMilestone[];
}

const MILESTONE_DEFS: { week: number; label: string }[] = [
  { week: 4, label: "Missed period point, a home test usually turns positive around now" },
  { week: 8, label: "First prenatal visit and early dating scan window" },
  { week: 12, label: "End of the first trimester approaches, key screening scan window" },
  { week: 18, label: "Mid pregnancy anatomy scan window opens" },
  { week: 20, label: "Halfway point, anatomy scan is commonly done around now" },
  { week: 24, label: "Viability milestone, baby has a chance of survival if born early" },
  { week: 28, label: "Third trimester begins, growth checks become more frequent" },
  { week: 32, label: "Baby is gaining weight quickly and settling into position" },
  { week: 36, label: "Weekly checkups often start, full term is close" },
  { week: 40, label: "Due date week, the standard 280 day mark" },
];

export function calculatePregnancy(lmp: DateParts, today: DateParts): PregnancyResult {
  assertValid(lmp, "Last menstrual period");
  assertValid(today, "Today");

  const dueDate = addDaysToParts(lmp, GESTATION_DAYS);
  const conceptionEstimate = addDaysToParts(lmp, CONCEPTION_OFFSET_DAYS);
  const daysSinceLmp = daysBetween(lmp, today);
  const notStarted = daysSinceLmp < 0;

  const clampedDays = Math.max(0, daysSinceLmp);
  const gestationalWeeks = Math.floor(clampedDays / DAYS_PER_WEEK);
  const gestationalDays = clampedDays % DAYS_PER_WEEK;
  const trimester: 1 | 2 | 3 =
    gestationalWeeks <= 13 ? 1 : gestationalWeeks <= 27 ? 2 : 3;
  const daysRemaining = GESTATION_DAYS - daysSinceLmp;
  const overdue = daysRemaining < 0;
  const progressPercent = Math.min(
    100,
    Math.max(0, (daysSinceLmp / GESTATION_DAYS) * 100),
  );

  const milestones: PregnancyMilestone[] = MILESTONE_DEFS.map((def) => {
    const date = addDaysToParts(lmp, def.week * DAYS_PER_WEEK);
    return {
      week: def.week,
      label: def.label,
      date,
      dateIso: toIso(date),
      done: daysBetween(date, today) >= 0,
    };
  });

  return {
    lmp,
    today,
    notStarted,
    overdue,
    dueDate,
    dueDateIso: toIso(dueDate),
    conceptionEstimate,
    conceptionEstimateIso: toIso(conceptionEstimate),
    daysSinceLmp,
    gestationalWeeks,
    gestationalDays,
    trimester,
    daysRemaining,
    progressPercent: Math.round(progressPercent * 10) / 10,
    milestones,
  };
}
