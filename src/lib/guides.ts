/**
 * CalcVerse Guides: long-form articles that target the GOLD keywords and
 * funnel readers to the matching tool. Content lives as data modules under
 * src/features/guides/posts/<slug>.ts, one file per post, mirroring the
 * tools pattern. This module holds the shared types, helpers and registry.
 */
import type { Faq } from "@/lib/content";
import { getTool, toolPath, type Tool } from "@/lib/tools";

import { guide as p0 } from "@/features/guides/posts/tdee-calculator";
import { guide as p1 } from "@/features/guides/posts/tip-calculator";
import { guide as p2 } from "@/features/guides/posts/compress-image-to-50kb";
import { guide as p3 } from "@/features/guides/posts/compress-image-to-20kb";
import { guide as p4 } from "@/features/guides/posts/compress-image-to-30kb";
import { guide as p5 } from "@/features/guides/posts/compress-pdf-to-100kb";
import { guide as p6 } from "@/features/guides/posts/compress-pdf-to-200kb";
import { guide as p7 } from "@/features/guides/posts/gpa-calculator";
import { guide as p8 } from "@/features/guides/posts/age-difference-calculator";
import { guide as p9 } from "@/features/guides/posts/chronological-age-calculator";
import { guide as p10 } from "@/features/guides/posts/sip-calculator";
import { guide as p11 } from "@/features/guides/posts/fd-calculator";
import { guide as p12 } from "@/features/guides/posts/home-loan-emi-calculator";
import { guide as p13 } from "@/features/guides/posts/income-tax-calculator-india-2026-27";
import { guide as p14 } from "@/features/guides/posts/uk-salary-take-home-pay";
import { guide as p15 } from "@/features/guides/posts/vat-calculator";
import { guide as p16 } from "@/features/guides/posts/ovulation-calculator";
import { guide as p17 } from "@/features/guides/posts/cgpa-to-percentage-calculator";
import { guide as p18 } from "@/features/guides/posts/percentage-increase-calculator";
import { guide as p19 } from "@/features/guides/posts/time-card-calculator";
import { guide as p20 } from "@/features/guides/posts/hours-calculator";
import { guide as p21 } from "@/features/guides/posts/pace-calculator";
import { guide as p22 } from "@/features/guides/posts/interest-calculator";
import { guide as p23 } from "@/features/guides/posts/convert-heic-webp-avif-to-jpg-png";
import { guide as p24 } from "@/features/guides/posts/ai-text-cleaner";
import { guide as p25 } from "@/features/guides/posts/pakistan-salary-tax-calculator-2026-27";
import { guide as p26 } from "@/features/guides/posts/sleep-calculator";
import { guide as p27 } from "@/features/guides/posts/binary-to-text-converter";
import { guide as p28 } from "@/features/guides/posts/zakat-calculator";
import { guide as p29 } from "@/features/guides/posts/word-counter";
import { guide as p30 } from "@/features/guides/posts/concrete-calculator";
import { guide as p31 } from "@/features/guides/posts/square-footage-calculator";
import { guide as p32 } from "@/features/guides/posts/grade-calculator";
import { guide as p33 } from "@/features/guides/posts/overtime-calculator";
import { guide as p34 } from "@/features/guides/posts/fancy-text-generator";
import { guide as p35 } from "@/features/guides/posts/sales-tax-calculator";
import { guide as p36 } from "@/features/guides/posts/json-formatter";
import { guide as p37 } from "@/features/guides/posts/tax-refund-calculator";
import { guide as p38 } from "@/features/guides/posts/no-tax-on-overtime-calculator";
import { guide as p39 } from "@/features/guides/posts/credit-card-payoff-calculator";
import { guide as p40 } from "@/features/guides/posts/username-generator";
import { guide as p41 } from "@/features/guides/posts/military-time-converter";
import { guide as p42 } from "@/features/guides/posts/period-calculator";
import { guide as p43 } from "@/features/guides/posts/macro-calculator";
import { guide as p44 } from "@/features/guides/posts/protein-calculator";
import { guide as p45 } from "@/features/guides/posts/one-rep-max-calculator";
import { guide as p46 } from "@/features/guides/posts/mulch-calculator";
import { guide as p47 } from "@/features/guides/posts/business-days-calculator";
import { guide as p48 } from "@/features/guides/posts/epoch-converter";
import { guide as p49 } from "@/features/guides/posts/no-tax-on-tips-calculator";
import { guide as p50 } from "@/features/guides/posts/decimal-to-fraction-calculator";
import { guide as p51 } from "@/features/guides/posts/standard-deviation-calculator";
import { guide as p52 } from "@/features/guides/posts/long-division-calculator";
import { guide as p53 } from "@/features/guides/posts/png-to-jpg-converter";
import { guide as p54 } from "@/features/guides/posts/jpg-to-png-converter";
import { guide as p55 } from "@/features/guides/posts/webp-to-jpg-converter";
import { guide as p56 } from "@/features/guides/posts/svg-to-png-converter";
import { guide as p57 } from "@/features/guides/posts/est-to-pst-converter";
import { guide as p58 } from "@/features/guides/posts/tile-calculator";
import { guide as p59 } from "@/features/guides/posts/gravel-calculator";
import { guide as p60 } from "@/features/guides/posts/board-foot-calculator";
import { guide as p61 } from "@/features/guides/posts/stamp-duty-calculator";
import { guide as p62 } from "@/features/guides/posts/capital-gains-tax-calculator";
import { guide as p63 } from "@/features/guides/posts/bac-calculator";
import { guide as p64 } from "@/features/guides/posts/morse-code-translator";
import { guide as p65 } from "@/features/guides/posts/barcode-generator";
import { guide as p66 } from "@/features/guides/posts/anagram-solver";
import { guide as p67 } from "@/features/guides/posts/word-unscrambler";
import { guide as p68 } from "@/features/guides/posts/uuid-generator";
import { guide as p69 } from "@/features/guides/posts/base64-encode-decode";

