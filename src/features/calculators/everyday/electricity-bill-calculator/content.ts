import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Electricity Bill Calculator: From Units, Tiers or One Appliance",
  metaDescription:
    "Estimate your electricity bill from total units with a flat rate, fixed charge and tax, work through tiered slab pricing with a band by band breakdown, or find what a single appliance costs to run each month.",
  intro:
    "Electricity bills mix units, slabs, fixed charges and tax into one unhelpful total. This calculator untangles them: estimate a bill from your total units, flat or tiered, or switch modes to see what one appliance is really costing you every month.",
};

export const content: ToolContent = {
  seoTitle: "Electricity Bill Calculator: From Units, Tiers or One Appliance",
  howTo: [
    "Choose whether you are estimating a bill from total units or costing a single appliance.",
    "For a bill, enter the units in kWh from your meter or last bill, then your rate per unit, any fixed charge and any tax percentage.",
    "If your tariff charges different rates for different blocks of units, tick tiered pricing and fill in up to three tiers, leaving the last limit blank so it covers the rest.",
    "For an appliance, enter its watts, how many hours a day it runs and how many days a month, and read its monthly energy and cost.",
  ],
  explanationTitle: "How an electricity bill is built up",
  explanation: [
    "At its simplest, a bill is units times price. One unit is one kilowatt hour, the energy used by a 1000 watt appliance running for one hour. Multiply your units by the rate per unit and you have the energy charge. Most bills then add a fixed charge, a standing amount you pay for being connected at all, and many add tax or VAT as a percentage of the subtotal. So the total is energy charge plus fixed charge, plus tax on that combined figure.",
    "Tiered tariffs, often called slabs, price units progressively. The first block of units is cheap, the next block costs more, and heavy use is charged at the highest rate. The key word is progressively: only the units inside a block pay that block rate, not your whole usage. A home using 250 units with tiers at 100 might pay the low rate on the first 100 and the higher rate only on the remaining 150, which is exactly the breakdown this calculator shows.",
    "The appliance mode runs the same maths in miniature. Watts divided by 1000 gives kilowatts, times hours per day, times days per month gives monthly kilowatt hours. A modest 100 watt device running ten hours a day uses 30 units a month, while a 2000 watt heater used the same way uses 600. That is why one hungry appliance, not a house full of small ones, is usually behind a shocking bill.",
  ],
  faqs: [
    {
      q: "What is one unit of electricity?",
      a: "One unit is one kilowatt hour, written kWh. It is the energy a 1000 watt appliance uses in one hour, or a 100 watt bulb uses in ten hours. Your meter counts units, your tariff prices them, and the product of the two is the heart of your bill.",
    },
    {
      q: "How do tiered or slab tariffs work?",
      a: "Units are split into blocks and each block has its own rate. The first block is charged at the lowest rate, the next block at a higher one, and so on. Only the units inside a block pay that block rate, so moving into a higher tier raises the price of the extra units, not of everything you used.",
    },
    {
      q: "Why is my bill high even when I barely use anything?",
      a: "The fixed charge is part of the answer: it is payable even at zero units. The other common culprit is one powerful appliance running for long hours, such as a heater, an old fridge or a water pump. Try the appliance mode on your biggest devices and the bill usually explains itself.",
    },
    {
      q: "Where do I find my rate per unit?",
      a: "It is printed on your bill, usually near the unit count, and also published in your supplier tariff sheet. With tiered tariffs there will be several rates, one per block. If you only want a rough estimate, using the highest rate you pay gives a cautious upper figure.",
    },
    {
      q: "Does this calculator match my supplier bill exactly?",
      a: "It matches the structure: energy charge, fixed charge and tax. Small differences can still appear because suppliers may add levies, fuel adjustments, meter rent or rounding rules of their own. Treat the result as a close estimate and a way to check that a real bill is broadly right, rather than a replacement for it.",
    },
  ],
};
