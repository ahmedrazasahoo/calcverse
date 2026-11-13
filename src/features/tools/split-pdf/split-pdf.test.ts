import { describe, expect, it } from "vitest";
import { parsePageRanges } from "./split-pdf";

describe("parsePageRanges", () => {
  it("parses single pages and ranges", () => {
    const result = parsePageRanges("1-3, 5, 8-10", 12);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.groups.map((g) => g.pages)).toEqual([
        [1, 2, 3],
        [5],
        [8, 9, 10],
      ]);
      expect(result.groups[0].label).toBe("pages-1-3");
      expect(result.groups[1].label).toBe("page-5");
    }
  });

  it("tolerates spaces and a single page document", () => {
    const result = parsePageRanges(" 1 ", 1);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.groups[0].pages).toEqual([1]);
  });

  it("rejects empty and malformed input", () => {
    expect(parsePageRanges("", 5).ok).toBe(false);
    expect(parsePageRanges("1,,2", 5).ok).toBe(false);
    expect(parsePageRanges("a-b", 5).ok).toBe(false);
    expect(parsePageRanges("0", 5).ok).toBe(false);
  });

  it("rejects backwards ranges and pages beyond the document", () => {
    expect(parsePageRanges("5-2", 9).ok).toBe(false);
    const beyond = parsePageRanges("1-20", 9);
    expect(beyond.ok).toBe(false);
    if (!beyond.ok) expect(beyond.error).toContain("9 pages");
  });
});
