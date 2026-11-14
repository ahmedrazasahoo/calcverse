import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "zakat-calculator",
  keyword: "zakat calculator",
  title: "Zakat Calculator: How Much Zakat Do You Owe on Your Wealth This Year?",
  metaTitle: "Zakat Calculator Guide: Nisab, Rate and What to Pay",
  metaDescription: "Learn how zakat is calculated at 2.5 percent above the nisab, which assets count, how gold and silver thresholds work, and how the lunar year applies.",
  excerpt: "Zakat explained clearly and respectfully: the 2.5 percent rate, the gold and silver nisab thresholds, which assets count, which debts can be deducted, and a full worked example.",
  category: "Finance and Tax",
  toolSlug: "zakat-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Every year, many Muslims sit down with bank statements, a jewellery box and a growing sense of uncertainty, and ask the same question: how much zakat do I actually owe? The rate itself is simple, 2.5 percent, but the number it applies to is not. You have to work out which assets count, whether you are above the minimum threshold called nisab, what you may deduct, and whether a full lunar year has passed over the wealth. Getting any one of those steps wrong changes the final figure by a lot.",
    "A good starting point is to list your assets and run the totals through the free [zakat calculator](/calculators/zakat-calculator), which handles the arithmetic and the nisab check in one pass. This guide explains the reasoning behind that calculation step by step, so you can see why each item is included or left out. It presents the widely shared rules found across the major schools of thought, and it flags the points where scholars differ, because on those points a calculator cannot decide for you.",
    "This is general educational information about how zakat is commonly calculated, not a religious ruling for your personal situation. Family circumstances, debts, business structures and local scholarly guidance can all affect the answer. If any part of your case is unusual or disputed, please confirm it with a scholar or a trusted local authority you rely on for religious matters.",
  ],
  keyPoints: [
    "Zakat on money and monetary wealth is 2.5 percent, which is one fortieth, of your zakatable assets.",
    "You owe zakat only if your zakatable wealth reaches the nisab and stays at or above it for a full lunar year, called the hawl.",
    "The nisab is set by gold, 85 grams, or by silver, 595 grams. The silver value is much lower, so the threshold you use changes who qualifies.",
    "Cash, savings, gold, silver and goods held for trade are zakatable. Your home, car and personal belongings are not.",
    "Debts that are due and payable are deducted by many scholars, though the details differ between schools of thought.",
    "Zakat is calculated on the balance on your zakat date, based on current market values, not on what you paid for assets years ago.",
  ],
  sections: [
    {
      heading: "What zakat is, and the basic rule in one paragraph",
      paragraphs: [
        "Zakat is one of the five pillars of Islam. It is an obligatory act of worship in which a Muslim who owns wealth above a defined minimum gives a set portion of that wealth to eligible recipients, including the poor and the needy. The word itself carries the sense of purification and growth: giving the due portion purifies the wealth that remains. For money, gold, silver and trade goods, the rate set out in the tradition is 2.5 percent, often described as one fortieth. Other categories of wealth, such as crops and livestock, have their own rates and rules, and this guide focuses on the monetary calculation that most people using an online calculator need.",
        "The basic rule can be stated in one sentence: if your zakatable wealth reaches the nisab threshold and a full lunar year passes over it, you pay 2.5 percent of the zakatable amount on your zakat date. Each clause in that sentence does real work. Zakatable wealth is a defined subset of everything you own, not your total net worth. The nisab is a floor below which nothing is due. The lunar year condition, the hawl, means zakat is not charged on money you received last week. And the payment is worked out from the position on one chosen date each year, which keeps the obligation orderly instead of continuous.",
        "Many people choose Ramadan as the time to pay, because good deeds in that month carry special significance for them, but Ramadan is not a requirement. Your zakat year starts when your wealth first reached the nisab, and your annual due date follows that start. If you do not know your original date, scholars commonly advise picking a fixed date, a day in Ramadan for example, and using it consistently every year from then on. Consistency matters more than the particular date, because it stops wealth slipping between two dates and never being assessed.",
      ],
    },
    {
      heading: "The nisab: gold and silver thresholds explained",
      paragraphs: [
        "Nisab is the minimum amount of zakatable wealth that makes zakat obligatory. The classical measures are 20 mithqal of gold and 200 dirhams of silver, which scholars express in modern weights as about 85 grams of gold (roughly 7.5 tola) and about 595 grams of silver (roughly 52.5 tola). Because the nisab is defined by weight, its value in currency moves with metal prices. On the day you calculate, you multiply the weight by the current price per gram in your currency. If gold trades at the equivalent of 80 dollars a gram, the gold nisab is about 6,800 dollars. If silver trades at 1 dollar a gram, the silver nisab is about 595 dollars. Same weights, very different thresholds.",
        "That gap creates the most common nisab question: which standard should I use? The silver nisab is far lower, so far more people qualify under it, and more zakat reaches the poor. Many scholars and most zakat organisations therefore recommend assessing cash and monetary wealth against the silver nisab, or against whichever threshold is lower at the time, out of caution and benefit to recipients. Others follow the gold standard for monetary wealth, particularly where that is the established practice of their school or community. Both positions have scholarly backing. Pick the standard your school or trusted scholar follows, apply it consistently, and do not switch year to year just because one gives a smaller bill.",
        "Notice what the nisab test applies to. You compare your total zakatable assets, after the treatment of debts discussed below, against the threshold. It is not a test on each account separately. A person with 400 dollars in one account, 300 in another and gold worth 200 dollars has 900 dollars of zakatable wealth, which is above a 595 dollar silver nisab even though no single pot crosses it alone. Splitting money across accounts, wallets and currencies never takes you below the nisab. Add everything up in one currency first, then compare. The [zakat calculator](/calculators/zakat-calculator) does that aggregation for you if you enter each item in turn.",
      ],
      table: {
        caption: "The two nisab standards side by side",
        headers: ["Standard", "Classical measure", "Modern weight", "Typical effect"],
        rows: [
          ["Gold nisab", "20 mithqal", "About 85 grams (7.5 tola)", "Higher threshold, fewer people qualify"],
          ["Silver nisab", "200 dirhams", "About 595 grams (52.5 tola)", "Lower threshold, more people qualify"],
        ],
      },
    },
    {
      heading: "Which assets are zakatable, and which are not",
      paragraphs: [
        "Start with what clearly counts. Cash in hand, money in current and savings accounts, and balances in payment apps are all zakatable at face value. Gold and silver count in whatever form you hold them, as coins, bars or jewellery, valued at their current market price for the metal content. Goods bought with the intention of resale, meaning shop stock, online store inventory and property bought purely to flip, count as trade goods and are valued at their expected selling price on your zakat date. Money owed to you that you realistically expect to recover, such as a loan to a solvent friend or a refundable deposit, is included by most scholars, sometimes in the year it is actually repaid depending on the view you follow.",
        "Investments need a closer look. Shares bought for trading are generally valued at market price and zakated in full. Shares held as a long term investment are treated differently by many scholars: instead of zakating the full share price, you zakate your share of the underlying zakatable assets of the company, such as cash and inventory, which fund managers and some company reports can help estimate. Pension pots raise similar questions, and the answer often turns on whether the money is accessible to you and under your control. These are exactly the areas where published guidance varies, so note the approach you follow and check it with a scholar if the amounts are large.",
        "Just as important is what does not count. The home you live in is not zakatable, no matter how valuable it is. Neither are your car, furniture, clothing, appliances or other personal belongings used in daily life. A property you hold to live in or to rent out is not itself zakatable either, though rent you have actually received and saved by your zakat date becomes part of your cash and is counted there. Jewellery is the one personal item where schools differ: the Hanafi school generally includes gold and silver jewellery in zakat, while many scholars in other schools exempt jewellery that is genuinely worn and in normal personal use. That single difference can move a calculation by thousands, so follow the position you have adopted and be consistent.",
      ],
      bullets: [
        "Zakatable: cash and bank balances, gold and silver, trade inventory at selling price, recoverable loans you have made, and saved rental or business income.",
        "Not zakatable: your home, car, furniture, clothes and everyday personal possessions.",
        "Depends on the view you follow: personal gold jewellery, long term share holdings, pension funds and debts owed to you by someone who cannot currently pay.",
        "Value everything at current market prices on your zakat date, in one currency, before you apply the 2.5 percent rate.",
      ],
    },
    {
      heading: "Debts, the lunar year, and what you can deduct",
      paragraphs: [
        "Debts reduce the wealth that is truly yours, and many scholars allow you to deduct debts that are due and payable now, or due within the coming year, before checking the nisab and applying the rate. A credit card balance, a personal loan instalment that falls due this month, rent arrears and a supplier invoice awaiting payment all fit that description for most people. Long term borrowing splits opinion more sharply. With a mortgage or a multi year loan, a common approach is to deduct only the payments due in the next twelve months rather than the entire outstanding balance, because the rest is not yet payable. Deducting a full 25 year mortgage would wipe out the zakat of almost every homeowner, which is why the instalment based approach is widely taught.",
        "The hawl, the lunar year condition, is the second gate. Zakat becomes due when wealth at or above the nisab has been held for one full lunar year of about 354 days. Money that arrives during the year, from salary, business profit or a gift, is commonly added to your existing wealth and assessed on your single annual zakat date, rather than starting a separate year of its own. That is the practical method most households use: one date, one snapshot, one calculation. If your wealth fell below the nisab partway through the year and later recovered, schools differ on whether the year restarts, so treat a mid year dip below the threshold as another point to confirm with guidance you trust.",
        "One timing detail saves confusion: because the Islamic year is about 11 days shorter than the solar year, your zakat date moves earlier against the Gregorian calendar each year if you track the lunar date. People who fix a Gregorian date, such as the first day of each Ramadan estimated in advance or a set calendar date, should know that a fixed solar date slightly stretches the interval beyond a lunar year, which scholars who allow a fixed date generally accept for practicality. What matters is that no year passes without assessment. Keep a simple record of the date you paid, the nisab you used, the metal prices that day and your totals, so next year starts from evidence rather than memory.",
      ],
    },
    {
      heading: "A full worked example, step by step",
      paragraphs: [
        "Meet Yusuf, who set his zakat date as the first day of Ramadan. On that date he lists everything. He has 9,400 dollars across a current account and a savings account, plus 600 dollars in cash at home. His wife holds her own wealth separately, because zakat is an individual obligation assessed on each person who owns nisab, so her assets are not in his calculation. Yusuf owns gold coins weighing 40 grams, worth 3,200 dollars at that day price. He also runs a small online shop, and the stock he holds for resale would sell for about 4,800 dollars. A friend who borrowed 1,000 dollars last year is employed and expected to repay, so Yusuf includes the loan.",
        "Now the deductions. Yusuf owes 1,500 dollars on a credit card that he will pay this month, and the next twelve months of instalments on a personal loan come to 2,400 dollars. Following the deduction approach described above, he subtracts 3,900 dollars in total. His zakatable wealth is therefore 10,000 dollars of cash, plus 3,200 of gold, plus 4,800 of trade stock, plus the 1,000 dollar loan, which totals 19,000 dollars, minus 3,900 of debts, giving 15,100 dollars. The silver nisab that day is about 595 dollars and the gold nisab about 6,800 dollars, so he is comfortably above either threshold, and his wealth has stayed above nisab through the year. His zakat is 2.5 percent of 15,100 dollars, which is 377.50 dollars.",
        "Change one fact and watch the result move. If Yusuf had followed the view that the full long term loan balance of 11,000 dollars could be deducted, his zakatable total would fall to a much lower figure and his payment would shrink accordingly, which shows why the debt question is worth settling before, not during, the calculation. If his trade stock were instead tools he uses in the shop, they would drop out entirely because equipment used in a business is not trade goods. Small classification decisions, made honestly and consistently, are the whole craft of this calculation. Note also that zakat is separate from income tax: the salary tax rules discussed in our [Pakistan salary tax calculator guide](/guides/pakistan-salary-tax-calculator-2026-27) belong to a completely different system, and paying one does not cancel the other.",
      ],
      steps: [
        "List every zakatable asset at its current market value: cash, accounts, gold, silver, trade stock and recoverable loans.",
        "Add the assets together in a single currency using exchange rates from your zakat date.",
        "Deduct the debts your adopted scholarly view allows, usually amounts due now or within the coming year.",
        "Compare the result with the nisab, using the gold or silver threshold you follow. Below nisab, no zakat is due.",
        "If you are at or above nisab and a lunar year has passed, multiply the zakatable total by 2.5 percent, or divide it by 40.",
        "Record the date, prices, totals and amount paid, and pay the zakat to eligible recipients, keeping the record for next year.",
      ],
    },
    {
      heading: "Salary, savings and everyday questions that trip people up",
      paragraphs: [
        "A frequent misconception is that zakat is a tax on income. It is not. It is assessed on wealth you hold on your zakat date, not on everything that passed through your hands during the year. A salary earned and spent on rent, food and family needs before your zakat date leaves nothing to assess. The same salary sitting in your savings account on that date counts in full. This is why two people with identical incomes can owe very different amounts, and why a person with a modest income but steady savings may owe zakat while a higher earner who spends everything does not reach the nisab at all.",
        "It also means ordinary interest bearing products create a side issue worth knowing about. Zakat is still calculated on the capital you hold even if the account earned interest, and many scholars advise that interest itself should not be treated as part of your lawful wealth to keep, a point our guide to the [interest calculator](/guides/interest-calculator) can help you quantify if you need to separate it out. Similarly, money placed in fixed deposits or similar savings products remains your wealth and stays in the calculation at its full value on the zakat date, as explained in our [FD calculator guide](/guides/fd-calculator). The form of the account does not hide the wealth from the calculation; ownership and access are what count.",
        "Children and dependents raise another common question. Zakat is owed by the owner of the wealth. Whether zakat applies to wealth held for a child is a point scholars discuss, with many holding that a guardian pays it from the child wealth if it reaches nisab, and others limiting the obligation to adults. Joint accounts are assessed by each owner share, and a spouse wealth is assessed separately from yours, as the example of Yusuf above showed. When ownership is genuinely shared or unclear, estimate each person share fairly and document your reasoning. Fair estimation, made in good faith, is accepted practice where exact records do not exist.",
      ],
    },
    {
      heading: "Paying zakat well: recipients, records and a final check",
      paragraphs: [
        "The Quran names categories of eligible recipients, and zakat is most commonly given to the poor and the needy, people whose own wealth sits below the nisab and who struggle to meet basic needs. It can also support those employed to administer zakat, people in qualifying debt, and other categories described in the classical texts. What zakat cannot do is substitute for your ordinary household obligations: supporting your own dependents, whom you are already required to maintain, is generally not counted as zakat, and zakat is not normally given to your parents, spouse or children for that reason. Many people give through trusted charities or community organisations that verify recipients, while others give directly to people they know are struggling. Both routes are used widely; what matters is that the money reaches eligible hands as a transfer of ownership, not as a loan or a payment for services.",
        "Finish with a calm final check before you pay. Recalculate your totals from the asset list rather than from memory, confirm the metal prices and exchange rates are from your zakat date, and make sure you have not counted any asset twice, once as stock and again as the bank balance from selling it, for example. Then pay promptly, since delaying payment after the due date without a valid reason is discouraged. Run your final figures through the [zakat calculator](/calculators/zakat-calculator) one last time to catch arithmetic slips, because a transposed digit is the most human error of all. If you want to read more explainers in this series, the [guides hub](/guides) collects every CalcVerse guide in one place.",
        "Handled this way, zakat becomes a settled annual habit rather than an anxious scramble. You keep a dated record, you follow one consistent scholarly approach for nisab, jewellery, debts and investments, and you revisit that approach only when your circumstances genuinely change, such as starting a business, clearing a major debt or inheriting wealth. The calculation itself takes half an hour once the records exist. The clarity it brings, knowing the obligation has been met carefully and in full, is the real return on that half hour.",
      ],
    },
  ],
  faqs: [
    {
      q: "How is zakat calculated in simple terms?",
      a: "Add up your zakatable assets at current values, deduct the debts your scholarly view allows, and check the result reaches the nisab. If it does and a full lunar year has passed, zakat is 2.5 percent of that total, which is the same as dividing by 40. For example, 20,000 dollars of zakatable wealth gives 500 dollars of zakat.",
    },
    {
      q: "Should I use the gold or silver nisab?",
      a: "The gold nisab is about 85 grams and the silver nisab is about 595 grams, and the silver threshold is far lower in money terms, so more people qualify under it. Many scholars and zakat organisations recommend the silver standard for cash wealth because it benefits the poor, while others follow gold. Follow the standard of the school or scholar you trust, and use it consistently each year.",
    },
    {
      q: "Is zakat due on my salary?",
      a: "Zakat is assessed on wealth you hold on your zakat date, not on income itself. Salary you earned and spent during the year is not counted, while salary still sitting in your account on the zakat date forms part of your cash and counts in full. This is why zakat is often described as a levy on held wealth rather than an income tax.",
    },
    {
      q: "Do I pay zakat on gold jewellery?",
      a: "This is one of the points where schools differ. The Hanafi school generally includes gold and silver jewellery at its metal value, while many scholars in other schools exempt jewellery that is genuinely worn for personal use within normal limits. Because the amounts can be significant, adopt the position of the guidance you follow and apply it the same way every year.",
    },
    {
      q: "Can I deduct my mortgage from my zakat calculation?",
      a: "Many scholars allow deducting debts that are due and payable, and for long term borrowing such as a mortgage they commonly limit the deduction to the instalments falling due in the next twelve months rather than the whole balance. Views vary, so if your mortgage is large relative to your savings, confirm the approach with a scholar before you calculate.",
    },
    {
      q: "When exactly is my zakat due each year?",
      a: "Your zakat is due on the anniversary, in the lunar calendar, of the date your wealth first reached the nisab, provided it stayed at or above that level. Many people pay during Ramadan for its spiritual significance, and if you do not know your original date, choosing a fixed annual date and sticking to it is the commonly advised practical solution.",
    },
  ],
  relatedSlugs: ["pakistan-salary-tax-calculator-2026-27", "interest-calculator", "fd-calculator"],
};
