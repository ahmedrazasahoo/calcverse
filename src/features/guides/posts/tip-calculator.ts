import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "tip-calculator",
  keyword: "tip calculator",
  title: "Tip Calculator: How Much to Tip, and How to Split the Bill Fairly",
  metaTitle: "Tip Calculator Guide: How Much to Tip and Split Fairly",
  metaDescription: "Learn how to use a tip calculator, standard tip percentages in the US, how to split bills fairly, and how to tip on the pre-tax total with clear examples.",
  excerpt: "Standard tip percentages, pre-tax versus post-tax tipping, and fair bill splitting explained with real checks, real groups and no awkward math at the table.",
  category: "Everyday",
  toolSlug: "tip-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "The check lands, the table goes quiet, and suddenly everyone is doing percentages in their head while the server waits. One person suggests 15 percent, another says 20, a third has already added tax into the base by mistake, and nobody can agree on what each person owes for the shared appetizers. This little moment of math stress is exactly why a tip calculator exists, and why knowing the few rules behind it makes dining out, ordering delivery and splitting a group bill much calmer.",
    "You can settle most checks in under ten seconds with the free [tip calculator](/calculators/tip-calculator). Enter the bill, pick a percentage, add the number of people, and you get the tip, the total and the per person share without any mental gymnastics. The tool handles the arithmetic. What it cannot choose for you is the right percentage for the situation, whether to tip on the amount before tax, or how to handle a bill where one person ordered a salad and another ordered a steak and two cocktails.",
    "This guide covers those judgment calls with real numbers. You will see the standard tipping ranges in the United States for restaurants, bars, delivery and other services, a step by step worked example on an $86 check, and the fairest ways to split a bill evenly or by what each person ordered. You will also see the mistakes that quietly shortchange servers or overcharge your friends, and a simple rounding habit that makes cash payments painless.",
  ],
  keyPoints: [
    "Standard restaurant tipping in the US is 15 to 20 percent of the pre-tax bill, with 20 percent now the common choice for good table service.",
    "Tip equals bill times tip percentage. Total equals bill plus tip. Per person share equals total divided by the number of people splitting.",
    "Tip on the pre-tax subtotal when you can see it. Tipping on the taxed total quietly adds roughly 1 to 2 extra percentage points.",
    "For an even split, divide the full total including tip. For an uneven meal, split by each persons subtotal plus their share of tax and tip.",
    "Round up rather than down. On a small check the difference is cents for you and a fairer result for the person who served you.",
    "Bars, delivery and takeout have different norms: a dollar or two per drink, 15 to 20 percent for delivery, and 10 percent or a few dollars for takeout.",
  ],
  sections: [
    {
      heading: "How a tip calculator works: the three numbers that matter",
      paragraphs: [
        "Every tip calculation comes down to three numbers. First, the tip itself: multiply the bill by the tip percentage as a decimal. A 20 percent tip on a $64 bill is 64 times 0.20, which is $12.80. Second, the total: add the tip back to the bill, so $64 plus $12.80 is $76.80. Third, if you are splitting, the per person share: divide that total by the number of people. Split four ways, $76.80 becomes $19.20 each.",
        "The one choice that changes the result before any math starts is which bill amount you use as the base. The check shows a subtotal, then tax, then a total. The long standing custom is to tip on the subtotal, before tax, because tax goes to the state, not to the restaurant or its staff. Some receipts suggest tips calculated on the taxed total, which inflates each amount a little. Percentages feel less abstract with one anchor trick: 10 percent is just the decimal point moved one place left. On an $86 bill, 10 percent is $8.60. Double it for 20 percent, $17.20. Add half of it for 15 percent, $12.90. With that trick you can sanity check any result in your head.",
      ],
    },
    {
      heading: "Standard tip percentages in the United States",
      paragraphs: [
        "Tipping norms in the US have drifted upward over the past decade, and card reader prompts have pushed them further. For sit down restaurant service, the working range is 15 to 20 percent, with 20 percent now the default for solid service and 25 percent for an exceptional night or a very small check. Fifteen percent is the floor for adequate service. If service was genuinely poor, a calm word with a manager does more good than silently leaving nothing, since tips are often pooled with bussers and bar staff.",
        "Outside full service restaurants the norms change by setting. At a bar, a dollar to two dollars per drink covers most orders, or 15 to 20 percent of the tab. For food delivery, 15 to 20 percent with a minimum of about $5 is fair, especially in bad weather, and an app delivery fee is not a tip to the driver. For takeout you picked up yourself, tipping is optional and 10 percent or a few dollars suits a large order. Context matters too: many restaurants add an automatic gratuity of 18 to 20 percent for groups of six or more, so check the bill before adding a second tip.",
      ],
      table: {
        caption: "Common US tipping ranges by service",
        headers: ["Service", "Typical tip", "Notes"],
        rows: [
          ["Sit down restaurant", "15 to 20 percent", "20 percent for good service, pre-tax"],
          ["Bar", "$1 to $2 per drink or 15 to 20 percent", "Higher for complex cocktails"],
          ["Food delivery", "15 to 20 percent, about $5 minimum", "Fees are not tips, add more in bad weather"],
          ["Takeout pickup", "0 to 10 percent", "A few dollars for large orders"],
          ["Coffee shop", "$0.50 to $1 or loose change", "Optional, more for complex drinks"],
          ["Haircut or salon", "15 to 20 percent", "Small extras for assistants"],
          ["Rideshare or taxi", "15 to 20 percent", "Add for luggage help"],
          ["Hotel housekeeping", "$2 to $5 per night", "Leave daily"],
        ],
      },
    },
    {
      heading: "A worked example, step by step",
      paragraphs: [
        "Take a concrete check. Four friends, Sofia, Ben, Carla and Tom, finish dinner with a subtotal of $86.00. Their city adds 8.25 percent sales tax, which comes to $7.10, so the check total before tip is $93.10. Service was good, so the group chooses 20 percent, and the key decision comes first: they tip on the $86.00 subtotal, not the $93.10 taxed total. Twenty percent of $86.00 is $17.20. Had they tipped on the taxed total, the tip would have been $18.62, a difference of $1.42. Small here, noticeable on a $300 group check.",
        "Now build the total and split it. The full amount to pay is $93.10 plus $17.20, which equals $110.30. Divided evenly by four, that is $27.58 each, or simply $28 each with the extra going to the server. The split uses the full total including tax and tip, even though the tip was calculated on the subtotal. Mixing those two bases up is the most common split error. At other percentages: at 15 percent the tip is $12.90 and each person pays $26.50, while at 25 percent the tip is $21.50 and each pays $28.65. The gap between a 15 percent night and a 25 percent night, split four ways, is about $2.15 per person.",
      ],
      steps: [
        "Read the subtotal before tax, and check whether an automatic gratuity has already been added.",
        "Choose your percentage: 20 percent is a sound default for good table service.",
        "Multiply the subtotal by the percentage as a decimal to get the tip, for example 86 times 0.20 equals 17.20.",
        "Add tax and tip to the subtotal for the full total.",
        "Divide the full total by the number of people for an even split, then round up slightly if paying cash.",
        "If meals differed a lot in price, split by subtotal: each person pays their own subtotal plus the same percentage for tax and tip.",
      ],
    },
    {
      heading: "Splitting the bill fairly when orders differ",
      paragraphs: [
        "An even split is perfect when everyone ordered in the same ballpark. It falls apart when the table splits into clear camps. Picture six coworkers where four ordered $14 sandwiches and water, and two ordered $38 steaks and $15 cocktails. The subtotal is about $162, and with tax and a 20 percent tip the total lands near $207. An even split charges everyone about $34.50. The sandwich group has paid nearly double the cost of their own meals, and they will remember it at the next lunch.",
        "The fair fix is proportional splitting. Each person multiplies their own subtotal by the same combined factor that covers tax and tip. In the example above, tax at 8.25 percent plus a 20 percent tip means each dollar of food becomes about $1.28 owed. A $14 sandwich order pays about $17.95, while a $68 steak and cocktails order pays about $87.20. The [tip calculator](/calculators/tip-calculator) gives you the totals to build that factor. Agreeing the method before ordering prevents the end of meal negotiation. Split shared items evenly among the people who actually shared them, and have one organizer pay the full check and collect shares afterward. The same discipline shows up in our guide to the [hours calculator](/guides/hours-calculator), which covers adding up time for a group schedule.",
      ],
    },
    {
      heading: "Tips, wages and the questions workers ask most",
      paragraphs: [
        "Many diners wonder why tipping carries so much weight in the US, and the answer sits in how hospitality pay is structured. Under federal law, employers of tipped workers can pay a lower direct cash wage, as low as $2.13 an hour, as long as tips bring the worker up to at least the federal minimum wage of $7.25 an hour, with the employer required to make up any shortfall. Several states set higher standards. Either way, for most servers and bartenders, tips are not a bonus on top of a full wage. They are the larger part of the wage itself.",
        "That structure explains why workers track their hours and tips carefully, since tip income is taxable. If that is your world, our guide to the [overtime calculator](/guides/overtime-calculator) explains how pay beyond 40 hours in a week is calculated, alongside your employer tip pooling rules. Tip pools, where tips are shared with bussers, runners and bar staff, are legal under specific conditions. For customers, this reframes the tip as part of the price of the service: a $20 entree really costs about $24 to $25 once tax and a fair tip are included.",
      ],
    },
    {
      heading: "Percent prompts, screen tips and other modern traps",
      paragraphs: [
        "Card readers have changed tipping in two ways. First, they present preset percentages, often 18, 20 and 25 percent, which anchor people higher than the old 15 percent habit. That is not automatically bad, since 20 percent is a reasonable default for table service. Second, they now ask in places where tipping was never customary, such as a counter where you ordered, paid and carried your own food. There a small tip is welcome, but the full restaurant percentage is not expected, and pressing no tip for a pure self service transaction is not rude.",
        "Watch the base those presets use. Some systems calculate suggested percentages on the taxed total, and a few include extra fees as well. On a $50 subtotal with $4.25 tax, a screen labeled 20 percent might show $10.85 instead of $10.00. Knowing how it happens lets you choose the custom amount when you want to tip on the subtotal. A disclosed service charge is not always a tip, so it is fair to ask how it is handled before adding more. Comparing percentages is a useful skill beyond restaurants too: a preset rising from 18 to 22 percent is a 4 percentage point change, but a bigger relative jump in what you pay. Our guide to the [percentage increase calculator](/guides/percentage-increase-calculator) explains that difference for good. Browse the rest of our [guides](/guides) for the same plain approach.",
      ],
      bullets: [
        "Preset screen percentages are suggestions, not rules. Custom amounts are always available.",
        "Check whether presets use the pre-tax subtotal or the taxed total.",
        "Counter service carries smaller or optional tips, usually a dollar or two.",
        "A service charge is not automatically a tip. Ask how it is shared.",
        "Automatic gratuity on large parties replaces your tip. Check the bill so you do not pay it twice.",
      ],
    },
    {
      heading: "Cash, rounding and small habits that work every time",
      paragraphs: [
        "Cash tipping rewards a rounding habit. When each share comes to $27.58, paying $28 is simpler for everyone and the extra 42 cents lands with the server. The same goes for a solo check: a $13.40 tip on a $67 bill becomes $14 without any real cost to you. Some diners leave the tip in cash even when paying by card, in the belief that cash reaches the server faster. Practices vary by house, so treat that as a preference, not a rule, and never let it become a reason to tip less when you have no cash.",
        "A few last situations deserve a clear answer. Bad weather delivery deserves more, not less: rain, snow and a long drive are exactly when the service is worth most, so pushing toward 20 to 25 percent is fair. A genuinely bad meal is a kitchen issue; raise it with a manager while tipping on the service you actually received. A comped item, such as a free birthday dessert, should still count in your tip base, since the server did the same work. That is the whole subject: choose a fair percentage, apply it to the pre-tax subtotal, add tax, split the full total, and round in the server favor. When the mental math feels shaky, run the numbers once through the [tip calculator](/calculators/tip-calculator) and show the screen to the table.",
      ],
    },
  ],
  faqs: [
    {
      q: "Should I tip on the total before or after tax?",
      a: "The standard custom in the US is to tip on the pre-tax subtotal, because tax goes to the state and not to the restaurant or server. Tipping on the taxed total is not wrong, it just adds roughly 1 to 2 percentage points to your effective tip. On large checks the difference becomes noticeable, so it is worth checking which base you are using.",
    },
    {
      q: "How much should I tip for good service at a restaurant?",
      a: "Twenty percent of the pre-tax bill is the current common standard for good sit down service in the US, with 15 percent as a floor for adequate service and 25 percent for something exceptional. On a very small check, consider tipping as if the check were larger, since the servers work was the same regardless of what you ordered.",
    },
    {
      q: "How do I split a tip when everyone ordered different amounts?",
      a: "Use a proportional split. Work out the combined factor for tax plus tip, for example each dollar of food becomes about $1.28 owed with 8.25 percent tax and a 20 percent tip. Each person multiplies their own subtotal by that factor. Shared dishes are split evenly, but only among the people who shared them.",
    },
    {
      q: "Do I need to tip if an automatic gratuity is already on the bill?",
      a: "No. An automatic gratuity, common at 18 to 20 percent for parties of six or more, is the tip. Adding a standard tip on top means paying it twice. You may add a small extra amount for outstanding service if you wish, but check the bill first, because double tipping a large group check is expensive.",
    },
    {
      q: "How much should I tip for delivery and takeout?",
      a: "For delivery, 15 to 20 percent of the order with a minimum of about $5 is fair, and more makes sense for bad weather, long distances or large orders. Remember that an apps delivery fee is not a driver tip. For takeout you pick up yourself, tipping is optional, and a few dollars or up to 10 percent suits a large or complicated order.",
    },
    {
      q: "Is it better to tip in cash or by card?",
      a: "Both are accepted, and card tips are recorded automatically, which helps workers who need documented income. Some servers prefer cash because they may receive it sooner, but house practices vary. The amount matters far more than the method, so tip the full amount by card rather than a smaller amount in cash.",
    },
  ],
  relatedSlugs: ["hours-calculator", "overtime-calculator", "percentage-increase-calculator"],
};
