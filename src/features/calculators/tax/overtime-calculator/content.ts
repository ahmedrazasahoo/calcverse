import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Overtime Calculator: Simple, Weekly FLSA and California Daily Overtime Pay",
  metaDescription:
    "Work out overtime pay three ways: simple time and a half or double time, weekly FLSA overtime over 40 hours, and California daily overtime with a per day breakdown.",
  intro:
    "Overtime looks simple until a long day, a long week and a state daily rule all land in the same paycheck. This calculator separates the three cases people actually face, so you can check a payslip, price a shift or plan a week without mixing the rules together.",
};

export const content: ToolContent = {
  seoTitle: "Overtime Calculator: Simple, Weekly FLSA and California Daily Overtime Pay",
  howTo: [
    "Pick a mode: Simple for set regular and overtime hours, Weekly for the federal rule, or California for daily overtime.",
    "Enter your regular hourly rate. For Simple mode, also enter regular hours, overtime hours and the multiplier, including a custom multiplier if your contract uses one.",
    "For Weekly mode, enter total hours in the workweek. Hours over 40 are paid at 1.5 times the regular rate.",
    "For California mode, enter hours for each of the seven days in order, then read the per day breakdown to see which hours landed at straight time, 1.5 times and 2 times.",
    "Compare regular pay, overtime pay, total gross and the blended effective hourly rate. The blended rate shows what the week was really worth per hour.",
  ],
  explanationTitle: "How overtime pay works under FLSA and California rules",
  explanation: [
    "Under the federal Fair Labor Standards Act, most hourly workers earn overtime at 1.5 times their regular rate for hours over 40 in a single workweek. The rule is weekly, not daily: working 12 hours on Monday and leaving early on Friday can still total 40 hours with no federal overtime at all. Simple mode covers the other common case, where a contract, union agreement or employer policy already tells you how many hours are overtime and at what multiplier, including double time at 2 times for nights, weekends or holidays. In every mode the maths is the same at its core: regular pay is straight time hours times the rate, overtime pay is overtime hours times the rate times the multiplier, and the blended effective rate is total gross divided by total hours.",
    "California adds a daily layer on top of the weekly rule. Hours over 8 and up to 12 in one day pay at 1.5 times, hours over 12 pay at 2 times, and straight time hours over 40 in the week that were not already paid as daily overtime also pay at 1.5 times. On the seventh consecutive day of work in a workweek, the first 8 hours pay at 1.5 times and anything beyond 8 pays at 2 times. The difficult part is avoiding double counting: an hour already paid as daily overtime does not count again toward the weekly 40. This calculator applies the daily split first, then converts only the remaining straight time hours over 40, and shows the result day by day so you can follow every hour. For example, one 14 hour day at $20 an hour pays 8 hours at $20, 4 hours at $30 and 2 hours at $40, for $360 in total.",
    "Use this as a checking and planning tool, not as legal or payroll advice. Exempt salaried workers, alternative workweek schedules, piece rate and commission regular rate calculations, and collective bargaining agreements can all change the result, and some states have their own daily or seventh day rules that differ from California. If a payslip looks wrong, compare it line by line with the breakdown here, keep your own record of hours, and raise any gap with payroll in writing while the week is still recent.",
  ],
  faqs: [
    {
      q: "How is overtime pay calculated?",
      a: "Multiply your regular hourly rate by the overtime multiplier to get the overtime rate, then multiply by overtime hours. At $20 an hour, time and a half is $30 an hour, so 10 overtime hours pay $300 on top of regular pay.",
    },
    {
      q: "What is the difference between the FLSA weekly rule and California daily overtime?",
      a: "Federal FLSA overtime only looks at the week: hours over 40 in a workweek pay at 1.5 times. California looks at both the day and the week, so hours over 8 in a day can be overtime even in a week that totals 40 hours or less.",
    },
    {
      q: "How does a 14 hour day pay in California?",
      a: "The first 8 hours pay at the regular rate, the next 4 hours pay at 1.5 times, and the final 2 hours pay at 2 times. At $20 an hour that is $160 plus $120 plus $80, which is $360 for the day.",
    },
    {
      q: "What is the seventh consecutive day rule in California?",
      a: "If you work all seven days of a workweek, the seventh day is special: the first 8 hours pay at 1.5 times and hours beyond 8 pay at 2 times, even if you worked short days earlier in the week.",
    },
    {
      q: "What does blended or effective hourly rate mean?",
      a: "It is your total gross pay divided by total hours worked. Because overtime hours pay more, the blended rate sits above your base rate whenever you work overtime, which makes it useful for comparing weeks or job offers with different overtime patterns.",
    },
  ],
};
