/** Pure Unix epoch conversion helpers. No browser globals at import time. */

export type EpochUnit = "seconds" | "milliseconds" | "microseconds" | "nanoseconds";

export const EPOCH_UNITS: EpochUnit[] = ["seconds", "milliseconds", "microseconds", "nanoseconds"];

/** Divide an integer string by 10^power without floating point precision loss. */
function divideIntegerStringByPowerOfTen(text: string, power: number): number {
  const negative = text.startsWith("-");
  const digits = (negative ? text.slice(1) : text).replace(/^0+(?=\d)/, "");
  const padded = digits.padStart(power + 1, "0");
  const whole = padded.slice(0, padded.length - power);
  const frac = padded.slice(padded.length - power);
  return Number(`${negative ? "-" : ""}${whole}.${frac}`);
}

function isIntegerString(text: string): boolean {
  return /^-?\d+$/.test(text.trim());
}

/** Convert a timestamp value in the given unit to epoch milliseconds. */
export function toEpochMs(value: string | number, unit: EpochUnit): number {
  const text = typeof value === "number" ? String(value) : value.trim();
  switch (unit) {
    case "seconds":
      return Number(text) * 1000;
    case "milliseconds":
      return Number(text);
    case "microseconds":
      return isIntegerString(text) ? divideIntegerStringByPowerOfTen(text, 3) : Number(text) / 1000;
    case "nanoseconds":
      return isIntegerString(text)
        ? divideIntegerStringByPowerOfTen(text, 6)
        : Number(text) / 1_000_000;
  }
}

export interface EpochParts {
  iso: string;
  utc: string;
  seconds: number;
  milliseconds: number;
  microseconds: string;
  nanoseconds: string;
}

/** Break epoch milliseconds down into display strings and every common unit. */
export function fromEpochMs(ms: number): EpochParts {
  const date = new Date(ms);
  const wholeMs = BigInt(Math.trunc(ms));
  const fracMs = ms - Math.trunc(ms);
  const extraNs = BigInt(Math.round(fracMs * 1_000_000));
  return {
    iso: date.toISOString(),
    utc: date.toUTCString(),
    seconds: Math.trunc(ms / 1000),
    milliseconds: Math.trunc(ms),
    microseconds: (wholeMs * BigInt(1000) + extraNs / BigInt(1000)).toString(),
    nanoseconds: (wholeMs * BigInt(1000000) + extraNs).toString(),
  };
}

/** Guess the unit of a timestamp from the digit count of its integer text. */
export function detectUnit(digits: string): EpochUnit {
  const length = digits.trim().replace(/^-/, "").replace(/\D/g, "").length;
  if (length <= 10) return "seconds";
  if (length <= 13) return "milliseconds";
  if (length <= 16) return "microseconds";
  return "nanoseconds";
}
