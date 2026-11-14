import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "PPF Calculator: Public Provident Fund Maturity in 15 Years and Beyond",
  metaDescription:
    "See what a Public Provident Fund account can become. Enter a yearly deposit up to 150000, the current rate and a period from 15 years upward, and view deposits, interest and maturity with a full yearly table.",
  intro:
    "The Public Provident Fund is built for patience: a government backed account, a yearly deposit you choose, and interest that quietly compounds for fifteen years or more. This calculator assumes you put the full yearly amount in right at the start of the financial year, which is the habit that squeezes the most interest out of every deposit.",
};

export const content: ToolContent = {
  seoTitle: "PPF Calculator: Public Provident Fund Maturity in 15 Years and Beyond",
  howTo: [
    "Enter the amount you plan to put into your PPF account each year, up to the yearly limit of 150000.",
    "Keep the prefilled rate or change it if you want to test what a future rate change would do to the outcome.",
    "Set the period. Fifteen years is the standard term, and you can extend in blocks of five years, up to fifty years in this calculator.",
    "Read the maturity value and the yearly table. Notice how the yearly interest credit grows as the balance gets larger.",
  ],
  explanationTitle: "How PPF interest builds year by year",
  explanation: [
    "PPF interest is worked out on the balance in the account and credited once a year. The timing of your deposit inside the year matters a lot: money deposited by 5 April earns interest for the whole financial year, while money that arrives later earns for fewer months. To keep the picture clear and to reward the best habit, this calculator assumes the full yearly deposit lands at the start of the financial year. Each year the interest is simply the opening balance plus that year deposit, multiplied by the rate, and the result is added to the account before the next year begins.",
    "Put in the maximum 150000 a year at 7.1 percent and the first year alone credits 10650 in interest. By the later years of a fifteen year term, the yearly credit is many times larger, because it is calculated on a balance that already holds years of deposits and years of interest. Over the full fifteen years you deposit 2250000 of your own money, and the interest added on top is a substantial share of the final amount. Extend the account in five year blocks without withdrawing, and that effect keeps compounding.",
    "PPF sits in a rare category in India: the deposit can qualify for a tax deduction, the interest is tax free, and the maturity amount is tax free as well, subject to the rules in force. That triple benefit, plus a sovereign backing, is why it remains a core long term holding for retirement and for goals like a child education fund, even though the money is locked in for a long stretch with only limited partial withdrawals along the way. Rates are reviewed by the government, so treat any single rate here as a planning assumption rather than a promise.",
  ],
  faqs: [
    {
      q: "What is the maximum I can deposit in PPF in one year?",
      a: "The limit is 150000 per financial year across your PPF accounts. Depositing more than that in a year does not earn extra benefit, so this calculator caps the yearly deposit at that limit.",
    },
    {
      q: "Why does this calculator assume the deposit is made in April?",
      a: "Interest is calculated month by month on the lowest balance between the fifth day and the end of the month. A deposit made by 5 April earns for all twelve months of the year. Depositing early is the simplest way to earn the most, so the calculator models that best case habit.",
    },
    {
      q: "How long does a PPF account last, and can I extend it?",
      a: "The standard term is 15 years. After that you can extend the account in blocks of 5 years at a time, with or without fresh deposits, and keep earning interest during the extension.",
    },
    {
      q: "Is PPF interest really tax free?",
      a: "Under the rules that have applied for many years, the interest and the maturity amount are exempt from tax, and deposits can count toward the popular deduction limit. Tax rules can change, so confirm the current position for your own situation.",
    },
    {
      q: "What rate should I use for planning?",
      a: "Use the rate currently notified for PPF, which is 7.1 percent in recent quarters, and remember it is reviewed regularly. Testing a slightly lower rate as well gives you a cautious range instead of a single fragile number.",
    },
  ],
};
