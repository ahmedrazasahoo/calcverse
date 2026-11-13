import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free CGPA to percentage calculator using the CBSE formula of CGPA times 9.5. Convert between CGPA, percentage and the 4.0 GPA scale, and combine semester SGPAs.";

export const intro =
  "Converting a CGPA into a percentage sounds like one multiplication, and for CBSE students it is: CGPA times 9.5. This page handles that, the reverse, conversions to the US 4.0 scale, and the trickier job of merging semester SGPAs into one CGPA.";

export const content: ToolContent = {
  seoTitle: "CGPA to Percentage Calculator: CBSE 9.5 Formula, 4.0 Scale and SGPA Combiner",
  howTo: [
    "For a straight conversion, choose what you have and what you need: CGPA, percentage or 4.0 GPA.",
    "Enter your grade and read the converted value instantly.",
    "To combine semesters, scroll to the semester section and add each SGPA with its credit count. Semesters carrying more credits count for more.",
    "When a form asks for your percentage and your university issued only a CGPA, this CBSE style conversion is the one most Indian application forms expect.",
  ],
  explanationTitle: "Where the 9.5 multiplier comes from",
  explanation: [
    "When CBSE moved to grading, it needed a bridge back to the percentages that colleges and employers understood. The board compared years of results and found that a student's percentage was, on average, close to their CGPA multiplied by 9.5. It is an empirical fit, not a law of mathematics, and CBSE itself describes the result as an indicative percentage rather than an exact equivalent. A CGPA of 10 therefore converts to 95 percent, not 100, which surprises people until they remember the top grade band starts well below a perfect score.",
    "Most Indian universities on a 10 point scale publish the same 9.5 formula in their ordinances, but not all. A few use 9.0, some use their own tables, and a handful forbid conversion entirely and mark applications as CGPA only. If a conversion decides something important, like eligibility cutoffs, check the exact formula printed on the back of your marksheet or in your university regulations. That document outranks any calculator, including this one.",
    "The 4.0 scale used in the United States works differently again: it is built from letter grades, where an A is 4.0 and each step down drops by fractions. There is no official bridge between a 10 point CGPA and a 4.0 GPA. The conversion here passes through percentage and maps linearly, which is a reasonable estimate for your own planning. For real applications, many universities abroad ask you not to convert at all and to report your CGPA exactly as issued.",
  ],
  faqs: [
    {
      q: "What is the formula to convert CGPA to percentage?",
      a: "For CBSE and most Indian universities: percentage equals CGPA multiplied by 9.5. So a CGPA of 8.5 becomes 80.75 percent. To go the other way, divide the percentage by 9.5: 76 percent is a CGPA of 8.0.",
    },
    {
      q: "Why is a 10 CGPA only 95 percent and not 100?",
      a: "Because the conversion is statistical, not proportional. The top CGPA band covers a range of high marks, and its typical percentage works out near 95. The 9.5 factor reflects where students in each band actually scored across years of board results.",
    },
    {
      q: "How do I combine my semester SGPAs into a final CGPA?",
      a: "Weight each SGPA by its semester credits, add the products, and divide by the total credits. Two semesters of 9.0 (20 credits) and 7.0 (30 credits) combine to 7.8, not the simple average of 8.0, because the weaker semester carried more credits. The combiner below does this for you.",
    },
    {
      q: "Is the 9.5 formula valid for every university?",
      a: "No. It is the CBSE standard and the most common university formula, but some institutions use different multipliers or conversion tables. Your marksheet or university ordinance is the authority. If they print a formula, use theirs.",
    },
    {
      q: "How does CGPA convert to the US 4.0 GPA scale?",
      a: "There is no official conversion. A rough linear estimate goes through percentage: CGPA times 9.5 gives a percentage, and dividing by 25 gives a 4.0 scale figure, so 8.5 CGPA is about 3.23. Many US universities prefer the original CGPA and convert internally using their own country guides.",
    },
  ],
};
