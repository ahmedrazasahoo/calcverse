import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "FD Calculator: Fixed Deposit Maturity Value and Interest Earned",
  metaDescription:
    "Calculate your fixed deposit maturity value in seconds. Enter the deposit, bank rate and tenure to see total interest and the effective yearly rate, with quarterly compounding as banks apply it.",
  intro:
    "A fixed deposit is the simplest promise in banking: park a lump sum, leave it alone, and collect a known amount on a known date. This calculator works out exactly what that amount will be, including the quarterly compounding Indian banks apply by default.",
};

export const content: ToolContent = {
  seoTitle: "FD Calculator: Fixed Deposit Maturity Value and Interest Earned",
  howTo: [
    "Enter the amount you plan to deposit.",
    "Add the interest rate the bank is offering for your chosen tenure.",
    "Enter the tenure in years. You can use fractions, for example 2.5 for two and a half years.",
    "Leave compounding on quarterly unless your bank states otherwise, then read the maturity value and total interest.",
  ],
  explanationTitle: "How FD interest is calculated",
  explanation: [
    "Banks do not pay simple interest on most fixed deposits. They compound, which means interest itself starts earning interest. The formula is A equals P times (1 plus r divided by 100n) raised to the power of n times t, where P is your deposit, r is the yearly rate, n is how many times a year interest compounds, and t is the tenure in years.",
    "Indian banks compound quarterly by default, so a deposit at 7 percent actually earns an effective yearly rate of about 7.19 percent. That gap between the headline rate and the effective rate is small in one year and meaningful over five or ten, which is why this calculator shows both numbers.",
    "A few practical points the headline rate hides. Interest on bank FDs is taxable at your income tax slab in India, and banks deduct TDS when interest crosses the yearly threshold. Senior citizens usually earn an extra 0.50 percent, and breaking a deposit early normally costs a penalty of around 1 percent on the rate. Compare deposits on the maturity value after your likely tax, not just the advertised rate.",
  ],
  faqs: [
    {
      q: "How often do banks compound FD interest?",
      a: "Indian banks compound quarterly by default. Some offer monthly or yearly compounding options, and monthly compounding produces a slightly higher maturity value at the same headline rate.",
    },
    {
      q: "What is the difference between the FD rate and the effective rate?",
      a: "The FD rate is the nominal yearly rate the bank advertises. The effective rate accounts for compounding, so it is what your money actually grows by in a year. Quarterly compounding at 7 percent gives an effective rate of about 7.19 percent.",
    },
    {
      q: "Is FD interest taxable?",
      a: "Yes. In India, FD interest is added to your income and taxed at your slab rate. Banks also deduct TDS once interest in a financial year crosses the applicable threshold, which you can claim back or adjust when filing your return.",
    },
    {
      q: "Do senior citizens get a better FD rate?",
      a: "Usually yes. Most Indian banks offer senior citizens an additional 0.50 percent on standard fixed deposits, and some special schemes add more. Enter the rate you were actually quoted to get an exact maturity figure.",
    },
    {
      q: "What happens if I break my FD early?",
      a: "The bank normally pays interest at the rate applicable for the period the money actually stayed, minus a penalty of around 1 percent. The exact penalty varies by bank, so check your deposit receipt before breaking a deposit.",
    },
  ],
};
