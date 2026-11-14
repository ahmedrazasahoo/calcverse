import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Long Division Calculator: Quotient, Remainder and Step by Step Working",
  metaDescription:
    "Free long division calculator with full steps. Divide any whole numbers and see each stage written in words: how many times the divisor goes in, the multiply, the subtract and the bring down, plus a decimal mode.",
  intro:
    "Long division stops being mysterious when every stage is written out in words. Enter the two numbers and follow the classic cycle: divide, multiply, subtract, bring down, until the quotient and remainder are complete, or switch to decimal mode to keep going past the point.",
};

export const content: ToolContent = {
  seoTitle: "Long Division Calculator: Quotient, Remainder and Step by Step Working",
  howTo: [
    "Enter the number being divided (the dividend) and the number you are dividing by (the divisor). The divisor must be positive and never zero.",
    "Choose quotient and remainder style for the classic school answer, or decimal style to continue past the decimal point.",
    "In decimal style, set how many decimal places you want, up to 10.",
    "Read the quotient and remainder cards, then follow the numbered steps: each one states the partial dividend, how many times the divisor goes in, the product and the subtraction.",
    "Use the check line at the end: divisor times quotient plus remainder should give back your starting number.",
  ],
  explanationTitle: "The long division cycle, one digit at a time",
  explanation: [
    "Long division answers a big question by asking a series of small ones. Instead of asking how many 7s make 945, it works through the digits from the left: 7 goes into 9 once, leaving 2; bring down the 4 to make 24, and 7 goes into 24 three times, leaving 3; bring down the 5 to make 35, and 7 goes in exactly five times. The quotient digits 1, 3 and 5 line up to give 135 with nothing left over. Every long division, however large, is that same four beat cycle repeated: divide, multiply, subtract, bring down.",
    "The remainder is whatever survives the final subtraction when no digits are left to bring down, and it must always be smaller than the divisor, because if it were not, the divisor would go in at least once more. That gives a built in check for any long division: divisor times quotient plus remainder must rebuild the original number, so 7 times 3 plus 1 correctly rebuilds 22. In decimal mode the cycle simply continues: the remainder is multiplied by ten, treated as a new partial dividend, and each pass adds one more digit after the point, which is how 10 divided by 3 produces 3.333 with a remainder of 1 still waiting.",
    "Two sign and safety rules keep the method tidy. The divisor here must be positive, and dividing by zero is impossible rather than merely hard: there is no number of groups of size zero that rebuilds anything. A negative dividend is fine, though: the working is done on its size and the minus sign returns to the quotient and remainder at the end, so negative 7 divided by 2 gives quotient negative 3 and remainder negative 1, and the check still holds because 2 times negative 3 plus negative 1 is negative 7.",
  ],
  faqs: [
    {
      q: "What is 945 divided by 7 with all the steps?",
      a: "7 goes into 9 once (remainder 2), into 24 three times (remainder 3), and into 35 exactly five times. The quotient is 135 and the remainder is 0, so 7 times 135 is exactly 945.",
    },
    {
      q: "What does the remainder mean?",
      a: "It is what is left over after making as many full groups as possible. Sharing 7 sweets among 2 children gives each child 3 with 1 left over: quotient 3, remainder 1. A remainder must always be smaller than the divisor.",
    },
    {
      q: "How do you keep dividing past the decimal point?",
      a: "When the whole part is done, multiply the remainder by 10 and keep going: each extra pass produces one more decimal digit. Switch this calculator to decimal style and 10 divided by 3 shows 3.333 to three places, with the remainder of 1 still going.",
    },
    {
      q: "Why can you not divide by zero?",
      a: "Division asks how many groups of the divisor rebuild the dividend. No number of groups of size zero can rebuild anything except zero itself, and for zero even that question has every possible answer, so mathematicians leave division by zero undefined.",
    },
    {
      q: "How can I check a long division answer?",
      a: "Multiply the divisor by the quotient and add the remainder. If the total equals the number you started with, the division is right. For example, 2 times 3 plus 1 equals 7, confirming 7 divided by 2 is 3 remainder 1.",
    },
  ],
};
