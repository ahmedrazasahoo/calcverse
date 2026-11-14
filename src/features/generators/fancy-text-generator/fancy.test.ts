import { describe, expect, it } from "vitest";
import { FANCY_STYLES, getFancyStyle, transformText } from "./fancy";

describe("transformText", () => {
  it("maps bold letters and digits to the mathematical bold block", () => {
    expect(transformText("Abc 123", "bold")).toBe("𝐀𝐛𝐜 𝟏𝟐𝟑");
  });

  it("maps monospace letters and digits to the monospace block", () => {
    expect(transformText("Abc 123", "monospace")).toBe("𝙰𝚋𝚌 𝟷𝟸𝟹");
  });

  it("uses the code points the spec block assigns, checked numerically", () => {
    const boldA = transformText("A", "bold");
    expect([...boldA][0].codePointAt(0)).toBe(0x1d400);
    const monoDigit = transformText("1", "monospace");
    expect([...monoDigit][0].codePointAt(0)).toBe(0x1d7f7);
  });

  it("passes characters without a mapping through unchanged", () => {
    expect(transformText("Hi! @#%", "bold")).toBe("𝐇𝐢! @#%");
    // Negative circled and squared have no lowercase forms in Unicode.
    expect(transformText("abc", "negativeCircled")).toBe("abc");
    expect(transformText("abc 123", "squared")).toBe("abc 123");
    // Small caps has no lookalike for x, so it stays as it is.
    expect(transformText("x", "smallCaps")).toBe("x");
    // Superscript has no small q, so it stays as it is.
    expect(transformText("q", "superscript")).toBe("q");
  });

  it("fills the italic h from the letterlike block instead of leaving a gap", () => {
    expect(transformText("h", "italic")).toBe("ℎ");
    expect(transformText("ghi", "italic")).toBe("𝑔ℎ𝑖");
  });

  it("keeps script words whole, using letterlike capitals where Unicode puts them", () => {
    expect(transformText("BE", "script")).toBe("ℬℰ");
    expect(transformText("ego", "script")).toBe("ℯℊℴ");
  });

  it("maps circled letters and digits, including the special zero", () => {
    expect(transformText("Az0", "circled")).toBe("Ⓐⓩ⓪");
    expect(transformText("19", "circled")).toBe("①⑨");
  });

  it("leaves digits plain in styles that have no styled digits", () => {
    expect(transformText("a1", "italic")).toBe("𝑎1");
    expect(transformText("A2", "fraktur")).toBe("𝔄2");
  });

  it("handles empty input and multi word text", () => {
    expect(transformText("", "bold")).toBe("");
    expect(transformText("Hi there", "sansBold")).toBe("𝗛𝗶 𝘁𝗵𝗲𝗿𝗲");
  });
});

describe("FANCY_STYLES table", () => {
  it("lists all fifteen styles with unique ids", () => {
    expect(FANCY_STYLES).toHaveLength(15);
    expect(new Set(FANCY_STYLES.map((s) => s.id)).size).toBe(15);
  });

  it("getFancyStyle throws for an unknown id", () => {
    // @ts-expect-error deliberately invalid id
    expect(() => getFancyStyle("zalgo")).toThrow();
  });
});
