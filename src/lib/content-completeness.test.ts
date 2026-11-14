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
import { content as c55 } from "@/features/calculators/finance/simple-interest-calculator/content";
import { content as c56 } from "@/features/calculators/finance/rd-calculator/content";
import { content as c57 } from "@/features/calculators/finance/ppf-calculator/content";
import { content as c58 } from "@/features/calculators/finance/nps-calculator/content";
import { content as c59 } from "@/features/calculators/finance/retirement-calculator/content";
import { content as c60 } from "@/features/calculators/finance/gratuity-calculator/content";
import { content as c61 } from "@/features/calculators/health/pregnancy-calculator/content";
import { content as c62 } from "@/features/calculators/health/conception-calculator/content";
import { content as c63 } from "@/features/calculators/school/fraction-calculator/content";
import { content as c64 } from "@/features/calculators/school/square-root-calculator/content";
import { content as c65 } from "@/features/calculators/school/ratio-calculator/content";
import { content as c66 } from "@/features/calculators/school/average-calculator/content";
import { content as c67 } from "@/features/calculators/everyday/percentage-increase-calculator/content";
import { content as c68 } from "@/features/calculators/everyday/percentage-decrease-calculator/content";
import { content as c69 } from "@/features/calculators/everyday/time-calculator/content";
import { content as c70 } from "@/features/calculators/everyday/love-calculator/content";
import { content as c71 } from "@/features/calculators/everyday/fuel-cost-calculator/content";
import { content as c72 } from "@/features/calculators/everyday/electricity-bill-calculator/content";
import { content as c73 } from "@/features/calculators/tax/income-tax-calculator/content";
import { content as c74 } from "@/features/calculators/tax/salary-calculator/content";
import { content as c75 } from "@/features/calculators/tax/vat-calculator/content";
import { content as c76 } from "@/features/calculators/tax/hra-calculator/content";
import { content as c77 } from "@/features/tools/compress-pdf-to-300kb/content";
import { content as c78 } from "@/features/tools/compress-pdf-to-500kb/content";
import { content as c79 } from "@/features/tools/compress-image-to-30kb/content";
import { content as c80 } from "@/features/tools/avif-to-jpg/content";
import { content as c81 } from "@/features/tools/pdf-to-word/content";
import { content as c82 } from "@/features/tools/resize-image/content";
import { content as c83 } from "@/features/tools/remove-pdf-pages/content";
import { content as c84 } from "@/features/converters/character-counter/content";
import { content as c85 } from "@/features/converters/case-converter/content";

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
  { route: "/calculators/simple-interest-calculator", content: c55 },
  { route: "/calculators/rd-calculator", content: c56 },
  { route: "/calculators/ppf-calculator", content: c57 },
  { route: "/calculators/nps-calculator", content: c58 },
  { route: "/calculators/retirement-calculator", content: c59 },
  { route: "/calculators/gratuity-calculator", content: c60 },
  { route: "/calculators/pregnancy-calculator", content: c61 },
  { route: "/calculators/conception-calculator", content: c62 },
  { route: "/calculators/fraction-calculator", content: c63 },
  { route: "/calculators/square-root-calculator", content: c64 },
  { route: "/calculators/ratio-calculator", content: c65 },
  { route: "/calculators/average-calculator", content: c66 },
  { route: "/calculators/percentage-increase-calculator", content: c67 },
  { route: "/calculators/percentage-decrease-calculator", content: c68 },
  { route: "/calculators/time-calculator", content: c69 },
  { route: "/calculators/love-calculator", content: c70 },
  { route: "/calculators/fuel-cost-calculator", content: c71 },
  { route: "/calculators/electricity-bill-calculator", content: c72 },
  { route: "/calculators/income-tax-calculator", content: c73 },
  { route: "/calculators/salary-calculator", content: c74 },
  { route: "/calculators/vat-calculator", content: c75 },
  { route: "/calculators/hra-calculator", content: c76 },
  { route: "/tools/compress-pdf-to-300kb", content: c77 },
  { route: "/tools/compress-pdf-to-500kb", content: c78 },
  { route: "/tools/compress-image-to-30kb", content: c79 },
  { route: "/tools/avif-to-jpg", content: c80 },
  { route: "/tools/pdf-to-word", content: c81 },
  { route: "/tools/resize-image", content: c82 },
  { route: "/tools/remove-pdf-pages", content: c83 },
  { route: "/converters/character-counter", content: c84 },
  { route: "/converters/case-converter", content: c85 },
];

describe("live tool content completeness", () => {
  it("covers all 86 live tools", () => {
    expect(modules.length).toBe(86);
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
