/**
 * Business day counting and shifting logic, pure and framework free.
 *
 * A business day is a Monday to Friday that is not a public holiday in
 * the selected calendar. Two operations are offered: counting the
 * business days between two dates, and moving a given number of
 * business days forward or backward from a start date.
 *
 * Counting convention: the start date itself is never counted. The
 * count covers the days after the start date, up to and including the
 * end date, which matches how most "within N business days" promises
 * and deadline tools behave. Moving by zero business days returns the
 * start date unchanged, even when it falls on a weekend.
 *
 * Holiday calendars are computed from rules, not stored tables, so any
 * year works. The US set is the federal holiday list, including the
 * observed day shift when a fixed date holiday lands on a weekend. The
 * UK set is the England and Wales bank holiday list, including
 * substitute days and the Easter based holidays.
 */

const MS_PER_DAY = 86_400_000;

export interface DateParts {
  y: number;
  m: number; // 1 to 12
  d: number;
}

export type HolidayCalendar = "none" | "us" | "uk";

export interface Holiday {
  /** ISO date the holiday is observed on. Always a Monday to Friday. */
  date: string;
  name: string;
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

function shiftDays(p: DateParts, days: number): DateParts {
  return fromDayNumber(toDayNumber(p) + days);
}

/** Day of week for a day number: 0 is Sunday, 6 is Saturday. Day 0 (1970-01-01) was a Thursday. */
function dayOfWeek(dayNumber: number): number {
  return (((dayNumber + 4) % 7) + 7) % 7;
}

function isWeekendDay(dayNumber: number): boolean {
  const dow = dayOfWeek(dayNumber);
  return dow === 0 || dow === 6;
}

/** The nth given weekday of a month, for example the third Monday. */
function nthWeekdayOfMonth(y: number, m: number, dow: number, n: number): DateParts {
  const first = toDayNumber({ y, m, d: 1 });
  const offset = (dow - dayOfWeek(first) + 7) % 7;
  return fromDayNumber(first + offset + (n - 1) * 7);
}

/** The last given weekday of a month, for example the last Monday. */
function lastWeekdayOfMonth(y: number, m: number, dow: number): DateParts {
  const last = toDayNumber({ y, m, d: daysInMonth(y, m) });
  const offset = (dayOfWeek(last) - dow + 7) % 7;
  return fromDayNumber(last - offset);
}

/** Easter Sunday for a year, by the standard Gregorian computus. */
function easterSunday(y: number): DateParts {
  const a = y % 19;
  const b = Math.floor(y / 100);
  const c = y % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const mm = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * mm + 114) / 31);
  const day = ((h + l - 7 * mm + 114) % 31) + 1;
  return { y, m: month, d: day };
}

/**
 * A US fixed date holiday with the federal observed day shift: when
 * the date falls on a Saturday the holiday is observed on the Friday
 * before, and when it falls on a Sunday it is observed on the Monday
 * after. The returned date always sits in the week of the real date,
 * except New Year, whose observed day can land on 31 December of the
 * previous year.
 */
function usFixedHoliday(y: number, m: number, d: number, name: string): Holiday {
  const parts = { y, m, d };
  const dow = dayOfWeek(toDayNumber(parts));
  if (dow === 6) return { date: toIsoDate(shiftDays(parts, -1)), name: `${name} (observed)` };
  if (dow === 0) return { date: toIsoDate(shiftDays(parts, 1)), name: `${name} (observed)` };
  return { date: toIsoDate(parts), name };
}

/** The federal holidays of the United States for one year, on the dates they are observed. */
export function usHolidays(year: number): Holiday[] {
  const monday = 1;
  const thursday = 4;
  return [
    usFixedHoliday(year, 1, 1, "New Year's Day"),
    { date: toIsoDate(nthWeekdayOfMonth(year, 1, monday, 3)), name: "Martin Luther King Jr. Day" },
    { date: toIsoDate(nthWeekdayOfMonth(year, 2, monday, 3)), name: "Washington's Birthday" },
    { date: toIsoDate(lastWeekdayOfMonth(year, 5, monday)), name: "Memorial Day" },
    usFixedHoliday(year, 6, 19, "Juneteenth National Independence Day"),
    usFixedHoliday(year, 7, 4, "Independence Day"),
    { date: toIsoDate(nthWeekdayOfMonth(year, 9, monday, 1)), name: "Labor Day" },
    { date: toIsoDate(nthWeekdayOfMonth(year, 10, monday, 2)), name: "Columbus Day" },
    usFixedHoliday(year, 11, 11, "Veterans Day"),
    { date: toIsoDate(nthWeekdayOfMonth(year, 11, thursday, 4)), name: "Thanksgiving Day" },
    usFixedHoliday(year, 12, 25, "Christmas Day"),
  ];
}

/** A UK holiday whose substitute day moves it off a weekend, by the given shift in days. */
function ukSubstitute(y: number, m: number, d: number, name: string, saturdayShift: number, sundayShift: number): Holiday {
  const parts = { y, m, d };
  const dow = dayOfWeek(toDayNumber(parts));
  if (dow === 6) return { date: toIsoDate(shiftDays(parts, saturdayShift)), name: `${name} (substitute day)` };
  if (dow === 0) return { date: toIsoDate(shiftDays(parts, sundayShift)), name: `${name} (substitute day)` };
  return { date: toIsoDate(parts), name };
}

