/**
 * Love calculator logic, pure and framework free.
 *
 * This is entertainment maths, not a measurement of anything real.
 * The score is deterministic: the two names are normalised, sorted so
 * order does not matter, joined, and run through an FNV-1a string hash.
 * The score is the hash modulo 101, giving a stable value from 0 to 100
 * for the same pair every time. When both birth dates are supplied they
 * are folded into the hash input as well.
 */

export interface LoveInput {
  name1: string;
  name2: string;
  /** Optional birth date strings, for example from a date input. May be empty. */
  birthDate1?: string;
  birthDate2?: string;
}

export interface LoveResult {
  /** Deterministic score from 0 to 100. */
  score: number;
  /** Short band label for the score. */
  verdict: string;
  /** Playful line that goes with the band. */
  verdictLine: string;
  /** Count of distinct letters that appear in both names. */
  sharedLetters: number;
  /** The distinct shared letters themselves, in alphabetical order. */
  sharedLetterList: string[];
}

/** Trim, lowercase and strip everything that is not a letter. */
export function normaliseName(name: string): string {
  return name.trim().toLowerCase().replace(/[^\p{L}]/gu, "");
}

/** FNV-1a 32 bit hash, stable across calls and platforms. */
export function fnv1aHash(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function verdictFor(score: number): { verdict: string; verdictLine: string } {
  if (score <= 33) {
    return {
      verdict: "Early days",
      verdictLine: "The spark is still finding its feet. Every great story starts with a first chapter.",
    };
  }
  if (score <= 66) {
    return {
      verdict: "Real potential",
      verdictLine: "There is something here worth exploring. Good things tend to grow from a start like this.",
    };
  }
  if (score <= 84) {
    return {
      verdict: "Strong match",
      verdictLine: "The names sit very comfortably together. On paper, this pairing has real chemistry.",
    };
  }
  return {
    verdict: "Written in the stars",
    verdictLine: "As far as playful name maths goes, it does not get much better than this pairing.",
  };
}

export function calculateLove(input: LoveInput): LoveResult {
  const first = normaliseName(input.name1 ?? "");
  const second = normaliseName(input.name2 ?? "");
  if (first.length === 0 || second.length === 0) {
    throw new RangeError("Both names need at least one letter.");
  }

  const sortedNames = [first, second].sort();
  let hashInput = sortedNames.join("|");

  const date1 = (input.birthDate1 ?? "").trim();
  const date2 = (input.birthDate2 ?? "").trim();
  if (date1 !== "" && date2 !== "") {
    hashInput += `|${[date1, date2].sort().join("|")}`;
  }

  // Score formula: FNV-1a hash of the sorted pair, modulo 101, giving 0 to 100.
  const score = fnv1aHash(hashInput) % 101;

  const letters1 = new Set(first.split(""));
  const sharedLetterList = [...new Set(second.split(""))]
    .filter((letter) => letters1.has(letter))
    .sort();

  const { verdict, verdictLine } = verdictFor(score);
  return {
    score,
    verdict,
    verdictLine,
    sharedLetters: sharedLetterList.length,
    sharedLetterList,
  };
}
