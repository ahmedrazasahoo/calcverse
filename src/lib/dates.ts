export interface DateParts {
  y: number;
  m: number; // 1 to 12
  d: number;
}

export function parseDateInput(value: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1) return null;
  // Reject impossible calendar dates such as 30 February or 31 April.
  if (d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

export function toUtcMs(p: DateParts): number {
  return Date.UTC(p.y, p.m - 1, p.d);
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export interface Ymd {
  years: number;
  months: number;
  days: number;
}

/** Difference from earlier to later date, expressed in years, months and days. Assumes earlier <= later. */
export function diffYmd(earlier: DateParts, later: DateParts): Ymd {
  let years = later.y - earlier.y;
  let months = later.m - earlier.m;
  let days = later.d - earlier.d;

  if (days < 0) {
    months -= 1;
    // Borrow the length of the month just before the later month.
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

export function totalDaysBetween(a: DateParts, b: DateParts): number {
  return Math.round(Math.abs(toUtcMs(b) - toUtcMs(a)) / 86400000);
}

export function formatParts(p: DateParts): string {
  const date = new Date(Date.UTC(p.y, p.m - 1, p.d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function todayParts(): DateParts {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

export function toInputValue(p: DateParts): string {
  const mm = String(p.m).padStart(2, "0");
  const dd = String(p.d).padStart(2, "0");
  return `${p.y}-${mm}-${dd}`;
}

export function ymdText(v: Ymd): string {
  const parts: string[] = [];
  if (v.years) parts.push(`${v.years} year${v.years === 1 ? "" : "s"}`);
  if (v.months) parts.push(`${v.months} month${v.months === 1 ? "" : "s"}`);
  if (v.days || parts.length === 0) parts.push(`${v.days} day${v.days === 1 ? "" : "s"}`);
  return parts.join(", ");
}
