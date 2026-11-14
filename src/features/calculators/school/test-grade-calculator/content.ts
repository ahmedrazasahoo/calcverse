import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Test Grade Calculator: Turn Questions Wrong Into a Percent and Letter Grade",
  metaDescription:
    "Free test grade calculator. Enter total questions and how many you got wrong or correct to see your percent, letter grade, points per question and a table for 0 to 10 wrong.",
  intro:
    "You counted the questions you missed. Now find out what that means. Enter the size of the test and the number wrong, or the number correct, and see your percent, letter grade and exactly how much each question was worth, plus a quick table for every outcome from perfect to 10 wrong.",
};

export const content: ToolContent = {
  seoTitle: "Test Grade Calculator: Turn Questions Wrong Into a Percent and Letter Grade",
  howTo: [
    "Enter the total number of questions on the test.",
    "Choose whether you want to count by questions wrong or questions correct, then enter that number.",
    "Read your percent, letter grade, how many you got wrong and the percent value of each single question.",
    "Use the quick reference table below the results to see the grade for every outcome from 0 wrong to 10 wrong at this test size.",
  ],
  explanationTitle: "Why test size changes what a mistake costs",
  explanation: [
    "A test grade is correct answers divided by total questions, times 100. The part students feel but rarely calculate is the value of one question: 100 divided by the number of questions. On a 20 question test each question is worth 5 percent, so 2 wrong gives 90 percent, an A minus, and 4 wrong drops you to 80 percent, a B minus. On a 50 question test each question is worth only 2 percent, so the same 2 wrong still leaves you at 96 percent, an A, and it takes 5 wrong to fall to 90. Short quizzes are therefore much harsher per mistake than long exams, which is why one bad 10 question quiz, where each question costs 10 percent, can look catastrophic while barely moving a points based course grade.",
    "The reference table makes this concrete before a test, not just after one. Reading down the table for your test size shows exactly how many mistakes each letter band allows. On a 25 question test, an A at 93 percent or above allows only 1 mistake, since 23 out of 25 is 92 percent. A B at 83 or above allows up to 4 wrong, because 21 out of 25 is 84 percent, while 5 wrong gives exactly 80, a B minus. Knowing those thresholds turns a vague aim like doing well into a precise allowance you can track while you work through the paper.",
    "Letter grades here follow the standard scale: 97 and above is an A plus, 93 an A, 90 an A minus, then B, C and D bands stepping down to an F below 60. Teachers who grade on a curve, award partial credit, or weight some questions more than others will produce different official marks, so use this as the exact straight percentage grade and a reliable guide to where you stand.",
  ],
  faqs: [
    {
      q: "What grade is 18 out of 20?",
      a: "18 out of 20 is 90 percent, which is an A minus on the standard scale, worth 3.7 grade points. Each question on a 20 question test is worth 5 percent, so 2 wrong costs exactly 10 percent.",
    },
    {
      q: "How many can I get wrong and still get an A?",
      a: "It depends on the test size. On a 20 question test, 1 wrong gives 95 percent, safely an A, while 2 wrong gives 90, an A minus. On a 50 question test you can miss 3 and still hold 94 percent. Use the reference table for your exact test size.",
    },
    {
      q: "What percent is 7 wrong on a 30 question test?",
      a: "7 wrong means 23 correct out of 30, which is 76.7 percent, a C on the standard scale. Each question is worth about 3.33 percent on a 30 question test.",
    },
    {
      q: "Why does one mistake hurt more on a short quiz?",
      a: "Because each question is worth 100 divided by the number of questions. A 10 question quiz charges 10 percent per mistake, a 100 question exam only 1 percent. The same slip therefore costs ten times as much on the short quiz.",
    },
    {
      q: "Does this work for tests with partial credit or weighted questions?",
      a: "Only approximately. This calculator assumes every question is worth the same and is marked simply right or wrong. If your test has partial credit or questions worth different points, add up points earned out of points possible in the grade calculator instead.",
    },
  ],
};
