import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Square Root Calculator: Roots, Simplified Form and Steps",
  metaDescription:
    "Find the square root of any number, see it in simplified radical form, and follow prime factor steps that show exactly how the answer is built.",
  intro:
    "A square root answers a simple question: what number, multiplied by itself, gives this one? This calculator gives the decimal answer, tidies whole numbers into their simplest radical form, and shows the prime factor working behind it, the way it is taught in class.",
};

export const content: ToolContent = {
  seoTitle: "Square Root Calculator: Roots, Simplified Form and Steps",
  howTo: [
    "Type the number you want the square root of. It can be a whole number or a decimal, as long as it is zero or more.",
    "Read the square root card for the decimal answer, shown to six decimal places.",
    "Check the simplified form card. For whole numbers it shows the tidy radical version, like 6 root 2 for the root of 72.",
    "Follow the working steps under the results to see the prime factor pairs that produced the answer.",
    "Use the perfect square card to see whether the root is a whole number, and which perfect squares your number sits between when it is not.",
  ],
  explanationTitle: "How simplifying a square root works",
  explanation: [
    "Every whole number can be broken into prime factors, the smallest building blocks of multiplication. For a square root, the useful trick is pairing: whenever two identical prime factors appear, one copy of that factor can step outside the root sign. Whatever is left without a partner stays inside. The root of 72 is the classic example. Since 72 splits into 2, 2, 2, 3 and 3, the pair of 2s and the pair of 3s come out as 2 and 3, and one lonely 2 remains inside, giving 6 root 2. Multiply it back out and 6 root 2 squared is 36 times 2, which is 72 again.",
    "Perfect squares are the tidy special case where nothing is left inside at all. Numbers like 49, 144 and 400 have whole number roots because their prime factors pair up completely. Most numbers are not like that, and their roots are decimals that never end or repeat in a pattern. That is why the simplified radical form matters in school work: 6 root 2 is the exact answer, while 8.485281 is only a rounded snapshot of it.",
    "Square roots also run in reverse throughout everyday maths. The side of a square garden with a known area is the root of that area. The distance formula in geometry, the standard deviation in statistics and the quadratic formula all lean on roots. Knowing which perfect squares a number sits between is a practical estimation skill too: the root of 50 must live between 7 and 8, because 50 sits between 49 and 64, and a quick check like that catches most calculator slips before they cost marks.",
  ],
  faqs: [
    {
      q: "How do I find the square root of a number by hand?",
      a: "Break the number into prime factors, pair up identical factors, bring one from each pair outside the root, and leave any unpaired factor inside. For 72 the factors are 2, 2, 2, 3 and 3, so the answer is 2 times 3 times root 2, written as 6 root 2.",
    },
    {
      q: "What is a perfect square?",
      a: "A perfect square is a whole number whose square root is also a whole number, like 36 (root 6), 81 (root 9) and 144 (root 12). You make one by multiplying a whole number by itself.",
    },
    {
      q: "Why does the calculator show both a decimal and a simplified form?",
      a: "The decimal is easy to use in measurements and money, but it is rounded. The simplified radical form is exact, and most school exams ask for that exact form, so the page shows both.",
    },
    {
      q: "Can I find the square root of a negative number?",
      a: "Not in real numbers. No real number multiplied by itself ever gives a negative result, so negative inputs are rejected here. Negative roots belong to a later topic called complex numbers.",
    },
    {
      q: "What is the square root of zero?",
      a: "Zero. It is the one number that is its own root along with 1, because 0 multiplied by 0 is 0 and 1 multiplied by 1 is 1.",
    },
  ],
};
