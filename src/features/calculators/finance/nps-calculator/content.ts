import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "NPS Calculator: Corpus, Lump Sum and Monthly Pension at 60",
  metaDescription:
    "Estimate your National Pension System outcome in India. Enter a monthly contribution and your age to see the corpus at 60, the lump sum you can withdraw and the monthly pension from the annuity.",
  intro:
    "The National Pension System asks you to save a little every month for decades, then turns that habit into two things at 60: cash in hand and a pension for life. This calculator shows both sides of that bargain before you commit to a monthly amount.",
};

export const content: ToolContent = {
  seoTitle: "NPS Calculator: Corpus, Lump Sum and Monthly Pension at 60",
  howTo: [
    "Enter the amount you plan to contribute to your NPS account every month.",
    "Add your current age. The calculator assumes you keep contributing until age 60.",
    "Set the yearly return you expect from your NPS investments, keeping in mind that market linked returns are not guaranteed.",
    "Choose what share of the corpus will buy an annuity, at least 40 percent, and the annuity rate, then read the corpus, lump sum and monthly pension.",
  ],
  explanationTitle: "How the NPS payout at 60 is worked out",
  explanation: [
    "Your monthly contributions go into market linked funds and grow with monthly compounding. Because each contribution is treated as paid at the start of the month, the corpus uses the annuity due form of the future value formula: the monthly amount multiplied by [((1 plus i) to the power n, minus 1) divided by i], then multiplied once more by (1 plus i), where i is the monthly return and n is the number of months until you turn 60. Starting ten years earlier does not just add ten years of payments, it gives every early payment a full extra decade to grow, which is why the corpus rises so sharply for younger starters.",
    "At 60 the corpus splits. NPS rules require at least 40 percent of it to buy an annuity from a pension provider, and that annuity is what pays your monthly pension. The pension estimate here is simple on purpose: annuity corpus multiplied by the yearly annuity rate, divided by 12. The remaining share, up to 60 percent, can be withdrawn as a lump sum. Annuity rates change over time and differ between providers, so treat the pension figure as a planning estimate based on the rate you enter, not a promise.",
    "Two choices quietly decide most of the result. The first is the return assumption: a difference of two percentage points over thirty years can change the corpus by a very large margin, so it is worth testing a cautious rate as well as an optimistic one. The second is the annuity share. Buying a bigger annuity raises the monthly pension but shrinks the cash you can take at 60, and annuity income is taxable while the lump sum withdrawal has its own tax treatment. Run the numbers both ways and see which balance fits the retirement you have in mind.",
  ],
  faqs: [
    {
      q: "Why must at least 40 percent of the NPS corpus buy an annuity?",
      a: "NPS is designed to provide income for life, not just a lump sum. The rules therefore require at least 40 percent of the corpus at 60 to be used to buy an annuity, which then pays a regular pension. You can choose a higher share, up to the full corpus, if you prefer more monthly income and less cash in hand.",
    },
    {
      q: "Is the monthly pension from NPS guaranteed?",
      a: "No. The corpus depends on market linked returns that move up and down, and the pension depends on the annuity rate offered when you buy the annuity at 60. This calculator uses the return and annuity rate you enter, so change them to see a cautious and an optimistic version of your outcome.",
    },
    {
      q: "What return should I assume for NPS?",
      a: "NPS equity and corporate bond funds have historically delivered roughly 9 to 12 percent a year over long periods, but past performance does not guarantee future returns. Many planners test 10 percent as a middle case and 8 percent as a cautious case.",
    },
    {
      q: "Can I withdraw the full NPS corpus at 60 without buying an annuity?",
      a: "In general, no. If the corpus is above the small balance threshold set by the rules, at least 40 percent must go into an annuity. Very small corpuses may be withdrawn fully under the prevailing rules, which change from time to time, so check the current limit before relying on it.",
    },
    {
      q: "What happens if I start NPS at 50 instead of 30?",
      a: "You have ten years of contributions instead of thirty, and each contribution has far less time to compound. In this calculator, the same monthly amount started at 30 usually builds a corpus several times larger than the one started at 50, even though the total paid in is only three times as much.",
    },
  ],
};
