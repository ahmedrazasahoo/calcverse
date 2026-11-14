import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Period Calculator: Predict Your Next Period, Ovulation and Fertile Window",
  metaDescription:
    "Free period calculator. Enter the first day of your last period and your average cycle length to see your next three period dates, estimated ovulation day and fertile window.",
  intro:
    "Enter the first day of your last period and your usual cycle length, and this calculator maps out your next three period start dates, the day you are most likely to ovulate, and your fertile window. It is a planning estimate only: real cycles vary from month to month.",
};

export const content: ToolContent = {
  seoTitle: "Period Calculator: Predict Your Next Period, Ovulation and Fertile Window",
  howTo: [
    "Enter the first day of your most recent period, meaning the first day of full bleeding, not spotting.",
    "Enter your average cycle length in days. Count from the first day of one period to the first day of the next; 28 days is the common default, and this tool accepts 21 to 45.",
    "Enter how many days your period usually lasts, so the end date of the next period can be shown too.",
    "Read your next three period start dates, your estimated ovulation day, your fertile window and how many days remain until your next period.",
  ],
  explanationTitle: "How period prediction works, and why it is only an estimate",
  explanation: [
    "A menstrual cycle is counted from the first day of one period to the first day of the next. If your last period started on 1 January and your average cycle is 28 days, the next period is expected around 29 January, the one after that around 26 February, and so on. Ovulation, the release of an egg, usually happens about 14 days before the next period starts, which for a 28 day cycle falls near day 14. Because sperm can survive for up to about five days and the egg lives for roughly a day, the fertile window is usually shown as the five days before ovulation plus ovulation day and the day after.",
    "These are averages, not promises. Cycle length commonly shifts by a few days between months, and stress, illness, travel, weight change, intense exercise and hormonal conditions can all move ovulation earlier or later. That is why this calculator shows estimates for planning things like trips, events and supplies, and why it must never be used as a contraception tool or a substitute for medical advice. A period that is regularly very late, cycles outside the usual 21 to 35 day adult range, very heavy bleeding or severe pain are all reasons to see a clinician rather than rely on any calculator.",
  ],
  faqs: [
    {
      q: "How accurate is a period calculator?",
      a: "It is a reasonable guide for people with fairly regular cycles, but it cannot know when you actually ovulated. Expect the real date to land a few days either side, and treat a difference of up to about a week as normal variation rather than a problem on its own.",
    },
    {
      q: "How do I work out my average cycle length?",
      a: "Track the first day of full bleeding for three or more cycles, count the days from each start date to the day before the next period starts, then average those counts. For example, cycles of 27, 29 and 28 days average to 28 days.",
    },
    {
      q: "Can I use this calculator to avoid pregnancy?",
      a: "No. Calendar estimates cannot confirm when ovulation happened, and ovulation can shift even in people with regular cycles. If avoiding pregnancy matters, use a proven contraception method and talk to a clinician about the most reliable options for you.",
    },
    {
      q: "When is the fertile window?",
      a: "Usually the five days before ovulation, ovulation day itself and the day after, because sperm can survive for several days while the egg survives for about a day. For a 28 day cycle starting 1 January, that is roughly 10 January to 16 January, with ovulation near 15 January.",
    },
    {
      q: "When should I see a doctor about my cycle?",
      a: "See a clinician if periods stop for more than about three months without pregnancy, if cycles are consistently shorter than 21 days or longer than 35 days, if bleeding is very heavy or lasts more than about seven days, or if you have severe pain or bleeding between periods.",
    },
  ],
};
