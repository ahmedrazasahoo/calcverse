import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Credit Card Payoff Calculator: Minimums, Avalanche and Snowball Compared",
  metaDescription:
    "Free credit card payoff calculator. Enter your cards, APR values and monthly budget and compare three payoff plans side by side: minimums only, the avalanche method and the snowball method, with payoff dates and total interest.",
  intro:
    "List your credit cards once and watch three payoff plans race each other: paying only the minimums, a fixed budget aimed at the highest APR first (avalanche), and a fixed budget aimed at the smallest balance first (snowball). Every plan shows its months to debt free, total interest and the month each card clears.",
};

export const content: ToolContent = {
  seoTitle: "Credit Card Payoff Calculator: Minimums, Avalanche and Snowball Compared",
  howTo: [
    "Add a row for each credit card with its balance and APR. Add or remove cards with the buttons provided.",
    "Set each card minimum payment percent and floor, or leave the common defaults of 2 percent and 25. Your statement shows the exact figures your issuer uses.",
    "Enter the total monthly budget you can put toward the cards. It must be more than the first month minimums added together, which the calculator shows under the budget box.",
    "Pick the month and year you will make the first payment.",
    "Compare the three plans in the summary table, then read each plan card for its payoff order and the calendar month every card clears.",
  ],
  explanationTitle: "Minimums, avalanche and snowball: how the three plans differ",
  explanation: [
    "Every plan in this calculator runs the same honest month by month simulation. Each month a card charges interest of balance times APR divided by 1200, so a 3,000 balance at 24 percent APR adds 60 of interest in the first month. The minimum due follows the rule most issuers use: the interest plus a small percent of the balance, with a floor such as 25, capped at the full amount owed. Paying only minimums feels gentle but stretches a balance across many years, because the payment shrinks as the balance shrinks, and most of each early payment is swallowed by interest.",
    "The two budget plans fix the total you pay each month and aim the spare money, everything left after every card gets its minimum, at one target card. The avalanche aims at the highest APR, which is the mathematically cheapest route: the most expensive debt dies first, so total interest is as low as it can be. The snowball aims at the smallest balance, which usually costs a little more interest but clears a whole card quickly, and that early win keeps many people paying. When everything still owed fits inside the budget plus that month minimums, the simulation settles the remainder in one closing payment rather than dragging a few dollars into one more month.",
    "Read the results as a plan, not a promise. The simulation holds APR values steady, assumes no new spending lands on the cards, and ignores fees, promotional rates ending and payment timing within the month, any of which can move a real payoff date. If a plan shows as not payable, the maths has hit the trap where a payment no longer covers the monthly interest, so the balance can never fall: raising the budget, even a little, is what breaks out of it. Your issuer statement is always the final word on what you owe.",
  ],
  faqs: [
    {
      q: "Is avalanche or snowball better?",
      a: "Avalanche always costs the same or less interest, because it kills the most expensive debt first. Snowball wins on motivation: clearing a small card in the first month or two proves the plan works. Compare both totals here and pick the one you will actually stick to, because a finished snowball beats an abandoned avalanche.",
    },
    {
      q: "Why does paying only minimums take so long?",
      a: "A typical minimum is the month interest plus about 2 percent of the balance, with a floor near 25. As the balance falls, the payment falls with it, so the debt shrinks more and more slowly. A fixed budget keeps the payment level, which is why the budget plans finish years earlier on the same cards.",
    },
    {
      q: "How is the minimum payment calculated here?",
      a: "Each month the minimum is the larger of the card floor and the minimum percent of the balance, plus that month interest, capped at the full amount owed. That mirrors the formula on most card statements. Set the percent and floor from your own statement for the closest match.",
    },
    {
      q: "What does not payable mean?",
      a: "It means the payment in some month fails to cover that month interest while debt remains, so the balance stalls or grows forever. It happens with very low minimum settings or a budget set too close to the minimums on a high APR card. Raise the monthly amount to fix it.",
    },
    {
      q: "Does this calculator include new spending or fees?",
      a: "No. It assumes the balances only change through interest and your payments. New purchases, late fees, annual fees and promotional APR periods ending will all move a real payoff date, so treat the month shown as a target under steady conditions.",
    },
  ],
};
