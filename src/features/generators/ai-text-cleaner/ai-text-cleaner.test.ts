import { describe, expect, it } from "vitest";
import { cleanAiText, dashReplacement, fixDashPunctuation, removeInvisibleCharacters, stripMarkdownSymbols } from "./ai-text-cleaner";

describe("dashReplacement", () => {
  it("uses a comma for a lowercase continuation and a full stop before a capital", () => {
    expect(dashReplacement("the result held")).toBe(", ");
    expect(dashReplacement("Then it changed")).toBe(". ");
    expect(dashReplacement("")).toBe(", ");
  });
});

describe("fixDashPunctuation", () => {
  it("replaces spaced em dashes by context", () => {
    const outcome = fixDashPunctuation("The plan worked — the team shipped on time.");
    expect(outcome.text).toBe("The plan worked, the team shipped on time.");
    expect(outcome.count).toBe(1);
  });

  it("starts a new sentence when a capital follows", () => {
    const outcome = fixDashPunctuation("It rained all morning — Nobody expected the match to start.");
    expect(outcome.text).toBe("It rained all morning. Nobody expected the match to start.");
  });

  it("turns a line leading dash into a plain bullet", () => {
    const outcome = fixDashPunctuation("Points:\n— First item");
    expect(outcome.text).toBe("Points:\n- First item");
  });
});

describe("removeInvisibleCharacters", () => {
  it("strips zero width and soft hyphen characters", () => {
    const dirty = "hel\u200Blo\u200C wor\u00ADld\uFEFF";
    const outcome = removeInvisibleCharacters(dirty);
    expect(outcome.text).toBe("hello world");
    expect(outcome.count).toBe(4);
  });
});

describe("stripMarkdownSymbols", () => {
  it("removes headings, bold, links and code ticks while keeping words", () => {
    const md = "# Title\n\nThis is **bold** and a [link](https://example.com) with `code`.";
    const outcome = stripMarkdownSymbols(md);
    expect(outcome.text).toBe("Title\n\nThis is bold and a link with code.");
    expect(outcome.count).toBeGreaterThanOrEqual(4);
  });

  it("keeps image alt text and drops the image syntax", () => {
    const outcome = stripMarkdownSymbols("![a cat](cat.png) sat.");
    expect(outcome.text).toBe("a cat sat.");
  });
});

describe("cleanAiText", () => {
  it("runs the full pipeline with default options", () => {
    const input = "## Report\n\nThe tool is fast\u200B — it saves **real** time.\n\n\n\nDone.";
    const result = cleanAiText(input);
    expect(result.text).not.toContain("—");
    expect(result.text).not.toContain("**");
    expect(result.text).not.toContain("\u200B");
    expect(result.text).toContain("Report");
    expect(result.text).not.toContain("\n\n\n");
    expect(result.stats.dashesFixed).toBe(1);
    expect(result.stats.invisibleRemoved).toBe(1);
    expect(result.stats.markdownStripped).toBeGreaterThanOrEqual(2);
  });

  it("respects options being switched off", () => {
    const result = cleanAiText("a — b", { fixDashes: false, removeInvisible: true, stripMarkdown: true, tidyBlankLines: true });
    expect(result.text).toBe("a — b");
    expect(result.stats.dashesFixed).toBe(0);
  });
});
