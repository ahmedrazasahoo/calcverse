import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free due date calculator using Naegele's rule. Estimate your baby's due date from your last period or conception date, and see how far along you are today.";

export const intro =
  "Enter the first day of your last period, or the date you conceived, and this calculator estimates the due date the same way doctors have for two centuries, then shows how far along you are right now.";

export const disclaimer =
  "This calculator gives a general estimate. It is not medical advice. Your midwife or doctor may set a different official due date, especially after your first ultrasound scan, and their date is the one your care will follow.";

export const content: ToolContent = {
  seoTitle: "Due Date Calculator: Estimate Your Baby's Arrival by Naegele's Rule",
  howTo: [
    "Choose whether you know the first day of your last period or your conception date.",
    "Enter the date. If you use the last period option, it is the first day of bleeding, not the day it ended.",
    "Read your estimated due date and the estimated conception date.",
    "If your last period is recent, you will also see how far along you are today, counted in the weeks and days style used at appointments.",
  ],
  explanationTitle: "How the due date is worked out",
  explanation: [
    "The standard method is Naegele's rule, named after the German obstetrician who popularised it in the early 1800s. Take the first day of the last period, add a year, subtract three months and add seven days. Done in whole days, that is simply the last period plus 280 days, which is 40 weeks. Pregnancy is counted from the period rather than conception because periods are observable and conception usually is not.",
    "If you know the conception date, the maths shortens. Conception usually happens about 14 days after the last period in a 28 day cycle, so the due date is conception plus 266 days, or 38 weeks. Longer or shorter cycles shift things a little: someone with a regular 35 day cycle probably ovulated about a week later than the rule assumes, and care providers often adjust for that.",
    "Keep the word estimated in view. Only about 1 in 20 babies arrive on the exact due date, and anything from 37 to 42 weeks counts as a normal, full term arrival window. A first trimester ultrasound, which measures the baby directly, is more accurate than dates and often moves the official due date by a few days. That scan date is the one hospitals plan around.",
  ],
  faqs: [
    {
      q: "How accurate is a due date calculator?",
      a: "It gives the standard obstetric estimate, accurate to within about a week for women with regular 28 day cycles and certain dates. It cannot know your actual ovulation day. A dating scan at 8 to 14 weeks measures the baby and is accurate to within roughly five to seven days, which is why its date usually wins.",
    },
    {
      q: "Why is pregnancy 40 weeks but only nine months?",
      a: "Because months are longer than four weeks. Forty weeks is nine calendar months plus about a week, and the count starts roughly two weeks before conception even happens. By the day of a missed period you are already counted as four weeks pregnant.",
    },
    {
      q: "My cycle is longer than 28 days. Does that change my due date?",
      a: "Probably by a few days. With a 35 day cycle, ovulation likely happened around day 21 rather than day 14, which would put the real due date about a week later than the standard rule suggests. Mention your cycle length at your booking appointment so it can be considered.",
    },
    {
      q: "Can I work out a due date from an IVF transfer?",
      a: "Yes, though the method differs. For IVF, providers count from the transfer date plus the age of the embryo: a day 5 blastocyst transfer is treated as day 19 of the cycle, so the due date is 261 days after transfer. Ask your clinic for your official date, since protocols vary.",
    },
    {
      q: "What if I do not know my last period date?",
      a: "Then an early ultrasound is the reliable route, and it is routine in that situation. Try to narrow the window if you can: the date of a positive test, or when you likely conceived, still helps a clinician sanity check the scan measurements.",
    },
  ],
};
