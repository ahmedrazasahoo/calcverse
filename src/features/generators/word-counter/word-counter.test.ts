import { describe, expect, it } from "vitest";
import { analyzeText, countSentences, formatDuration, tokenizeWords } from "./word-counter";

describe("tokenizeWords", () => {
  it("splits on any whitespace and ignores pure punctuation tokens", () => {
    expect(tokenizeWords("  one two\tthree\nfour ")).toEqual(["one", "two", "three", "four"]);
    expect(tokenizeWords("hello , world")).toEqual(["hello", "world"]);
    expect(tokenizeWords("   ")).toEqual([]);
  });
});

describe("countSentences", () => {
  it("counts terminal punctuation groups", () => {
    expect(countSentences("One. Two? Three! Four...")).toBe(4);
    expect(countSentences("No punctuation at all")).toBe(1);
    expect(countSentences("")).toBe(0);
  });
});

describe("analyzeText", () => {
  it("computes the core statistics", () => {
    const stats = analyzeText("The quick brown fox jumps. The lazy dog sleeps soundly tonight.");
    expect(stats.words).toBe(11);
    expect(stats.sentences).toBe(2);
    expect(stats.paragraphs).toBe(1);
    expect(stats.characters).toBe(63);
    expect(stats.charactersNoSpaces).toBe(53);
    expect(stats.longestWord).toBe("soundly");
    expect(stats.readingSeconds).toBeCloseTo((11 / 200) * 60, 5);
  });

  it("counts paragraphs and finds repeated words", () => {
    const stats = analyzeText("Cats are great. Cats are calm.\n\nDogs are loyal. Dogs are fun.");
    expect(stats.paragraphs).toBe(2);
    expect(stats.topWords[0]).toEqual({ word: "are", count: 4 });
    expect(stats.topWords.some((w) => w.word === "cats" && w.count === 2)).toBe(true);
  });

  it("handles empty text", () => {
    const stats = analyzeText("");
    expect(stats.words).toBe(0);
    expect(stats.readingSeconds).toBe(0);
    expect(stats.topWords).toEqual([]);
  });
});

describe("formatDuration", () => {
  it("formats seconds and minutes", () => {
    expect(formatDuration(45)).toBe("45 sec");
    expect(formatDuration(120)).toBe("2 min");
    expect(formatDuration(150)).toBe("2 min 30 sec");
  });
});
