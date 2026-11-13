import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free BMR calculator with the Mifflin St Jeor, Harris Benedict and Katch McArdle formulas side by side, so you can see how many calories your body burns at rest.";

export const intro =
  "Your basal metabolic rate is the energy your body spends just staying alive. This page calculates it with three published formulas and shows them side by side, because no single equation is right for everybody.";

export const disclaimer =
  "This calculator gives a general estimate for adults. It is not medical advice. Talk to your doctor or a registered dietitian for guidance about your own health.";

export const content: ToolContent = {
  seoTitle: "BMR Calculator: Basal Metabolic Rate by Three Trusted Formulas",
  howTo: [
    "Enter your sex, age, weight and height in metric or imperial units.",
    "Pick a formula. Mifflin St Jeor is the best default for most adults.",
    "If you know your body fat percentage, add it to unlock the Katch McArdle result, which works from lean mass instead of total weight.",
    "Compare the figures. The spread between formulas is a fair picture of the uncertainty in any single estimate.",
  ],
  explanationTitle: "How BMR is calculated, and why formulas disagree",
  explanation: [
    "BMR is measured in a laboratory by tracking oxygen use in a person who is awake, rested, warm and fasted. Nobody does that for a quick estimate, so researchers built equations from large groups of measured people. Mifflin St Jeor, published in 1990, predicts measured BMR within about 10 percent for most non obese adults and is the equation the Academy of Nutrition and Dietetics recommends first.",
    "The Harris Benedict equations are older, from 1919 and a 1984 revision, and tend to read a little high on modern bodies. Katch McArdle takes a different route: instead of guessing from total weight, it multiplies your lean body mass by 21.6 and adds 370. Two people of the same weight but different body fat get different answers from Katch McArdle, which is exactly the point, because muscle burns more energy at rest than fat does.",
    "Whichever figure you use, remember what it leaves out. BMR is only the cost of staying alive. Eating, walking, working and training all come on top, so your real daily burn is BMR multiplied by an activity factor, which is what a TDEE or calorie calculator adds.",
  ],
  faqs: [
    {
      q: "Which BMR formula is the most accurate?",
      a: "For most adults, Mifflin St Jeor. Studies comparing equations against measured BMR find it lands within 10 percent most often. If you know your body fat percentage accurately, Katch McArdle can be better still, because lean mass is the main driver of resting energy use.",
    },
    {
      q: "What is the difference between BMR and RMR?",
      a: "Resting metabolic rate is measured under slightly looser conditions than basal metabolic rate, without the strict overnight fast and full rest protocol. RMR usually reads a few percent higher. In everyday use, including on this site, the two terms point at the same idea: calories burned doing nothing.",
    },
    {
      q: "Should I eat exactly my BMR in calories?",
      a: "No. BMR excludes all activity, digestion and movement, so eating at BMR almost always means eating too little. It is a floor for calculations, not a diet target. Daily needs are found by multiplying BMR by an activity factor first.",
    },
    {
      q: "Why does BMR fall as I get older?",
      a: "Mainly because adults gradually lose muscle mass, and muscle is expensive tissue to maintain. The equations capture this with the age term, which subtracts a few calories per year of age. Strength training and staying active slow the decline in real life.",
    },
    {
      q: "Can BMR be raised?",
      a: "Yes, modestly. Adding muscle through resistance training raises lean mass, which raises resting burn. The effect per kilogram of muscle is real but small, roughly 13 kcal a day, so think of it as a long term investment rather than a quick fix.",
    },
  ],
};
