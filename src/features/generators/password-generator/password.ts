/**
 * Password generation with the browser's cryptographic random source.
 *
 * Characters are drawn with rejection sampling so every character in
 * the set is equally likely; taking a random byte modulo the set size
 * would quietly favour the first characters of the set. Each enabled
 * character family is guaranteed at least one character, then the
 * result is shuffled so those guaranteed characters are not always in
 * the same positions. The generator runs entirely on the device, and
 * nothing is stored or sent anywhere.
 */

export const CHARACTER_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}<>?",
} as const;

export type CharacterSetName = keyof typeof CHARACTER_SETS;

export interface PasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
}

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 128;

/** Default random source shape, satisfied by crypto.getRandomValues. */
export type RandomSource = (array: Uint32Array) => Uint32Array;

const defaultRandom: RandomSource = (array) => crypto.getRandomValues(array);

/** Build the combined character set for the enabled families. Pure helper. */
export function characterPool(options: PasswordOptions): string {
  let pool = "";
  if (options.lowercase) pool += CHARACTER_SETS.lowercase;
  if (options.uppercase) pool += CHARACTER_SETS.uppercase;
  if (options.digits) pool += CHARACTER_SETS.digits;
  if (options.symbols) pool += CHARACTER_SETS.symbols;
  return pool;
}

/**
 * Pick an index uniformly in [0, max) using rejection sampling, so no
 * index is favoured by the size of the random range. Pure given a
 * deterministic random source, which is how tests drive it.
 */
export function uniformIndex(max: number, random: RandomSource = defaultRandom): number {
  if (max <= 0) throw new Error("Cannot pick from an empty set.");
  const limit = Math.floor(0xffffffff / max) * max;
  const draw = new Uint32Array(1);
  let value = 0;
  do {
    random(draw);
    value = draw[0];
  } while (value >= limit);
  return value % max;
}

/** Clamp a requested length into the allowed range. Pure helper. */
export function clampLength(length: number): number {
  if (!Number.isFinite(length)) return 16;
  return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, Math.floor(length)));
}

/** Generate one password. Returns an empty string when no family is enabled. */
export function generatePassword(options: PasswordOptions, random: RandomSource = defaultRandom): string {
  const pool = characterPool(options);
  if (pool === "") return "";
  const length = Math.max(clampLength(options.length), enabledSets(options).length);

  const chars: string[] = [];
  // Guarantee one character from each enabled family.
  for (const set of enabledSets(options)) {
    chars.push(set[uniformIndex(set.length, random)]);
  }
  while (chars.length < length) {
    chars.push(pool[uniformIndex(pool.length, random)]);
  }
  // Fisher Yates shuffle so guaranteed characters land anywhere.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = uniformIndex(i + 1, random);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function enabledSets(options: PasswordOptions): string[] {
  const sets: string[] = [];
  if (options.lowercase) sets.push(CHARACTER_SETS.lowercase);
  if (options.uppercase) sets.push(CHARACTER_SETS.uppercase);
  if (options.digits) sets.push(CHARACTER_SETS.digits);
  if (options.symbols) sets.push(CHARACTER_SETS.symbols);
  return sets;
}

export interface StrengthEstimate {
  /** Approximate entropy in bits, length times log2 of the pool size. */
  bits: number;
  label: "Weak" | "Fair" | "Strong" | "Excellent";
}

/** Estimate password strength from length and pool size. Pure helper. */
export function estimateStrength(password: string): StrengthEstimate {
  if (password === "") return { bits: 0, label: "Weak" };
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
  const bits = Math.round(password.length * Math.log2(Math.max(poolSize, 2)));
  const label = bits < 40 ? "Weak" : bits < 64 ? "Fair" : bits < 100 ? "Strong" : "Excellent";
  return { bits, label };
}
