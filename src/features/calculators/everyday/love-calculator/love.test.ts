import { describe, expect, it } from "vitest";
import { calculateLove, normaliseName } from "./love";

describe("calculateLove", () => {
  it("gives the same score whichever order the names are entered", () => {
    const forward = calculateLove({ name1: "Alex", name2: "Jordan" });
    const reverse = calculateLove({ name1: "Jordan", name2: "Alex" });
    expect(reverse.score).toBe(forward.score);
    expect(reverse.verdict).toBe(forward.verdict);
  });

  it("is stable across repeated calls for the same pair", () => {
    const first = calculateLove({ name1: "Priya", name2: "Daniel" });
    const second = calculateLove({ name1: "Priya", name2: "Daniel" });
    expect(second).toEqual(first);
  });

  it("keeps the score within 0 to 100 for a batch of sample names", () => {
    // Score formula: FNV-1a hash of the sorted normalised pair, modulo 101.
    const names = ["Sam", "Taylor", "Maria", "Chen", "Fatima", "Liam", "Zoe", "Omar", "Nina", "Jack"];
    for (const a of names) {
      for (const b of names) {
        const result = calculateLove({ name1: a, name2: b });
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it("ignores case, spaces and punctuation in names", () => {
    const plain = calculateLove({ name1: "Mary Jane", name2: "Tom" });
    const messy = calculateLove({ name1: "  MARY-JANE! ", name2: "tom" });
    expect(messy.score).toBe(plain.score);
    expect(normaliseName("  Mary-Jane! ")).toBe("maryjane");
  });

  it("counts the distinct letters shared by both names", () => {
    // "anna" and "alan" share the distinct letters a and n.
    const result = calculateLove({ name1: "Anna", name2: "Alan" });
    expect(result.sharedLetters).toBe(2);
    expect(result.sharedLetterList).toEqual(["a", "n"]);
  });

  it("folds both birth dates into the result when they are provided", () => {
    const withoutDates = calculateLove({ name1: "Alex", name2: "Jordan" });
    const withDates = calculateLove({
      name1: "Alex",
      name2: "Jordan",
      birthDate1: "1995-04-12",
      birthDate2: "1997-09-03",
    });
    const swappedDates = calculateLove({
      name1: "Jordan",
      name2: "Alex",
      birthDate1: "1997-09-03",
      birthDate2: "1995-04-12",
    });
    expect(withDates.score).toBe(swappedDates.score);
    expect(withDates.score).not.toBe(withoutDates.score);
  });

  it("rejects empty names", () => {
    expect(() => calculateLove({ name1: "", name2: "Alex" })).toThrow(RangeError);
    expect(() => calculateLove({ name1: "Alex", name2: "   " })).toThrow(RangeError);
    expect(() => calculateLove({ name1: "123", name2: "Alex" })).toThrow(RangeError);
  });
});
