import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "RD Calculator: Recurring Deposit Maturity With Quarterly Interest",
  metaDescription:
    "Plan a recurring deposit month by month. Enter a monthly amount, the bank rate and a tenure in years, and see total deposited, interest earned and the maturity value with a yearly table.",
  intro:
    "A recurring deposit turns a salary habit into a lump sum. You promise the bank the same amount every month, and the bank promises a fixed rate in return, with interest added every quarter. This calculator follows that exact rhythm, deposit first, interest at the end of each quarter, so the maturity figure matches how the account really grows.",
};

export const content: ToolContent = {
  seoTitle: "RD Calculator: Recurring Deposit Maturity With Quarterly Interest",
  howTo: [
    "Enter the amount you can set aside every month without straining the rest of your budget.",
    "Set the yearly rate your bank offers on recurring deposits for the tenure you have in mind.",
    "Choose the tenure in years. Short plans run for a year or two, longer goals often run for five or ten years.",
    "Read the maturity value, compare it with the total you deposited, and check the yearly table to see how the balance builds.",
  ],
  explanationTitle: "How a recurring deposit grows",
  explanation: [
    "Each monthly deposit starts earning interest from the quarter in which it lands. Indian banks compound RD interest quarterly, which means that at the end of every three months the interest is worked out on the whole balance and added to it. From the next quarter onward, that added interest also earns interest. A deposit made in the first month therefore earns for almost the full tenure, while the last deposit earns only for a short stretch, and the maturity value is the sum of all those different journeys plus your own money back.",
    "This calculator simulates the account month by month rather than using a single shortcut formula. Your deposit is added at the start of each month, and at the end of every third month the balance is increased by the quarterly rate, which is the yearly rate divided by four. That is why two plans with the same total deposited can end differently: a plan that starts earlier gives every quarter more to work with, even when the monthly amount is smaller.",
    "An RD suits goals with a date attached: a school fee next year, a bike in two years, a home deposit in five. The rate is locked at opening, so the maturity figure does not move with the market. The trade off is flexibility. Missing instalments can attract a small penalty at many banks, and closing early usually means a lower rate, so pick a monthly amount you can hold through a tight month without breaking the plan.",
  ],
  faqs: [
    {
      q: "How is RD interest calculated in India?",
      a: "Interest compounds quarterly. At the end of every three months, the bank credits interest on the current balance at one quarter of the yearly rate, and that interest then earns interest in later quarters.",
    },
    {
      q: "Why does my first deposit earn more than my last one?",
      a: "Because it stays in the account for the whole tenure and passes through every quarterly credit. The final deposit is only there for the last part of the plan, so it has far less time to earn.",
    },
    {
      q: "What happens if I miss a monthly instalment?",
      a: "Most banks charge a small penalty for a missed or late instalment and the account stays open. Repeated misses can lead to closure at some banks, so check your own bank terms when you open the deposit.",
    },
    {
      q: "Is an RD better than leaving money in a savings account?",
      a: "For money you know you will not touch until a set date, an RD usually pays a higher rate than a savings account and adds the discipline of a fixed monthly commitment. Savings accounts stay better for emergency money you may need at any moment.",
    },
    {
      q: "Can I choose a tenure that is not a whole number of years?",
      a: "Yes, in this calculator and at most banks. Tenures such as one and a half years are common. The deposit count is worked out in months, so 1.5 years means eighteen monthly deposits.",
    },
  ],
};
