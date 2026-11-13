import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free water intake calculator. Work out how much water to drink each day from your body weight, exercise and climate, in litres, cups and ounces.";

export const intro =
  "How much water you need depends mostly on your size, how much you sweat, and the weather. This calculator turns those three things into a daily target in litres, cups and ounces.";

export const disclaimer =
  "This calculator gives a general estimate for healthy adults. It is not medical advice. People with kidney, heart or liver conditions, and anyone told to restrict fluids, should follow their doctor's guidance instead.";

export const content: ToolContent = {
  seoTitle: "Water Intake Calculator: How Much Water Should You Drink Each Day?",
  howTo: [
    "Enter your body weight in kilograms or pounds.",
    "Add the exercise you expect today, in minutes. Training, sport and physical jobs all count.",
    "Pick the climate that matches your day. Heat and humidity pull far more water out of you than a mild indoor day.",
    "Use the result as your planning figure for drinks. Food, tea, coffee and fruit all contribute water too.",
  ],
  explanationTitle: "How much water a body actually needs",
  explanation: [
    "The familiar advice to drink eight glasses a day has no solid study behind it, but the need underneath it is real. You lose water constantly through breath, skin, urine and sweat, and bigger bodies simply have more of everything to supply. That is why this calculator starts from weight: about 35 ml per kilogram per day covers the baseline losses of a typical adult in mild weather.",
    "Exercise changes the picture quickly. Hard work in heat can produce over a litre of sweat an hour, so the calculator adds about 355 ml for every half hour of exercise, in line with sports medicine guidance, and then scales the whole figure up for warm and hot climates. On a hard training day in summer, the honest answer can be double the quiet day figure.",
    "Two practical checks beat any formula. Thirst is a well tuned signal for healthy adults, and urine colour is a simple gauge: pale straw is about right, dark amber means drink soon, and constantly clear can mean you are forcing down more than you need. Total water also includes food, which quietly provides around a fifth of the daily amount for most people.",
  ],
  faqs: [
    {
      q: "Does coffee and tea count towards daily water?",
      a: "Yes. Caffeinated drinks are mildly diuretic in large doses, but the water in the cup far outweighs the effect at normal intakes. Studies comparing hydration from coffee, tea, water and soft drinks find them broadly equivalent for everyday hydration.",
    },
    {
      q: "Can you drink too much water?",
      a: "Yes, though it is uncommon. Drinking far beyond thirst for hours, especially during endurance events, can dilute blood sodium to dangerous levels. The risk sits with forced drinking schedules. Drinking to thirst and replacing sweat losses is the safe middle ground.",
    },
    {
      q: "How much extra water do I need when pregnant or breastfeeding?",
      a: "Guidelines suggest roughly 300 ml extra a day in pregnancy and 700 ml or more while breastfeeding, on top of normal needs. This calculator does not add those adjustments automatically, so add them yourself or ask your midwife for a personal figure.",
    },
    {
      q: "Why do I need more water as the weather gets hotter?",
      a: "Because sweat is your cooling system, and it runs on water and salts. In hot, humid weather sweat evaporates poorly, so the body produces even more of it. The climate options here scale your target up by 10 to 20 percent to cover that extra loss.",
    },
    {
      q: "Is bottled water better than tap water for hydration?",
      a: "For hydration itself, no. The water molecule is identical. In most developed countries tap water is tightly regulated and perfectly safe. Choose whichever you will actually drink enough of; taste and convenience matter more than the source.",
    },
  ],
};
