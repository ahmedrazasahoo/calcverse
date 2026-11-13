import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free ovulation calculator. Enter your last period and cycle length to estimate ovulation day, your fertile window and your next period date.";

export const intro =
  "Working out when you are most likely to conceive starts with one date: the first day of your last period. Add your usual cycle length and this calculator maps out ovulation and the days around it.";

export const disclaimer =
  "This calculator gives a general estimate based on average cycles. It is not medical advice, and it must never be relied on as contraception. Talk to your doctor or midwife for personal guidance.";

export const content: ToolContent = {
  seoTitle: "Ovulation Calculator: Fertile Window and Next Period Predictor",
  howTo: [
    "Enter the first day of your last period, not the last day.",
    "Enter your usual cycle length: the number of days from the first day of one period to the first day of the next. If your cycle varies, use your average from the last few months.",
    "Read your estimated ovulation day and the fertile window around it.",
    "If you are trying to conceive, the two peak days shown are the highest chance days of the cycle. If you are tracking for health, watch whether your real periods keep landing near the predictions.",
  ],
  explanationTitle: "How ovulation prediction works",
  explanation: [
    "A cycle has two halves. The first half, from your period to ovulation, varies a lot between women and even between cycles. The second half, from ovulation to the next period, is much steadier at about 14 days. That is why prediction counts backwards from the next period rather than forwards from the last one: ovulation day is roughly your cycle length minus 14, counted from the first day of your last period.",
    "The fertile window is wider than the ovulation day alone because of biology on both sides. Sperm can survive in the body for up to five days, waiting. The egg, once released, lasts only about 12 to 24 hours. Put together, pregnancy is possible from about five days before ovulation through the day after, with the highest chances on the last two days of that stretch.",
    "Treat every date here as the centre of a fuzzy zone rather than a promise. Illness, stress, travel across time zones, disrupted sleep and coming off hormonal contraception can all move ovulation by days. Ovulation test strips, which detect the hormone surge a day or two before release, and basal body temperature, which rises just after, can confirm what the calendar only estimates.",
  ],
  faqs: [
    {
      q: "How accurate is an ovulation calculator?",
      a: "For women with regular cycles it usually lands within a few days. One study of calendar predictions found the fertile window estimate correct or nearly so for most regular cycles, but real ovulation still wandered by several days in a sizeable minority. The more irregular your cycle, the wider the error bars grow.",
    },
    {
      q: "Can I use this calculator as contraception?",
      a: "No. Calendar methods fail often in real use because ovulation shifts and sperm survive longer than expected. Typical use failure rates for calendar based methods run around 1 in 4 couples per year. If avoiding pregnancy matters, use a reliable contraceptive method and talk to a clinician.",
    },
    {
      q: "What if my cycle length changes every month?",
      a: "Use the average of your last three to six cycles, and treat the fertile window as wider than shown: start it a few days earlier and end it a few days later. Cycles that swing by more than about a week, or that regularly fall outside 21 to 35 days, are worth mentioning to a doctor.",
    },
    {
      q: "Can you ovulate twice in one cycle?",
      a: "Two eggs can be released within about 24 hours of each other, which is how fraternal twins happen, but a second separate ovulation later in the same cycle is not supported by evidence. The fertile window here already covers that short double release span.",
    },
    {
      q: "What are the physical signs of ovulation?",
      a: "Common signs include cervical mucus turning clear and stretchy like egg white, a small rise in basal body temperature the morning after ovulation, mild one sided pelvic twinges, and a positive result on an ovulation test strip one to two days before release.",
    },
  ],
};
