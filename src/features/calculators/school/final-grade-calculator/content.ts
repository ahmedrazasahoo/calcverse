import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Final Grade Calculator: What Score Do You Need on the Final Exam",
  metaDescription:
    "Free final grade calculator. Enter your current grade, the final exam weight and your target grade to see the exact score you need on the final, including already secured and not reachable cases.",
  intro:
    "One question drives most end of term stress: what do I need on the final? Enter your current grade, how much the final is worth, and the grade you want, and this calculator gives you the exact score required, plus an honest warning when a target is already safe or out of reach.",
};

export const content: ToolContent = {
  seoTitle: "Final Grade Calculator: What Score Do You Need on the Final Exam",
  howTo: [
    "Enter your current grade percent, meaning your average on all work completed so far.",
    "Choose how to enter the weight: either the final exam weight directly, or the weight of the work so far. The two always add to 100, so the calculator derives one from the other.",
    "Enter your target grade percent, or use the quick pick buttons for an A at 90, a B at 80, a C at 70 or a D at 60.",
    "Read the score needed on the final. If it is at or below zero, your target is already secured. If it is above 100, that target cannot be reached even with a perfect final.",
  ],
  explanationTitle: "How final exam weighting actually works",
  explanation: [
    "Your course grade is a weighted average of two parts: the work already done and the final exam. If the final is worth 25 percent, then the work so far is worth 75 percent, and your course grade will be 0.75 times your current grade plus 0.25 times your final exam score. The score you need is found by rearranging that equation: required final score equals (target times 100 minus current grade times current weight) divided by final weight. For example, with a current grade of 88, a final worth 25 percent and a target of 90, the answer is (9000 minus 88 times 75) divided by 25, which is (9000 minus 6600) divided by 25, or 96 percent. A heavy final makes the target harder here because there is less completed work locking in the grade, but the same weight also gives a strong student more room to climb.",
    "The two edge cases matter as much as the normal answer. When the required score comes out at zero or below, your target is already secured: even a zero on the final keeps you at or above the target, though a real score will still lift your grade above it. When the required score comes out above 100, the target is mathematically out of reach, because no exam can score more than 100 percent. That is not a reason to give up on the exam. A target one band lower may still be very reachable, and the difference between, say, needing 88 for a B and coasting still shows up clearly if you lower the target and recalculate.",
    "A common mistake is entering the wrong weight. Syllabi phrase it both ways: some say the final is worth 30 percent, others say coursework counts for 70 percent. Both describe the same course. This calculator accepts either phrasing through the toggle, so you can enter exactly the number your syllabus gives you without doing the subtraction yourself and risking a slip.",
  ],
  faqs: [
    {
      q: "What score do I need on the final to get an A?",
      a: "It depends on your current grade and the final weight. With a current grade of 92 and a final worth 30 percent, you need about 85.3 percent for a 90 overall. With a current grade of 85 and the same final weight, you would need about 101.7 percent, so an A at 90 overall would not be reachable, though a B would be.",
    },
    {
      q: "What does it mean when the calculator says already secured?",
      a: "It means the maths gives a required score of zero or less: your completed work alone, weighted as it is, already puts you at or above the target even if you scored zero on the final. You should still take the final seriously, because a good score raises your grade above the target.",
    },
    {
      q: "What if I need more than 100 percent on the final?",
      a: "That target cannot be reached, because a final exam score cannot exceed 100 percent. Lower the target by one letter band and recalculate to find the highest grade that is still possible, then aim your revision at that score.",
    },
    {
      q: "Should I enter the final weight or the coursework weight?",
      a: "Either one works. Use whichever number your syllabus states. If it says the final is worth 25 percent, choose the final weight option and enter 25. If it says coursework is 75 percent of the grade, choose the weight so far option and enter 75. The calculator converts between them.",
    },
    {
      q: "My final replaces my lowest test score. Does that change the calculation?",
      a: "Yes. A replacement policy means a strong final also erases a weak earlier score, so you may need less than this calculator shows. Work out your current grade with the lowest test removed, enter that higher current grade, and the result will reflect the policy more closely.",
    },
  ],
};
