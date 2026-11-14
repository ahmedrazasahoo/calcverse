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
        "Every tile calculation starts with area, and for a simple rectangular floor that means length times width, both in feet. A bathroom floor that measures 5 feet by 8 feet is 40 square feet, full stop. Measure wall to wall at the widest points, and measure in two or three places in older houses, because rooms that look rectangular often are not. If one end of the room is 8 feet 2 inches and the other is 7 feet 11 inches, you tile for the bigger number and cut the difference away. Convert leftover inches to decimal feet by dividing by 12, so 8 feet 6 inches becomes 8.5 feet, and 3 inches becomes 0.25 feet.",
        "Real rooms have alcoves, closets, and L shapes, and the reliable way to handle them is to split the sketch into rectangles, work out each one, and add the results. An L shaped kitchen might split into a main block of 12 feet by 10 feet, which is 120 square feet, plus a breakfast nook of 6 feet by 8 feet, which is 48 square feet, for a total of 168 square feet. Trying to measure an L shape in one heroic measurement almost always misses a corner. Our guide to the [square footage calculator](/guides/square-footage-calculator) goes deeper on irregular rooms, cutouts and subtracting areas you will not tile, such as the footprint of a fixed kitchen island or a bathtub.",
        "Walls work the same way, with height replacing one of the floor dimensions. A shower wall 5 feet wide and 7 feet tall is 35 square feet. For a tub surround with three walls, measure and add each wall separately, because the two short walls are rarely identical twins. Subtract big openings if you like, such as a window, but many tilers leave small deductions in the count as built in extra. That quiet cushion has saved many jobs when a cut goes wrong near the end of a long day.",
        "Write down whether each number is the raw area or the area after waste, and never mix the two in one column of figures. Store listings, box labels and quotes all talk in square feet of coverage, so keeping your own notes in the same unit prevents the classic mix up between tiles, square feet and boxes. Those are three different quantities, and confusing them is how a 40 square foot bathroom turns into a 40 tile order for a floor that needs far more.",
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
        "Once you have the area, divide it by the area of a single tile, also in square feet. Getting the tile area right is pure unit conversion: multiply the tile length by its width in inches, then divide by 144, because there are 144 square inches in a square foot. A 12 inch by 12 inch tile is 144 square inches, so exactly 1 square foot per tile, which is why it is the friendliest size for mental math. A 12 inch by 24 inch large format tile is 288 square inches, or 2 square feet per tile. A small 3 inch by 6 inch subway tile is 18 square inches, which is 0.125 square feet, so you need 8 of them to cover a single square foot before cuts.",
        "Run the bathroom from the last section through this step. The floor is 40 square feet and the tile is 12 inch by 12 inch at 1 square foot each, so the raw count is 40 divided by 1, which is 40 tiles. Clean and simple. Now change only the tile: with 12 inch by 24 inch planks at 2 square feet each, the same floor needs 40 divided by 2, which is 20 tiles. Same room, half the pieces, and each piece is heavier and harder to handle. Tile size changes the labor and the look far more than it changes the coverage math.",
        "A kitchen example shows the division at a larger scale. Take a floor of 12 feet by 15 feet, which is 180 square feet, tiled with 12 inch by 24 inch tiles covering 2 square feet each. The raw count is 180 divided by 2, which is 90 tiles. Hold that number loosely, because it assumes every tile lands whole with zero cuts and zero breakage, which has never happened on a real job. Waste, covered next, is what turns this tidy classroom number into an order you can actually build with.",
        "Small tiles flip the problem. Counts climb into the hundreds or thousands, and nobody sane counts out individual mosaic tiles at the store. Mosaics arrive mounted on mesh sheets, often about 12 inches square, and you buy them by the sheet or by the box of sheets, using the sheet coverage printed on the packaging. The same divide by coverage logic applies, just with the sheet as your unit instead of the single chip. Whichever unit you choose, stay with it through the whole calculation.",
      ],
    },
    {
      heading: "Waste percentages: the pattern decides how much extra to buy",
      paragraphs: [
        "Waste is not sloppiness, it is geometry. Every room forces cuts along walls, around pipes and through doorways, and every pattern forces extra cuts of its own. A straight grid lay uses mostly whole tiles with simple edge cuts, so the standard allowance is 10 percent. Turn that same tile 45 degrees for a diagonal lay and every perimeter tile gets cut on an angle, offcuts stop fitting anywhere useful, and the allowance climbs to about 15 percent. Herringbone is hungrier still: the zigzag ends leave angled gaps along every wall, each piece is cut to fit a moving pattern, and 20 percent is the honest planning figure. Chevron, where tile ends are mitered into points, can push past 20 percent on small rooms.",
        "Room shape matters as much as pattern. A plain rectangle with a straight lay can genuinely come in near 7 or 8 percent waste in skilled hands, while a small bathroom with a toilet flange, a vent, and three doorways can eat 15 percent even in a grid. Small rooms are waste heavy because cuts are a bigger share of a small total, and a single broken tile in a 40 square foot floor is a larger percentage than the same break in a 300 square foot kitchen. First time tilers should take the top of each range. The extra box is cheap insurance compared with a second delivery and a possible dye lot mismatch.",
        "Apply waste to the area before you convert to boxes. The bathroom floor at 40 square feet with a straight lay needs 40 times 1.10, which is 44 square feet of tile, or 44 tiles in a 12 inch by 12 inch tile. The 180 square foot kitchen laid diagonally needs 180 times 1.15, which is 207 square feet. In 12 inch by 24 inch tiles at 2 square feet each, that is 207 divided by 2, which is 103.5, so 104 tiles. Notice the rounding: you always round tile counts up to the next whole tile, because half a tile ordered is a tile you do not have when the pattern reaches the far wall.",
        "One more category of waste hides in plain sight: the future. Tiles get discontinued, and a cracked tile five years from now can only be replaced invisibly from your own spares. Keeping a handful of leftover tiles, or one unopened box, in a closet is standard practice among pros. That is not part of the waste percentage for the install itself, it is a separate, deliberate decision, and it is far cheaper today than a full floor replacement conversation later.",
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
        "Tiles are not laid edge to edge. The grout joint between them, usually 1/16 inch to 1/8 inch on walls and 3/16 inch to 1/4 inch on floors, is part of the finished surface, and it slightly changes how many tiles fit along a run. The trick for layout math is to think in terms of pitch: the tile size plus one grout line. A 6 inch subway tile with a 1/8 inch joint advances 6.125 inches for each tile you add after the first. Across a 96 inch wall, the count works out to 16 tiles wide, with the last tile cut, because 16 tiles take up 16 times 6 inches plus 15 joints of 1/8 inch, which is 96 plus 1.875, or 97.875 inches of coverage before trimming. Grout never lets you skip a tile on a run like this, it just changes where the cuts land.",
        "On total counts, the grout gap effect is small and runs in your favor: the joints cover a little of the area, so a large floor needs a touch fewer tiles than the raw division suggests. Do not shave your order because of it. Your waste allowance is doing heavier work, and the gap savings are well inside that margin. Where grout size genuinely matters for ordering is the grout itself. Wider and deeper joints drink far more grout than tight ones, and the bag coverage printed by the manufacturer drops fast as joints widen. Read the chart on the bag for your tile size and joint width rather than trusting a generic number from memory.",
        "Joint width is also an appearance and tolerance decision, not just a math input. Rectified tiles, ground to precise sizes, can run tight 1/16 inch joints. Handmade look tiles with wavy, uneven edges need wider joints, often 3/16 inch or more, to absorb the size variation without lippage, where one tile edge sits proud of its neighbor. Large format tiles usually get at least a 3/16 inch joint, and many installers insist on it for floors that see temperature swings. Pick the joint for the tile and the room first, then let the layout math follow from that choice.",
        "Spacers make the chosen gap real. Cross shaped spacers suit grid layouts, wedge and horseshoe shims suit wall work and large format, and leveling clips double as spacers on big floor tiles. Whatever system you use, pull spacers before grouting if the maker says to, because a spacer buried under grout can show through as a pale cross on a dark joint years later. Small detail, long memory.",
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
        "You cannot buy 104 loose tiles at most stores. Tile comes in boxes with a printed coverage, and that label, not your tile count, sets the order. A typical box of 12 inch by 24 inch porcelain holds 8 tiles and covers 16 square feet. A box of 12 inch by 12 inch tile often holds 10 tiles covering 10 square feet. Subway tile might come 40 to a box covering 5 square feet. Always read the specific box in front of you, because the same nominal tile size covers different areas per box across brands, and clearance or imported lines break every pattern you have memorized.",
        "The box calculation is one division and one round up: take your area including waste, divide by the coverage per box, and round any fraction up to the next whole box. The diagonal kitchen needs 207 square feet, and the box covers 16 square feet, so 207 divided by 16 is 12.94, which means 13 boxes. Those 13 boxes hold 104 tiles, matching the tile count from the waste section exactly, which is a good sign your two calculation routes agree. The straight lay bathroom needs 44 square feet with boxes covering 10 square feet, so 44 divided by 10 is 4.4, and you buy 5 boxes, receiving 50 tiles for a 44 tile job.",
        "Budget from the box count, not the area. If the kitchen tile sells at 38 dollars per box, 13 boxes cost 13 times 38, which is 494 dollars for tile alone. Add thinset, grout, backer board or membrane, spacers and a blade, and materials for a mid size floor commonly land well beyond the tile line on the receipt. Getting the box count right up front is what makes the rest of the budget believable. For outdoor projects on a gravel base, such as a paver style patio, the same measure twice discipline applies to the base material, as our guide to the [gravel calculator](/guides/gravel-calculator) explains with its own depth and coverage math.",
        "Check every box for the same dye lot and caliber numbers before you leave the store, and mix tiles from several boxes as you lay, the way painters box paint. Slight shade variation spread randomly across a floor is invisible. The same variation appearing as one dark patch where a single box ran out is the first thing every guest will see. If the store cannot supply your full quantity from one lot, that is a reason to choose a different tile, not a detail to wave away.",
      ],
    },
    {
      heading: "Worked example: a bathroom floor, start to finish",
      paragraphs: [
        "Let us put the whole method together on the bathroom that has followed us through this guide. The room measures 5 feet by 8 feet inside the door, with a tub along one long wall that will not be tiled under. The floor area is 5 times 8, which is 40 square feet. The tub footprint is a fixed subtraction some tilers make, but leaving it in the count is simpler and the extra tile becomes your cut allowance and spares, so we keep 40 square feet as the working area. The chosen tile is a 12 inch by 12 inch porcelain at 1 square foot per tile, laid in a straight grid with a 3/16 inch floor joint.",
        "The pattern is a straight lay, so the waste allowance is 10 percent, and 40 times 1.10 gives 44 square feet to order. At 1 square foot per tile, that is 44 tiles minimum. The tile sells in boxes of 10 covering 10 square feet each, so 44 divided by 10 is 4.4 boxes, rounded up to 5 boxes, which deliver 50 tiles. Six tiles of headroom over the bare 44 covers a bad cut or two and leaves a few spares for the closet shelf. If this same floor were laid diagonally, the allowance would rise to 15 percent, the order area would be 46 square feet, and the box count would still be 5, but your spare cushion would shrink to 4 tiles, which is exactly the kind of squeeze that argues for a sixth box on trickier patterns.",
        "Materials beyond tile follow the same area figure. A 50 pound bag of thinset typically covers roughly 75 to 90 square feet with a standard trowel, so one bag handles this floor with room to spare, while a small bag of grout rated by the chart on its label for 12 inch tiles at a 3/16 inch joint will cover a 40 square foot floor several times over. Buy those consumables from the 40 square foot working area, not the 44 or 50 square foot order quantities, or your garage slowly fills with half bags of everything.",
        "Sanity check the finished order against the room one last time before paying: 5 boxes, 50 square feet of coverage, a 40 square foot floor, a simple pattern. Coverage exceeds area by 25 percent, which sounds like a lot until you remember that box rounding alone added 6 square feet and waste added 4. That layered padding is normal and healthy for a small room. On a 300 square foot kitchen the same method lands much closer to the raw area, because box rounding and cuts spread thinner across a bigger total.",
      ],
    },
    {
      heading: "Worked example: a kitchen backsplash in herringbone",
      paragraphs: [
        "Backsplashes are where pattern waste stops being theory. Picture a run of cabinets 10 feet long, with 18 inches of open wall between the countertop and the underside of the wall cabinets. The area is 10 feet times 1.5 feet, which is 15 square feet. That modest patch of wall is prime real estate, and the homeowner has chosen a 3 inch by 6 inch subway tile laid in herringbone, the pattern that makes tile salespeople reach for a bigger waste figure without being asked.",
        "Each subway tile covers 18 square inches, which is 0.125 square feet, so the raw count is 15 divided by 0.125, which is 120 tiles. Herringbone waste at 20 percent lifts the order to 120 times 1.20, which is 144 tiles, or in area terms 15 times 1.20, which is 18 square feet. If the tile sells in boxes covering 5 square feet, the order is 18 divided by 5, which is 3.6, rounded up to 4 boxes. Those boxes hold 160 tiles, giving you 16 spares over the working count, a sensible cushion for a pattern where the border cuts along the counter and under the cabinets are all angled and unforgiving.",
        "Now contrast the same wall in a simple offset brick pattern at, say, 10 percent waste: 15 times 1.10 is 16.5 square feet, which is 132 tiles, and still 4 boxes by coverage, since 16.5 divided by 5 is 3.3 and rounds up to 4. The box count did not change, but the working cushion inside those boxes tells the real story: the same 4 boxes hold 160 tiles either way, so the brick version sits on 28 spare tiles while the herringbone version holds only 16, and on a real install the herringbone genuinely needs its bigger waste share. When two patterns price out to the same boxes, choose on looks with a clear conscience, but keep ordering by the waste figure of the pattern you actually picked.",
        "Do not forget the edges of a backsplash in your count or your cart. The exposed ends of the run need bullnose pieces or a metal edge profile, outlets and switches need cuts planned tile by tile, and the sliver of wall behind a range hood or open shelf changes the rectangle math. Walk the wall with your sketch and mark every outlet. Each one is a tile that gets cut, and a couple of those cuts will crack on the first attempt, which your waste allowance quietly absorbs if you sized it honestly.",
      ],
    },
    {
      heading: "Ordering, spares and the mistakes that stall projects",
      paragraphs: [
        "The costliest tile mistake is not mathematical at all, it is timing. Tile, thinset and grout should all be on site, checked and acclimatizing in the room before demolition starts, because a special order tile can carry a lead time of one to three weeks and a damaged box discovered on install day restarts that clock. Count the boxes against your order when they arrive, open one, and confirm the tile inside matches the sample you fell for. Shade, finish and even size can differ between the sample board and the production run, and the time to learn that is before the old floor is in a dumpster.",
        "Under ordering usually traces back to one of three causes: measuring only once, forgetting the waste allowance for a patterned lay, or converting tile counts to boxes with the wrong coverage figure. Over ordering usually traces back to adding waste twice, once to the area and again to the box count, or to padding every intermediate number upward until the padding compounds. Pick one clean path through the math, area, then waste, then boxes with a single round up at the end, and write each stage down. If a lumber order for subfloor or trim is part of the same project, our guide to the [board foot calculator](/guides/board-foot-calculator) covers that unit conversion with the same care, since board feet confuse buyers in much the same way boxes and square feet do.",
        "Returns and spares deserve a plan before you buy. Ask the store return policy on unopened boxes while you are still a customer choosing tile, not a person pleading at the returns desk. Then decide your spare strategy on purpose: most pros keep the leftover cut tiles out of sight, a few whole tiles in a labeled spot, and the dye lot number written on the box or photographed with your phone. A cracked tile in 2031 is a ten minute repair with spares on hand and a floor wide problem without them.",
        "Ready to turn your own measurements into an order? Run them through the [tile calculator](/calculators/tile-calculator) with your pattern selected, and compare its box count against your hand calculation. When the two agree, order with confidence, and add that one extra box if your room is small, your pattern is busy, or your store is far away. Browse the rest of the [guides](/guides) library for the neighboring jobs, from square footage to concrete and gravel, each worked out with the same measure twice, order once approach.",
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
