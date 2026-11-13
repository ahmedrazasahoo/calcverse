/**
 * Clock time and work hours logic, pure and framework free.
 *
 * Times are handled as minutes since midnight so overnight shifts and
 * break deductions stay simple and exact. A shift whose end time is
 * earlier than its start time is treated as running past midnight,
 * which is how night shifts are normally written.
 */

export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 1440;

export interface ClockTime {
  hours: number;
  minutes: number;
}

/** Parses a 24 hour clock time such as "17:30" or "9:05". */
export function parseClockTime(value: string): ClockTime | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

function toMinutes(t: ClockTime): number {
  return t.hours * MINUTES_PER_HOUR + t.minutes;
}

function fromMinutes(total: number): ClockTime {
  const wrapped = ((Math.trunc(total) % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return { hours: Math.floor(wrapped / MINUTES_PER_HOUR), minutes: wrapped % MINUTES_PER_HOUR };
}

/** Formats a parsed time back to a zero padded 24 hour string. */
export function toClockString(t: ClockTime): string {
  const hh = String(t.hours).padStart(2, "0");
  const mm = String(t.minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Formats a 24 hour time string as 12 hour with AM or PM. */
export function formatTime12h(value: string): string | null {
  const parsed = parseClockTime(value);
  if (!parsed) return null;
  const suffix = parsed.hours < 12 ? "AM" : "PM";
  const hour12 = parsed.hours % 12 === 0 ? 12 : parsed.hours % 12;
  const mm = String(parsed.minutes).padStart(2, "0");
  return `${hour12}:${mm} ${suffix}`;
}

/**
 * Minutes from a start time to an end time. When the end is earlier
 * than the start, the span is read as crossing midnight and 24 hours
 * are added. Equal times give zero, not a full day.
 */
export function minutesBetweenTimes(start: string, end: string): number | null {
  const s = parseClockTime(start);
  const e = parseClockTime(end);
  if (!s || !e) return null;
  let diff = toMinutes(e) - toMinutes(s);
  if (diff < 0) diff += MINUTES_PER_DAY;
  return diff;
}

/** Converts minutes to decimal hours, for example 90 minutes becomes 1.5. */
export function minutesToDecimalHours(minutes: number): number {
  return minutes / MINUTES_PER_HOUR;
}

/** Human label for a length of time, for example 510 becomes "8 h 30 min". */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes < 0) return "";
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const rest = Math.round(minutes % MINUTES_PER_HOUR);
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${rest} min`;
}

export interface WorkShift {
  grossMinutes: number;
  breakMinutes: number;
  netMinutes: number;
  decimalHours: number;
  durationLabel: string;
}

/**
 * A work shift with an unpaid break taken out. Break minutes cannot
 * exceed the length of the shift itself.
 */
export function workShift(start: string, end: string, breakMinutes: number): WorkShift | null {
  const gross = minutesBetweenTimes(start, end);
  if (gross === null) return null;
  if (!Number.isFinite(breakMinutes) || breakMinutes < 0 || breakMinutes > gross) return null;
  const net = gross - breakMinutes;
  return {
    grossMinutes: gross,
    breakMinutes,
    netMinutes: net,
    decimalHours: minutesToDecimalHours(net),
    durationLabel: formatDuration(net),
  };
}

export interface ShiftedTime {
  /** 24 hour time string after the shift. */
  time: string;
  /** How many midnights the shift crosses: 1 for next day, -1 for previous day. */
  dayOffset: number;
}

/** Moves a clock time by a signed number of minutes, reporting day changes. */
export function shiftClockTime(time: string, deltaMinutes: number): ShiftedTime | null {
  const parsed = parseClockTime(time);
  if (!parsed || !Number.isFinite(deltaMinutes)) return null;
  const total = toMinutes(parsed) + Math.trunc(deltaMinutes);
  const dayOffset = Math.floor(total / MINUTES_PER_DAY);
  return { time: toClockString(fromMinutes(total)), dayOffset };
}

/**
 * Total of several shifts at once, for a weekly time card.
 * Each entry takes the same start, end and break arguments as workShift.
 */
export function totalShiftMinutes(shifts: readonly { start: string; end: string; breakMinutes: number }[]): number | null {
  let total = 0;
  for (const shift of shifts) {
    const result = workShift(shift.start, shift.end, shift.breakMinutes);
    if (result === null) return null;
    total += result.netMinutes;
  }
  return total;
}
