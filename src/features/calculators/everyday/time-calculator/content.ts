import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Time Calculator: Add, Subtract and Compare Durations",
  metaDescription:
    "Add two durations, take one duration away from another, or find the time between two clock times, including overnight gaps. Results in words, seconds and decimal hours.",
  intro:
    "Time refuses to behave like ordinary numbers: sixty seconds roll into a minute, and a shift can run past midnight. This calculator handles the carrying and borrowing for you, whether you are adding up clips, study sessions or hours on a job.",
};

export const content: ToolContent = {
  seoTitle: "Time Calculator: Add, Subtract and Compare Durations",
  howTo: [
    "Choose a mode at the top: add two durations, subtract two durations, or find the time between two clock times.",
    "For adding and subtracting, fill in days, hours, minutes and seconds for each duration. Parts can be as large as you like, so 90 minutes is fine and will be tidied up for you.",
    "For clock times, pick a start time and an end time. If the end looks earlier than the start, it is treated as the next day, which suits night shifts and late finishes.",
    "Read the total as a written duration, then check the same length in plain seconds and in decimal hours.",
  ],
  explanationTitle: "Why time maths needs its own calculator",
  explanation: [
    "Everyday numbers carry in tens, but time carries in sixties and twenty fours. Adding 1 hour 30 minutes to 45 minutes means noticing that 75 minutes is really 1 hour 15 minutes, giving 2 hours 15 minutes in total. Subtracting is trickier still, because taking 1 hour 30 minutes away from 2 hours flat forces you to borrow an hour and turn it into 60 minutes first. This calculator sidesteps all of that by converting each duration into total seconds, doing one simple sum, then converting back into days, hours, minutes and seconds.",
    "The clock time mode answers a different kind of question: not how long two lengths make together, but how much time sits between two moments. A start of 09:15 and an end of 17:45 are 8 hours 30 minutes apart. When the end time is earlier than the start, like finishing at 01:00 after starting at 23:00, the gap clearly crosses midnight, so a full day is added and the answer is 2 hours, flagged as overnight so you know what happened.",
    "The extra result cards exist because different jobs want time in different shapes. Video editors and programmers often need a flat count of seconds. Payroll and invoicing prefer decimal hours, where 30 minutes becomes 0.5 and totals can be multiplied by an hourly rate. Seeing all three side by side saves a second conversion and the mistakes that come with it.",
  ],
  faqs: [
    {
      q: "How do I add 1 hour 30 minutes and 45 minutes?",
      a: "Add the minutes first: 30 plus 45 is 75 minutes, which is 1 hour and 15 minutes. Add that hour to the existing one and the total is 2 hours 15 minutes. The add mode does this carrying automatically.",
    },
    {
      q: "What happens if the end time is earlier than the start time?",
      a: "The calculator reads the end as falling on the next day and says so under the result. Starting at 23:00 and ending at 01:00 gives a gap of 2 hours, which is how overnight shifts and late night journeys usually need to be counted.",
    },
    {
      q: "Can I enter minutes or seconds above 59?",
      a: "Yes. Oversized parts are normalised for you, so entering 90 minutes produces a duration of 1 hour 30 minutes. This is handy when a source gives you a length in one unit only, like a total of 150 minutes.",
    },
    {
      q: "Why can I not subtract a longer duration from a shorter one?",
      a: "Because the answer would be negative time, which does not describe a real duration. If you need the gap regardless of order, swap the two durations around, or use the clock time mode when you are working with moments rather than lengths.",
    },
    {
      q: "How do I turn a duration into decimal hours?",
      a: "Divide the total seconds by 3600, or just read the decimal hours card. An hour and a half is 5400 seconds, and 5400 divided by 3600 is 1.5 hours, the figure most timesheets expect.",
    },
  ],
};
