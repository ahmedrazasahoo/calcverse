import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free sleep calculator based on 90 minute sleep cycles. Find the best time to go to bed or wake up so you finish a full cycle and wake up clear headed.";

export const intro =
  "Waking up groggy is often about timing, not just hours. Sleep runs in roughly 90 minute cycles, and this calculator counts backwards or forwards in whole cycles so you surface at the light end of one.";

export const disclaimer =
  "This calculator gives general guidance for healthy adults. It is not medical advice. Persistent snoring, insomnia or daytime sleepiness can signal a sleep disorder, and a doctor or sleep clinic can help.";

export const content: ToolContent = {
  seoTitle: "Sleep Calculator: Bedtimes and Wake Times by 90 Minute Sleep Cycles",
  howTo: [
    "Choose whether you are fixing a wake up time, a bedtime, or going to sleep right now.",
    "Enter the time, or let the calculator use the current time.",
    "Pick from the suggested times. Five or six cycles (seven and a half to nine hours asleep) suit most adults best.",
    "Remember the suggestions already include about 15 minutes to fall asleep, so get into bed at the time shown, not 15 minutes later.",
  ],
  explanationTitle: "Why sleep cycles matter more than raw hours",
  explanation: [
    "Across a night, your brain moves through light sleep, deep sleep and dreaming sleep in rounds that average about 90 minutes, though anything from 80 to 120 minutes is normal for an individual. Deep sleep dominates the early rounds and dreaming sleep the later ones, which is why a full night is not interchangeable with the same hours grabbed at odd times.",
    "An alarm that lands in the middle of deep sleep produces the heavy, disoriented feeling called sleep inertia, which can take an hour to fully clear. The same total rest ending at a cycle boundary feels noticeably lighter. That is the whole trick this calculator plays: it trades a few minutes of sleep for a better place in the cycle, and most people feel the difference the first morning they try it.",
    "Cycles are a guide, not a law. Alcohol fragments the second half of the night, caffeine taken even six hours before bed shortens deep sleep, and screens delay the melatonin rise that starts the first cycle. If you use the suggested times for a week and still wake unrefreshed, the issue is sleep quality or a simple shortage, and nine hours with the lights out earlier beats clever timing.",
  ],
  faqs: [
    {
      q: "How much sleep do adults actually need?",
      a: "Most adults do best on seven to nine hours, which is five to six full cycles here. A small minority genuinely thrive on less due to genetics, but they are rare; if you need an alarm and coffee to function, you are probably not one of them.",
    },
    {
      q: "Why do the suggested times include 15 extra minutes?",
      a: "Falling asleep is not instant. Healthy adults typically take 10 to 20 minutes to drift off, so the calculator counts your cycles from about 15 minutes after you get into bed. If you fall asleep much faster than that every night, it can itself be a sign of sleep debt.",
    },
    {
      q: "Is it better to sleep 6 hours or 7 hours?",
      a: "Seven hours is four and a half cycles plus falling asleep time, which means waking mid cycle for many people. Six hours is close to four clean cycles. In practice, most people feel better after seven hours despite the theory, because total sleep still matters. The honest answer is to test both for a few days each.",
    },
    {
      q: "Do naps follow the same cycle rules?",
      a: "Yes. A nap of about 20 minutes stays in light sleep and refreshes without grogginess, while a nap of a full 90 minutes completes a cycle. The awkward middle, 40 to 60 minutes, is the one that leaves people feeling worse than before the nap.",
    },
    {
      q: "Why do I wake up before my alarm some mornings?",
      a: "Often because a cycle ended naturally and your body took the exit. If you wake close to your alarm feeling clear, getting up rather than grabbing 20 more minutes usually works out better, since the extra minutes start a new cycle you will be dragged out of.",
    },
  ],
};
