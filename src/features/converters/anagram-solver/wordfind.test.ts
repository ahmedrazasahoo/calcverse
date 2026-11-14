import { describe, expect, it } from "vitest";
import {
  buildIndex,
  findAnagrams,
  findFormable,
  groupWordsByLength,
  lettersOnly,
  parseDictionary,
  signature,
} from "./wordfind";

const DICTIONARY = ["cat", "act", "tac", "dog", "cast", "cats", "scat", "at", "go", "to"];
const index = buildIndex(DICTIONARY);

describe("signature and lettersOnly", () => {
  it("sorts letters and ignores case", () => {
    expect(signature("Cat")).toBe("act");
    expect(signature("listen")).toBe("eilnst");
  });

  it("strips anything that is not a letter", () => {
    expect(lettersOnly("c a-t!2")).toBe("cat");
  });
});

describe("buildIndex and parseDictionary", () => {
  it("groups anagrams under one signature", () => {
    expect(index.get("act")).toEqual(["act", "cat", "tac"]);
    expect(index.get("acst")).toEqual(["cast", "cats", "scat"]);
  });

  it("parses a text dictionary, keeping only clean 2 to 12 letter words", () => {
    const text = "cat\nAct \n a \nhello-world\nabcdefghijklm\nDOG\n";
    expect(parseDictionary(text)).toEqual(["cat", "act", "dog"]);
  });
});

describe("findAnagrams", () => {
  it("finds every exact full length anagram, sorted", () => {
    expect(findAnagrams("tac", index)).toEqual(["act", "cat", "tac"]);
    expect(findAnagrams("scat", index)).toEqual(["cast", "cats", "scat"]);
  });

  it("returns nothing for letters with no anagram and for single letters", () => {
    expect(findAnagrams("xyz", index)).toEqual([]);
    expect(findAnagrams("a", index)).toEqual([]);
  });
});

describe("findFormable", () => {
  it("finds every word buildable from the letters, longest first", () => {
    expect(findFormable("cat", index, { minLength: 2 })).toEqual(["act", "cat", "tac", "at"]);
  });

  it("respects the minimum length", () => {
    expect(findFormable("cat", index, { minLength: 3 })).toEqual(["act", "cat", "tac"]);
  });

  it("honours letter counts, so a letter cannot be spent twice", () => {
    // "tac" spelled with letters t, a, c, o: "to" needs the o, "at" is fine,
    // but nothing can use c and o together here because no such word exists
    // in the tiny dictionary; crucially "cast" needs an s that is absent.
    expect(findFormable("taco", index, { minLength: 2 })).toEqual(["act", "cat", "tac", "at", "to"]);
  });

  it("supports a blank tile written as a question mark", () => {
    // Letters c and a plus one blank: the blank can be the t of the cat
    // family, or of "at".
    expect(findFormable("ca?", index, { minLength: 2 })).toEqual(["act", "cat", "tac", "at"]);
  });

  it("supports blanks passed as a count instead", () => {
    expect(findFormable("ca", index, { minLength: 3, blanks: 1 })).toEqual(["act", "cat", "tac"]);
  });

  it("one blank cannot cover two missing letters", () => {
    // "cast" from c, a and one blank still misses both s and t.
    expect(findFormable("ca?", index, { minLength: 4 })).toEqual([]);
  });
});

describe("groupWordsByLength", () => {
  it("groups longest first with alphabetical words inside", () => {
    expect(groupWordsByLength(["cat", "at", "dog", "act"])).toEqual([
      { length: 3, words: ["act", "cat", "dog"] },
      { length: 2, words: ["at"] },
    ]);
  });

  it("handles an empty list", () => {
    expect(groupWordsByLength([])).toEqual([]);
  });
});
