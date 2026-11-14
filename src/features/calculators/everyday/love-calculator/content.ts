import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Love Calculator: A Playful Name Compatibility Score",
  metaDescription:
    "Type in two names and get a playful compatibility percentage, a light hearted verdict and the letters your names share. Pure entertainment, with the same pair always scoring the same.",
  intro:
    "Two names go in, a percentage comes out, and nobody should plan a wedding or a breakup around it. This love calculator turns your names into a stable, playful score, adds a verdict, and shows the letters you share. It is a bit of fun, nothing more.",
};

export const content: ToolContent = {
  seoTitle: "Love Calculator: A Playful Name Compatibility Score",
  howTo: [
    "Type the first name into the first box and the second name into the second box.",
    "If you like, add both birth dates. They become part of the playful maths, so the score can change.",
    "Read the percentage, the verdict band and the little line that goes with it.",
    "Check the shared letters card for the letters both names have in common, then try swapping the order to confirm the score stays put.",
  ],
  explanationTitle: "How this playful score is worked out",
  explanation: [
    "The calculator tidies both names first, trimming spaces, lowercasing them and removing anything that is not a letter. It then sorts the two names, so Alex and Jordan gives exactly the same answer as Jordan and Alex, and runs the pair through a standard string hash. The percentage is what is left when that hash is divided by 101. Because the method is fixed, the same pair always produces the same score, today, tomorrow and on any device.",
    "If both birth dates are added, they join the hash input too, again in sorted order. That makes the score a touch more personal to the pair, although it does not make it any more scientific. The verdict bands simply translate the number into words, from early days at the low end to written in the stars at the top.",
    "It is worth saying plainly: no name game can measure a real relationship. Compatibility lives in kindness, honesty, timing and a thousand small choices, none of which fit inside a percentage. Treat a high score as a smile and a low one as a joke you share, and this little tool has done its job.",
  ],
  faqs: [
    {
      q: "Is the love calculator accurate?",
      a: "No, and it does not pretend to be. It is a deterministic name game for entertainment. The score is worked out from the letters in two names with a fixed formula, so it is consistent, but consistency is not the same as truth about any real relationship.",
    },
    {
      q: "Why does the same pair always get the same score?",
      a: "Because there is no randomness in it. The names are tidied, sorted and hashed with a fixed method, so identical inputs always produce identical outputs. Swapping the order of the names also changes nothing, because the pair is sorted before the maths happens.",
    },
    {
      q: "What do the birth dates change?",
      a: "When both birth dates are provided, they are folded into the hash alongside the names. That usually shifts the percentage and can move the pair into a different verdict band. With only one date, or none, the score is based on the names alone.",
    },
    {
      q: "What are shared letters?",
      a: "The distinct letters that appear in both names. Anna and Alan share a and n, for example. It is a small extra detail for fun, and a surprisingly good conversation starter about how different two names can look while using many of the same letters.",
    },
    {
      q: "Can a low score mean a relationship will not work?",
      a: "Not at all. A low score only means the letters in those two names produced a small number under this playful formula. Plenty of happy couples would score low here, and the tool has no way of knowing anything about the actual people behind the names.",
    },
  ],
};
