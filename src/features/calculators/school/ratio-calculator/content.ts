import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Ratio Calculator: Simplify, Scale and Solve Missing Values",
  metaDescription:
    "Simplify two and three part ratios, scale a ratio to a target total, and solve for the missing value in a proportion, with instant results.",
  intro:
    "A ratio is a recipe for sharing: it says how a whole splits into parts, whether that whole is pocket money, a cake mix or a map scale. This page does the three jobs ratios demand most often. It simplifies them, stretches or shrinks them to fit a target, and finds the missing number in a proportion.",
};

export const content: ToolContent = {
  seoTitle: "Ratio Calculator: Simplify, Scale and Solve Missing Values",
  howTo: [
    "Pick your job at the top: simplify a ratio, scale one up or down, or find a missing value in a proportion.",
    "For simplifying, choose two or three parts, type them in, and read the smallest whole number version plus the 1 to n form.",
    "For scaling, enter the parts, choose whether the parts should add up to a target total or the first part should hit a target, then type that target.",
    "For a missing value, fill in a, b and c of the proportion a : b = c : x and read x, worked out as b times c divided by a.",
    "Check any answer by reducing both sides. If they reduce to the same ratio, the answer is right.",
  ],
  explanationTitle: "What a ratio really tells you",
  explanation: [
    "A ratio compares parts to each other, not to the whole. Juice mixed at 2 : 3 means two measures of concentrate for every three of water, and the actual amounts can be tiny or huge as long as that relationship holds. Simplifying works like simplifying a fraction: find the largest number that divides every part, the greatest common divisor, and divide through. A ratio of 12 : 18 divides by 6 to become 2 : 3. Decimal parts are no obstacle either, because multiplying every part by ten or a hundred first does not change the relationship, it only clears the decimal points.",
    "Scaling is simplifying run in reverse. If a recipe for 2 : 3 must serve a total of 100 grams, the parts share 5 equal units, so each unit is worth 20 and the scaled ratio is 40 : 60. The same move enlarges a photo without stretching it, converts a map distance using its scale, and divides an inheritance or a restaurant bill in agreed shares. The rule that keeps everything fair is simple: whatever factor multiplies one part must multiply them all.",
    "The missing value tool handles proportions, where two ratios are declared equal, written a : b = c : x. Cross multiplying gives x equals b times c divided by a, so 3 : 4 = 9 : x solves to 12. Proportions quietly power a lot of practical maths: currency exchange, unit prices at the supermarket, similar triangles in geometry, and working out how much paint covers a bigger wall. If your solved value looks wild, sanity check it against the original ratio. In 3 : 4 the second part is the bigger one, so x had better come out bigger than 9, and 12 passes that test.",
  ],
  faqs: [
    {
      q: "How do I simplify a ratio?",
      a: "Divide every part by the greatest common divisor of all the parts. For 12 : 18 the divisor is 6, giving 2 : 3. If a part has decimals, multiply everything by 10, 100 or 1000 first to clear them, then divide as usual.",
    },
    {
      q: "What does the 1 : n form mean?",
      a: "It rewrites the ratio so the first part is exactly 1, which makes comparisons easy. A ratio of 2 : 3 becomes 1 : 1.5, and 4 : 10 becomes 1 : 2.5. Map scales and exchange rates are usually quoted in this form.",
    },
    {
      q: "How do I split an amount in a given ratio?",
      a: "Add the parts to find how many shares there are, divide the amount by that total to get one share, then multiply back out. Splitting 100 in the ratio 2 : 3 means 5 shares of 20, so the split is 40 and 60. The scale tool on this page does it in one step.",
    },
    {
      q: "How do I solve a proportion with a missing value?",
      a: "For a : b = c : x, multiply b by c and divide by a. With 3 : 4 = 9 : x that is 4 times 9 divided by 3, which is 12. Both ratios now reduce to 3 : 4, confirming the answer.",
    },
    {
      q: "Can a ratio have three parts?",
      a: "Yes. Three part ratios like 2 : 3 : 5 are common in recipes, concrete mixes and profit sharing. They simplify, scale and split in exactly the same way, just with one extra part carried through every step.",
    },
  ],
};
