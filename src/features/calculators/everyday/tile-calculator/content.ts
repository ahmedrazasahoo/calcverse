import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Tile Calculator: Tiles and Boxes Needed With Grout Gap and Waste",
  metaDescription:
    "Free tile calculator for floors and walls. Enter room and tile sizes, grout gap and waste allowance to get the tiles needed and boxes to buy, in inches or centimetres.",
  intro:
    "Tiles run out mid wall for one reason: the grout gap and cuts were never counted. Enter the room, the tile size, the gap and a waste allowance, and get the tile count and boxes to buy.",
};

export const content: ToolContent = {
  seoTitle: "Tile Calculator: Tiles and Boxes Needed With Grout Gap and Waste",
  howTo: [
    "Enter the room length and width in feet. For a wall, use the wall length and height instead.",
    "Enter the tile length and width, in inches or centimetres, whichever is printed on the box.",
    "Set the grout gap in inches. The gap is added to the tile size to get the true area each tile covers.",
    "Add a waste allowance, 10 percent for straight layouts and 15 percent for diagonal patterns, then set tiles per box.",
    "Read the tiles needed and the boxes to buy, always rounded up.",
  ],
  explanationTitle: "Why the grout gap changes your tile count",
  explanation: [
    "A tile does not cover just its own face. Each tile also owns half the grout joint on every side, so the area one tile covers on the floor is its size plus the full gap in each direction. A 12 by 12 inch tile with a quarter inch gap covers 12.25 by 12.25 inches, which is 1.042 square feet, not 1 square foot. Over a 100 square foot floor that small difference drops the count from 100 tiles to 96. Ignoring the gap over orders a little; ignoring cuts under orders a lot, which is why both numbers belong in the same calculation.",
    "Waste covers the cuts at edges, breakages, and the tiles you will want to keep as spares. Straight grid layouts in square rooms waste about 10 percent. Diagonal layouts, large format tiles in small rooms, and patterns like herringbone waste 15 percent or more, because every edge tile is cut and offcuts rarely fit elsewhere. The calculator applies waste to the tile count, then divides by tiles per box and rounds up, because shops sell whole boxes and batches vary in shade.",
    "Measure the room at its widest points and tile the full rectangle on paper, even where units or a bath will sit, then subtract only large fixed footprints if you are confident they will never move. Buy all boxes from one batch, check the batch code on every box, and keep at least a few spare tiles stored flat for future repairs, since a tile line can be discontinued within a year.",
  ],
  faqs: [
    {
      q: "How many 12x12 tiles do I need for 100 square feet?",
      a: "With no grout gap counted, exactly 100. With a realistic quarter inch gap each tile covers 1.042 square feet, so 96 tiles cover the floor. Add 10 percent waste and you buy 106 tiles, or 11 boxes of 10.",
    },
    {
      q: "How much waste should I allow for tiles?",
      a: "Allow 10 percent for a straight layout in a simple room, 15 percent for diagonal or patterned layouts, and up to 20 percent for small rooms with large tiles or many obstacles. The waste covers cuts, breakages and spares.",
    },
    {
      q: "What grout gap should I use?",
      a: "Floor tiles commonly use 3 to 5 mm gaps, about 1/8 to 3/16 inch. Large format and rectified tiles can go tighter, 2 to 3 mm. Rustic and handmade tiles need wider gaps, up to 1/4 inch, because their sizes vary. Enter the gap you plan in inches here.",
    },
    {
      q: "How do I calculate tiles for a wall?",
      a: "Use the wall length as the room length and the wall height as the room width. A 8 by 5 foot shower wall is 40 square feet. Tile each wall separately and add the counts, since cuts differ per wall.",
    },
    {
      q: "Should I buy tiles by the box coverage instead?",
      a: "Many boxes state square foot coverage as well as tile count. The two should agree: tiles per box times the area per tile, gap included, is close to the printed coverage. If they differ, trust the tile count method here and round boxes up.",
    },
  ],
};
