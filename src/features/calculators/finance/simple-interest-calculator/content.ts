import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Simple Interest Calculator: Interest on a Principal in Seconds",
  metaDescription:
    "Work out simple interest the clean way. Enter a principal, a yearly rate and a time in years, months or days, and see the interest earned and the total amount right away.",
  intro:
    "Simple interest is the oldest and clearest way money earns money: the rate applies only to the amount you started with, never to interest already earned. That makes it easy to predict, easy to compare, and perfect for short loans, deposits and classroom problems. Enter your numbers and watch the total build in a straight line.",
};

export const content: ToolContent = {
  seoTitle: "Simple Interest Calculator: Interest on a Principal in Seconds",
  howTo: [
    "Enter the principal, which is the amount you are lending, saving or borrowing at the start.",
    "Set the yearly interest rate as a percentage, for example 7.5 for seven and a half percent a year.",
    "Enter the time and pick its unit: years, months or days. The calculator converts months and days into years for you.",
    "Read the interest earned and the total amount. Change any single value to see how the result moves.",
  ],
  explanationTitle: "How simple interest works",
  explanation: [
    "The formula has only three moving parts: interest equals principal multiplied by the rate divided by 100, multiplied by the time in years. If you put in 10,000 at 7.5 percent for 3 years, the interest is 10,000 times 0.075 times 3, which is 2,250, and the total comes to 12,250. Because the rate never touches the interest itself, the amount grows by exactly the same slice every year. On a graph it is a straight, steady line.",
    "That straight line is both the strength and the limit of simple interest. It is fair and transparent for short periods, which is why it still shows up on many short term loans, penalty calculations, treasury style notes and school exams. Over long periods it falls behind compound interest, where each year the rate also applies to everything earned before. Comparing the two side by side is the quickest way to feel why starting early matters so much for savers.",
    "Time handling trips people up more than the rate does. A rate quoted per year needs the time in years, so six months counts as 0.5 and ninety days counts as about 0.247 when you divide by 365. This calculator does that conversion for you, so you can think in the unit that matches your loan note or deposit slip and still get a correct yearly based answer.",
  ],
  faqs: [
    {
      q: "What is the formula for simple interest?",
      a: "Interest equals principal times rate times time, divided by 100, when the rate is a yearly percentage and the time is in years. The total amount is the principal plus that interest.",
    },
    {
      q: "How do I calculate simple interest for months or days?",
      a: "Convert the time to years first. Divide months by 12 and days by 365, then use the same formula. This calculator does the conversion automatically when you pick a unit.",
    },
    {
      q: "What is the difference between simple and compound interest?",
      a: "Simple interest is paid only on the original principal. Compound interest is paid on the principal plus interest already earned, so it grows faster and faster over time.",
    },
    {
      q: "Where is simple interest still used in real life?",
      a: "It appears on many short term loans, some bonds and deposit products, late payment penalties, and in most school and exam questions because it is clear and easy to verify by hand.",
    },
    {
      q: "Does a zero rate mean no interest at all?",
      a: "Yes. At a zero percent rate the interest is exactly zero no matter how long the period is, and the total amount stays equal to the principal.",
    },
  ],
};
