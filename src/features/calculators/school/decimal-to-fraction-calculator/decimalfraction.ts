/**
 * Decimal to fraction logic, pure and framework free.
 *
 * Terminating decimals convert exactly: the digits after the point
 * become the numerator over a power of ten, then the fraction is
 * simplified with the greatest common divisor. Repeating or long
 * decimals use continued fractions to find the best rational
 * approximation whose denominator stays within a chosen limit, and
 * the convergents along the way are returned as plain language steps.
 * A carpenter helper rounds a decimal inch measurement to the
 * nearest fraction at 1/16, 1/32 or 1/64 precision.
 */

export interface FractionParts {
  n: number;
  d: number;
}

export interface MixedParts {
  whole: number;
  numerator: number;
  denominator: number;
}

export interface ParsedDecimal {
  negative: boolean;
  /** Digits before the point, as a string with no sign. */
  intPart: string;
  /** Digits after the point, empty when there is no point. */
  fracPart: string;
  value: number;
}

export interface ConversionResult {
  value: number;
  exact: FractionParts;
  mixed: MixedParts;
  fractionText: string;
  mixedText: string;
  approximation: FractionParts;
  approximationText: string;
  isExactWithinLimit: boolean;
  steps: string[];
}

export type InchPrecision = 16 | 32 | 64;

export interface InchFraction {
  precision: InchPrecision;
  whole: number;
  numerator: number;
  denominator: number;
  negative: boolean;
  text: string;
  error: number;
}

/** Greatest common divisor of two integers, always returned positive. */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

/** Simplifies a fraction and forces the denominator positive. */
export function simplify(n: number, d: number): FractionParts {
  if (d === 0) throw new RangeError("Denominator cannot be zero.");
  if (n === 0) return { n: 0, d: 1 };
  let num = n;
  let den = d;
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  return { n: num / g, d: den / g };
}

/**
 * Parses a decimal string such as "1.375", "-0.75", ".5" or "3".
 * Returns null when the text is not a plain decimal number.
 */
export function parseDecimalString(raw: string): ParsedDecimal | null {
  const text = raw.trim();
  if (text === "") return null;
  const match = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(text);
  if (!match) return null;
  const intDigits = match[2] ?? "";
  const fracDigits = match[3] ?? "";
  if (intDigits === "" && fracDigits === "") return null;
  const value = Number(text);
  if (!Number.isFinite(value)) return null;
  return {
    negative: match[1] === "-",
    intPart: intDigits === "" ? "0" : intDigits,
    fracPart: fracDigits,
    value,
  };
}

/** Exact conversion of a terminating decimal string to a simplified fraction. */
export function exactFraction(parsed: ParsedDecimal): FractionParts {
  const scale = parsed.fracPart.length;
  const digits = `${parsed.intPart}${parsed.fracPart}`.replace(/^0+(?=\d)/, "");
  let numerator = Number(digits === "" ? "0" : digits);
  if (parsed.negative) numerator = -numerator;
  const denominator = 10 ** scale;
  return simplify(numerator, denominator);
}

/** Converts a simplified fraction to mixed form. The sign sits on the whole part, or on the numerator when there is no whole part. */
export function toMixed(frac: FractionParts): MixedParts {
  const { n, d } = simplify(frac.n, frac.d);
  if (n === 0) return { whole: 0, numerator: 0, denominator: 1 };
  const absN = Math.abs(n);
  const wholeAbs = Math.floor(absN / d);
  const remainder = absN % d;
  if (wholeAbs > 0) {
    return { whole: n < 0 ? -wholeAbs : wholeAbs, numerator: remainder, denominator: d };
  }
  return { whole: 0, numerator: n < 0 ? -remainder : remainder, denominator: d };
}

export function formatFraction(frac: FractionParts): string {
  const { n, d } = simplify(frac.n, frac.d);
  return d === 1 ? String(n) : `${n}/${d}`;
}

export function formatMixed(mixed: MixedParts): string {
  if (mixed.numerator === 0) return String(mixed.whole);
  if (mixed.whole === 0) return `${mixed.numerator}/${mixed.denominator}`;
  const sign = mixed.whole < 0 ? "-" : "";
  return `${sign}${Math.abs(mixed.whole)} ${Math.abs(mixed.numerator)}/${mixed.denominator}`;
}

export interface ApproximationResult {
  fraction: FractionParts;
  steps: string[];
}

/**
 * Best rational approximation of a value with denominator at most
 * maxDenominator, found with continued fraction convergents.
 * Each convergent that improves the answer is recorded as a step.
 */
