import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free business days calculator. Count working days between two dates with weekends removed, add or subtract business days from any date, and skip US federal or UK bank holidays.";

export const intro =
  "Business days decide real deadlines: shipping promises, processing times, notice periods and project plans. This calculator counts the Monday to Friday days between two dates, moves a number of business days forward or backward from any date, and can take public holidays out of the count as well.";

export const content: ToolContent = {
  seoTitle: "Business Days Calculator: Count Working Days, Skip Holidays",
  howTo: [
    "To count between two dates, pick the count mode, then enter the start and end dates.",
    "Choose a holiday calendar if you want public holidays removed as well as weekends: US federal holidays, UK bank holidays for England and Wales, or none.",
    "Read the split of the span into business days, weekend days and holidays, with every holiday in the window named.",
    "To find a deadline instead, switch to the add mode, enter the start date and how many business days to move forward or backward, and read the landing date.",
  ],
  explanationTitle: "How business day counting works",
  explanation: [
    "A business day is a Monday to Friday that is not a public holiday. Counting a span means walking through it one calendar day at a time, setting Saturdays and Sundays aside, then setting aside any weekday that appears on the holiday list you picked. What is left is the business day total. The one convention worth knowing is that the start date itself is never counted: the count covers the days after the start date, up to and including the end date. That matches how most delivery promises and filing windows are worded, and it is also why two honest calculators can differ by one day when one of them counts the start date as day one.",
    "The holiday lists here are worked out from rules rather than stored tables, so they stay right for any year you enter. The US list holds the eleven federal holidays. When a fixed date holiday such as Independence Day or Christmas Day falls on a Saturday, the federal observed day moves to the Friday before, and when it falls on a Sunday it moves to the Monday after. The UK list holds the bank holidays of England and Wales, including Good Friday and Easter Monday, which follow Easter, and the substitute days that move Christmas Day, Boxing Day and New Year Day off a weekend. State holidays, local holidays and company shutdown days are not included, because no single list could hold them all.",
    "Adding business days runs the same walk in one direction. Each step forward lands only on a day that counts, so five business days from a Friday usually lands on the following Friday once the weekend in the middle is skipped, and a holiday inside the window pushes the landing one calendar day later still. Counting backward for a notice period or a filing deadline works identically, stepping in reverse until the required number of business days has been counted off.",
  ],
  faqs: [
    {
      q: "How many business days are there in a month?",
      a: "Most months hold 20 to 23 weekdays, and public holidays lower the business day count further. January 2026 is a fair example: counting from 1 January to 31 January covers 21 weekdays, and the US federal list also removes Martin Luther King Jr. Day inside that span, leaving 20 business days. Enter your own two dates above to get the exact split for the month you care about.",
    },
    {
      q: "Does the start date count as day one?",
      a: "Not in this calculator. The count begins with the day after the start date, and the end date is counted when it is a business day. That is the convention behind most shipping and processing promises, where an order placed on Monday with a three business day delivery is due on Thursday, counting Tuesday, Wednesday and Thursday.",
    },
    {
      q: "Why is my result one day different from another calculator?",
      a: "Almost always the day one convention. Some tools count the start date itself as the first business day, which pulls every deadline one day earlier. Check which convention the wording of your promise uses, then match it here by shifting the start date one day earlier if the start day itself should count.",
    },
    {
      q: "Which holidays does the calculator skip?",
      a: "With the US calendar it skips the eleven federal holidays, on their observed dates when a fixed date falls on a weekend. With the UK calendar it skips the England and Wales bank holidays, including substitute days and the Easter based holidays. It does not skip state, local or company holidays, so subtract those yourself if they fall on weekdays inside your span.",
    },
    {
      q: "How do I find the date that is 10 business days from now?",
      a: "Use the add mode, set the start date to today, choose add, and enter 10. Weekends and any holidays in the selected calendar are skipped automatically, so the landing date is the tenth working day from now. For a notice period that runs the other way, choose subtract and the same number to count backward.",
    },
  ],
};
