import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free ideal weight calculator showing the Devine, Robinson, Miller and Hamwi formulas plus the healthy BMI range for your height, in kilos or pounds.";

export const intro =
  "Four classic medical formulas each name a slightly different ideal weight for the same height. This page shows all four together with the healthy BMI range, because the honest answer is a range, not a single number.";

export const disclaimer =
  "This calculator gives a general estimate for adults. It is not medical advice. Talk to your doctor for guidance about your own health and weight.";

export const content: ToolContent = {
  seoTitle: "Ideal Weight Calculator: Devine, Robinson, Miller and Hamwi Formulas",
  howTo: [
    "Enter your sex and height in metric or imperial units.",
    "Compare the four formula results and the average between them.",
    "Set that beside the healthy BMI range for your height, which is wider and usually more useful as a target.",
    "If the numbers differ from your expectations, remember they assume an average frame. Broad or narrow builds sit naturally at the edges.",
  ],
  explanationTitle: "Why four formulas give four different answers",
  explanation: [
    "Every ideal weight formula starts at five feet tall with a base weight, then adds a fixed amount for each extra inch. Devine set the male base at 50 kg in 1974, originally to help doctors dose medicine rather than to judge anyone's health. Robinson lowered the per inch slope in 1983, Miller raised the base in the same year, and Hamwi's 1964 figures are the oldest of the set. The ingredients are simple; the disagreement is built in.",
    "None of the four knows anything about you beyond height and sex. They cannot see your frame width, your muscle mass, your age or your health history. A shot putter and a marathon runner of the same height will get the same four numbers, which is why this page pairs them with the BMI healthy range: the band between BMI 18.5 and 24.9 at your height. That band is broad on purpose, and most healthy people sit somewhere inside it.",
    "Used well, these formulas give a sanity check and a rough destination. Used badly, they give a single kilogram figure to chase. If a target weight matters for a medical reason, set it with a doctor who can fold in blood work, waist measurement and how you actually feel and perform.",
  ],
  faqs: [
    {
      q: "Which ideal weight formula should I trust?",
      a: "Devine is the most used in medicine, but trust the pattern more than any single result. If all four formulas and the BMI range cluster in the same area, that area is a reasonable guide. Where they spread out, the truth is that your ideal depends on frame and muscle.",
    },
    {
      q: "What is the ideal weight for someone 5 foot 10?",
      a: "For a man of 5 foot 10 (178 cm), the four formulas give roughly 70 to 75 kg, with a healthy BMI range of about 59 to 79 kg. For a woman of the same height the formulas give roughly 63 to 69 kg against the same BMI range. Frame and muscle decide where inside the range suits you.",
    },
    {
      q: "Do these formulas work for tall or short adults?",
      a: "They were built around average heights and get rougher at the extremes. Below five feet the formulas extrapolate downwards from their base, and very tall people often find the per inch additions too stingy. The BMI range behaves better at extremes, though it has its own limits.",
    },
    {
      q: "Should children use an ideal weight calculator?",
      a: "No. Growing bodies are assessed with age and sex specific growth charts and BMI percentiles, not adult formulas. A school nurse or paediatrician can plot a child properly in a couple of minutes.",
    },
    {
      q: "Why does frame size change the ideal weight?",
      a: "A broad skeleton, wide shoulders and pelvis and denser bones can add several kilograms before any fat is counted. Old insurance tables adjusted ideal weight by about 10 percent between small and large frames, which is a useful rule of thumb when a formula result feels off.",
    },
  ],
};
