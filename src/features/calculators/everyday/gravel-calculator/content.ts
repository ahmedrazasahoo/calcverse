import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Gravel Calculator: Cubic Yards, Tons and Kilograms by Material",
  metaDescription:
    "Free gravel calculator for driveways, paths and drainage. Get volume in cubic yards and weight in tons and kilograms for pea gravel, crushed stone, sand, topsoil and river rock.",
  intro:
    "Gravel is bought by weight but spread by volume, and guessing either one is expensive. Enter the area, the depth and the material, and get cubic yards, tons and kilograms in one step.",
};

export const content: ToolContent = {
  seoTitle: "Gravel Calculator: Cubic Yards, Tons and Kilograms by Material",
  howTo: [
    "Enter the area in square feet, or switch to length and width.",
    "Set the depth in inches. Driveways usually need 4 to 6 inches total, paths 2 to 3 inches.",
    "Pick the material so the right density is used, or choose custom and enter your supplier density in tons per cubic yard.",
    "Read the volume in cubic yards and the weight in tons and kilograms to order.",
  ],
  explanationTitle: "How gravel volume becomes weight",
  explanation: [
    "Volume comes first: area times depth. One hundred square feet at 3 inches deep is 25 cubic feet, which is 0.926 cubic yards. Weight depends entirely on what the stone is. Pea gravel runs about 1.35 tons per cubic yard, crushed stone about 1.40, sand about 1.33, topsoil about 1.20 and river rock about 1.50 tons per cubic yard. So that same 0.926 cubic yards of pea gravel weighs about 1.25 tons, roughly 1,134 kilograms. Moisture can shift real weights by 5 to 10 percent, which is why suppliers weigh the truck rather than trusting the scoop count.",
    "Depth is where driveway jobs go wrong. A lasting driveway is built in layers: a coarse base of larger crushed stone, compacted, then a finer top layer. Quoting 4 to 6 inches as one layer of decorative gravel over bare soil leads to ruts and stone migrating into the ground. Use this calculator once per layer, with that layer depth and material, and add the totals. A weed membrane under paths and a compacted sub base under driveways both cut how much stone you lose into the soil in the first year.",
    "Tons here are US short tons of 2,000 pounds. If your supplier sells by the metric tonne, convert using the kilogram figure shown: 1,000 kilograms is one tonne. Order a little over rather than under, because a second delivery fee usually costs more than the extra half ton, and leftover gravel keeps indefinitely for topping up thin spots.",
  ],
  faqs: [
    {
      q: "How much gravel do I need for 100 square feet?",
      a: "At 3 inches deep, 100 square feet needs 0.926 cubic yards. In pea gravel at 1.35 tons per yard that is about 1.25 tons. At 4 inches deep the same area needs 1.235 cubic yards, about 1.67 tons of pea gravel.",
    },
    {
      q: "How many tons are in a cubic yard of gravel?",
      a: "It depends on the material. Pea gravel is about 1.35 tons per cubic yard, crushed stone 1.40, sand 1.33, topsoil 1.20 and river rock 1.50. Use the material picker here for the weight that matches your order.",
    },
    {
      q: "How deep should gravel be on a driveway?",
      a: "Plan 4 to 6 inches total, built as a compacted coarse base layer plus a finer top layer of 2 to 3 inches. A single thin layer over soil ruts quickly. Calculate each layer separately and add the weights.",
    },
    {
      q: "How much area does one ton of gravel cover?",
      a: "One ton of pea gravel is about 0.74 cubic yards, roughly 20 cubic feet. That covers about 80 square feet at 3 inches deep, or 60 square feet at 4 inches deep. Heavier river rock covers a little less per ton.",
    },
    {
      q: "What is the difference between a ton and a tonne?",
      a: "A US short ton is 2,000 pounds, about 907 kilograms. A metric tonne is 1,000 kilograms. This calculator shows both tons and kilograms, so you can order correctly whichever unit your supplier uses.",
    },
  ],
};
