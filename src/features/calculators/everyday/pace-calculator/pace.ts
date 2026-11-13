/**
 * Running pace logic, pure and framework free.
 *
 * Pace, time and distance form a triangle: give any two and the third
 * follows. Internally everything is seconds and a distance in the
 * caller's unit (kilometres or miles), so no rounding creeps in
 * between steps. A pace string such as "7:30" is read as minutes and
 * seconds per unit; a duration such as "1:45:30" is hours, minutes
 * and seconds, and "45:30" is minutes and seconds.
 */

export const KM_PER_MILE = 1.609344;
export const SECONDS_PER_HOUR = 3600;
export const SECONDS_PER_MINUTE = 60;

export type DistanceUnit = "km" | "mi";

const MAX_DISTANCE = 100_000;
const MAX_SECONDS = 100 * SECONDS_PER_HOUR;

function validPositive(value: number, max: number): boolean {
  return Number.isFinite(value) && value > 0 && value <= max;
}

/**
 * Parses a duration into seconds. Accepted shapes:
 * "1:45:30" (hours:minutes:seconds), "45:30" (minutes:seconds),
 * or a bare number, read as minutes.
 */
export function parseDurationToSeconds(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parts = trimmed.split(":");
  if (parts.length > 3) return null;
  const numbers = parts.map((part) => {
    if (!/^\d+(\.\d+)?$/.test(part)) return Number.NaN;
    return Number(part);
  });
  if (numbers.some((n) => !Number.isFinite(n))) return null;
  if (numbers.length === 1) return numbers[0] * SECONDS_PER_MINUTE;
  if (numbers.length === 2) {
    if (numbers[1] >= 60) return null;
    return numbers[0] * SECONDS_PER_MINUTE + numbers[1];
  }
  if (numbers[1] >= 60 || numbers[2] >= 60) return null;
  return numbers[0] * SECONDS_PER_HOUR + numbers[1] * SECONDS_PER_MINUTE + numbers[2];
}

/** Formats seconds as "1:45:30", or "45:30" when under an hour. */
export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "";
  const rounded = Math.round(totalSeconds);
  const hours = Math.floor(rounded / SECONDS_PER_HOUR);
  const minutes = Math.floor((rounded % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = rounded % SECONDS_PER_MINUTE;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`;
}

/** Formats a pace as "7:30 /km" or "7:30 /mi". */
export function formatPace(secondsPerUnit: number, unit: DistanceUnit): string {
  if (!Number.isFinite(secondsPerUnit) || secondsPerUnit <= 0) return "";
  return `${formatDuration(secondsPerUnit)} /${unit}`;
}

/** Seconds per unit of distance for a total time over a distance. */
export function paceSecondsPerUnit(totalSeconds: number, distance: number): number | null {
  if (!validPositive(totalSeconds, MAX_SECONDS)) return null;
  if (!validPositive(distance, MAX_DISTANCE)) return null;
  return totalSeconds / distance;
}

/** Total finish time in seconds for a pace over a distance. */
export function finishTimeSeconds(paceSeconds: number, distance: number): number | null {
  if (!validPositive(paceSeconds, MAX_SECONDS)) return null;
  if (!validPositive(distance, MAX_DISTANCE)) return null;
  return paceSeconds * distance;
}

/** Distance covered in a total time at a given pace. */
export function distanceFromTimeAndPace(totalSeconds: number, paceSeconds: number): number | null {
  if (!validPositive(totalSeconds, MAX_SECONDS)) return null;
  if (!validPositive(paceSeconds, MAX_SECONDS)) return null;
  return totalSeconds / paceSeconds;
}

/** Speed in the caller's unit per hour, handy for treadmill settings. */
export function speedPerHour(totalSeconds: number, distance: number): number | null {
  if (!validPositive(totalSeconds, MAX_SECONDS)) return null;
  if (!validPositive(distance, MAX_DISTANCE)) return null;
  return distance / (totalSeconds / SECONDS_PER_HOUR);
}

export interface PaceSolution {
  distance: number;
  totalSeconds: number;
  paceSecondsPerUnit: number;
  speedPerHour: number;
}

/**
 * Solves the pace triangle. Exactly one of the three inputs may be
 * omitted (or zero); the missing value is computed from the other two.
 */
export function solvePace(input: {
  distance?: number;
  totalSeconds?: number;
  paceSecondsPerUnit?: number;
}): PaceSolution | null {
  let { distance, totalSeconds, paceSecondsPerUnit: pace } = input;
  const missing = [distance, totalSeconds, pace].filter((v) => v === undefined || v === 0).length;
  if (missing !== 1) return null;

  if (distance === undefined || distance === 0) {
    if (!validPositive(totalSeconds ?? 0, MAX_SECONDS) || !validPositive(pace ?? 0, MAX_SECONDS)) return null;
    distance = (totalSeconds as number) / (pace as number);
  } else if (totalSeconds === undefined || totalSeconds === 0) {
    if (!validPositive(pace ?? 0, MAX_SECONDS) || !validPositive(distance, MAX_DISTANCE)) return null;
    totalSeconds = (pace as number) * distance;
  } else {
    if (!validPositive(totalSeconds, MAX_SECONDS) || !validPositive(distance, MAX_DISTANCE)) return null;
    pace = totalSeconds / distance;
  }

  if (!validPositive(distance, MAX_DISTANCE)) return null;
  if (totalSeconds === undefined || pace === undefined) return null;
  const speed = speedPerHour(totalSeconds, distance);
  if (speed === null) return null;
  return { distance, totalSeconds, paceSecondsPerUnit: pace, speedPerHour: speed };
}

/** Converts a distance between kilometres and miles. */
export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number {
  if (from === to) return value;
  return from === "km" ? value / KM_PER_MILE : value * KM_PER_MILE;
}

/** Common race distances in kilometres, offered as one tap presets. */
export const RACE_PRESETS: readonly { label: string; km: number }[] = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "Half marathon", km: 21.0975 },
  { label: "Marathon", km: 42.195 },
];
