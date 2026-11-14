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
        "Stamp Duty Land Tax is a tax on buying property or land in England and Northern Ireland above a certain price. The buyer pays it, not the seller. It applies to freehold and leasehold purchases, whether you buy outright or with a mortgage, and it is based on the total consideration you give for the property. That usually means the purchase price, although in some cases other things of value count too, for example if you take over part of a seller loan or pay for certain items as part of the deal. Your solicitor or conveyancer will confirm what counts in your transaction.",
        "The tax is self assessed in practice through your solicitor. Most buyers never fill in the land transaction return themselves: the solicitor calculates the amount, collects it from you with the rest of the completion money, files the return and pays HMRC on your behalf. That convenience makes it easy to treat stamp duty as a vague extra cost, but it is your tax bill, and an error in the relief claimed or the price used can leave you liable later. Asking for the calculation in writing, band by band, is a reasonable request and takes a solicitor only a moment to provide.",
        "Not every move triggers a bill. Purchases at or below £125,000 under the standard residential bands pay nothing, and some transfers, for example certain transfers following a divorce or gifts with no consideration, are treated differently. Shared ownership purchases have their own options for how the tax is worked out. This guide focuses on the ordinary case most readers face: buying a home to live in, at a stated price, with no unusual terms. If your deal involves linked transactions, a company purchase, multiple dwellings or a mixed residential and commercial property, get specialist advice, because different rates and reliefs can apply and the saving or extra cost can be large.",
      ],
    },
    {
      heading: "The standard residential bands from April 2025",
      paragraphs: [
        "Stamp duty works like income tax in one important respect: it is a slice system. You do not pay the top rate on the whole price. Instead, the price is cut into bands, and each slice is charged at the rate for that band. The first £125,000 of a standard residential purchase is charged at 0 percent. The slice from £125,001 to £250,000 is charged at 2 percent. The slice from £250,001 to £925,000 is charged at 5 percent. The slice from £925,001 to £1.5 million is charged at 10 percent, and anything above £1.5 million is charged at 12 percent.",
        "This structure explains a point that confuses many first movers. Crossing a threshold by a small amount does not suddenly tax the entire price at the higher rate. Buying at £251,000 instead of £249,000 only puts an extra £1,000 into the 5 percent band compared with a purchase just below £250,000, and even that comparison needs care because the portion below the threshold keeps its lower rates. The bill rises steadily as the price rises. There is no cliff edge in the standard bands themselves, although, as explained later, first time buyer relief does have a price limit where special treatment stops.",
        "Keep in mind that these bands are a policy choice, not a permanent feature of the system. Governments have raised and lowered the starting threshold several times, including temporary cuts that later expired, which is why older articles and well meaning advice from relatives can be badly out of date. The bands in this guide are the standard residential ones that applied from April 2025. They are set by the government and can change at Budgets, so treat any calculation as current only for the rules in force on your completion date, because it is normally the completion date, not the exchange date or the date you first viewed the property, that decides which rules apply.",
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
        "Take a buyer, call her Amira, purchasing a house in Leeds for £350,000 as her only and main home, with no relief claimed. Her bill is built in three slices. The first £125,000 is charged at 0 percent, which gives £0. The next slice, from £125,000 to £250,000, is £125,000 charged at 2 percent, which gives £2,500. The remaining slice, from £250,000 up to her £350,000 price, is £100,000 charged at 5 percent, which gives £5,000. Add the slices together: £0 plus £2,500 plus £5,000 equals £7,500 in total.",
        "That £7,500 is worth putting in context. As a share of the price it is about 2.14 percent, even though Amira top slice is taxed at 5 percent. This effective rate is the fairest way to compare bills between price levels. A buyer at £250,000 pays £2,500, an effective rate of 1 percent. A buyer at £600,000 pays £2,500 on the second band plus 5 percent on £350,000, which is £17,500, for a total of £20,000 and an effective rate of about 3.33 percent. A buyer at £1 million pays £2,500 plus £33,750 on the full third band plus 10 percent on £75,000, which is £7,500, giving £43,750 in total and an effective rate of about 4.38 percent. The system is progressive, but the headline top rate always overstates what a typical buyer actually pays on the whole price.",
        "Run Amira example in reverse as a sense check. If someone had wrongly charged 5 percent on the full £350,000, the bill would be £17,500, which is £10,000 too much. That single misunderstanding, applying one rate to the whole price, is the most common error in rough estimates shared between friends and in early affordability chats. If a figure you are given does not show its slices, rebuild it band by band or check it with the [stamp duty calculator](/calculators/stamp-duty-calculator) before you rely on it for your moving budget.",
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
        "First time buyer relief is designed to cut the bill for people buying their first home, and in general terms it does this by giving a higher tax free slice and a lower rate on the slice above it, up to a maximum property price. Under the rules that applied from April 2025, an eligible first time buyer pays no stamp duty on the first £300,000 of the price and 5 percent on the portion from £300,001 to £500,000. If the price is more than £500,000, the relief is not available and the standard bands apply to the whole purchase instead. That price limit is a real cliff edge, unlike the smooth standard bands, so a first time buyer negotiating near £500,000 should model both sides of the line carefully.",
        "A quick example shows the value of the relief. A first time buyer purchasing at £300,000 pays nothing at all, compared with £5,000 under the standard bands (£2,500 at 2 percent on the second slice plus £2,500 at 5 percent on the £50,000 above £250,000). At £400,000, the relief gives a bill of 5 percent on £100,000, which is £5,000, compared with £10,000 under the standard bands. The saving is real money that can go towards furniture, moving costs or rebuilding an emergency fund after completion, so it is worth confirming your eligibility early rather than assuming your solicitor will spot it automatically.",
        "Eligibility has conditions that catch people out. In general terms, every buyer in the purchase must be a first time buyer, meaning none of them has owned a residential property anywhere in the world before, including through inheritance in some cases, and the property must be intended as your only or main home. A couple where one person has owned before will usually not qualify, even if the other never has. Names on the mortgage and names on the purchase also need care. If you are unsure, ask directly and in writing before exchange, because claiming relief you are not entitled to can lead to the tax being demanded later, with interest. Readers comparing the wider cost of a move may also find our [UK salary take home pay guide](/guides/uk-salary-take-home-pay) helpful for checking how the monthly budget will look once the move is complete.",
      ],
    },
    {
      heading: "The extra charge for additional properties",
      paragraphs: [
        "If at the end of the day of your purchase you will own more than one residential property, and you are not replacing your main residence, an additional property surcharge usually applies. In general terms that surcharge adds 5 percentage points to each standard band, so the rates become 5 percent on the first slice, 7 percent on the next, 10 percent on the next, and so on up the table. It was designed with second homes and buy to let purchases in mind, but it can also catch ordinary movers whose sale has not completed yet, parents helping a purchase structured in an unusual way, and people who own a share in another property without thinking of themselves as multiple owners.",
        "The numbers are substantial. Take the same £350,000 price used earlier, but now as an additional property. The first £125,000 at 5 percent is £6,250. The next £125,000 at 7 percent is £8,750. The final £100,000 at 10 percent is £10,000. The total is £25,000, compared with £7,500 for a main home at the same price. Put another way, the surcharge adds 5 percent of the full price, which is £17,500 on £350,000, on top of the standard bill. At higher prices the surcharge alone can exceed the entire standard bill on a modest home, which is why landlords price it into their offers from the outset rather than treating it as an afterthought.",
        "There is an important escape route for people caught between sales. If you buy a new main home before selling your old main home, you will usually pay the surcharge at completion because you own two properties at that moment. But if you then sell the previous main home within the time limit set by the rules, generally three years in most cases, you can claim a refund of the surcharge part of the bill. The refund is not automatic: you, or your solicitor, must claim it after the sale. Diary the deadline from the day you complete, keep the paperwork from both transactions, and do not spend the expected refund until it has actually arrived. Rules on spouses, civil partners and properties owned by a partner can affect the analysis, so take advice on your exact facts if a partner owns another property.",
      ],
    },
    {
      heading: "When and how the tax is paid",
      paragraphs: [
        "Stamp duty is tied to completion, the day the purchase legally finishes and the keys change hands. Your solicitor will normally ask you to transfer the full completion funds, including the stamp duty, in advance so the money is cleared in time. The land transaction return must be filed and the tax paid within 14 days of completion in most cases, and solicitors build their process around that deadline because late filing can bring penalties and interest. In practical terms you will rarely deal with HMRC directly, but you should still see the figure on your completion statement as a separate line and be able to match it to your own band by band calculation.",
        "Budgeting is where buyers most often come unstuck. Stamp duty usually has to be paid in cash from savings. Some lenders allow you to borrow more on the mortgage and use that larger loan to free up cash for the tax, but that is not the same as adding the tax to the mortgage after the fact, and it affects your loan to value band and possibly your interest rate. Work out the likely bill at the offer stage, not the completion stage, and hold that amount back from your deposit calculations. A buyer with £60,000 saved who plans a £50,000 deposit on a £350,000 home has only £10,000 left for stamp duty, legal fees, removals and surveys combined, which is tight once the £7,500 tax bill is included.",
        "Keep your completion statement and the certificate your solicitor receives after filing. You may need them when you come to sell, if you later claim a surcharge refund, or if HMRC asks questions about relief that was claimed. If you used a government scheme, bought through shared ownership, or the property includes land or buildings that are not purely residential, tell your solicitor in full at the start. Facts mentioned late are the usual cause of a revised bill arriving at the worst possible moment, just before completion, when there is no time left to reorganise your funds. Businesses reading this alongside a property purchase may also need the separate rules covered in our [VAT calculator guide](/guides/vat-calculator), since VAT and stamp duty are different taxes that occasionally appear in the same transaction.",
      ],
    },
    {
      heading: "Common mistakes, and how to check your bill",
      paragraphs: [
        "Most wrong estimates come from a short list of repeat errors. The first is applying a single rate to the whole price, which overstates the bill on any purchase above £250,000. The second is using out of date bands, often from the temporary higher thresholds that applied before April 2025, which understates the bill and leaves a nasty gap in the moving budget. The third is forgetting the additional property surcharge, or assuming it is a small flat fee rather than 5 percent of the price added across the bands. The fourth is assuming first time buyer relief applies when a joint buyer has owned before. Each of these is easy to make in conversation and easy to avoid on paper.",
        "Price negotiation interacts with stamp duty in a quieter way than people expect. Because the standard bands are sliced, saving £10,000 on the price of a £400,000 home saves roughly £500 of tax at the 5 percent marginal rate, not a dramatic sum, but still worth having. The bigger tax effects sit at specific points: the £500,000 ceiling for first time buyer relief, and the thresholds that decide whether a buyer can afford a property at all once the tax is added to the deposit needed. Sellers and agents understand this, which is why homes are sometimes marketed just under a round figure. Model the total cost of buying, price plus tax plus fees, rather than the price alone, when you compare two similar homes either side of a threshold.",
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