export function approximateFraction(value: number, maxDenominator: number): ApproximationResult {
  if (!Number.isFinite(value)) throw new RangeError("Value must be a finite number.");
  if (!Number.isInteger(maxDenominator) || maxDenominator < 1) {
    throw new RangeError("Max denominator must be a whole number of at least 1.");
  }
  const steps: string[] = [];
  const sign = value < 0 ? -1 : 1;
  let x = Math.abs(value);

  // Continued fraction terms.
  const terms: number[] = [];
  let rest = x;
  for (let i = 0; i < 64; i += 1) {
    const term = Math.floor(rest);
    terms.push(term);
    const frac = rest - term;
    if (frac < 1e-12) break;
    rest = 1 / frac;
    if (!Number.isFinite(rest)) break;
  }
  steps.push(`Continued fraction terms for ${Math.abs(value)}: ${terms.join(", ")}`);

  let prevN = 1;
  let prevD = 0;
  let currN = terms[0] ?? 0;
  let currD = 1;
  let best: FractionParts = { n: sign * currN, d: currD };
  steps.push(`First convergent: ${formatFraction(best)}`);

  for (let i = 1; i < terms.length; i += 1) {
    const nextN = terms[i] * currN + prevN;
    const nextD = terms[i] * currD + prevD;
    if (nextD > maxDenominator) {
      steps.push(
        `Next convergent ${nextN}/${nextD} passes the denominator limit of ${maxDenominator}, so we stop`,
      );
      break;
    }
    prevN = currN;
    prevD = currD;
    currN = nextN;
    currD = nextD;
    best = { n: sign * currN, d: currD };
    steps.push(`Convergent ${i + 1}: ${formatFraction(best)}`);
    if (Math.abs(currN / currD - x) < 1e-12) break;
  }

  const simplified = simplify(best.n, best.d);
  steps.push(
    `Best fraction with denominator at most ${maxDenominator}: ${formatFraction(simplified)}`,
  );
  return { fraction: simplified, steps };
}

/** Full conversion: exact fraction, mixed number and best approximation with steps. */
export function convertDecimal(raw: string, maxDenominator = 100): ConversionResult | null {
  const parsed = parseDecimalString(raw);
  if (!parsed) return null;
  const exact = exactFraction(parsed);
  const mixed = toMixed(exact);
  const approx = approximateFraction(parsed.value, maxDenominator);
  const isExactWithinLimit = exact.n === approx.fraction.n && exact.d === approx.fraction.d;

  const steps: string[] = [];
  const scale = parsed.fracPart.length;
  if (scale > 0) {
    const digits = `${parsed.intPart}${parsed.fracPart}`.replace(/^0+(?=\d)/, "");
    steps.push(
      `Write the decimal over a power of ten: ${raw.trim()} = ${parsed.negative ? "-" : ""}${digits === "" ? "0" : digits}/${10 ** scale}`,
    );
    const g = gcd(Number(digits === "" ? "0" : digits), 10 ** scale);
    if (g > 1) {
      steps.push(`Divide top and bottom by their greatest common divisor, ${g}`);
    } else {
      steps.push("Top and bottom share no common factor bigger than 1, so nothing cancels yet");
    }
  } else {
    steps.push(`${raw.trim()} is a whole number, so it sits over a denominator of 1`);
  }
  steps.push(`Simplified fraction: ${formatFraction(exact)}`);
  if (Math.abs(exact.n) >= exact.d && exact.d !== 1) {
    steps.push(`As a mixed number: ${formatMixed(mixed)}`);
  } else if (exact.d === 1) {
    steps.push(`The answer is the whole number ${exact.n}`);
  }
  if (!isExactWithinLimit) {
    steps.push(
      `The exact denominator ${exact.d} is above the limit of ${maxDenominator}, so the closest allowed fraction is ${formatFraction(approx.fraction)}`,
    );
    steps.push(...approx.steps);
  }

  return {
    value: parsed.value,
    exact,
    mixed,
    fractionText: formatFraction(exact),
    mixedText: formatMixed(mixed),
    approximation: approx.fraction,
    approximationText: formatFraction(approx.fraction),
    isExactWithinLimit,
    steps,
  };
}

/**
 * Nearest inch fraction at the chosen precision, using the carpenter
 * rule: measure the fractional part in units of 1/precision, round to
 * the nearest whole unit (halves round up), carry into the whole
 * inches when the fraction fills up, then simplify.
 */
export function nearestInchFraction(value: number, precision: InchPrecision): InchFraction {
  if (!Number.isFinite(value)) throw new RangeError("Value must be a finite number.");
  const negative = value < 0;
  const abs = Math.abs(value);
  let whole = Math.floor(abs);
  const fracPart = abs - whole;
  let units = Math.floor(fracPart * precision + 0.5);
  if (units >= precision) {
    whole += 1;
    units = 0;
  }
  const g = units === 0 ? precision : gcd(units, precision);
  const numerator = units === 0 ? 0 : units / g;
  const denominator = units === 0 ? 1 : precision / g;
  const approxValue = whole + (units === 0 ? 0 : units / precision);
  const sign = negative && (whole !== 0 || numerator !== 0) ? "-" : "";
  let text: string;
  if (numerator === 0) {
    text = `${sign}${whole} inches`;
  } else if (whole === 0) {
    text = `${sign}${numerator}/${denominator} inches`;
  } else {
    text = `${sign}${whole} ${numerator}/${denominator} inches`;
  }
  return {
    precision,
    whole: negative ? -whole : whole,
    numerator,
    denominator,
    negative,
    text,
    error: Math.abs(abs - approxValue),
  };
}

/** Inch fractions at all three standard tape precisions. */
export function inchFractionTable(value: number): InchFraction[] {
  return ([16, 32, 64] as InchPrecision[]).map((p) => nearestInchFraction(value, p));
}
