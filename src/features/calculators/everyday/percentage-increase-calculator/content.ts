import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Percentage Increase Calculator: How Much Did It Grow?",
  metaDescription:
    "Work out a percentage increase in seconds. Compare an old value with a new one, or grow any number by a chosen percent and see the new total and the amount added.",
  intro:
    "Prices creep up, salaries get a raise, follower counts climb. This calculator answers the two questions behind all of that: by what percent did something grow, and what does a number become after a given percent is added to it?",
};

export const content: ToolContent = {
  seoTitle: "Percentage Increase Calculator: How Much Did It Grow?",
  howTo: [
    "Pick a mode at the top. Choose the two numbers mode when you already know the old and new values, or the single number mode when you know the percent you want to add.",
    "In two numbers mode, type the old value first and the new value second. Order matters, because the old value is the base of the calculation.",
    "In single number mode, type the starting number and the percent increase, for example a price of 150 and a rise of 20 percent.",
    "Read the percentage change and the raw difference, or the new value and the amount that was added.",
  ],
  explanationTitle: "How a percentage increase is worked out",
  explanation: [
    "An increase is always measured against where you started. Take the new value, subtract the old value, divide that gap by the old value, then multiply by 100. A jump from 80 to 100 has a gap of 20, and 20 divided by 80 is 0.25, so the increase is 25 percent. The same gap of 20 would be a much smaller increase on a base of 400, only 5 percent, which is why the starting point can never be skipped.",
    "Growing a number by a percent runs the same maths in reverse. Multiply the number by one plus the percent divided by 100. Adding 20 percent to 150 means multiplying by 1.2, giving 180. The added slice is 30, and you can check it another way: 10 percent of 150 is 15, so 20 percent is twice that, 30.",
    "One trap catches people often. Two rises in a row do not simply add together. A price that rises 10 percent and then another 10 percent has grown by 21 percent overall, because the second rise applies to the already lifted price. The same logic explains why a pay rise that sounds modest can feel bigger after a few years of compounding.",
  ],
  faqs: [
    {
      q: "How do I find the percentage increase between two numbers?",
      a: "Subtract the old number from the new number, divide the result by the old number, and multiply by 100. From 80 to 100: the gap is 20, 20 divided by 80 is 0.25, so the increase is 25 percent.",
    },
    {
      q: "What does a 100 percent increase actually mean?",
      a: "It means the value has doubled. The amount added equals the whole starting value, so 50 growing by 100 percent becomes 100. A 200 percent increase triples the value, because you add twice the starting amount.",
    },
    {
      q: "Can this calculator show a decrease instead?",
      a: "Yes. If the new value is smaller than the old one, the percentage change comes out negative and the result card says so plainly. The maths is identical, only the direction changes.",
    },
    {
      q: "Why can the old value not be zero?",
      a: "Because the increase is a share of the starting value, and dividing by zero has no answer. Growing from nothing to something is a real event, but it cannot be expressed as a percentage of zero.",
    },
    {
      q: "How do I add a percent to a price for a markup?",
      a: "Use the single number mode. Enter the cost as the number and the markup as the percent. A cost of 150 with a 20 percent markup gives a selling price of 180, with 30 of markup shown separately.",
    },
  ],
};
