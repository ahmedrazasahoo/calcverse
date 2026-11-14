import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Mulch Calculator: Cubic Yards and Bag Counts for Beds and Borders",
  metaDescription:
    "Free mulch calculator. Enter bed area and depth to get cubic yards, cubic feet, and how many 2 or 3 cubic foot bags you need, so you buy the right amount first time.",
  intro:
    "Mulch looks light until you are three trips into a bed that still shows soil. Enter the area and the depth you want, and get the volume in cubic yards plus exact bag counts for the common bag sizes.",
};

export const content: ToolContent = {
  seoTitle: "Mulch Calculator: Cubic Yards and Bag Counts for Beds and Borders",
  howTo: [
    "Enter the bed area in square feet, or switch to length and width and let the calculator work the area out.",
    "Set the depth in inches. Use 3 inches for most flower beds and borders, 2 inches for a yearly top up.",
    "Read the volume in cubic yards for bulk orders, and the bag counts for 2 and 3 cubic foot bags.",
    "For several beds, calculate each one and add the totals together before you order.",
  ],
  explanationTitle: "How mulch volume is worked out",
  explanation: [
    "Mulch volume is area times depth, with depth converted from inches to feet. One hundred square feet at 3 inches deep is 100 times 0.25 feet, which is 25 cubic feet. Bulk mulch is sold by the cubic yard, 27 cubic feet, so that bed needs 0.926 cubic yards, close enough to order 1 yard. Bagged mulch flips the maths: a 2 cubic foot bag means 25 divided by 2, rounded up to 13 bags, while 3 cubic foot bags need 9. Bags suit small beds and cars, bulk wins on price past about 2 cubic yards.",
    "Depth matters more than most gardeners expect. Below about 2 inches, mulch does little to hold moisture or block weeds. Three inches settles to roughly two and a half after rain and foot traffic, which is the working depth most guides recommend. Four inches suits shrub beds and trees, kept a few inches away from trunks and stems so bark stays dry. Because mulch settles and breaks down, a fresh layer usually looks about a quarter deeper on day one than it will a month later.",
    "For odd shaped beds, break the area into rectangles and circles and add them. A circular bed uses pi times the radius squared. Curved borders can be measured as length times average width. Slight over ordering is normal with bulk mulch since most yards deliver in half yard steps, and spare mulch keeps well in a pile for touch ups through the season.",
  ],
  faqs: [
    {
      q: "How much mulch do I need for 100 square feet?",
      a: "At 3 inches deep, 100 square feet needs 25 cubic feet, which is 0.926 cubic yards, 13 bags of 2 cubic feet, or 9 bags of 3 cubic feet. At 2 inches deep it drops to about 16.7 cubic feet, or 9 small bags.",
    },
    {
      q: "How many bags of mulch are in a cubic yard?",
      a: "A cubic yard is 27 cubic feet. That is 14 bags of 2 cubic feet (13.5, rounded up) or 9 bags of 3 cubic feet. Comparing the bag total against a bulk yard price tells you quickly which way to buy.",
    },
    {
      q: "How deep should mulch be?",
      a: "Three inches suits most beds and borders. Use 2 inches for a light annual refresh over existing mulch, and up to 4 inches around shrubs and trees. Keep mulch a few inches clear of plant stems and tree trunks.",
    },
    {
      q: "How much area does one bag of mulch cover?",
      a: "A 2 cubic foot bag covers about 12 square feet at 2 inches deep, or 8 square feet at 3 inches deep. A 3 cubic foot bag covers about 18 square feet at 2 inches, or 12 at 3 inches.",
    },
    {
      q: "Is bulk mulch or bagged mulch cheaper?",
      a: "Bulk is usually far cheaper per cubic foot once you need a cubic yard or more, and it avoids plastic waste. Bags win for small beds, top ups, and anywhere a truck cannot tip close to the bed.",
    },
  ],
};
