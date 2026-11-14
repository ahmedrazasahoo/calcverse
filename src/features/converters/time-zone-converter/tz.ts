/**
 * Time zone conversion built on Intl.DateTimeFormat and IANA zone
 * names, so daylight saving rules come from the platform's own time
 * zone database and are always current.
 *
 * The core trick: Intl can format an instant in any zone, but it
 * cannot directly parse a wall clock time in a zone. So
 * convertWallTime guesses that the wall time is UTC, reads the zone
 * offset at that guess, derives the real instant, then refines once
 * with the offset at the derived instant, which also lands correctly
 * on days when the offset changes.
 */

export interface WallTime {
  y: number;
  mo: number;
  d: number;
  h: number;
  mi: number;
}

export interface ZonedWallTime extends WallTime {
  weekday: string;
}

const partsFormatter = (zone: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

/**
 * The offset of an IANA zone from UTC, in minutes, at a given instant
 * (for example -300 for New York in winter, -240 in summer).
 */
export function zoneOffsetMinutes(ianaZone: string, utcDate: Date): number {
  const parts = partsFormatter(ianaZone).formatToParts(utcDate);
  const values = new Map<string, string>();
  for (const part of parts) {
    if (part.type !== "literal") values.set(part.type, part.value);
  }
  const asUtc = Date.UTC(
    Number(values.get("year")),
    Number(values.get("month")) - 1,
    Number(values.get("day")),
    Number(values.get("hour")) % 24,
    Number(values.get("minute")),
    Number(values.get("second"))
  );
  const instantSeconds = Math.floor(utcDate.getTime() / 1000) * 1000;
  return Math.round((asUtc - instantSeconds) / 60000);
}

/** The wall clock reading of an instant in a zone, with its weekday. */
export function wallTimeInZone(ianaZone: string, utcDate: Date): ZonedWallTime {
  const parts = partsFormatter(ianaZone).formatToParts(utcDate);
  const values = new Map<string, string>();
  for (const part of parts) {
    if (part.type !== "literal") values.set(part.type, part.value);
  }
  return {
    y: Number(values.get("year")),
    mo: Number(values.get("month")),
    d: Number(values.get("day")),
    h: Number(values.get("hour")) % 24,
    mi: Number(values.get("minute")),
    weekday: values.get("weekday") ?? "",
  };
}

export interface ConversionResult {
  /** The exact instant the wall time refers to. */
  instant: Date;
  /** That instant read as a wall clock time in the target zone. */
  result: ZonedWallTime;
}

/**
 * Convert a wall clock time in one IANA zone into another zone, using
 * the guess and refine algorithm described at the top of this file.
 */
export function convertWallTime(wall: WallTime, fromZone: string, toZone: string): ConversionResult {
  const guessMs = Date.UTC(wall.y, wall.mo - 1, wall.d, wall.h, wall.mi);
  const firstOffset = zoneOffsetMinutes(fromZone, new Date(guessMs));
  let instantMs = guessMs - firstOffset * 60000;
  const refinedOffset = zoneOffsetMinutes(fromZone, new Date(instantMs));
  if (refinedOffset !== firstOffset) {
    instantMs = guessMs - refinedOffset * 60000;
  }
  const instant = new Date(instantMs);
  return { instant, result: wallTimeInZone(toZone, instant) };
}

/** Signed difference in minutes: the target zone's offset minus the
 *  source zone's offset, at the given instant. */
export function differenceMinutes(fromZone: string, toZone: string, date: Date): number {
  return zoneOffsetMinutes(toZone, date) - zoneOffsetMinutes(fromZone, date);
}

/** Format an offset difference the way people say it, for example
 *  "3 hours", "1 hour", "30 minutes" or "5 hours 30 minutes". */
export function formatDifference(totalMinutes: number): string {
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const hourText = hours === 1 ? "1 hour" : `${hours} hours`;
  if (minutes === 0) return hourText;
  const minuteText = minutes === 1 ? "1 minute" : `${minutes} minutes`;
  return hours === 0 ? minuteText : `${hourText} ${minuteText}`;
}

/**
 * Describe how the target zone compares with the source zone at an
 * instant: "3 hours behind", "5 hours ahead" or "the same time".
 * Behind means the target zone's clocks read earlier.
 */
export function differenceText(fromZone: string, toZone: string, date: Date): string {
  const diff = differenceMinutes(fromZone, toZone, date);
  if (diff === 0) return "the same time";
  return diff < 0 ? `${formatDifference(diff)} behind` : `${formatDifference(diff)} ahead`;
}

/** Format a wall time as "9:00 AM" or "5:30 PM". */
export function formatClock(wall: WallTime): string {
  const suffix = wall.h >= 12 ? "PM" : "AM";
  const hour12 = wall.h % 12 === 0 ? 12 : wall.h % 12;
  return `${hour12}:${String(wall.mi).padStart(2, "0")} ${suffix}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format a zoned wall time as "Thursday, January 15, 2026, 9:00 AM". */
export function formatZoned(zoned: ZonedWallTime): string {
  return `${zoned.weekday}, ${MONTH_NAMES[zoned.mo - 1]} ${zoned.d}, ${zoned.y}, ${formatClock(zoned)}`;
}

/**
 * Parse the value of a datetime-local input ("2026-01-15T12:00") into
 * a WallTime. Returns null for empty or malformed values.
 */
export function parseDateTimeLocal(value: string): WallTime | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value.trim());
  if (!match) return null;
  const wall: WallTime = {
    y: Number(match[1]),
    mo: Number(match[2]),
    d: Number(match[3]),
    h: Number(match[4]),
    mi: Number(match[5]),
  };
  if (wall.mo < 1 || wall.mo > 12 || wall.d < 1 || wall.d > 31 || wall.h > 23 || wall.mi > 59) {
    return null;
  }
  return wall;
}

/** Format a Date as a datetime-local input value in local time. */
export function toDateTimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
