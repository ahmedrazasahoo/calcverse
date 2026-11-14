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
        "A fixed deposit is a loan you make to your bank for an agreed period at an agreed rate. You deposit a lump sum, from Rs 1,000 upward at most banks, choose a tenure from 7 days to 10 years, and the bank commits to a rate that stays fixed for that term even if market rates fall the next week. At maturity you receive the principal plus accumulated interest, or renew at whatever rate is then on offer.",
        "Consider Meena, a 62 year old retired schoolteacher in Lucknow with Rs 8 lakh from her retirement benefits. Part will pay for a grandson's admission in two years, and the rest supplements her pension, so she splits it between a two year deposit and longer deposits. She needs a known amount on a known date, and that certainty is the entire case for an FD.",
        "Two features define every FD. First, compounding frequency: almost all Indian banks compound quarterly, so interest is added every three months and then itself earns interest. Second, the payout choice. A cumulative deposit reinvests all interest until maturity, which suits a future goal. A non cumulative deposit pays interest out monthly, quarterly or annually, which suits income, but pays a little less overall. Rates also vary: small finance banks often offer more than large banks, but weigh that against the institution's strength. Half a percent on Rs 5 lakh over five years is roughly Rs 17,000 to Rs 18,000, real money, yet not worth unlimited risk.",
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
        "The formula is A equals P multiplied by (1 plus r divided by 4) raised to the power 4t. A is the maturity amount, P is the deposit, r is the annual rate as a decimal, and t is the tenure in years. Dividing r by 4 gives the quarterly rate, and multiplying t by 4 counts the quarters.",
        "Work it once by hand. Deposit Rs 5 lakh at 7 percent for 5 years. The quarterly rate is 1.75 percent and there are 20 quarters, so A equals 5,00,000 multiplied by (1.0175) raised to 20, about 1.41478, giving roughly Rs 7,07,389. Interest earned is Rs 2,07,389. Simple interest would pay a flat Rs 1,75,000, so quarterly compounding adds about Rs 32,389 extra, simply because interest starts earning interest.",
        "Compounding needs time: over one year the gap over simple interest is small, but over five to ten years it becomes meaningful. Small rate differences compound too. An extra 0.50 percent for a senior citizen, taking the rate to 7.5 percent, lifts this maturity value to about Rs 7,24,974, roughly Rs 17,585 more. To see the same logic with other compounding frequencies, the explainer on the [interest calculator](/guides/interest-calculator) lays simple and compound interest side by side. The FD version is compound interest fixed at four times a year, plus banking rules.",
      ],
    },
    {
      heading: "Worked examples: maturity values at common amounts",
      paragraphs: [
        "The table holds the rate at 6.5 percent, a representative figure for a large bank in recent years, and varies amount and tenure. Every figure uses quarterly compounding and rounds to the nearest rupee.",
        "Read down the Rs 1 lakh column: one year gives Rs 1,06,660, three years Rs 1,21,341 and five years Rs 1,38,042. Interest in year one is about Rs 6,660, while years four and five alone add close to Rs 16,700, because the base now includes three years of folded in interest. Across the five year row, deposits scale in a straight line, so splitting Rs 10 lakh into smaller certificates costs nothing in interest at the same rate and tenure, and buys flexibility.",
        "Rohan, 34, in Indore, is building a Rs 6 lakh house deposit over four years and refuses to risk it in equity this close to purchase. He has Rs 2 lakh saved. Placing it at 7 percent for 3 years gives about Rs 2,46,288 at maturity, using the [FD calculator](/calculators/fd-calculator) to confirm the bank's quote before he signs. The rest he covers with a recurring deposit and an expected bonus, keeping the whole plan guaranteed because his purchase date cannot slide.",
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
        "The cumulative option is the default in most calculators and the right choice for a defined future expense, because every rupee stays inside and compounds. Non cumulative options suit people who live partly off savings: monthly payouts top up a pension, quarterly payouts align with advance tax dates and school fees, and annual payouts work like a yearly bonus. Banks usually quote a slightly lower effective rate for monthly payouts, so compare actual figures, not just the headline rate.",
        "In numbers: Rs 5 lakh at 7 percent on a quarterly payout sends roughly Rs 8,750 every three months, Rs 35,000 a year, with the principal returned untouched at the end. Left cumulative for five years, the same deposit delivers about Rs 7,07,389, or Rs 2,07,389 of interest rather than the Rs 1,75,000 that flat payouts total. That Rs 32,389 gap is the compounding you give up for income along the way. Neither choice is wrong. If you do not need the cash flow, take the compounding.",
        "A hybrid works well for retired households: keep the core corpus cumulative so it grows against inflation, and hold one modest payout deposit whose quarterly interest covers a predictable bill, such as society maintenance or a health insurance premium. Sweep in deposits, where surplus savings are moved automatically into short FDs, are useful for parking cash but earn the lowest rates, so treat them as a parking tool, not a growth tool.",
      ],
    },
    {
      heading: "Tax, TDS and the return you actually keep",
      paragraphs: [
        "FD interest is added to your income and taxed at your slab rate in the year it accrues, even for a cumulative deposit where you receive nothing until maturity. A depositor in the 30 percent slab who earns Rs 2,07,389 over five years hands back roughly Rs 62,000 in tax across those years, plus surcharge and cess where applicable. The honest after tax return on a 7 percent FD for that investor is closer to 4.9 percent.",
        "TDS is the collection mechanism, not an extra tax. Banks deduct 10 percent when total interest from that bank crosses Rs 50,000 in a financial year for most depositors, and Rs 1,00,000 for senior citizens, under the limits applicable from the 2025-26 financial year. Without a PAN on record the deduction jumps to 20 percent. The amount appears in your Form 26AS and AIS, and you claim credit when you file. Depositors below the taxable threshold can file Form 15G, or Form 15H for senior citizens, to stop deduction at source.",
        "To see where a deposit leaves your overall bill for assessment year 2026-27, run your income through the walkthrough in our [income tax calculator for India 2026-27](/guides/income-tax-calculator-india-2026-27) guide. Many depositors are surprised to find several maturities in one year pushing them into a higher slab, one more reason to spread maturities with a ladder. For money that must be safe on a fixed date, an FD after tax still does its job.",
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
        "If you break a deposit early, most banks pay interest at the rate for the period the money actually stayed, not the rate on your certificate, then subtract a premature withdrawal penalty, commonly 0.50 to 1 percent. On a deposit broken after two years of a five year term, that can easily cost a full percentage point across the holding period. Some banks waive the penalty in specific cases, so read the clause for your deposit.",
        "That penalty is the strongest argument against one giant deposit. Five certificates of Rs 2 lakh earn the same as one of Rs 10 lakh at the same rate, but in an emergency you can break just one or two and leave the rest compounding at the full rate. Banks allow partial breaking only if you structured it that way at the start.",
        "Deposits in Indian banks, including principal plus interest, are insured by the DICGC up to Rs 5 lakh per depositor per bank. Spreading larger sums across banks lifts the protected total. A company FD from an NBFC is not covered by DICGC at all and carries the company's credit risk, so its extra 1 to 2 percent is payment for real risk. Add a nominee to every deposit and keep a one page list of deposits, banks and maturity dates for your family.",
      ],
    },
    {
      heading: "Laddering deposits and knowing when an FD is the wrong tool",
      paragraphs: [
        "A ladder solves two nagging problems: locking everything at one rate, and having nothing mature when you need cash. Instead of one Rs 6 lakh deposit for five years, open three deposits of Rs 2 lakh maturing in one, three and five years. Each time a rung matures you choose afresh: spend it, or roll it into a new longest rung at the rate then available. If rates rise, you benefit within a year or two. If they fall, longer rungs still hold the older, better rates. Ladders also smooth the tax bill and suit known expenses, from insurance premiums to a family wedding.",
        "An FD is the wrong tool for a goal 12 or 15 years away, such as a young child's college fund or retirement at 35, because inflation and slab tax can reduce the real return to almost nothing. Over those horizons a monthly equity investment usually deserves the main role, and our guide on the [SIP calculator](/guides/sip-calculator) shows how the same disciplined saving builds a far larger corpus. Most families need both: FD for dates that cannot move, SIP for goals far enough away to grow.",
        "Use the [FD calculator](/calculators/fd-calculator) as the last step before you sign. Decide the job, the date and your tax slab, then test two or three banks, both payout styles and a ladder split, and pick the structure whose after tax maturity meets the goal with the least lock in. For more explainers, browse the [guides](/guides) hub.",
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
