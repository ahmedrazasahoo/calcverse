import { describe, expect, it } from "vitest";
import {
  cleanThemeWord,
  generateUsernames,
  separatorAllowed,
  SUGGESTION_COUNT,
  WORD_LISTS,
  type Rng,
  type UsernameOptions,
} from "./username";

/** Deterministic rng that cycles through a fixed sequence of values. */
function cycleRng(values: number[]): Rng {
  let i = 0;
  return () => {
    const v = values[i % values.length];
    i++;
    return v;
  };
}

/** Deterministic seeded rng (linear congruential) for varied but repeatable draws. */
function seededRng(seed: number): Rng {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const varied = seededRng(123456789);

const base: UsernameOptions = {
  style: "gamer",
  separator: "underscore",
  capitalisation: "lower",
  includeNumbers: false,
  numberStyle: "two-digit",
};

describe("generateUsernames", () => {
  it("returns exactly 12 unique suggestions", () => {
    const names = generateUsernames(base, varied);
    expect(names).toHaveLength(SUGGESTION_COUNT);
    expect(new Set(names).size).toBe(SUGGESTION_COUNT);
  });

  it("only uses the allowed character set and never exceeds 24 characters", () => {
    for (const style of Object.keys(WORD_LISTS) as UsernameOptions["style"][]) {
      const names = generateUsernames({ ...base, style, includeNumbers: true }, varied);
      for (const name of names) {
        expect(name).toMatch(/^[a-zA-Z0-9._-]+$/);
        expect(name.length).toBeLessThanOrEqual(24);
        expect(name.length).toBeGreaterThan(0);
      }
    }
  });

  it("applies the underscore separator and lowercase style", () => {
    const names = generateUsernames(base, cycleRng([0, 0]));
    expect(names[0]).toBe("shadow_wolf");
    expect(names[0]).toBe(names[0].toLowerCase());
  });

  it("separator none joins the words directly", () => {
    const names = generateUsernames({ ...base, separator: "none" }, cycleRng([0, 0]));
    expect(names[0]).toBe("shadowwolf");
  });

  it("dot separator shows up between the words", () => {
    const names = generateUsernames({ ...base, separator: "dot" }, cycleRng([0, 0]));
    expect(names[0]).toBe("shadow.wolf");
  });

  it("camel case capitalises the second word and drops the separator", () => {
    const names = generateUsernames({ ...base, capitalisation: "camel" }, cycleRng([0, 0]));
    expect(names[0]).toBe("shadowWolf");
  });

  it("capitalised style lifts both words", () => {
    const names = generateUsernames({ ...base, capitalisation: "capitalised", separator: "none" }, cycleRng([0, 0]));
    expect(names[0]).toBe("ShadowWolf");
  });

  it("falls back to underscore when a style disallows the dash", () => {
    expect(separatorAllowed("professional", "dash")).toBe(false);
    expect(separatorAllowed("gamer", "dash")).toBe(true);
    const names = generateUsernames({ ...base, style: "professional", separator: "dash" }, cycleRng([0, 0]));
    expect(names[0]).toBe("clear_advisory");
    expect(names[0]).not.toContain("-");
  });

  it("appends a two digit number when numbers are on", () => {
    const names = generateUsernames({ ...base, includeNumbers: true, numberStyle: "two-digit" }, cycleRng([0, 0, 0.42]));
    expect(names[0]).toBe("shadow_wolf42");
  });

  it("year style appends a two digit year like suffix in range", () => {
    const names = generateUsernames({ ...base, includeNumbers: true, numberStyle: "year" }, varied);
    for (const name of names) {
      const tail = name.slice(-2);
      expect(tail).toMatch(/^\d{2}$/);
      const v = Number(tail);
      // Suffixes come from years 1990 to 2026, so they read 90 to 99 or 00 to 26.
      expect(v >= 90 || v <= 26).toBe(true);
    }
  });

  it("uses the theme word in place of the noun when the draw picks it", () => {
    const names = generateUsernames({ ...base, themeWord: "Falcon!!" }, cycleRng([0, 0.4, 0]));
    expect(names[0]).toBe("shadow_falcon");
  });
});

describe("cleanThemeWord and word lists", () => {
  it("strips anything outside letters and digits from a theme word", () => {
    expect(cleanThemeWord("My Band!")).toBe("myband");
    expect(cleanThemeWord("")).toBe("");
    expect(cleanThemeWord(undefined)).toBe("");
  });

  it("every style has at least 40 adjectives and 40 nouns across all lists", () => {
    const adjectives = Object.values(WORD_LISTS).reduce((n, l) => n + l.adjectives.length, 0);
    const nouns = Object.values(WORD_LISTS).reduce((n, l) => n + l.nouns.length, 0);
    expect(adjectives).toBeGreaterThanOrEqual(40);
    expect(nouns).toBeGreaterThanOrEqual(40);
    for (const list of Object.values(WORD_LISTS)) {
      for (const word of [...list.adjectives, ...list.nouns]) {
        expect(word).toMatch(/^[a-z]+$/);
      }
    }
  });
});
