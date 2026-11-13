/**
 * Pregnancy due date logic, pure and framework free.
 *
 * Method: Naegele's rule. A pregnancy is dated at 280 days (40 weeks)
 * from the first day of the last menstrual period, which is the same
 * as adding one year, subtracting three months and adding seven days.
 * Counted from conception, the length is 266 days (38 weeks), because
 * conception usually happens about 14 days after the last period.
 * Only about 1 in 20 babies arrive on the exact due date; the date is
 * the centre of a normal window of several weeks.
 */

export const GESTATION_FROM_LMP_DAYS = 280;
export const GESTATION_FROM_CONCEPTION_DAYS = 266;
export const DAYS_FROM_LMP_TO_CONCEPTION = 14;
export const DAYS_PER_WEEK = 7;
/** Gestational ages beyond this are not plausible; used as a sanity cap. */
export const MAX_GESTATION_DAYS = 320;

const MS_PER_DAY = 86_400_000;

interface DateParts {
  y: number;
  m: number;
  d: number;
}

function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Strictly parses an ISO date string (yyyy-mm-dd), rejecting impossible dates. */
export function parseIsoDate(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

function toDayNumber(p: DateParts): number {
  return Math.round(Date.UTC(p.y, p.m - 1, p.d) / MS_PER_DAY);
}

function fromDayNumber(dayNumber: number): DateParts {
  const date = new Date(dayNumber * MS_PER_DAY);
  return { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() };
}

function toIsoDate(p: DateParts): string {
  const mm = String(p.m).padStart(2, "0");
  const dd = String(p.d).padStart(2, "0");
  return `${p.y}-${mm}-${dd}`;
}

function addDays(isoDate: string, days: number): string | null {
  const parts = parseIsoDate(isoDate);
  if (!parts) return null;
  return toIsoDate(fromDayNumber(toDayNumber(parts) + days));
}

export interface DueDateFromLmp {
  lastPeriodDate: string;
  dueDate: string;
  /** Estimated conception date, usually about 14 days after the last period. */
  estimatedConceptionDate: string;
}

export interface DueDateFromConception {
  conceptionDate: string;
  dueDate: string;
  /** Estimated first day of the last period, about 14 days before conception. */
  estimatedLastPeriodDate: string;
}

/** Due date by Naegele's rule from the last period, or null for a bad date. */
export function dueDateFromLmp(lastPeriodIso: string): DueDateFromLmp | null {
  const dueDate = addDays(lastPeriodIso, GESTATION_FROM_LMP_DAYS);
  const estimatedConceptionDate = addDays(lastPeriodIso, DAYS_FROM_LMP_TO_CONCEPTION);
  if (!dueDate || !estimatedConceptionDate) return null;
  return { lastPeriodDate: lastPeriodIso, dueDate, estimatedConceptionDate };
}

/** Due date counted 266 days from conception, or null for a bad date. */
export function dueDateFromConception(conceptionIso: string): DueDateFromConception | null {
  const dueDate = addDays(conceptionIso, GESTATION_FROM_CONCEPTION_DAYS);
  const estimatedLastPeriodDate = addDays(conceptionIso, -DAYS_FROM_LMP_TO_CONCEPTION);
  if (!dueDate || !estimatedLastPeriodDate) return null;
  return { conceptionDate: conceptionIso, dueDate, estimatedLastPeriodDate };
}

export interface GestationalAge {
  weeks: number;
  days: number;
  totalDays: number;
}

/**
 * How far along a pregnancy is on a given date, counted from the last
 * period. Returns null when either date is invalid, the date is before
 * the last period, or the gap is implausibly long.
 */
export function gestationalAge(lastPeriodIso: string, onIso: string): GestationalAge | null {
  const lmp = parseIsoDate(lastPeriodIso);
  const on = parseIsoDate(onIso);
  if (!lmp || !on) return null;
  const totalDays = toDayNumber(on) - toDayNumber(lmp);
  if (totalDays < 0 || totalDays > MAX_GESTATION_DAYS) return null;
  return {
    weeks: Math.floor(totalDays / DAYS_PER_WEEK),
    days: totalDays % DAYS_PER_WEEK,
    totalDays,
  };
}
