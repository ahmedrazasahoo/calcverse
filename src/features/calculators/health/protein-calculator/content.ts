import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Protein Calculator: How Much Protein Do You Need Per Day?",
  metaDescription:
    "Free protein calculator. Enter your weight and activity level to get your recommended daily protein in grams, a sensible range, and a per meal split for 3, 4 or 5 meals.",
  intro:
    "Enter your body weight and how you train, and this calculator gives you a recommended daily protein target in grams, a sensible range around it, and an easy per meal split.",
};

export const content: ToolContent = {
  seoTitle: "Protein Calculator: How Much Protein Do You Need Per Day?",
  howTo: [
    "Enter your body weight in kilograms or pounds.",
    "Pick the activity and goal option that matches you, from sedentary through to strength and muscle building.",
    "Read your recommended grams of protein per day and the range either side of it.",
    "Use the per meal split to spread the total across 3, 4 or 5 meals, whichever fits your day.",
  ],
  explanationTitle: "How protein needs are worked out",
  explanation: [
    "Protein targets are set per kilogram of body weight, because a heavier body has more tissue to maintain and repair. The baseline for a sedentary adult is 0.8 grams per kilogram, the widely used minimum to avoid deficiency. Needs rise with training load: about 1.0 for lightly active people, 1.2 for regular training, 1.4 for endurance athletes, and around 1.8 for people focused on strength and building muscle. Research on maximising muscle protein synthesis points to roughly 2.2 grams per kilogram as a practical upper end, beyond which extra protein adds calories without clear extra benefit for most people. A 70 kg active person at 1.2 therefore lands on 84 grams a day, with a sensible range of 70 to 98 grams.",
    "The range matters more than a single magic number. This calculator shows the recommendation plus a band built by shifting the factor down 0.2 (never below the 0.8 floor) and up 0.2, because day to day intake naturally varies and hitting the band consistently beats chasing one exact figure. Spreading protein across meals also helps: the per meal split simply divides your daily total by 3, 4 or 5 meals, landing near the 20 to 40 grams per meal that studies find practical for stimulating muscle repair through the day.",
    "This is general nutrition information, not medical advice. People with kidney disease or other medical conditions are often told to follow a specific protein intake by their clinician, and that instruction always overrides a calculator. Protein needs are also higher during pregnancy, recovery from illness or injury, and for older adults fighting muscle loss, so those situations deserve individual professional guidance.",
  ],
  faqs: [
    {
      q: "How much protein does a 70 kg person need?",
      a: "It depends on activity. At 70 kg: about 56 grams a day if sedentary (0.8 g per kg), 84 grams if active (1.2), 98 grams for endurance training (1.4), and about 126 grams for strength and muscle building (1.8).",
    },
    {
      q: "Is 2.2 grams per kilogram too much?",
      a: "For healthy adults it is generally considered a safe upper end of the evidence based range, but it is rarely necessary. Most lifters do well between 1.6 and 2.2 grams per kilogram, and going beyond 2.2 has not shown clear extra muscle benefit in studies.",
    },
    {
      q: "Should I count protein per kilogram or per pound?",
      a: "Either works if you use the matching factor. The factors here are per kilogram; per pound they are roughly 0.36 sedentary, 0.55 active and 0.82 for muscle building. This calculator shows your grams per pound of body weight alongside the daily total.",
    },
    {
      q: "How much protein should I eat per meal?",
      a: "Dividing your daily target across your meals is a good approach. For an 84 gram target that is about 28 grams across 3 meals, 21 grams across 4 meals, or about 17 grams across 5 meals.",
    },
    {
      q: "Can too much protein damage kidneys?",
      a: "In people with healthy kidneys, intakes in the ranges shown here have not been shown to cause kidney damage. If you have kidney disease or any condition where protein is restricted, follow your clinician's advice instead of this calculator.",
    },
  ],
};
