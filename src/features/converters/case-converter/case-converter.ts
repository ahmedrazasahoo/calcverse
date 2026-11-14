/**
 * Case conversion for the case converter. Twelve styles cover the three
 * places text case actually matters: prose (upper, lower, title,
 * sentence, capitalised), playful emphasis (alternating, inverse), and
 * code identifiers (camel, Pascal, snake, kebab, CONSTANT).
 */

export type CaseStyle =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "capitalize"
  | "alternating"
  | "inverse"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant";

/** Styles in display order, with the label and a sample for each button. */
export const CASE_STYLES: { value: CaseStyle; label: string; sample: string }[] = [
  { value: "upper", label: "UPPERCASE", sample: "HELLO WORLD" },
  { value: "lower", label: "lowercase", sample: "hello world" },
  { value: "title", label: "Title Case", sample: "The Quick Brown Fox" },
  { value: "sentence", label: "Sentence case", sample: "The quick brown fox." },
  { value: "capitalize", label: "Capitalize Each Word", sample: "Every Word Starts Big" },
  { value: "alternating", label: "aLtErNaTiNg CaSe", sample: "aLtErNaTiNg" },
  { value: "inverse", label: "iNVERSE cASE", sample: "iNVERSE" },
  { value: "camel", label: "camelCase", sample: "helloWorldExample" },
  { value: "pascal", label: "PascalCase", sample: "HelloWorldExample" },
  { value: "snake", label: "snake_case", sample: "hello_world_example" },
  { value: "kebab", label: "kebab-case", sample: "hello-world-example" },
  { value: "constant", label: "CONSTANT_CASE", sample: "HELLO_WORLD_EXAMPLE" },
];

/**
 * Small words that title case keeps lowercase when they are not the
 * first word: articles, short conjunctions and short prepositions.
 */
const SMALL_WORDS = new Set(["a", "an", "the", "and", "or", "of", "in", "on", "at", "to", "for", "with"]);

/** Capitalise the first letter of a word and lowercase the rest of it. */
function capitaliseWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Apply a function to every run of letters and digits in the text,
 * leaving punctuation and spacing untouched. The function also hears
 * whether the word it is given is the first word in the text.
 */
function mapWords(text: string, fn: (word: string, isFirst: boolean) => string): string {
  let seen = 0;
  return text.replace(/[\p{L}\p{N}]+/gu, (word) => fn(word, seen++ === 0));
}

/**
 * Title case: capitalise each word, except that small connecting words
 * (a, an, the, and, or, of, in, on, at, to, for, with) stay lowercase
 * unless they are the first word. That exception list is what separates
 * title case from plain capitalisation.
 */
function toTitleCase(text: string): string {
  return mapWords(text, (word, isFirst) => {
    if (!isFirst && SMALL_WORDS.has(word.toLowerCase())) return word.toLowerCase();
    return capitaliseWord(word);
  });
}

/**
 * Sentence case: lowercase everything, then capitalise the first letter
 * of the text and the first letter after each sentence ending mark
 * (. ! ?). The rule is deliberately simple: it does not try to protect
 * proper nouns or acronyms, so "i visited NASA" becomes "I visited
 * nasa". Fix names and acronyms by hand after converting.
 */
function toSentenceCase(text: string): string {
  const lowered = text.toLowerCase();
  return lowered.replace(/(^\s*|[.!?]+\s+)([\p{L}])/gu, (_match, prefix: string, letter: string) => {
    return prefix + letter.toUpperCase();
  });
}

/**
 * Alternating case: letters flip between lowercase and uppercase,
 * starting with a lowercase letter. Only letters consume the toggle, so
 * spaces and punctuation do not shift the pattern: "abc def" becomes
 * "aBc DeF", keeping both words in step.
 */
function toAlternatingCase(text: string): string {
  let upperNext = false;
  return [...text]
    .map((ch) => {
      if (!/\p{L}/u.test(ch)) return ch;
      const out = upperNext ? ch.toUpperCase() : ch.toLowerCase();
      upperNext = !upperNext;
      return out;
    })
    .join("");
}

/** Inverse case: every uppercase letter becomes lowercase and vice versa. */
function toInverseCase(text: string): string {
  return [...text]
    .map((ch) => {
      if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) return ch.toLowerCase();
      if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) return ch.toUpperCase();
      return ch;
    })
    .join("");
}

/**
 * Split text into words for the identifier styles. Boundaries are any
 * run of non alphanumeric characters, plus camel humps: a lowercase
 * letter or digit followed by an uppercase letter starts a new word,
 * and an acronym run followed by a normal word splits before its last
 * capital, so "parseHTTPResponse" gives parse, HTTP, Response.
 */
export function splitWords(text: string): string[] {
  return text
    .replace(/([\p{Ll}\p{N}])([\p{Lu}])/gu, "$1 $2")
    .replace(/([\p{Lu}]+)([\p{Lu}][\p{Ll}])/gu, "$1 $2")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((word) => word !== "");
}

/** Convert text into the chosen case style. Empty input returns empty. */
export function convertCase(text: string, style: CaseStyle): string {
  switch (style) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
    case "capitalize":
      return mapWords(text, (word) => capitaliseWord(word));
    case "alternating":
      return toAlternatingCase(text);
    case "inverse":
      return toInverseCase(text);
    case "camel": {
      const words = splitWords(text).map((word) => word.toLowerCase());
      if (words.length === 0) return "";
      return words[0] + words.slice(1).map(capitaliseWord).join("");
    }
    case "pascal":
      return splitWords(text)
        .map((word) => capitaliseWord(word.toLowerCase()))
        .join("");
    case "snake":
      return splitWords(text)
        .map((word) => word.toLowerCase())
        .join("_");
    case "kebab":
      return splitWords(text)
        .map((word) => word.toLowerCase())
        .join("-");
    case "constant":
      return splitWords(text)
        .map((word) => word.toUpperCase())
        .join("_");
  }
}
