/**
 * Content completeness gate for every live tool page (brief item F):
 * each module must ship how-to steps, a plain explainer and at least
 * three tool-specific FAQs. If a new tool goes live without full
 * content, this suite fails.
 */
import { describe, expect, it } from "vitest";

import { content as c0 } from "@/features/calculators/age-calculator/content";
import { content as c1 } from "@/features/calculators/age-difference-calculator/content";
import { content as c2 } from "@/features/calculators/health/bmi-calculator/content";
import { content as c3 } from "@/features/calculators/health/bmr-calculator/content";
import { content as c4 } from "@/features/calculators/health/body-fat-calculator/content";
import { content as c5 } from "@/features/calculators/health/calorie-calculator/content";
import { content as c6 } from "@/features/calculators/school/cgpa-to-percentage-calculator/content";
import { content as c7 } from "@/features/calculators/finance/compound-interest-calculator/content";
import { content as c8 } from "@/features/calculators/everyday/date-calculator/content";
import { content as c9 } from "@/features/calculators/everyday/discount-calculator/content";
import { content as c10 } from "@/features/calculators/health/due-date-calculator/content";
import { content as c11 } from "@/features/calculators/finance/emi-calculator/content";
import { content as c12 } from "@/features/calculators/finance/fd-calculator/content";
import { content as c13 } from "@/features/calculators/gpa-calculator/content";
import { content as c14 } from "@/features/calculators/tax/gst-calculator/content";
import { content as c15 } from "@/features/calculators/everyday/hours-calculator/content";
import { content as c16 } from "@/features/calculators/health/ideal-weight-calculator/content";
import { content as c17 } from "@/features/calculators/tax/india-income-tax-calculator/content";
import { content as c18 } from "@/features/calculators/finance/loan-calculator/content";
import { content as c19 } from "@/features/calculators/finance/mortgage-calculator/content";
import { content as c20 } from "@/features/calculators/health/ovulation-calculator/content";
import { content as c21 } from "@/features/calculators/everyday/pace-calculator/content";
import { content as c22 } from "@/features/calculators/tax/pakistan-salary-tax-calculator/content";
import { content as c23 } from "@/features/calculators/percentage-calculator/content";
import { content as c24 } from "@/features/calculators/finance/sip-calculator/content";
import { content as c25 } from "@/features/calculators/health/sleep-calculator/content";
import { content as c26 } from "@/features/calculators/tdee-calculator/content";
import { content as c27 } from "@/features/calculators/tip-calculator/content";
import { content as c28 } from "@/features/calculators/tax/uk-salary-calculator/content";
import { content as c29 } from "@/features/calculators/health/water-intake-calculator/content";
import { content as c30 } from "@/features/calculators/tax/zakat-calculator/content";
import { content as c31 } from "@/features/converters/binary-converter/content";
import { content as c32 } from "@/features/converters/roman-numeral-converter/content";
import { content as c33 } from "@/features/converters/shoe-size-converter/content";
import { content as c34 } from "@/features/generators/word-counter/content";
import { content as c35 } from "@/features/generators/ai-text-cleaner/content";
import { content as c36 } from "@/features/generators/password-generator/content";
import { content as c37 } from "@/features/generators/qr-code-generator/content";
import { content as c38 } from "@/features/converters/typing-test/content";
import { content as c39 } from "@/features/tools/compress-image-to-100kb/content";
import { content as c40 } from "@/features/tools/compress-image-to-200kb/content";
import { content as c41 } from "@/features/tools/compress-image-to-20kb/content";
import { content as c42 } from "@/features/tools/compress-image-to-50kb/content";
import { content as c43 } from "@/features/tools/compress-image/content";
import { content as c44 } from "@/features/tools/compress-pdf-to-100kb/content";
import { content as c45 } from "@/features/tools/compress-pdf-to-200kb/content";
import { content as c46 } from "@/features/tools/compress-pdf-to-50kb/content";
import { content as c47 } from "@/features/tools/compress-pdf/content";
import { content as c48 } from "@/features/tools/heic-to-jpg/content";
import { content as c49 } from "@/features/tools/jpg-to-pdf/content";
import { content as c50 } from "@/features/tools/merge-pdf/content";
import { content as c51 } from "@/features/tools/pdf-to-jpg/content";
import { content as c52 } from "@/features/tools/rotate-pdf/content";
import { content as c53 } from "@/features/tools/split-pdf/content";
import { content as c54 } from "@/features/tools/webp-to-png/content";

