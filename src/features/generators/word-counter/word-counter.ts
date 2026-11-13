/**
 * Text analysis for the word counter. Counts are computed the way
 * writers and editors expect: words are separated by whitespace,
 * sentences end with a full stop, question mark or exclamation mark,
 * and reading time assumes an average adult pace.
 */

/** Average silent reading speed, words per minute. */
export const READING_WPM = 200;

/** Average speaking speed, words per minute. */
export const SPEAKING_WPM = 130;

export interface WordFrequency {
  word: string;
  count: number;
}

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  longestWord: string;
  readingSeconds: number;
  speakingSeconds: number;
  topWords: WordFrequency[];
}

/** Split text into word tokens. Pure helper. */
export function tokenizeWords(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed === "") return [];
  return trimmed.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token));
}

/** Count sentence ending punctuation groups. Pure helper. */
export function countSentences(text: string): number {
  const matches = text.match(/[^.!?]+[.!?]+/g);
  if (matches) return matches.length;
  return tokenizeWords(text).length > 0 ? 1 : 0;
}

/** Format a duration in seconds as a friendly "2 min 30 sec". Pure helper. */
export function formatDuration(totalSeconds: number): string {
  const rounded = Math.round(totalSeconds);
  if (rounded < 60) return `${rounded} sec`;
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return seconds === 0 ? `${minutes} min` : `${minutes} min ${seconds} sec`;
}

/** Analyse a block of text and return the full set of statistics. */
export function analyzeText(text: string): TextStats {
  const tokens = tokenizeWords(text);
  const words = tokens.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length;

  let longestWord = "";
  const frequency = new Map<string, number>();
  for (const token of tokens) {
    const cleaned = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    if (cleaned.length > longestWord.length) longestWord = cleaned;
    const key = cleaned.toLowerCase();
    if (key.length >= 3) frequency.set(key, (frequency.get(key) ?? 0) + 1);
  }
  const topWords = [...frequency.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, 5);

  return {
    words,
    characters: text.length,
    charactersNoSpaces,
    sentences: countSentences(text),
    paragraphs,
    longestWord,
    readingSeconds: words === 0 ? 0 : (words / READING_WPM) * 60,
    speakingSeconds: words === 0 ? 0 : (words / SPEAKING_WPM) * 60,
    topWords,
  };
}