export const GUIDE_CATEGORIES = [
  "Finance and Tax",
  "Health",
  "School and Math",
  "Home and DIY",
  "Files and Converters",
  "Text and Dev Tools",
  "Everyday",
] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export interface GuideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideSubsection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  table?: GuideTable;
  subsections?: GuideSubsection[];
}

export interface GuidePost {
  /** URL slug under /guides/<slug>. */
  slug: string;
  /** The exact GOLD keyword this post targets. */
  keyword: string;
  /** H1 shown on the page. */
  title: string;
  /** Meta title, roughly 50 to 60 characters. */
  metaTitle: string;
  /** Meta description, roughly 150 to 160 characters. */
  metaDescription: string;
  /** One or two sentence summary used on hub cards. */
  excerpt: string;
  category: GuideCategory;
  /** Slug of the matching tool in the tools registry. */
  toolSlug: string;
  /** ISO date the post was last updated, e.g. "2026-11-14". */
  updatedAt: string;
  /** Opening paragraphs: the hook. May contain markdown style links. */
  intro: string[];
  /** 4 to 6 takeaway bullets shown in the key points box. */
  keyPoints: string[];
  /** 5 to 8 main sections. */
  sections: GuideSection[];
  /** 4 to 6 frequently asked questions. */
  faqs: Faq[];
  /** Slugs of 2 to 3 related guide posts. */
  relatedSlugs: string[];
}

export function guidePath(post: Pick<GuidePost, "slug">): string {
  return `/guides/${post.slug}`;
}

/** The tool a guide funnels readers to. */
export function guideTool(post: GuidePost): Tool {
  const tool = getTool(post.toolSlug);
  if (!tool) throw new Error(`Guide ${post.slug} references unknown tool ${post.toolSlug}`);
  return tool;
}

export function guideToolPath(post: GuidePost): string {
  return toolPath(guideTool(post));
}

/** Strip markdown link syntax down to its visible text. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function countWordsIn(text: string): number {
  const clean = plainText(text).trim();
  if (!clean) return 0;
  return clean.split(/\s+/).length;
}

function sectionTexts(section: GuideSection): string[] {
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
  return texts;
}

/** All body strings of a post, excluding metadata and FAQs. */
export function guideBodyTexts(post: GuidePost): string[] {
  return [...post.intro, ...post.keyPoints, ...post.sections.flatMap(sectionTexts)];
}

/** Word count of the main article body: intro, key points and sections. */
export function guideWordCount(post: GuidePost): number {
  return guideBodyTexts(post).reduce((sum, t) => sum + countWordsIn(t), 0);
}

/** Word count including the FAQ section. */
export function guideTotalWordCount(post: GuidePost): number {
  const faqWords = post.faqs.reduce((sum, f) => sum + countWordsIn(f.q) + countWordsIn(f.a), 0);
  return guideWordCount(post) + faqWords;
}

/** Reading time in whole minutes at 200 words per minute, minimum 1. */
export function guideReadingTime(post: GuidePost): number {
  return Math.max(1, Math.round(guideTotalWordCount(post) / 200));
}

/** Every internal link target found in the post body and FAQs. */
export function guideInternalLinks(post: GuidePost): string[] {
  const texts = [
    ...guideBodyTexts(post),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ];
  const links: string[] = [];
  const pattern = /\]\((\/[^)\s]+)\)/g;
  for (const text of texts) {
    for (const match of text.matchAll(pattern)) links.push(match[1]);
  }
  return links;
}


/** Every guide post, in GOLD list order (List 1 first, then List 2). */
export const guides: GuidePost[] = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36, p37, p38, p39, p40, p41, p42, p43, p44, p45, p46, p47, p48, p49, p50, p51, p52, p53, p54, p55, p56, p57, p58, p59, p60, p61, p62, p63, p64, p65, p66, p67, p68, p69];

const bySlug = new Map(guides.map((g) => [g.slug, g]));

export function getGuide(slug: string): GuidePost | undefined {
  return bySlug.get(slug);
}

export function guidesInCategory(category: GuideCategory): GuidePost[] {
  return guides.filter((g) => g.category === category);
}

export function relatedGuides(post: GuidePost): GuidePost[] {
  return post.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((g): g is GuidePost => Boolean(g));
}
