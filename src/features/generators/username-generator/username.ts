/**
 * Username suggestion logic.
 *
 * Suggestions are built from a per style pair of word lists: an adjective
 * and a noun, joined with the chosen separator and capitalisation, with an
 * optional number suffix. A theme word typed by the user can stand in for
 * the noun. The random source is injectable so tests can drive the picks
 * deterministically. Every result is capped at 24 characters and limited
 * to letters, digits, dots, underscores and dashes, the character set
 * almost every platform accepts.
 */

export type UsernameStyle = "gamer" | "aesthetic" | "professional" | "funny" | "nature" | "tech";
export type Separator = "none" | "underscore" | "dot" | "dash";
export type Capitalisation = "lower" | "capitalised" | "camel";
export type NumberStyle = "year" | "two-digit";

export interface UsernameOptions {
  style: UsernameStyle;
  themeWord?: string;
  separator: Separator;
  capitalisation: Capitalisation;
  includeNumbers: boolean;
  numberStyle: NumberStyle;
}

export type Rng = () => number;

export const MAX_USERNAME_LENGTH = 24;
export const SUGGESTION_COUNT = 12;

interface WordLists {
  adjectives: string[];
  nouns: string[];
}

export const WORD_LISTS: Record<UsernameStyle, WordLists> = {
  gamer: {
    adjectives: ["shadow", "pixel", "turbo", "rogue", "silent", "rapid", "iron", "neon", "stealth", "cosmic", "vortex", "hyper"],
    nouns: ["wolf", "sniper", "dragon", "phantom", "viper", "titan", "falcon", "reaper", "storm", "blade", "hunter", "legend"],
  },
  aesthetic: {
    adjectives: ["velvet", "golden", "misty", "honey", "silky", "dreamy", "pearl", "amber", "cloudy", "lunar", "soft", "rosy"],
    nouns: ["bloom", "meadow", "willow", "petal", "dusk", "aurora", "melody", "haven", "glow", "breeze", "opal", "fern"],
  },
  professional: {
    adjectives: ["clear", "prime", "north", "bright", "solid", "swift", "true", "fair", "keen", "bold", "calm", "grand"],
    nouns: ["advisory", "studio", "consult", "partners", "ventures", "solutions", "office", "group", "labs", "works", "point", "line"],
  },
  funny: {
    adjectives: ["wobbly", "sleepy", "grumpy", "silly", "bouncy", "clumsy", "hungry", "lazy", "noisy", "goofy", "dizzy", "cheeky"],
    nouns: ["potato", "waffle", "penguin", "noodle", "pickle", "muffin", "banana", "donkey", "sausage", "biscuit", "panda", "spoon"],
  },
  nature: {
    adjectives: ["wild", "fern", "mossy", "river", "stone", "cedar", "sage", "birch", "coral", "alpine", "rustic", "verdant"],
    nouns: ["forest", "brook", "summit", "grove", "canyon", "meadow", "cliff", "harbor", "valley", "ridge", "falls", "shore"],
  },
  tech: {
    adjectives: ["quantum", "cyber", "binary", "neural", "digital", "modular", "vector", "atomic", "laser", "crypto", "sonic", "pixel"],
    nouns: ["stack", "circuit", "kernel", "byte", "node", "syntax", "cache", "proxy", "logic", "server", "signal", "cloud"],
  },
};

const SEPARATOR_CHARS: Record<Separator, string> = {
  none: "",
  underscore: "_",
  dot: ".",
  dash: "-",
};

/** Which separators a style allows. A dash reads too casual for professional names. */
export function separatorAllowed(style: UsernameStyle, separator: Separator): boolean {
  if (style === "professional" && separator === "dash") return false;
  return true;
}

function pick<T>(items: readonly T[], rng: Rng): T {
  const index = Math.min(items.length - 1, Math.floor(rng() * items.length));
  return items[index];
}

function capitalise(word: string): string {
  return word.length === 0 ? word : word[0].toUpperCase() + word.slice(1);
}

/** Clean a user typed theme word down to the allowed character set. */
export function cleanThemeWord(raw: string | undefined): string {
  if (!raw) return "";
  return raw.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 14);
}

function numberSuffix(options: UsernameOptions, rng: Rng): string {
  if (!options.includeNumbers) return "";
  if (options.numberStyle === "year") {
    const year = 1990 + Math.floor(rng() * 37); // 1990 to 2026
    return String(year).slice(2);
  }
  return String(Math.floor(rng() * 100)).padStart(2, "0");
}

function buildOne(options: UsernameOptions, rng: Rng): string {
  const lists = WORD_LISTS[options.style];
  const adjective = pick(lists.adjectives, rng);
  const theme = cleanThemeWord(options.themeWord);
  // A theme word replaces the noun in roughly half the suggestions, so the
  // list mixes themed names with fresh ones.
  const noun = theme !== "" && rng() < 0.5 ? theme : pick(lists.nouns, rng);

  let separator: Separator = separatorAllowed(options.style, options.separator) ? options.separator : "underscore";
  if (options.capitalisation === "camel") separator = "none";

  let first = adjective;
  let second = noun;
  if (options.capitalisation === "capitalised") {
    first = capitalise(adjective);
    second = capitalise(noun);
  } else if (options.capitalisation === "camel") {
    second = capitalise(noun);
  }

  let name = first + SEPARATOR_CHARS[separator] + second + numberSuffix(options, rng);
  name = name.replace(/[^a-zA-Z0-9._-]/g, "");
  if (name.length > MAX_USERNAME_LENGTH) {
    name = name.slice(0, MAX_USERNAME_LENGTH).replace(/[._-]+$/, "");
  }
  return name;
}

/** Generate SUGGESTION_COUNT unique suggestions for the given options. */
export function generateUsernames(options: UsernameOptions, rng: Rng = Math.random): string[] {
  const results: string[] = [];
  const seen = new Set<string>();
  let attempts = 0;
  while (results.length < SUGGESTION_COUNT && attempts < SUGGESTION_COUNT * 30) {
    attempts++;
    const candidate = buildOne(options, rng);
    if (candidate !== "" && !seen.has(candidate)) {
      seen.add(candidate);
      results.push(candidate);
    }
  }
  return results;
}
