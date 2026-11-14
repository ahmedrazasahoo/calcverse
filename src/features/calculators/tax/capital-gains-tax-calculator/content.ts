import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Capital Gains Tax Calculator: 2026 Long Term and Short Term Rates",
  metaDescription:
    "Free 2026 capital gains tax calculator. Split a long term gain across the 0, 15 and 20 percent bands, tax short term gains through the ordinary brackets, net off losses and check the 3.8 percent NIIT.",
  intro:
    "Selling an investment for more than you paid creates a capital gain, and how long you held it decides the rate. This estimator nets your short term and long term results, stacks the long term gain on top of your other taxable income, and shows exactly how much of it lands at 0, 15 and 20 percent for tax year 2026.",
};

export const content: ToolContent = {
  seoTitle: "Capital Gains Tax Calculator: 2026 Long Term and Short Term Rates",
  howTo: [
    "Pick your filing status: single, married filing jointly, head of household or married filing separately.",
    "Enter your other taxable income, meaning your taxable income without these gains, after deductions. The gains stack on top of it.",
    "Enter your net short term gain or loss and your net long term gain or loss, using a negative number for a loss.",
    "Optionally enter your modified adjusted gross income (MAGI) to check the extra 3.8 percent net investment income tax. Leave it blank to skip that check.",
    "Read the total estimated tax and the breakdown, which shows how much of the long term gain sits in each rate band.",
  ],
  explanationTitle: "How capital gains are taxed in 2026",
  explanation: [
    "The holding period sets the rules. Gains on assets held for a year or less are short term and are taxed exactly like wages, through the ordinary brackets. Gains on assets held longer are long term and get preferential rates of 0, 15 or 20 percent. The rate is not chosen by the size of the gain alone: the gain stacks on top of your other taxable income, and the thresholds are measured against the total. For 2026 a single filer pays 0 percent on the part of a long term gain that fits under $49,450 of total taxable income, 15 percent on the part up to $545,500, and 20 percent above that. The limits are $98,900 and $613,700 for married couples filing jointly, $66,200 and $579,600 for heads of household, and $49,450 and $306,850 for married filing separately. So a single filer with $40,000 of other income and a $20,000 long term gain pays nothing on the first $9,450 of the gain, because that slice still fits under the 0 percent line, and 15 percent on the remaining $10,550, which is $1,582.50.",
    "Before any rate is applied, gains and losses are netted. A net short term result and a net long term result offset each other, and any remainder keeps the character of the larger side. If the net result for the year is a loss, only $3,000 of it can be used against other income in this estimate (the rest is shown as a carryforward to future years, which this calculator does not model further). High earners can also owe the net investment income tax: an extra 3.8 percent on the smaller of the net investment gain and the amount by which MAGI passes $200,000 for single and head of household filers, $250,000 for joint filers or $125,000 for married filing separately. Enter your MAGI and the calculator adds it; leave MAGI blank and the NIIT is skipped entirely rather than guessed.",
    "This is an estimator for federal tax in tax year 2026, built on the thresholds in IRS Revenue Procedure 2025-32, not a tax return. It does not cover state capital gains taxes, the special 25 percent rate on unrecaptured section 1250 gains, the 28 percent rate on collectibles, qualified dividends stacking, wash sale rules, or the detailed capital loss carryforward worksheets. Brokerage tax forms (Form 1099-B and Schedule D) remain the filing source, and a large or complicated sale is worth reviewing with a tax professional before you rely on any estimate.",
  ],
  faqs: [
    {
      q: "What are the capital gains tax rates for 2026?",
      a: "Long term gains are taxed at 0, 15 or 20 percent depending on total taxable income. For a single filer in 2026 the 0 percent rate applies up to $49,450 of total taxable income and the 15 percent rate up to $545,500, with 20 percent above that. Joint filers get $98,900 and $613,700, heads of household $66,200 and $579,600, and married filing separately $49,450 and $306,850. Short term gains use the ordinary income brackets, from 10 to 37 percent.",
    },
    {
      q: "How is a short term capital gain taxed?",
      a: "Exactly like ordinary income. The gain is added on top of your other taxable income and taxed through the normal brackets, so a short term gain can push you across a bracket edge: only the part above the edge pays the higher rate. In this calculator the short term figure shown is the extra ordinary tax the gain causes compared with taxing your other income alone.",
    },
    {
      q: "What happens if I have a capital loss?",
      a: "Losses first offset gains of the opposite type, short against long and the other way round. If a net loss remains, up to $3,000 a year can be deducted against other income, and the rest carries forward to future years. This estimator applies the $3,000 limit and reports the carryforward amount, but it does not track that carryforward into later years.",
    },
    {
      q: "What is the net investment income tax and who pays it?",
      a: "The NIIT is an extra 3.8 percent tax on investment income, including capital gains, for higher earners. It applies to the smaller of your net investment gain and the amount your modified adjusted gross income exceeds $200,000 (single or head of household), $250,000 (married filing jointly) or $125,000 (married filing separately). Enter your MAGI in the calculator to include it, or leave the field blank to skip it.",
    },
    {
      q: "Does this calculator include state capital gains tax?",
      a: "No. It estimates federal tax only for tax year 2026. Most states tax capital gains as ordinary income at their own rates, a few have special rules, and some have no income tax at all, so your combined bill can be meaningfully higher than the federal estimate shown here.",
    },
  ],
};
