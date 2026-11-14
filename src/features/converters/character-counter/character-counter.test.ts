import { describe, expect, it } from "vitest";
import { analyseText, countLines, countParagraphs, countSentences } from "./character-counter";

// Expected values are counted by hand from the rules in character-counter.ts:
// characters by Unicode code point, words split on whitespace, a sentence is
// text closed by . ! or ? plus a trailing fragment that contains a word.

describe("analyseText", () => {
  it("counts a short greeting exactly", () => {
    const stats = analyseText("Hello world");
    expect(stats.characters).toBe(11);
    expect(stats.charactersNoSpaces).toBe(10);
    expect(stats.words).toBe(2);
    expect(stats.sentences).toBe(1);
    expect(stats.paragraphs).toBe(1);
    expect(stats.lines).toBe(1);
    expect(stats.longestWord).toBe("Hello");
  });

  it("returns all zeros for empty text", () => {
    const stats = analyseText("");
    expect(stats.characters).toBe(0);
    expect(stats.charactersNoSpaces).toBe(0);
    expect(stats.words).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.paragraphs).toBe(0);
    expect(stats.lines).toBe(0);
    expect(stats.longestWord).toBe("");
  });

  it("counts paragraphs, lines and words across a multi paragraph text", () => {
    const stats = analyseText("First para has four words.\n\nSecond para follows here.\nStill second.");
    expect(stats.paragraphs).toBe(2);
    expect(stats.lines).toBe(4);
    expect(stats.words).toBe(11);
    expect(stats.sentences).toBe(3);
  });

  it("counts an emoji as one character, not two code units", () => {
    const stats = analyseText("Hi 😀");
    // "Hi " is 3 code points and the emoji is 1 more, even though the
    // string length in UTF-16 code units would be 5.
    expect(stats.characters).toBe(4);
    expect(stats.charactersNoSpaces).toBe(3);
    expect(stats.words).toBe(2);
  });
});

describe("countSentences", () => {
  it("counts three sentences with mixed ending marks", () => {
    expect(countSentences("One is here. Two is here? Three is here!")).toBe(3);
  });

  it("treats grouped marks as one ending and a bare fragment as one sentence", () => {
    expect(countSentences("Wait... really?")).toBe(2);
    expect(countSentences("No ending mark at all")).toBe(1);
    expect(countSentences("")).toBe(0);
  });
});

describe("countParagraphs and countLines", () => {
  it("splits paragraphs on blank lines and lines on single newlines", () => {
    expect(countParagraphs("a\nb\n\nc\n\n\nd")).toBe(3);
    expect(countLines("a\nb\nc")).toBe(3);
    expect(countLines("")).toBe(0);
  });
});
