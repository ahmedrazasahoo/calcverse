import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Percentage Decrease Calculator: Price Drops and Discounts",
  metaDescription:
    "Find out how far a number has fallen in percent, or take a percent off any value. Built for sale prices, shrinking bills and discounts, with the amount removed shown clearly.",
  intro:
    "A jacket drops from 200 to 150. A bill shrinks, a battery drains, a weight target gets closer. This calculator turns those falls into a clear percentage, and it can also take a percent off a number before you spend anything.",
};

export const content: ToolContent = {
  seoTitle: "Percentage Decrease Calculator: Price Drops and Discounts",
  howTo: [
    "Choose a mode at the top. The two numbers mode suits a price you watched fall, while the single number mode suits a discount you are about to apply.",
    "For two numbers, enter the original value first, then the lower value it dropped to.",
    "For a single number, enter the starting amount and the percent to take off, such as 80 with 25 percent off in a sale.",
    "Check the percentage drop and the difference, or the reduced price and exactly how much came off.",
  ],
  explanationTitle: "How a percentage decrease is worked out",
  explanation: [
    "Start with the size of the fall in plain numbers: original value minus new value. Then divide that fall by the original value and multiply by 100. Dropping from 200 to 150 is a fall of 50, and 50 divided by 200 gives 0.25, a 25 percent decrease. Shops love quoting the percent because it sounds uniform, but the plain difference matters too: 25 percent off a small item and 25 percent off a car are very different amounts of money.",
    "Taking a percent off works from the other direction. Multiply the starting value by what remains after the cut. Removing 25 percent leaves 75 percent, so 80 times 0.75 gives a reduced value of 60, with 20 removed. This remaining share trick is the fastest mental check in a shop: 10 percent off leaves nine tenths, 50 percent off leaves half, and 100 percent off leaves nothing at all.",
    "Watch out for falls that look equal but are not. A stock that drops 25 percent needs a 33.3 percent climb just to get back where it started, because the recovery is measured from the lower base. The way down and the way back are measured against different starting points, so they never mirror each other neatly.",
  ],
  faqs: [
    {
      q: "How do I work out the percentage drop of a sale price?",
      a: "Subtract the sale price from the original price, divide by the original price, and multiply by 100. A fall from 200 to 150 is a drop of 50, and 50 divided by 200 is 25 percent off.",
    },
    {
      q: "What is left after taking 25 percent off 80?",
      a: "Taking 25 percent off removes a quarter of the value, which is 20, leaving 60. In the single number mode the calculator shows both the reduced value and the amount removed.",
    },
    {
      q: "Can a decrease be bigger than 100 percent?",
      a: "Not for ordinary positive values. A 100 percent decrease brings a value exactly to zero, and there is nothing left to remove. That is why this calculator caps the percent you take off at 100.",
    },
    {
      q: "Why does the drop look negative when my number went up?",
      a: "Because the tool honestly reports direction. If the new value is higher than the old one, the fall is negative, which is the way this calculator says the number grew instead of shrinking.",
    },
    {
      q: "Is 30 percent off then another 20 percent off the same as 50 percent off?",
      a: "No. The second discount applies to the already reduced price. Starting at 100, 30 percent off leaves 70, and 20 percent off 70 leaves 56, a total saving of 44 percent, not 50.",
    },
  ],
};
