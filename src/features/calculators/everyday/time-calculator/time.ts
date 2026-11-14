/**
 * Time duration logic, pure and framework free.
 *
 * Durations are plain objects with days, hours, minutes and seconds.
 * Everything is converted to total seconds for the maths, then normalised
 * back, so oversized parts like 90 minutes are handled cleanly.
 */

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeBetweenResult {
  /** Normalised gap between the two clock times. */
  duration: Duration;
  /** Total gap in seconds, handy for further maths. */
  totalSeconds: number;
  /** True when the end time was read as falling on the next day. */
  overnight: boolean;
}

function validateDuration(d: Duration, label: string): void {
  const parts: Array<[string, number]> = [
    ["days", d.days],
    ["hours", d.hours],
    ["minutes", d.minutes],
    ["seconds", d.seconds],
  ];
  for (const [name, value] of parts) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`${label} ${name} must be zero or greater.`);
    }
  }
}

/** Total seconds in a duration. Parts may exceed their usual limits. */
export function toSeconds(d: Duration): number {
  validateDuration(d, "Duration");
  return d.days * 86400 + d.hours * 3600 + d.minutes * 60 + d.seconds;
}

/** Build a normalised duration from a total number of seconds. */
export function fromSeconds(total: number): Duration {
  if (!Number.isFinite(total) || total < 0) {
    throw new RangeError("Total seconds must be zero or greater.");
  }
  let remaining = Math.floor(total);
  const days = Math.floor(remaining / 86400);
  remaining -= days * 86400;
  const hours = Math.floor(remaining / 3600);
  remaining -= hours * 3600;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining - minutes * 60;
  return { days, hours, minutes, seconds };
}

/** Return a duration normalised so minutes and seconds sit below 60. */
export function normaliseDuration(d: Duration): Duration {
  return fromSeconds(toSeconds(d));
}

export function addDurations(a: Duration, b: Duration): Duration {
  return fromSeconds(toSeconds(a) + toSeconds(b));
}

export function subtractDurations(a: Duration, b: Duration): Duration {
  const aSeconds = toSeconds(a);
  const bSeconds = toSeconds(b);
  if (bSeconds > aSeconds) {
    throw new RangeError("Cannot subtract a longer duration from a shorter one.");
  }
  return fromSeconds(aSeconds - bSeconds);
}

function parseClockTime(value: string, label: string): number {
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!match) {
    throw new RangeError(`${label} time must look like HH:MM or HH:MM:SS.`);
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = match[3] === undefined ? 0 : Number(match[3]);
  if (hours > 23 || minutes > 59 || seconds > 59) {
    throw new RangeError(`${label} time is outside the range of a single day.`);
  }
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Gap between two clock times on the same day. When the end is earlier
 * than the start, the end is treated as falling on the next day.
 */
export function durationBetweenTimes(start: string, end: string): TimeBetweenResult {
  const startSeconds = parseClockTime(start, "Start");
  const endSeconds = parseClockTime(end, "End");
  const overnight = endSeconds < startSeconds;
  const totalSeconds = overnight ? endSeconds + 86400 - startSeconds : endSeconds - startSeconds;
  return {
    duration: fromSeconds(totalSeconds),
    totalSeconds,
    overnight,
  };
}

function part(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

/** Plain text label like "2 days, 3 hours, 15 minutes, 10 seconds". */
export function formatDuration(d: Duration): string {
  const n = normaliseDuration(d);
  const pieces: string[] = [];
  if (n.days > 0) pieces.push(part(n.days, "day", "days"));
  if (n.hours > 0) pieces.push(part(n.hours, "hour", "hours"));
  if (n.minutes > 0) pieces.push(part(n.minutes, "minute", "minutes"));
  if (n.seconds > 0) pieces.push(part(n.seconds, "second", "seconds"));
  return pieces.length > 0 ? pieces.join(", ") : "0 seconds";
}
