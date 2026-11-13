import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "SIP Calculator: Project Your Monthly Mutual Fund Investment Growth",
  metaDescription:
    "See how a monthly SIP grows over time. Enter your monthly amount, expected return and years to get the invested total, estimated gains and maturity value with a year by year breakdown.",
  intro:
    "A SIP turns a small monthly habit into a serious sum, because every instalment buys into the market and then compounds for years. This calculator projects what your monthly investment could grow to, and shows how much of the final value is your money and how much is growth doing the heavy lifting.",
};

export const content: ToolContent = {
  seoTitle: "SIP Calculator: Project Your Monthly Mutual Fund Investment Growth",
  howTo: [
    "Enter the amount you can invest every month, honestly, not hopefully.",
    "Set the expected yearly return. Equity funds have historically averaged around 12 percent over long periods, but nothing is promised.",
    "Choose how many years you can leave the money untouched.",
    "Compare the invested amount against the maturity value to see the compounding effect, then test a longer horizon to feel how powerful time is.",
  ],
  explanationTitle: "How SIP returns are calculated",
  explanation: [
    "The calculator treats your investment as a series of monthly deposits that each grow at the same monthly rate. The formula is FV equals P times (((1 + i) to the power n) minus 1, divided by i), times (1 + i), where P is your monthly amount, i is the monthly return (yearly return divided by 12), and n is the total number of months. The final multiplication by (1 + i) accounts for instalments being invested at the start of each month.",
    "Two things drive your result far more than clever fund picking: time and consistency. In the early years your own deposits make up most of the value. Later, the growth on past growth takes over, which is why the year by year table bends upward. Starting five years earlier usually beats investing a larger amount for a shorter time.",
    "Treat the return setting as a planning assumption, not a forecast. Markets move in lumps, not straight lines, and real SIP returns depend on the fund, fees and the actual sequence of market ups and downs. Use 10 to 12 percent for a sober equity estimate, and check what your plan looks like at a lower return too, so a rough patch never breaks it.",
  ],
  faqs: [
    {
      q: "What is a SIP?",
      a: "A Systematic Investment Plan is an automatic monthly investment into a mutual fund. Instead of timing the market with one big amount, you invest a fixed sum every month and buy more units when prices are low and fewer when they are high.",
    },
    {
      q: "What return should I assume for equity funds?",
      a: "Indian equity funds have delivered roughly 12 percent a year over long periods, but past performance never guarantees the future. Planning with 10 to 12 percent is reasonable, and stress testing your goal at 8 or 9 percent is wiser still.",
    },
    {
      q: "How much difference does starting early really make?",
      a: "A large one. At 12 percent, 10,000 a month for 10 years grows to about 23 lakh. The same amount for 20 years grows to roughly 1 crore. The extra decade adds far more than double, because compounding accelerates.",
    },
    {
      q: "Is the maturity value guaranteed?",
      a: "No. This is a projection based on a smooth assumed return. Actual market returns vary year to year, and your real result will differ. The calculator is a planning tool, not a promise from any fund.",
    },
    {
      q: "What is the difference between a SIP and a lump sum investment?",
      a: "A lump sum puts all the money in at once, which works well when markets rise steadily but hurts if they fall right after you invest. A SIP spreads the entry over time, which smooths the purchase price and suits money that arrives monthly, like salary.",
    },
  ],
};
