import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free shoe size converter for men, women and kids. Convert between US, UK and EU sizes and foot length in centimetres, with full conversion charts.";

export const intro =
  "Shoe sizes make no sense across borders: a US 9, a UK 8.5 and an EU 42.5 are the same shoe, and the same number means different shoes for men, women and children. This converter holds the three charts side by side so you can shop any country's store with confidence.";

export const content: ToolContent = {
  seoTitle: "Shoe Size Converter: US, UK and EU Charts for Men, Women and Kids",
  howTo: [
    "Choose whose feet you are buying for: men, women or kids. The charts differ, and mixing them up is the most common conversion mistake.",
    "Say which system your known size is in, or measure the foot in centimetres for the most reliable route.",
    "Read the matching sizes in every system, and check where your row sits in the full chart below.",
    "Between sizes or buying online? Foot length plus the chart gets you close, but brands vary, so keep returns in mind for a first order from a new maker.",
  ],
  explanationTitle: "Why shoe sizes refuse to line up",
  explanation: [
    "Each system grew from a different ruler. UK and US sizes count in barleycorns, an old English unit of a third of an inch, starting from different zero points, which is why the US men's size sits about half a size above the UK for the same shoe and the women's offset differs again. EU sizes count in Paris points of two thirds of a centimetre, measured on the last (the form the shoe is built around) rather than the foot, which is why EU numbers run high and convert unevenly.",
    "Because the steps themselves differ in size, no exact formula can convert between the systems. Honest conversion is a lookup table, and that is what this page uses: the widely published standard charts, keyed by foot length. Measuring your foot is the one move that cuts through every system: stand on paper in the evening when feet are at their largest, mark heel and longest toe, and measure between the marks.",
    "Kids complicate everything. Children's sizes climb from tiny numbers, restart, and the UK sequence wraps from 13.5 back to 1 as youth sizes begin, so a UK 1.5 in the kids chart is a bigger shoe than a UK 13.5. Children also grow out of sizes in months, which is why the kids chart here is youth only and why a thumb's width of growing room is standard fitting advice.",
  ],
  faqs: [
    {
      q: "What is a US men's 9 in UK and EU sizes?",
      a: "A US men's 9 is a UK 8.5 and an EU 42.5, fitting a foot of about 26 centimetres. The same number in the women's chart is a different shoe entirely: a US women's 9 is a UK 7.5 and an EU 40.5.",
    },
    {
      q: "Why is my EU size different between brands?",
      a: "Because EU sizing is measured on the last, and lasts differ by brand and style. A pointed dress shoe and a wide trainer with the same EU label can fit quite differently. Treat EU conversions as the least precise of the three and trust foot length and the brand's own chart where they conflict.",
    },
    {
      q: "Should I size up or down when I fall between sizes?",
      a: "For everyday and running shoes, up. Feet swell through the day and slide forward on downhills, so a little extra length prevents black toenails and blisters. For climbing shoes and formal leather, which stretch and are worn still, many people size down slightly. The converter's centimetre lookup follows the size up rule on exact ties.",
    },
    {
      q: "How do I measure my foot length properly?",
      a: "Stand in socks on a sheet of paper, weight evenly spread, ideally in the evening. Mark the back of the heel and the tip of the longest toe, which is not always the big toe, then measure the distance in centimetres. Do both feet and use the larger measurement.",
    },
    {
      q: "Do half sizes exist in every system?",
      a: "In US and UK adult sizes, yes, half sizes are standard and worth using. EU sizes mostly come in whole and third steps that only sometimes land on a half, and many brands simply label EU sizes approximately. If a shoe only lists EU sizes, your foot length is the safest guide.",
    },
  ],
};
