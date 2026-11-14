import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "No Tax on Tips Calculator: Estimate the IRC 224 Tips Deduction for 2025 to 2028",
  metaDescription:
    "Estimate the federal deduction for qualified tips under IRC 224, with the flat 25000 cap, the MAGI phase out and the self employed net income limit. Rules checked November 2026.",
  intro:
    "The tips deduction has a generous headline and strict fine print: a flat $25,000 cap, an occupation list, and rules that exclude service charges entirely. This estimator applies the cap and phase out exactly, and flags the cases that do not qualify at all. Rules checked November 2026.",
};

export const content: ToolContent = {
  seoTitle: "No Tax on Tips Calculator: Estimate the IRC 224 Tips Deduction for 2025 to 2028",
  howTo: [
    "Choose your filing status. Note that married filing separately is not eligible at all, and the calculator will show that result directly.",
    "Enter your annual qualified tips: voluntary tips in cash or cash equivalents that were reported on a W-2, a 1099 or Form 4137. Do not include service charges.",
    "Enter your modified adjusted gross income, often called MAGI, for the year.",
    "If you are self employed in the tipped work, switch on the self employed option and enter net income from that business, because the deduction cannot exceed that amount.",
    "Pick your marginal federal tax rate and read the capped amount, phase out reduction, final deduction and estimated tax saved. Treat the saving as an estimate only.",
  ],
  explanationTitle: "Which tips qualify for the deduction, and which never do",
  explanation: [
    "For tax years 2025 to 2028, Internal Revenue Code section 224 lets eligible workers deduct up to $25,000 of qualified tips per return on Schedule 1-A Part II. The $25,000 cap is the same for every filing status: a joint return does not get double. Tips only qualify if they are voluntary, paid in cash or cash equivalents such as card tips, and reported on a Form W-2, a Form 1099 or Form 4137. They must also come from an occupation that customarily and regularly received tips on or before 31 December 2024, using the list the IRS has published. Tips received in a specified service trade or business, such as certain health, law, accounting, consulting and financial services businesses, are excluded. Rules checked November 2026.",
    "Service charges never count. A mandatory charge a restaurant adds for a large party, a banquet fee, or any amount the customer must pay and cannot freely change is wages, not a tip, even if the business passes it to staff. The phase out then works like this: the deduction is reduced by $100 for every $1,000, or fraction of $1,000, of MAGI above $150,000 for single and head of household filers, or $300,000 for married filing jointly. At MAGI of $175,000 for a single filer, the reduction is $2,500. The deduction reaches zero at $400,000 single or head of household and at $550,000 joint. Married filing separately filers cannot claim it at all. For the self employed, there is one more ceiling: the deduction cannot exceed net income from the business that earned the tips.",
    "This page is an estimator, not tax advice, and it never promises a refund amount. The estimated saving is the final deduction times the marginal rate you selected, and your real saving depends on your full return. Tips remain fully subject to payroll taxes: Social Security and Medicare apply as before, and employers still withhold during the year, because this is a deduction at filing time rather than an exemption in your paycheck. Keep good tip records, check that your occupation is on the IRS list before you rely on the deduction, and confirm the figures on your W-2 or 1099 match what you reported to your employer during the year.",
  ],
  faqs: [
    {
      q: "How much in tips can I deduct?",
      a: "Up to $25,000 of qualified tips per return for tax years 2025 to 2028, the same cap for single, head of household and married filing jointly returns. The phase out can reduce that amount at higher incomes. Rules checked November 2026.",
    },
    {
      q: "Do service charges count as tips for this deduction?",
      a: "No, never. A mandatory service charge is not a voluntary tip, even if your employer distributes it to you. Only voluntary tips in cash or cash equivalents, properly reported, can qualify.",
    },
    {
      q: "Who is not eligible for the tips deduction?",
      a: "Married filing separately filers are not eligible. Workers in occupations that did not customarily and regularly receive tips on or before 31 December 2024, and tips earned in a specified service trade or business, are also excluded.",
    },
    {
      q: "What is the phase out for the tips deduction?",
      a: "The deduction falls by $100 for every $1,000 or fraction of $1,000 of MAGI above $150,000 for single and head of household filers, or $300,000 for joint filers. It reaches zero at $400,000 and $550,000 respectively.",
    },
    {
      q: "I am self employed. Is there an extra limit on my tips deduction?",
      a: "Yes. For the self employed, the deduction cannot exceed net income from the business in which the tips were earned. If your tips are $20,000 but net income from that work is $12,000, the amount before the phase out is $12,000.",
    },
  ],
};
