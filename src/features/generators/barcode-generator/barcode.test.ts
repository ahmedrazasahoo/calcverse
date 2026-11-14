import { describe, expect, it } from "vitest";
import {
  code128Checksum,
  code128Values,
  code39ChecksumChar,
  ean13CheckDigit,
  encodeBarcode,
  encodeCode39,
  upcaCheckDigit,
} from "./barcode";

describe("EAN-13", () => {
  it("computes the check digit for 590123412345 as 7", () => {
    expect(ean13CheckDigit("590123412345")).toBe(7);
  });

  it("appends the check digit and encodes 95 modules", () => {
    const result = encodeBarcode("ean13", "590123412345");
    expect(result.text).toBe("5901234123457");
    expect(result.widths.reduce((a, b) => a + b, 0)).toBe(95);
    expect(result.widths[0]).toBe(1); // start guard bar
  });

  it("accepts a full 13 digit code with a correct check digit", () => {
    expect(encodeBarcode("ean13", "5901234123457").text).toBe("5901234123457");
  });

  it("rejects a wrong check digit", () => {
    expect(() => encodeBarcode("ean13", "5901234123458")).toThrow("check digit");
  });
});

describe("UPC-A", () => {
  it("computes the check digit for 03600029145 as 2", () => {
    expect(upcaCheckDigit("03600029145")).toBe(2);
  });

  it("appends the check digit and encodes 95 modules", () => {
    const result = encodeBarcode("upca", "03600029145");
    expect(result.text).toBe("036000291452");
    expect(result.widths.reduce((a, b) => a + b, 0)).toBe(95);
  });

  it("rejects a wrong check digit", () => {
    expect(() => encodeBarcode("upca", "036000291453")).toThrow("check digit");
  });
});

describe("Code 39", () => {
  it("encodes A with the standard pattern between start and stop", () => {
    const result = encodeCode39("A", false);
    // 9 elements per character, 3 characters (* A *), 2 single module gaps
    expect(result.widths).toHaveLength(29);
    // The A character occupies widths 10 to 18: wide bar, then a wide space, then a wide bar
    expect(result.widths.slice(10, 19)).toEqual([3, 1, 1, 1, 1, 3, 1, 1, 3]);
    expect(result.text).toBe("A");
  });

  it("computes the mod 43 checksum character", () => {
    // A = 10, B = 11, sum 21, 21 mod 43 = 21, value 21 is L
    expect(code39ChecksumChar("AB")).toBe("L");
    const result = encodeCode39("AB", true);
    expect(result.text).toBe("ABL");
  });

  it("rejects characters outside the Code 39 set", () => {
    expect(() => encodeCode39("lower?", false)).toThrow();
    expect(() => encodeCode39("HAS SPACE OK", false)).not.toThrow();
  });
});

describe("Code 128", () => {
  it("computes the set B checksum for ABC as 1", () => {
    // (104 + 33x1 + 34x2 + 35x3) mod 103 = 310 mod 103 = 1
    expect(code128Checksum([104, 33, 34, 35])).toBe(1);
    const plan = code128Values("ABC");
    expect(plan.start).toBe(104);
    expect(plan.data).toEqual([33, 34, 35]);
    expect(plan.checksum).toBe(1);
  });

  it("starts with the Start B widths and ends with the stop widths", () => {
    const result = encodeBarcode("code128", "ABC");
    expect(result.widths.slice(0, 6)).toEqual([2, 1, 1, 2, 1, 4]); // Start B, 211214
    expect(result.widths.slice(-7)).toEqual([2, 3, 3, 1, 1, 1, 2]); // stop, 2331112
    expect(result.text).toBe("ABC");
  });

  it("uses Start C for even length digit strings of 4 or more", () => {
    const plan = code128Values("123456");
    expect(plan.start).toBe(105);
    expect(plan.data).toEqual([12, 34, 56]);
    const result = encodeBarcode("code128", "123456");
    expect(result.widths.slice(0, 6)).toEqual([2, 1, 1, 2, 3, 2]); // Start C, 211232
  });

  it("keeps short or odd digit strings in set B", () => {
    expect(code128Values("123").start).toBe(104);
    expect(code128Values("12").start).toBe(104);
  });
});
