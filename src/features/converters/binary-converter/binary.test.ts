import { describe, expect, it } from "vitest";
import { binaryToText, convertInteger, textToBinary } from "./binary";

describe("convertInteger", () => {
  it("converts binary to every base", () => {
    const result = convertInteger("1010", 2);
    expect(result?.decimal).toBe("10");
    expect(result?.octal).toBe("12");
    expect(result?.hexadecimal).toBe("A");
    expect(result?.bitLength).toBe(4);
  });

  it("converts hexadecimal to every base", () => {
    const result = convertInteger("FF", 16);
    expect(result?.decimal).toBe("255");
    expect(result?.binary).toBe("11111111");
    expect(result?.octal).toBe("377");
  });

  it("converts decimal and octal", () => {
    expect(convertInteger("255", 10)?.binary).toBe("11111111");
    expect(convertInteger("377", 8)?.decimal).toBe("255");
    expect(convertInteger("0", 10)?.binary).toBe("0");
  });

  it("stays exact for values beyond floating point precision", () => {
    // 32 ones in binary is 4294967295, exact with BigInt.
    const result = convertInteger("11111111111111111111111111111111", 2);
    expect(result?.decimal).toBe("4294967295");
    expect(result?.hexadecimal).toBe("FFFFFFFF");
  });

  it("accepts spaces inside the digits", () => {
    expect(convertInteger("1111 1111", 2)?.decimal).toBe("255");
  });

  it("rejects digits that do not belong to the base", () => {
    expect(convertInteger("102", 2)).toBeNull();
    expect(convertInteger("89", 8)).toBeNull();
    expect(convertInteger("FG", 16)).toBeNull();
    expect(convertInteger("12.5", 10)).toBeNull();
    expect(convertInteger("-10", 10)).toBeNull();
    expect(convertInteger("", 2)).toBeNull();
  });
});

describe("text conversion", () => {
  it("encodes plain text as byte groups", () => {
    expect(textToBinary("Hi")).toBe("01001000 01101001");
    expect(textToBinary("A")).toBe("01000001");
    expect(textToBinary("")).toBe("");
  });

  it("decodes byte groups back to text", () => {
    expect(binaryToText("01001000 01101001")).toBe("Hi");
    expect(binaryToText("0100100001101001")).toBe("Hi");
  });

  it("round trips multi byte characters", () => {
    const text = "café";
    expect(binaryToText(textToBinary(text))).toBe(text);
  });

  it("rejects invalid binary", () => {
    expect(binaryToText("0100100")).toBeNull();
    expect(binaryToText("01001002")).toBeNull();
    expect(binaryToText("hello")).toBeNull();
    expect(binaryToText("")).toBeNull();
  });
});
