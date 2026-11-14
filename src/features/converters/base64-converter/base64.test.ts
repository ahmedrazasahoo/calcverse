import { describe, expect, it } from "vitest";
import {
  base64ToBytes,
  bytesToBase64,
  decodeText,
  encodeText,
  fromUrlSafe,
  toUrlSafe,
} from "./base64";

describe("text round trips", () => {
  it("encodes Hello, World! to the known value", () => {
    expect(encodeText("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
    expect(decodeText("SGVsbG8sIFdvcmxkIQ==")).toBe("Hello, World!");
  });

  it("round trips Unicode text safely", () => {
    const text = "héllo wörld ✓ ünïcode 123";
    expect(decodeText(encodeText(text))).toBe(text);
  });

  it("round trips an empty string", () => {
    expect(encodeText("")).toBe("");
    expect(decodeText("")).toBe("");
  });
});

describe("bytes conversion", () => {
  it("encodes and decodes raw bytes", () => {
    const bytes = new Uint8Array([0, 1, 2, 250, 251, 255]);
    expect(base64ToBytes(bytesToBase64(bytes))).toEqual(bytes);
  });

  it("handles a large byte array in chunks", () => {
    const bytes = new Uint8Array(100_000);
    for (let i = 0; i < bytes.length; i++) bytes[i] = (i * 31 + 7) % 256;
    expect(base64ToBytes(bytesToBase64(bytes))).toEqual(bytes);
  });

  it("tolerates missing padding", () => {
    expect(decodeText("SGVsbG8sIFdvcmxkIQ")).toBe("Hello, World!");
  });

  it("throws on invalid characters", () => {
    expect(() => base64ToBytes("not*base64")).toThrow("Invalid Base64");
  });
});

describe("URL safe variant", () => {
  it("swaps the alphabet and strips padding", () => {
    const standard = bytesToBase64(new Uint8Array([251, 255]));
    expect(standard).toBe("+/8=");
    expect(toUrlSafe(standard)).toBe("-_8");
  });

  it("round trips through the URL safe alphabet", () => {
    const text = "subjects?_d=1&x=>>>";
    const urlSafe = toUrlSafe(encodeText(text));
    expect(urlSafe).not.toMatch(/[+/=]/);
    expect(decodeText(fromUrlSafe(urlSafe))).toBe(text);
  });
});
