import { describe, expect, it } from "vitest";
import { buildDocumentXml, escapeXml, groupTextItems } from "./pdf-to-word";

describe("escapeXml", () => {
  it("escapes all five XML special characters", () => {
    // Formula: each of & < > " ' is replaced by its XML entity.
    expect(escapeXml(`a & b <c> "d" 'e'`)).toBe(
      "a &amp; b &lt;c&gt; &quot;d&quot; &apos;e&apos;"
    );
  });

  it("leaves plain text unchanged", () => {
    expect(escapeXml("Plain line 123")).toBe("Plain line 123");
  });
});

describe("buildDocumentXml", () => {
  it("contains the escaped text, one paragraph per line", () => {
    const xml = buildDocumentXml([["Fish & Chips", "Second line"]]);
    expect(xml).toContain("Fish &amp; Chips");
    expect(xml).not.toContain("Fish & Chips");
    expect(xml.match(/<w:p>/g)).toHaveLength(2);
  });

  it("inserts a page break between pages and not after the last page", () => {
    const xml = buildDocumentXml([["Page one"], ["Page two"], ["Page three"]]);
    expect(xml.match(/w:type="page"/g)).toHaveLength(2);
    expect(xml.match(/<w:p>/g)).toHaveLength(5);
    expect(xml.indexOf("Page one")).toBeLessThan(xml.indexOf('w:type="page"'));
    expect(xml.indexOf('w:type="page"')).toBeLessThan(xml.indexOf("Page two"));
  });

  it("handles a document with no text lines", () => {
    const xml = buildDocumentXml([[]]);
    expect(xml).toContain("<w:body></w:body>");
  });
});

describe("groupTextItems", () => {
  it("groups two items on the same y into one line ordered by x", () => {
    // Items arrive out of x order; the line must read left to right.
    const lines = groupTextItems([
      { str: "world", x: 120, y: 700 },
      { str: "Hello", x: 40, y: 700 },
    ]);
    expect(lines).toEqual(["Hello world"]);
  });

  it("splits lines when y jumps, reading top line first", () => {
    const lines = groupTextItems([
      { str: "Lower line", x: 40, y: 640 },
      { str: "Upper line", x: 40, y: 700 },
    ]);
    expect(lines).toEqual(["Upper line", "Lower line"]);
  });

  it("treats a y difference under 2 points as the same line", () => {
    const lines = groupTextItems([
      { str: "same", x: 40, y: 700 },
      { str: "line", x: 100, y: 701 },
    ]);
    expect(lines).toEqual(["same line"]);
  });

  it("ends a line at an item marked hasEOL even on the same y", () => {
    const lines = groupTextItems([
      { str: "First", x: 40, y: 700, hasEOL: true },
      { str: "Second", x: 120, y: 700 },
    ]);
    expect(lines).toEqual(["First", "Second"]);
  });
});
