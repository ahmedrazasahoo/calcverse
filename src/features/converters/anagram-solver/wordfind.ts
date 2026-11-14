/**
 * Shared dictionary word logic for the Anagram Solver and Word Unscrambler.
 *
 * Words are grouped by signature, the word's letters sorted alphabetically,
 * so every anagram of a word sits under the same key. Formable word search
 * (for the unscrambler) walks the index once and checks each candidate
 * against the player's letter multiset, letting blank tiles (written as ?
 * or passed as a count) cover a limited number of missing letters.
 */

export type WordIndex = Map<string, string[]>;

/** Lowercase a word and sort its letters: the anagram signature. */
export function signature(word: string): string {
  return word.toLowerCase().split("").sort().join("");
}

/** Keep only a to z letters from raw input, lowercased. */
export function lettersOnly(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z]/g, "");
}

/** Parse a plain text dictionary file (one word per line) into clean words. */
export function parseDictionary(text: string): string[] {
  const words: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    const word = line.trim().toLowerCase();
    if (/^[a-z]{2,12}$/.test(word)) words.push(word);
  }
  return words;
}

/** Group words by signature into an index for fast anagram lookup. */
export function buildIndex(words: string[]): WordIndex {
  const index: WordIndex = new Map();
  for (const raw of words) {
    const word = raw.toLowerCase();
    if (word === "") continue;
    const key = signature(word);
    const bucket = index.get(key);
    if (bucket) bucket.push(word);
    else index.set(key, [word]);
  }
  for (const bucket of index.values()) bucket.sort();
  return index;
}

/** Every word in the index, as one flat list. */
export function allWords(index: WordIndex): string[] {
  const out: string[] = [];
  for (const bucket of index.values()) out.push(...bucket);
  return out;
}

/**
 * Exact full length anagrams of the given letters: every dictionary word
 * that uses all the letters exactly once. Sorted alphabetically.
 */
export function findAnagrams(letters: string, index: WordIndex): string[] {
  const clean = lettersOnly(letters);
  if (clean.length < 2) return [];
  const bucket = index.get(signature(clean));
  return bucket ? [...bucket] : [];
}

export interface FormableOptions {
  /** Ignore words shorter than this. */
  minLength: number;
  /** Extra blank tiles beyond any ? characters in the input. At most 2 blanks are honoured in total. */
  blanks?: number;
}

/**
 * All dictionary words that can be built from the letter multiset, using
 * each letter at most as many times as it appears. A ? in the input (or
 * the blanks option) is a blank tile that can stand for any one letter,
 * up to 2 blanks in total. Results are sorted by length descending, then
 * alphabetically, so the longest plays come first.
 */
export function findFormable(letters: string, index: WordIndex, options: FormableOptions): string[] {
  const raw = letters.toLowerCase();
  const blanksFromInput = (raw.match(/\?/g) ?? []).length;
  const totalBlanks = Math.min(2, blanksFromInput + Math.max(0, options.blanks ?? 0));
  const clean = lettersOnly(raw);
  const available = new Map<string, number>();
  for (const ch of clean) available.set(ch, (available.get(ch) ?? 0) + 1);
  const maxLength = clean.length + totalBlanks;

  const results: string[] = [];
  for (const bucket of index.values()) {
    for (const word of bucket) {
      if (word.length < options.minLength || word.length > maxLength) continue;
      let deficit = 0;
      const needed = new Map<string, number>();
      for (const ch of word) needed.set(ch, (needed.get(ch) ?? 0) + 1);
      for (const [ch, count] of needed) {
        const have = available.get(ch) ?? 0;
        if (count > have) deficit += count - have;
        if (deficit > totalBlanks) break;
      }
      if (deficit <= totalBlanks) results.push(word);
    }
  }
  results.sort((a, b) => b.length - a.length || (a < b ? -1 : a > b ? 1 : 0));
  return results;
}

export interface LengthGroup {
  length: number;
  words: string[];
}

/** Group words by length, longest group first, words alphabetical inside each group. */
export function groupWordsByLength(words: string[]): LengthGroup[] {
  const byLength = new Map<number, string[]>();
  for (const word of words) {
    const bucket = byLength.get(word.length);
    if (bucket) bucket.push(word);
    else byLength.set(word.length, [word]);
  }
  return [...byLength.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([length, group]) => ({ length, words: [...group].sort() }));
}
