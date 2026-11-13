/**
 * Number base and text conversion logic, pure and framework free.
 *
 * Integers are handled with BigInt, so long binary strings convert
 * exactly instead of losing precision past 15 or 16 digits the way
 * floating point numbers do. Only non negative integers are supported
 * in the base converter; a minus sign or a decimal point is rejected
 * with a clear null rather than a silent truncation.
 *
 * Text conversion works on UTF-8 bytes: each byte becomes one 8 bit
 * binary group, which covers accented letters and emoji as multi byte
 * sequences, not just plain ASCII.
 */

export type NumberBase = 2 | 8 | 10 | 16;

const DIGITS_BY_BASE: Record<NumberBase, RegExp> = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/,
};

const PREFIX_BY_BASE: Record<NumberBase, string> = {
  2: "0b",
  8: "0o",
  10: "",
  16: "0x",
};

export interface BaseConversions {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
  /** Number of binary digits, useful for bit width questions. */
  bitLength: number;
}

/**
 * Converts a non negative integer string between bases and returns
 * every representation at once. Accepts surrounding spaces and, for
 * readability, spaces inside the digits. Returns null when the string
 * contains a digit that does not belong to the source base.
 */
export function convertInteger(value: string, fromBase: NumberBase): BaseConversions | null {
  const cleaned = value.replace(/[\s_]/g, "");
  if (cleaned === "" || !DIGITS_BY_BASE[fromBase].test(cleaned)) return null;
  let parsed: bigint;
  try {
    parsed = BigInt(PREFIX_BY_BASE[fromBase] + cleaned);
  } catch {
    return null;
  }
  const binary = parsed.toString(2);
  return {
    binary,
    octal: parsed.toString(8),
    decimal: parsed.toString(10),
    hexadecimal: parsed.toString(16).toUpperCase(),
    bitLength: binary.length,
  };
}

/** Encodes text as space separated 8 bit binary groups, one per UTF-8 byte. */
export function textToBinary(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes, (byte) => byte.toString(2).padStart(8, "0")).join(" ");
}

/**
 * Decodes binary back to text. Groups may be space separated or one
 * continuous string whose length is a multiple of eight. Returns null
 * for invalid digits, bad group lengths or bytes that are not valid
 * UTF-8.
 */
export function binaryToText(binary: string): string | null {
  const trimmed = binary.trim();
  if (trimmed === "") return null;
  const groups = trimmed.includes(" ") ? trimmed.split(/\s+/) : null;
  const chunks: string[] = [];
  if (groups) {
    for (const group of groups) {
      if (!/^[01]{1,8}$/.test(group)) return null;
      chunks.push(group.padStart(8, "0"));
    }
  } else {
    if (!/^[01]+$/.test(trimmed) || trimmed.length % 8 !== 0) return null;
    for (let i = 0; i < trimmed.length; i += 8) {
      chunks.push(trimmed.slice(i, i + 8));
    }
  }
  const bytes = new Uint8Array(chunks.map((chunk) => parseInt(chunk, 2)));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
