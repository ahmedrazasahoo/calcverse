import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Weighted Grade Calculator: Average Grades With Different Weights",
  metaDescription:
    "Free weighted grade calculator. Enter each grade percent with its weight and get the weighted result, letter grade and total weight, with a clear warning when weights do not add to 100.",
  intro:
    "When assignments do not all count equally, a plain average lies. Enter each grade with its weight and this calculator returns the true weighted result, the letter grade, and the total weight you entered, with a warning when that total is not yet 100 percent.",
};

export const content: ToolContent = {
  seoTitle: "Weighted Grade Calculator: Average Grades With Different Weights",
  howTo: [
    "Add one row for each graded item or category, with its grade percent and its weight percent.",
    "Add more rows with the Add row button, or remove rows you do not need.",
    "Check the total weight entered in the results. For a complete course it should reach 100 percent.",
    "Read the weighted grade and letter grade. If the total weight is not 100, read the warning too: the result is normalised, which is explained below the results.",
  ],
  explanationTitle: "Why weights change the answer, and what normalising means",
  explanation: [
    "A weighted average multiplies each grade by its weight before averaging, so important work pulls the result toward itself. Three grades of 92 weighted at 30, 85 weighted at 30 and 78 weighted at 40 give (92 times 30 plus 85 times 30 plus 78 times 40) divided by 100, which is 84.3 percent. The plain average of the same three grades is 85, which flatters the result because it ignores that the lowest grade carries the largest weight. This is exactly how most course syllabi, GPA systems and exam boards combine marks, which is why a single heavily weighted exam can outweigh a whole term of small assignments.",
    "Weights in a finished course add to 100, but mid course they often do not, because some categories have not happened yet. This calculator normalises in that case: it divides by the total weight you actually entered instead of by 100. With grades of 90 at weight 30 and 80 at weight 30, the normalised result is (2700 plus 2400) divided by 60, which is 85 percent. That is your true standing on the work included, in the correct proportions. It is not a prediction of your final grade, because the missing 40 percent could still be anything from 0 to 100.",
    "That distinction is the reason for the warning state. If you compare a normalised mid course result with a classmate who has entered all of their categories, you are not comparing like with like. Once your weights reach 100, normalising changes nothing and the result is the exact weighted course grade.",
  ],
  faqs: [
    {
      q: "How is a weighted grade calculated?",
      a: "Multiply each grade by its weight, add all of those products together, then divide by the total weight. For grades of 90 at 40 percent and 80 at 60 percent: (3600 plus 4800) divided by 100 equals 84 percent.",
    },
    {
      q: "What happens if my weights add to less than 100?",
      a: "The calculator normalises: it divides by the total weight entered rather than by 100, so the result reflects the work included in the right proportions. A warning appears because that result is your standing so far, not a complete course grade.",
    },
    {
      q: "Can weights add to more than 100?",
      a: "They can if extra credit is involved or if you entered proportions from different scales by mistake. The maths still normalises correctly, but it is worth checking the rows: in a standard syllabus the intended weights add to exactly 100.",
    },
    {
      q: "What is the difference between this and a plain average?",
      a: "A plain average treats every grade as equally important. A weighted average respects the stated importance of each item. The two only agree when all weights are equal or all grades are the same.",
    },
    {
      q: "Can I use this for GPA style weights, like credit hours?",
      a: "Yes, the same maths applies. Enter each course grade percent with its credit hours as the weight. The result is a credit weighted percent. To convert letter grades to the 4.0 GPA scale across courses, the GPA calculator on this site is the better fit.",
    },
  ],
};
