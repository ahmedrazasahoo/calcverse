import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "time-card-calculator",
  keyword: "time card calculator / time duration calculator",
  title: "Time Card Calculator: How to Build an Accurate Week of Hours, Breaks and Rounding",
  metaTitle: "Time Card Calculator Guide: Weekly Hours and Pay Tips",
  metaDescription: "Learn how a time card calculator adds clock in and out times, unpaid breaks, rounding and weekly totals, with a full worked week and pay period tips for staff.",
  excerpt: "How weekly time cards actually work, from clock in times and unpaid breaks to rounding rules, pay periods and the small errors that quietly change a paycheck.",
  category: "Everyday",
  toolSlug: "hours-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "A time card looks simple until Friday arrives and the numbers refuse to agree. Someone clocked in at 8:47, took a 38 minute lunch on Tuesday, left early on Thursday, and now the weekly total is either 38 hours or 41 hours depending on who added it up. That gap is not just annoying. It decides overtime, it decides pay, and in many workplaces it is the number an employee will question first when a paycheck feels light.",
    "A time card calculator removes the mental arithmetic from that process. You enter each start time, end time and break, and the tool converts the day into hours and minutes and then into decimal hours for payroll. If you want to try it as you read, open the free [hours calculator](/calculators/hours-calculator) and follow along with your own last week. The same tool doubles as a time duration calculator for a single shift, but this guide is about the full week: five or six days, mixed breaks, rounding rules and a total your employer and you can both check.",
    "This guide walks through a complete worked week for a fictional employee, explains the rounding rules many US employers use, and shows where time cards usually go wrong. It also covers pay periods, because a weekly total means something slightly different on a weekly, biweekly and semimonthly payroll. By the end you will be able to rebuild any week from raw clock times and spot an error in under a minute.",
  ],
  keyPoints: [
    "Add each day separately first: end time minus start time, minus unpaid breaks, then add the days together.",
    "Payroll runs on decimal hours, so 7 hours 45 minutes becomes 7.75 hours, not 7.45 hours.",
    "Many employers round clock times to the nearest 5, 6 or 15 minutes, and the rule must be applied the same way every day.",
    "Overtime in the US is usually judged per workweek, so the weekly total matters more than any single long day in most states.",
    "Keep your own copy of clock times. A personal record is the fastest way to resolve a pay query calmly.",
  ],
  sections: [
    {
      heading: "What a time card actually records",
      paragraphs: [
        "A time card, whether it is a paper card, a spreadsheet or an app, records four things for each shift: the time work started, the time work ended, any unpaid break in between, and the total paid time that results. Some cards also record a second pair of times for split shifts, common in restaurants and retail where a person works lunch service, leaves for two hours, then returns for dinner. Each block is calculated on its own and the blocks are added, so a split day is really two small time cards wearing one date.",
        "The distinction that causes the most confusion is paid time versus elapsed time. If Maria clocks in at 9:00 AM and out at 5:30 PM, the elapsed time is 8 hours 30 minutes. If her 30 minute lunch is unpaid, her paid time is 8 hours exactly. New employees often write 8.5 on the card and feel cheated when payroll pays 8.0, while payroll staff see the same card and wonder why the break was never deducted. A good time card layout separates the columns clearly: in, out, break minutes, paid total. If your workplace card merges break and total into one box, do the subtraction yourself in pencil before you hand it in.",
        "Time cards also carry a workweek definition, and it is not always Monday to Sunday. Under US federal rules an employer picks a fixed 168 hour workweek, which might run Sunday to Saturday or Wednesday to Tuesday, and that window decides which hours count toward the 40 hour overtime threshold. Your card may look like a calendar week while payroll quietly groups the days differently. If your shifts sit near the boundary, ask which day your workweek starts on. That one answer explains most cases where a Saturday shift seems to vanish into the wrong week.",
      ],
    },
    {
      heading: "How to calculate one day, step by step",
      paragraphs: [
        "Every weekly total is built from single days, so get the daily method right and the week takes care of itself. The reliable sequence is: convert both clock times to a 24 hour clock, subtract the start from the end, subtract unpaid breaks, then write the result as hours and minutes before converting to decimals for payroll. Doing the subtraction in 24 hour time avoids the classic AM and PM mistakes, especially for shifts that cross noon or midnight.",
        "Take Daniel on a Tuesday. He clocks in at 8:12 AM, out at 12:05 PM for lunch, back at 12:35 PM, and out at 4:48 PM. Morning block: 12:05 minus 8:12 is 3 hours 53 minutes. Afternoon block: 4:48 PM is 16:48, minus 12:35 gives 4 hours 13 minutes. Add the blocks: 3 hours 53 minutes plus 4 hours 13 minutes is 8 hours 6 minutes paid. As a decimal that is 8 plus 6 divided by 60, which is 8.10 hours. Notice the lunch was handled by splitting the day, not by subtracting 30 minutes at the end, which gives the same answer here but stays cleaner when breaks vary.",
      ],
      steps: [
        "Write the clock in and clock out times exactly as recorded, including odd minutes like 8:12.",
        "Convert PM times to 24 hour time by adding 12, so 4:48 PM becomes 16:48.",
        "Subtract start from end for each block of work, borrowing 60 minutes when the minutes column goes negative.",
        "Subtract any unpaid break that sits inside a block, or split the day at the break if you clocked out for it.",
        "Add the blocks to get the daily total in hours and minutes, then divide the minutes by 60 for the decimal version.",
        "Repeat for every day, then add the daily totals for the week and compare against 40 hours for overtime.",
      ],
    },
    {
      heading: "A full worked week, with breaks and an early finish",
      paragraphs: [
        "Here is a complete week for Priya, who works at a dental office front desk at $19 per hour. Monday she works 8:00 AM to 4:30 PM with a 30 minute unpaid lunch, so 8 hours paid. Tuesday is 8:05 AM to 4:35 PM with the same lunch, also 8 hours paid once you subtract the break, because the five late minutes at the start and end cancel out. Wednesday includes a longer 45 minute lunch for an appointment: 8:00 AM to 5:00 PM is 9 elapsed hours, minus 45 minutes gives 8 hours 15 minutes, or 8.25 decimal. Thursday she leaves early for a school event, 8:00 AM to 2:30 PM with 30 minutes for lunch, which is 6 hours paid. Friday is a full 8:00 AM to 4:30 PM with 30 minutes unpaid, another 8 hours.",
        "Now add the week: 8 plus 8 plus 8.25 plus 6 plus 8 equals 38.25 hours. At $19 per hour, gross pay for the week before tax is 38.25 times 19, which is $726.75. No overtime applies because the total sits under 40, even though Wednesday felt long. That last point surprises people in states that follow the federal rule: a nine hour day does not trigger overtime by itself in most states, though a few states, including California, do have daily overtime rules, so check your state if long single days are routine for you.",
        "Try rebuilding this week in the [hours calculator](/calculators/hours-calculator) day by day and you will see how quickly the decimal totals appear once the breaks are entered honestly. Then compare the result with the related [hours calculator guide](/guides/hours-calculator), which looks at the same maths from the single shift angle and explains duration calculations in more depth.",
      ],
      table: {
        caption: "Priya's week: elapsed time, unpaid breaks and paid hours by day",
        headers: ["Day", "In and out", "Unpaid break", "Paid hours", "Decimal"],
        rows: [
          ["Monday", "8:00 AM to 4:30 PM", "30 min", "8h 00m", "8.00"],
          ["Tuesday", "8:05 AM to 4:35 PM", "30 min", "8h 00m", "8.00"],
          ["Wednesday", "8:00 AM to 5:00 PM", "45 min", "8h 15m", "8.25"],
          ["Thursday", "8:00 AM to 2:30 PM", "30 min", "6h 00m", "6.00"],
          ["Friday", "8:00 AM to 4:30 PM", "30 min", "8h 00m", "8.00"],
          ["Week total", "", "", "38h 15m", "38.25"],
        ],
      },
    },
    {
      heading: "Breaks: the part of the card everyone treats differently",
      paragraphs: [
        "Breaks are where time cards quietly lose or gain money. US federal law does not require employers to offer breaks for adult workers, but it does set a clear pay rule: short rest breaks of about 5 to 20 minutes are generally paid time, while a meal break of 30 minutes or more can be unpaid only if the employee is fully relieved of duty. That last phrase matters. If you eat at the front desk and keep answering the phone, that lunch is legally shaky as unpaid time in many workplaces, and it is worth a polite question to a manager or HR rather than silent resentment.",
        "State law adds another layer. Around half of US states require meal breaks for shifts beyond a certain length, and some require paid rest breaks as well, often 10 minutes for every four hours worked. The practical habit that protects you in any state is simple: record breaks as they happen, with real start and end times, not a standard 30 minutes copied down every day. A card that shows exactly 30 minutes five days in a row looks estimated, and estimated cards are the ones payroll adjusts and employees dispute.",
        "Small employers feel this from the other side. If your team of six writes breaks from memory on Friday, your labor costs drift and you cannot tell whether a busy week or sloppy cards caused it. A shared rule helps everyone: clock out for meal breaks, stay clocked in for short rest breaks, and write the actual minutes. Owners who want the next layer of accuracy, splitting a week at 40 hours and pricing the extra hours, should read the [overtime calculator guide](/guides/overtime-calculator) once the weekly totals themselves are trustworthy.",
      ],
      bullets: [
        "Short rest breaks, usually 5 to 20 minutes, are normally paid. Do not deduct them from the card.",
        "Meal breaks of 30 minutes or more can be unpaid only when you are fully off duty for the whole break.",
        "Record real break lengths. Five identical 30 minute entries look estimated and invite adjustments.",
        "If you work through lunch at your desk, note it on the card the same day, not from memory on Friday.",
        "State rules may add required meal or rest breaks on top of federal pay rules. Check your state labor site.",
      ],
    },
    {
      heading: "Rounding rules: why 8:07 becomes 8:00 or 8:15",
      paragraphs: [
        "Many employers round clock times before paying them, and federal guidance in the US allows it as long as the rounding is neutral over time, meaning it does not consistently favor the employer. The three common systems are rounding to the nearest 5 minutes, the nearest tenth of an hour (6 minutes), and the nearest quarter hour (15 minutes). Quarter hour rounding is the one most hourly workers have met: clock in at 8:00 to 8:07 and it counts as 8:00, clock in at 8:08 to 8:15 and it counts as 8:15. The boundary sits at the midpoint, 7 minutes 30 seconds, usually applied as 8 minutes in practice.",
        "Rounding feels trivial until you run the numbers. Suppose Jamal clocks in at 8:06 and out at 4:56, four days a week. Unrounded, each day is 8 hours 50 minutes minus lunch. Rounded to the quarter hour, 8:06 becomes 8:00 and 4:56 becomes 5:00, so each day gains a few minutes in his favor. His colleague who clocks in at 8:09 and out at 4:52 loses minutes under the same system, because 8:09 rounds up to 8:15 and 4:52 rounds down to 4:45. Neither result is cheating. It is the same neutral rule landing differently on different habits, which is exactly why the rule has to be written down and applied identically to everyone.",
        "The tenth of an hour system exists because decimals get cleaner: every 6 minutes is exactly 0.1 hours, so 8:06 is 8.1 and payroll never deals with repeating figures like 8.0833. If your pay stub shows decimals like 7.9 or 8.3, your employer is probably rounding to tenths. When you check a stub, convert one day by hand under the stated rule before querying the total. Most rounding disputes dissolve once both sides use the same grid, and the ones that remain are genuine recording errors worth fixing.",
      ],
      table: {
        caption: "How the same clock in time changes under three common rounding rules",
        headers: ["Actual clock in", "Nearest 5 min", "Nearest 6 min (0.1h)", "Nearest 15 min"],
        rows: [
          ["8:02", "8:00", "8:00", "8:00"],
          ["8:06", "8:05", "8:06", "8:00"],
          ["8:08", "8:10", "8:06", "8:15"],
          ["8:12", "8:10", "8:12", "8:15"],
          ["8:14", "8:15", "8:12", "8:15"],
        ],
      },
    },
    {
      heading: "Pay periods, overtime and why the week still rules",
      paragraphs: [
        "A pay period is how often you are paid. A time card week is how overtime is counted. Confusing the two causes real underpayments. On a biweekly payroll, you receive one check for two workweeks, but overtime must be calculated week by week, never by averaging the two weeks together. If you work 45 hours in week one and 35 in week two, you are owed 5 overtime hours even though the check covers exactly 80 hours in total. An employer who pays 80 straight time hours in that situation has made an error, and it is one of the most common ones small payrolls make.",
        "Semimonthly payroll, paid on the 1st and 15th or similar dates, creates a different wrinkle: pay periods rarely line up with workweeks, so a single check can contain parts of three different workweeks. The card still has to be totaled by workweek first, then reassembled into pay periods. This is why keeping clean weekly cards matters even if your checks arrive twice a month. Without the weekly subtotals, nobody can reconstruct the overtime correctly later, including a payroll service trying to help you.",
        "Planning ahead uses the same weekly building blocks. If you are scheduling leave, a project deadline or a delivery date around your shifts, the [business days calculator guide](/guides/business-days-calculator) helps you count working days excluding weekends and holidays, which pairs neatly with a time card when you are estimating how many paid hours a project window actually contains. And if your week regularly crosses 40 hours, price those extra hours properly rather than guessing, because the premium half rate adds up faster than most people expect across a year.",
      ],
    },
    {
      heading: "Common time card mistakes and how small employers fix them",
      paragraphs: [
        "The most expensive mistake is the decimal slip: writing 7.45 for 7 hours 45 minutes. Payroll reads 7.45 as 7 hours 27 minutes, so the employee loses 18 minutes every time it happens. The second is the forgotten break deduction, which runs the other way and overpays until an audit claws it back and trust takes the hit. Third is the Friday reconstruction, where a whole week is written from memory in one sitting. Times drift toward the scheduled shift, early starts vanish, and the card becomes fiction with good handwriting. Fourth is buddy rounding, where a worker always rounds in their own favor; under a neutral employer system that habit eventually shows up in the data.",
        "Small employers can fix most of this with boring consistency. Use one card format, one rounding rule and one workweek start day, and put all three in writing where new hires can find them. Review cards on Monday for the week just ended, while memories are fresh, and query odd entries the same week rather than at month end. Keep signed or confirmed cards for at least two years, since US federal record keeping rules expect payroll records to be retained and wage claims can reach back that far or longer. None of this needs expensive software at small scale. It needs the same small routine, repeated.",
        "Employees can protect themselves with an equally small routine. Photograph your card or copy your app totals each Friday, note any day you worked through lunch, and keep the copies for a few months. If a check looks wrong, rebuild the week with the free [hours calculator](/calculators/hours-calculator), print your version next to the stub, and ask about the specific day that differs. Conversations that start with one clear day almost always end well. Conversations that start with a feeling that the whole month is wrong rarely do.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I convert minutes to decimal hours for a time card?",
      a: "Divide the minutes by 60. So 15 minutes is 0.25, 30 minutes is 0.50 and 45 minutes is 0.75. A day of 7 hours 45 minutes is written as 7.75 hours for payroll. Writing 7.45 instead is the most common time card error and it shortchanges you by 18 minutes.",
    },
    {
      q: "Can my employer round my clock in and out times?",
      a: "In the US, yes, as long as the rounding system is neutral over time and does not consistently favor the employer. Common systems round to the nearest 5, 6 or 15 minutes. The same rule must be applied to everyone and to both punches, so ask for the policy in writing if your stub decimals look unfamiliar.",
    },
    {
      q: "Is my lunch break paid or unpaid?",
      a: "A meal break of 30 minutes or more can be unpaid if you are fully relieved of duty for the whole break. Short rest breaks of about 5 to 20 minutes are generally paid. If you regularly answer phones or help customers during lunch, raise it with your manager, because that time may need to be paid.",
    },
    {
      q: "I worked 45 hours one week and 35 the next. How much overtime am I owed?",
      a: "Five hours. On a biweekly payroll the two weeks are still judged separately, so the 45 hour week produces 5 overtime hours at time and a half, and the 35 hour week is all straight time. Averaging the two weeks into 80 straight hours is not allowed under US federal rules.",
    },
    {
      q: "What should a small employer keep from time cards?",
      a: "Keep the confirmed cards and payroll records for at least two to three years, along with your written rounding rule and workweek start day. Consistent retention means a wage question from last year can be answered from paper instead of memory, which protects the business as much as the employee.",
    },
    {
      q: "What is the difference between a time card calculator and a time duration calculator?",
      a: "A time duration calculator usually handles one block, the time between a single start and end. A time card calculator chains many blocks across a week, deducts breaks, applies rounding and produces the weekly total payroll needs. They use the same subtraction, just at different scales.",
    },
  ],
  relatedSlugs: ["hours-calculator", "overtime-calculator", "business-days-calculator"],
};
