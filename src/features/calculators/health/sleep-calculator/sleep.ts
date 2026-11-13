/**
 * Sleep cycle logic, pure and framework free.
 *
 * Method: sleep runs in cycles of roughly 90 minutes. Waking at the
 * end of a cycle usually feels easier than waking in the middle of
 * one, so suggested times count whole cycles. The calculation also
 * allows about 15 minutes to fall asleep, a commonly used average.
 * Five or six cycles (7.5 to 9 hours of sleep) suit most adults.
 */

export const SLEEP_CYCLE_MINUTES = 90;
export const FALL_ASLEEP_MINUTES = 15;
export const MINUTES_PER_DAY = 1440;
/** Cycle counts offered, longest first. Five and six are the healthy targets. */
export const CYCLE_OPTIONS: readonly number[] = [6, 5, 4, 3];
/** Cycle counts considered a full, healthy night for most adults. */
export const RECOMMENDED_CYCLES: readonly number[] = [6, 5];

export interface ClockTime {
  hours: number;
  minutes: number;
}

/** Parses a 24 hour clock time such as "07:00" or "7:05". */
export function parseClockTime(value: string): ClockTime | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

function toMinutes(t: ClockTime): number {
  return t.hours * 60 + t.minutes;
}

function fromMinutes(total: number): ClockTime {
  const wrapped = ((Math.trunc(total) % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return { hours: Math.floor(wrapped / 60), minutes: wrapped % 60 };
}

/** Formats a parsed time back to a zero padded 24 hour string. */
export function toClockString(t: ClockTime): string {
  const hh = String(t.hours).padStart(2, "0");
  const mm = String(t.minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Formats a 24 hour time string as 12 hour with AM or PM, for example "11:45 PM". */
export function formatTime12h(value: string): string | null {
  const parsed = parseClockTime(value);
  if (!parsed) return null;
  const suffix = parsed.hours < 12 ? "AM" : "PM";
  const hour12 = parsed.hours % 12 === 0 ? 12 : parsed.hours % 12;
  const mm = String(parsed.minutes).padStart(2, "0");
  return `${hour12}:${mm} ${suffix}`;
}

/** Human label for a sleep length, for example 450 becomes "7 h 30 min". */
export function formatSleepDuration(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return "";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

export interface SleepTimeOption {
  /** 24 hour time string, "HH:MM". */
  time: string;
  cycles: number;
  /** Actual sleep time, excluding the time taken to fall asleep. */
  sleepMinutes: number;
  sleepLabel: string;
  /** True for five and six cycle options, the targets for most adults. */
  recommended: boolean;
}

function buildOptions(anchorMinutes: number, direction: 1 | -1): SleepTimeOption[] {
  return CYCLE_OPTIONS.map((cycles) => {
    const sleepMinutes = cycles * SLEEP_CYCLE_MINUTES;
    const at = fromMinutes(anchorMinutes + direction * (FALL_ASLEEP_MINUTES + sleepMinutes));
    return {
      time: toClockString(at),
      cycles,
      sleepMinutes,
      sleepLabel: formatSleepDuration(sleepMinutes),
      recommended: RECOMMENDED_CYCLES.includes(cycles),
    };
  });
}

/**
 * Bedtimes that let someone wake up at the given time at the end of a
 * full sleep cycle. Returns null for an unparseable time.
 */
export function bedtimesForWakeUp(wakeTime: string): SleepTimeOption[] | null {
  const parsed = parseClockTime(wakeTime);
  if (!parsed) return null;
  return buildOptions(toMinutes(parsed), -1);
}

/**
 * Wake up times for someone who goes to bed at the given time, again
 * counting a fall asleep allowance and whole cycles.
 */
export function wakeTimesForBedtime(bedTime: string): SleepTimeOption[] | null {
  const parsed = parseClockTime(bedTime);
  if (!parsed) return null;
  return buildOptions(toMinutes(parsed), 1);
}
