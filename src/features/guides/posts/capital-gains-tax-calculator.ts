import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "capital-gains-tax-calculator",
  keyword: "capital gains tax calculator",
  title: "Capital Gains Tax: Short Term, Long Term and How to Estimate Your Bill",
  metaTitle: "Capital Gains Tax Calculator Guide: Rates and Examples",
  metaDescription: "Estimate capital gains tax with short and long term worked examples, holding period rules, basis, losses and wash sale rules explained in plain US terms.",
  excerpt: "Sold shares, crypto or a property for more than you paid? This guide explains how US capital gains tax actually works, with worked examples for short term and long term gains, losses, basis and the wash sale rule.",
  category: "Finance and Tax",
  toolSlug: "capital-gains-tax-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "You sell something for more than you paid for it, and the profit feels like yours until tax season reminds you that the IRS wants a share of the gain. The awkward part is that the share is not one fixed number. It depends on what you sold, how long you held it, how much other income you have, and whether you also sold something at a loss in the same year. Guessing from the sale price alone almost always gives the wrong answer.",
    "A good starting point is to run your own figures through the free [capital gains tax calculator](/calculators/capital-gains-tax-calculator) before you sell, not after. Enter what you paid, what you expect to receive, how long you have held the asset and a rough idea of your other income, and you get an estimate you can plan around. That estimate will not file your return for you, but it stops the two most common shocks: spending money that was really tax money, and selling a week too early and losing the long term rate.",
    "This guide walks through the US federal rules in general terms, so you can follow the logic behind the calculator. It covers basis, the one year holding period line, the 0, 15 and 20 percent long term brackets, how losses help and where the wash sale rule can take that help away, plus state tax, which many estimates forget completely. Dollar thresholds for the brackets change with inflation and with your filing status, so treat any specific threshold you see online as an example for that year, not a permanent rule. For a large sale, check the current year figures or talk to a tax professional before you commit.",
  ],
  keyPoints: [
    "Your taxable gain is sale price minus basis, and basis is usually what you paid plus certain buying and selling costs.",
    "Hold an asset for one year or less and the gain is short term, taxed like ordinary income. Hold it for more than one year and it is long term.",
    "Long term gains get preferential federal rates of 0, 15 or 20 percent depending on your taxable income, plus a possible extra tax for higher earners.",
    "Capital losses first offset capital gains. A limited amount of leftover loss can offset other income each year, and the rest can carry forward.",
    "For stocks and similar securities, the wash sale rule can disallow a loss if you buy a substantially identical asset within 30 days before or after the sale.",
    "Most states tax capital gains too, often as ordinary income, so a federal only estimate understates the full bill.",
  ],
  sections: [
    {
      heading: "What counts as a capital gain, and what basis really means",
      paragraphs: [
        "A capital gain is the profit on the sale of a capital asset. For most people that means shares of stock, mutual funds and exchange traded funds, cryptocurrency and other digital assets, real estate that is not your main business inventory, collectibles, and a business asset you sell on. If you bought it as an investment or for personal use and later sold it for more than your basis, the difference is a gain. If you sold it for less, the difference is a capital loss. No sale, generally no tax. A holding that has risen in value on paper has an unrealized gain, and the federal tax bill normally arrives only when you sell and realize it.",
        "Basis is the number everything hangs on. For something you bought, basis usually starts with the purchase price, then adds commissions and certain transaction fees, and for real estate it can also include some closing costs and the cost of major improvements that add value or extend the life of the property. Routine repairs do not normally add to basis. For an asset you inherited, basis often gets a step up to its fair market value at the date of death. For a gift, the giver basis often carries over, so keep the paperwork for gifted assets especially carefully.",
        "Here is a small example. Jordan bought 100 shares at $42 a share, paying $4,200 plus a $10 commission, so his basis is $4,210. Two years later he sells at $58 a share, receiving $5,800 minus a $10 selling commission, so his amount realized is $5,790. His gain is $5,790 minus $4,210, which is $1,580. That $1,580, not the $5,790 in his bank account, is the amount the tax rules work on. Keep records of what you paid and what you spent to buy, improve and sell.",
      ],
    },
    {
      heading: "Short term versus long term: the one year line that changes your rate",
      paragraphs: [
        "Federal tax splits capital gains into two buckets by holding period. If you held the asset for one year or less before selling, the gain is short term. If you held it for more than one year, the gain is long term. Short term gains are taxed at the same rates as ordinary income. Long term gains on most assets get lower, preferential rates. The holding period normally starts the day after you acquire the asset and includes the day you sell it, so selling on the exact anniversary is risky. Waiting until you are clearly past one year is the safer way to count it.",
        "Take two traders who each make a $10,000 gain. Alex bought and sold shares within eight months. His $10,000 is short term, so it stacks on top of his salary. If that slice falls in a 22 percent bracket, the federal tax on the gain is about $2,200 as an illustration. Sam held her shares for fourteen months. Her $10,000 is long term, so if her income puts that gain in the 15 percent long term bracket, the federal tax is about $1,500 on the same $10,000 profit. Same gain, $700 difference, purely because of timing. Tax should shape a sale, not dictate it. A share price can fall by more than the tax saving in a bad week. Collectibles, and certain gains on small business stock and real estate where depreciation was claimed, can also face special rates or recapture rules, so treat any simple calculator result as a first estimate only for those.",
      ],
      table: {
        caption: "Short term and long term gains compared in general federal terms, using example rates for illustration.",
        headers: ["Feature", "Short term gain", "Long term gain"],
        rows: [
          ["Holding period", "One year or less", "More than one year"],
          ["How the rate is set", "Ordinary income brackets, same as wages", "Preferential rates of 0, 15 or 20 percent for most assets"],
          ["Example tax on a $10,000 gain", "About $2,200 if that slice falls in a 22 percent ordinary bracket", "About $1,500 if that gain falls in the 15 percent long term bracket"],
          ["Common situation", "Quick trades, assets sold within months of buying", "Investments held through at least one full year"],
        ],
      },
    },
    {
      heading: "How the 0, 15 and 20 percent long term brackets actually work",
      paragraphs: [
        "The long term rates are often described as if your whole gain gets one rate based on your income. Reality is a stacking system. First you work out your taxable income from all sources. Your ordinary income fills the brackets from the bottom. Your long term gains and qualified dividends sit on top of that ordinary income. Then the long term brackets decide how much of that top slice is taxed at 0 percent, how much at 15 percent, and how much at 20 percent. A gain can easily straddle two rates.",
        "Taxpayers with lower taxable income can have some or all of their long term gain taxed at 0 percent. Most higher income taxpayers see 15 percent on most of their gain. Taxpayers well into the higher ranges can see 20 percent on the portion above the top threshold for their filing status. For example, a single filer with modest income who realizes a $12,000 long term gain may see part at 0 percent and part at 15 percent. Higher income taxpayers may also owe the Net Investment Income Tax, an additional 3.8 percent on some investment income. If you are estimating a refund as well as a gain, our guide to the [tax refund calculator](/guides/tax-refund-calculator) explains how extra income changes the withholding picture.",
      ],
    },
    {
      heading: "How to estimate your capital gains tax step by step",
      paragraphs: [
        "A reliable estimate follows the same order every time, whether you do it on paper or in a calculator. Skipping a step is where most wrong answers come from, especially skipping the losses step or using gross proceeds instead of gain.",
      ],
      steps: [
        "Work out your amount realized: the sale price minus commissions and selling costs you paid to complete the sale.",
        "Work out your basis: purchase price plus buying costs, plus qualifying improvements for property, with any special basis rule for inherited or gifted assets noted separately.",
        "Subtract basis from the amount realized. A positive result is a gain, a negative result is a loss. Note the holding period for each asset, short term or long term.",
        "Net your gains and losses for the year within the short term and long term groups, then net the two groups against each other if one is a loss.",
        "Add the net gain to your other taxable income to see which long term bracket or brackets the gain falls into, and apply 0, 15 or 20 percent to the right slices.",
        "Add any extra federal tax that may apply, then add an estimate for your state tax. Set that total aside so the money is there when you file or pay an estimate.",
      ],
      subsections: [
        {
          heading: "A full worked example with a loss in the same year",
          paragraphs: [
            "Maya sells two holdings in the same tax year. First, she sells a fund she held for two and a half years. She paid $18,000, her basis with fees is $18,050, and she receives $24,950 after selling costs, so her long term gain is $6,900. Second, she sells shares she bought seven months earlier for $5,200, receiving $4,100 after costs, so her short term loss is $1,100. The netting rules let losses offset gains, so her overall net capital gain is $6,900 minus $1,100, which is $5,800.",
            "Now add income context. Suppose Maya's net gain falls in the 15 percent long term bracket. Fifteen percent of $5,800 is $870 in federal tax, before any state tax. Without the $1,100 loss, the same method gives $1,035. Harvesting that loss saved about $165 in this illustration. Capital gains are taxed in the year of the sale, so a sale in late December and a sale a few days later in January can fall in different tax years. Run both versions in the calculator before you decide.",
          ],
        },
      ],
    },
    {
      heading: "Losses, carryforwards and the wash sale rule",
      paragraphs: [
        "Losses are not just bad news. Capital losses first offset capital gains, dollar for dollar, the most valuable use. If losses exceed gains for the year, a limited amount of the leftover, generally up to $3,000 a year for most filers and $1,500 if married filing separately, can offset other income such as wages. Anything still left carries forward to future years, keeping its short term or long term character, to offset future gains.",
        "The wash sale rule is the trap inside loss harvesting. In general terms, if you sell a stock or security at a loss and buy a substantially identical one within 30 days before or after the sale, a 61 day window in total, the loss can be disallowed for now. It is generally added to the basis of the replacement shares, deferring the benefit until you sell them without another wash sale, and the rule reaches across accounts you control. A concrete example helps. Tom sells shares at a $2,000 loss on 10 June, then buys the same shares back on 25 June because the price dipped. That purchase falls inside the window, so the loss is disallowed for this sale and added to the basis of his new shares instead. Had he waited out the window, or bought a holding that is not substantially identical, the loss would generally have been allowed, though waiting always carries market risk.",
      ],
    },
    {
      heading: "State tax, property sales and the mistakes that inflate estimates",
      paragraphs: [
        "Federal tax is only part of the bill for most sellers. Most states tax capital gains as part of state income tax, often at their ordinary income rates with no special lower rate for long term gains. A handful of states have no income tax at all, so where you live in the year of the sale can change the total by thousands on a large gain. A calculator that shows only a federal number is giving you a floor, not a final total. Your main home gets special federal treatment: if you owned and lived in it as your main home for the required period, a large portion of the gain can be excluded from federal tax, with a larger exclusion for married couples filing jointly than for single filers. Rental property does not get that exclusion, and depreciation claimed on a rental can come back as recapture on sale.",
        "Now the mistakes list. First, taxing the full sale price instead of the gain. Second, forgetting a loss from earlier in the year, or a carryforward loss. Third, selling a few days before the one year mark. Fourth, ignoring state tax. Fifth, assuming crypto, collectibles or a home sale follow exactly the same rate story as shares. Sixth, spending all the proceeds. Our guide to the [sales tax calculator](/guides/sales-tax-calculator) covers a different tax that also gets forgotten in budgets. The explainer behind the [interest calculator](/guides/interest-calculator) is useful background here too, because a tax bill paid late can cost far more than the original estimate.",
      ],
    },
    {
      heading: "Using the calculator well and knowing when you need advice",
      paragraphs: [
        "The best use of an estimate is before the sale, while you can still change the timing, the amount or the asset you sell. Run the [capital gains tax calculator](/calculators/capital-gains-tax-calculator) with the price you hope for, then run it again with a lower price and a sale date in a different tax year. The spread between those runs tells you how much timing is worth in dollars. If the difference is $80, sell when the investment case says sell. If the difference is $2,000 and the one year mark is nine days away, that is a different conversation, still with market risk attached.",
        "Keep a simple file for each sale: what you bought, when, for how much, and any improvement records for property. There are clear moments to stop estimating and get personal advice: a sale large enough to change your tax bracket, a home sale after a divorce or a death, a business sale, foreign assets, or any notice from the IRS. This guide gives general information only, so confirm the figures for your tax year before you file. Browse the [guides](/guides) library for more explainers like this one. Never let a profitable sale surprise you in April. Estimate before you sell, and set the tax money aside the week the proceeds arrive.",
      ],
    },

  ],
  faqs: [
    { q: "How is capital gains tax calculated?", a: "Start with the sale price minus selling costs, then subtract your basis, which is usually what you paid plus buying costs. The result is your gain. Short term gains are taxed at ordinary income rates, and long term gains on most assets are taxed at preferential federal rates of 0, 15 or 20 percent depending on your taxable income, plus any state tax." },
    { q: "What is the difference between short term and long term capital gains?", a: "It is the holding period. A gain on an asset held for one year or less is short term and taxed like wages. A gain on an asset held for more than one year is long term and usually gets the lower preferential rates. That is why the sale date, not just the sale price, changes the bill." },
    { q: "Do I pay capital gains tax if I sell at a loss?", a: "No, a sale at a loss creates a capital loss, not a gain. That loss can offset capital gains in the same year, a limited amount can offset other income each year, and any leftover loss generally carries forward to future years. For stocks and securities, the wash sale rule can defer the loss if you buy a substantially identical asset within 30 days before or after the sale." },
    { q: "Does the capital gains tax calculator include state tax?", a: "That depends on the inputs you use. Federal and state tax are separate, and most states tax gains as ordinary income with no long term discount. Use the calculator for the federal estimate, then check your state rules for the year of the sale and add that amount so you do not understate the total." },
    { q: "How can I legally reduce a capital gains bill?", a: "Common planning ideas include holding for more than one year to reach long term rates, offsetting gains with real losses you were going to realize anyway, timing a large sale across tax years, and keeping full basis records so you are not taxed on money that was really your own cost. Each idea has trade offs and market risk, so weigh the tax saving against the investment cost." },
    { q: "More guides like this one?", a: "Browse the full library on the [guides hub](/guides) for plain language explainers on tax, loans, health and everyday calculators, each one linked to a free tool you can use with your own numbers." },
  ],
  relatedSlugs: ["tax-refund-calculator", "sales-tax-calculator", "interest-calculator"],
};
