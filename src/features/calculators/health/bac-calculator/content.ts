import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "BAC Calculator: Estimate Blood Alcohol Content With the Widmark Formula",
  metaDescription:
    "Free BAC calculator using the Widmark formula. Enter your weight, sex and drinks to estimate current and peak blood alcohol content and how long until it falls. A rough estimate only: never drive after drinking.",
  intro:
    "Estimate your blood alcohol content from your weight, sex and what you drank, using the Widmark formula. This is a rough estimate only. Many factors change real BAC, and the only safe choice is never to drive after drinking.",
};

export const content: ToolContent = {
  seoTitle: "BAC Calculator: Estimate Blood Alcohol Content With the Widmark Formula",
  howTo: [
    "Enter your sex and body weight in kilograms or pounds. The formula uses a body water factor of 0.68 for men and 0.55 for women, which are population averages.",
    "Add your drinks using the beer, wine and spirits presets, or add a custom drink with its volume in millilitres and its alcohol percentage.",
    "Enter how many hours have passed since you started drinking, so elimination can be subtracted.",
    "Read your estimated current BAC, your estimated peak BAC, and roughly how long until the estimate falls to 0.08, 0.05 and zero.",
  ],
  explanationTitle: "How the Widmark formula estimates BAC",
  explanation: [
    "The Widmark formula, developed in the 1930s, is still the standard back of envelope estimate. First, work out pure alcohol in grams: volume in millilitres times the alcohol percentage times 0.789, the density of ethanol, divided by 100. A standard 355 ml beer at 5 percent holds about 14 grams. Then divide those grams by body weight in kilograms times a distribution factor r times 10. The factor is about 0.68 for men and 0.55 for women, reflecting average body water proportions. Four beers give an 80 kg man 56 grams of alcohol, so 56 divided by 544 equals a peak of about 0.103 percent. The body then eliminates alcohol at a fairly steady rate, commonly estimated at 0.015 percent per hour, so after two hours the estimate falls to about 0.073 percent.",
    "Real BAC can differ a lot from this number. Food in the stomach, how fast you drank, body composition, medications, fatigue, individual metabolism and the exact strength and size of your drinks all move the true figure up or down, and home poured drinks are often stronger than standard measures. Elimination rates vary between people too, roughly 0.010 to 0.020 percent per hour. That is why the times shown here until 0.08 or 0.05 are not a guarantee of being legal or safe to drive: legal limits vary by country and state, some are 0.05 or 0.02 or zero for new and professional drivers, and impairment begins well below any limit. Never drive after drinking, whatever a calculator says, and never treat this tool as medical advice.",
  ],
  faqs: [
    {
      q: "How long does it take for BAC to reach zero?",
      a: "Divide your current BAC by about 0.015 per hour. An estimate of 0.073 percent takes roughly 4.9 more hours to reach zero. Individual elimination rates vary, so this is a rough guide, and feeling sober is not proof that alcohol has cleared.",
    },
    {
      q: "Why does the same amount of alcohol affect people differently?",
      a: "BAC depends on body weight and body water proportion, which is why the formula uses 0.68 for men and 0.55 for women as averages. Food, drinking speed, medication, tiredness and individual metabolism also change both the peak and how impaired someone feels.",
    },
    {
      q: "How many drinks put you over 0.08?",
      a: "For an 80 kg man, four standard beers drunk quickly give an estimated peak of about 0.103 percent, already over 0.08. A smaller person drinking the same amount would be higher still. There is no safe drink count for driving: impairment starts with the first drink.",
    },
    {
      q: "Can I rely on this calculator before driving?",
      a: "No. It is a rough estimate based on averages, and your real BAC could be higher. Legal limits also vary by place, and some drivers face limits of 0.02 or zero. The only safe decision after drinking is not to drive at all.",
    },
    {
      q: "Does coffee, food or fresh air lower BAC faster?",
      a: "No. Only time lowers BAC, because the liver eliminates alcohol at a roughly constant rate. Coffee or fresh air may make someone feel more alert while their BAC, and their impairment, remain unchanged.",
    },
  ],
};
