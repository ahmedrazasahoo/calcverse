import type { ToolContent } from "@/lib/content";

export const content: ToolContent = {
  seoTitle: "Age Difference Calculator: Exact Gap Between Two Birthdays",
  howTo: [
    "Enter the first date of birth.",
    "Enter the second date of birth. The order does not matter.",
    "Read the exact gap in years, months and days, plus the total difference in days and who was born first.",
  ],
  explanationTitle: "How the age gap is calculated",
  explanation: [
    "The calculator first puts the two dates in order, earlier and later, then measures the distance between them the same way an exact age is measured: whole years first, then whole months, then the remaining days, borrowing month lengths where needed so the result reads the way a person would say it out loud.",
    "It also reports the plain total in days, which is often the more useful figure. Generational research, school cohort planning and family records all work more cleanly in total days or total years than in a years months days mix.",
    "A fun consequence of the maths: the gap between two people never changes. Whether you check today or in twenty years, two birthdays stay exactly the same distance apart, even though both people keep getting older.",
  ],
  faqs: [
    {
      q: "Does it matter which date I enter first?",
      a: "No. The calculator sorts the dates itself and always reports a positive gap, along with a note showing which of the two dates came first.",
    },
    {
      q: "What is considered a generation gap in age?",
      a: "Demographers usually treat a generation as roughly 20 to 30 years, the typical spacing between parents and children. Within families, siblings are often grouped by smaller gaps, but there is no official number.",
    },
    {
      q: "Can I compare more than two people?",
      a: "Run the calculator once per pair. For a family list, compare everyone against the oldest member: the results then line up neatly from oldest to youngest.",
    },
    {
      q: "Twins are born minutes apart. What does the calculator show?",
      a: "It works at day level, so twins born on the same calendar day show a difference of zero. If a pair of twins happens to arrive either side of midnight, the gap shows as one day.",
    },
    {
      q: "Why is the answer in months useful for babies?",
      a: "For children under two, development is tracked in months, so a gap like 1 year and 3 months, or a total of 456 days, tells parents and doctors far more than a rounded single year would.",
    },
  ],
};
