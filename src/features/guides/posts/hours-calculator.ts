import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "hours-calculator",
  keyword: "hours calculator",
  title: "Hours Calculator: How to Find the Time Between Two Times in Hours and Minutes",
  metaTitle: "Hours Calculator Guide: Durations and Decimal Hours",
  metaDescription: "Learn how an hours calculator finds the time between two times, converts minutes to decimal hours and avoids the common mistakes that throw shift totals off.",
  excerpt: "The simple subtraction behind every hours calculator, explained with overnight shifts, decimal conversions and the mistakes that make a 7 hour 45 minute day pay like 7 hours 27 minutes.",
  category: "Everyday",
  toolSlug: "hours-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "How long is it from 9:37 AM to 6:24 PM? Most people can guess it is about nine hours, but the exact answer, 8 hours 47 minutes, takes real work to produce in your head, and the guessing gets worse with every odd minute. That gap between roughly right and exactly right is why hours calculators exist. They answer one clean question: how much time sits between these two times, expressed in hours and minutes, and usually in decimal hours too.",
    "You reach for that answer more often than you expect. A nurse checking whether a shift really was 12 hours. A freelancer billing a client for a work session that started at 10:15 and ended at 3:40 with a coffee break in the middle. A student working out how long a study block lasted, or a driver adding up time behind the wheel. Run your own pair of times through the free [hours calculator](/calculators/hours-calculator) as you read and the examples below will click much faster.",
    "This guide explains the maths the calculator is doing, so you can do it by hand when you need to and catch the errors when a result looks off. It covers the borrowing method for subtracting times, shifts that cross midnight, converting minutes into decimal hours, and adding several durations together. If your real problem is a whole week of clock in and out entries rather than one duration, the companion [time card calculator guide](/guides/time-card-calculator) covers that weekly version in full.",
  ],
  keyPoints: [
    "Subtract in two columns: minutes first, then hours, borrowing 60 minutes from the hours when the minutes go negative.",
    "For a shift that crosses midnight, add 24 hours to the end time before subtracting, or split the shift at midnight.",
    "Decimal hours are minutes divided by 60: 47 minutes is 0.78 hours, and 8 hours 47 minutes is 8.78, not 8.47.",
    "Convert everything to minutes for messy multi part totals, add, then convert back at the end.",
    "The two classic errors are treating times like ordinary decimals and forgetting whether a time is AM or PM.",
  ],
  sections: [
    {
      heading: "The core idea: a duration is a subtraction",
      paragraphs: [
        "Every hours calculation is one subtraction wearing different clothes: end time minus start time equals duration. If a meeting runs from 2:00 PM to 3:30 PM, the duration is 1 hour 30 minutes, and your brain does it instantly because the numbers are round. The method only feels hard when the minutes refuse to line up, like a shift from 9:37 AM to 6:24 PM. The fix is to stop treating the time as one number and treat it as two columns, hours on the left and minutes on the right, exactly like the pounds and pence or feet and inches problems from school.",
        "Work the minutes column first. From 9:37 to 6:24 PM, which is 18:24 in 24 hour time, the minutes are 24 minus 37. That goes negative, so you borrow one hour from the end time, turning 18:24 into 17:84. Now the minutes work: 84 minus 37 is 47. Then the hours: 17 minus 9 is 8. The answer is 8 hours 47 minutes. That single borrowing move handles almost every duration you will ever meet, from a plumber visit to a flight connection, and it is precisely what the calculator does behind the screen, just without the pencil.",
        "Writing times in 24 hour format before you start removes the other big source of confusion. AM and PM errors are silent: 6:24 read as a morning time produces a negative or absurd answer, but only if you notice. Convert first, subtract second. Midday is 12:00, 1 PM is 13:00, and each PM hour after that adds one more, so 6:24 PM is 18:24 and 11:50 PM is 23:50. Once both times live on the same 24 hour line, the subtraction cannot confuse morning with evening.",
      ],
    },
    {
      heading: "Decimal hours: the conversion payroll and billing actually use",
      paragraphs: [
        "Hours and minutes are fine for humans, but money maths needs decimals. You cannot multiply 8 hours 47 minutes by an hourly rate of $24 directly; you first turn the duration into 8.78 hours, and then 8.78 times 24 is $210.72. The conversion is one division: minutes divided by 60. Forty seven divided by 60 is 0.7833, which rounds to 0.78 for most purposes, or stays at 0.7833 if your billing software keeps four places. Every minute is worth about 0.0167 of an hour, which is why the familiar landmarks are worth memorizing: 15 minutes is 0.25, 30 is 0.50, and 45 is 0.75.",
        "The trap is reading the clock face as a decimal. A duration of 8 hours 47 minutes is not 8.47 hours, and the difference is not small change. At $24 an hour, 8.47 pays $203.28 against the correct $210.72, a loss of $7.44 on a single shift. Stretch that error across a month of freelance invoices or a team of hourly staff and it becomes the kind of money people argue about. The reverse error exists too: a timesheet showing 7.5 hours means 7 hours 30 minutes, not 7 hours 50 minutes, and anyone who reads it the second way will think a shift was 20 minutes longer than it was.",
        "A reliable habit is to convert in one direction only and sanity check with the landmarks. If your minutes are just under 45, your decimal should be just under 0.75. If the number on screen says 8.42 for a shift you know ended 47 minutes past the hour, you have found the classic slip. The [hours calculator](/calculators/hours-calculator) shows both forms side by side, hours and minutes plus the decimal, which makes that check instant instead of a second calculation.",
      ],
      table: {
        caption: "Minutes converted to decimal hours, the values worth knowing by heart",
        headers: ["Minutes", "Decimal hours", "Minutes", "Decimal hours"],
        rows: [
          ["5", "0.08", "35", "0.58"],
          ["10", "0.17", "40", "0.67"],
          ["15", "0.25", "45", "0.75"],
          ["20", "0.33", "50", "0.83"],
          ["25", "0.42", "55", "0.92"],
          ["30", "0.50", "60", "1.00"],
        ],
      },
    },
    {
      heading: "Shifts that cross midnight and other awkward spans",
      paragraphs: [
        "Overnight work breaks the simple subtraction because the end time is smaller than the start time. A hospital shift from 10:30 PM to 6:15 AM looks like 6:15 minus 22:30, which is negative, and many people panic and swap the numbers, producing a confident wrong answer. The clean fix is to add 24 hours to the end time first: 6:15 becomes 30:15, and 30:15 minus 22:30 borrows to 29:75 minus 22:30, giving 7 hours 45 minutes. That is the true length of the shift before any break comes off it.",
        "The other reliable method is splitting at midnight. From 10:30 PM to midnight is 1 hour 30 minutes. From midnight to 6:15 AM is 6 hours 15 minutes. Added together, 7 hours 45 minutes, same answer. Splitting is slower but easier to trust at 3 AM on a night shift, and it has a real advantage for some workers: in workplaces that pay a night premium for hours after midnight, or where a shift touches two different calendar days for record keeping, the split tells you exactly how many hours fall on each side of the line.",
        "Long spans beyond a single day need a different mindset. If a project session starts Monday at 4 PM and the task timer stops Wednesday at 10 AM, think in whole days plus a remainder: Monday 4 PM to Wednesday 4 PM is 48 hours, and the finish is 6 hours before that mark, so 42 hours elapsed. Forgetting the days entirely and subtracting 10:00 minus 16:00 is how people report a two day task as a negative six hours. When a duration might exceed 24 hours, count the midnights it crosses first, then do the clock subtraction on what is left.",
      ],
    },
    {
      heading: "Adding several durations together without losing minutes",
      paragraphs: [
        "Single durations are only half the job. Real questions sound like this: a freelancer works 2 hours 40 minutes on Monday, 3 hours 25 minutes on Tuesday and 1 hour 50 minutes on Thursday, so how long did the project take in total? Adding in hours and minutes columns works if you tidy up at the end. Hours: 2 plus 3 plus 1 is 6. Minutes: 40 plus 25 plus 50 is 115, which is 1 hour 55 minutes. Total: 7 hours 55 minutes, or 7.92 decimal hours. The tidy up step, carrying every full 60 minutes into the hours column, is the part people skip, which is how totals like 6 hours 115 minutes end up on invoices.",
        "For longer lists, converting everything to minutes first is more reliable. The same project becomes 160 plus 205 plus 110, which is 475 minutes. Divide by 60 and you get 7 hours with 55 left over. This total minutes method scales to a week of study sessions, a month of gym workouts or a season of volunteer shifts, and it is far easier to check, because one column of plain numbers either adds up or it does not. Spreadsheets love this format too: one column of start times, one of end times, one of minutes, and a single sum at the bottom.",
      ],
      steps: [
        "List each session with its start and end time, one row per session.",
        "Work out each duration on its own using the borrowing method, even the short ones.",
        "Convert each duration to total minutes by multiplying the hours by 60 and adding the minutes.",
        "Add the minutes column in one go and write down the single total.",
        "Divide the total by 60: the whole number is your hours, the remainder is your leftover minutes.",
        "Convert to decimals only at this final stage if you need the figure for billing or pay.",
      ],
    },
    {
      heading: "Worked examples from real life: billing, travel and study",
      paragraphs: [
        "Example one, the contractor. Leo, an electrician, arrives at a house at 9:15 AM, finishes at 1:50 PM, and takes a 30 minute unpaid lunch. Elapsed time: 13:50 minus 9:15 is 4 hours 35 minutes. Minus the lunch gives 4 hours 5 minutes of billable work, which is 4.08 decimal hours. At $65 an hour the labor charge is 4.08 times 65, about $265.42 using the unrounded 4.0833 figure. If Leo had billed the elapsed 4.58 hours instead, the customer would have paid for a lunch nobody worked through, and that kind of small overbilling is exactly what careful customers check first.",
        "Example two, the road trip. A family leaves at 7:45 AM, drives, stops for 40 minutes, and arrives at 3:20 PM. Total trip duration is 15:20 minus 7:45, which borrows to 14:80 minus 7:45 and gives 7 hours 35 minutes door to door. Driving time alone is 7 hours 35 minus 40 minutes, so 6 hours 55 minutes. Both numbers are useful: the first plans the day, the second estimates fuel and driver fatigue. Mixing them up is how people promise an arrival time based on pure driving hours and then wonder why the day felt two stops longer.",
        "Example three, the study plan. Aisha wants 10 hours of revision before an exam and studies in uneven blocks: 1 hour 20 minutes, 2 hours 45 minutes, 50 minutes, 3 hours 10 minutes and 1 hour 35 minutes across a week. In minutes that is 80 plus 165 plus 50 plus 190 plus 95, totaling 580 minutes, which is 9 hours 40 minutes. She is 20 minutes short of her goal, a fact she would never have spotted by glancing at five clock times. Small honest totals like this are the whole point of the tool: not precision for its own sake, but a clear answer to did I actually do what I planned.",
      ],
    },
    {
      heading: "Durations that involve pay: from shift length to overtime",
      paragraphs: [
        "Once a duration turns into money, two extra questions appear: was any of it unpaid, and does any of it earn a higher rate? The unpaid part is usually a meal break, handled by subtracting it from the elapsed duration, as in the Leo example above. The higher rate part is overtime, which in the US generally begins after 40 hours in a workweek for hourly employees and pays at least one and a half times the regular rate. A single long shift does not tell you much on its own; it is the running weekly total that decides, which is why a Saturday shift late in a heavy week can be worth far more per hour than the same shift on a quiet week.",
        "Suppose your durations for a week add to 43.5 hours at $20 an hour. Straight time on all of it would be $870. Priced correctly, it is 40 hours at $20 plus 3.5 hours at $30, which is $800 plus $105, totaling $905. The $35 gap is the sort of difference that hides inside a pay stub when someone multiplies the whole week by one rate. If your weeks regularly run past 40, work through the [overtime calculator guide](/guides/overtime-calculator) after you have the durations right, because it builds the rate maths on top of exactly these totals.",
        "Military time causes one last pay related confusion, mostly for people reading schedules in healthcare, transport and emergency services where 24 hour times are standard. A rota showing 07:00 to 19:00 is a 12 hour day shift, and 19:00 to 07:00 is the matching 12 hour night shift once you add 24 to the end. If those times still feel foreign, the [military time converter guide](/guides/military-time-converter) walks through reading and converting them until the 24 hour clock becomes automatic.",
      ],
    },
    {
      heading: "The mistakes that throw shift totals off, and how to catch them",
      paragraphs: [
        "Mistake one is decimal reading, covered earlier but worth repeating because it causes the most damage: 8.47 on a screen is not 8 hours 47 minutes, and 7 hours 30 minutes is 7.5, not 7.3. Mistake two is the missed borrow, where someone subtracts the smaller minutes from the larger regardless of which time they belong to. From 9:50 to 12:10, the wrong method gives 3 hours 40 minutes by doing 50 minus 10 in the wrong direction combined with 12 minus 9; the correct answer is 2 hours 20 minutes. If a duration feels surprisingly generous, this is usually why. Mistake three is the AM and PM swap, which often produces a duration near 12 hours for a normal shift, a useful red flag: any ordinary daytime shift calculated at 11 or 12 hours deserves a second look.",
        "Mistake four is rounding too early. If you round each break and each session to the nearest quarter hour before adding, a day of small sessions can drift by 20 minutes or more from the true total. Round once, at the end, if you round at all. Mistake five is forgetting that breaks inside a duration are still elapsed time: a 9 to 5 day with an hour for lunch is 8 elapsed hours and 7 paid hours, and quoting the wrong one in the wrong place starts arguments that a single clear sentence would prevent. Say which figure you mean, elapsed or paid, every time you share a total.",
        "The simplest defense is a habit of rough checking. Before trusting any result, estimate it: from about 9:40 to about 6:20 is a bit under 9 hours, so an answer of 8 hours 47 minutes fits and an answer of 9 hours 47 minutes does not. Estimation catches swapped digits and direction errors that precise methods miss because the method itself was fed the wrong numbers. For the final figure, run the pair of times through the [hours calculator](/calculators/hours-calculator) once more, and browse the other walkthroughs on the [guides hub](/guides) if a neighboring topic, like counting working days between dates, is the thing you actually need next.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I calculate the hours between two times by hand?",
      a: "Convert both times to 24 hour format, then subtract the minutes first and the hours second. If the end minutes are smaller, borrow 60 minutes from the end hours. For example, 18:24 minus 9:37 becomes 17:84 minus 9:37, giving 8 hours 47 minutes.",
    },
    {
      q: "How long is a shift from 10:30 PM to 6:15 AM?",
      a: "It is 7 hours 45 minutes before breaks. Add 24 hours to the end time to handle the midnight crossing, so 6:15 becomes 30:15, then subtract 22:30. Splitting at midnight gives the same answer: 1 hour 30 minutes before midnight plus 6 hours 15 minutes after it.",
    },
    {
      q: "What is 8 hours 47 minutes in decimal hours?",
      a: "It is 8.78 hours, because 47 divided by 60 is 0.7833, rounded to 0.78. It is not 8.47 hours. That reading error costs real money: at $24 an hour it underpays a shift by about $7.44, so always divide the minutes by 60 rather than copying them after the decimal point.",
    },
    {
      q: "How do I add up several work sessions in one day?",
      a: "Work out each session duration separately, convert each one to minutes, add the minutes, then divide by 60 to get hours with minutes left over. Sessions of 2 hours 40, 3 hours 25 and 1 hour 50 become 160, 205 and 110 minutes, totaling 475 minutes, which is 7 hours 55 minutes.",
    },
    {
      q: "Why does my calculator show a negative duration?",
      a: "A negative result means the end time is earlier than the start time on the same day line. Usually the shift crosses midnight, so add 24 hours to the end time, or one of the times has AM and PM mixed up. Check both times in 24 hour format and the negative sign almost always explains itself.",
    },
    {
      q: "Should I round durations before or after adding them?",
      a: "After, and only once. Rounding every session first can drift a total by 20 minutes or more across a day of short sessions. Add the exact durations, then round the final figure to whatever precision you need for billing or reporting.",
    },
  ],
  relatedSlugs: ["time-card-calculator", "overtime-calculator", "military-time-converter"],
};
