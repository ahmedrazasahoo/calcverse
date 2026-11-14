/** Pure Base64 helpers, hand rolled so they work identically in tests and the browser. */

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const REVERSE: Record<string, number> = {};
for (let i = 0; i < ALPHABET.length; i++) REVERSE[ALPHABET[i]] = i;

/** Encode bytes to standard Base64, processing in chunks so large inputs stay safe. */
export function bytesToBase64(bytes: Uint8Array): string {
  const CHUNK = 3 * 16384; // multiple of 3 keeps group boundaries aligned
  let out = "";
  for (let start = 0; start < bytes.length; start += CHUNK) {
    const end = Math.min(start + CHUNK, bytes.length);
    let chunk = "";
    for (let i = start; i < end; i += 3) {
      const b0 = bytes[i];
      const b1 = i + 1 < end ? bytes[i + 1] : 0;
      const b2 = i + 2 < end ? bytes[i + 2] : 0;
      const triple = (b0 << 16) | (b1 << 8) | b2;
      chunk += ALPHABET[(triple >> 18) & 63];
      chunk += ALPHABET[(triple >> 12) & 63];
      chunk += i + 1 < end ? ALPHABET[(triple >> 6) & 63] : "=";
      chunk += i + 2 < end ? ALPHABET[triple & 63] : "=";
    }
    out += chunk;
  }
  return out;
}

/** Decode standard Base64 to bytes. Missing padding is tolerated. Throws on bad characters. */
export function base64ToBytes(input: string): Uint8Array {
  const clean = input.replace(/\s+/g, "");
  if (clean.length % 4 === 1) {
    throw new Error("Invalid Base64: the length cannot be one more than a multiple of four.");
  }
  for (const ch of clean) {
    if (ch !== "=" && REVERSE[ch] === undefined) {
      throw new Error(`Invalid Base64 character: "${ch}".`);
    }
  }
  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i += 4) {
    const c0 = REVERSE[clean[i]] ?? 0;
    const c1 = REVERSE[clean[i + 1]] ?? 0;
    const pad2 = clean[i + 2] === "=" || clean[i + 2] === undefined;
    const pad3 = clean[i + 3] === "=" || clean[i + 3] === undefined;
    const c2 = pad2 ? 0 : (REVERSE[clean[i + 2]] ?? 0);
    const c3 = pad3 ? 0 : (REVERSE[clean[i + 3]] ?? 0);
    const triple = (c0 << 18) | (c1 << 12) | (c2 << 6) | c3;
    bytes.push((triple >> 16) & 255);
    if (!pad2) bytes.push((triple >> 8) & 255);
    if (!pad3) bytes.push(triple & 255);
  }
  return new Uint8Array(bytes);
}

/** Encode text to Base64 safely for any Unicode input (UTF-8 first). */
export function encodeText(text: string): string {
  return bytesToBase64(new TextEncoder().encode(text));
}

/** Decode Base64 back to text, assuming the bytes are UTF-8. Throws on bad input. */
export function decodeText(input: string): string {
  const bytes = base64ToBytes(input);
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

/** Convert standard Base64 to the URL safe alphabet, dropping padding. */
export function toUrlSafe(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Convert URL safe Base64 back to the standard alphabet, restoring padding. */
export function fromUrlSafe(text: string): string {
  let out = text.replace(/-/g, "+").replace(/_/g, "/");
  while (out.length % 4 !== 0) out += "=";
  return out;
}
