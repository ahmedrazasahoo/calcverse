import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Conception Calculator: When Did I Conceive, From Due Date, Birth Date or Last Period",
  metaDescription:
    "Free conception calculator. Work backwards from a due date or birth date, or forwards from your last period, to find the most likely conception date and the likely window around it.",
  intro:
    "Conception is a moment nobody sees happen, but its date can be estimated from the dates around it. Start from a due date, a birth date or the first day of a last period, and this calculator counts back to the most likely day, plus the realistic window either side of it.",
};

export const content: ToolContent = {
  seoTitle: "Conception Calculator: When Did I Conceive, From Due Date, Birth Date or Last Period",
  howTo: [
    "Choose which date you know: a due date, a birth date, or the first day of the last period in the relevant cycle.",
    "Enter that date. For the last period option, it is the first day of bleeding, not the last day.",
    "Read the most likely conception date, then look at the likely window: conception probably fell somewhere inside that 7 day stretch.",
    "If you used the birth date option, remember it assumes the baby arrived near the due date, so treat its answer as the roughest estimate of the three.",
  ],
  explanationTitle: "How conception dates are estimated",
  explanation: [
    "The maths starts from the standard pregnancy length. A pregnancy is dated at 280 days from the first day of the last period, and conception is placed 14 days into that timeline on a typical 28 day cycle. Counting backwards, conception is therefore the due date minus 266 days. From a last period the direction flips: conception is the period plus 14 days, and the due date is the period plus 280 days. Birth date mode borrows the same backwards count, using the birth date as a stand in for the due date.",
    "A single day is only ever the centre of a window. Sperm can survive in the body for up to about five days, so the act that led to pregnancy may have happened days before fertilisation itself. Cycles also vary: someone who ovulates on day 18 instead of day 14 conceived about four days later than the standard estimate. That is why every result here shows a window of three days either side, and why honest answers talk about a likely stretch rather than a certain day.",
    "These are estimates based on a typical 28 day cycle, and they get less certain the further the starting date sits from conception itself. They are general information, not medical advice, and they cannot settle questions that need certainty, such as exact timing for medical or legal purposes. A clinician with scan measurements and your history can narrow things far better than any calendar count.",
  ],
  faqs: [
    {
      q: "How accurate is a conception calculator?",
      a: "It is accurate to the standard model, which assumes ovulation on day 14 of a 28 day cycle. If your cycle is regular and near 28 days, the true day usually falls inside the 7 day window shown. Irregular or much longer cycles can move conception by a week or more.",
    },
    {
      q: "Why is there a window instead of one exact date?",
      a: "Because biology leaves a range. Sperm survive for several days waiting for an egg, and ovulation day itself moves from cycle to cycle. The single date shown is the most likely centre, and the window is the honest spread around it.",
    },
    {
      q: "Can I work out conception from a birth date?",
      a: "Only roughly. The method pretends the baby was born on the due date, then counts back 266 days. A baby born two weeks early was actually conceived about two weeks later than that estimate suggests, and a late baby the reverse. Use it as a guide, not a finding.",
    },
    {
      q: "Does the conception date tell me when I had intercourse?",
      a: "Not exactly. Fertilisation happens at ovulation, but sperm can wait in the body for up to about five days beforehand. The relevant encounter could be anywhere from the day of ovulation back to about five days before it.",
    },
    {
      q: "My cycle is 35 days, not 28. How do I adjust?",
      a: "Add roughly the difference to the estimate. In a regular 35 day cycle, ovulation usually falls around day 21 rather than day 14, so conception was probably about a week later than the standard result, and the due date about a week later too.",
    },
  ],
};
