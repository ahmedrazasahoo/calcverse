import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "fd-calculator",
  keyword: "fd calculator",
  title: "FD Calculator: What Your Fixed Deposit Will Actually Be Worth",
  metaTitle: "FD Calculator Guide: Interest, Maturity and Examples",
  metaDescription: "Use an FD calculator to estimate fixed deposit maturity and interest with quarterly compounding, worked examples in rupees, tax rules and laddering tips.",
  excerpt: "How fixed deposit interest really builds up in India, with the quarterly compounding formula, maturity examples in rupees and the tax and penalty details banks bury.",
  category: "Finance and Tax",
  toolSlug: "fd-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "A fixed deposit looks like the simplest product in Indian banking: hand over a sum, wait, collect a bigger sum. Yet two people who both deposit Rs 5 lakh at 7 percent can walk away with noticeably different amounts, because tenure, compounding, payout choice and tax quietly reshape the result. An [FD calculator](/calculators/fd-calculator) cuts through that fog in seconds. You enter the deposit, the rate and the tenure, and it returns the maturity value and the total interest, compounded the way Indian banks actually do it, quarter by quarter.",
    "That clarity matters because FDs still hold an enormous share of household savings in India, from a retired teacher's pension corpus in Lucknow to a young family's house deposit fund in Indore. The product has not changed much in decades, but the decisions around it have: rates differ between banks and small finance banks, senior citizens get an extra half percent, interest is taxed every year, and breaking a deposit early carries a penalty that many people only discover at the counter.",
    "This guide explains the maturity formula step by step, works through examples at common amounts and tenures, and then covers the parts the brochure skips: cumulative versus payout deposits, TDS, premature withdrawal penalties, deposit insurance and the laddering trick that gives you regular maturities without locking everything away at one rate. You will finish knowing exactly what a quoted rate is worth to you, after compounding and after tax.",
  ],
  keyPoints: [
    "Indian banks compound FD interest quarterly, so a 7 percent deposit grows a little faster than simple interest suggests.",
    "Rs 5 lakh at 7 percent for 5 years matures to about Rs 7,07,389, earning Rs 2,07,389 in interest.",
    "The FD formula is A equals P multiplied by (1 plus r divided by 4) raised to 4t, where r is the annual rate and t is the years.",
    "Senior citizens usually earn an extra 0.50 percent, worth about Rs 17,585 extra on a Rs 5 lakh, 5 year deposit in our example.",
    "FD interest is taxed at your income slab every year, and banks deduct TDS once yearly interest crosses Rs 50,000 for most depositors.",
    "A ladder of deposits maturing in different years balances return, access and reinvestment risk better than one large deposit.",
  ],
  sections: [
    {
      heading: "How a fixed deposit works, in plain terms",
      paragraphs: [
        "A fixed deposit is a loan you make to your bank for an agreed period at an agreed rate. You deposit a lump sum, anything from Rs 1,000 upward at most banks, choose a tenure from as short as 7 days to as long as 10 years, and the bank commits to an interest rate that stays fixed for that whole term even if market rates fall the next week. At maturity you receive the principal plus the accumulated interest, or you can renew the deposit for another term at whatever rate is then on offer.",
        "Consider Meena, a 62 year old retired schoolteacher in Lucknow. She has Rs 8 lakh from her retirement benefits that she cannot afford to see fluctuate, because part of it will pay for a grandson's admission in two years and the rest supplements her pension. She splits it between a two year deposit for the admission and longer deposits for income. The stock market's long term averages are irrelevant to her; what she needs is a known amount on a known date, and that certainty is the entire case for an FD. The price of the certainty is a modest return that barely stays ahead of inflation after tax, a trade she accepts knowingly for this slice of her money.",
        "Two features define every FD and both belong in any calculation. The first is the compounding frequency. Almost all Indian banks compound interest quarterly, meaning interest is added to the principal every three months and then itself earns interest for the remaining term. The second is the payout choice. A cumulative deposit reinvests all interest until maturity, which suits a future goal. A non cumulative deposit pays interest out monthly, quarterly or annually, which suits someone who wants income, but pays a little less overall because the paid out interest stops compounding inside the deposit.",
        "Rates are not uniform across the market, and the gap is worth shopping for. Large private and public sector banks often sit within a narrow band of each other, while small finance banks and some NBFC deposits offer noticeably higher rates to attract funds. Higher is tempting, but weigh it against the institution's strength and the insurance cover described later in this guide. A difference of half a percent on Rs 5 lakh over five years is roughly Rs 17,000 to Rs 18,000, real money, yet not worth unlimited risk to chase.",
      ],
      bullets: [
        "The rate is locked for the full tenure you choose, even if the bank cuts rates for new deposits later.",
        "Most Indian banks compound FD interest every quarter, not once a year.",
        "Cumulative deposits reinvest interest. Non cumulative deposits pay it out as income and compound less.",
        "Tenures run from 7 days to 10 years, and the best rate usually sits in the 1 to 3 year band, not the longest term.",
      ],
    },
    {
      heading: "The FD maturity formula with quarterly compounding",
      paragraphs: [
        "The formula every FD calculator in India is built on is A equals P multiplied by (1 plus r divided by 4) raised to the power 4t. A is the maturity amount, P is the deposit, r is the annual interest rate as a decimal, and t is the tenure in years. Dividing r by 4 converts the annual rate into a quarterly rate, and multiplying t by 4 counts how many quarters the money compounds for. Each quarter, the interest earned is folded into the principal, so the next quarter's interest is calculated on a slightly larger base.",
        "Work it once by hand and the calculator will never feel like a black box again. Deposit Rs 5 lakh at 7 percent for 5 years. The quarterly rate is 7 divided by 4, which is 1.75 percent, and the number of quarters is 20. So A equals 5,00,000 multiplied by (1.0175) raised to 20. That bracket works out to about 1.41478, and multiplying gives a maturity value of about Rs 7,07,389. The interest earned is Rs 7,07,389 minus Rs 5,00,000, which is Rs 2,07,389. Compare that with simple interest, which would pay Rs 5 lakh multiplied by 7 percent multiplied by 5, a flat Rs 1,75,000. Quarterly compounding adds about Rs 32,389 extra on this deposit, free of charge, simply because interest starts earning interest.",
        "Two practical lessons hide inside that arithmetic. First, compounding needs time to show its strength: over a single year the gap over simple interest is small, a few hundred rupees on a lakh, but over five to ten years it becomes a meaningful slice of the return. Second, small rate differences matter more than they look, because they compound too. An extra 0.50 percent for a senior citizen on this same deposit, taking the rate to 7.5 percent, lifts the maturity value to about Rs 7,24,974. That is roughly Rs 17,585 more interest for signing the same form at the same bank, which is why the senior citizen box on the application is always worth ticking when it applies.",
        "If you want to see the same compounding logic applied to a single deposit with yearly, half yearly or monthly frequencies, or to compare simple and compound interest directly, the explainer on the [interest calculator](/guides/interest-calculator) lays both methods side by side with examples. The FD version is just compound interest with the frequency fixed at four times a year, plus the banking rules layered on top.",
      ],
    },
    {
      heading: "Worked examples: maturity values at common amounts",
      paragraphs: [
        "Rates and tenures are abstract until they are attached to sums people actually hold. The table below holds the rate steady at 6.5 percent, a representative figure for a large bank's regular deposits in recent years, and varies the amount and tenure so you can see both levers at work. Every figure uses quarterly compounding, the standard Indian method, and rounds to the nearest rupee.",
        "Read down the Rs 1 lakh column first. One year gives you Rs 1,06,660, three years Rs 1,21,341 and five years Rs 1,38,042. The interest in year one is about Rs 6,660. Across years four and five alone the deposit adds close to Rs 16,700, because the base now includes three years of folded in interest. Now read across the five year row: Rs 1 lakh becomes Rs 1,38,042, Rs 5 lakh becomes about Rs 6,90,210 and Rs 10 lakh becomes about Rs 13,80,420. Deposits scale in a straight line, so a family can split Rs 10 lakh into smaller certificates for flexibility without losing a rupee of interest at the same rate and tenure.",
        "Here is how a real saver uses these numbers. Rohan, 34, in Indore, is building a Rs 6 lakh house deposit over four years and refuses to risk it in equity this close to purchase. He already has Rs 2 lakh saved. Placing it at 7 percent for 3 years gives him about Rs 2,46,288 at maturity, using the [FD calculator](/calculators/fd-calculator) to confirm the bank's quote before he signs. The remaining gap he covers with a monthly recurring deposit and a bonus he expects, keeping the whole plan in guaranteed territory because his purchase date cannot slide.",
      ],
      table: {
        caption: "FD maturity values at 6.5 percent a year, quarterly compounding",
        headers: ["Deposit", "1 year", "3 years", "5 years", "Interest over 5 years"],
        rows: [
          ["Rs 1 lakh", "Rs 1,06,660", "Rs 1,21,341", "Rs 1,38,042", "Rs 38,042"],
          ["Rs 2 lakh", "Rs 2,13,320", "Rs 2,42,682", "Rs 2,76,084", "Rs 76,084"],
          ["Rs 5 lakh", "Rs 5,33,301", "Rs 6,06,704", "Rs 6,90,210", "Rs 1,90,210"],
          ["Rs 10 lakh", "Rs 10,66,602", "Rs 12,13,408", "Rs 13,80,420", "Rs 3,80,420"],
        ],
      },
    },
    {
      heading: "Cumulative or payout: choosing how the interest reaches you",
      paragraphs: [
        "The cumulative option is the default in most calculators and the right choice for a defined future expense, because every rupee of interest stays inside the deposit and compounds. The non cumulative options exist for people who live partly off their savings. A monthly payout suits a retiree topping up a pension, a quarterly payout aligns neatly with advance tax dates and school fee cycles, and an annual payout works like a yearly bonus. Banks usually quote a slightly lower effective rate for monthly payouts, because paying interest out early costs them the compounding on it, so compare the actual maturity and payout figures rather than the headline rate alone.",
        "Put numbers on it. A Rs 5 lakh deposit at 7 percent on a quarterly payout sends you roughly Rs 8,750 every three months, which is Rs 35,000 a year, and hands your Rs 5 lakh principal back untouched at the end of the term. The same deposit left cumulative for five years instead delivers about Rs 7,07,389 at maturity, which works out to Rs 2,07,389 of interest rather than the Rs 1,75,000 that five years of flat payouts would total. That difference of about Rs 32,389 is the compounding you give up in exchange for income along the way. Neither choice is wrong; they answer different questions. If you do not need the cash flow, take the compounding.",
        "A hybrid habit works well for many retired households: keep the core corpus cumulative so it keeps growing against inflation, and hold one modest payout deposit whose quarterly interest covers a predictable bill, such as a housing society maintenance charge or a health insurance premium. The income deposit feels like a salary arriving on schedule, while the silent cumulative deposits do the long term work in the background.",
        "One more option deserves a mention because sales staff push it hard: the sweep in deposit, where surplus in your savings account above a threshold is automatically moved into short FDs. It earns more than idle savings interest and breaks automatically when you spend. It is genuinely useful for business current accounts and emergency funds, but its short tenures earn the lowest rates on the card, so it is a parking tool, not a growth tool.",
      ],
    },
    {
      heading: "Tax, TDS and the return you actually keep",
      paragraphs: [
        "Here is the part that changes FD maths the most, and the part a basic maturity figure does not show. Interest from a fixed deposit is added to your income and taxed at your slab rate in the year it accrues, even for a cumulative deposit where you receive nothing until maturity. A depositor in the 30 percent slab who earns Rs 2,07,389 of interest over five years will hand back roughly Rs 62,000 of it in tax across those years, plus surcharge and cess where applicable. The honest after tax return on a 7 percent FD for that investor is closer to 4.9 percent, which is why your tax bracket belongs in any serious comparison with other options.",
        "TDS is the collection mechanism, not an extra tax. Banks deduct tax at source at 10 percent when the total interest paid or credited by that bank crosses Rs 50,000 in a financial year for most depositors, and Rs 1,00,000 for senior citizens, under the limits applicable from the 2025-26 financial year. If your PAN is not on record the deduction jumps to 20 percent, a needless wound that one form prevents. The deducted amount appears in your Form 26AS and AIS, and you claim credit for it when you file your return. Depositors whose total income sits below the taxable threshold can file Form 15G, or Form 15H for senior citizens, at the start of the year to stop the deduction at source.",
        "To see where a deposit leaves your overall tax bill for assessment year 2026-27, run your salary, FD interest and other income through the walkthrough in our [income tax calculator for India 2026-27](/guides/income-tax-calculator-india-2026-27) guide, which explains the current slabs and the rebate that shelters smaller incomes. Many depositors are surprised to find a large FD maturity pushing them into a higher slab in the year several deposits mature together, one more reason to spread maturities across years with a ladder.",
        "Do not let tax tail wag the dog, though. For money that must be safe and available on a fixed date, an FD after tax still does its job. Tax planning matters most at the margin: splitting deposits between two family members in lower slabs where the money genuinely belongs to them, timing maturities across financial years, and holding growth assets for distant goals where equity taxation is gentler. Those are refinements around a sound base, not reasons to leave cash idle in a savings account earning 2.5 to 3 percent.",
      ],
      bullets: [
        "FD interest is taxed at your slab rate every year on accrual, including cumulative deposits.",
        "Banks deduct 10 percent TDS past Rs 50,000 of yearly interest per bank, or Rs 1,00,000 for senior citizens, from financial year 2025-26.",
        "File Form 15G or 15H if your total income is below the taxable limit, so tax is not deducted at source.",
        "A 7 percent FD nets roughly 4.9 percent after tax for someone in the 30 percent slab, before cess.",
      ],
    },
    {
      heading: "Breaking an FD early, deposit insurance and safety",
      paragraphs: [
        "Life does not always respect a five year plan, so know the exit terms before you enter. If you break a fixed deposit before maturity, most banks pay interest at the rate that applied to the period the money actually stayed, not the rate printed on your certificate, and then subtract a premature withdrawal penalty, commonly 0.50 to 1 percent. On a deposit broken after two years of a five year term, that combination can easily cost you a full percentage point of return across the whole holding period. Some banks waive the penalty on deposits held past a certain point or for senior citizens, and a few offer no penalty sweep products, so read the clause for your specific deposit rather than assuming.",
        "This penalty structure is the strongest practical argument against putting your entire savings into one giant deposit. Five certificates of Rs 2 lakh each earn the same interest as one certificate of Rs 10 lakh at the same rate, but if an emergency strikes you can break just one or two and leave the rest compounding untouched at the full contracted rate. Banks allow partial breaking only if you structured it that way at the start, so the splitting decision has to happen on day one.",
        "Safety itself is strong but not unlimited. Deposits in Indian banks, including principal plus interest, are insured by the DICGC up to Rs 5 lakh per depositor per bank. A couple holding Rs 14 lakh in one bank is not fully covered; spreading across two banks, and using individual plus joint account capacities thoughtfully, lifts the protected total considerably. This cover is also the lens for judging higher rates from small finance banks and NBFCs. A company FD from an NBFC is not covered by DICGC at all and carries the company's credit risk, so its extra 1 to 2 percent is payment for real risk, not a free upgrade.",
        "Finally, add a nominee to every deposit and tell your family where the certificates and the customer ID live. Unclaimed deposits are a large and growing pile in Indian banking, built mostly from accounts nobody in the family knew existed. A one page list of deposits, banks and maturity dates, kept with your other papers, is worth more to your family than any rate negotiation you will ever do.",
      ],
    },
    {
      heading: "Laddering deposits and knowing when an FD is the wrong tool",
      paragraphs: [
        "A deposit ladder solves the two nagging problems of FDs: locking everything at one rate, and having nothing mature when you need cash. Instead of one Rs 6 lakh deposit for five years, you open three deposits of Rs 2 lakh maturing in one, three and five years, say, or five yearly rungs of Rs 1.2 lakh each. Every year or two a rung matures and you choose afresh: spend it, or roll it into a new longest rung at the rate then available. If rates have risen, you benefit within a year or two rather than watching from inside a five year lock in. If rates have fallen, your longer rungs still hold the older, better rates.",
        "Ladders also smooth the tax bill, since interest-heavy maturities land in different financial years instead of one slab-busting lump, and they create a natural review rhythm. Retirees often build ladders that mature just ahead of known expenses: insurance premiums in one quarter, a family wedding in two years, a car replacement in four. Each rung is matched to a date, which is the cleanest way to use a guaranteed product: certainty about timing is what you are buying, so spend it deliberately.",
        "Knowing the limits matters as much as knowing the uses. An FD is the wrong tool for a goal 12 or 15 years away, such as a young child's college fund or your own retirement at 35, because inflation and slab rate tax together can reduce the real return to almost nothing. Over those horizons a monthly equity investment usually deserves the main role, and our guide on the [SIP calculator](/guides/sip-calculator) shows how the same disciplined saving builds a far larger corpus when time is on your side. The honest portfolio for most families is not FD or SIP, it is FD for dates that cannot move and SIP for goals far enough away to grow.",
        "So use the [FD calculator](/calculators/fd-calculator) as the last step before you sign, not the first step of the plan. Decide the job the money must do, the date it is needed and your tax slab. Then test two or three banks' rates, both payout styles and a ladder split, and pick the structure whose after tax maturity figure meets the goal with the least lock in. Five minutes of that arithmetic, repeated at every maturity, is most of what smart deposit holding ever requires. For more explainers that pair with this one, browse the [guides](/guides) hub.",
      ],
      steps: [
        "Enter your deposit amount, the bank's annual rate and the tenure in years into the calculator.",
        "Check the maturity value and total interest, which use quarterly compounding as Indian banks do.",
        "Toggle the senior citizen rate if it applies to you, and note how much the extra 0.50 percent adds.",
        "Estimate the tax at your slab rate on the yearly interest to get your real, after tax return.",
        "Compare at least one shorter and one longer tenure, and consider splitting the sum into a ladder.",
        "Confirm the premature withdrawal penalty and add a nominee before you book the deposit.",
      ],
    },
  ],
  faqs: [
    {
      q: "How is FD interest calculated in India?",
      a: "Indian banks use compound interest with quarterly compounding: A equals P multiplied by (1 plus r divided by 4) raised to 4t. Interest is added to the principal every three months, so later quarters earn interest on earlier interest too. On Rs 5 lakh at 7 percent for 5 years this gives about Rs 7,07,389, which is roughly Rs 32,389 more than simple interest would pay.",
    },
    {
      q: "How much tax do I pay on FD interest?",
      a: "FD interest is added to your income and taxed at your slab rate in the year it accrues, even if the deposit has not matured. Banks deduct TDS at 10 percent once interest from that bank crosses Rs 50,000 in a year, or Rs 1,00,000 for senior citizens, and you claim credit for it in your return. Someone in the 30 percent slab keeps roughly 4.9 percent from a 7 percent FD, before cess.",
    },
    {
      q: "What happens if I break my FD before maturity?",
      a: "The bank recalculates interest at the rate for the period the money actually remained deposited, then applies a premature withdrawal penalty, commonly 0.50 to 1 percent. You still receive your full principal, but the return falls noticeably. Splitting savings into several smaller deposits lets you break only what you need and protect the rest.",
    },
    {
      q: "Are fixed deposits safe in India?",
      a: "Bank FDs are among the safest savings options, and deposits are insured by the DICGC up to Rs 5 lakh per depositor per bank, covering principal plus interest. Amounts above that in a single bank carry the bank's own risk, so large savers often spread deposits across banks. Company FDs from NBFCs are not covered by this insurance and depend on the company's credit quality.",
    },
    {
      q: "Do senior citizens really get higher FD rates?",
      a: "Yes, most banks pay an additional 0.50 percent a year to depositors above 60, and some offer a little more on long tenures. On a Rs 5 lakh, 5 year deposit, moving from 7 percent to 7.5 percent lifts the maturity value from about Rs 7,07,389 to about Rs 7,24,974, roughly Rs 17,585 of extra interest for the same deposit.",
    },
    {
      q: "Is an FD better than a SIP?",
      a: "They suit different goals. An FD guarantees a known amount on a known date, which is right for money needed within about five years, an emergency fund or a retiree's near term income. A SIP in equity funds has no guarantee but has historically built much larger sums over 10 to 15 years, which suits retirement and distant goals. Most families hold both, matched to the date each goal falls due.",
    },
  ],
  relatedSlugs: ["sip-calculator", "interest-calculator", "income-tax-calculator-india-2026-27"],
};
