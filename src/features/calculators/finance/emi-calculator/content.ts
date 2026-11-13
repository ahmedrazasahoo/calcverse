import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "EMI Calculator: Monthly Loan Payment, Total Interest and Full Schedule",
  metaDescription:
    "Work out your exact monthly EMI for a home loan, car loan or personal loan. See total interest, total repayment and a month by month amortisation schedule, free and instant.",
  intro:
    "An EMI is the fixed amount you hand the bank every month until a loan is gone. Part of it pays interest, part of it pays the loan itself, and the mix changes month by month. This calculator shows you the payment, the true cost of borrowing, and exactly where every month's money goes.",
};

export const content: ToolContent = {
  seoTitle: "EMI Calculator: Monthly Loan Payment, Total Interest and Full Schedule",
  howTo: [
    "Pick a loan type to load typical rates and tenures, or just type your own numbers straight in.",
    "Enter the loan amount you plan to borrow.",
    "Add the interest rate your bank quoted and the tenure in months.",
    "Read your monthly EMI at the top, then scan the schedule to see how the balance falls month by month.",
    "Try shortening the tenure by a year or two and watch how much interest disappears.",
  ],
  explanationTitle: "How an EMI is calculated",
  explanation: [
    "Banks use one standard formula for every EMI loan: EMI equals P times r times (1 + r) to the power n, divided by ((1 + r) to the power n) minus 1. Here P is the loan amount, r is the monthly interest rate (the yearly rate divided by 12 and then by 100), and n is the number of monthly payments.",
    "The part most borrowers miss is the split inside each payment. In the first months, most of your EMI is interest, because interest is charged on the full outstanding balance. As the balance falls, the interest share shrinks and more of the same fixed payment starts clearing the actual loan. That is why the schedule matters: two loans with the same EMI can cost very different amounts if one runs longer.",
    "Tenure is the biggest lever you control. Stretching a home loan from 15 to 25 years drops the monthly payment, but the extra years of interest can quietly add lakhs to the total cost. The presets above use typical market rates for home loans (around 8.5 percent), car loans (around 9.5 percent) and personal loans (around 12.5 percent), but always replace them with the exact rate on your offer letter, because even half a percent changes the total by a lot on a long loan.",
  ],
  faqs: [
    {
      q: "What does EMI stand for?",
      a: "EMI stands for Equated Monthly Instalment. It is the fixed monthly payment that covers both interest and principal until the loan is fully repaid.",
    },
    {
      q: "Why is so much of my first EMI only interest?",
      a: "Interest is charged on the outstanding balance, and the balance is at its highest at the start. As you keep paying, the balance drops, so the interest portion of each payment drops with it and the principal portion grows.",
    },
    {
      q: "Is a longer tenure better because the EMI is smaller?",
      a: "It is easier month to month, but far more expensive overall. A longer tenure means more months of interest. If you can afford the higher payment of a shorter tenure, you usually save a large amount of interest.",
    },
    {
      q: "Does this calculator work for home, car and personal loans?",
      a: "Yes. The maths is identical for all three. Only the typical rates and tenures differ, which is why the presets load sensible starting values for each type.",
    },
    {
      q: "What is an amortisation schedule?",
      a: "It is the full month by month table of your loan: each payment, how much of it was interest, how much reduced the balance, and what you still owe afterwards. It is the clearest way to see the real cost of a loan.",
    },
    {
      q: "Can my EMI change after I take the loan?",
      a: "On a fixed rate loan, no. On a floating rate loan, the bank may keep your EMI the same and change the tenure instead, or adjust the EMI when rates move. This calculator assumes a fixed rate throughout.",
    },
  ],
};
