import { describe, expect, it } from "vitest";
import { convertShoeSize, formatShoeSize } from "./shoeSize";

describe("convertShoeSize for men", () => {
  it("converts a US size to the full row", () => {
    const row = convertShoeSize("men", "us", 9);
    expect(row).toEqual({ footCm: 26.0, us: 9, uk: 8.5, eu: 42.5 });
  });

  it("converts from UK and EU sizes", () => {
    expect(convertShoeSize("men", "uk", 8.5)?.us).toBe(9);
    expect(convertShoeSize("men", "eu", 42.5)?.us).toBe(9);
    expect(convertShoeSize("men", "eu", 44)?.uk).toBe(9.5);
  });

  it("matches the nearest row for a foot length", () => {
    expect(convertShoeSize("men", "cm", 26.0)?.us).toBe(9);
    // 26.2 cm sits between the 9 and 9.5 rows and is closer to 9.5 (26.4).
    expect(convertShoeSize("men", "cm", 26.2)?.us).toBe(9.5);
  });

  it("rejects sizes that are not on the chart", () => {
    expect(convertShoeSize("men", "us", 9.25)).toBeNull();
    expect(convertShoeSize("men", "us", 20)).toBeNull();
    expect(convertShoeSize("men", "cm", 40)).toBeNull();
    expect(convertShoeSize("men", "cm", -25)).toBeNull();
  });
});

describe("convertShoeSize for women and kids", () => {
  it("converts a women's US size", () => {
    expect(convertShoeSize("women", "us", 7)).toEqual({ footCm: 23.4, us: 7, uk: 5.5, eu: 38 });
  });

  it("keeps the same number on different charts apart", () => {
    // A US 7 is not the same shoe for men, women and kids.
    expect(convertShoeSize("men", "us", 7)?.eu).toBe(40);
    expect(convertShoeSize("women", "us", 7)?.eu).toBe(38);
    expect(convertShoeSize("kids", "us", 7)?.eu).toBe(39.5);
  });

  it("converts a kids youth size", () => {
    expect(convertShoeSize("kids", "us", 4)).toEqual({ footCm: 22.7, us: 4, uk: 3.5, eu: 36 });
    expect(convertShoeSize("kids", "uk", 13.5)?.us).toBe(1);
  });
});

describe("formatShoeSize", () => {
  it("prints whole and half sizes cleanly", () => {
    expect(formatShoeSize(9)).toBe("9");
    expect(formatShoeSize(8.5)).toBe("8.5");
    expect(formatShoeSize(13.5)).toBe("13.5");
  });
});
