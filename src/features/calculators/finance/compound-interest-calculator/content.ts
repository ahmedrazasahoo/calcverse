import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Compound Interest Calculator: Growth With Monthly Contributions",
  metaDescription:
    "Watch compound interest do its quiet work. Enter a starting amount, rate and years, add an optional monthly contribution, and see the final balance with a year by year growth table.",
  intro:
    "Compound interest is the reason small, early savings beat large, late ones. Your returns start earning their own returns, and growth snowballs. This calculator shows the snowball forming, year by year, with or without a monthly top up.",
};

export const content: ToolContent = {
  seoTitle: "Compound Interest Calculator: Growth With Monthly Contributions",
  howTo: [
    "Enter your starting amount. You can start from zero if you plan to save monthly instead.",
    "Set the yearly interest rate you expect to earn.",
    "Choose how many years the money stays invested and how often interest compounds.",
    "Add a monthly contribution if you plan to keep adding, then read the final balance and the year by year table.",
  ],
  explanationTitle: "How compound interest works",
  explanation: [
    "Simple interest pays only on your original amount. Compound interest pays on the amount plus every bit of interest already earned. The classic formula is A equals P times (1 plus r divided by n) raised to the power of n times t, where r is the yearly rate, n is how many times a year interest is added, and t is the number of years. This calculator simulates period by period, which lets it include monthly contributions on any compounding schedule.",
    "Compounding frequency matters, but less than people expect. At 10 percent over five years, daily compounding beats yearly compounding by only a modest margin. Time and the contribution habit matter far more. Doubling your years more than doubles your interest, because the curve bends upward.",
    "Here is the intuition worth keeping: at 8 percent, money doubles in about nine years. At 12 percent, in about six. That is the rule of 72: divide 72 by your rate to estimate the doubling time. Use this calculator to test your own rate and horizon, and notice how the interest earned eventually overtakes everything you put in. That crossover point is when compounding starts working harder than you do.",
  ],
  faqs: [
    {
      q: "What is the difference between simple and compound interest?",
      a: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest, so growth accelerates over time instead of staying flat.",
    },
    {
      q: "How does compounding frequency change the result?",
      a: "More frequent compounding gives a slightly higher final balance, because interest starts earning interest sooner. The effect is real but small compared with a higher rate or a longer time period.",
    },
    {
      q: "What is the rule of 72?",
      a: "Divide 72 by your yearly interest rate to estimate how many years money takes to double. At 8 percent it is about nine years, at 12 percent about six years. It is an approximation, but a remarkably handy one.",
    },
    {
      q: "Can I start with zero and only add monthly?",
      a: "Yes. Set the starting amount to zero and enter a monthly contribution. The calculator builds your balance purely from contributions and the interest they gather.",
    },
    {
      q: "Why does my money seem to grow slowly at first, then fast?",
      a: "Because interest is a percentage of the current balance. A small balance earns small interest in absolute terms. As the balance grows, the same percentage produces bigger and bigger amounts, which is the whole power of compounding.",
    },
  ],
};
