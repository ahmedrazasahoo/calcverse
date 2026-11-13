import type { ToolContent } from "@/lib/content";

export const content: ToolContent = {
  seoTitle: "Tip Calculator: Split Any Bill Fairly in Seconds",
  howTo: [
    "Type in the bill amount before tip.",
    "Tap one of the preset tip percentages, or type your own in the custom field.",
    "Enter how many people are splitting the bill.",
    "Read the tip, the total, and exactly what each person should pay.",
  ],
  explanationTitle: "How tipping and bill splitting work",
  explanation: [
    "A tip is calculated as a percentage of the bill. A 60 dollar bill with an 18 percent tip gives a tip of 10.80, for a total of 70.80. When a group splits the bill, the fair approach is to divide the full total, tip included, by the number of people, so everyone shares the tip in the same proportion as the food.",
    "Customary tip rates vary by country and situation. In the United States, 15 to 20 percent is standard for table service at a restaurant, with 18 to 20 percent common for good service. Many other countries round up or add 5 to 10 percent, and in some places service is already included in the bill, so it is worth a quick glance at the check before adding more.",
    "This calculator updates the moment you change any number, so you can test a few percentages and settle on one the whole table is comfortable with.",
  ],
  faqs: [
    {
      q: "How much should I tip at a restaurant?",
      a: "In the US, 15 percent is a baseline for adequate service, 18 to 20 percent for good service, and 25 percent or more for an exceptional experience. For takeout, a small tip of 5 to 10 percent is a kind gesture but not an obligation.",
    },
    {
      q: "Should the tip be calculated before or after tax?",
      a: "Tradition says on the pre-tax amount, since the tip rewards service rather than the tax rate. Plenty of people simply tip on the final total for simplicity. The difference is usually small, and either approach is socially fine.",
    },
    {
      q: "How do I split a bill when people ordered very different amounts?",
      a: "This calculator splits evenly, which suits most shared meals. If orders were wildly uneven, each person can tip on their own subtotal instead: take their share, add the chosen percentage, and pay that figure.",
    },
    {
      q: "What is a quick way to work out a tip without a calculator?",
      a: "Find 10 percent by moving the decimal point one place left, then build from there. For 20 percent, double the 10 percent figure. For 15 percent, add half of the 10 percent figure to it.",
    },
    {
      q: "Do I tip on delivery orders?",
      a: "Yes, delivery drivers rely on tips much like servers do. A common range is 10 to 15 percent of the order, with a reasonable minimum for small orders, and a little extra in bad weather or for long distances.",
    },
  ],
};
