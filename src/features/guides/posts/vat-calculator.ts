import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "vat-calculator",
  keyword: "vat calculator",
  title: "VAT Calculator: How to Add, Remove and Check VAT Without Guesswork",
  metaTitle: "VAT Calculator: How to Add and Remove VAT in the UK",
  metaDescription: "Learn how to add and remove VAT at 20 percent and 5 percent, check invoices, avoid common errors and know when your business must register for VAT in the UK.",
  excerpt: "Adding VAT is not just typing a percentage into a bill. Here is the net and gross maths for the 20 percent and 5 percent rates, how to check an invoice in seconds, and when the £90,000 registration threshold catches a growing business.",
  category: "Finance and Tax",
  toolSlug: "vat-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "A customer asks for a price including VAT, a supplier sends an invoice that looks high, or you are pricing a job and you cannot tell whether the £480 in front of you is the net amount, the gross amount or the VAT itself. That confusion is exactly what a VAT calculator is for. Use the free [VAT calculator](/calculators/vat-calculator) to get the number in seconds, then use this guide to understand the maths well enough to spot when an invoice, a quote or your own price list is wrong.",
    "Value Added Tax is charged at each stage of making and selling most goods and services in the United Kingdom, but registered businesses claim back the VAT they pay on costs, so the final customer is the one who really bears it. The standard rate is 20 percent, the reduced rate is 5 percent for a smaller set of items such as domestic energy, and some supplies are zero rated or exempt, which sound similar and are treated very differently. Getting the rate or the direction of the calculation wrong does not just change a total, it changes the VAT return, the profit on a job and sometimes your legal duty to register.",
    "This guide covers both directions of the calculation with worked invoices, explains the rates and the £90,000 registration threshold, and shows the errors that turn up again and again for sole traders, limited companies, landlords, online sellers and freelancers. If you are an employee rather than a business, your own tax comes through payroll instead, and our [UK salary and take home pay guide](/guides/uk-salary-take-home-pay) explains that side in full.",
  ],
  keyPoints: [
    "The UK standard VAT rate is 20 percent, the reduced rate is 5 percent, and some supplies are zero rated or exempt.",
    "To add 20 percent VAT, multiply the net price by 1.2. To remove it from a gross price, divide by 1.2: the VAT inside a gross price is one sixth of that gross total.",
    "You must register for VAT if taxable turnover in any rolling 12 month period passes £90,000, or you expect it to pass that level in the next 30 days alone.",
    "Zero rated and exempt are not the same: zero rated sales count towards the registration threshold, exempt sales do not.",
    "Always state clearly whether a quoted price includes VAT, and keep the net, VAT and gross figures separate on every invoice.",
  ],
  sections: [
    {
      heading: "Net, gross and VAT amount: the three numbers on every invoice",
      paragraphs: [
        "Every VAT calculation juggles the same three numbers. The net amount is the price before VAT, the sellers revenue before costs. The VAT amount is the tax charged on top at the rate for that supply. The gross amount is net plus VAT, the total the customer pays. A clear invoice shows all three, plus the rate. A document showing only a total cannot be checked, and a VAT registered customer cannot safely reclaim tax from it unless it meets the invoice rules.",
        "Say Sofia, a designer in Manchester, quotes £250 net for brand files. At 20 percent, VAT is £250 multiplied by 0.20, which is £50, and the gross total is £300. She keeps £250 as income and puts £50 in the VAT pot for her next return, offset by VAT on eligible business costs. If she treated £250 as gross, she would keep only £208.33 and lose £41.67 on one small job.",
        "Businesses and consumers read prices differently. Business to business prices are usually quoted net with VAT added, because a registered buyer compares the net cost and may reclaim the VAT. Prices for the public must be shown including VAT, so a shelf price of £12 is gross: inside it sits £10 net and £2 VAT. Label every quote in plain words, for example £250 plus VAT or £300 including VAT. Direction matters too: adding VAT starts from net, removing it starts from gross.",
      ],
      bullets: [
        "Net: price before VAT, the sellers revenue figure.",
        "VAT amount: net multiplied by the rate, for example 0.20 at the standard rate.",
        "Gross: net plus VAT, the total paid by the customer.",
        "Invoice check: net plus VAT must equal gross, and the rate shown must match the supply.",
      ],
    },
    {
      heading: "How to add and remove VAT at 20 percent and 5 percent",
      paragraphs: [
        "Adding VAT is straightforward. At the standard rate, multiply net by 1.2 to get gross, or by 0.20 for the VAT alone. Parts and labour at £840 net carry £168 VAT and a £1,008 gross invoice. At the reduced rate of 5 percent, multiply net by 1.05: a £600 net supply carries £30 VAT and a £630 total. Keep the rate with its line if an invoice mixes rates.",
        "Removing VAT needs division, not subtraction. To strip 20 percent VAT from a gross price, divide by 1.2. £300 divided by 1.2 gives £250 net and £50 VAT. A shortcut helps: at 20 percent, the VAT inside a gross total is one sixth of the gross. Taking 20 percent off £300 instead gives £240 net and £60 VAT, which is £10 too much tax and £10 too little income. That error is the first thing to check when a report or credit note looks off.",
        "At 5 percent, divide gross by 1.05 to get net, and the VAT inside gross is one twenty-first, because 5 divided by 105 simplifies to 1 over 21. A bill of £105 gross at 5 percent contains £100 net and £5 VAT. Deposits usually create a tax point when paid, so VAT is due on that portion then, and credit notes reverse VAT at the original rate.",
      ],
      table: {
        caption: "Quick VAT formulas for the two main UK rates",
        headers: ["Task", "At 20 percent", "At 5 percent"],
        rows: [
          ["Add VAT to net", "Net x 1.2", "Net x 1.05"],
          ["Find VAT from net", "Net x 0.20", "Net x 0.05"],
          ["Remove VAT from gross", "Gross / 1.2", "Gross / 1.05"],
          ["Find VAT inside gross", "Gross / 6", "Gross / 21"],
        ],
      },
    },
    {
      heading: "Which rate applies: standard, reduced, zero rated and exempt",
      paragraphs: [
        "Most goods and services in the UK are standard rated at 20 percent: retail, professional services, hospitality, software, marketing, repairs and business supplies. If no specific relief applies, assume 20 percent and then check for an exception. A rate that applies to a product may not apply to a connected service, so describe the supply precisely before you decide.",
        "The reduced rate of 5 percent covers a narrower list, best known for domestic fuel and power such as gas and electricity for the home. Childrens car seats and some energy saving products also sit in this band, often with conditions about the customer, building or installation. A commercial energy bill is not a domestic one, so keep evidence of why you used 5 percent.",
        "Zero rated means VAT is charged at 0 percent, but the sale still counts as taxable turnover. Most food for home consumption, childrens clothes and shoes, books and newspapers, and passenger transport are examples, with exceptions: hot takeaway food and most soft drinks and confectionery are standard rated. A shop selling mostly zero rated goods can still have to register, and once registered it can reclaim VAT on its standard rated costs.",
        "Exempt is different altogether. Insurance, finance, most health services by registered professionals, education by eligible providers, and residential rent are common exempt areas. Those sales do not count towards the threshold in the same way, and VAT on costs relating to exempt supplies generally cannot be reclaimed. Calling an exempt supply zero rated is not a harmless wording slip: it can change registration and reclaim rights.",
      ],
    },
    {
      heading: "When you must register: the £90,000 threshold in practice",
      paragraphs: [
        "You must register if taxable turnover in any rolling 12 month period goes over £90,000. Rolling is the key word: it is not the tax year or your accounting year. At the end of every month, add up standard rated, reduced rated and zero rated sales for the previous 12 months, excluding VAT itself and exempt sales. If the total passes £90,000, you must register within 30 days of the end of that month.",
        "A second trigger catches people earlier. If you expect taxable turnover in the next 30 days alone to pass £90,000, for example after signing one contract for £95,000, you must register straight away. Voluntary registration below the threshold suits businesses selling mainly to VAT registered customers, or with large standard rated costs to reclaim. It is less attractive with public customers, because you must either raise gross prices by 20 percent or absorb the tax inside current prices.",
        "Take Liam, who runs a kitchen fitting business in Bristol. In February his rolling total reaches £91,400. He registers within 30 days of the end of February and charges VAT from his effective date. A fixed price agreed with no mention of VAT may have to be treated as VAT inclusive once he registers, so a plus VAT clause in quotes protects his margin. Deregistration is possible when turnover will stay below £88,000 in the next 12 months. Property buying has its own separate tax, explained in our [stamp duty calculator guide](/guides/stamp-duty-calculator).",
      ],
      steps: [
        "Add up taxable turnover for the last 12 months at the end of each month, excluding VAT and exempt sales.",
        "If the total passes £90,000, note the month end date: you have 30 days from then to register.",
        "Check the forward test too: if one contract will pass £90,000 in the next 30 days alone, register now.",
        "From your effective date, charge the correct rate, show your VAT number on invoices and keep VAT records digitally.",
        "File returns and pay on time, usually every three months, and keep the rolling tracker running.",
      ],
    },
    {
      heading: "VAT returns, schemes and reclaiming VAT on costs",
      paragraphs: [
        "Once registered, you normally file a return every three months. You report VAT charged on sales, called output tax, and VAT you can reclaim on business purchases, called input tax, and pay the difference to HMRC or receive a repayment if input tax is higher. Most records must be kept digitally under Making Tax Digital. Bad debt relief, credit notes, imports and reverse charge supplies all have their own rules inside the return.",
        "You can only reclaim VAT on costs used for taxable business purposes, with a VAT invoice or other evidence. Some costs are blocked: business entertainment VAT is generally not reclaimable, and VAT on buying a car is usually blocked unless the car is used wholly for business in very specific ways. Wages have no VAT on them at all, so payroll sits outside the return entirely.",
        "Special schemes trade simplicity against accuracy. The Flat Rate Scheme lets eligible businesses with turnover up to £150,000 excluding VAT pay a fixed percentage of gross turnover, giving up most input tax claims except on larger capital items. Cash accounting lets you account for VAT when customers pay you, which helps cash flow. Model a real quarter both ways before joining one.",
        "Cash flow is the practical heart of VAT. You collect tax that is not yours and hold it until the return is due, which flatters the bank balance. Move the VAT portion of each payment into a separate pot on the day it lands, so a quarterly bill does not arrive after the money has gone.",
      ],
    },
    {
      heading: "Pricing, quotes and invoices that avoid disputes",
      paragraphs: [
        "Most VAT disputes are really wording disputes. A quote that says £1,200 with no VAT wording means one thing to a registered business customer who assumes VAT will be added, and the opposite to a homeowner who assumes that is the full price. Write plus VAT or including VAT on every quote and web price, and show the VAT amount in the summary. Online sellers need extra care: marketplace fees, delivery charges and imports can each carry VAT in a different place.",
        "A full VAT invoice should show a unique invoice number, the date and tax point if different, your business name, address and VAT number, the customer details, a description of the supply, the net amount, the VAT rate and amount for each rate used, and the gross total. Business customers who need to reclaim VAT will ask for this full version, and many will not pay from a text message or a partial receipt. Review your price list whenever your registration status changes, and warn regular customers before invoices change.",
        "If you sell across borders, do not assume UK rules travel with you. Place of supply rules decide where VAT is due, and exports are often zero rated with evidence requirements. Our [sales tax calculator guide](/guides/sales-tax-calculator) is a useful contrast, because sales tax is charged once to the final buyer in the United States, while VAT is collected in stages with input claims along the chain. Mixing the two models in one spreadsheet is a reliable way to get both wrong.",
      ],
    },
    {
      heading: "Common VAT mistakes and how to fix them early",
      paragraphs: [
        "The classic mistake is removing VAT by taking 20 percent off a gross price. On £499 of equipment, the wrong method finds £99.80 of VAT. The correct method divides £499 by 1.2 to get £415.83 net, so the VAT is £83.17, one sixth of £499. Claiming £99.80 overclaims by £16.63 on one receipt, and across a year of fuel, tools and stock that habit becomes a painful HMRC correction.",
        "Rate and threshold mistakes cost more. Charging 0 percent or 5 percent on a standard rated supply leaves the seller to find the shortfall, and food and building work are famous traps because treatment depends on how the item is supplied. Watching the tax year instead of a rolling 12 months, or forgetting a second trade under the same sole trader, can hide a threshold crossing. Registration follows the legal person, not the brand name. If you find a late crossing, prompt voluntary disclosure usually beats waiting for HMRC.",
        "If a number looks wrong, check in a fixed order: whether the starting figure is net or gross, the rate, the direction, then delivery charges, discounts and credit notes. Run the same figures through the [VAT calculator](/calculators/vat-calculator) as a second pair of eyes, and browse our wider [guides](/guides) when the question spills into payroll, property or pricing. Two minutes of checking before a return beats a weekend of unpicking it after.",
      ],
      bullets: [
        "Never remove 20 percent VAT by subtracting 20 percent: divide the gross price by 1.2 instead.",
        "Never treat exempt and zero rated as the same thing: they differ on registration and on reclaiming costs.",
        "Never watch only the financial year for the £90,000 threshold: test a rolling 12 months every month.",
        "Never quote a price without saying whether VAT is included, especially when selling to the public.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I work out VAT from a gross price?",
      a: "Divide the gross price by 1.2 at the standard rate of 20 percent. A gross price of £120 gives a net price of £100 and VAT of £20. A shortcut is that the VAT inside a 20 percent gross price is one sixth of the gross total. At the reduced rate of 5 percent, divide by 1.05 instead.",
    },
    {
      q: "How much VAT is on £250?",
      a: "It depends whether £250 is net or gross. If £250 is the net price at 20 percent, VAT is £50 and the total is £300. If £250 already includes VAT at 20 percent, the VAT inside it is one sixth of £250, which is £41.67, and the net price is £208.33.",
    },
    {
      q: "When do I have to register for VAT in the UK?",
      a: "You must register if taxable turnover in any rolling 12 month period passes £90,000, and you have 30 days from the end of that month to register. You must also register straight away if you expect turnover in the next 30 days alone to pass £90,000. Voluntary registration below the threshold is allowed.",
    },
    {
      q: "What is the difference between zero rated and exempt?",
      a: "Zero rated supplies are taxable at 0 percent, count towards the £90,000 registration threshold, and let a registered business reclaim VAT on related costs. Exempt supplies are outside VAT, do not count in the same way, and VAT on costs linked to them generally cannot be reclaimed.",
    },
    {
      q: "Can I reclaim VAT on everything my business buys?",
      a: "No. You can reclaim VAT on costs used for taxable business supplies when you hold valid evidence, but some items are blocked, such as most business entertainment and most car purchases. Wages and other items with no VAT charged have nothing to reclaim. Mixed taxable and exempt activity needs a partial exemption calculation.",
    },
    {
      q: "Should my prices include VAT or show it added on top?",
      a: "Prices for the general public should be shown including VAT, because those buyers judge and pay the gross total. Business to business quotes are often shown net plus VAT, but whichever style you use, write plus VAT or including VAT in plain words on every quote so nobody has to guess.",
    },
  ],
  relatedSlugs: ["uk-salary-take-home-pay", "stamp-duty-calculator", "sales-tax-calculator"],
};
