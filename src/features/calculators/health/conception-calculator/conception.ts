/**
 * Conception date estimation logic, pure and framework free.
 *
 * Everything here works backwards from the standard pregnancy length:
 * 280 days from the last menstrual period (LMP) to the due date, with
 * conception estimated 14 days after the LMP on a typical 28 day cycle.
 * Counting back, conception is therefore the due date minus 266 days.
 * Real conception can only be pinned to a window, never a single day,
 * so every result carries a likely window of three days either side.
 * All dates are plain DateParts values and arithmetic is done in UTC.
 */

import { daysInMonth, toUtcMs, type DateParts } from "@/lib/dates";

export type { DateParts };

export type ConceptionMode = "due-date" | "birth-date" | "lmp";

export const GESTATION_FROM_LMP_DAYS = 280;
export const GESTATION_FROM_CONCEPTION_DAYS = 266;
export const LMP_TO_CONCEPTION_DAYS = 14;
export const WINDOW_HALF_DAYS = 3;

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

/** Formats date parts back to a YYYY-MM-DD string. */
export function toIso(p: DateParts): string {
  const mm = String(p.m).padStart(2, "0");
  const dd = String(p.d).padStart(2, "0");
  return `${p.y}-${mm}-${dd}`;
}

export interface ConceptionResult {
  mode: ConceptionMode;
  inputDate: DateParts;
  /** Most likely conception date, the centre of the window. */
  conceptionDate: DateParts;
  conceptionDateIso: string;
  /** Start of the likely window, conception minus 3 days. */
  windowStart: DateParts;
  windowStartIso: string;
  /** End of the likely window, conception plus 3 days. */
  windowEnd: DateParts;
  windowEndIso: string;
  /** Due date when known or worked out from the LMP. Null in birth date mode. */
  dueDate: DateParts | null;
  dueDateIso: string | null;
  /** Estimated first day of the last period. Present in due date and birth date modes. */
  lmpEstimate: DateParts | null;
  lmpEstimateIso: string | null;
}

/**
 * Estimates conception from one known date.
 *
 * due-date mode: conception = due date minus 266 days, and the LMP
 * estimate is the due date minus 280 days.
 * birth-date mode: the birth date stands in for the due date, so
 * conception = birth date minus 266 days. This assumes the baby was
 * born close to the due date, which is often not exactly true.
 * lmp mode: conception = LMP plus 14 days, due date = LMP plus 280 days.
 */
export function calculateConception(
  mode: ConceptionMode,
  date: DateParts,
): ConceptionResult {
  if (mode !== "due-date" && mode !== "birth-date" && mode !== "lmp") {
    throw new RangeError("Mode must be due-date, birth-date or lmp.");
  }
  assertValid(date, "Date");

  let conceptionDate: DateParts;
  let dueDate: DateParts | null = null;
  let lmpEstimate: DateParts | null = null;

  if (mode === "lmp") {
    conceptionDate = addDaysToParts(date, LMP_TO_CONCEPTION_DAYS);
    dueDate = addDaysToParts(date, GESTATION_FROM_LMP_DAYS);
  } else {
    // Both due date and birth date modes count back 266 days. In birth
    // date mode the birth date is treated as if it were the due date.
    conceptionDate = addDaysToParts(date, -GESTATION_FROM_CONCEPTION_DAYS);
    lmpEstimate = addDaysToParts(date, -GESTATION_FROM_LMP_DAYS);
    if (mode === "due-date") {
      dueDate = date;
    }
  }

  const windowStart = addDaysToParts(conceptionDate, -WINDOW_HALF_DAYS);
  const windowEnd = addDaysToParts(conceptionDate, WINDOW_HALF_DAYS);

  return {
    mode,
    inputDate: date,
    conceptionDate,
    conceptionDateIso: toIso(conceptionDate),
    windowStart,
    windowStartIso: toIso(windowStart),
    windowEnd,
    windowEndIso: toIso(windowEnd),
    dueDate,
    dueDateIso: dueDate ? toIso(dueDate) : null,
    lmpEstimate,
    lmpEstimateIso: lmpEstimate ? toIso(lmpEstimate) : null,
  };
}
