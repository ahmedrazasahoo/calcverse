import type { ToolContent } from "@/lib/content";

export const content: ToolContent = {
  seoTitle: "TDEE Calculator: Daily Calorie Needs for Loss, Maintenance and Gain",
  howTo: [
    "Choose your sex and the unit system you prefer, metric or imperial.",
    "Enter your age, current weight and height.",
    "Pick the activity level that honestly matches a normal week, not your best week.",
    "Read your TDEE at the top, then use the lose or gain figure below it as your daily calorie target.",
  ],
  explanationTitle: "How TDEE is calculated",
  explanation: [
    "TDEE stands for Total Daily Energy Expenditure. It is the full number of calories your body burns in 24 hours, covering everything from breathing and digestion to walking, working and training. If you eat close to this number, your weight stays roughly the same. Eat below it and you lose weight, eat above it and you gain.",
    "This calculator starts with your BMR (Basal Metabolic Rate) using the Mifflin-St Jeor equation, which research has found to be the most accurate of the common formulas for healthy adults. For men the formula is 10 x weight in kg, plus 6.25 x height in cm, minus 5 x age, plus 5. For women it is the same, except the final step subtracts 161 instead of adding 5.",
    "Your BMR is then multiplied by an activity factor between 1.2 (sedentary) and 1.9 (athlete level) to give your TDEE. The weight change targets subtract or add 500 calories a day, which works out to roughly half a kilogram, about one pound, of body weight change per week. The macro split shown uses a balanced 30 percent protein, 40 percent carbohydrate and 30 percent fat distribution, converted at 4 calories per gram for protein and carbs and 9 per gram for fat.",
  ],
  faqs: [
    {
      q: "What is the difference between BMR and TDEE?",
      a: "BMR is what your body would burn lying in bed all day doing nothing. TDEE is BMR plus every bit of movement and activity in your real day, so TDEE is always the higher number, and it is the one you should base your eating on.",
    },
    {
      q: "How accurate is this TDEE calculator?",
      a: "The Mifflin-St Jeor formula typically lands within about 10 percent of measured values for healthy adults. Treat the result as a strong starting estimate, then adjust by 100 to 200 calories after two or three weeks based on what your weight actually does.",
    },
    {
      q: "How many calories should I cut to lose weight safely?",
      a: "A deficit of around 500 calories a day, roughly one pound a week, is a widely used and sustainable target. Very large deficits are harder to maintain and can cost muscle, energy and consistency. Anyone with a medical condition should talk to a doctor or dietitian first.",
    },
    {
      q: "Should I eat back the calories I burn exercising?",
      a: "Not on top of this calculator. Your activity level already includes your exercise, so eating back workout calories as well would count them twice and quietly erase your deficit.",
    },
    {
      q: "Why did my TDEE go down as I lost weight?",
      a: "A smaller body needs less energy to run and to move. That is normal and expected. Recalculate every 5 to 10 kilograms of change so your target keeps matching your current body.",
    },
    {
      q: "Can I build muscle and lose fat at the same time?",
      a: "Beginners and people returning after a break often can, eating near maintenance with high protein and progressive strength training. Experienced lifters usually do better choosing one goal at a time, a small surplus for muscle or a modest deficit for fat loss.",
    },
  ],
};
