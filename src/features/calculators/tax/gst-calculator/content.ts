import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "GST Calculator: Add or Remove GST and Split CGST, SGST and IGST",
  metaDescription:
    "Add GST to a price or strip it out of a GST inclusive amount at 5, 12, 18 or 28 percent. See the CGST and SGST split for local sales, or full IGST for inter state supply.",
  intro:
    "Invoice maths goes wrong in one predictable place: someone adds GST that was already inside the price, or splits it wrong between state and centre. This calculator handles both directions cleanly and shows the CGST, SGST and IGST split your invoice actually needs.",
};

export const content: ToolContent = {
  seoTitle: "GST Calculator: Add or Remove GST and Split CGST, SGST and IGST",
  howTo: [
    "Enter the amount you are working with.",
    "Choose the GST slab for your product or service: 0, 5, 12, 18 or 28 percent.",
    "Select Add GST if your amount is the base price, or Remove GST if the amount already includes tax.",
    "Leave the supply type on within state for the CGST plus SGST split, or switch to inter state to see the full amount as IGST.",
  ],
  explanationTitle: "How GST is added, removed and split",
  explanation: [
    "Adding GST is simple multiplication: tax equals the base price times the slab rate, and the invoice total is the two added together. Removing GST is where people slip. You cannot subtract the percentage from the final price, because the tax was charged on the base, not on the total. The correct move is to divide the inclusive amount by (1 plus the rate). At 18 percent, a price of 1,180 divides by 1.18 to give a base of 1,000 and tax of 180.",
    "Within a state, GST splits into two equal halves: CGST for the central government and SGST for the state. An 18 percent slab becomes 9 percent CGST and 9 percent SGST. When goods or services cross a state border, no split happens and the entire amount is charged as IGST, which the centre collects and later settles with the states.",
    "India's slab structure, set by the GST Council, places most goods and services at 5, 12, 18 or 28 percent, with essentials and exports commonly at zero. If you are unsure which slab your item falls in, check its HSN or SAC code classification before invoicing, because charging the wrong rate creates corrections, notices and unhappy customers downstream.",
  ],
  faqs: [
    {
      q: "How do I remove GST from an inclusive price?",
      a: "Divide the inclusive price by (1 plus the GST rate). For 18 percent GST, divide by 1.18. The result is the base price, and the difference is the GST amount. Subtracting 18 percent directly gives a wrong, lower base.",
    },
    {
      q: "What is the difference between CGST, SGST and IGST?",
      a: "CGST is the central government's share and SGST is the state government's share; together they make up the full GST on sales within one state, split equally. IGST is the combined charge used on sales between states, collected by the centre.",
    },
    {
      q: "Which GST rate applies to my product?",
      a: "Rates depend on the HSN code for goods or SAC code for services, set by the GST Council. Common slabs are 5, 12, 18 and 28 percent. When in doubt, look up your code on the official GST portal or ask your accountant before invoicing.",
    },
    {
      q: "Does this calculator work for all GST slabs?",
      a: "Yes, it covers the standard slabs of 0, 5, 12, 18 and 28 percent in both directions, with the intra state and inter state split shown separately.",
    },
    {
      q: "Why does the remove calculation not just subtract the percentage?",
      a: "Because GST is charged on the base price, not on the final total. Subtracting the percentage from the total would also subtract tax on the tax itself. Division by (1 plus rate) reverses the original calculation exactly.",
    },
  ],
};
