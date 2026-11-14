import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "One Rep Max Calculator: Estimate Your 1RM From Any Set",
  metaDescription:
    "Free one rep max calculator using seven proven formulas including Epley and Brzycki. Enter a weight and reps to estimate your 1RM, plus a full percentage table with typical reps.",
  intro:
    "Enter a weight you lifted and how many reps you managed, and this calculator estimates your one rep max with seven established formulas, averages them for the headline figure, and builds a percentage table for planning training loads.",
};

export const content: ToolContent = {
  seoTitle: "One Rep Max Calculator: Estimate Your 1RM From Any Set",
  howTo: [
    "Enter the weight you lifted in kilograms or pounds, using a set taken close to failure with good form.",
    "Enter the reps you completed, between 1 and 15. Sets of 3 to 8 reps give the most reliable estimates.",
    "Read the headline one rep max, which is the average of seven formulas, and compare the individual formula estimates.",
    "Use the percentage table to pick working weights, matching each percentage to the reps you plan to perform.",
  ],
  explanationTitle: "How one rep max formulas work",
  explanation: [
    "Testing a true one rep max is fatiguing and risky, so coaches estimate it from a hard set of several reps. Each formula models how strength falls as reps rise. Epley, the most widely used, multiplies the weight by 1 plus reps divided by 30, so 100 kg for 10 reps gives 100 times 1.333, or about 133 kg. Brzycki uses weight times 36 divided by 37 minus reps, which also gives about 133 kg for the same set. Lander, Lombardi, Mayhew, O'Conner and Wathen each fit the same relationship slightly differently, which is why this calculator shows all seven and averages them: no single formula is best for every lifter or every lift.",
    "Accuracy depends heavily on the set you enter. Estimates are most trustworthy from sets of 2 to 8 reps performed close to failure with strict form. Above 10 reps, muscular endurance starts to matter as much as pure strength, individual variation grows, and the formulas spread further apart, which is why this tool caps input at 15 reps and warns that high rep estimates are rough. Deadlifts and squats also tend to estimate differently from bench press, and a set stopped two reps short of failure will underestimate your max.",
    "The percentage table turns your max into training loads. The typical reps column follows the standard coaching guide: about 2 reps at 95 percent, 4 at 90, 6 at 85, 8 at 80, 10 at 75, 12 at 70, and more as the load drops toward 50 percent. Treat those rep figures as an approximate guide for programming, not a test to chase, and always prioritise technique and sensible progression over hitting a calculator number.",
  ],
  faqs: [
    {
      q: "Which one rep max formula is most accurate?",
      a: "Epley and Brzycki are the most commonly used and agree closely at low reps. No formula wins for everyone, so this calculator averages seven of them. For most lifters the average lands within a few percent of a tested max when the set used 3 to 8 reps.",
    },
    {
      q: "Why is my estimate less reliable from a set of 12 or 15 reps?",
      a: "High rep sets test endurance as well as strength, and people differ a lot in how their reps hold up as fatigue builds. The formulas diverge more at high reps, so treat anything above 10 reps as a rough guide and prefer a heavier, lower rep set for a better estimate.",
    },
    {
      q: "What is a good one rep max for bench press?",
      a: "It depends on body weight, training age and sex, so there is no single good number. A common milestone for male lifters is benching their own body weight for one rep, and 1.5 times body weight is considered strong. Progress against your own previous numbers matters more than any benchmark.",
    },
    {
      q: "How do I use the percentage table?",
      a: "Pick the percentage that matches your planned reps. If your estimated max is 140 kg and you want sets of about 8 reps, the table points to 80 percent, which is 112 kg. Warm up progressively and adjust by feel on the day.",
    },
    {
      q: "Should I test my real one rep max instead?",
      a: "You can, but maximal attempts carry injury risk and need good technique, a spotter or safety arms, and a proper warm up. Most training can be programmed from an estimated max, which is exactly what this calculator is for.",
    },
  ],
};