/** The bank holidays of England and Wales for one year, on the dates they are observed. */
export function ukHolidays(year: number): Holiday[] {
  const monday = 1;
  const easter = easterSunday(year);
  return [
    // New Year: Saturday moves to Monday 3 January, Sunday to Monday 2 January.
    ukSubstitute(year, 1, 1, "New Year's Day", 2, 1),
    { date: toIsoDate(shiftDays(easter, -2)), name: "Good Friday" },
    { date: toIsoDate(shiftDays(easter, 1)), name: "Easter Monday" },
    { date: toIsoDate(nthWeekdayOfMonth(year, 5, monday, 1)), name: "Early May bank holiday" },
    { date: toIsoDate(lastWeekdayOfMonth(year, 5, monday)), name: "Spring bank holiday" },
    { date: toIsoDate(lastWeekdayOfMonth(year, 8, monday)), name: "Summer bank holiday" },
    // Christmas Day: Saturday or Sunday both move to Monday or Tuesday 27 December.
    ukSubstitute(year, 12, 25, "Christmas Day", 2, 2),
    // Boxing Day: Saturday moves to Monday 28 December, Sunday to Tuesday 28 December.
    ukSubstitute(year, 12, 26, "Boxing Day", 2, 2),
  ];
}

/** All holidays of a rule based calendar for one year, on their observed dates. */
export function holidaysForYear(calendar: Exclude<HolidayCalendar, "none">, year: number): Holiday[] {
  return calendar === "us" ? usHolidays(year) : ukHolidays(year);
}

/**
 * Looks up the holiday name for a day number, or null. Years are
 * generated on demand around the requested day and cached, because an
 * observed New Year holiday can belong to the neighbouring year.
 */
function makeHolidayLookup(calendar: HolidayCalendar): (day: number) => string | null {
  if (calendar === "none") return () => null;
  const cache = new Map<number, Map<number, string>>();
  return (day: number) => {
    const year = fromDayNumber(day).y;
    let byDay = cache.get(year);
    if (!byDay) {
      byDay = new Map<number, string>();
      for (const y of [year - 1, year, year + 1]) {
        for (const holiday of holidaysForYear(calendar, y)) {
          const parts = parseIsoDate(holiday.date);
          if (parts) byDay.set(toDayNumber(parts), holiday.name);
        }
      }
      cache.set(year, byDay);
    }
    return byDay.get(day) ?? null;
  };
}

export interface BusinessDayCount {
  /** The earlier of the two dates, ISO format. */
  startDate: string;
  /** The later of the two dates, ISO format. */
  endDate: string;
  /** True when the caller gave the dates newest first; the counts still describe the same span. */
  reversed: boolean;
  /** Every calendar day after the start date, up to and including the end date. */
  totalDays: number;
  /** Saturdays and Sundays inside the counted span. */
  weekendDays: number;
  /** Weekday public holidays inside the counted span (zero without a calendar). */
  holidayDays: number;
  /** Monday to Friday days that are not public holidays. */
  businessDays: number;
  /** The holidays found inside the span, in date order. */
  holidays: Holiday[];
}

/**
 * Counts business days between two ISO dates under the counting
 * convention described at the top of this file, or null when either
 * date is invalid.
 */
export function businessDaysBetween(startIso: string, endIso: string, calendar: HolidayCalendar = "none"): BusinessDayCount | null {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  if (!start || !end) return null;

  const startDay = toDayNumber(start);
  const endDay = toDayNumber(end);
  const reversed = endDay < startDay;
  const from = Math.min(startDay, endDay);
  const to = Math.max(startDay, endDay);
  const holidayName = makeHolidayLookup(calendar);

  let weekendDays = 0;
  let businessDays = 0;
  const holidays: Holiday[] = [];
  for (let day = from + 1; day <= to; day += 1) {
    if (isWeekendDay(day)) {
      weekendDays += 1;
      continue;
    }
    const name = holidayName(day);
    if (name) {
      holidays.push({ date: toIsoDate(fromDayNumber(day)), name });
    } else {
      businessDays += 1;
    }
  }

  return {
    startDate: toIsoDate(fromDayNumber(from)),
    endDate: toIsoDate(fromDayNumber(to)),
    reversed,
    totalDays: to - from,
    weekendDays,
    holidayDays: holidays.length,
    businessDays,
    holidays,
  };
}

/**
 * Moves the given number of business days from an ISO date: positive
 * counts move forward, negative counts move backward. The start date
 * itself is never counted, so adding one business day to a Friday
 * lands on the following Monday (before holidays). Returns null for
 * an invalid date or a count that is not a whole number within range.
 */
export function addBusinessDays(startIso: string, count: number, calendar: HolidayCalendar = "none"): string | null {
  const start = parseIsoDate(startIso);
  if (!start) return null;
  if (!Number.isInteger(count) || Math.abs(count) > 100_000) return null;
  if (count === 0) return toIsoDate(start);

  const holidayName = makeHolidayLookup(calendar);
  const step = count > 0 ? 1 : -1;
  let remaining = Math.abs(count);
  let day = toDayNumber(start);
  while (remaining > 0) {
    day += step;
    if (!isWeekendDay(day) && !holidayName(day)) remaining -= 1;
  }
  return toIsoDate(fromDayNumber(day));
}
