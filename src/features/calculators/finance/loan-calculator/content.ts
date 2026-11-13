import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Loan Calculator: Monthly Payment, Total Cost and the Power of Paying Extra",
  metaDescription:
    "Find your monthly loan payment and the total cost of borrowing. Then add an extra monthly payment and see how many months and how much interest it wipes out.",
  intro:
    "Every loan quote waves the monthly payment at you and hides the total cost in the corner. This calculator puts both in front of you, and then answers the most valuable question in borrowing: what happens if you pay a little extra every month?",
};

export const content: ToolContent = {
  seoTitle: "Loan Calculator: Monthly Payment, Total Cost and the Power of Paying Extra",
  howTo: [
    "Enter the amount you want to borrow.",
    "Add the yearly interest rate from your quote.",
    "Set the term in years, adding any extra months if your term is not a round number of years.",
    "Check the monthly payment and the total interest. Then set an extra monthly payment and compare how much sooner you are debt free and how much interest you save.",
  ],
  explanationTitle: "How loan payments and extra payments work",
  explanation: [
    "Your monthly payment comes from the standard amortisation formula, the same one behind every EMI: the payment is set so that, with interest charged monthly on the falling balance, the loan reaches exactly zero on the final payment. Early payments are mostly interest. Late payments are mostly principal.",
    "That structure is why extra payments are so powerful. Every extra unit of currency goes entirely against the principal, because the interest for that month is already covered. A smaller principal means less interest next month, which means even more of the following payment clears the loan. The effect compounds until the loan dies months or years early. On a typical five year loan, adding about 13 percent extra each month can cut roughly seven months off the term.",
    "Two cautions before you rely on the extra payment plan. Some lenders charge prepayment penalties, especially on fixed rate products, so check your agreement first. And an extra payment habit only works if your budget survives it: keep an emergency cushion before throwing every spare unit at a loan, because the loan will not give the money back in a crisis.",
  ],
  faqs: [
    {
      q: "What is the difference between this and an EMI calculator?",
      a: "The core maths is the same. This calculator is built around loan terms quoted in years and months, and it adds the extra payment scenario, showing months saved and interest saved when you pay more than the required amount.",
    },
    {
      q: "How much interest can extra payments really save?",
      a: "More than most people expect. Because extra payments attack the principal directly, even a modest monthly extra shortens the loan and removes every interest charge that would have applied to those final months. Use the comparison in the results to see your own numbers.",
    },
    {
      q: "Should I pay extra on my loan or invest the money instead?",
      a: "Compare the loan rate with a realistic after tax investment return. Paying a 12 percent loan is a guaranteed 12 percent return. If your loan is cheap and your investments reliably earn more, investing can win, but the loan payoff is risk free and many people value being debt free.",
    },
    {
      q: "Do all lenders allow extra payments?",
      a: "Most do, but some charge prepayment or foreclosure fees, and a few cap how much extra you can pay each year. Check your loan agreement or ask the lender before building a plan around extra payments.",
    },
    {
      q: "Why does the loan end early instead of the payment dropping?",
      a: "This calculator keeps your payment fixed and lets the extra amount shorten the term, which is how most lenders apply overpayments and where the biggest interest saving sits. Some lenders instead reduce future payments; ask yours which method they use.",
    },
  ],
};
