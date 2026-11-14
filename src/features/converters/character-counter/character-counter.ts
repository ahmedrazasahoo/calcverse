/**
 * Character counting for the character counter. The headline number is
 * the one platforms and forms actually enforce: every character in the
 * text, spaces and line breaks included.
 *
 * Characters are counted by Unicode code points ([...text].length)
 * rather than by UTF-16 code units (text.length). That choice means an
 * emoji or another character outside the basic multilingual plane
 * counts as one character, which matches what a person sees on screen
 * and what most character limits intend. The trade off is that an emoji
 * decorated with a skin tone modifier or joined with other emoji still
 * counts as several code points, one per visible building block.
 */

export interface CharacterStats {
  /** Every character, including spaces and line breaks, by code point. */
  characters: number;
  /** Every character except whitespace of any kind. */
  charactersNoSpaces: number;
  /** Whitespace separated tokens, the same rule most forms use. */
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  /** The longest whitespace separated token, or "" when there is no text. */
  longestWord: string;
}

/** Split text into whitespace separated word tokens. Pure helper. */
export function splitWords(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed === "") return [];
  return trimmed.split(/\s+/);
}

/**
 * Count sentences the simple, explainable way: each run of text closed
 * by one or more sentence ending marks (. ! ?) is one sentence, and a
 * trailing fragment with no ending mark still counts as one sentence
 * when it contains at least one word. Pure helper.
 */
export function countSentences(text: string): number {
  const closed = text.match(/[^.!?]+[.!?]+/g);
  let count = closed ? closed.length : 0;
  const remainder = closed ? text.replace(/[^.!?]+[.!?]+/g, "") : text;
  if (splitWords(remainder).length > 0) count += 1;
  return count;
}

/** Count paragraphs: blocks of text separated by at least one blank line. Pure helper. */
export function countParagraphs(text: string): number {
  if (text.trim() === "") return 0;
  return text.split(/\n\s*\n/).filter((block) => block.trim() !== "").length;
}

/** Count lines: pieces split on newline. Empty text has no lines. Pure helper. */
export function countLines(text: string): number {
  if (text === "") return 0;
  return text.split("\n").length;
}

/** Analyse a block of text and return every count in one pass. */
export function analyseText(text: string): CharacterStats {
  const codePoints = [...text];
  const tokens = splitWords(text);

  let longestWord = "";
  for (const token of tokens) {
    if ([...token].length > [...longestWord].length) longestWord = token;
  }

  return {
    characters: codePoints.length,
    charactersNoSpaces: codePoints.filter((ch) => !/\s/.test(ch)).length,
    words: tokens.length,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: countLines(text),
    longestWord,
  };
}
