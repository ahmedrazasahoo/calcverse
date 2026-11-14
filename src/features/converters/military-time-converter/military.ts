/**
 * Military time (24 hour clock) conversion logic, pure and framework free.
 *
 * Military time writes the hour and minute as four digits with no
 * colon and no AM or PM: 1430 means 2:30 PM. The spoken form reads
 * the time as two pairs. Whole hours are table driven from the hour
 * word list below, so 0900 is "zero nine hundred". When there are
 * minutes, each pair is read on its own: 1430 is "fourteen thirty"
 * and 0905 is "zero nine zero five". A trailing "hours" completes
 * the phrase, as in "fourteen thirty hours".
 *
 * Zulu time is simply military time stated for the UTC time zone,
 * used in aviation and the military so every base works from one
 * clock no matter where it sits on the map.
 */

export type AmPm = "AM" | "PM";

export interface Time12 {
  hour12: number;
  minute: number;
  ampm: AmPm;
  /** Display form such as "2:30 PM". */
  display: string;
}

export interface Time24 {
  hour24: number;
  minute: number;
  /** Four digit military form such as "1430 hours". */
  military: string;
  spoken: string;
}

export interface ChartRow {
  hour24: number;
  display12: string;
  military: string;
  spoken: string;
}

const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

const TENS = ["", "", "twenty", "thirty", "forty", "fifty"];

/** Word for a number from 0 to 59, for example 47 becomes "forty seven". */
export function numberWord(n: number): string {
  if (n < 0 || n > 59 || !Number.isInteger(n)) {
    throw new RangeError("Number word is only defined for whole numbers from 0 to 59.");
  }
  if (n < 20) return ONES[n];
  const ten = Math.floor(n / 10);
  const rest = n % 10;
  return rest === 0 ? TENS[ten] : `${TENS[ten]} ${ONES[rest]}`;
}

/** One spoken pair: values under ten gain a leading "zero", so 9 reads "zero nine". */
function pairWord(value: number): string {
  if (value < 10) return `zero ${ONES[value]}`;
  return numberWord(value);
}

function assertHourMinute(hour: number, minute: number, maxHour: number, label: string): void {
  if (!Number.isInteger(hour) || hour < 0 || hour > maxHour) {
    throw new RangeError(`${label} hour must be a whole number from 0 to ${maxHour}.`);
  }
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new RangeError("Minutes must be a whole number from 0 to 59.");
  }
}

/** Converts a 12 hour clock time to its 24 hour parts. */
export function to24(hour12: number, minute: number, ampm: AmPm): { hour24: number; minute: number } {
  if (!Number.isInteger(hour12) || hour12 < 1 || hour12 > 12) {
    throw new RangeError("12 hour clock hours run from 1 to 12.");
  }
  assertHourMinute(0, minute, 0, "24");
  let hour24: number;
  if (ampm === "AM") {
    hour24 = hour12 === 12 ? 0 : hour12;
  } else {
    hour24 = hour12 === 12 ? 12 : hour12 + 12;
  }
  return { hour24, minute };
}

/** Converts 24 hour parts to the 12 hour clock form. */
export function to12(hour24: number, minute: number): Time12 {
  assertHourMinute(hour24, minute, 23, "24");
  const ampm: AmPm = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const display = `${hour12}:${String(minute).padStart(2, "0")} ${ampm}`;
  return { hour12, minute, ampm, display };
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Four digit military form, for example "1430 hours" or "0900 hours". */
export function formatMilitary(hour24: number, minute: number): string {
  assertHourMinute(hour24, minute, 23, "24");
  return `${pad2(hour24)}${pad2(minute)} hours`;
}

/**
 * Spoken form. Whole hours use the hundred style from the table of
 * hour words: 0900 is "zero nine hundred hours", 1400 is "fourteen
 * hundred hours", and midnight 0000 is "zero hundred hours". With
 * minutes, both pairs are read digit pair style: 1430 is "fourteen
 * thirty hours" and 0905 is "zero nine zero five hours".
 */
export function spokenMilitary(hour24: number, minute: number): string {
  assertHourMinute(hour24, minute, 23, "24");
  if (minute === 0) {
    if (hour24 === 0) return "zero hundred hours";
    return `${pairWord(hour24)} hundred hours`;
  }
  return `${pairWord(hour24)} ${pairWord(minute)} hours`;
}

/** Full conversion from 24 hour parts: 12 hour display, military form and spoken form. */
export function describe24(hour24: number, minute: number): Time24 & { display12: string } {
  const t12 = to12(hour24, minute);
  return {
    hour24,
    minute,
    military: formatMilitary(hour24, minute),
    spoken: spokenMilitary(hour24, minute),
    display12: t12.display,
  };
}

/** Full conversion from 12 hour parts. */
export function describe12(hour12: number, minute: number, ampm: AmPm): Time24 & { display12: string } {
  const { hour24 } = to24(hour12, minute, ampm);
  return describe24(hour24, minute);
}

/** The 24 row reference chart, one row per hour on the hour. */
export function buildChart(): ChartRow[] {
  const rows: ChartRow[] = [];
  for (let h = 0; h < 24; h += 1) {
    rows.push({
      hour24: h,
      display12: to12(h, 0).display,
      military: formatMilitary(h, 0),
      spoken: spokenMilitary(h, 0),
    });
  }
  return rows;
}
