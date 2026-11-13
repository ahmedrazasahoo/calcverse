import type { ToolContent } from "@/lib/content";

export const content: ToolContent = {
  seoTitle: "GPA Calculator: Weighted GPA on the US 4.0 Scale",
  howTo: [
    "Each row is one course. Type the course name if you like, it is optional.",
    "Pick the letter grade you earned and enter the credit hours for that course.",
    "Use the Add a course button for more classes, or Remove to drop a row.",
    "Your weighted GPA updates instantly as you change anything.",
  ],
  explanationTitle: "How weighted GPA is calculated",
  explanation: [
    "Every letter grade carries grade points on the 4.0 scale: an A is worth 4.0, a B is 3.0, a C is 2.0, a D is 1.0 and an F is 0. Plus and minus grades sit in between, so a B+ is 3.3 and an A- is 3.7. Note that an A+ earns the same 4.0 as a plain A on the standard scale used here.",
    "A weighted GPA respects how many credit hours each course carries. Multiply each grade's points by the course credits, add those products together, then divide by the total credits. A four credit A and a one credit B give (4.0 x 4 + 3.0 x 1) / 5, which is 3.8, not the plain average of 3.5. Bigger courses pull the result more strongly, which is exactly how colleges compute it.",
    "To find the GPA you need for a target, work backwards: decide the total grade points your target requires across all credits, subtract the points you already have banked, and divide what remains by the credits still to come.",
  ],
  faqs: [
    {
      q: "What is a good GPA in college?",
      a: "A 3.0 is a solid B average and keeps most doors open. A 3.5 and above is strong, and 3.7 plus puts a student in honors territory at many schools. Requirements vary by program, so check what your own college or employer asks for.",
    },
    {
      q: "How do I raise my cumulative GPA?",
      a: "Focus on the courses with the most credits still ahead of you, since they move the average the most. Retaking a failed course also helps at schools that replace the old grade, which is worth checking in your student handbook.",
    },
    {
      q: "Does an F hurt more than an A helps?",
      a: "Yes, in a weighted average it does. An F adds zero points but its credits still count in the denominator, dragging the whole figure down. It takes several strong grades in similar credit courses to balance one F.",
    },
    {
      q: "What is the difference between weighted and unweighted GPA in high school?",
      a: "Unweighted GPA treats every class equally on the 4.0 scale. High school weighted GPA gives extra points for honors and AP classes, sometimes up to 5.0. This calculator uses the standard unweighted college style 4.0 scale.",
    },
    {
      q: "How do I convert my percentage grades to a GPA?",
      a: "A common mapping is 93 to 100 percent equals an A, 90 to 92 an A-, 87 to 89 a B+, and so on down in roughly three point steps. Your school's own table takes priority, since boundaries differ between institutions.",
    },
    {
      q: "Can I use this for a single semester?",
      a: "Yes. Enter only this semester's courses for your semester GPA. For a cumulative figure, enter every graded course from every semester, or combine semester totals weighted by their credits.",
    },
  ],
};
