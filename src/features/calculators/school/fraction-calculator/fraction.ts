/**
 * Fraction arithmetic logic, pure and framework free.
 *
 * Inputs are mixed numbers written as a whole part plus a numerator
 * over a denominator, for example 1 1/2. Internally everything becomes
 * an improper fraction { n, d } with d always positive and the sign
 * carried on n. Results are simplified with the greatest common
 * divisor, converted back to mixed form, and also given as a decimal.
 * A steps list explains the working in plain words, the way it would
 * be shown in a school exercise book.
 */

export interface FractionInput {
  whole: number;
  numerator: number;
  denominator: number;
}

export interface ImproperFraction {
  n: number;
  d: number;
}

export interface MixedFraction {
  whole: number;
  numerator: number;
  denominator: number;
}

export type FractionOperation = "add" | "subtract" | "multiply" | "divide";

export interface FractionResult {
  /** Simplified improper fraction, d always positive. */
  improper: ImproperFraction;
  /** The same value in mixed form. Zero is whole 0, numerator 0, denominator 1. */
  mixed: MixedFraction;
  decimal: number;
  steps: string[];
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

/** Simplifies an improper fraction and forces the denominator positive. */
export function simplifyFraction(n: number, d: number): ImproperFraction {
  if (d === 0) {
    throw new RangeError("Denominator cannot be zero.");
  }
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

function assertInteger(value: number, label: string): void {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new RangeError(`${label} must be a whole number.`);
  }
}

/**
 * Converts a mixed number input to an improper fraction.
 * The sign comes from the whole part when there is one, otherwise from
 * the numerator and denominator together, so entering whole -1 with
 * numerator 1 and denominator 2 correctly means negative 1 1/2.
 */
export function toImproper(input: FractionInput): ImproperFraction {
  assertInteger(input.whole, "Whole part");
  assertInteger(input.numerator, "Numerator");
  assertInteger(input.denominator, "Denominator");
  if (input.denominator === 0) {
    throw new RangeError("Denominator cannot be zero.");
  }
  const d = Math.abs(input.denominator);
  const magnitude = Math.abs(input.whole) * d + Math.abs(input.numerator);
  let negative = false;
  if (input.whole !== 0) {
    negative = input.whole < 0;
  } else if (input.numerator !== 0) {
    negative = input.numerator * input.denominator < 0;
  }
  return simplifyFraction(negative ? -magnitude : magnitude, d);
}

/** Converts an improper fraction back to mixed form. */
export function toMixed(improper: ImproperFraction): MixedFraction {
  const { n, d } = simplifyFraction(improper.n, improper.d);
  if (n === 0) return { whole: 0, numerator: 0, denominator: 1 };
  const absN = Math.abs(n);
  const wholeAbs = Math.floor(absN / d);
  const remainder = absN % d;
  if (wholeAbs > 0) {
    return {
      whole: n < 0 ? -wholeAbs : wholeAbs,
      numerator: remainder,
      denominator: d,
    };
  }
  return { whole: 0, numerator: n < 0 ? -remainder : remainder, denominator: d };
}

/** Plain text for a mixed number, for example "2 1/6", "-1/2" or "3". */
export function formatMixed(mixed: MixedFraction): string {
  if (mixed.numerator === 0) return String(mixed.whole);
  if (mixed.whole === 0) return `${mixed.numerator}/${mixed.denominator}`;
  const sign = mixed.whole < 0 ? "-" : "";
  return `${sign}${Math.abs(mixed.whole)} ${Math.abs(mixed.numerator)}/${mixed.denominator}`;
}

/** Plain text for an improper fraction, for example "13/6" or "-3/2". */
export function formatImproper(improper: ImproperFraction): string {
  return improper.d === 1 ? String(improper.n) : `${improper.n}/${improper.d}`;
}

/** Plain text for a raw mixed input exactly as entered. */
function formatInput(input: FractionInput): string {
  if (input.numerator === 0) return String(input.whole);
  if (input.whole === 0) return `${input.numerator}/${input.denominator}`;
  const sign = input.whole < 0 ? "-" : "";
  return `${sign}${Math.abs(input.whole)} ${Math.abs(input.numerator)}/${Math.abs(input.denominator)}`;
}

const OP_WORDS: Record<FractionOperation, string> = {
  add: "Add",
  subtract: "Subtract",
  multiply: "Multiply",
  divide: "Divide",
};

export function calculateFraction(
  aInput: FractionInput,
  bInput: FractionInput,
  operation: FractionOperation,
): FractionResult {
  if (!(operation in OP_WORDS)) {
    throw new RangeError("Operation must be add, subtract, multiply or divide.");
  }
  const a = toImproper(aInput);
  const b = toImproper(bInput);
  if (operation === "divide" && b.n === 0) {
    throw new RangeError("Cannot divide by a fraction that equals zero.");
  }

  const steps: string[] = [];

  // Step 1: conversion, only worth narrating when a mixed number is present.
  if (aInput.whole !== 0 || bInput.whole !== 0) {
    steps.push(
      `Convert to improper fractions: ${formatInput(aInput)} = ${formatImproper(a)}, ${formatInput(bInput)} = ${formatImproper(b)}`,
    );
  }

  let rawN: number;
  let rawD: number;

  if (operation === "add" || operation === "subtract") {
    const verb = operation === "add" ? "Add" : "Subtract";
    if (a.d === b.d) {
      steps.push(`Both fractions already share the denominator ${a.d}`);
      rawN = operation === "add" ? a.n + b.n : a.n - b.n;
      rawD = a.d;
      steps.push(
        `${verb} the numerators and keep the denominator: ${formatImproper(a)} ${operation === "add" ? "+" : "-"} ${formatImproper(b)} = ${rawN}/${rawD}`,
      );
    } else {
      const common = (a.d * b.d) / gcd(a.d, b.d);
      const aScaled = { n: a.n * (common / a.d), d: common };
      const bScaled = { n: b.n * (common / b.d), d: common };
      steps.push(`Find a common denominator of ${common}`);
      steps.push(
        `Rewrite each fraction with that denominator: ${formatImproper(a)} = ${formatImproper(aScaled)} and ${formatImproper(b)} = ${formatImproper(bScaled)}`,
      );
      rawN = operation === "add" ? aScaled.n + bScaled.n : aScaled.n - bScaled.n;
      rawD = common;
      steps.push(
        `${verb} the numerators and keep the denominator: ${formatImproper(aScaled)} ${operation === "add" ? "+" : "-"} ${formatImproper(bScaled)} = ${rawN}/${rawD}`,
      );
    }
  } else if (operation === "multiply") {
    rawN = a.n * b.n;
    rawD = a.d * b.d;
    steps.push(`Multiply the numerators: ${a.n} x ${b.n} = ${rawN}`);
    steps.push(`Multiply the denominators: ${a.d} x ${b.d} = ${rawD}`);
    steps.push(`Put them together: ${formatImproper(a)} x ${formatImproper(b)} = ${rawN}/${rawD}`);
  } else {
    const reciprocal = simplifyFraction(b.d, b.n);
    steps.push(
      `Flip the second fraction and multiply: dividing by ${formatImproper(b)} is the same as multiplying by ${formatImproper(reciprocal)}`,
    );
    rawN = a.n * reciprocal.n;
    rawD = a.d * reciprocal.d;
    steps.push(
      `Multiply across: ${formatImproper(a)} x ${formatImproper(reciprocal)} = ${rawN}/${rawD}`,
    );
  }

  const improper = simplifyFraction(rawN, rawD);
  const divisor = gcd(rawN, rawD);
  if (divisor > 1) {
    steps.push(
      `Simplify by dividing top and bottom by ${divisor}: ${rawN}/${rawD} = ${formatImproper(improper)}`,
    );
  } else {
    steps.push(`${formatImproper(improper)} is already in its simplest form`);
  }

  const mixed = toMixed(improper);
  if (Math.abs(improper.n) >= improper.d && improper.n !== 0 && improper.d !== 1) {
    steps.push(`As a mixed number, ${formatImproper(improper)} = ${formatMixed(mixed)}`);
  } else if (improper.d === 1 && improper.n !== 0) {
    steps.push(`The answer is the whole number ${improper.n}`);
  }

  return {
    improper,
    mixed,
    decimal: improper.n / improper.d,
    steps,
  };
}
