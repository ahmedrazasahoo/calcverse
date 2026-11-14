/**
 * TEMPORARY measurement helper (not part of the suite): prints per-post
 * body word counts using the same guideWordCount logic as guides.test.ts,
 * with a per-part breakdown so trims can be targeted.
 */
import { it } from "vitest";

import {
  guideBodyTexts,
  guideInternalLinks,
  guideWordCount,
  guides,
  plainText,
  type GuidePost,
  type GuideSection,
} from "@/lib/guides";

function words(text: string): number {
  const clean = plainText(text).trim();
  if (!clean) return 0;
  return clean.split(/\s+/).length;
}

function sectionWords(section: GuideSection): number {
  const texts: string[] = [section.heading, ...section.paragraphs];
  if (section.bullets) texts.push(...section.bullets);
  if (section.steps) texts.push(...section.steps);
  if (section.table) {
    if (section.table.caption) texts.push(section.table.caption);
    texts.push(...section.table.headers, ...section.table.rows.flat());
  }
  for (const sub of section.subsections ?? []) {
    texts.push(sub.heading, ...sub.paragraphs);
    if (sub.bullets) texts.push(...sub.bullets);
  }
  return texts.reduce((s, t) => s + words(t), 0);
}

export function measure(post: GuidePost) {
  return {
    slug: post.slug,
    total: guideWordCount(post),
    intro: post.intro.reduce((s, t) => s + words(t), 0),
    keyPoints: post.keyPoints.reduce((s, t) => s + words(t), 0),
    sections: post.sections.map((s) => ({ heading: s.heading, words: sectionWords(s) })),
    sectionCount: post.sections.length,
    faqCount: post.faqs.length,
    links: guideInternalLinks(post),
    bodyTexts: guideBodyTexts(post).length,
  };
}

it("measures all guides", () => {
  for (const post of guides) {
    const m = measure(post);
    console.log(
      `MEASURE ${m.slug} total=${m.total} intro=${m.intro} keyPoints=${m.keyPoints} sections=${m.sectionCount} faqs=${m.faqCount} links=${m.links.length}`,
    );
    for (const s of m.sections) {
      console.log(`  SECTION ${s.words} :: ${s.heading}`);
    }
    console.log(`  LINKS ${JSON.stringify(m.links)}`);
  }
});
