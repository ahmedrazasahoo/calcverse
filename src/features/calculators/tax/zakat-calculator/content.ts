import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Zakat Calculator: Work Out Your 2.5 Percent on Wealth, Gold and Silver",
  metaDescription:
    "Calculate zakat on cash, gold, silver, business goods and receivables at 2.5 percent. Nisab checked against silver (612.36g) or gold (87.48g) at your current metal prices.",
  intro:
    "Zakat is 2.5 percent of the wealth you have held for a lunar year, once that wealth passes the nisab threshold. The maths is simple; the care is in valuing everything properly. This calculator walks through each asset, checks the nisab on your chosen basis, and gives you the amount due.",
};

export const content: ToolContent = {
  seoTitle: "Zakat Calculator: Work Out Your 2.5 Percent on Wealth, Gold and Silver",
  howTo: [
    "Enter today's gold and silver price per gram in your currency. The nisab check depends on these, so use a current jeweller or market rate.",
    "Add your cash, bank balances, gold and silver by weight, business stock, and money owed to you that you expect back.",
    "Enter debts that are due within the year if you follow the view that they are deductible.",
    "Leave the nisab basis on silver unless your school of thought directs you to gold, then read the amount due.",
  ],
  explanationTitle: "How zakat and the nisab are calculated",
  explanation: [
    "The nisab is the minimum wealth that makes zakat obligatory. It is defined by metal weight: 87.48 grams of gold (7.5 tola) or 612.36 grams of silver (52.5 tola). Converted at today's prices, the silver nisab is far lower than the gold one, so more people owe zakat on the silver basis. Most scholars recommend the silver basis for cash and mixed wealth because it benefits the poor more and covers more givers; this calculator defaults to it and lets you switch.",
    "Once your net wealth reaches the nisab, zakat is 2.5 percent of the whole zakatable amount, not just the part above the threshold. Zakatable wealth includes cash, bank deposits, gold and silver (valued at market price, whether jewellery held as wealth or bullion), goods bought for resale at their current selling value, and loans you have given that you genuinely expect to recover. Your home, car, furniture and personal items are not zakatable.",
    "On liabilities, scholars differ. The common approach used here deducts debts due within the coming year, such as rent, bills and the current portion of loans, rather than the full balance of long term financing. If your situation is complex, a business with partners, pension funds, or debts you are unsure about, treat this result as a careful estimate and confirm the details with a scholar you trust.",
  ],
  faqs: [
    {
      q: "What is the nisab for zakat?",
      a: "The nisab is 87.48 grams of gold or 612.36 grams of silver. In money terms it is whichever threshold you choose, valued at today's metal price. This calculator computes both values from the prices you enter.",
    },
    {
      q: "Should I use the gold or silver nisab?",
      a: "The silver nisab is lower, so it brings more people into paying zakat and gives more to the poor. Most scholars advise using the silver nisab for money and mixed assets. If you follow a specific school of thought or a trusted scholar's direction to use gold, switch the basis in the calculator.",
    },
    {
      q: "Is zakat due on gold jewellery?",
      a: "Views differ by school of thought. The Hanafi school holds that gold and silver jewellery is zakatable at its metal value; others exempt jewellery in regular personal use. Enter the weight and value if you follow the view that it is due, and check with a scholar for your situation.",
    },
    {
      q: "Can I deduct my debts?",
      a: "Most approaches allow deducting debts that are due within the year, like bills, rent and the near term portion of loans. Long term debt treatment varies. The calculator deducts the liabilities figure you enter, so enter what matches the scholarly view you follow.",
    },
    {
      q: "When is zakat due?",
      a: "Zakat becomes due when your wealth has stayed at or above the nisab for one full lunar year (hawl). Many people choose a fixed date each Ramadan to calculate and pay, which keeps the habit regular and easy to remember.",
    },
    {
      q: "Does zakat apply to my salary?",
      a: "Zakat is on saved wealth, not on income as it arrives. Salary that you have saved and held past your zakat date counts as part of your cash and bank balances. Money already spent on living costs is not included.",
    },
  ],
};
