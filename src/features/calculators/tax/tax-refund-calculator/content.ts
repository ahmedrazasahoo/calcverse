import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Tax Refund Calculator: Estimate Your 2026 Federal Refund or Balance Owed",
  metaDescription:
    "Free 2026 federal tax refund calculator. Enter wages, withholding, children and credits to estimate your refund or amount owed, with AGI, taxable income, effective rate and marginal rate shown step by step.",
  intro:
    "Will money come back, or is there a bill waiting? Enter your 2026 wages, withholding and family details, and this estimator walks the same path as a federal return: AGI, the standard deduction, the 2026 brackets, the child tax credit and the earned income credit, ending with your estimated refund or balance owed.",
};

export const content: ToolContent = {
  seoTitle: "Tax Refund Calculator: Estimate Your 2026 Federal Refund or Balance Owed",
  howTo: [
    "Pick your filing status: single, married filing jointly or head of household.",
    "Enter your wages, any other income, and one combined adjustments figure for things like pretax 401(k) or HSA contributions and student loan interest.",
    "Add the federal tax already withheld from your pay, which you can find in box 2 of a W-2.",
    "Enter your children under 17, any other dependents, and how many children qualify for the earned income tax credit.",
    "Read your estimated refund or amount owed, then scan the step table to see exactly how AGI, taxable income and each credit fed into it.",
  ],
  explanationTitle: "How a federal refund is actually worked out",
  explanation: [
    "A refund is not a bonus and a balance owed is not a fine. Both are just the settling up between what you already paid during the year and what the final calculation says you owe. The final calculation starts with total income, subtracts adjustments to reach adjusted gross income, then subtracts the standard deduction, which for 2026 is $16,100 for single filers, $32,200 for married couples filing jointly and $24,150 for heads of household. What is left is taxable income, and the 2026 brackets tax it in slices: the first slice at 10 percent, the next at 12 percent, then 22, 24, 32 and 35 percent, with anything above the top threshold at 37 percent. That is why your marginal rate, the rate on your last dollar, is always higher than your effective rate, the average across all your income.",
    "Credits then cut the bill directly, dollar for dollar. For 2026 the child tax credit is worth up to $2,200 per child under 17 and the other dependent credit is worth $500, and both start shrinking once AGI passes $200,000 for single and head of household filers or $400,000 for joint filers, losing $50 for every $1,000 or part of $1,000 over the line. These credits first run your tax down to zero. Any child tax credit left over can come back as the refundable additional child tax credit, and the earned income tax credit is refundable too: for 2026 it is worth up to $664 with no qualifying children, $4,427 with one, $7,316 with two and $8,231 with three or more, rising with earnings, holding at the maximum, then phasing out as income climbs. Add withholding and refundable credits together, compare with the tax left after nonrefundable credits, and the difference is your refund or your bill.",
    "Treat every figure here as an estimate, not a filing number. This calculator uses the standard deduction only and one combined adjustments field, and it simplifies the additional child tax credit by paying back unused child tax credit up to the $1,700 per child cap instead of running the full earned income worksheet. It leaves out state tax, itemised deductions, self employment tax, preferential capital gains rates, education and energy credits, and the detailed eligibility tests for each credit, including the EITC investment income limit. Your real return, prepared in tax software or by a professional using the official IRS tables, can land higher or lower. The official sources are the IRS pages on the child tax credit and the earned income credit, and Revenue Procedure 2025-32, which sets the 2026 brackets, standard deductions and credit amounts used here.",
  ],
  faqs: [
    {
      q: "How accurate is this tax refund calculator?",
      a: "It follows the real 2026 federal structure, so for a straightforward wages only return with the standard deduction it should land close. It is still an estimate: it skips state tax, itemising, self employment tax and most credits, and it simplifies the refundable child tax credit, so always file using the official IRS tables or proper tax software.",
    },
    {
      q: "Why is my refund smaller than last year even though my pay rose?",
      a: "A pay rise pushes more income into higher brackets and can shrink credits. The child tax credit starts phasing out at $200,000 of AGI for single filers and $400,000 for joint filers, and the earned income credit phases out much earlier, from $23,890 of income for most filers with children in 2026. Withholding does not always keep pace with a rise, so the gap between what you paid and what you owe narrows.",
    },
    {
      q: "What is the difference between the marginal and effective tax rate?",
      a: "Your marginal rate is the bracket your last dollar falls into, for example 22 percent, and it is the rate an extra dollar of income would be taxed at. Your effective rate is your total tax after credits divided by your income, and because the early slices are taxed at 10 and 12 percent and credits cut the bill, it is always lower. For a single filer with $60,000 of wages in 2026, the marginal rate is 12 percent and the effective rate is about 8.4 percent.",
    },
    {
      q: "How does the earned income tax credit change my refund?",
      a: "The EITC is refundable, which means it can push your refund above what you had withheld. For 2026 it phases in at 7.65 percent of earnings with no qualifying children, 34 percent with one, 40 percent with two and 45 percent with three or more, up to maximums of $664, $4,427, $7,316 and $8,231. It then phases out once the greater of your AGI or earnings passes $23,890 (single or head of household, with children) or $31,160 for joint filers. This estimator assumes you meet the other eligibility tests; the IRS EITC Assistant checks them in full.",
    },
    {
      q: "When will I actually receive my refund?",
      a: "That depends on how and when you file, which this calculator cannot predict. The IRS says most refunds for e-filed returns with direct deposit arrive within 21 days, but returns claiming the earned income credit or the additional child tax credit are held by law until at least mid February, and paper returns take much longer.",
    },
  ],
};
