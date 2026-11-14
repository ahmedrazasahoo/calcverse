import { describe, expect, it } from "vitest";
import { pagesToKeep, parsePagesToRemove } from "./remove-pdf-pages";

describe("parsePagesToRemove", () => {
  it("parses a single page", () => {
    const result = parsePagesToRemove("5", 12);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.pages).toEqual([5]);
  });

  it("parses a range", () => {
    // Formula: 1-3 expands to the inclusive list 1, 2, 3.
    const result = parsePagesToRemove("1-3", 12);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.pages).toEqual([1, 2, 3]);
  });

  it("parses a mixed list, sorted, with duplicates removed", () => {
    const result = parsePagesToRemove("8-10, 2, 1-3, 2", 12);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.pages).toEqual([1, 2, 3, 8, 9, 10]);
  });

  it("rejects a page beyond the document", () => {
    const result = parsePagesToRemove("1-20", 9);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("9 pages");
  });

  it("rejects a backwards range", () => {
    const result = parsePagesToRemove("5-2", 9);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain("backwards");
  });

  it("rejects empty and malformed input", () => {
    expect(parsePagesToRemove("", 5).ok).toBe(false);
    expect(parsePagesToRemove("a-b", 5).ok).toBe(false);
    expect(parsePagesToRemove("0", 5).ok).toBe(false);
  });

  it("rejects removing every page", () => {
    const all = parsePagesToRemove("1-4", 4);
    expect(all.ok).toBe(false);
    if (!all.ok) {
      expect(all.error).toBe("That would remove every page. Keep at least one page.");
    }
    const listed = parsePagesToRemove("1, 2, 3", 3);
    expect(listed.ok).toBe(false);
  });
});

describe("pagesToKeep", () => {
  it("returns every page except the removed ones, in original order", () => {
    // Formula: kept = all pages from 1 to pageCount, minus the remove set.
    expect(pagesToKeep(6, [2, 5])).toEqual([1, 3, 4, 6]);
  });

  it("keeps everything when nothing is removed", () => {
    expect(pagesToKeep(3, [])).toEqual([1, 2, 3]);
  });

  it("ignores duplicates in the remove set", () => {
    expect(pagesToKeep(4, [3, 3])).toEqual([1, 2, 4]);
  });
});
