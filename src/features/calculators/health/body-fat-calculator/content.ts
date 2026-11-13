import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free body fat calculator using the US Navy tape measure method. Estimate your body fat percentage, fat mass and lean mass from a few simple measurements.";

export const intro =
  "All you need is a soft tape measure. The US Navy method turns your height and a few circumferences into a solid body fat estimate, the same approach used for service fitness checks.";

export const disclaimer =
  "This calculator gives a general estimate for adults. It is not medical advice. Talk to your doctor for guidance about your own health and body composition.";

export const content: ToolContent = {
  seoTitle: "Body Fat Calculator: US Navy Tape Measure Method, Fat and Lean Mass",
  howTo: [
    "Measure your height without shoes.",
    "Measure your waist: at navel level for men, at the narrowest point for women. Keep the tape level and snug, and breathe out normally before reading it.",
    "Measure your neck just below the Adam's apple, with your head straight.",
    "Women also measure the hips at their widest point. Add your weight if you want fat mass and lean mass as well.",
  ],
  explanationTitle: "How the Navy method estimates body fat",
  explanation: [
    "The equations were developed for the US Navy by Hodgdon and Beckett in 1984, from measurements on hundreds of service members checked against underwater weighing. Fat tends to gather in predictable places, so the gap between waist and neck, set against height, tracks total body fat well. For women the hip measurement joins the sum because female fat distribution differs.",
    "The maths uses logarithms, which is a technical way of saying the relationship curves: each extra centimetre on the waist means more at larger sizes than at smaller ones. In validation studies the method lands within roughly 3 to 4 percentage points of laboratory methods for most people, which is good for a tape measure and poor compared with a DEXA scan. Both facts are worth holding at once.",
    "Where the method struggles is at the extremes: very lean athletes, very high body fat, and body shapes that store fat unusually, such as mostly on the back or legs. If your result surprises you, remeasure carefully before doubting it. A tape pulled tight enough to dent the skin can shave two points off the answer on its own.",
  ],
  faqs: [
    {
      q: "What is a healthy body fat percentage?",
      a: "The American Council on Exercise bands put average men at 18 to 24 percent and average women at 25 to 31 percent, with fitness levels a few points lower and athletes lower again. Women carry more essential fat than men by design, so the bands are different and should never be compared directly.",
    },
    {
      q: "How accurate is the Navy method compared with a DEXA scan?",
      a: "Expect an error of about 3 to 4 percentage points either way for most people. A DEXA scan, smart scale or skinfold test will each give a slightly different number too. The tape method shines at tracking change over time when you measure the same way each time.",
    },
    {
      q: "Where exactly do I measure my waist?",
      a: "Men measure horizontally at the level of the navel. Women measure at the narrowest point of the natural waist, usually just above the navel. Measure on bare skin, standing, at the end of a normal breath out, without sucking in.",
    },
    {
      q: "Why does the calculator ask for my neck?",
      a: "The neck changes little with fat gain for most people, so it works as a personal yardstick. Subtracting it from the waist isolates the part of the waist measurement that actually reflects fat, which is what makes the simple method work at all.",
    },
    {
      q: "My scale gives a different body fat number. Which is right?",
      a: "Home scales use bioelectrical impedance, which is swayed by hydration, food and even foot moisture, and can wander by several points across a single day. If the two disagree, trust the trend of one method measured consistently over weeks, not any single reading.",
    },
  ],
};
