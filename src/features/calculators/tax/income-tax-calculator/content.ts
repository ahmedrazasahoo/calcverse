import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Income Tax Calculator: Estimate Tax in India, the US and the UK",
  metaDescription:
    "Estimate your income tax in India, the United States or the United Kingdom from one gross yearly income. Slabs, standard deductions, payroll taxes and take home pay shown as a clear estimate.",
  intro:
    "Tax systems differ wildly between countries, but the first question is always the same: on this income, roughly how much tax will I pay, and how much will I keep? This estimator answers that for India, the United States and the United Kingdom using the same published figures as the detailed country calculators on this site. Treat every result as an estimate, then use the detailed calculator for your country when you need the full picture.",
};

export const content: ToolContent = {
  seoTitle: "Income Tax Calculator: Estimate Tax in India, the US and the UK",
  howTo: [
    "Pick your country: India, the United States or the United Kingdom.",
    "Enter your gross yearly income, before any tax is taken off.",
    "If you picked the United States, add a state tax rate if you want one included. It is applied as a flat estimate on gross income, and you can leave it at zero for a federal only view.",
    "Read your estimated total tax, your take home pay and your effective tax rate.",
    "Check the breakdown underneath to see which parts make up the total for your country.",
  ],
  explanationTitle: "How this income tax estimate works",
  explanation: [
    "For India, the estimate uses the new regime for FY 2025-26 exactly as the detailed India calculator on this site does: a standard deduction of Rs 75,000, slabs rising from nil to 30 percent, the section 87A rebate of up to Rs 60,000 when taxable income is Rs 12 lakh or less, marginal relief just above that line, and a 4 percent health and education cess. That is why a gross salary of Rs 12.75 lakh estimates at zero tax here, just as it does in the detailed calculator. Surcharge at very high incomes and the old regime are not covered by this quick estimator.",
    "For the United States, the estimate applies the 2025 federal brackets for a single filer after a $15,000 standard deduction, then adds the payroll taxes most employees actually see: Social Security at 6.2 percent up to the $176,100 wage cap and Medicare at 1.45 percent on all earnings. State tax varies too much between states for one table, so you set a single flat rate yourself and it is added on gross income as a rough guide. For the United Kingdom, the estimate follows the detailed UK calculator: a personal allowance of GBP 12,570 that tapers away above GBP 100,000, income tax at 20, 40 and 45 percent on taxable income, and National Insurance at 8 percent between GBP 12,570 and GBP 50,270 and 2 percent above that, for England, Wales and Northern Ireland.",
    "An estimate like this is a planning tool, not a tax return. It assumes one gross income, standard deductions only, and no extra credits, reliefs, pension contributions or other income. Two people on the same salary can owe different amounts once those details are counted. Use this page to compare countries, sense check a job offer or plan a budget, and use the detailed country calculators on this site, or a qualified tax adviser, for filing and final figures.",
  ],
  faqs: [
    {
      q: "Is this income tax calculator exact?",
      a: "No, it is an estimate by design. It uses the published slabs, standard deductions and headline payroll rates for each country, but it leaves out personal credits, extra deductions, other income and most reliefs. The detailed calculator for your country on this site goes further, and a tax adviser or official filing gives the final figure.",
    },
    {
      q: "Why does an Indian salary of Rs 12.75 lakh show zero tax?",
      a: "Under the new regime for FY 2025-26, the Rs 75,000 standard deduction leaves taxable income of Rs 12 lakh. The slab tax on that amount is Rs 60,000, and the section 87A rebate removes up to Rs 60,000 at that level, so the estimate comes out at zero, with no cess to add.",
    },
    {
      q: "How is US state tax handled here?",
      a: "As a simple flat estimate that you control. Real state systems have their own brackets, deductions and credits, and some states charge no income tax at all. Enter a rate that is close to your expected average state rate, or leave it at zero to see federal tax and payroll taxes only.",
    },
    {
      q: "Does the UK estimate include the personal allowance taper?",
      a: "Yes. Above GBP 100,000 the allowance falls by GBP 1 for every GBP 2 earned, and it reaches zero at GBP 125,140. That matches the detailed UK salary calculator on this site. Pension contributions and student loan repayments are not included in this quick estimate, but the detailed UK calculator covers both.",
    },
    {
      q: "What is the difference between the effective rate and the top rate shown?",
      a: "The effective rate is your total estimated tax divided by your gross income, so it shows the share of everything you earn that goes in tax. The top rate is the highest slab or bracket your income reaches. Because lower slices of income are taxed at lower rates, the effective rate is almost always well below the top rate.",
    },
  ],
};
