import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "sip-calculator",
  keyword: "sip calculator",
  title: "SIP Calculator: How a Small Monthly Investment Grows Into Lakhs",
  metaTitle: "SIP Calculator Guide: Returns, Formula and Examples",
  metaDescription: "Use a SIP calculator to estimate mutual fund returns, see the SIP formula with worked examples in rupees, and learn how step up SIPs build wealth over time.",
  excerpt: "What a monthly SIP can realistically become in 10, 15 and 20 years, explained with the actual formula, rupee examples and the return assumptions that matter.",
  category: "Finance and Tax",
  toolSlug: "sip-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Most people start a SIP with a simple question: if I put away Rs 5,000 or Rs 10,000 every month, what will it actually be worth in 15 years? Guessing is a poor way to plan a house deposit or a child's college fund, and that is exactly the gap a [SIP calculator](/calculators/sip-calculator) fills. You enter the monthly amount, the number of years and an expected annual return, and it shows you the total you invested, the estimated gains and the final corpus side by side.",
    "A SIP, or systematic investment plan, is simply an automatic monthly purchase of mutual fund units. The money leaves your bank account on a fixed date, buys units at that day's NAV, and keeps doing so whether the market is up or down. The calculator does not predict the market. It shows you what steady investing plus compounding would produce if returns averaged out at the rate you choose, which makes it a planning tool rather than a promise.",
    "This guide walks through the formula behind the number, works through several examples in rupees and lakh, and covers the decisions that change the result far more than most people expect: how long you stay invested, whether you raise the amount each year, and what return you honestly assume. By the end you should be able to set a monthly figure that matches a real goal instead of picking a round number and hoping for the best.",
  ],
  keyPoints: [
    "A SIP of Rs 10,000 a month for 15 years at 12 percent a year grows to about Rs 50.46 lakh, on total deposits of Rs 18 lakh.",
    "The SIP formula uses monthly compounding: FV equals P multiplied by ((1 plus i) to the power n, minus 1) divided by i, multiplied by (1 plus i).",
    "Time matters more than the amount. Doubling the tenure from 10 to 20 years more than quadruples the gains on the same monthly SIP.",
    "A 10 percent annual step up can lift a 15 year corpus from about Rs 50.46 lakh to about Rs 86.84 lakh.",
    "Treat the expected return as an assumption, not a guarantee. Equity funds have historically been planned around 10 to 12 percent for long horizons.",
    "Start with salary, not leftovers. Linking the SIP date to just after payday makes the habit far easier to keep.",
  ],
  sections: [
    {
      heading: "What a SIP actually does with your money",
      paragraphs: [
        "When you register a SIP, you give a bank mandate for a fixed amount on a fixed date each month. The money is debited and units of your chosen fund are allotted at that day's closing NAV. If markets have fallen, the same Rs 10,000 buys more units. If markets have risen, it buys fewer. Over years this averaging of purchase cost is called rupee cost averaging, and it is the main behavioural advantage of a SIP over trying to time a lump sum entry.",
        "Separate the SIP, which is just a payment method, from the fund itself, which is where returns come from. That is why a SIP suits goals at least five to seven years away. Most families run more than one SIP at a time, in separate buckets so each can use the right fund type and tenure.",
      ],
      bullets: [
        "SIP is a method of investing, not a product. The fund you choose decides the risk and the return.",
        "Units are bought at the NAV on the debit date, so the purchase price averages out over time.",
        "Equity SIPs suit goals five years or more away. For nearer goals, debt or hybrid funds are usually calmer.",
        "You can pause, raise, reduce or stop a SIP, usually without a penalty from the fund house itself.",
      ],
    },
    {
      heading: "The SIP formula, explained without the jargon",
      paragraphs: [
        "The maths behind every SIP calculator is the future value of a series of equal monthly payments, compounded monthly. The formula is FV equals P multiplied by (((1 plus i) raised to n, minus 1) divided by i), multiplied by (1 plus i). Here P is your monthly investment, i is the monthly rate, which is the expected annual return divided by 12, and n is the total number of payments. The final multiplied by (1 plus i) appears because a standard SIP payment is treated as invested at the start of each month.",
        "Plug in a concrete case. You invest Rs 10,000 a month and expect 12 percent a year for 15 years. The monthly rate i is 1 percent, or 0.01, and n is 180. First, (1.01) raised to 180 is about 5.9958. Subtract 1 to get 4.9958, divide by 0.01 to get 499.58, and multiply by Rs 10,000 to get Rs 49,95,802. Multiply once more by 1.01 and the future value is about Rs 50,45,760, roughly Rs 50.46 lakh. Your deposits were Rs 18 lakh, so the estimated gain is about Rs 32.46 lakh. Your deposits grow in a straight line, but the corpus curves upward because each year's gains start earning their own gains. If you want to check how a one time deposit compounds, the companion explainer on the [interest calculator](/guides/interest-calculator) walks through simple and compound interest.",
      ],
    },
    {
      heading: "Worked examples: what common SIP amounts can become",
      paragraphs: [
        "The table below uses a 12 percent annual return throughout, compounded monthly, the assumption most long term equity planners in India use for illustration. The gap between the invested column and the corpus column is compounding, and it widens dramatically as the tenure stretches.",
        "Rs 5,000 a month for 10 years is Rs 6 lakh of your own money, and it grows to about Rs 11.62 lakh. Keep the same Rs 5,000 going for 20 years and you deposit Rs 12 lakh, but the corpus reaches about Rs 49.96 lakh. You doubled the deposits and more than quadrupled the outcome. Priya's case shows planning in practice. She wants roughly Rs 60 lakh in 15 years for her daughter's education abroad. Working backwards with the [SIP calculator](/calculators/sip-calculator), she finds that at 12 percent she needs about Rs 12,000 a month, since Rs 10,000 gives roughly Rs 50.46 lakh and each extra Rs 1,000 a month adds a little over Rs 5 lakh across 15 years.",
      ],
      table: {
        caption: "Estimated SIP outcomes at 12 percent a year, monthly compounding",
        headers: ["Monthly SIP", "Tenure", "Total invested", "Estimated corpus", "Estimated gains"],
        rows: [
          ["Rs 5,000", "10 years", "Rs 6 lakh", "Rs 11.62 lakh", "Rs 5.62 lakh"],
          ["Rs 10,000", "15 years", "Rs 18 lakh", "Rs 50.46 lakh", "Rs 32.46 lakh"],
          ["Rs 5,000", "20 years", "Rs 12 lakh", "Rs 49.96 lakh", "Rs 37.96 lakh"],
          ["Rs 10,000", "20 years", "Rs 24 lakh", "Rs 99.91 lakh", "Rs 75.91 lakh"],
          ["Rs 25,000", "20 years", "Rs 60 lakh", "Rs 2.50 crore", "Rs 1.90 crore"],
          ["Rs 15,000", "25 years", "Rs 45 lakh", "Rs 2.85 crore", "Rs 2.40 crore"],
        ],
      },
    },
    {
      heading: "Time in the market: why tenure beats timing",
      paragraphs: [
        "Ask two investors with the same Rs 10,000 SIP and 12 percent returns what they end up with, and the one who started earlier wins by a margin that surprises people. Ten years produces about Rs 23.23 lakh. Fifteen years produces about Rs 50.46 lakh. Twenty years produces about Rs 99.91 lakh. Each extra block of five years adds more than the previous block, even though the deposits in each block are identical at Rs 6 lakh. Compounding pays you on a growing base, so the calendar does the heavy lifting.",
        "Tenure also changes how much risk you can sensibly take. A retirement goal 25 years away can ride out several crashes inside an equity fund. A home deposit needed in three years cannot. Match the fund's risk to the distance of the goal first, then use the calculator to size the monthly amount.",
      ],
    },
    {
      heading: "Step up SIPs: the raise that does the heavy lifting",
      paragraphs: [
        "A flat SIP assumes your salary stays frozen for 15 years, which happily it does not. A step up SIP raises the monthly amount automatically, usually once a year, by a fixed sum or a percentage like 5 or 10 percent. Since most salaries grow by roughly that percentage in a normal year, the step up commits tomorrow's raise to the plan before lifestyle spending absorbs it. You barely feel the increase, but the compounding effect is large because the bigger instalments arrive year after year.",
        "Here is the comparison on the same base plan. A flat Rs 10,000 a month for 15 years at 12 percent reaches about Rs 50.46 lakh on Rs 18 lakh invested. Now step the amount up by 10 percent every year: Rs 10,000 in year one, Rs 11,000 in year two, Rs 12,100 in year three and so on. Over 15 years you invest about Rs 38.13 lakh, and the corpus grows to roughly Rs 86.84 lakh. Step ups are also the practical answer to inflation. A goal that costs Rs 40 lakh today may cost Rs 70 lakh or more in 15 years. Inflate the goal first, then solve for the monthly amount, and register the step up when you start, which is far more reliable than a manual increase each April.",
      ],
      bullets: [
        "A 10 percent yearly step up lifted the example 15 year corpus from Rs 50.46 lakh to about Rs 86.84 lakh.",
        "Register the step up when you start the SIP. Manual increases depend on memory and mood.",
        "Match the step up to your expected salary growth, usually 5 to 10 percent a year.",
        "Inflate your goal amount before solving for the SIP, especially for education and housing goals.",
      ],
    },
    {
      heading: "SIP versus lump sum, FD and RD: picking the right tool",
      paragraphs: [
        "A lump sum puts the whole amount to work on day one, so in a steadily rising market it beats a SIP of the same total size. The problem is that most of us do not receive our savings in one lump. Salaries arrive monthly, so a SIP is the natural way monthly income becomes invested capital. When a genuine lump sum does arrive, a common middle path is to park it in a liquid fund and move it into equity through a systematic transfer plan over 6 to 12 months, spreading the entry risk.",
        "Fixed deposits and recurring deposits sit at the opposite end of the risk scale. An RD is structurally similar to a SIP, but the return is a guaranteed bank rate, far below long term equity expectations, and the interest is taxed at your slab rate every year. For a goal three years away that certainty is worth having. For a goal 18 years away, it costs you dearly. Our companion guide on the [FD calculator](/guides/fd-calculator) explains how bank deposits compound quarterly and when that safety is the right choice. There is little sense in running a large SIP while carrying a credit card balance at 36 to 42 percent a year. A home loan is different, at 8.5 to 9.5 percent it can reasonably run alongside investing, and the guide on the [home loan EMI calculator](/guides/home-loan-emi-calculator) shows how tenure and prepayments change what you pay the bank.",
      ],
    },
    {
      heading: "Choosing a return assumption and understanding tax",
      paragraphs: [
        "The expected return box is where SIP calculators get abused. Type 18 percent and any plan looks easy; type 8 percent and retirement looks impossible. For long term planning in India, diversified equity funds are commonly illustrated at 10 to 12 percent a year, while hybrid funds sit lower and debt funds lower still. Run your plan at two or three rates and treat the lowest as the planning case. On Rs 10,000 a month for 15 years, 10 percent gives about Rs 41.79 lakh, 12 percent gives about Rs 50.46 lakh and 14 percent gives about Rs 61.29 lakh. If your goal only works at 14 percent, your plan is fragile.",
        "The calculator does not subtract tax. For equity funds held over a year, long term capital gains above Rs 1.25 lakh in a financial year are taxed at 12.5 percent under current rules, while short term gains are taxed at 20 percent. Inflation is the other silent deduction: a corpus of Rs 1 crore in 20 years at 6 percent inflation buys roughly what Rs 31 lakh buys now, so inflate your goal before solving for the monthly amount.",
      ],
      bullets: [
        "Plan equity SIPs at 10 to 12 percent. Be suspicious of any plan that needs 15 percent or more to work.",
        "Run the calculator at two or three return rates and budget around the cautious one.",
        "Equity long term capital gains above Rs 1.25 lakh a year are currently taxed at 12.5 percent. Budget rules can change.",
        "Always inflate the goal to its future price before solving for the monthly amount.",
      ],
    },
    {
      heading: "How to use the SIP calculator, step by step",
      paragraphs: [
        "Using the tool well takes under a minute, but the order of the inputs matters. Start from the goal, not from a comfortable round number. Decide what you are saving for, when you need it, and what it will cost in that future year. Then test monthly amounts until the estimated corpus covers the inflated goal with a little room to spare. Finish by checking the plan at a return two points lower, so you know how much slack you really have.",
        "Once you have the number, turn it into an actual instruction: choose the fund category that matches the goal's distance, set the SIP date just after payday, and register the annual step up. If the required SIP looks unaffordable today, you have three honest levers: extend the tenure, add a step up, or trim the goal itself. Try your own figures now in the [SIP calculator](/calculators/sip-calculator). You can also browse the full [guides](/guides) library for companion explainers.",
      ],
      steps: [
        "Write down the goal, the year you need the money and its cost in today's rupees.",
        "Inflate the goal to its future cost, using roughly 5 to 6 percent a year for general goals and more for education.",
        "Open the calculator and enter a monthly amount, the years until the goal and a 10 to 12 percent return for equity.",
        "Adjust the monthly amount until the estimated corpus meets the inflated goal, then recheck at 10 percent.",
        "Add a 5 to 10 percent yearly step up and note how much it lowers the starting amount you need today.",
        "Set the SIP date just after payday, register the step up, and fix a yearly review date.",
      ],
    },

  ],
  faqs: [
    {
      q: "How much will a Rs 10,000 monthly SIP be worth in 15 years?",
      a: "At an assumed 12 percent annual return compounded monthly, Rs 10,000 a month for 15 years grows to about Rs 50.46 lakh, on deposits of Rs 18 lakh. At 10 percent the same plan gives about Rs 41.79 lakh. These are illustrations based on a steady return, and actual mutual fund returns vary year to year.",
    },
    {
      q: "What return should I enter in a SIP calculator?",
      a: "For diversified equity funds over long periods, 10 to 12 percent a year is the range most planners use for illustration in India. Use a lower figure, around 7 to 9 percent, for hybrid funds and 6 to 7 percent for debt oriented plans. Running your goal at the cautious end tells you whether the plan survives ordinary returns, not just good ones.",
    },
    {
      q: "Is a SIP better than a lump sum investment?",
      a: "Neither is universally better. A lump sum compounds in full from day one, so it wins in a rising market, but most people earn monthly and invest monthly, which is exactly what a SIP automates. If you receive a large one time sum for a long term goal, many investors move it into equity gradually over 6 to 12 months through a systematic transfer plan.",
    },
    {
      q: "Can I lose money in a SIP?",
      a: "Yes, especially over short periods. A SIP spreads your purchase prices but it does not remove market risk, and an equity SIP can show a loss for a year or more after a market fall. The risk reduces as the horizon lengthens, which is why equity SIPs suit goals at least five to seven years away, while near term money belongs in safer options.",
    },
    {
      q: "What is a step up SIP and should I use one?",
      a: "A step up SIP raises your monthly amount automatically every year, by a fixed sum or a percentage such as 10 percent. It matches the way salaries grow, so it rarely strains the budget, yet it can add tens of lakh to a long term corpus. In the example in this guide, a 10 percent yearly step up lifted a 15 year outcome from about Rs 50.46 lakh to about Rs 86.84 lakh.",
    },
    {
      q: "How is a SIP taxed in India?",
      a: "Each instalment is a separate purchase, so gains are taxed when you redeem units. For equity funds, units held over 12 months qualify as long term, with gains above Rs 1.25 lakh in a financial year taxed at 12.5 percent under current rules, while shorter holdings are taxed at 20 percent. Debt funds follow different rules, and tax law changes with budgets, so check the current position before redeeming a large amount.",
    },
  ],
  relatedSlugs: ["fd-calculator", "interest-calculator", "home-loan-emi-calculator"],
};
