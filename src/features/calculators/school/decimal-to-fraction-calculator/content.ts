import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Decimal to Fraction Calculator: Convert Decimals With Steps and Inch Fractions",
  metaDescription:
    "Free decimal to fraction calculator. Convert any decimal to a simplified fraction and mixed number with step by step working, plus tape measure inch fractions at 1/16, 1/32 and 1/64 precision.",
  intro:
    "Type a decimal and get the exact fraction, the mixed number and the working behind both. A denominator limit finds the closest simple fraction for long or repeating decimals, and the inch table reads the same value the way a tape measure does.",
};

export const content: ToolContent = {
  seoTitle: "Decimal to Fraction Calculator: Convert Decimals With Steps and Inch Fractions",
  howTo: [
    "Type your decimal, such as 0.75, 1.375 or 2.4375. Negative values work too.",
    "Read the exact fraction and the mixed number at the top. Terminating decimals always convert exactly.",
    "If your decimal is long or repeating, set the denominator limit and use the closest fraction shown under the main answer.",
    "Follow the numbered steps to see the power of ten method and the simplifying, exactly as it is taught in class.",
    "For woodwork and DIY, check the inch table for the nearest tape measure fraction at 1/16, 1/32 and 1/64 precision.",
  ],
  explanationTitle: "How decimals become fractions",
  explanation: [
    "Every terminating decimal is a fraction in disguise. The digits after the point sit over a power of ten chosen by how many places there are: 0.75 is 75/100, and 1.375 is 1375/1000. The only real work is simplifying, which means dividing the top and bottom by their greatest common divisor. For 75/100 that divisor is 25, giving 3/4. For 1375/1000 it is 125, giving 11/8, which reads as the mixed number 1 3/8 once the whole part is split back out.",
    "Repeating decimals are different: 0.3333 typed on a screen is not exactly one third, and its true exact fraction is 3333/10000. When a simple answer matters more than a perfect one, continued fractions find the best approximation inside a denominator limit. The method keeps building better and better fractions, called convergents, and stops at the last one the limit allows. With a limit of 100, 0.3333 lands on 1/3, and the famous approximation of pi at a limit of 10 is 22/7.",
    "The inch table solves the problem carpenters meet daily: tape measures are marked in fractions, not decimals. A cut at 2.4375 inches is exactly 2 7/16, because the part after the point is measured in sixteenths, rounded to the nearest mark, then simplified. Finer tapes mark thirty seconds and sixty fourths, which is why the same decimal can round to a slightly different fraction at each precision, and the table shows the small rounding error at each one so you can pick the cut you can actually make.",
  ],
  faqs: [
    {
      q: "How do you convert 0.75 to a fraction?",
      a: "Write it over 100 because there are two decimal places: 75/100. Divide top and bottom by their greatest common divisor, 25, and you get 3/4. The calculator shows this same working in its steps list.",
    },
    {
      q: "What is 1.375 as a fraction and a mixed number?",
      a: "As a fraction it is 11/8: 1375/1000 simplified by dividing top and bottom by 125. As a mixed number it is 1 3/8, because 11 divided by 8 is 1 with 3 left over.",
    },
    {
      q: "How do you handle a repeating decimal like 0.3333?",
      a: "The exact conversion of the digits you typed is 3333/10000, but the useful answer is the closest simple fraction. Set the denominator limit to 100 and the continued fraction method returns 1/3, which differs from 0.3333 by less than a ten thousandth.",
    },
    {
      q: "What is 2.4375 inches on a tape measure?",
      a: "Exactly 2 7/16 inches. The 0.4375 part is 7 sixteenths of an inch with no rounding at all, so it reads the same at 1/16, 1/32 and 1/64 precision.",
    },
    {
      q: "Why does the denominator limit matter?",
      a: "Without a limit, long decimals produce fractions with huge denominators that nobody can use, like 3333/10000. A limit trades a tiny amount of accuracy for a fraction you can say out loud, measure with, or use in a recipe.",
    },
  ],
};
