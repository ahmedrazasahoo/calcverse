/**
 * Ovulation and fertile window logic, pure and framework free.
 *
 * Method: ovulation usually happens about 14 days before the next
 * period starts (the luteal phase is fairly constant), so the
 * ovulation day is the cycle length minus 14 days after the first day
 * of the last period. The fertile window runs from five days before
 * ovulation (how long sperm can survive) through one day after (how
 * long the egg survives). Real cycles vary; this is an estimate, not
 * a guarantee, and never a substitute for contraception.
 */

export const LUTEAL_PHASE_DAYS = 14;
export const FERTILE_DAYS_BEFORE_OVULATION = 5;
export const FERTILE_DAYS_AFTER_OVULATION = 1;
export const CYCLE_LENGTH_RANGE = { min: 21, max: 45 } as const;
export const DEFAULT_CYCLE_LENGTH = 28;

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

/** Formats date parts back to an ISO string (yyyy-mm-dd). */
export function toIsoDate(p: DateParts): string {
  const mm = String(p.m).padStart(2, "0");
  const dd = String(p.d).padStart(2, "0");
  return `${p.y}-${mm}-${dd}`;
}

/** Shifts an ISO date by a signed number of days, or returns null for bad input. */
export function addDays(isoDate: string, days: number): string | null {
  const parts = parseIsoDate(isoDate);
  if (!parts || !Number.isFinite(days)) return null;
  return toIsoDate(fromDayNumber(toDayNumber(parts) + Math.trunc(days)));
}

export interface OvulationResult {
  /** ISO date of the first day of the last period, echoed back. */
  lastPeriodDate: string;
  cycleLength: number;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  /** Most fertile two days: ovulation day and the day before it. */
  peakFertileStart: string;
  peakFertileEnd: string;
  nextPeriodDate: string;
  /** Estimated ovulation day of the cycle after this one. */
  followingOvulationDate: string;
}

/**
 * Estimates ovulation and the fertile window for one cycle,
 * or null when the date is invalid or the cycle length is outside
 * the supported range of 21 to 45 days.
 */
export function estimateOvulation(lastPeriodIso: string, cycleLength: number): OvulationResult | null {
  if (!parseIsoDate(lastPeriodIso)) return null;
  if (!Number.isInteger(cycleLength) || cycleLength < CYCLE_LENGTH_RANGE.min || cycleLength > CYCLE_LENGTH_RANGE.max) {
    return null;
  }
  const daysUntilOvulation = cycleLength - LUTEAL_PHASE_DAYS;
  const ovulationDate = addDays(lastPeriodIso, daysUntilOvulation);
  const fertileWindowStart = addDays(lastPeriodIso, daysUntilOvulation - FERTILE_DAYS_BEFORE_OVULATION);
  const fertileWindowEnd = addDays(lastPeriodIso, daysUntilOvulation + FERTILE_DAYS_AFTER_OVULATION);
  const peakFertileStart = addDays(lastPeriodIso, daysUntilOvulation - 1);
  const nextPeriodDate = addDays(lastPeriodIso, cycleLength);
  const followingOvulationDate = addDays(lastPeriodIso, cycleLength + daysUntilOvulation);
  if (!ovulationDate || !fertileWindowStart || !fertileWindowEnd || !peakFertileStart || !nextPeriodDate || !followingOvulationDate) {
    return null;
  }
  return {
    lastPeriodDate: lastPeriodIso,
    cycleLength,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    peakFertileStart,
    peakFertileEnd: ovulationDate,
    nextPeriodDate,
    followingOvulationDate,
  };
}
