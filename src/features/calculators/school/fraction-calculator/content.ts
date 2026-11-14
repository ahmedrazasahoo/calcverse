import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Fraction Calculator: Add, Subtract, Multiply and Divide Fractions With Steps",
  metaDescription:
    "Free fraction calculator for fractions and mixed numbers. Add, subtract, multiply and divide with the answer simplified, shown as a mixed number and a decimal, with full step by step working.",
  intro:
    "Fractions get much easier when every step is visible. Enter two fractions or mixed numbers, pick the operation, and see the answer simplified three ways, with the working laid out line by line the way it is taught in class.",
};

export const content: ToolContent = {
  seoTitle: "Fraction Calculator: Add, Subtract, Multiply and Divide Fractions With Steps",
  howTo: [
    "Fill in the first fraction: a whole part (use 0 for a plain fraction), a top number and a bottom number.",
    "Pick the operation: add, subtract, multiply or divide.",
    "Fill in the second fraction the same way. For a negative mixed number such as negative 1 1/2, put the minus sign on the whole part.",
    "Read the answer as a mixed number, as an improper fraction and as a decimal, then follow the numbered working to see exactly how it was reached.",
  ],
  explanationTitle: "The rules behind fraction arithmetic",
  explanation: [
    "Adding and subtracting need a shared bottom number, because you can only combine pieces that are the same size. The calculator finds the smallest common denominator, rescales both fractions to match it, then adds or subtracts the top numbers while the bottom stays put. Multiplying and dividing need no common denominator at all: multiplication goes straight across, top times top and bottom times bottom, while division flips the second fraction upside down and then multiplies, which is why dividing by a half doubles a quantity instead of halving it.",
    "Mixed numbers are handled by converting first. A mixed number like 1 1/2 becomes the improper fraction 3/2, all the arithmetic happens in that form, and the answer is converted back at the end by dividing the top by the bottom: the quotient becomes the whole part and the remainder stays on top. Simplifying uses the greatest common divisor, the largest number that divides both the top and the bottom evenly, so 6/12 collapses to 1/2 in one step.",
    "The step list matters as much as the answer. Homework, exams and real marking schemes award credit for method, and the most common fraction mistakes are easy to spot in written working: adding the bottoms together, forgetting to flip before dividing, or leaving an answer unsimplified. Checking your own lines against the steps here is a quick way to catch which rule slipped.",
  ],
  faqs: [
    {
      q: "How do you add fractions with different denominators?",
      a: "Find a common denominator first, usually the smallest number both denominators divide into. Rescale each fraction to that denominator, add the top numbers, keep the denominator, then simplify. For example, 1/2 plus 2/3 becomes 3/6 plus 4/6, which is 7/6 or 1 1/6.",
    },
    {
      q: "Why do you flip the second fraction when dividing?",
      a: "Dividing by a fraction asks how many of those pieces fit into the first number. Flipping turns the question into a multiplication that answers it: 1/2 divided by 1/4 asks how many quarters fit in a half, and 1/2 times 4/1 gives 2, which is correct.",
    },
    {
      q: "What is the difference between a mixed number and an improper fraction?",
      a: "They are two writings of the same value. A mixed number splits out the whole part, like 2 1/6. An improper fraction keeps everything on top, like 13/6, where the top number is bigger than the bottom. Mixed numbers are easier to picture; improper fractions are easier to calculate with.",
    },
    {
      q: "How does simplifying a fraction work?",
      a: "Divide the top and bottom by the greatest common divisor, the biggest number that divides both exactly. For 6/12 that number is 6, giving 1/2. A fraction is fully simplified when the only number that divides both parts is 1.",
    },
    {
      q: "How do I enter a negative fraction?",
      a: "Put the minus sign on the whole part for a mixed number, so negative 1 1/2 is whole -1, top 1, bottom 2. For a plain fraction with no whole part, put the minus on the top number instead.",
    },
  ],
};
