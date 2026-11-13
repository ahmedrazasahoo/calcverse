/**
 * Date difference and date shifting logic, pure and framework free.
 *
 * Differences are reported three ways: a plain total of days, a
 * calendar style breakdown into years, months and days (the way people
 * describe ages and anniversaries), and a working days split that
 * counts weekdays and weekend days inside the span. The span runs from
 * the start date up to but not including the end date, matching how
 * most people count "days between" two dates.
 */

const MS_PER_DAY = 86_400_000;

export interface DateParts {
  y: number;
  m: number; // 1 to 12
  d: number;
}

export function daysInMonth(y: number, m: number): number {
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

export function toIsoDate(p: DateParts): string {
  const mm = String(p.m).padStart(2, "0");
  const dd = String(p.d).padStart(2, "0");
  return `${p.y}-${mm}-${dd}`;
}

/** Calendar breakdown from an earlier date to a later date. Assumes earlier is not after later. */
function diffYmd(earlier: DateParts, later: DateParts): { years: number; months: number; days: number } {
  let years = later.y - earlier.y;
  let months = later.m - earlier.m;
  let days = later.d - earlier.d;
  if (days < 0) {
    months -= 1;
    const prevMonth = later.m === 1 ? 12 : later.m - 1;
    const prevYear = later.m === 1 ? later.y - 1 : later.y;
    days += daysInMonth(prevYear, prevMonth);
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

/** Day of week for a day number: 0 is Sunday, 6 is Saturday. Day 0 (1970-01-01) was a Thursday. */
function dayOfWeek(dayNumber: number): number {
  return (((dayNumber + 4) % 7) + 7) % 7;
}

function countWeekdays(fromDay: number, totalDays: number): number {
  const fullWeeks = Math.floor(totalDays / 7);
  let weekdays = fullWeeks * 5;
  for (let i = 0; i < totalDays - fullWeeks * 7; i += 1) {
    const dow = dayOfWeek(fromDay + fullWeeks * 7 + i);
    if (dow >= 1 && dow <= 5) weekdays += 1;
  }
  return weekdays;
}

export interface DateDifference {
  /** The earlier of the two dates, ISO format. */
  startDate: string;
  /** The later of the two dates, ISO format. */
  endDate: string;
  /** True when the caller gave the dates newest first; results are still positive. */
  reversed: boolean;
  totalDays: number;
  years: number;
  months: number;
  days: number;
  /** Whole weeks inside the total, plus the leftover days. */
  fullWeeks: number;
  leftoverDays: number;
  /** Monday to Friday days inside the span. */
  weekdays: number;
  weekendDays: number;
}

/** Full difference between two ISO dates, or null when either date is invalid. */
export function dateDifference(startIso: string, endIso: string): DateDifference | null {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  if (!start || !end) return null;

  const startDay = toDayNumber(start);
  const endDay = toDayNumber(end);
  const reversed = endDay < startDay;
  const earlier = reversed ? end : start;
  const later = reversed ? start : end;
  const fromDay = Math.min(startDay, endDay);
  const totalDays = Math.abs(endDay - startDay);
  const ymd = diffYmd(earlier, later);
  const weekdays = countWeekdays(fromDay, totalDays);

  return {
    startDate: toIsoDate(earlier),
    endDate: toIsoDate(later),
    reversed,
    totalDays,
    years: ymd.years,
    months: ymd.months,
    days: ymd.days,
    fullWeeks: Math.floor(totalDays / 7),
    leftoverDays: totalDays % 7,
    weekdays,
    weekendDays: totalDays - weekdays,
  };
}

export interface DateDuration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
}

/** Adds whole months to a date, clamping the day to the end of a shorter month. */
function addMonthsClamped(p: DateParts, months: number): DateParts {
  const total = p.y * 12 + (p.m - 1) + months;
  const y = Math.floor(total / 12);
  const m = (total % 12) + 1;
  const d = Math.min(p.d, daysInMonth(y, m));
  return { y, m, d };
}

/**
 * Adds (or, with sign -1, subtracts) a duration of years, months, weeks
 * and days to an ISO date. Years and months are applied first with
 * end of month clamping, then weeks and days as plain days, which is
 * how people expect "one month after 31 January" to land on the last
 * day of February rather than spilling into March.
 */
export function addToDate(isoDate: string, duration: DateDuration, sign: 1 | -1 = 1): string | null {
  const parts = parseIsoDate(isoDate);
  if (!parts) return null;
  const years = duration.years ?? 0;
  const months = duration.months ?? 0;
  const weeks = duration.weeks ?? 0;
  const days = duration.days ?? 0;
  for (const value of [years, months, weeks, days]) {
    if (!Number.isFinite(value) || value < 0) return null;
  }
  const afterMonths = addMonthsClamped(parts, sign * (years * 12 + months));
  const dayShift = sign * (weeks * 7 + days);
  return toIsoDate(fromDayNumber(toDayNumber(afterMonths) + dayShift));
}
