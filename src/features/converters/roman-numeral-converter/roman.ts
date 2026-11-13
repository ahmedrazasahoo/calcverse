/**
 * Roman numeral logic, pure and framework free.
 *
 * Standard subtractive notation covers 1 to 3999: I, V, X, L, C, D, M
 * with IV, IX, XL, XC, CD and CM for the fours and nines. There is no
 * zero and no standard form for 4000 and above (that needs a bar over
 * the numeral), so those values are rejected rather than improvised.
 * Parsing is strict: a string only counts if it is exactly the
 * canonical form of its value, which rejects IIII, IC, VV and friends.
 */

export const ROMAN_MIN = 1;
export const ROMAN_MAX = 3999;

const ROMAN_TABLE: readonly { value: number; symbol: string }[] = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

const SYMBOL_VALUES: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/** Converts an integer from 1 to 3999 to a Roman numeral, or null when out of range. */
export function toRoman(value: number): string | null {
  if (!Number.isInteger(value) || value < ROMAN_MIN || value > ROMAN_MAX) return null;
  let remaining = value;
  let out = "";
  for (const entry of ROMAN_TABLE) {
    while (remaining >= entry.value) {
      out += entry.symbol;
      remaining -= entry.value;
    }
  }
  return out;
}

/**
 * Parses a Roman numeral in strict canonical form, case insensitive.
 * Returns null for invalid characters, impossible sequences and
 * non canonical forms such as IIII (4) or IC (99).
 */
export function fromRoman(numeral: string): number | null {
  const normalized = numeral.trim().toUpperCase();
  if (normalized === "" || normalized.length > 15) return null;
  if (!/^[IVXLCDM]+$/.test(normalized)) return null;

  let total = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    const current = SYMBOL_VALUES[normalized[i]];
    const next = i + 1 < normalized.length ? SYMBOL_VALUES[normalized[i + 1]] : 0;
    total += current < next ? -current : current;
  }
  if (total < ROMAN_MIN || total > ROMAN_MAX) return null;
  // Strictness check: the canonical form of the parsed value must be
  // exactly the input, which rules out every non standard spelling.
  return toRoman(total) === normalized ? total : null;
}

export interface RomanDate {
  day: string;
  month: string;
  year: string;
  /** The three parts joined with dots, the style used for tattoos and jewellery. */
  combined: string;
}

/**
 * Converts an ISO date (yyyy-mm-dd) into Roman numeral parts.
 * Returns null for invalid dates and for years above 3999.
 */
export function romanDate(isoDate: string): RomanDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day > daysInMonth) return null;
  const dayRoman = toRoman(day);
  const monthRoman = toRoman(month);
  const yearRoman = toRoman(year);
  if (!dayRoman || !monthRoman || !yearRoman) return null;
  return {
    day: dayRoman,
    month: monthRoman,
    year: yearRoman,
    combined: `${dayRoman}.${monthRoman}.${yearRoman}`,
  };
}
