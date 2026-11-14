import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "No Tax on Overtime Calculator: Estimate the IRC 225 Deduction for 2025 to 2028",
  metaDescription:
    "Estimate the federal deduction for qualified overtime premium pay under IRC 225, with the 12500 and 25000 caps and the MAGI phase out applied. Rules checked November 2026.",
  intro:
    "The headline says no tax on overtime, but the law is narrower: it is a deduction for the premium half of required overtime pay only, with a cap and an income phase out. This estimator applies those exact limits so you can plan without overstating the benefit. Rules checked November 2026.",
};

export const content: ToolContent = {
  seoTitle: "No Tax on Overtime Calculator: Estimate the IRC 225 Deduction for 2025 to 2028",
  howTo: [
    "Choose your filing status: single, or married filing jointly. Married filers must file jointly to claim this deduction.",
    "Enter your modified adjusted gross income, often called MAGI, for the year.",
    "Either enter your annual qualified overtime premium directly, or enter your hourly rate, overtime hours per week and weeks per year and let the calculator work out the premium as hours times 0.5 times rate.",
    "Pick your marginal federal tax rate from the list. That rate turns the deduction into an estimated saving.",
    "Read the capped amount, the phase out reduction, the final deduction and the estimated tax saved. Treat the saving as an estimate only, never as a promised refund.",
  ],
  explanationTitle: "What the overtime deduction really covers, and what it leaves out",
  explanation: [
    "For tax years 2025 to 2028, Internal Revenue Code section 225 lets eligible workers deduct qualified overtime compensation on Schedule 1-A. Qualified overtime is not your full overtime pay. It is only the premium half of time and a half that the Fair Labor Standards Act requires: for overtime hours over 40 in a week, you count 0.5 times your regular rate per hour. If you earn $30 an hour, work 10 overtime hours a week for 50 weeks, your full overtime pay is $22,500 but your qualified premium is 10 times 0.5 times $30 times 50, which is $7,500. Contract overtime that the FLSA does not require, such as daily overtime paid only because a state law or a union contract requires it, does not count unless it is also FLSA required overtime. The deduction is available on top of the standard deduction, so you do not need to itemize to claim it. Rules checked November 2026.",
    "Two limits then apply. First, the cap: $12,500 per return for a single filer and $25,000 for a married couple filing jointly. Second, the phase out: the deduction is reduced by $100 for every $1,000, or fraction of $1,000, of MAGI above $150,000 for single filers or $300,000 for joint filers. A single filer with MAGI of $175,000 is $25,000 over the threshold, so the deduction falls by $2,500. The deduction reaches zero at $275,000 single and $550,000 joint. From 2026, employers report qualified overtime on Form W-2 box 12 with code TT, which should make the premium figure easier to find. For 2025, you may need to reconstruct it from pay statements.",
    "This page is an estimator, not tax advice, and it never promises a refund amount. The estimated saving shown here is simply the final deduction times the marginal rate you selected. Your real saving depends on your full return, your taxable income before the deduction, and whether the deduction moves you across a bracket boundary. Important exclusions to remember: overtime pay is still subject to income tax withholding during the year and to Social Security and Medicare taxes in full, because this is a deduction claimed at filing time, not an exemption at payroll time. Self employment income, exempt employee overtime that the FLSA does not require, and premium pay for hours at or below 40 in a week do not qualify. Check your W-2, your final pay statement and the current IRS guidance for Schedule 1-A before you file, and talk to a qualified tax professional for a high income or mixed income return.",
  ],
  faqs: [
    {
      q: "Is overtime really tax free now?",
      a: "No. For 2025 to 2028 you can deduct the premium half of FLSA required overtime pay, up to a cap, on Schedule 1-A. The pay itself is still withheld during the year and still subject to Social Security and Medicare taxes. Rules checked November 2026.",
    },
    {
      q: "What part of my overtime pay counts as qualified overtime compensation?",
      a: "Only the extra half in time and a half, for overtime the FLSA requires. That is overtime hours times 0.5 times your regular rate. The straight time portion and the base rate portion of overtime hours do not count.",
    },
    {
      q: "What are the cap and the phase out for the overtime deduction?",
      a: "The cap is $12,500 single and $25,000 married filing jointly. The deduction then falls by $100 for every $1,000 or fraction of $1,000 of MAGI above $150,000 single or $300,000 joint, reaching zero at $275,000 and $550,000.",
    },
    {
      q: "Does California daily overtime or double time qualify?",
      a: "Only the portion that is also FLSA required overtime, meaning the premium for hours over 40 in a week, counts. Daily overtime or double time paid solely under state law or a contract, for hours that are not FLSA overtime, does not qualify on its own.",
    },
    {
      q: "Can I claim the deduction if I take the standard deduction, and how will I know the amount?",
      a: "Yes, this deduction is available on top of the standard deduction and is claimed on Schedule 1-A. From 2026 employers report it on Form W-2 box 12 code TT. For 2025 you may need to work it out from your pay statements.",
    },
  ],
};
