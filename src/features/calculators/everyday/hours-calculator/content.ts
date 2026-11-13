import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free hours calculator for work shifts and time cards. Total hours between start and end times with breaks removed, in plain and decimal hours, plus add or subtract time.";

export const intro =
  "Whether you are filling a time card, checking a payslip or timing a shift, this calculator totals the hours between two clock times, takes the unpaid break out, and gives the decimal figure payroll actually uses.";

export const content: ToolContent = {
  seoTitle: "Hours Calculator: Work Hours, Breaks and Decimal Time for Time Cards",
  howTo: [
    "Enter your start and end times in shift mode. If you work past midnight, just enter the morning end time as normal; the calculator reads it as the next day.",
    "Enter your unpaid break in minutes, and read your worked time in hours and minutes plus decimal hours.",
    "Use the second mode to move a clock time forwards or backwards by hours and minutes, for questions like what time a film ends or when to leave.",
    "For a full week, add each day with the weekly totals in mind: most people simply run each shift and add the decimal hours together.",
  ],
  explanationTitle: "How work hours are counted, and why decimals appear",
  explanation: [
    "Clock arithmetic is awkward because time is not decimal: sixty minutes make an hour, and twenty four hours wrap into the next day. This calculator converts everything into minutes since midnight first, so a shift becomes one subtraction. When the end time is earlier than the start, it means the shift crossed midnight, and a full day is added before subtracting. Equal start and end times count as zero, not as a 24 hour shift.",
    "Breaks are removed after that gross total is found, because that is how employers record them: you were present for the gross span and paid for the net. The decimal hours figure then divides the net minutes by sixty, so 7 hours 30 minutes becomes 7.5. That decimal is the number that belongs on time cards and invoices, because payroll systems multiply it directly by an hourly rate.",
    "One rounding habit is worth knowing. Many employers round each shift to the nearest quarter hour, some to the nearest tenth of an hour (six minutes). Over a month, rounding direction matters, so if your payslip total differs slightly from your own count, check the rounding rule in your contract before assuming a mistake.",
  ],
  faqs: [
    {
      q: "How do I write 7 hours and 45 minutes in decimal hours?",
      a: "Divide the minutes by 60 and add them to the hours: 45 divided by 60 is 0.75, so 7 hours 45 minutes is 7.75 hours. The calculator shows this decimal figure for every shift automatically.",
    },
    {
      q: "How do I calculate hours for an overnight shift?",
      a: "Enter the times exactly as they appear on the clock, for example start 22:00 and end 06:00. Because the end is earlier than the start, the calculator treats the shift as crossing midnight and returns eight hours before breaks.",
    },
    {
      q: "Should my lunch break be included in work hours?",
      a: "Unpaid meal breaks are not working time in most countries and are subtracted here. Short paid rest breaks usually stay in. If your employer pays through lunch, enter zero for the break and the gross and net figures will match.",
    },
    {
      q: "How many hours is a standard full time week?",
      a: "Typically 37.5 to 40 paid hours, depending on country and contract. A 9 to 5 day with an unpaid hour for lunch is 7 paid hours, or 35 a week; with a 30 minute lunch it is 7.5 a day and 37.5 a week, which is why the break length on your time card matters.",
    },
    {
      q: "What is the difference between gross and net hours here?",
      a: "Gross is the full span from clock in to clock out. Net is gross minus the unpaid break, and net is the figure you are normally paid for. Both are shown so you can check a payslip line by line.",
    },
  ],
};
