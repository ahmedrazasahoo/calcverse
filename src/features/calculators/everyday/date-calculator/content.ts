import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free date calculator. Count the days, weeks, weekdays and months between two dates, or add and subtract days, weeks, months and years from any date.";

export const intro =
  "Two date jobs come up again and again: how long between these two dates, and what date lands a certain span from now. This calculator does both, and counts working days as well as calendar days.";

export const content: ToolContent = {
  seoTitle: "Date Calculator: Days Between Dates, Plus Add or Subtract Days",
  howTo: [
    "For the gap between two dates, pick the count mode, then enter the start and end dates.",
    "Read the total in days, the calendar style breakdown in years, months and days, and the split between weekdays and weekend days.",
    "To jump from a date, switch to the add mode, enter the starting date, then the years, months, weeks and days to add or subtract.",
    "Entering the later date first is fine in count mode; the dates are swapped and the count stays positive.",
  ],
  explanationTitle: "How date counting actually works",
  explanation: [
    "A span of days is easy: subtract one date from the other and count. The calendar style breakdown is trickier, because months refuse to be a fixed length. This calculator borrows the way people state ages: full years first, then full months, then the leftover days, borrowing the length of the previous month when the day numbers run backwards. That is why the same span can read as 311 days and as 10 months and 5 days, and both are correct.",
    "Weekday counting follows the same span. The days counted run from the start date up to the day before the end date, the standard way contracts, notice periods and hotel stays treat a range. If your workplace counts the end date itself as a working day, add one weekday when the end date falls Monday to Friday.",
    "Adding months has a famous edge case: there is no 31 February. When a monthly step lands on a date that does not exist, this calculator pulls the result back to the last day of that month rather than rolling into the next one. That matches how subscriptions, rent and most legal monthly deadlines behave.",
  ],
  faqs: [
    {
      q: "How many days are there between today and a future date?",
      a: "Set the start date to today and the end date to your target. The total days figure is the exact count, leap days included. For a deadline, remember the count treats the end date as the morning it begins, so something due in three days means three full days from now.",
    },
    {
      q: "What date is 90 days from now?",
      a: "Use the add mode with 90 in the days box. Ninety days is the standard window for many probation periods, notice clauses and free trial conversions, and because months vary, the answer is not simply three calendar months later.",
    },
    {
      q: "How are working days counted?",
      a: "Working days here are Monday to Friday inside the span. Public holidays are not removed, because they differ by country and even by region. If you are counting down to a business deadline, subtract any holidays that fall on weekdays inside your span.",
    },
    {
      q: "Why does adding one month to 31 January give 28 February?",
      a: "Because February has no 31st. Date systems either clamp to the last day of the target month or overflow into March. Clamping is the behaviour most people expect for monthly bills and anniversaries, so that is what happens here, including the leap year case of 29 February.",
    },
    {
      q: "Does the calculator include leap years?",
      a: "Yes. Every count is done on real calendar dates, so 29 February is counted whenever it falls inside the span, and the years, months and days breakdown borrows the true length of each month it crosses.",
    },
  ],
};
