/**
 * Hand rolled 1D barcode encoders. Every encoder returns an array of
 * alternating bar and space widths (starting with a bar) plus the human
 * readable text that belongs under the bars. No library code.
 */

export type BarcodeFormat = "code39" | "ean13" | "upca" | "code128";

export interface BarcodeResult {
  widths: number[];
  text: string;
}

/** Run length encode a module string of 1 (bar) and 0 (space) into widths. */
function widthsFromModules(modules: string): number[] {
  const widths: number[] = [];
  let run = 1;
  for (let i = 1; i <= modules.length; i++) {
    if (modules[i] === modules[i - 1]) run++;
    else {
      widths.push(run);
      run = 1;
    }
  }
  return widths;
}

/* ---------------- Code 39 ---------------- */

/** Characters in checksum value order (index = mod 43 value). */
export const CODE39_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%";

/** 15 module patterns (narrow = 1 module, wide = 3), in CODE39_CHARS order. */
const CODE39_CODES = [
  "101000111011101", "111010001010111", "101110001010111", "111011100010101",
  "101000111010111", "111010001110101", "101110001110101", "101000101110111",
  "111010001011101", "101110001011101", "111010100010111", "101110100010111",
  "111011101000101", "101011100010111", "111010111000101", "101110111000101",
  "101010001110111", "111010100011101", "101110100011101", "101011100011101",
  "111010101000111", "101110101000111", "111011101010001", "101011101000111",
  "111010111010001", "101110111010001", "101010111000111", "111010101110001",
  "101110101110001", "101011101110001", "111000101010111", "100011101010111",
  "111000111010101", "100010111010111", "111000101110101", "100011101110101",
  "100010101110111", "111000101011101", "100011101011101", "100010001000101",
  "100010001010001", "100010100010001", "101000100010001",
];

const CODE39_EDGE = "100010111011101"; // the * start and stop character

/** The mod 43 checksum character for a Code 39 payload. */
export function code39ChecksumChar(value: string): string {
  let sum = 0;
  for (const ch of value.toUpperCase()) {
    const idx = CODE39_CHARS.indexOf(ch);
    if (idx < 0) throw new Error(`Character "${ch}" is not part of Code 39.`);
    sum += idx;
  }
  return CODE39_CHARS[sum % 43];
}

export function encodeCode39(value: string, withChecksum: boolean): BarcodeResult {
  const data = value.toUpperCase();
  if (!data) throw new Error("Enter at least one character for the Code 39 barcode.");
  for (const ch of data) {
    if (!CODE39_CHARS.includes(ch)) {
      throw new Error(`Character "${ch}" cannot be encoded in Code 39. Use A to Z, 0 to 9 and - . $ / + % or space.`);
    }
  }
  const text = withChecksum ? data + code39ChecksumChar(data) : data;
  const parts = [CODE39_EDGE, ...[...text].map((ch) => CODE39_CODES[CODE39_CHARS.indexOf(ch)]), CODE39_EDGE];
  return { widths: widthsFromModules(parts.join("0")), text };
}

/* ---------------- EAN-13 and UPC-A ---------------- */

const EAN_L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const EAN_G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const EAN_R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const EAN_PARITY = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

/** Check digit for the first 12 digits of an EAN-13. */
export function ean13CheckDigit(twelve: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = Number(twelve[i]);
    sum += i % 2 === 0 ? d : d * 3;
  }
  return (10 - (sum % 10)) % 10;
}

/** Check digit for the first 11 digits of a UPC-A. */
export function upcaCheckDigit(eleven: string): number {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const d = Number(eleven[i]);
    sum += i % 2 === 0 ? d * 3 : d;
  }
  return (10 - (sum % 10)) % 10;
}

function encodeEan13Modules(thirteen: string): string {
  const digits = [...thirteen].map(Number);
  const parity = EAN_PARITY[digits[0]];
  let modules = "101";
  for (let i = 0; i < 6; i++) {
    modules += parity[i] === "L" ? EAN_L[digits[i + 1]] : EAN_G[digits[i + 1]];
  }
  modules += "01010";
  for (let i = 0; i < 6; i++) modules += EAN_R[digits[i + 7]];
  modules += "101";
  return modules;
}

