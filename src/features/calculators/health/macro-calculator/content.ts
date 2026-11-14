import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Macro Calculator: Daily Calories, Protein, Carbs and Fat in Grams",
  metaDescription:
    "Free macro calculator using the Mifflin St Jeor equation. Get your daily calorie target for losing, maintaining or gaining weight, split into protein, carb and fat grams for balanced, high protein, low carb, keto or custom diets.",
  intro:
    "Work out your daily calorie target from your body stats, activity level and goal, then split it into grams of protein, carbohydrates and fat using a preset diet style or your own custom percentages.",
};

export const content: ToolContent = {
  seoTitle: "Macro Calculator: Daily Calories, Protein, Carbs and Fat in Grams",
  howTo: [
    "Enter your sex, age, weight and height. You can switch weight between kilograms and pounds and height between centimetres and feet and inches.",
    "Pick the activity level that best matches a typical week, from sedentary at 1.2 up to athlete level at 1.9.",
    "Choose your goal: lose, which subtracts 500 calories a day with a safety floor, maintain, or gain, which adds 300 calories a day.",
    "Pick a diet preset, or choose Custom and move the three sliders until the percentages add up to exactly 100.",
    "Read your daily calories and the grams and calorie share for protein, carbohydrates and fat.",
  ],
  explanationTitle: "How calories and macros are calculated",
  explanation: [
    "Everything starts with your basal metabolic rate, the energy your body uses at complete rest. This calculator uses the Mifflin St Jeor equation, widely regarded as the most accurate simple estimate: for men it is 10 times weight in kilograms, plus 6.25 times height in centimetres, minus 5 times age, plus 5; for women the final constant is minus 161 instead. A 30 year old man at 80 kg and 180 cm has a BMR of 1,780 calories. Multiplying by an activity factor, 1.2 for sedentary work up to 1.9 for athletes, gives total daily energy expenditure: 2,759 calories at the moderate factor of 1.55.",
    "The goal adjustment is deliberately modest. Losing subtracts 500 calories a day, about 3,500 a week, which lines up with roughly half a kilogram of weight change per week, and the target is never allowed to drop below 1,200 calories. Gaining adds 300 a day to favour lean progress without excessive fat gain. The calorie total is then split by percentage: protein and carbohydrates provide 4 calories per gram and fat provides 9, so a 30 percent protein share of 2,759 calories is 828 calories, or about 207 grams of protein. Presets cover the common styles: Balanced at 40 percent carbs, 30 protein, 30 fat; High Protein at 30, 40, 30; Low Carb at 20, 40, 40; and Keto at 5, 25, 70.",
    "Treat the result as a starting point, not a prescription. The Mifflin equation is an estimate that can be off by 10 percent or more for an individual, and real needs shift with muscle mass, health conditions, medication and training. Track your weight trend for two to three weeks and adjust by 100 to 200 calories if it is not moving the way you intended. Anyone pregnant, under 18, or managing a medical condition such as diabetes or kidney disease should get personalised advice from a registered dietitian or clinician instead of following a calculator target.",
  ],
  faqs: [
    {
      q: "What is a good macro split for losing weight?",
      a: "A higher protein split helps protect muscle in a deficit. The High Protein preset at 30 percent carbs, 40 percent protein and 30 percent fat is a popular starting point, paired here with a 500 calorie daily reduction from your maintenance level.",
    },
    {
      q: "How many grams of protein do I get on the balanced preset?",
      a: "Thirty percent of your calories divided by 4. At 2,000 calories that is 600 calories of protein, or 150 grams a day. At 2,759 calories it is about 207 grams.",
    },
    {
      q: "Why do my custom percentages show an error?",
      a: "The three percentages must add up to exactly 100, because they are shares of one calorie total. If they add to 90 or 110, the grams shown would not match your calorie target, so the calculator flags it until the sliders total 100.",
    },
    {
      q: "Is the Mifflin St Jeor equation accurate?",
      a: "It is the most accurate of the common estimation formulas for most adults, but it is still an estimate. Individual results vary, so use the number as a starting point and adjust based on your real weight trend over a few weeks.",
    },
    {
      q: "What does the 1200 calorie floor mean?",
      a: "If subtracting 500 calories for a weight loss goal would take the target below 1,200 calories a day, the calculator holds it at 1,200. Very low calorie diets carry real health risks and should only be followed under medical supervision.",
    },
  ],
};
