import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free calorie calculator that finds your maintenance calories and daily targets to lose, maintain or gain weight, adjusted for your activity level.";

export const intro =
  "Tell this calculator a little about yourself and it works out how many calories you burn in a day, then turns that into plain daily targets for losing, holding or gaining weight.";

export const disclaimer =
  "This calculator gives a general estimate for adults. It is not medical advice. Very low calorie diets should only be followed with medical supervision, and anyone with an eating disorder history should talk to a professional before using calorie targets.";

export const content: ToolContent = {
  seoTitle: "Calorie Calculator: Daily Calories to Lose, Maintain or Gain Weight",
  howTo: [
    "Enter your sex, age, weight and height, in metric or imperial units.",
    "Choose the activity level that honestly matches a normal week, not your best week.",
    "Read your maintenance figure first. That is the intake where your weight should stay roughly steady.",
    "Pick a goal row. The gentler targets are slower but far easier to live with, and they protect muscle while you lose fat.",
  ],
  explanationTitle: "Where these calorie targets come from",
  explanation: [
    "The calculation starts with the Mifflin St Jeor equation, which estimates your basal metabolic rate from sex, age, weight and height. That resting figure is multiplied by an activity factor between 1.2 for a desk bound day and 1.9 for an athlete in heavy training. The result, often called TDEE, is your maintenance level: eat that much and your weight should hold steady, give or take normal daily fluctuation.",
    "Weight change targets then step away from maintenance in fixed amounts. A gap of about 500 kcal a day adds up to roughly 3,500 kcal a week, close to the energy stored in half a kilogram of body fat, so the table can promise about that pace. Smaller steps of 250 kcal suit smaller bodies and patient people; the 1,000 kcal fast step is aggressive and is capped here so it never pushes anyone below 1,200 kcal a day.",
    "Treat the first fortnight as calibration. Weigh yourself a few times a week, average the readings, and compare the trend with the prediction. If you are losing much faster or slower than the table says, your real maintenance is simply a bit different from the estimate, and nudging the target by 100 to 200 kcal usually fixes it.",
  ],
  faqs: [
    {
      q: "How many calories should I eat to lose weight?",
      a: "Start about 500 kcal below your maintenance figure for a loss of roughly half a kilogram a week. If you are smaller, older or already lean, a 250 kcal gap is kinder and nearly as effective over time. Avoid dropping below 1,200 kcal a day without medical supervision.",
    },
    {
      q: "Why did my weight jump up after one big meal?",
      a: "Mostly water. A salty, carb heavy meal refills glycogen stores, and each gram of glycogen holds about three grams of water. The scale can swing by one to two kilograms in a day without any change in body fat. Judge progress by weekly averages, never by single mornings.",
    },
    {
      q: "Do I need to eat back calories burned in exercise?",
      a: "Not if your activity level already describes your training, because those calories are inside the maintenance figure. Only add food back when you do something far beyond your normal week, like a long hike or a race day.",
    },
    {
      q: "What if I stop losing weight on the same calories?",
      a: "Plateaus are normal. As you get lighter, maintenance falls, because a smaller body costs less to run. Recalculate with your new weight every few kilograms lost. Also check the quiet calories: cooking oils, drinks and weekend meals are the usual suspects.",
    },
    {
      q: "How many calories do I need to gain muscle?",
      a: "A small surplus of 250 to 500 kcal a day, enough protein (about 1.6 grams per kilogram of body weight), and progressive resistance training. Bigger surpluses mostly add fat, because muscle grows slowly even under ideal conditions.",
    },
  ],
};
