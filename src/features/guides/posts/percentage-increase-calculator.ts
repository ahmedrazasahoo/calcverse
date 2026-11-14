import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "percentage-increase-calculator",
  keyword: "percentage increase calculator",
  title: "Percentage Increase Calculator: How to Work Out Any Rise Accurately",
  metaTitle: "Percentage Increase Calculator Guide: Formula and Examples",
  metaDescription: "Learn how to calculate percentage increase with the simple formula, worked examples for prices, salary and rent, plus mistakes that distort your result fast.",
  excerpt: "Rent up, salary up, grocery bill up. Percentage increase tells you how big a rise really is compared with where you started, and this guide shows the formula with honest everyday examples.",
  category: "School and Math",
  toolSlug: "percentage-increase-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Your landlord says rent is going up by $75 a month. Your boss offers a $3,000 raise. Your grocery store quietly moves a pack of coffee from $11 to $13. Each of those is a dollar amount, but dollar amounts alone do not tell you how big the change really feels. A $75 rise on $950 rent hurts far more than a $75 rise on a $2,400 mortgage payment, and a $3,000 raise means something very different on a $42,000 salary than it does on a $95,000 one. Percentage increase is the tool that puts every rise on the same fair scale.",
    "The formula itself is short enough to memorize in one reading, and you can check any result instantly with the free [percentage increase calculator](/calculators/percentage-increase-calculator). This guide goes further than the answer box. It shows you why you always divide by the original value, how to handle raises, price hikes, taxes, tips, test scores and business growth, and how to spot the two mistakes that show up in news headlines, sales pitches and office emails all the time. Once the logic clicks, you will start seeing through vague claims like prices rose 50 percent in a way you never could before.",
    "You do not need advanced math for any of this. If you can subtract and divide, you can do every example below. Work through the first section slowly, try the numbers with your own rent or paycheck in mind, and the rest of the guide will feel like practice rather than study. More explainers like this one live in our [guides hub](/guides) if you want to keep building the same skills.",
  ],
  keyPoints: [
    "Percentage increase = (New Value - Original Value) / Original Value x 100. Always divide by the original value, never by the new one.",
    "A rise from $50 to $75 is a 50 percent increase, but a fall back from $75 to $50 is only a 33.3 percent decrease. Increases and decreases are not symmetric.",
    "Percentage points and percent are different. A rate moving from 4 percent to 5 percent is up 1 percentage point, which is a 25 percent increase in the rate itself.",
    "A 100 percent increase means the value doubled. A 200 percent increase means it tripled, because you add two full copies of the original.",
    "For a quick reverse check, multiply the original by (1 + increase / 100) and you should land back on the new value.",
  ],
  sections: [
    {
      heading: "The percentage increase formula, explained with one honest example",
      paragraphs: [
        "Start with the formula in words, because the words keep you honest. Percentage increase is the change divided by the starting point, multiplied by 100 to turn a decimal into a percent: Percentage Increase = ((New Value - Original Value) / Original Value) x 100. The subtraction finds how much things grew in raw units. The division answers the important question, grew compared with what? The multiplication by 100 just changes the costume of the answer from 0.25 to 25 percent.",
        "Take a concrete case. Marcus in Columbus paid $1,200 a month in rent last year. His new lease is $1,320. The change is $120. Divide $120 by the original $1,200 and you get 0.10, so the rent increase is 10 percent. The formula did not ask whether $120 is a lot of money in general. It asked how large $120 is next to the $1,200 he was already paying. That comparison is the entire point of a percentage: a subscription rising from $10 to $12 and car insurance rising from $1,000 to $1,200 are both 20 percent increases, with wildly different impact. Percentages describe proportion, not pain, so keep both numbers in view when you decide.",
        "Now test the reverse check, a habit worth building. Multiply the original by 1 plus the increase as a decimal. For Marcus, $1,200 x 1.10 equals $1,320, exactly his new rent. If your reverse check does not land on the new value, your increase is wrong. This habit catches most slips, including typing the new value where the original belongs.",
      ],
    },
    {
      heading: "How to calculate percentage increase step by step",
      paragraphs: [
        "If formulas blur together under pressure, use a fixed sequence of steps in the same order every time, for a pay raise, a tuition increase, or a higher electricity bill. Writing the original value down first is the part people skip, and it prevents the most common error in this topic. Carry one example through: Dana earns $16.50 an hour at a warehouse job in Ohio, and her rate rises to $18.00. The change is $1.50, and $1.50 divided by $16.50 is about 0.0909, so her raise is about 9.1 percent. That figure is far more useful than $1.50 alone when she estimates her new weekly pay for 32 hours, which moves from $528 to $576 before taxes.",
        "You can confirm Dana result and run your own numbers in the [percentage increase calculator](/calculators/percentage-increase-calculator), which follows exactly these steps and shows the change, the new value and the percentage together.",
      ],
      steps: [
        "Write down the original value first: the earlier, starting or before number.",
        "Subtract the original from the new value. The result is the increase in raw units, such as dollars or points.",
        "Divide that increase by the original value. Do not divide by the new value.",
        "Multiply the result by 100 to express it as a percent, and round sensibly, usually to one decimal place.",
        "Check your work in reverse: original x (1 + percent / 100) should equal the new value. If it does not, confirm which value was truly the original.",
      ],
    },
    {
      heading: "Salary, rent and everyday prices: worked examples from real budgets",
      paragraphs: [
        "Pay is where most adults meet this calculation first. Suppose Jordan earns a $58,000 salary in Denver and receives an offer raising it to $62,060. The increase is $4,060, and divided by $58,000 that is 0.07, a 7 percent raise. Compare a coworker who moved from $38,000 to $41,420. The dollar increase is smaller, $3,420, but the percentage is 9 percent, which is larger. Neither number alone tells the full story, which is why careful employees mention both when they negotiate.",
        "Rent shows the other side. A rise from $950 to $1,045 in a small city in Iowa is $95, a 10 percent increase. A rise from $2,100 to $2,205 in Austin is $105, only a 5 percent increase, even though the dollar amount is higher. The percentage lets you compare your rise with local averages in housing reports, which are quoted in percentages. Small prices deserve the same treatment, because small rises compound quietly: a sandwich from $8.00 to $9.20 rose 15 percent, milk from $3.60 to $3.96 rose 10 percent, and a gym membership from $35 to $45 rose about 28.6 percent, a bigger jump than the $10 wording suggests.",
      ],
      table: {
        caption: "Everyday percentage increases worked out in full",
        headers: ["Situation", "Original", "New", "Increase"],
        rows: [
          ["Monthly rent in Columbus", "$1,200", "$1,320", "10.0%"],
          ["Hourly warehouse wage", "$16.50", "$18.00", "9.1%"],
          ["Annual salary in Denver", "$58,000", "$62,060", "7.0%"],
          ["Bag of coffee beans", "$11.00", "$13.00", "18.2%"],
          ["Gym membership per month", "$35", "$45", "28.6%"],
          ["Car insurance per year", "$1,450", "$1,595", "10.0%"],
          
          
        ],
      },
    },
    {
      heading: "Percentage points versus percent, and other traps in the news",
      paragraphs: [
        "The most expensive confusion in this topic is between percentage points and percent. If a mortgage rate moves from 6 percent to 7 percent, it rose by 1 percentage point. But the rate itself increased by about 16.7 percent, because 1 divided by 6 is 0.167. Both statements are true, and they create very different impressions. Lenders and news reports choose the version that suits the story, so a careful reader translates between the two before reacting.",
        "The same trap appears with taxes and pass rates. If a state sales tax moves from 5 percent to 6 percent, your tax on a $1,000 purchase moves from $50 to $60: 1 percentage point more, and also a 20 percent increase in the tax you pay. If a school pass rate moves from 40 percent to 50 percent, that is a gain of 10 percentage points and a 25 percent improvement. Our guide to the [standard deviation calculator](/guides/standard-deviation-calculator) is a good next step if you are building that data literacy.",
        "A second trap is adding percentages that should be multiplied. If prices rise 10 percent one year and 10 percent the next, the total is not 20 percent: year one takes $100 to $110, year two takes $110 to $121, so the combined increase is 21 percent. This compounding is the same engine, working in your favor, when money grows in a savings account, as our guide to the [interest calculator](/guides/interest-calculator) explores. A third trap is the symmetric fallacy: a price that rises 50 percent from $200 to $300 and then falls 50 percent lands at $150, not $200. Recovering from a 50 percent loss requires a 100 percent gain. The base changed, and the base is everything.",
      ],
    },
    {
      heading: "Percentage increase in school, sports and small business life",
      paragraphs: [
        "Students meet percentage increase long before rent and salaries. A score improving from 64 to 80 on a test is an increase of 16 points, and as a percentage it is 16 divided by 64, which is 25 percent. A student moving from 40 to 50 improved by 25 percent too, a framing that can be genuinely motivating. For the grade level view of the same numbers, our guide to the [GPA calculator](/guides/gpa-calculator) shows how point gains feed into the GPA figures colleges read.",
        "Small businesses live on this calculation. A bakery in Portland selling 240 loaves on a Saturday last spring and 300 loaves this spring grew volume by 25 percent. A freelance designer who raised her project rate from $800 to $1,000 increased her price by 25 percent, and if two clients leave but the rest stay, she can still come out ahead. Sports give friendlier examples: a runner extending a long run from 5 miles to 6.5 miles increased distance by 30 percent, a bigger jump than most training plans recommend in one week, and a lifter moving a bench press from 150 lb to 165 lb improved by 10 percent.",
      ],
    },
    {
      heading: "Finding the new value or the original value when one number is missing",
      paragraphs: [
        "Real life often hands you the percentage and only one of the two values. Both problems use the same relationship. If you know the original value and the percentage increase, the new value is original x (1 + increase / 100). A $72,000 salary with a 4.5 percent raise becomes $72,000 x 1.045, which is $75,240. A $19 streaming bundle rising by 25 percent becomes $19 x 1.25, which is $23.75.",
        "If you know the new value and the percentage increase, work backwards by dividing: Original = New / (1 + increase / 100). A used car listed at $18,900 after a 5 percent rise was originally $18,900 divided by 1.05, which is $18,000 exactly. A tuition bill of $31,500 after an 8 percent increase was about $29,167 last year. Watch for one error: people often subtract the percentage from the new value, taking 5 percent off $18,900 to get $17,955, and call that the original. It is not, because 5 percent of the new value is larger than 5 percent of the original. Percentage decrease uses the mirror image of the same logic, so one method covers raises, discounts and depreciation.",
      ],
      subsections: [
        {
          heading: "Quick mental estimates when you have no calculator",
          paragraphs: [
            "Anchor on 10 percent: just move the decimal one place. Ten percent of $86 is $8.60, so a 20 percent rise is about $17.20 and a 5 percent rise is half of that, about $4.30. Build any nearby percentage from those blocks and you will land within a dollar or two of the exact answer.",
          ],
          bullets: [
            "10 percent: move the decimal one place left, so 10 percent of 240 is 24.",
            "5 percent: half of the 10 percent figure, so 5 percent of 240 is 12.",
            "25 percent: a quarter of the original, so a 25 percent rise on $60 adds $15.",
            "50 percent: half of the original, so a 50 percent rise on $60 adds $30.",
          ],
        },
      ],
    },
    {
      heading: "Common mistakes and how to avoid them every time",
      paragraphs: [
        "Mistake one is dividing by the new value. A price rising from $40 to $50 grew by $10. Divided by the original $40, that is a correct 25 percent increase. Divided by the new $50, it gives 20 percent, which understates the rise. The divisor is always where you started, for increases and decreases alike.",
        "Mistake two is confusing a percent increase with the percent of the original that the new value represents. When a $40 item becomes $50, the new price is 125 percent of the original, and the increase is 25 percent. The two sentences differ by exactly 100 percent, the original itself. Sales material exploits this gap, advertising a plan as 200 percent of the old speed when the increase is 100 percent.",
        "Mistake three is sloppy rounding. Reporting a raise as 7.3841 percent adds no accuracy when the salary figures were rounded to dollars, but rounding a 9.6 percent rent rise down to 9 percent hides real money across a year. Use one decimal place for everyday figures. And never average percentage increases to get a combined figure, because each had a different base: add the underlying values first, then calculate one increase from the totals.",
        "The simplest protection is a two line layout: original, new, change, then change divided by original. Keep that layout on paper or in the [percentage increase calculator](/calculators/percentage-increase-calculator), paired with the reverse check. More explainers live in our [guides](/guides) library.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I calculate a 20 percent increase on a number?",
      a: "Multiply the number by 1.20. For example, 20 percent on $150 is $150 x 1.20, which is $180, an increase of $30. In general, for any percent increase, multiply the original by 1 plus the percentage divided by 100.",
    },
    {
      q: "What is the percentage increase from 50 to 75?",
      a: "The increase is 25, and 25 divided by the original 50 is 0.5, so the answer is a 50 percent increase. Note the reverse trip is different: falling from 75 back to 50 is a decrease of 33.3 percent, because the starting base is larger.",
    },
    {
      q: "Why do I divide by the original value and not the new value?",
      a: "Because a percentage increase measures growth relative to where you started. Dividing by the original answers the question, how big is this change compared with what I had? Dividing by the new value answers a different question and understates every increase, which is why it is the most common error in this calculation.",
    },
    {
      q: "What does a 100 percent increase actually mean?",
      a: "It means the value grew by an amount equal to itself, so it doubled. A salary of $40,000 with a 100 percent increase becomes $80,000. A 200 percent increase means the value grew by two copies of itself and tripled, so $40,000 would become $120,000.",
    },
    {
      q: "Is a rise from 4 percent to 5 percent a 1 percent increase?",
      a: "No. It is a rise of 1 percentage point, but the rate itself increased by 25 percent, because 1 divided by 4 is 0.25. Keeping percentage points and percent separate is essential when you read about interest rates, tax rates, exam pass rates and unemployment figures.",
    },
    {
      q: "How do I find the original price if I only know the new price and the increase?",
      a: "Divide the new price by 1 plus the increase as a decimal. If a jacket now costs $96 after a 20 percent increase, the original was $96 divided by 1.20, which is $80. Do not subtract 20 percent from $96, because that percentage would be taken from the wrong base.",
    },
  ],
  relatedSlugs: ["gpa-calculator", "interest-calculator", "standard-deviation-calculator"],
};
