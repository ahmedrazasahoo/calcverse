import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Mortgage Calculator: Full Monthly Payment With Tax, Insurance and PMI",
  metaDescription:
    "Get the real monthly cost of a US mortgage: principal and interest, property tax, homeowner's insurance, HOA dues and PMI, plus total interest over the life of the loan.",
  intro:
    "The payment a mortgage advert shows you is rarely the payment you will actually make. Taxes, insurance, HOA dues and PMI ride along every month. This calculator stacks the whole pile up honestly, so the number you plan around is the number that leaves your account.",
};

export const content: ToolContent = {
  seoTitle: "Mortgage Calculator: Full Monthly Payment With Tax, Insurance and PMI",
  howTo: [
    "Enter the home price and your down payment.",
    "Add the interest rate and pick your term, usually 30, 20 or 15 years.",
    "Fill in the yearly property tax and homeowner's insurance if you know them, plus any monthly HOA dues.",
    "If you are putting down less than 20 percent, add a PMI rate (0.5 percent a year is a common estimate) to see that cost and when it falls away.",
    "Compare the full monthly payment with the payment after PMI drops off.",
  ],
  explanationTitle: "What makes up a US mortgage payment",
  explanation: [
    "Lenders bundle your monthly housing cost into one payment, often remembered as PITI: principal, interest, taxes and insurance. Principal and interest come from the standard loan formula on your loan amount. Property tax and homeowner's insurance are usually collected monthly into an escrow account and paid by the lender on your behalf, which is why they appear in the monthly figure even though they are billed yearly.",
    "PMI, private mortgage insurance, protects the lender, not you, and it is normally required when your down payment is under 20 percent of the price. It typically costs between 0.3 and 1.5 percent of the loan amount per year. The good news: once your balance falls to 80 percent of the home's original value, you can generally request its removal, and this calculator shows roughly when that month arrives and what your payment becomes afterwards.",
    "The term choice is the biggest cost decision you will make. A 15 year mortgage carries a much higher monthly payment than a 30 year one, but at a lower rate and with a fraction of the total interest. On a 320,000 dollar loan at 6.5 percent, the 30 year route charges roughly 408,000 dollars of interest over its life. Run both terms through the calculator and compare total interest, not just the monthly figure, before deciding what fits your life.",
  ],
  faqs: [
    {
      q: "What is PMI and when does it go away?",
      a: "Private mortgage insurance is a fee that protects the lender when your down payment is under 20 percent. It can usually be cancelled once your balance reaches 80 percent of the home's original value, and it must be removed automatically at 78 percent under US rules for most loans.",
    },
    {
      q: "Why is my actual payment higher than the loan payment?",
      a: "Because lenders usually add property tax and homeowner's insurance into the monthly bill through escrow, and HOA dues may be separate or bundled. The principal and interest figure alone understates your real monthly outlay, which is why this calculator shows the full stack.",
    },
    {
      q: "Is a 15 year or 30 year mortgage better?",
      a: "A 15 year mortgage costs far less in total interest and usually offers a lower rate, but the monthly payment is much higher. A 30 year mortgage keeps payments flexible, and you can always pay extra toward principal. The better choice depends on how secure your income is and what else your money could be doing.",
    },
    {
      q: "How much property tax should I enter?",
      a: "Property tax varies enormously by state and county, from well under 0.5 percent of value per year to over 2 percent. Check the listing, the county assessor, or a recent tax bill for the home you are considering, and enter that yearly figure.",
    },
    {
      q: "Does this calculator include closing costs?",
      a: "No. Closing costs are one time fees at purchase, typically 2 to 5 percent of the loan amount, covering appraisal, origination and title work. They matter for your cash needed at signing, but they are not part of the monthly payment.",
    },
    {
      q: "What down payment do I need to avoid PMI?",
      a: "On a conventional loan, 20 percent of the purchase price. Below that, expect PMI until you build enough equity, though some loan programs structure the insurance differently.",
    },
  ],
};
