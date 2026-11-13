import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free pace calculator for runners and walkers. Work out pace, finish time or distance from any two, with 5K, 10K, half marathon and marathon presets.";

export const intro =
  "Pace, time and distance: give this calculator any two and it finds the third. Work out the pace you need for a target finish, or the finish time your training pace predicts, from a parkrun 5K to a marathon.";

export const content: ToolContent = {
  seoTitle: "Pace Calculator: Running Pace, Finish Time and Distance Solver",
  howTo: [
    "Fill in any two of the three boxes: distance, finish time, or pace. Clear the one you want calculated.",
    "Use the preset buttons for common race distances, or type any distance in kilometres or miles.",
    "Enter times as minutes and seconds (50:00) or hours, minutes and seconds (1:45:30). Enter pace the same way, per kilometre or per mile.",
    "Read your pace, predicted finish time, and average speed, which is the number treadmill displays ask for.",
  ],
  explanationTitle: "How pace, time and distance fit together",
  explanation: [
    "Pace is simply time divided by distance: run 10 kilometres in 50 minutes and your pace is 5 minutes per kilometre. Turn it around and finish time is pace multiplied by distance, while distance is time divided by pace. One triangle, three questions, and every race plan is some version of it. This calculator solves whichever side you leave blank.",
    "The figures assume an even pace from start to finish, which is how experienced runners actually race: the famous negative split, a slightly faster second half, still averages out to the same overall number. Real courses add hills, wind, crowding and water stops, so add a small cushion to any target. Most coaches suggest aiming a few seconds per kilometre faster in training calculations than the bare target, to buy room for the day itself.",
    "If you train by speed instead, the conversion is built in: speed is distance divided by time. A 6 minute kilometre is 10 kilometres per hour, and a 5 minute kilometre is 12. Treadmills usually ask for speed, roads reward thinking in pace, and being fluent in both makes training plans from any source usable.",
  ],
  faqs: [
    {
      q: "What pace do I need for a sub 2 hour half marathon?",
      a: "A half marathon is 21.1 kilometres, so two hours means about 5:41 per kilometre, or 9:09 per mile. In practice, aim for 5:35 to 5:38 per kilometre in your planning to leave room for water stops and a crowded start.",
    },
    {
      q: "What is a good average running pace for a beginner?",
      a: "Most new runners settle between 6:00 and 7:30 per kilometre on easy runs, and that is genuinely fine. Comfortably conversational beats fast at the start: you should be able to speak in short sentences. Speed arrives as a side effect of consistent easy miles.",
    },
    {
      q: "How do I convert pace per mile to pace per kilometre?",
      a: "Divide the mile pace in seconds by 1.609. A 9 minute mile (540 seconds) becomes about 336 seconds, or 5:36 per kilometre. Going the other way, multiply the kilometre pace by 1.609. This calculator switches units for you and converts the distance automatically.",
    },
    {
      q: "What pace is a 25 minute 5K?",
      a: "Exactly 5:00 per kilometre, or about 8:03 per mile. It is a common milestone target: fast enough to require real training, close enough to chase within a season or two for most runners who train three times a week.",
    },
    {
      q: "Why does my GPS watch show a different pace from this calculator?",
      a: "The calculator uses the exact distance you enter, while a watch measures the line you actually ran, which weaves around corners, other runners and GPS error. Over a race, the measured course distance is the shortest legal line, and almost everyone runs a little further, so watch pace often looks a touch quicker than official pace.",
    },
  ],
};
