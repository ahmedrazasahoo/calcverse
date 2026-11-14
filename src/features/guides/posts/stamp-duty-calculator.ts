import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "stamp-duty-calculator",
  keyword: "stamp duty calculator",
  title: "Stamp Duty Calculator: UK Bands, Reliefs and What You Will Pay",
  metaTitle: "Stamp Duty Calculator Guide: UK Bands and Worked Examples",
  metaDescription: "Learn how UK stamp duty is calculated band by band, how first time buyer relief and the additional property surcharge work, with a full worked example.",
  excerpt: "UK stamp duty explained band by band, with the standard residential rates from April 2025, a full worked example, first time buyer relief and the additional property surcharge.",
  category: "Finance and Tax",
  toolSlug: "stamp-duty-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "You have agreed a price on a home, organised your deposit and had your mortgage offer through, and then your solicitor mentions stamp duty. For many buyers it is the largest single bill in the whole move after the deposit itself, and it often arrives as a surprise because it cannot simply be added to most mortgages. A bill of several thousand pounds, due soon after completion, needs to be planned for from the start rather than discovered at the end.",
    "The fastest way to get a figure for your own purchase is to enter the price into the free [stamp duty calculator](/calculators/stamp-duty-calculator) and check whether any relief applies to you. This guide explains how that figure is built up, band by band, so you can follow the arithmetic yourself, question a quote if it looks wrong, and understand why two homes with fairly close prices can carry quite different tax bills.",
    "Stamp Duty Land Tax, usually shortened to SDLT, applies to residential property purchases in England and Northern Ireland. Scotland and Wales run their own property transaction taxes with different bands, so the rates in this guide do not apply there. The bands and reliefs described here are the standard residential ones that applied from April 2025. They are set by the government and can change at Budgets, sometimes with very little notice, so always check the figure again close to completion if a Budget has intervened.",
  ],
  keyPoints: [
    "Stamp duty is charged in slices: each band of the price is taxed at its own rate, not the whole price at one rate.",
    "Standard residential bands from April 2025: 0 percent to £125,000, 2 percent to £250,000, 5 percent to £925,000, 10 percent to £1.5 million, 12 percent above that.",
    "On a £350,000 main home the standard bill is £7,500, an effective rate of about 2.14 percent of the price.",
    "First time buyers get relief in general terms on lower priced first homes, which can reduce the bill to zero in some cases.",
    "Buying an additional residential property usually adds a 5 percent surcharge on top of the standard rates.",
    "The tax is normally paid through your solicitor around completion, and the return is due within 14 days of completion.",
  ],
  sections: [
    {
      heading: "What stamp duty is and who has to pay it",
      paragraphs: [
        "Stamp Duty Land Tax is a tax on buying property or land in England and Northern Ireland above a certain price. The buyer pays it, not the seller. It applies to freehold and leasehold purchases, outright or with a mortgage, and is based on the total consideration, usually the purchase price. Your solicitor will confirm what counts in your transaction.",
        "Most buyers never fill in the return themselves: the solicitor calculates the amount, collects it with the completion money, files the return and pays HMRC. It is still your tax bill, and an error can leave you liable later. Ask for the calculation in writing, band by band.",
        "Purchases at or below £125,000 pay nothing under the standard bands, and some transfers, such as certain transfers following a divorce or gifts with no consideration, are treated differently. Shared ownership purchases have their own options for how the tax is worked out, including paying on the full market value at the start or in stages as you buy more shares. This guide focuses on the ordinary case most readers face: buying a home to live in, at a stated price, with no unusual terms. If your deal involves linked transactions, a company purchase, multiple dwellings or a mixed residential and commercial property, get specialist advice, because different rates and reliefs can apply and the difference can be many thousands of pounds.",
      ],
    },
    {
      heading: "The standard residential bands from April 2025",
      paragraphs: [
        "Stamp duty is a slice system. You do not pay the top rate on the whole price. The first £125,000 is charged at 0 percent, the slice from £125,001 to £250,000 at 2 percent, from £250,001 to £925,000 at 5 percent, from £925,001 to £1.5 million at 10 percent, and anything above £1.5 million at 12 percent.",
        "Crossing a threshold does not tax the entire price at the higher rate. Buying at £251,000 only puts an extra slice into the 5 percent band; the portion below keeps its lower rates. There is no cliff edge in the standard bands, although first time buyer relief does have a price limit.",
        "These bands are a policy choice, not a permanent feature. Governments have raised and lowered the starting threshold several times, including temporary cuts that later expired, which is why older articles and well meaning advice from relatives can be badly out of date. The bands in this guide are the standard residential ones that applied from April 2025. They can change at Budgets, sometimes with very little notice, so treat any calculation as current only for the rules in force on your completion date, because it is normally the completion date, not the exchange date or the date you first viewed the property, that decides which rules apply. If a Budget falls during your purchase, ask your solicitor to confirm the figure again.",
      ],
      table: {
        caption: "Standard SDLT residential bands that applied from April 2025, for a main home",
        headers: ["Slice of the purchase price", "Rate on that slice", "Maximum tax in this slice"],
        rows: [
          ["£0 to £125,000", "0 percent", "£0"],
          ["£125,001 to £250,000", "2 percent", "£2,500"],
          ["£250,001 to £925,000", "5 percent", "£33,750"],
          ["£925,001 to £1,500,000", "10 percent", "£57,500"],
          ["Above £1,500,000", "12 percent", "No fixed maximum"],
        ],
      },
    },
    {
      heading: "Worked example: stamp duty on a £350,000 home",
      paragraphs: [
        "Amira buys in Leeds for £350,000 as her main home, with no relief. First £125,000 at 0 percent gives £0. Next £125,000 at 2 percent gives £2,500. Remaining £100,000 at 5 percent gives £5,000. Total: £7,500.",
        "That £7,500 is about 2.14 percent of the price, even though the top slice is taxed at 5 percent. At £250,000 the bill is £2,500 (1 percent). At £600,000 it is £20,000 (about 3.33 percent). At £1 million it is £43,750 (about 4.38 percent). The headline top rate overstates what a typical buyer pays overall.",
        "Charging 5 percent on the full £350,000 would give £17,500, which is £10,000 too much. That is the most common error in rough estimates. If a figure does not show its slices, rebuild it band by band or check it with the [stamp duty calculator](/calculators/stamp-duty-calculator).",
      ],
      steps: [
        "Start with the full purchase price: £350,000 in this example.",
        "Charge the first £125,000 at 0 percent: £0.",
        "Charge the next £125,000, up to £250,000, at 2 percent: £2,500.",
        "Charge the remaining £100,000, up to £350,000, at 5 percent: £5,000.",
        "Add the slices together: £0 plus £2,500 plus £5,000 equals £7,500 total stamp duty.",
      ],
    },
    {
      heading: "First time buyer relief, in general terms",
      paragraphs: [
        "Under the rules from April 2025, an eligible first time buyer pays no stamp duty on the first £300,000 and 5 percent on the portion from £300,001 to £500,000. If the price is more than £500,000, the relief is not available and standard bands apply instead. That limit is a real cliff edge, so model both sides if you are near £500,000.",
        "A quick example shows the value. A first time buyer purchasing at £300,000 pays nothing at all, compared with £5,000 under the standard bands (£2,500 at 2 percent on the second slice plus £2,500 at 5 percent on the £50,000 above £250,000). At £400,000, the relief gives a bill of 5 percent on £100,000, which is £5,000, compared with £10,000 under the standard bands. The saving is real money that can go towards furniture, moving costs or rebuilding an emergency fund after completion, so it is worth confirming your eligibility early rather than assuming your solicitor will spot it automatically. The nearer the price gets to £500,000, the more carefully you should check the position, because a small price rise can remove the relief entirely.",
        "Every buyer must be a first time buyer, meaning none has owned a residential property anywhere before, and the property must be your main home. A couple where one person has owned before will usually not qualify. Ask in writing before exchange if unsure. Our [UK salary take home pay guide](/guides/uk-salary-take-home-pay) helps check the monthly budget after the move.",
      ],
    },
    {
      heading: "The extra charge for additional properties",
      paragraphs: [
        "If you will own more than one residential property and are not replacing your main residence, a surcharge usually adds 5 percentage points to each band, so rates become 5 percent, 7 percent, 10 percent and so on. It can also catch movers whose sale has not completed yet.",
        "At £350,000 as an additional property: £125,000 at 5 percent is £6,250, next £125,000 at 7 percent is £8,750, final £100,000 at 10 percent is £10,000. Total £25,000, compared with £7,500 for a main home. The surcharge alone is £17,500.",
        "If you buy a new main home before selling your old main home, you will usually pay the surcharge at completion because you own two properties at that moment. But if you then sell the previous main home within the time limit set by the rules, generally three years in most cases, you can claim a refund of the surcharge part of the bill. The refund is not automatic: you, or your solicitor, must claim it after the sale. Diary the deadline from the day you complete, keep the paperwork from both transactions, and do not spend the expected refund until it has actually arrived. Rules on spouses, civil partners and properties owned by a partner can affect the analysis, so take advice on your exact facts if a partner owns another property, even a small share in a family home.",
      ],
    },
    {
      heading: "When and how the tax is paid",
      paragraphs: [
        "Stamp duty is tied to completion, the day the purchase legally finishes and the keys change hands. Your solicitor will normally ask you to transfer the full completion funds, including the stamp duty, in advance so the money is cleared in time. The land transaction return must be filed and the tax paid within 14 days of completion in most cases, and solicitors build their process around that deadline because late filing can bring penalties and interest. In practical terms you will rarely deal with HMRC directly, but you should still see the figure on your completion statement as a separate line and be able to match it to your own band by band calculation. If the two figures differ, ask why before the money moves.",
        "Budgeting is where buyers most often come unstuck. Stamp duty usually has to be paid in cash from savings. Some lenders allow you to borrow more on the mortgage and use that larger loan to free up cash for the tax, but that is not the same as adding the tax to the mortgage after the fact, and it affects your loan to value band and possibly your interest rate. Work out the likely bill at the offer stage, not the completion stage, and hold that amount back from your deposit calculations. A buyer with £60,000 saved who plans a £50,000 deposit on a £350,000 home has only £10,000 left for stamp duty, legal fees, removals and surveys combined, which is tight once the £7,500 tax bill is included. Building the tax into the budget from the first viewing prevents a last minute scramble.",
        "Keep your completion statement and filing certificate. Tell your solicitor at the start about any government scheme, shared ownership or non residential element. Businesses may also need our [VAT calculator guide](/guides/vat-calculator).",
      ],
    },
    {
      heading: "Common mistakes, and how to check your bill",
      paragraphs: [
        "Most wrong estimates come from a short list of repeat errors. The first is applying a single rate to the whole price, which overstates the bill on any purchase above £250,000. The second is using out of date bands, often from the temporary higher thresholds that applied before April 2025, which understates the bill and leaves a nasty gap in the moving budget. The third is forgetting the additional property surcharge, or assuming it is a small flat fee rather than 5 percent of the price added across the bands. The fourth is assuming first time buyer relief applies when a joint buyer has owned before. Each of these is easy to make in conversation and easy to avoid on paper by working through the slices in order.",
        "Saving £10,000 on a £400,000 home saves roughly £500 of tax at the 5 percent marginal rate. The bigger effect is the £500,000 ceiling for first time buyer relief. Model total cost, price plus tax plus fees, not price alone.",
        "Your final check takes five minutes. Write down the price, work through the bands in slices, apply any relief or surcharge that fits your situation, and compare your answer with your solicitor figure and with the [stamp duty calculator](/calculators/stamp-duty-calculator). If the three disagree, find out why before completion, not after. Readers outside the UK, or comparing tax systems, can see a different structure in our [sales tax calculator guide](/guides/sales-tax-calculator), where tax is added at the till rather than charged on a property price. For more guides on property costs, pay and everyday tax, browse the [guides hub](/guides) and plan the full budget in one sitting.",
      ],
      bullets: [
        "Always calculate in slices, one band at a time, and write each slice down.",
        "Check which set of bands applies on your completion date if a Budget has been announced.",
        "Confirm first time buyer status for every named buyer, not just yourself.",
        "Tell your solicitor about any other property you or a partner own, however small the share.",
        "Keep the completion statement and filing certificate with your other property papers.",
      ],
    },
  ],
  faqs: [
    {
      q: "How is stamp duty calculated on a £350,000 house?",
      a: "In slices under the standard bands from April 2025. The first £125,000 is at 0 percent, the next £125,000 is at 2 percent giving £2,500, and the remaining £100,000 is at 5 percent giving £5,000. The total is £7,500, assuming it is your main home and no relief or surcharge applies.",
    },
    {
      q: "Do first time buyers pay stamp duty?",
      a: "Often less, and sometimes nothing. In general terms, eligible first time buyers pay nothing on the first £300,000 and 5 percent on the portion up to £500,000 under the rules from April 2025. Above £500,000 the relief is not available and standard bands apply. All buyers in the purchase must qualify.",
    },
    {
      q: "How much extra is stamp duty on a second home?",
      a: "In general terms, an additional property surcharge adds 5 percentage points to each band. On a £350,000 purchase that turns a standard bill of £7,500 into £25,000. If the extra property is only temporary because your old main home sells later, you may be able to claim the surcharge back within the time limit.",
    },
    {
      q: "When do I have to pay stamp duty?",
      a: "Your solicitor normally collects the money from you before completion and files the return and pays HMRC shortly afterwards. The return is due within 14 days of completion in most cases. You should budget the cash from the offer stage, because the tax generally cannot simply be added to your mortgage afterwards.",
    },
    {
      q: "Does stamp duty apply in Scotland and Wales?",
      a: "Not in this form. SDLT applies in England and Northern Ireland. Scotland charges Land and Buildings Transaction Tax and Wales charges Land Transaction Tax, each with its own bands and reliefs. Use the rules for the country where the property sits, not where you currently live.",
    },
    {
      q: "Can stamp duty rates change after I have agreed a price?",
      a: "Yes. The bands are set by the government and can change at Budgets, and it is normally the rules in force on your completion date that apply. If a Budget is due during your purchase, ask your solicitor how a change would affect your bill and keep a margin in your moving budget.",
    },
  ],
  relatedSlugs: ["uk-salary-take-home-pay", "vat-calculator", "sales-tax-calculator"],
};
