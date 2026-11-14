import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Stamp Duty Calculator: UK SDLT on Homes in England and Northern Ireland",
  metaDescription:
    "Free UK stamp duty calculator for England and Northern Ireland with the rates in force from 1 April 2025. Work out SDLT on any home price, with first time buyer relief and a band by band breakdown.",
  intro:
    "Stamp Duty Land Tax is charged in slices, so the headline rates mislead until you run the numbers. Enter the price, say whether every buyer is a first time buyer, and see the total SDLT, the effective rate and exactly how much tax falls in each band. Rates checked November 2026.",
};

export const content: ToolContent = {
  seoTitle: "Stamp Duty Calculator: UK SDLT on Homes in England and Northern Ireland",
  howTo: [
    "Enter the full purchase price of the home in pounds.",
    "Choose the buyer type: standard, or first time buyer if every single buyer is buying their first home.",
    "Read the total stamp duty and the effective rate, which is the tax as a share of the whole price.",
    "Check the band by band breakdown to see how much of the price sits in each rate slice.",
    "If the first time buyer price is over £500,000, note the warning: relief is lost completely and the standard bands apply to the whole price.",
  ],
  explanationTitle: "How stamp duty works, slice by slice",
  explanation: [
    "Stamp Duty Land Tax, usually shortened to SDLT, is the tax paid when you buy property in England and Northern Ireland. It applies to purchases completing on or after 1 April 2025 at these standard residential rates: nothing on the first £125,000 of the price, 2 percent on the slice from £125,000 to £250,000, 5 percent on the slice from £250,000 to £925,000, 10 percent on the slice from £925,000 to £1,500,000, and 12 percent on anything above that. The slice structure matters. On a £300,000 home you do not pay 5 percent of £300,000. You pay nothing on the first £125,000, 2 percent of the next £125,000 (£2,500), and 5 percent of the final £50,000 (£2,500), a total of £5,000, which is an effective rate of about 1.67 percent. On a £1,000,000 home the slices give £2,500 plus £33,750 plus £7,500, a total of £43,750. Rates checked November 2026, verified on gov.uk and unchanged through the October 2026 Budget.",
    "First time buyers get a better deal, with sharp edges. When every buyer is a first time buyer, the tax free slice rises to £300,000 and the slice from £300,000 to £500,000 is charged at 5 percent, so a £300,000 first home costs nothing in SDLT and a £400,000 one costs £5,000. But the relief has a cliff edge: buy at £500,001 and the relief is not trimmed, it is removed entirely, and the standard bands apply to the whole price from the first pound. A £600,000 purchase by first time buyers therefore pays the full standard bill of £20,000, exactly the same as any other buyer. Joint buyers should check carefully, because if even one buyer has owned a home before, nobody on the purchase qualifies for the relief.",
    "Know what this calculator leaves out. It covers standard residential purchases by UK resident buyers of a single home. It does not include the additional property surcharge that applies when you already own a home and are buying another, or the non-resident surcharge for buyers based overseas, and both can add a substantial amount. Non-residential and mixed use purchases use different, lower bands. Scotland does not charge SDLT at all: it charges Land and Buildings Transaction Tax, and Wales charges Land Transaction Tax, each with its own bands and its own first time buyer rules. SDLT is normally collected by your solicitor or conveyancer and paid to HMRC within 14 days of completion, so the figure here is a planning estimate for budgeting, confirmed against the official HMRC calculator before you commit.",
  ],
  faqs: [
    {
      q: "How much stamp duty is on a £300,000 house?",
      a: "For a standard buyer, £5,000: nothing on the first £125,000, 2 percent on the next £125,000 (£2,500) and 5 percent on the remaining £50,000 (£2,500). For first time buyers where every buyer qualifies, it is £0, because the whole price falls inside the £300,000 tax free slice of first time buyer relief.",
    },
    {
      q: "What happens to first time buyer relief over £500,000?",
      a: "It is lost completely, not reduced gradually. Above £500,000 the standard bands apply to the entire price, starting from the first pound. At £600,000 that means £20,000 of SDLT, the same bill a non first time buyer would pay, which is why the calculator flags this state explicitly.",
    },
    {
      q: "Do all buyers need to be first time buyers to get the relief?",
      a: "Yes. First time buyer relief requires every person buying the property to be a first time buyer who intends to live in it as their main home. If one joint buyer has owned a home before, anywhere in the world, the relief cannot be claimed on that purchase at all.",
    },
    {
      q: "Is stamp duty the same across the whole UK?",
      a: "No. SDLT only applies in England and Northern Ireland. Scotland charges Land and Buildings Transaction Tax (LBTT) and Wales charges Land Transaction Tax (LTT), both with different bands, thresholds and first time buyer rules, so use the calculator for the nation where the property actually is.",
    },
    {
      q: "Does this calculator include the additional property surcharge?",
      a: "No. The surcharge on additional properties, such as a second home or a buy to let bought while you still own your main home, is not included, and neither is the non-resident surcharge. If either applies to you, your real bill will be higher than the figure shown here, and the official HMRC calculator or your conveyancer can work out the full amount.",
    },
  ],
};
