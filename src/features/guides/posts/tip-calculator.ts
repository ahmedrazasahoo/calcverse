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
        "Every tip calculation, whether you do it on paper or in a tool, comes down to three numbers. First, the tip itself: you multiply the bill amount by the tip percentage written as a decimal. A 20 percent tip on a $64 bill is 64 times 0.20, which is $12.80. Second, the total: you add the tip back to the bill, so $64 plus $12.80 is $76.80. Third, if you are splitting, the per person share: you divide that total by the number of people. Split four ways, $76.80 becomes $19.20 each. That is the whole engine, and every extra feature in a calculator is just a convenience built on those three steps.",
        "The one choice that changes the result before any math starts is which bill amount you use as the base. In most US states the check shows a subtotal, then tax, then a total. The long standing custom is to tip on the subtotal, the cost of the food and drinks before tax, because tax goes to the state, not to the restaurant or its staff. Some printed receipts suggest tips calculated on the taxed total, which inflates each suggested amount a little. Neither choice will ruin anyones evening, but on a large group check the difference is real money, and later in this guide you will see it worked out to the dollar.",
        "Percentages trip people up because they feel abstract at the table. A practical anchor helps: 10 percent is easy, just move the decimal point one place left. On an $86 bill, 10 percent is $8.60. Double it for 20 percent, $17.20. Halve the 10 percent figure for 5 percent, $4.30, and add it to the 10 percent figure for 15 percent, $12.90. With that one trick you can sanity check any calculator result in your head, and you will never again stare at a check wondering whether $9 is generous or stingy on a $60 meal. It is 15 percent, for the record.",
      ],
    },
    {
      heading: "Standard tip percentages in the United States",
      paragraphs: [
        "Tipping norms in the US have drifted upward over the past decade, and the screen prompts on card readers have pushed them further by suggesting amounts in situations where no tip was once expected. For sit down restaurant service, the working range most etiquette guides and servers agree on is 15 to 20 percent, with 20 percent now the default for solid, attentive service and 25 percent for an exceptional night or a very small check where percentages understate the effort. Fifteen percent is best read as the floor for adequate service, not the reward for a great one. If service was genuinely poor, a calm word with a manager does more good than silently leaving nothing, since tips are often pooled with bussers and bar staff.",
        "Outside full service restaurants the norms change by setting, and this is where people most often overtip out of guilt or undertip out of habit. At a bar, a dollar to two dollars per drink covers most orders, or 15 to 20 percent of the tab if you run one. For food delivery, 15 to 20 percent of the order with a sensible minimum of about $5 is fair, especially in bad weather or on a long drive, and note that a delivery fee charged by an app is not the same as a tip to the driver. For takeout you picked up yourself, tipping is optional and 10 percent or a few dollars is a kind gesture for a large or complicated order. Rides, haircuts and hotel housekeeping each carry their own small customs, listed in the table below.",
        "Context matters as much as the percentage. A $4 tip on a $16 diner breakfast where your coffee was refilled five times shows better judgment than a strict percentage suggests, because the server did a full job for a small check. A large party also deserves extra care: many restaurants add an automatic gratuity of 18 to 20 percent for groups of six or more, so check the bill before adding a second tip on top. Double tipping a group check by accident is one of the most expensive mistakes in this whole topic, and the worked example further down shows how to spot it.",
      ],
      table: {
        caption: "Common US tipping ranges by service",
        headers: ["Service", "Typical tip", "Notes"],
        rows: [
          ["Sit down restaurant", "15 to 20 percent", "20 percent for good service, on the pre-tax subtotal"],
          ["Bar", "$1 to $2 per drink or 15 to 20 percent", "Higher for complex cocktails or a long tab"],
          ["Food delivery", "15 to 20 percent, about $5 minimum", "Delivery fees are not tips, add more in bad weather"],
          ["Takeout pickup", "0 to 10 percent", "A few dollars for large or complicated orders"],
          ["Coffee shop", "$0.50 to $1 or loose change", "Optional, more for table service or complex drinks"],
          ["Haircut or salon", "15 to 20 percent", "Small extra amounts for assistants who shampoo"],
          ["Rideshare or taxi", "15 to 20 percent", "Add for help with luggage or extra stops"],
          ["Hotel housekeeping", "$2 to $5 per night", "Leave daily, since staff change during a stay"],
        ],
      },
    },
    {
      heading: "A worked example, step by step",
      paragraphs: [
        "Take a concrete check and run it the way the calculator does. Four friends, Sofia, Ben, Carla and Tom, finish dinner with a food and drink subtotal of $86.00. Their city adds 8.25 percent sales tax, which comes to $7.10, so the check total before tip is $93.10. Service was good, the server kept drinks full and split the check without complaint, so the group chooses 20 percent. The key decision comes first: they tip on the $86.00 subtotal, not the $93.10 taxed total. Twenty percent of $86.00 is $17.20. Had they tipped on the taxed total, the tip would have been $18.62, a difference of $1.42. Small here, noticeable on a $300 group check.",
        "Now build the total and split it. The full amount to pay is the taxed check plus the tip: $93.10 plus $17.20 equals $110.30. Divided evenly by four, that is $27.575 each, which in real money rounds to $27.58, or simply $28 each with the extra going to the server. Notice the split uses the full total including tax and tip, even though the tip was calculated on the subtotal. Mixing those two bases up is the most common split error: people divide only the food cost and then forget that tax and tip still have to be paid by someone, usually whoever was slowest to put their card away.",
        "Run the same check at other percentages to feel the range. At 15 percent the tip is $12.90, the total is $106.00, and each person pays $26.50. At 18 percent the tip is $15.48, the total is $108.58, and each pays about $27.15. At 25 percent for a truly great night, the tip is $21.50, the total is $114.60, and each pays $28.65. The gap between a 15 percent night and a 25 percent night, split four ways, is about $2.15 per person. Seen that way, tipping generously in a group costs each diner very little, which is worth remembering before a long debate over a dollar.",
      ],
      steps: [
        "Read the subtotal on the check, the amount before tax, and check whether an automatic gratuity has already been added.",
        "Choose your percentage based on the service and the setting: 20 percent is a sound default for good table service.",
        "Multiply the subtotal by the percentage as a decimal to get the tip, for example 86 times 0.20 equals 17.20.",
        "Add tax and tip to the subtotal to get the full total to pay.",
        "Divide the full total by the number of people for an even split, then round each share up slightly if paying cash.",
        "If meals differed a lot in price, split by subtotal instead: each person pays their own subtotal plus the same percentage for tax and tip.",
      ],
    },
    {
      heading: "Splitting the bill fairly when orders differ",
      paragraphs: [
        "An even split is perfect when everyone ordered in the same ballpark, shared plates went around the table, and nobody wants to audit a friendship over $3. It falls apart when the table splits into clear camps. Picture six coworkers where four ordered $14 sandwiches and water, and two ordered $38 steaks and $15 cocktails. The subtotal is about $162, and with tax and a 20 percent tip the total lands near $207. An even split charges everyone about $34.50. The sandwich group has paid nearly double the cost of their own meals, and they will remember it at the next lunch invitation, even if nobody says a word.",
        "The fair fix is proportional splitting, and it is easier than it sounds. Each person takes their own subtotal and multiplies it by the same combined factor that covers tax and tip. In the example above, tax at 8.25 percent plus a 20 percent tip on the subtotal means each dollar of food becomes about $1.28 owed. A $14 sandwich order pays about $17.95, while a $68 steak and cocktails order pays about $87.20. The [tip calculator](/calculators/tip-calculator) gives you the totals to build that factor, and most payment apps let people send exact amounts in seconds. Agreeing the method before ordering, one sentence at the start of the meal, prevents the entire end of meal negotiation.",
        "Shared items need a simple rule too. Split shared appetizers, pitchers and desserts evenly among the people who actually shared them, not automatically across the whole table, since the person who skipped the wine should not fund it. Large groups do best with one organizer who pays the full check and collects shares afterward, rather than asking a server to run seven cards with seven different tip amounts. Servers can usually split a check by seat when asked early, before ordering, and asking early is a kindness in itself. A quick note for anyone organizing work meals often: the same discipline of tracking hours and shares shows up in our guide to the [hours calculator](/guides/hours-calculator), which covers adding up time for a group schedule or a shared project.",
      ],
    },
    {
      heading: "Tips, wages and the questions workers ask most",
      paragraphs: [
        "Many diners wonder why tipping carries so much weight in the US, and the honest answer sits in how hospitality pay is structured. Under federal law, employers of tipped workers can pay a lower direct cash wage, as low as $2.13 an hour, as long as tips bring the worker up to at least the federal minimum wage of $7.25 an hour, with the employer required to make up any shortfall. Several states set higher standards, and some require the full state minimum wage before tips, so the picture varies a lot by location. Either way, for most servers and bartenders, tips are not a bonus on top of a full wage. They are the larger part of the wage itself, which is why a stiffed table stings more than a missing compliment.",
        "That structure also explains why workers track their hours and tips so carefully. A server closing out a week of mixed lunch and dinner shifts needs clean records of hours worked, tips received and any overtime, both for their own budget and because tip income is taxable income that must be reported. If that is your world, our guide to the [overtime calculator](/guides/overtime-calculator) explains how pay beyond 40 hours in a week is calculated, and it is worth reading alongside your employers tip pooling rules. Tip pools, where tips are shared with bussers, runners and bar staff, are legal under specific conditions, and a fair pool is one reason a generous tip at the table reaches more than one person.",
        "For customers, none of this requires a law degree at dinner. It just reframes the tip from an optional extra to part of the price of the service you received, at least under the system as it stands today. If you prefer not to think in percentages at all, build the tip into your mental price when you order: a $20 entree in a full service restaurant really costs about $24 to $25 once tax and a fair tip are included. Ordering with the true total in mind removes the end of meal surprise, and it keeps the tip decision from feeling like a separate purchase you can talk yourself out of.",
      ],
    },
    {
      heading: "Percent prompts, screen tips and other modern traps",
      paragraphs: [
        "Card readers and payment screens have changed tipping in two ways. First, they present preset percentages, often 18, 20 and 25 percent, which anchor people higher than the old 15 percent habit. That is not automatically bad, since 20 percent is a reasonable default for table service anyway. Second, they now ask in places where tipping was never customary, such as a counter where you ordered, paid and carried your own food to a table. In those settings a small tip for friendly counter help is welcome, but the full restaurant percentage is not expected, and pressing the no tip option for a pure self service transaction is not rude, whatever the screens design makes you feel in the moment.",
        "Watch the base those presets use. Some systems calculate suggested percentages on the taxed total, and a few include extra fees in the base as well. On a $50 subtotal with $4.25 tax, a screen labeled 20 percent might show $10.85 instead of $10.00. It is a small overage, but knowing how it happens lets you choose the custom amount when you want to tip on the subtotal. The same awareness helps when a service charge appears on the bill. A disclosed service charge is not always a tip and may not go to your server in full, so it is fair to ask, politely, how it is handled before deciding whether to add more.",
        "Comparing percentages quickly is a useful life skill beyond restaurants too. If a favorite lunch spot raises its preset suggestion from 18 to 22 percent, that is a 4 percentage point change, but a bigger relative jump in what you actually pay. Our guide to the [percentage increase calculator](/guides/percentage-increase-calculator) explains the difference between percentage points and percent change with the kind of examples that stop that confusion for good. Browse the rest of our [guides](/guides) for the same plain approach to everyday money and time questions.",
      ],
      bullets: [
        "Preset screen percentages are suggestions, not rules. Custom amounts are always an option.",
        "Check whether presets are calculated on the pre-tax subtotal or the taxed total before tapping.",
        "Counter service and self service carry smaller or optional tips, usually a dollar or two, not a full restaurant percentage.",
        "A service charge is not automatically a tip. Ask how it is shared if you are unsure whether to add more.",
        "Automatic gratuity on large parties replaces the tip you would add. Check the bill so you do not pay it twice.",
      ],
    },
    {
      heading: "Cash, rounding and small habits that work every time",
      paragraphs: [
        "Cash tipping rewards a rounding habit. When each share comes to $27.58, paying $28 is simpler for everyone and the extra 42 cents lands with the server rather than vanishing into coin juggling. The same goes for a solo check: a $13.40 tip on a $67 bill becomes $14 without any real cost to you, and round totals are easier to record later if you track spending or need the receipt for work expenses. Some diners like to leave the tip in cash even when paying the bill by card, in the belief that cash reaches the server faster and in full. Practices vary by house, so treat that as a preference, not a rule, and never let it become a reason to tip less when you have no cash on you.",
        "A few last situations deserve a clear answer. Bad weather delivery deserves more, not less: rain, snow and a long drive are exactly when the service is worth most to you, so pushing toward 20 to 25 percent is fair. A genuinely bad meal is a kitchen issue, and punishing the server for it misses the target; raise it with a manager, who can fix the dish or the bill, while tipping on the service you actually received. A comped item, such as a free dessert for a birthday or a dish removed after a mistake, should still count in your tip base. Tip as if you had paid for it, since the server did the same work. These small calls, made consistently, are what make someone good to serve and welcome back.",
        "That is the whole subject, really. Choose a fair percentage for the setting, apply it to the pre-tax subtotal, add tax, split the full total in a way the table agreed on, and round in the servers favor. When the mental math feels shaky or the group gets large, run the numbers once through the [tip calculator](/calculators/tip-calculator) and show the screen to the table. A clear number ends arguments faster than three competing estimates, and everyone gets back to enjoying the evening instead of auditing it.",
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
