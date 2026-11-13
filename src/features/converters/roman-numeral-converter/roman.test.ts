import { describe, expect, it } from "vitest";
import { fromRoman, romanDate, toRoman } from "./roman";

describe("toRoman", () => {
  it("converts simple values", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
    expect(toRoman(49)).toBe("XLIX");
    expect(toRoman(58)).toBe("LVIII");
  });

  it("converts years and the maximum", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(toRoman(2026)).toBe("MMXXVI");
    expect(toRoman(3999)).toBe("MMMCMXCIX");
  });

  it("rejects values outside 1 to 3999", () => {
    expect(toRoman(0)).toBeNull();
    expect(toRoman(-4)).toBeNull();
    expect(toRoman(4000)).toBeNull();
    expect(toRoman(3.5)).toBeNull();
    expect(toRoman(Number.NaN)).toBeNull();
  });
});

describe("fromRoman", () => {
  it("parses canonical numerals", () => {
    expect(fromRoman("MCMXCIV")).toBe(1994);
    expect(fromRoman("MMXXVI")).toBe(2026);
    expect(fromRoman("XLIX")).toBe(49);
    expect(fromRoman("I")).toBe(1);
  });

  it("accepts lower case and surrounding spaces", () => {
    expect(fromRoman("  mmxxvi ")).toBe(2026);
  });

  it("rejects non canonical spellings", () => {
    expect(fromRoman("IIII")).toBeNull();
    expect(fromRoman("IC")).toBeNull();
    expect(fromRoman("VV")).toBeNull();
    expect(fromRoman("VX")).toBeNull();
    expect(fromRoman("MMMM")).toBeNull();
    expect(fromRoman("IL")).toBeNull();
  });

  it("rejects junk input", () => {
    expect(fromRoman("")).toBeNull();
    expect(fromRoman("ABC")).toBeNull();
    expect(fromRoman("12")).toBeNull();
  });

  it("round trips every value in a sample range", () => {
    for (const value of [7, 14, 39, 90, 145, 400, 888, 1000, 2024, 3999]) {
      expect(fromRoman(toRoman(value) as string)).toBe(value);
    }
  });
});

describe("romanDate", () => {
  it("converts a full date", () => {
    const result = romanDate("2026-11-13");
    expect(result?.day).toBe("XIII");
    expect(result?.month).toBe("XI");
    expect(result?.year).toBe("MMXXVI");
    expect(result?.combined).toBe("XIII.XI.MMXXVI");
  });

  it("rejects impossible dates", () => {
    expect(romanDate("2026-02-30")).toBeNull();
    expect(romanDate("13-11-2026")).toBeNull();
  });
});
