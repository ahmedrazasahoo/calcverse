import type { ToolContent } from "@/lib/content";

export const content: ToolContent = {
  seoTitle: "Percentage Calculator: Percent Of, Percent Change and More",
  howTo: [
    "Find the box that matches your question. There are three: a percentage of a number, one number as a percent of another, and percentage change between two values.",
    "Type your two numbers into that box.",
    "The answer appears instantly underneath, updating as you type.",
  ],
  explanationTitle: "The three percentage formulas",
  explanation: [
    "A percentage is simply a fraction out of one hundred. To find what X percent of Y is, multiply Y by X and divide by 100. So 15 percent of 200 is 200 x 15 / 100, which is 30. This is the calculation behind discounts, tips, tax and interest.",
    "To find what percent one number is of another, divide the part by the whole and multiply by 100. If you scored 45 out of 180, that is 45 / 180 x 100, which is 25 percent. The result can go above 100 whenever the part is bigger than the whole you are comparing it with.",
    "Percentage change compares an old value with a new one. Subtract the old from the new, divide by the old value, and multiply by 100. A price rising from 120 to 150 gives (150 minus 120) / 120 x 100, a 25 percent increase. A negative result means the value went down, which this calculator reports as a decrease.",
  ],
  faqs: [
    {
      q: "How do I calculate a percentage of a number in my head?",
      a: "Start with 10 percent, found by moving the decimal point one place to the left. From there, 5 percent is half of that, and 1 percent is the decimal moved two places. Combine pieces: 35 percent of 80 is 28, built from 10 percent (8) times three, plus 5 percent (4).",
    },
    {
      q: "What is the difference between percentage points and percent?",
      a: "If an interest rate rises from 4 percent to 5 percent, that is a rise of one percentage point, but a 25 percent relative increase. News reports mix these up often, so it is worth checking which one a headline is using.",
    },
    {
      q: "Can a percentage be more than 100?",
      a: "Yes. Whenever the part is larger than the whole it is compared against, the percentage passes 100. A shop that sells 250 units against a target of 200 has reached 125 percent of its target.",
    },
    {
      q: "Why does a 50 percent loss need a 100 percent gain to recover?",
      a: "Because the base changes. Losing 50 percent of 100 leaves 50, and getting back to 100 means adding 50 on a base of 50, which is a 100 percent gain. Percentages going down and coming back up are not symmetrical.",
    },
    {
      q: "How do I find the original price before a discount?",
      a: "Divide the sale price by what is left of the percentage. If an item costs 80 after a 20 percent discount, it was sold at 80 percent of the original, so 80 / 0.8 gives an original price of 100.",
    },
  ],
};
