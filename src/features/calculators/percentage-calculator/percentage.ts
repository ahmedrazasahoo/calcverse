/** Percentage logic for all three modes, pure and framework free. */

/** What is `percent` percent of `value`? */
export function percentOf(percent: number, value: number): number | null {
  if (!Number.isFinite(percent) || !Number.isFinite(value)) return null;
  return (percent / 100) * value;
}

/** `part` is what percent of `whole`? Returns null on division by zero. */
export function whatPercent(part: number, whole: number): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) return null;
  return (part / whole) * 100;
}

export type ChangeDirection = "increase" | "decrease" | "no-change";

export interface PercentageChange {
  /** Signed percentage change, positive for an increase. */
  change: number;
  direction: ChangeDirection;
}

/** Percentage change from `from` to `to`. Returns null when `from` is zero. */
export function percentageChange(from: number, to: number): PercentageChange | null {
  if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) return null;
  const change = ((to - from) / Math.abs(from)) * 100;
  const direction: ChangeDirection = change > 0 ? "increase" : change < 0 ? "decrease" : "no-change";
  return { change, direction };
}
