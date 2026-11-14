import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "tile-calculator",
  keyword: "tile calculator",
  title: "Tile Calculator: How Many Tiles and Boxes Do You Really Need?",
  metaTitle: "Tile Calculator: Tiles, Boxes, Waste and Grout Guide",
  metaDescription: "Work out how many tiles and boxes you need with waste allowances for each pattern, grout gap math, and real bathroom and kitchen examples inside your own home.",
  excerpt: "Ordering tile is a one way door: too little and your project stalls waiting on a new dye lot, too much and you have paid for boxes you cannot return. This guide shows the full calculation, from square footage to waste by pattern to boxes on the pallet.",
  category: "Home and DIY",
  toolSlug: "tile-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Tile is unforgiving about quantities. Order too little and you are back at the store mid project, praying the new boxes come from the same production run, because shade and caliber can shift slightly between lots. Order far too much and you have spent real money on heavy boxes that many stores will only take back unopened, if they take them back at all. The math that protects you is not hard, but it has more moving parts than most people expect: room area, tile size, grout gaps, the pattern you lay, and the way tile is actually sold, by the box.",
    "This guide works through the whole chain with real rooms and real tile sizes, so you can see exactly where each number comes from. If you would rather skip the pencil work, the free [tile calculator](/calculators/tile-calculator) runs the same steps in seconds once you have your measurements. Either way, read the waste and pattern sections before you buy, because that is where most orders go wrong.",
    "One habit will save you on every project in this guide: never order from a single rough measurement scribbled on your phone. Measure each room twice, sketch it on paper, and write the dimensions on the sketch. Tile quantities are only ever as good as the numbers you feed in, and a transposed digit in a hallway measurement has ruined more Saturday projects than any saw ever built.",
  ],
  keyPoints: [
    "Start with the true square footage, then convert to tiles using the area of one tile in square feet.",
    "Add waste by pattern: about 10 percent for straight lay, 15 percent for diagonal, and 20 percent for herringbone.",
    "Grout gaps change the layout count slightly, but they matter most for rows, cuts and grout ordering.",
    "Always round up to whole boxes using the coverage printed on the box, never the tile count alone.",
    "Keep at least a few spare tiles after the job for future repairs, stored flat with the dye lot noted.",
  ],
  sections: [
    {
      heading: "Step one: measure the area like a tiler, not a guesser",
      paragraphs: [
        "Every tile calculation starts with area: length times width, both in feet. A bathroom floor that measures 5 feet by 8 feet is 40 square feet. Measure wall to wall at the widest points, in two or three places in older houses, because rooms that look rectangular often are not. Convert inches to decimal feet by dividing by 12, so 8 feet 6 inches becomes 8.5 feet.",
        "Real rooms have alcoves, closets and L shapes, and the reliable way to handle them is to split the sketch into rectangles, work out each one, and add the results. An L shaped kitchen might split into a main block of 12 feet by 10 feet, which is 120 square feet, plus a breakfast nook of 6 feet by 8 feet, which is 48 square feet, for a total of 168 square feet. Our guide to the [square footage calculator](/guides/square-footage-calculator) goes deeper on irregular rooms and subtracting areas you will not tile, such as the footprint of a fixed kitchen island or a bathtub. Walls work the same way, with height replacing one of the floor dimensions. A shower wall 5 feet wide and 7 feet tall is 35 square feet.",
      ],
      steps: [
        "Sketch the room and split odd shapes into plain rectangles on paper.",
        "Measure each rectangle in feet and inches, in at least two places, and keep the largest reading.",
        "Convert inches to decimal feet by dividing by 12, then multiply length by width for each rectangle.",
        "Add the rectangles together, and subtract only large areas you definitely will not tile, like a tub footprint.",
        "Record the total as your raw square footage. Waste and grout adjustments come next, not yet.",
      ],
    },
    {
      heading: "Step two: turn square footage into a tile count",
      paragraphs: [
        "Once you have the area, divide it by the area of a single tile, also in square feet. Multiply the tile length by its width in inches, then divide by 144, because there are 144 square inches in a square foot. A 12 inch by 12 inch tile is exactly 1 square foot. A 12 inch by 24 inch large format tile is 2 square feet per tile. A small 3 inch by 6 inch subway tile is 0.125 square feet, so you need 8 of them to cover a single square foot before cuts.",
        "Run the bathroom through this step. The floor is 40 square feet and the tile is 12 inch by 12 inch, so the raw count is 40 tiles. With 12 inch by 24 inch planks at 2 square feet each, the same floor needs 20 tiles. A larger example: a floor of 12 feet by 15 feet is 180 square feet, tiled with 12 inch by 24 inch tiles, so the raw count is 90 tiles. Hold that number loosely, because it assumes every tile lands whole with zero cuts and zero breakage. Waste, covered next, turns this tidy number into an order you can actually build with. Mosaics arrive mounted on mesh sheets, and you buy them by the sheet or by the box, using the sheet coverage printed on the packaging.",
      ],
    },
    {
      heading: "Waste percentages: the pattern decides how much extra to buy",
      paragraphs: [
        "Waste is not sloppiness, it is geometry. Every room forces cuts along walls, around pipes and through doorways, and every pattern forces extra cuts of its own. A straight grid lay uses mostly whole tiles with simple edge cuts, so the standard allowance is 10 percent. Turn that same tile 45 degrees for a diagonal lay and every perimeter tile gets cut on an angle, offcuts stop fitting anywhere useful, and the allowance climbs to about 15 percent. Herringbone is hungrier still: the zigzag ends leave angled gaps along every wall, and 20 percent is the honest planning figure. Chevron can push past 20 percent on small rooms.",
        "Room shape matters as much as pattern, and small bathrooms can eat 15 percent even in a grid. First time tilers should take the top of each range. Apply waste to the area before you convert to boxes. The bathroom at 40 square feet with a straight lay needs 40 times 1.10, which is 44 square feet, or 44 tiles. The 180 square foot kitchen laid diagonally needs 180 times 1.15, which is 207 square feet. In 12 inch by 24 inch tiles, that is 104 tiles. You always round tile counts up. Keep a handful of leftover tiles for future repairs too, since tiles get discontinued.",
      ],
      table: {
        caption: "Typical waste allowances by tile pattern",
        headers: ["Pattern", "Waste to add", "Why it needs that much"],
        rows: [
          ["Straight lay (grid)", "10 percent", "Mostly whole tiles, simple straight cuts at the edges"],
          ["Offset or brick bond", "10 to 15 percent", "Staggered joints create more cut pieces along both walls"],
          ["Diagonal (45 degrees)", "15 percent", "Angled cuts at every wall, offcuts rarely reusable"],
          ["Herringbone", "20 percent", "Zigzag borders need many angled cuts, small pieces add up"],
          ["Chevron", "20 to 25 percent", "Mitered points plus border cuts, worst in small rooms"],
          ["Mosaic sheets", "10 percent", "Sheets trim easily, but borders and outlets still eat material"],
        ],
      },
    },
    {
      heading: "Grout gaps: small lines that change the layout",
      paragraphs: [
        "Tiles are not laid edge to edge. The grout joint between them, usually 1/16 inch to 1/8 inch on walls and 3/16 inch to 1/4 inch on floors, slightly changes how many tiles fit along a run. Think in terms of pitch: the tile size plus one grout line. A 6 inch subway tile with a 1/8 inch joint advances 6.125 inches per tile. Across a 96 inch wall, the count works out to 16 tiles wide, with the last tile cut.",
        "On total counts, the grout gap effect is small, so do not shave your order because of it. Where grout size matters for ordering is the grout itself: wider joints drink far more grout, so read the chart on the bag for your tile size and joint width. Rectified tiles can run tight 1/16 inch joints. Handmade look tiles need wider joints, often 3/16 inch or more, to absorb size variation without lippage.",
      ],
      table: {
        caption: "Common grout joint widths by tile type",
        headers: ["Tile type", "Typical joint width", "Notes"],
        rows: [
          ["Rectified porcelain, walls", "1/16 to 1/8 inch", "Tight joints only work when tiles are very uniform"],
          ["Subway and ceramic wall tile", "1/8 inch", "The classic backsplash joint, forgiving and clean"],
          ["Standard floor tile", "3/16 inch", "Handles slight size variation and floor movement"],
          ["Large format (24 inch and up)", "3/16 to 1/4 inch", "Wider joints help hide lippage on big pieces"],
          ["Natural stone", "3/16 to 1/4 inch", "Stone edges are softer and less uniform than porcelain"],
          ["Mosaic on mesh sheets", "1/8 inch", "Match the joint built into the sheet itself"],
        ],
      },
    },
    {
      heading: "Boxes and coverage per box: how tile is actually sold",
      paragraphs: [
        "You cannot buy 104 loose tiles at most stores. Tile comes in boxes with a printed coverage, and that label, not your tile count, sets the order. A typical box of 12 inch by 24 inch porcelain holds 8 tiles and covers 16 square feet. A box of 12 inch by 12 inch tile often holds 10 tiles covering 10 square feet. Always read the specific box in front of you, because the same nominal tile size covers different areas per box across brands.",
        "The box calculation is one division and one round up: take your area including waste, divide by the coverage per box, and round any fraction up. The diagonal kitchen needs 207 square feet, and the box covers 16 square feet, so 207 divided by 16 is 12.94, which means 13 boxes. Those 13 boxes hold 104 tiles, matching the tile count from the waste section. The straight lay bathroom needs 44 square feet with boxes covering 10 square feet, so you buy 5 boxes, receiving 50 tiles for a 44 tile job. Budget from the box count, not the area. If the kitchen tile sells at 38 dollars per box, 13 boxes cost 494 dollars for tile alone. For outdoor projects on a gravel base, the same measure twice discipline applies, as our guide to the [gravel calculator](/guides/gravel-calculator) explains. Check every box for the same dye lot numbers before you leave the store, and mix tiles from several boxes as you lay.",
      ],
    },
    {
      heading: "Worked example: a bathroom floor, start to finish",
      paragraphs: [
        "Put the whole method together on the bathroom that has followed us through this guide. The room measures 5 feet by 8 feet, so the floor area is 40 square feet. Leaving the tub footprint in the count is simpler and the extra tile becomes your cut allowance and spares, so we keep 40 square feet as the working area. The chosen tile is a 12 inch by 12 inch porcelain at 1 square foot per tile, laid in a straight grid with a 3/16 inch floor joint.",
        "The pattern is a straight lay, so the waste allowance is 10 percent, and 40 times 1.10 gives 44 square feet to order, or 44 tiles minimum. The tile sells in boxes of 10 covering 10 square feet each, so 44 divided by 10 is 4.4 boxes, rounded up to 5 boxes, which deliver 50 tiles. Six tiles of headroom covers a bad cut or two and leaves a few spares. If this same floor were laid diagonally, the allowance would rise to 15 percent, the order area would be 46 square feet, and the box count would still be 5, but your spare cushion would shrink to 4 tiles, which argues for a sixth box on trickier patterns.",
      ],
    },
    {
      heading: "Worked example: a kitchen backsplash in herringbone",
      paragraphs: [
        "Backsplashes are where pattern waste stops being theory. Picture a run of cabinets 10 feet long, with 18 inches of open wall between the countertop and the underside of the wall cabinets. The area is 10 feet times 1.5 feet, which is 15 square feet. The homeowner has chosen a 3 inch by 6 inch subway tile laid in herringbone.",
        "Each subway tile covers 0.125 square feet, so the raw count is 15 divided by 0.125, which is 120 tiles. Herringbone waste at 20 percent lifts the order to 144 tiles, or in area terms 18 square feet. If the tile sells in boxes covering 5 square feet, the order is 18 divided by 5, which is 3.6, rounded up to 4 boxes. Those boxes hold 160 tiles, giving you 16 spares over the working count, a sensible cushion for a pattern where the border cuts are all angled. Contrast the same wall in a simple offset brick pattern at 10 percent waste: 16.5 square feet, which is 132 tiles, and still 4 boxes by coverage, but with 28 spare tiles inside them. Do not forget the edges either: exposed ends need bullnose pieces or a metal edge profile, and every outlet is a tile that gets cut.",
      ],
    },
    {
      heading: "Ordering, spares and the mistakes that stall projects",
      paragraphs: [
        "The costliest tile mistake is not mathematical, it is timing. Tile, thinset and grout should all be on site and checked before demolition starts, because a special order tile can carry a lead time of one to three weeks. Count the boxes when they arrive and confirm the tile inside matches the sample.",
        "Under ordering usually traces back to measuring only once, forgetting waste, or using the wrong box coverage. Over ordering usually traces back to adding waste twice. Pick one clean path: area, then waste, then boxes with a single round up. If a lumber order is part of the same project, our guide to the [board foot calculator](/guides/board-foot-calculator) covers that conversion with the same care. Ask the return policy before you buy, and keep a few whole tiles with the dye lot number noted.",
        "Ready to turn your measurements into an order? Run them through the [tile calculator](/calculators/tile-calculator) with your pattern selected, and compare its box count against your hand calculation. When the two agree, order with confidence. Browse the rest of the [guides](/guides) library for the neighboring jobs.",
      ],
      bullets: [
        "Order everything from one dye lot, and verify the lot numbers on every box at pickup.",
        "Add waste once, based on the pattern, then round up once at the box stage. Never pad twice.",
        "Keep spare tiles and the dye lot number for future repairs, stored flat and dry.",
        "Confirm the return policy on unopened boxes before you pay, not after the job.",
        "For wood look plank tile, expect offset limits too: many makers cap the stagger at one third to avoid lippage.",
      ],
    },

  ],
  faqs: [
    {
      q: "How much extra tile should I buy for waste?",
      a: "For a straight grid lay, add 10 percent to your square footage. Diagonal layouts need about 15 percent, and herringbone needs about 20 percent, with chevron sometimes higher in small rooms. Take the top of the range if the room has many obstacles or it is your first tiling job, because broken and miscut tiles come out of the same allowance.",
    },
    {
      q: "How do I convert tile size into tiles per square foot?",
      a: "Multiply the tile length by its width in inches, then divide by 144 to get square feet per tile, and divide 1 by that number for tiles per square foot. A 12 by 24 inch tile is 288 square inches, or 2 square feet, so half a tile covers each square foot. A 3 by 6 inch subway tile is 0.125 square feet, so you need 8 per square foot.",
    },
    {
      q: "Should I round up to full boxes even if I only need part of one?",
      a: "Yes. Tile is sold by the box, and the partial box is where your pattern finishing pieces and cutting mistakes come from. Divide your area including waste by the coverage printed on the box and always round up. Keeping the extra as spares protects you if a tile cracks years later, when the line may be discontinued.",
    },
    {
      q: "Does the grout gap change how many tiles I need?",
      a: "Only slightly. Grout joints cover a small share of the total area, so a big floor needs a touch fewer tiles than the raw division suggests, but the difference sits well inside your waste allowance, so do not reduce the order for it. The gap matters more for layout: it sets the pitch of each row, changes where cuts land, and drives how much grout you need.",
    },
    {
      q: "How do I calculate tile for an L shaped or irregular room?",
      a: "Split the sketch into rectangles, calculate each one separately, and add the results. A 12 by 10 foot main area plus a 6 by 8 foot nook is 120 plus 48, which is 168 square feet. Subtract only large areas you will not tile at all, then apply your waste percentage and box rounding to the total.",
    },
    {
      q: "How many tiles are in a box?",
      a: "It varies by tile and brand, which is why the coverage printed on the box is the number to trust. A box of 12 by 24 inch porcelain commonly holds 8 tiles covering 16 square feet, while a box of 12 by 12 inch tile often holds 10 tiles covering 10 square feet. Always check the label of the exact product you are buying before calculating your order.",
    },
  ],
  relatedSlugs: ["square-footage-calculator", "gravel-calculator", "board-foot-calculator"],
};