export function encodeEan13(value: string): BarcodeResult {
  const v = value.replace(/[\s-]/g, "");
  if (!/^\d{12,13}$/.test(v)) {
    throw new Error("EAN-13 needs 12 digits (the check digit is added) or a full 13 digits.");
  }
  if (v.length === 12) {
    const full = v + String(ean13CheckDigit(v));
    return { widths: widthsFromModules(encodeEan13Modules(full)), text: full };
  }
  if (ean13CheckDigit(v.slice(0, 12)) !== Number(v[12])) {
    throw new Error(`Wrong check digit. For ${v.slice(0, 12)} the check digit should be ${ean13CheckDigit(v.slice(0, 12))}, not ${v[12]}.`);
  }
  return { widths: widthsFromModules(encodeEan13Modules(v)), text: v };
}

export function encodeUpca(value: string): BarcodeResult {
  const v = value.replace(/[\s-]/g, "");
  if (!/^\d{11,12}$/.test(v)) {
    throw new Error("UPC-A needs 11 digits (the check digit is added) or a full 12 digits.");
  }
  let full: string;
  if (v.length === 11) {
    full = v + String(upcaCheckDigit(v));
  } else {
    if (upcaCheckDigit(v.slice(0, 11)) !== Number(v[11])) {
      throw new Error(`Wrong check digit. For ${v.slice(0, 11)} the check digit should be ${upcaCheckDigit(v.slice(0, 11))}, not ${v[11]}.`);
    }
    full = v;
  }
  // UPC-A is exactly EAN-13 with a leading 0: left digits use L patterns, right digits R.
  return { widths: widthsFromModules(encodeEan13Modules("0" + full)), text: full };
}

/* ---------------- Code 128 ---------------- */

/** Standard Code 128 width table, values 0 to 106. Value 106 is the stop pattern including its final bar. */
export const CODE128_WIDTHS = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213",
  "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132",
  "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211",
  "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
  "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331",
  "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111",
  "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214",
  "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
  "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141",
  "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141",
  "114131", "311141", "411131", "211412", "211214", "211232", "2331112",
];

export const CODE128_START_B = 104;
export const CODE128_START_C = 105;
export const CODE128_STOP = 106;

/** Mod 103 checksum. The first value is the start code, data values follow with weights 1, 2, 3 and so on. */
export function code128Checksum(values: number[]): number {
  let sum = values[0];
  for (let i = 1; i < values.length; i++) sum += values[i] * i;
  return sum % 103;
}

export interface Code128Plan {
  start: number;
  data: number[];
  checksum: number;
}

/**
 * Plan a Code 128 encoding. Start C is used when the whole value is digits
 * with an even length of 4 or more; everything else uses Start B.
 */
export function code128Values(text: string): Code128Plan {
  if (!text) throw new Error("Enter at least one character for the Code 128 barcode.");
  let start: number;
  const data: number[] = [];
  if (/^\d+$/.test(text) && text.length >= 4 && text.length % 2 === 0) {
    start = CODE128_START_C;
    for (let i = 0; i < text.length; i += 2) data.push(Number(text.slice(i, i + 2)));
  } else {
    start = CODE128_START_B;
    for (const ch of text) {
      const code = ch.codePointAt(0) ?? 0;
      if (code < 32 || code > 127) {
        throw new Error(`Character "${ch}" cannot be encoded in Code 128 set B. Use plain ASCII characters.`);
      }
      data.push(code - 32);
    }
  }
  return { start, data, checksum: code128Checksum([start, ...data]) };
}

export function encodeCode128(text: string): BarcodeResult {
  const plan = code128Values(text);
  const sequence = [plan.start, ...plan.data, plan.checksum, CODE128_STOP];
  const widths: number[] = [];
  for (const value of sequence) {
    for (const digit of CODE128_WIDTHS[value]) widths.push(Number(digit));
  }
  return { widths, text };
}

/* ---------------- Dispatch ---------------- */

export function encodeBarcode(
  format: BarcodeFormat,
  value: string,
  options?: { code39Checksum?: boolean },
): BarcodeResult {
  switch (format) {
    case "code39":
      return encodeCode39(value, options?.code39Checksum ?? false);
    case "ean13":
      return encodeEan13(value);
    case "upca":
      return encodeUpca(value);
    case "code128":
      return encodeCode128(value);
  }
}
