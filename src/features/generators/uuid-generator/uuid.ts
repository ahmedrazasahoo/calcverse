/** Pure UUID construction from supplied bytes. Randomness is injected for testability. */

function toHex(bytes: Uint8Array): string {
  let hex = "";
  for (const b of bytes) hex += b.toString(16).padStart(2, "0");
  return hex;
}

function format(bytes: Uint8Array): string {
  const hex = toHex(bytes);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * Build a version 4 (random) UUID from 16 supplied bytes.
 * The version and variant bits are forced to the standard values.
 */
export function uuidV4(randomBytes: Uint8Array): string {
  const bytes = Uint8Array.from(randomBytes.slice(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return format(bytes);
}

/**
 * Build a version 7 (time ordered) UUID. The first 48 bits are the Unix
 * timestamp in milliseconds; the remaining bits come from the supplied bytes,
 * with the version nibble set to 7 and the variant bits set to 10.
 */
export function uuidV7(timestampMs: number, randomBytes: Uint8Array): string {
  const bytes = Uint8Array.from(randomBytes.slice(0, 16));
  let ts = Math.trunc(timestampMs);
  for (let i = 5; i >= 0; i--) {
    bytes[i] = ts % 256;
    ts = Math.floor(ts / 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return format(bytes);
}
