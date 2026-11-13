import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free discount calculator. Find the sale price and how much you save after a percent off, stacked discounts and sales tax, with the maths shown step by step.";

export const intro =
  "Sale signs love big percentages and small print. Enter the price and the percent off and this calculator shows the price you actually pay, what you save, and what happens when discounts stack or tax joins in.";

export const content: ToolContent = {
  seoTitle: "Discount Calculator: Sale Price, Savings, Stacked Discounts and Tax",
  howTo: [
    "Enter the original price and the discount percentage from the tag or coupon.",
    "If the shop adds a second offer at checkout, put it in the extra discount box. Leave it empty for a single discount.",
    "Add your local sales tax rate if you want the true final total, because tax is charged on the discounted price, not the original.",
    "Read what you pay, what you save, and the true combined percentage off, which is the honest number to compare between shops.",
  ],
  explanationTitle: "How discounts really stack up",
  explanation: [
    "A single discount is simple: the percent off is taken from the price, and what remains is what you pay. Twenty five percent off 120 leaves 90, and the saving is 30. Shops know that shoppers anchor on the percentage, which is why the same maths run backwards matters: a price cut from 120 to 90 really is 25 percent off, but a cut from 120 to 100 is only about 17 percent, however the poster dresses it up.",
    "Stacked discounts are where intuition fails. An extra 10 percent off after 20 percent off does not make 30 percent off. The second discount applies to the already reduced price, so 100 becomes 80, then 72. The true total saving is 28 percent. Each step multiplies what is left, and multiplication never adds up as generously as the signs suggest. This calculator shows every step so you can see the running price fall.",
    "Tax comes last, and the order matters in your favour. Sales tax and VAT are charged on the discounted price in almost every system, so a discount saves you a little tax as well as a little price. If a shop ever charges tax on the pre discount figure, that is worth questioning.",
  ],
  faqs: [
    {
      q: "How do I work out a percentage discount in my head?",
      a: "Find 10 percent by moving the decimal point one place left, then build from there. For 25 percent off, take 10 percent twice (20 percent) and add half of 10 percent (5 percent), then subtract the total from the price. For quick shopping maths that is close enough to check any tag.",
    },
    {
      q: "Is 50 percent off plus an extra 20 percent off the same as 70 percent off?",
      a: "No. On a price of 100, half price leaves 50, and 20 percent off 50 leaves 40. The combined saving is 60 percent, not 70. Stacked discounts always underdeliver compared with adding the numbers, because the second one works on a smaller base.",
    },
    {
      q: "Do I pay sales tax on the original or the discounted price?",
      a: "On the discounted price, in the United States, the European Union and most other systems. The discount reduces the taxable amount. Manufacturer coupons occasionally differ from store discounts in a few US states, but for ordinary sales the rule is tax after discount.",
    },
    {
      q: "How do I check whether a sale price is honest?",
      a: "Work the percentage backwards: subtract the sale price from the original, divide by the original, and multiply by 100. If the tag claims 40 percent off and the backwards maths says 31, the anchor price was probably raised or never real. The discount between two prices is exactly that backwards calculation.",
    },
    {
      q: "What does percent off mean for buy one get one free?",
      a: "On two identical items it equals 50 percent off the pair, but only if you wanted two. Spread over the single item you actually needed, the saving is nothing and the spending doubled. Percent off figures always assume you buy the quantity the offer wants.",
    },
  ],
};
