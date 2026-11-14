import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Grade Calculator: Work Out Your Course Grade From Assignments",
  metaDescription:
    "Free grade calculator with weighted categories and points modes. Enter scores, weights or points earned and see your current percent, letter grade and GPA points instantly.",
  intro:
    "Most courses grade you in one of two ways: categories with weights, or raw points added up. This calculator handles both. Pick your method, add a row for each category or assignment, and see your current percent, letter grade and grade points update as you type.",
};

export const content: ToolContent = {
  seoTitle: "Grade Calculator: Work Out Your Course Grade From Assignments",
  howTo: [
    "Choose your grading method: weighted categories if your syllabus gives each category a percent of the course, or points based if every assignment is simply points earned out of points possible.",
    "For weighted categories, add one row per category with its name, your score percent in that category and its weight percent.",
    "For points mode, add one row per assignment or group with points earned and points possible.",
    "Use Add category or Add assignment for more rows, and Remove to delete a row you no longer need.",
    "Read your current percent, letter grade and GPA points in the results. In weighted mode the weights are normalised, so a partial set of categories still gives a fair current standing.",
  ],
  explanationTitle: "Weighted categories versus points: two different grade books",
  explanation: [
    "In a weighted course, not every category counts equally. A final exam worth 40 percent moves your grade four times as much as homework worth 10 percent, even if you score the same in both. The weighted result is found by multiplying each category score by its weight, adding those products, and dividing by the total weight entered. For example, a 92 in homework weighted at 20, an 88 in quizzes weighted at 20, an 84 in tests weighted at 40 and a 90 in a final weighted at 20 gives (92 times 20 plus 88 times 20 plus 84 times 40 plus 90 times 20) divided by 100, which is 87.6 percent, a B plus. Notice that plain averaging those four scores would give 88.5, which overstates the grade because it treats the weakest category, tests, as equal to the others when it actually counts double.",
    "In a points based course there are no weights at all. Your grade is simply total points earned divided by total points possible, times 100. A 10 point quiz and a 100 point exam still do not count equally, but for a different reason: the exam is worth ten times the points, so it naturally carries ten times the influence. Students often misjudge points courses early in the term, when only small assignments have been graded and a single low quiz looks alarming. As larger assignments land, the denominator grows and each early score matters less.",
    "The letter grade and grade points shown here use the standard plus and minus scale common in US schools: 97 and above is an A plus worth 4.0 points, 93 is an A, 90 is an A minus worth 3.7, and the scale steps down through B, C and D bands to an F below 60, worth 0 points. Individual schools adjust these cutoffs, round differently, or drop the lowest score in a category, so treat this result as an accurate estimate of your standing and check your syllabus for the exact policy that governs your official grade.",
  ],
  faqs: [
    {
      q: "What is the difference between weighted and points based grading?",
      a: "Weighted grading assigns each category a fixed share of the course, such as tests at 40 percent, regardless of how many points are in that category. Points based grading has no category shares: your grade is total points earned divided by total points possible, so bigger assignments count more only because they carry more points.",
    },
    {
      q: "My category weights do not add to 100 yet. Is the result still useful?",
      a: "Yes. The calculator normalises the weights you have entered, so the result is your average across the work included so far, weighted in the right proportions. It will shift as you add the remaining categories, especially a heavily weighted final exam.",
    },
    {
      q: "How do I find my score percent for a category?",
      a: "Add up your scores in that category and divide by the total possible for the category, then multiply by 100. For example, quiz scores of 8 out of 10, 9 out of 10 and 7 out of 10 give 24 out of 30, which is 80 percent for the quizzes category.",
    },
    {
      q: "What letter grade is 87.6 percent?",
      a: "On the standard scale used here, 87 to 89.9 percent is a B plus, worth 3.3 grade points. An 87.6 therefore sits in the B plus band, just below the A minus cutoff at 90.",
    },
    {
      q: "Does this calculator drop my lowest score?",
      a: "No. Some teachers drop the lowest quiz or homework score, which raises the category percent. If your course has a drop policy, work out that category percent with the dropped score removed, then enter the adjusted percent here.",
    },
  ],
};
