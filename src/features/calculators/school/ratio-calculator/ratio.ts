/**
 * Ratio calculator logic, pure and framework free.
 *
 * Three jobs live here:
 *  - simplifyRatio: divide every part by the greatest common divisor
 *    of all parts. Decimal parts are first scaled by a power of ten
 *    (up to 10^4) until they are whole numbers.
 *  - scaleRatio: multiply every part by one factor so the parts either
 *    add up to a target total or the first part hits a target value.
 *  - solveMissing: in a : b = c : x, the missing value is x = b * c / a.
 */

export type ScaleMode = "total" | "firstPart";

export interface SimplifyRatioResult {
  simplified: number[];
  /** The same ratio rewritten so the first part is 1, rounded to 4 decimal places. */
  oneToN: number[];
  /** The divisor the parts were reduced by, on the scaled whole number version. */
  divisor: number;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x;
}

function gcdOfAll(values: number[]): number {
  return values.reduce((acc, value) => gcd(acc, value), 0);
}

function validateParts(parts: readonly number[], label: string): void {
  if (!Array.isArray(parts) || parts.length < 2 || parts.length > 3) {
    throw new RangeError(`${label} needs two or three parts.`);
  }
  for (const part of parts) {
    if (!Number.isFinite(part) || part <= 0) {
      throw new RangeError("Every part of a ratio must be a number greater than zero.");
    }
  }
}

function round4(value: number): number {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}

/** Finds the power of ten (0 to 4) that turns every part into a whole number. */
function scaleExponent(parts: readonly number[]): number {
  for (let k = 0; k <= 4; k += 1) {
    const factor = 10 ** k;
    const allWhole = parts.every(
      (part) => Math.abs(part * factor - Math.round(part * factor)) < 1e-9,
    );
    if (allWhole) return k;
  }
  return 4;
}

export function simplifyRatio(parts: readonly number[]): SimplifyRatioResult {
  validateParts(parts, "A ratio");
  const k = scaleExponent(parts);
  const factor = 10 ** k;
  const scaled = parts.map((part) => Math.round(part * factor));
  const divisor = gcdOfAll(scaled);
  const simplified = scaled.map((value) => value / divisor);
  const oneToN = parts.map((part) => round4(part / parts[0]));
  return { simplified, oneToN, divisor };
}

export function scaleRatio(
  parts: readonly number[],
  target: number,
  mode: ScaleMode,
): number[] {
  validateParts(parts, "A ratio");
  if (!Number.isFinite(target) || target <= 0) {
    throw new RangeError("The target must be a number greater than zero.");
  }
  if (mode !== "total" && mode !== "firstPart") {
    throw new RangeError("Choose whether to scale to a total or to a first part value.");
  }
  const factor =
    mode === "total"
      ? target / parts.reduce((sum, part) => sum + part, 0)
      : target / parts[0];
  return parts.map((part) => part * factor);
}

/** Solves a : b = c : x for x, which equals b times c divided by a. */
export function solveMissing(a: number, b: number, c: number): number {
  for (const value of [a, b, c]) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError("All three known values must be numbers greater than zero.");
    }
  }
  return (b * c) / a;
}
