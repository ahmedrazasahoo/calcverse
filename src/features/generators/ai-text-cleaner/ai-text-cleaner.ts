/**
 * AI text cleaner.
 *
 * Text pasted out of chatbots and generators carries machine
 * fingerprints: em dashes everywhere, invisible zero width characters
 * hiding between words, and Markdown symbols that look like litter in
 * a document or email. This cleaner strips the invisible characters,
 * replaces dashes with natural punctuation, and removes Markdown
 * formatting while keeping the words themselves. It runs locally;
 * the text never leaves the device.
 */

export interface CleanOptions {
  /** Replace em and en dashes used as punctuation with commas or full stops. */
  fixDashes: boolean;
  /** Remove zero width and other invisible characters. */
  removeInvisible: boolean;
  /** Strip Markdown symbols (headings, bold, links, code ticks). */
  stripMarkdown: boolean;
  /** Collapse three or more blank lines down to one blank line. */
  tidyBlankLines: boolean;
}

export const DEFAULT_CLEAN_OPTIONS: CleanOptions = {
  fixDashes: true,
  removeInvisible: true,
  stripMarkdown: true,
  tidyBlankLines: true,
};

export interface CleanStats {
  dashesFixed: number;
  invisibleRemoved: number;
  markdownStripped: number;
}

export interface CleanResult {
  text: string;
  stats: CleanStats;
}

/** Invisible characters commonly smuggled inside copied AI text. */
const INVISIBLE_PATTERN = /[\u200B\u200C\u200D\u2060\uFEFF\u00AD\u180E]/g;

/**
 * Decide what replaces a dash based on what follows it: a capital
 * letter usually starts a fresh sentence, so a full stop fits; a
 * lowercase continuation reads better with a comma. Pure helper.
 */
export function dashReplacement(followingText: string): ", " | ". " {
  const next = followingText.replace(/^\s+/, "").charAt(0);
  return next !== "" && next === next.toUpperCase() && next !== next.toLowerCase() ? ". " : ", ";
}

/** Replace spaced em and en dashes with natural punctuation. */
export function fixDashPunctuation(text: string): { text: string; count: number } {
  let count = 0;
  const replaced = text.replace(/[^\S\n]*[—–][^\S\n]*/g, (match, offset: number, whole: string) => {
    count++;
    const after = whole.slice(offset + match.length);
    // A dash at the very start of a line is a list marker in disguise;
    // turn it into a plain hyphen bullet instead of punctuation.
    const before = whole.slice(0, offset).trimEnd();
    if (before === "" || whole.slice(0, offset).endsWith("\n")) return "- ";
    return dashReplacement(after);
  });
  return { text: replaced, count };
}

/** Remove invisible characters and report how many were found. */
export function removeInvisibleCharacters(text: string): { text: string; count: number } {
  const matches = text.match(INVISIBLE_PATTERN);
  return { text: text.replace(INVISIBLE_PATTERN, ""), count: matches ? matches.length : 0 };
}

/**
 * Strip the common Markdown symbols, keeping the readable text.
 * Handles headings, bold and italic markers, inline code, code fences,
 * links, images, blockquote markers and horizontal rules.
 */
export function stripMarkdownSymbols(text: string): { text: string; count: number } {
  let count = 0;
  const bump = (n: number) => {
    count += n;
  };
  let out = text;
  out = out.replace(/```[a-zA-Z0-9]*\n?/g, () => (bump(1), ""));
  out = out.replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt: string) => (bump(1), alt));
  out = out.replace(/\[([^\]]+)\]\([^)]*\)/g, (_m, label: string) => (bump(1), label));
  out = out.replace(/^#{1,6}\s+/gm, () => (bump(1), ""));
  out = out.replace(/^>\s?/gm, () => (bump(1), ""));
  out = out.replace(/^\s*(-{3,}|\*{3,}|_{3,})\s*$/gm, () => (bump(1), ""));
  out = out.replace(/\*\*([^*]+)\*\*/g, (_m, inner: string) => (bump(1), inner));
  out = out.replace(/__([^_]+)__/g, (_m, inner: string) => (bump(1), inner));
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, (_m, pre: string, inner: string) => (bump(1), pre + inner));
  out = out.replace(/`([^`]+)`/g, (_m, inner: string) => (bump(1), inner));
  return { text: out, count };
}

/** Run the full cleaning pipeline with the chosen options. */
export function cleanAiText(input: string, options: CleanOptions = DEFAULT_CLEAN_OPTIONS): CleanResult {
  let text = input;
  const stats: CleanStats = { dashesFixed: 0, invisibleRemoved: 0, markdownStripped: 0 };

  if (options.removeInvisible) {
    const step = removeInvisibleCharacters(text);
    text = step.text;
    stats.invisibleRemoved = step.count;
  }
  if (options.stripMarkdown) {
    const step = stripMarkdownSymbols(text);
    text = step.text;
    stats.markdownStripped = step.count;
  }
  if (options.fixDashes) {
    const step = fixDashPunctuation(text);
    text = step.text;
    stats.dashesFixed = step.count;
  }
  if (options.tidyBlankLines) {
    text = text.replace(/\n{3,}/g, "\n\n");
  }
  return { text: text.replace(/[ \t]+\n/g, "\n"), stats };
}
