import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "VAT Calculator: Add or Remove VAT at Any Country Rate",
  metaDescription:
    "Add VAT to a net price or pull it out of a price that already includes it. Pick a country preset like the UK at 20 percent, Germany at 19 or the UAE at 5, or type any custom rate.",
  intro:
    "VAT looks simple until a price on a shelf already includes it and you need the figure before tax for an invoice, a refund or a margin check. This calculator works both ways, with ready made rates for common countries and a custom rate for everywhere else.",
};

export const content: ToolContent = {
  seoTitle: "VAT Calculator: Add or Remove VAT at Any Country Rate",
  howTo: [
    "Enter the amount you are starting from.",
    "Pick a country preset to fill in its standard VAT rate, or choose Custom and type any rate yourself. You can also edit the rate field after picking a preset.",
    "Select Add VAT when your amount is the price before tax, or Remove VAT when the amount already includes tax.",
    "Read the net amount, the VAT amount and the gross amount, and change the currency symbol if you need a different one for your invoice.",
  ],
  explanationTitle: "How VAT is added and taken back out",
  explanation: [
    "Adding VAT is a straight percentage on top of the net price. At 20 percent, a net price of 100 gains 20 of tax and sells for 120. The trap appears in the other direction. When a receipt shows 120 and you want the part that is tax, subtracting 20 percent of 120 gives the wrong answer, because the tax was charged on the net price, not on the total. The correct step is to divide 120 by 1.20, which returns the net price of 100 and leaves 20 as the VAT.",
    "Standard rates vary a lot around the world. The United Kingdom and France sit at 20 percent, Germany at 19, Italy at 22 and Ireland at 23, while the United Arab Emirates charges only 5 and Saudi Arabia 15. South Africa is also at 15, and Pakistan applies an 18 percent sales tax on most goods, which is why it appears in the presets as Pakistan (GST). Many countries also run reduced rates for food, books, energy or hospitality, so treat the preset as the headline rate and check whether your item qualifies for a lower one.",
    "Businesses registered for VAT collect this tax from customers and hand it to the government, claiming back the VAT they paid on their own purchases along the way. That chain is why getting the net and gross figures right matters on every single invoice: a small rounding habit repeated across hundreds of invoices becomes a real discrepancy at filing time.",
  ],
  faqs: [
    {
      q: "How do I remove VAT from a price that already includes it?",
      a: "Divide the price by (1 plus the rate as a decimal). At 20 percent, divide by 1.20. The result is the net price, and the difference between the two figures is the VAT. Never subtract the percentage from the total, as that understates the net price.",
    },
    {
      q: "What is the standard VAT rate in the UK?",
      a: "The standard rate in the United Kingdom is 20 percent. A reduced rate of 5 percent applies to some items such as domestic energy, and many foods and childrens clothes are zero rated.",
    },
    {
      q: "Can I use a rate that is not in the country list?",
      a: "Yes. Choose Custom in the country list, or simply type over the rate field after picking a preset. Any rate from 0 to 100 percent works, which covers reduced rates and countries not listed.",
    },
    {
      q: "What is the difference between net and gross?",
      a: "Net is the price before VAT. Gross is the price after VAT has been added. If you buy something for a gross price of 120 at 20 percent VAT, the net price is 100 and the tax makes up the remaining 20.",
    },
    {
      q: "Is VAT the same as GST?",
      a: "They are close cousins. Both tax the value added at each stage of a sale and both are usually charged as a percentage of the price. The name differs by country: VAT in the UK and Europe, GST in places like India, Canada and Pakistan for its sales tax on goods.",
    },
  ],
};