const modules: { route: string; content: {
  howTo: string[];
  explanationTitle: string;
  explanation: string[];
  faqs: { q: string; a: string }[];
} }[] = [
  { route: "/calculators/age-calculator", content: c0 },
  { route: "/calculators/age-difference-calculator", content: c1 },
  { route: "/calculators/bmi-calculator", content: c2 },
  { route: "/calculators/bmr-calculator", content: c3 },
  { route: "/calculators/body-fat-calculator", content: c4 },
  { route: "/calculators/calorie-calculator", content: c5 },
  { route: "/calculators/cgpa-to-percentage-calculator", content: c6 },
  { route: "/calculators/compound-interest-calculator", content: c7 },
  { route: "/calculators/date-calculator", content: c8 },
  { route: "/calculators/discount-calculator", content: c9 },
  { route: "/calculators/due-date-calculator", content: c10 },
  { route: "/calculators/emi-calculator", content: c11 },
  { route: "/calculators/fd-calculator", content: c12 },
  { route: "/calculators/gpa-calculator", content: c13 },
  { route: "/calculators/gst-calculator", content: c14 },
  { route: "/calculators/hours-calculator", content: c15 },
  { route: "/calculators/ideal-weight-calculator", content: c16 },
  { route: "/calculators/india-income-tax-calculator", content: c17 },
  { route: "/calculators/loan-calculator", content: c18 },
  { route: "/calculators/mortgage-calculator", content: c19 },
  { route: "/calculators/ovulation-calculator", content: c20 },
  { route: "/calculators/pace-calculator", content: c21 },
  { route: "/calculators/pakistan-salary-tax-calculator", content: c22 },
  { route: "/calculators/percentage-calculator", content: c23 },
  { route: "/calculators/sip-calculator", content: c24 },
  { route: "/calculators/sleep-calculator", content: c25 },
  { route: "/calculators/tdee-calculator", content: c26 },
  { route: "/calculators/tip-calculator", content: c27 },
  { route: "/calculators/uk-salary-calculator", content: c28 },
  { route: "/calculators/water-intake-calculator", content: c29 },
  { route: "/calculators/zakat-calculator", content: c30 },
  { route: "/converters/binary-converter", content: c31 },
  { route: "/converters/roman-numeral-converter", content: c32 },
  { route: "/converters/shoe-size-converter", content: c33 },
  { route: "/converters/word-counter", content: c34 },
  { route: "/generators/ai-text-cleaner", content: c35 },
  { route: "/generators/password-generator", content: c36 },
  { route: "/generators/qr-code-generator", content: c37 },
  { route: "/generators/typing-test", content: c38 },
  { route: "/tools/compress-image-to-100kb", content: c39 },
  { route: "/tools/compress-image-to-200kb", content: c40 },
  { route: "/tools/compress-image-to-20kb", content: c41 },
  { route: "/tools/compress-image-to-50kb", content: c42 },
  { route: "/tools/compress-image", content: c43 },
  { route: "/tools/compress-pdf-to-100kb", content: c44 },
  { route: "/tools/compress-pdf-to-200kb", content: c45 },
  { route: "/tools/compress-pdf-to-50kb", content: c46 },
  { route: "/tools/compress-pdf", content: c47 },
  { route: "/tools/heic-to-jpg", content: c48 },
  { route: "/tools/jpg-to-pdf", content: c49 },
  { route: "/tools/merge-pdf", content: c50 },
  { route: "/tools/pdf-to-jpg", content: c51 },
  { route: "/tools/rotate-pdf", content: c52 },
  { route: "/tools/split-pdf", content: c53 },
  { route: "/tools/webp-to-png", content: c54 },
];

describe("live tool content completeness", () => {
  it("covers all 55 live tools", () => {
    expect(modules.length).toBe(55);
  });

  it.each(modules)("$route has steps, an explainer and at least 3 FAQs", ({ content }) => {
    expect(content.howTo.length).toBeGreaterThanOrEqual(3);
    for (const step of content.howTo) expect(step.trim().length).toBeGreaterThan(0);
    expect(content.explanationTitle.trim().length).toBeGreaterThan(0);
    expect(content.explanation.length).toBeGreaterThanOrEqual(1);
    for (const para of content.explanation) expect(para.trim().length).toBeGreaterThan(0);
    expect(content.faqs.length).toBeGreaterThanOrEqual(3);
    for (const faq of content.faqs) {
      expect(faq.q.trim().length).toBeGreaterThan(0);
      expect(faq.a.trim().length).toBeGreaterThan(0);
    }
  });
});
