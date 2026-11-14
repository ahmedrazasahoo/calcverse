/**
 * Completeness gate for the CalcVerse guides: every GOLD keyword post must
 * be a full long-form article (1,500 to 2,500 body words), with key points, FAQs,
 * real internal links including one to its matching tool, sane meta lengths
 * and no em dash anywhere. If a post ships thin or mislinked, this fails.
 */
import { describe, expect, it } from "vitest";

import {
  getGuide,
  guideInternalLinks,
  guideToolPath,
  guideWordCount,
  guides,
} from "@/lib/guides";
import { getTool } from "@/lib/tools";

const EM_DASH = "—";

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(allStrings);
  return [];
}

describe("guides registry", () => {
  it("has one post per GOLD keyword row (30 + 40)", () => {
    expect(guides.length).toBe(70);
  });

  it("has unique slugs", () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe.each(guides.map((g) => [g.slug, g] as const))("guide %s", (_slug, post) => {
  it("has 1,500 to 2,500 words of main body", () => {
    expect(guideWordCount(post)).toBeGreaterThanOrEqual(1500);
    expect(guideWordCount(post)).toBeLessThanOrEqual(2500);
  });

  it("has 4 to 6 key points and 5 to 8 sections", () => {
    expect(post.keyPoints.length).toBeGreaterThanOrEqual(4);
    expect(post.keyPoints.length).toBeLessThanOrEqual(6);
    expect(post.sections.length).toBeGreaterThanOrEqual(5);
    expect(post.sections.length).toBeLessThanOrEqual(8);
  });

  it("has at least one practical element (table or steps)", () => {
    const hasPractical = post.sections.some((s) => s.table || (s.steps && s.steps.length > 0));
    expect(hasPractical).toBe(true);
  });

  it("has 4 to 6 FAQs with real answers", () => {
    expect(post.faqs.length).toBeGreaterThanOrEqual(4);
    expect(post.faqs.length).toBeLessThanOrEqual(6);
    for (const faq of post.faqs) {
      expect(faq.q.trim().length).toBeGreaterThan(0);
      expect(faq.a.trim().length).toBeGreaterThan(30);
    }
  });

  it("links to its tool and at least 4 internal links overall", () => {
    const links = guideInternalLinks(post);
    expect(links.length).toBeGreaterThanOrEqual(4);
    expect(links).toContain(guideToolPath(post));
    const tool = getTool(post.toolSlug);
    expect(tool).toBeDefined();
    expect(tool?.status).toBe("live");
  });

  it("has sane meta lengths", () => {
    expect(post.metaTitle.length).toBeGreaterThanOrEqual(45);
    expect(post.metaTitle.length).toBeLessThanOrEqual(65);
    expect(post.metaDescription.length).toBeGreaterThanOrEqual(140);
    expect(post.metaDescription.length).toBeLessThanOrEqual(170);
  });

  it("has related slugs that all exist", () => {
    expect(post.relatedSlugs.length).toBeGreaterThanOrEqual(2);
    for (const slug of post.relatedSlugs) {
      expect(getGuide(slug), `related guide ${slug}`).toBeDefined();
      expect(slug).not.toBe(post.slug);
    }
  });

  it("contains no em dash anywhere", () => {
    for (const text of allStrings(post)) {
      expect(text).not.toContain(EM_DASH);
    }
  });

  it("has an excerpt and a keyword", () => {
    expect(post.excerpt.trim().length).toBeGreaterThan(40);
    expect(post.keyword.trim().length).toBeGreaterThan(0);
    expect(post.title.trim().length).toBeGreaterThan(0);
  });
});
