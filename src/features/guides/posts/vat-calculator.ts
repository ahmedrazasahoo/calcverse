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
        "Every VAT calculation juggles the same three numbers. The net amount is the price before VAT, the amount the seller keeps as revenue before their own costs. The VAT amount is the tax charged on top, at the rate that applies to that supply. The gross amount is net plus VAT, the total the customer actually pays. A clear invoice shows all three, plus the rate used. If a document only shows a single total with no breakdown, you cannot check it, and a VAT registered customer cannot safely reclaim tax from it unless it meets the invoice rules.",
        "Say Sofia, a designer in Manchester, quotes £250 net for a set of brand files. At the standard rate of 20 percent, VAT is £250 multiplied by 0.20, which is £50, and the gross invoice total is £300. Her client pays £300, Sofia keeps £250 as sales income in her accounts, and £50 goes into the VAT pot for her next return, offset by VAT she has paid on eligible business costs. If she mistakenly treated £250 as a gross figure, she would only keep £208.33 as income and would quietly lose £41.67 of revenue on one small job. Repeat that across a month of invoices and a pricing slip becomes a real drop in income.",
        "Consumers and businesses read prices differently, and that causes friction at the till and in quotes. Business to business prices are usually quoted net with VAT added, because a registered buyer focuses on the net cost they can compare and the VAT they may reclaim. Prices for the general public must be shown including VAT when the buyer cannot reclaim it, so a shop shelf price of £12 is a gross price: inside it sits £10 net and £2 VAT. When you move between trade and public customers, label every quote in plain words, for example £250 plus VAT or £300 including VAT, and never rely on the other person guessing.",
        "The direction matters as much as the rate. Adding VAT starts from net and goes up. Removing VAT starts from gross and works back down to find the net and the tax inside it. A surprising number of spreadsheets do this second step wrong by taking 20 percent off the gross price, which gives a different and incorrect answer. The next section shows why, with the exact fractions that make checking easy.",
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
        "Adding VAT is the straightforward direction. For the standard rate, multiply the net price by 1.2 to get the gross price, or multiply by 0.20 to get just the VAT amount. A tradesperson pricing parts and labour at £840 net would charge £168 VAT and invoice £1,008 gross. For the reduced rate of 5 percent, multiply net by 1.05. A £600 net supply at 5 percent carries £30 VAT and a £630 gross total. Keep the rate with the line it belongs to if an invoice mixes rates, because a single blended percentage will not survive a proper check.",
        "Removing VAT needs division, not subtraction of the same percentage. To strip 20 percent VAT out of a gross price, divide by 1.2. A gross price of £300 divided by 1.2 gives £250 net, and the VAT inside is £50. There is a handy shortcut: at 20 percent, the VAT inside a gross total is one sixth of the gross. One sixth of £300 is £50, which matches. The wrong method, taking 20 percent off £300, gives £240 net and £60 VAT, which is £10 too much tax and £10 too little income. That error is so common that it is the first thing to check when a bookkeeper, marketplace report or supplier credit note looks off.",
        "At the reduced rate of 5 percent the same logic uses 1.05. Divide a gross price by 1.05 to get net, and the VAT inside a gross total is one twenty-first of that gross, because 5 divided by 105 simplifies to 1 over 21. A domestic energy related bill of £105 gross at 5 percent contains £100 net and £5 VAT. A gross amount of £210 contains £10 VAT. If you remember 1.2 and one sixth for the standard rate, and 1.05 and one twenty-first for the reduced rate, you can check most UK invoices on the back of an envelope without reaching for a tool at all.",
        "Part payments and deposits follow the same maths but the timing can differ. A deposit for a standard rated supply usually creates a tax point when it is paid, so VAT is due on that portion in that period, not only when the balance is invoiced. Credit notes reverse VAT at the original rate, even if you would price the same job differently today. When a rate or a price changes mid contract, split the invoice by period or supply rather than forcing a whole job through one line, and keep a note of why you split it.",
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
        "Most goods and services in the UK are standard rated at 20 percent. That covers the bulk of retail, professional services, hospitality, building work on existing homes in most cases, software, marketing, repairs and business supplies. If no specific relief applies, assume 20 percent and then check for an exception, rather than starting from the hope of a lower rate. HMRC guidance organises the exceptions by sector, and a rate that applies to a product itself may not apply to a service connected with it, so describe the supply precisely before you decide.",
        "The reduced rate of 5 percent covers a narrower list. The best known example is domestic fuel and power, such as gas and electricity for the home, charged at 5 percent rather than 20 percent. Childrens car seats, some energy saving products in certain circumstances, and a few other specific supplies also sit in this band, often with conditions about the customer, the building or the installation. A commercial energy bill is not a domestic one, and a product that qualifies when installed as part of an eligible job may not qualify when sold on its own. Those conditions are where errors happen, so keep evidence of why you used 5 percent.",
        "Zero rated means VAT is charged at 0 percent, but the sale still counts as taxable turnover. Most food for home consumption, childrens clothes and shoes, books and newspapers, and passenger transport are familiar examples, with many detailed exceptions: hot takeaway food and most soft drinks and confectionery, for instance, are standard rated even though basic groceries are zero rated. Because zero rated sales count towards the £90,000 threshold, a shop selling mostly zero rated goods can still have to register, and once registered it can reclaim VAT on its standard rated costs even though it charges no VAT on most sales.",
        "Exempt is a different status altogether. Insurance, finance, most health services by registered professionals, education by eligible providers, and residential rent are common exempt areas. An exempt business does not charge VAT on those supplies, those sales do not count towards the registration threshold in the same way, and the business generally cannot reclaim VAT on costs that relate to exempt supplies. A business with both taxable and exempt sales faces partial exemption calculations, which are fiddly and worth professional advice. Calling an exempt supply zero rated on an invoice is not a harmless wording slip, it can change registration and reclaim rights.",
      ],
    },
    {
      heading: "When you must register: the £90,000 threshold in practice",
      paragraphs: [
        "You must register for VAT if your taxable turnover in any rolling 12 month period goes over £90,000. Rolling is the key word. It is not the tax year, not the calendar year and not your accounting year. At the end of every month you look back over the previous 12 months and add up taxable turnover: standard rated, reduced rated and zero rated sales together, excluding VAT itself and excluding exempt sales. If the total passes £90,000, you must register within 30 days of the end of that month, and registration takes effect from the first day of the second month after you went over, with tax due on sales from the effective date.",
        "There is a second trigger that catches people earlier. If you expect taxable turnover in the next 30 days alone to pass £90,000, for example because you have just signed one large contract for £95,000, you must register straight away and charge VAT from the date you realised the threshold would be passed. Waiting until the money lands is too late. You can also register voluntarily below the threshold, which suits some businesses that sell mainly to VAT registered customers who can reclaim the tax, or that have large standard rated costs to reclaim VAT on. Voluntary registration is less attractive if your customers are the public, because you must either raise gross prices by 20 percent or absorb the tax inside your current prices.",
        "Take Liam, who runs a small kitchen fitting business in Bristol. His turnover from May to the following April adds up month by month, and in February the rolling total reaches £91,400 after a run of winter jobs. He does not wait until April or until his year end. He checks the February total, registers within 30 days of the end of February, and starts charging VAT from his effective date. Jobs quoted before registration need careful handling: if a contract price was agreed as a fixed total with no mention of VAT, he may have to treat that total as VAT inclusive once registered, which squeezes his margin. A clause in quotes saying prices are plus VAT where applicable protects against that squeeze.",
        "If turnover later falls, deregistration is possible when taxable turnover will stay below £88,000 in the next 12 months, but you must stay registered while you still expect to pass the threshold. Keep a simple rolling tracker, updated monthly, rather than trusting your accounting software year view. Businesses often discover they crossed the line months ago because they watched the financial year total instead. Late registration can mean paying VAT out of your own pocket on past sales you never charged tax on, plus penalties and interest, so the tracker is cheap insurance. Buying a property in the same period has its own separate tax, which our [stamp duty calculator guide](/guides/stamp-duty-calculator) explains for buyers planning a move.",
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
        "Once registered, you normally file a return every three months. You report the VAT you charged on sales, called output tax, the VAT you can reclaim on business purchases, called input tax, and you pay the difference to HMRC or receive a repayment if input tax is higher. Most returns and records must be kept digitally under Making Tax Digital, using compatible software or bridging tools. A return is not just the totals on your invoices: bad debt relief, credit notes, imports, reverse charge supplies and errors from earlier periods all have their own boxes and timing rules.",
        "You can only reclaim VAT on costs used for taxable business purposes, with a VAT invoice or other evidence, and some costs are blocked even for fully taxable businesses. Business entertainment VAT is generally not reclaimable, and cars have strict rules: VAT on buying a car is usually blocked unless the car is used wholly for business in very specific ways, while leasing has its own percentage restriction. Staff costs such as wages have no VAT on them at all. If you employ people, payroll is a separate system, and mistakes there sit outside the VAT return entirely.",
        "Special schemes change how the arithmetic feels day to day. The Flat Rate Scheme lets eligible smaller businesses with turnover up to £150,000 excluding VAT pay a fixed percentage of gross turnover for their sector, keeping record keeping simple but giving up most input tax claims except on larger capital items. Cash accounting, available up to a higher turnover limit, lets you account for VAT when customers pay you rather than when you invoice, which helps cash flow if customers pay slowly but delays your own cost claims until you pay suppliers. The Annual Accounting Scheme spreads payments across the year with one return. Each scheme trades simplicity against accuracy, so model a real quarter both ways before joining one.",
        "Cash flow is the practical heart of VAT. You collect tax that is not yours and hold it until the return is due, which flatters the bank balance in between. Wise businesses move the VAT portion of each payment received into a separate account or pot on the day it lands. If you spend it as working capital, a quarterly bill that includes a big one off job can arrive when the money has already gone. The same discipline that helps with payroll in our salary guide helps here: separate the tax first, then judge what the business really earned from what is left.",
      ],
    },
    {
      heading: "Pricing, quotes and invoices that avoid disputes",
      paragraphs: [
        "Most VAT disputes with customers are really wording disputes. A quote that says £1,200 with no VAT wording means one thing to a registered business customer who assumes VAT will be added, and the opposite to a homeowner who assumes that is the full price. Write plus VAT or including VAT on every quote, estimate and web price where there is any doubt, and show the VAT amount in the summary. Online sellers need extra care: marketplace fees, delivery charges and imported goods can each carry VAT in a different place, and a headline price that ignores delivery VAT will misstate the margin on every order.",
        "A full VAT invoice needs more than a total. It should show a unique invoice number, the date and tax point if different, your business name, address and VAT number, the customer details, a description of the goods or services, the net amount, the VAT rate and amount for each rate used, and the gross total. Simpler invoices are allowed for smaller retail sales, but a business customer who needs to reclaim VAT will ask for the full version. Issuing a proper invoice promptly is also a cash flow tool: many customers will not pay from a text message or a receipt with half the details missing.",
        "If you sell across borders or to customers in other tax systems, do not assume UK rules travel with you. The place of supply rules decide where VAT is due, digital services to consumers have special rules, and exports are often zero rated with evidence requirements. Businesses used to a domestic sales tax style system sometimes treat VAT as a simple checkout percentage. Our [sales tax calculator guide](/guides/sales-tax-calculator) is a useful contrast, because sales tax is charged once to the final buyer in the United States, while VAT is collected in stages with input claims along the chain. Mixing the two models in one spreadsheet is a reliable way to get both wrong.",
        "Review your price list whenever rates, thresholds or your registration status change. A business that registers mid year often needs two versions of its prices for a while: pipeline quotes agreed before registration and new quotes after it. Keep the old paperwork, do not rewrite history to make it look as if VAT was charged earlier, and tell regular customers in advance that invoices will change. A short, honest note explaining that you have passed the registration threshold because the business has grown lands far better than a sudden 20 percent jump with no warning.",
      ],
    },
    {
      heading: "Common VAT mistakes and how to fix them early",
      paragraphs: [
        "The classic calculation mistake is removing VAT by taking 20 percent off a gross price. On a £499 piece of equipment bought for the business, the wrong method finds £99.80 of VAT. The correct method divides £499 by 1.2 to get £415.83 net, so the VAT is £83.17, which is one sixth of £499. Claiming £99.80 would overclaim by £16.63 on one receipt. Multiply a habit like that across fuel, tools and stock for a year and the correction on an HMRC check becomes painful. Tape the divide by 1.2 rule to the office wall if you have to: it pays for itself.",
        "Rate mistakes come next. Charging 20 percent on a zero rated supply overstates the price and can lose a sale, while charging 0 percent or 5 percent on a standard rated supply understates the tax due and leaves the seller to find the shortfall. Food is the famous trap, because the line between zero rated groceries and standard rated catering, hot food, confectionery and many drinks is detailed and depends on how the item is supplied. Building work is another, because new builds, conversions, renovations and repairs are treated differently. When a job straddles two treatments, split the invoice and keep the reasoning in writing at the time, not from memory a year later.",
        "Threshold mistakes are the most expensive. Watching the tax year instead of a rolling 12 months, including exempt sales in the total, excluding zero rated sales that should count, or forgetting sales from a second trade run by the same person or business can all hide a crossing. Registration follows the legal person, not the brand name, so two trading names under one sole trader are one turnover. If you discover a late crossing, voluntary disclosure and prompt registration usually produce a better outcome than waiting for HMRC to find it. Keep the calculation that shows when you crossed, because that date drives the whole correction.",
        "If a number still looks wrong, check it in a fixed order before you file or pay anything. Confirm whether the starting figure is net or gross. Confirm the rate for that supply. Confirm the direction, adding or removing. Then check for delivery charges, discounts and credit notes that change the taxable amount, because a discount given at the time of supply reduces the VAT base while a later credit needs a credit note. Run the same figures through the [VAT calculator](/calculators/vat-calculator) as a second pair of eyes, and browse our wider [guides](/guides) when the question spills into payroll, property or pricing. Two minutes of checking before a return beats a weekend of unpicking it after.",
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
