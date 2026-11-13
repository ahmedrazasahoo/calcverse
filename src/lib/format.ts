/** Shared number parsing and formatting helpers. */

/** Parse a user typed string into a finite number, or null when blank or invalid. */
export function parseNum(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Format a number with thousands separators and a fixed number of decimal places. */
export function fmt(n: number, digits = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Format a number as a plain currency style figure with two decimals, no symbol. */
export function fmtMoney(n: number): string {
  return fmt(n, 2);
}
