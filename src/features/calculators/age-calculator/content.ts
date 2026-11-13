import type { ToolContent } from "@/lib/content";

export const content: ToolContent = {
  seoTitle: "Age Calculator: Your Exact Age in Years, Months and Days",
  howTo: [
    "Enter your date of birth using the date picker.",
    "Leave the second date as today, or change it to any past or future date you want to check.",
    "See your exact age in years, months and days, your total days lived, and the countdown to your next birthday.",
  ],
  explanationTitle: "How exact age is worked out",
  explanation: [
    "Counting age sounds simple until months enter the picture, because months have different lengths. This calculator subtracts the birth date from the chosen date in stages. It starts with the raw difference in years, months and days, then tidies up any borrowing: if the days come out negative, it borrows the length of the previous month, and if the months come out negative, it borrows a full year of twelve months.",
    "That borrowing step is what makes the answer match the way people naturally state their age. Someone born on 15 June 1995 is exactly 30 years, 4 months and 30 days old on 14 November 2025, not a rough figure based on dividing days by 365.",
    "The total days figure is different: it counts every single day between the two dates, leap days included. Your next birthday is the next yearly return of your birth month and day after the chosen date. People born on 29 February get their birthday observed on 28 February in common years here, though families and official rules vary on that tradition.",
  ],
  faqs: [
    {
      q: "Why does my age in days not match years times 365?",
      a: "Because of leap years. Roughly one year in four has 366 days, so a 30 year old has lived through about seven or eight extra leap days. The total days count includes every one of them exactly.",
    },
    {
      q: "Can I calculate my age on a future date?",
      a: "Yes. Set the second date to any day in the future, for example a retirement date, a graduation or the start of a school year, and the calculator shows the exact age you will be on that day.",
    },
    {
      q: "How is age counted in some East Asian traditions?",
      a: "Traditional Korean and Chinese systems historically counted a baby as one year old at birth and added a year for everyone at New Year, which could make the traditional age one or two years higher than the international age. South Korea officially switched to the international system in 2023.",
    },
    {
      q: "What age am I if I was born on 29 February?",
      a: "You still age every year like everyone else. In years without a 29 February, your birthday is usually observed on 28 February or 1 March depending on local law and personal preference. This calculator uses 28 February.",
    },
    {
      q: "Is the date I pick included in the count?",
      a: "The age is measured at the start of the chosen date, the standard convention. If you pick your birthday itself, the years figure steps up exactly on that day.",
    },
  ],
};
