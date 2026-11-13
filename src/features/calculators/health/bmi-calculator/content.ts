import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free BMI calculator for adults in metric or imperial units. Check your body mass index, your WHO category and the healthy weight range for your height.";

export const intro =
  "BMI turns your weight and height into a single number that gives a rough picture of whether your weight is in a healthy zone. It takes five seconds and needs nothing but a tape measure and a scale.";

export const disclaimer =
  "This calculator gives a general estimate for adults. It is not medical advice. Talk to your doctor for guidance about your own health, especially during pregnancy or if you are under 18.";

export const content: ToolContent = {
  seoTitle: "BMI Calculator: Check Your Body Mass Index and Healthy Weight Range",
  howTo: [
    "Choose metric or imperial units, whichever you measured in.",
    "Enter your weight and your height. Measure height without shoes, standing straight against a wall.",
    "Read your BMI, your World Health Organization category, and the healthy weight range for your height.",
    "Use the range as a guide. If your result sits near a boundary, your body composition matters more than the decimal point.",
  ],
  explanationTitle: "What BMI is, and what it is not",
  explanation: [
    "Body mass index was designed in the 19th century and popularised by the World Health Organization as a population screening tool. The maths is simple: your weight in kilograms divided by your height in metres, squared. For most adults the result tracks body fat surprisingly well, which is why doctors still use it as a first check before more detailed tests.",
    "The number has known blind spots. Muscle weighs more than fat for the same volume, so athletes and manual workers often land in the overweight band while carrying very little fat. At the other end, older adults can hold a normal BMI while having lost muscle and gained fat. BMI also says nothing about where fat sits, and fat around the waist carries more risk than fat around the hips.",
    "That is why this page shows you a range rather than a verdict. If your BMI sits well outside the healthy band, it is worth a proper conversation with a doctor, who can add waist measurement, blood pressure and blood tests to the picture. One screening number on its own never tells the whole story.",
  ],
  faqs: [
    {
      q: "What is a healthy BMI for adults?",
      a: "The World Health Organization puts the healthy band at 18.5 to 24.9 for adults. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above falls into the obesity classes. These bands were built from large population studies linking BMI to long term health risks.",
    },
    {
      q: "Does BMI work for children and teenagers?",
      a: "Not directly. Children are growing, so their BMI is compared against other children of the same age and sex using percentile charts. A child at the 85th percentile is treated differently from an adult with the same raw score. Use a BMI percentile calculator or ask a paediatrician for under 18s.",
    },
    {
      q: "Why is my BMI high when I am fit and muscular?",
      a: "Because the formula cannot tell muscle from fat. A rugby player and a sedentary person can share the same height, weight and BMI with completely different bodies. If you train seriously, a body fat estimate or a simple waist measurement gives a fairer picture.",
    },
    {
      q: "Is BMI different for men and women?",
      a: "The formula and the official bands are the same for both sexes. In practice, women naturally carry a higher share of body fat than men at the same BMI, which is one more reason to treat the bands as guidance rather than a precise personal measure.",
    },
    {
      q: "How much weight do I need to lose to reach a healthy BMI?",
      a: "The healthy weight range on this page shows the weights that correspond to BMI 18.5 and 24.9 at your height. The gap between your current weight and the top of that range is a reasonable first target. Steady losses of about half a kilogram a week are the pace most health bodies recommend.",
    },
  ],
};
