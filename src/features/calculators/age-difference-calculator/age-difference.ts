/** Age difference logic, built on the shared date helpers in src/lib/dates. */
import {
  diffYmd,
  parseDateInput,
  toUtcMs,
  totalDaysBetween,
  type DateParts,
  type Ymd,
} from "@/lib/dates";

export interface AgeDifferenceResult {
  diff: Ymd;
  totalDays: number;
  earlier: DateParts;
  later: DateParts;
  sameDay: boolean;
}

/** Exact gap between two yyyy-mm-dd birth dates. Order does not matter. Null on invalid dates. */
export function calculateAgeDifference(firstValue: string, secondValue: string): AgeDifferenceResult | null {
  const a = parseDateInput(firstValue);
  const b = parseDateInput(secondValue);
  if (!a || !b) return null;
  const aFirst = toUtcMs(a) <= toUtcMs(b);
  const earlier = aFirst ? a : b;
  const later = aFirst ? b : a;
  const totalDays = totalDaysBetween(a, b);
  return {
    diff: diffYmd(earlier, later),
    totalDays,
    earlier,
    later,
    sameDay: totalDays === 0,
  };
}
