import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Pregnancy Calculator: Current Week, Due Date, Trimester and Milestones",
  metaDescription:
    "Free pregnancy calculator. Enter the first day of your last period to see your current week and day, trimester, estimated due date, days to go and key milestones by week.",
  intro:
    "One date tells most of the story of a pregnancy timeline: the first day of your last period. Enter it here and see how far along you are today in weeks and days, which trimester you are in, when the due date falls, and the milestone weeks still ahead.",
};

export const content: ToolContent = {
  seoTitle: "Pregnancy Calculator: Current Week, Due Date, Trimester and Milestones",
  howTo: [
    "Enter the first day of your last period, meaning the first day of bleeding, not the day it finished.",
    "Read your current week and day at the top. That is the figure used at scans and appointments.",
    "Check your estimated due date and the days still to go, then note which trimester you are in.",
    "Scan the milestone list to see which week markers you have passed and the calendar date of each one still ahead.",
    "If your cycles are usually much longer or shorter than 28 days, expect the real dates to sit a few days either side of these.",
  ],
  explanationTitle: "How pregnancy weeks are counted",
  explanation: [
    "Pregnancy is counted from the first day of the last period rather than from conception, for a practical reason: periods are easy to date and conception usually is not. On a typical 28 day cycle, ovulation and conception happen about 14 days after that period starts, so by the time a period is missed the count is already at four weeks. The full timeline runs 280 days, or 40 weeks, split into three trimesters: weeks 0 to 13, weeks 14 to 27, and week 28 until the birth.",
    "The milestone weeks in the list mark points that matter in routine care and in development. Around week 12 the first trimester screening window closes, around week 20 the detailed anatomy scan is usually done and the pregnancy is halfway, and around week 36 appointments often become weekly. They are guideposts, not appointments in themselves, and the exact schedule varies by country and by care provider.",
    "Hold every date on this page lightly. These results are estimates based on a typical cycle and average timing, and only about 1 in 20 babies arrive on the exact due date. A first trimester ultrasound measures the baby directly and often adjusts the official due date by a few days. Nothing here is medical advice: your midwife or doctor knows your history and their dates and guidance are the ones to follow.",
  ],
  faqs: [
    {
      q: "How is my current pregnancy week worked out?",
      a: "Count the days from the first day of your last period to today, divide by 7, and the whole weeks plus leftover days are your current week and day. Seventy days after the period, for example, is exactly week 10, day 0.",
    },
    {
      q: "What are the trimester dates?",
      a: "The first trimester runs from week 0 through week 13, the second from week 14 through week 27, and the third from week 28 until the birth. Different sources draw the lines a day or two apart, but these are the boundaries most care teams use.",
    },
    {
      q: "My last period date is in the future. What does that mean?",
      a: "It means the count cannot start yet. Either the date was typed in wrong, or the wrong date was picked: the one needed is the first day of the most recent period, which is always in the past once a pregnancy has begun.",
    },
    {
      q: "I am past my due date. Should I worry?",
      a: "Not on the numbers alone. The due date is the middle of a normal window, and many healthy babies arrive in the week or so after it. Care teams usually discuss monitoring and induction options as the days past the date add up, so raise it at your next appointment or sooner if you have any concerns.",
    },
    {
      q: "Can this calculator replace my scan dates?",
      a: "No. It applies the standard dates method, which is a good first estimate. A dating scan in the first trimester is more accurate because it measures the baby, and once your care team sets an official due date from a scan, that is the date your care will follow.",
    },
  ],
};
