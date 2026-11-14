import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "gravel-calculator",
  keyword: "gravel calculator",
  title: "Gravel Calculator: How Many Cubic Yards and Tons Do You Actually Need?",
  metaTitle: "Gravel Calculator Guide: Yards, Tons and Depth Tips",
  metaDescription: "Use a gravel calculator to turn measurements into cubic yards and tons, pick the right depth for driveways and paths, and order the right amount first time.",
  excerpt: "How to turn a tape measure reading into cubic yards and tons, what a cubic yard of gravel really weighs, and the right depth for driveways, paths and bases.",
  category: "Home and DIY",
  toolSlug: "gravel-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Gravel looks like the simplest material on earth, right up until you have to order it. The yard sells it by the ton, your project is measured in feet and inches, your neighbor swears you need four inches deep, and the delivery truck has a minimum load. Order too little and you pay a second delivery fee for a sad little pile. Order too much and you own a gravel mountain that lives on your driveway for a year.",
    "The math underneath is not hard once someone lays it out in the right order: area first, then depth, then volume in cubic yards, then weight in tons. The free [gravel calculator](/calculators/gravel-calculator) runs that whole chain in seconds, and this guide explains each step so you can sanity check the answer before a truck backs up to your curb.",
    "You will learn the one conversion number that matters, roughly 1.4 tons per cubic yard, and why it shifts depending on the stone you pick. You will also get sensible depths for driveways and paths, three fully worked examples with real measurements, and the ordering mistakes that cost people the most money, like forgetting that gravel compacts down after you spread it.",
  ],
  keyPoints: [
    "Volume in cubic yards is length in feet times width in feet times depth in feet, divided by 27. Convert inches of depth to feet by dividing by 12.",
    "A cubic yard of gravel weighs roughly 1.4 tons, or about 2,800 pounds. Pea gravel runs a little lighter and dense crushed stone a little heavier.",
    "One cubic yard spread 3 inches deep covers about 108 square feet. At 2 inches it covers about 162 square feet, and at 4 inches about 81 square feet.",
    "Driveways need 4 to 6 inches of gravel in total, usually built in layers. Paths and walkways need 2 to 3 inches, and a base under a patio or shed needs about 4 inches.",
    "Add about 10 percent extra to your calculated amount for compaction, settling and the uneven ground no tape measure catches.",
    "Bulk delivery by the ton or yard beats bags on price for anything over about half a cubic yard. Bags only win for tiny jobs and tight access.",
  ],
  sections: [
    {
      heading: "What a gravel calculator actually works out",
      paragraphs: [
        "Every gravel estimate follows four steps. Measure the area, length times width, in feet. Choose a depth in inches. Turn area times depth into volume in cubic yards. Finally, if the supplier sells by weight, convert cubic yards into tons. A calculator strings those steps together without arithmetic slips.",
        "The volume formula is length in feet times width in feet times depth in feet, divided by 27. The 27 is the cubic feet in a cubic yard (3 times 3 times 3). Divide inches by 12 to get feet: 3 inches is 0.25 feet, 4 inches is 0.33 feet. A patch 10 feet by 10 feet at 3 inches deep is 100 times 0.25, which is 25 cubic feet, divided by 27, giving about 0.93 cubic yards.",
        "Break odd shapes into rectangles and add the volumes. For a circle, use 3.14 times the radius times the radius for the area, then follow the same steps. Our guide to the [square footage calculator](/guides/square-footage-calculator) covers measuring awkward spaces in more detail. Measure twice, write it down, and round up to the nearest half foot.",
        "Measure the ground you actually have, not the brochure photo. Driveways flare at the street end, paths curve, and beds have planting pockets that need no gravel. Spending five extra minutes with a tape and a rough sketch beats discovering the truth while a driver waits with the bed raised. Note any slope as well, because a sloping area holds a slightly larger volume than the flat measurement suggests, and stone will also migrate downhill over time unless the edge is restrained.",
      ],
    },
    {
      heading: "Cubic yards to tons: the 1.4 ton rule",
      paragraphs: [
        "Some suppliers price by the cubic yard (volume) and others by the ton (weight). For typical gravel, one cubic yard weighs roughly 1.4 tons, about 2,800 pounds. Multiply cubic yards by 1.4 to get tons, and divide tons by 1.4 to get cubic yards. Three cubic yards is about 4.2 tons.",
        "Roughly matters, because gravel is not one material. Pea gravel, those smooth rounded stones, packs loosely and weighs about 1.3 to 1.35 tons per cubic yard. Standard crushed stone with angular edges lands close to the 1.4 average. Dense river rock and larger crushed stone can reach 1.5 tons per cubic yard. Moisture nudges the number too: a yard weighed after a week of rain is measurably heavier than the same yard in a dry spell, because the stone holds water in its pores and on its surface. If a quote seems strangely cheap per ton, check the assumed density before you celebrate, because a light material at a low price per ton can cost more per finished path than a dense material at a higher price per ton.",
        "The table below gives working weights for common materials. Use them for planning, then confirm with your supplier, who knows the density of its own stockpiles.",
      ],
      table: {
        caption: "Approximate weight of common gravel types per cubic yard",
        headers: ["Material", "Approx. weight per cubic yard", "Common uses"],
        rows: [
          ["Pea gravel", "1.3 to 1.35 tons", "Paths, play areas, decorative beds"],
          ["Crushed stone (general purpose)", "About 1.4 tons", "Driveways, drainage, general fill"],
          ["Crusher run / driveway mix", "About 1.4 to 1.45 tons", "Driveway base and top layers"],
          ["River rock", "1.4 to 1.5 tons", "Decorative beds, dry creek beds, edging"],
          ["Decomposed granite", "About 1.3 tons", "Paths, patios, rustic driveways"],
          ["Marble chips", "About 1.35 tons", "Decorative beds and borders"],
        ],
      },
    },
    {
      heading: "How deep should gravel be?",
      paragraphs: [
        "Depth drives both cost and performance. A gravel driveway wants 4 to 6 inches in total, built in layers: a base of larger crushed stone about 3 to 4 inches deep once compacted, topped with 2 to 3 inches of finer driveway mix. Skimp to 2 inches over bare soil and the stone migrates into the mud within one wet season.",
        "Paths need only 2 to 3 inches of gravel over landscape fabric. Shallower than 2 inches and the fabric peeks through. Deeper than 4 inches and walking feels like a beach. A base under a patio, shed or hot tub pad needs about 4 inches of compacted crusher run, placed in two lifts and compacted between them.",
        "One cubic yard covers about 324 square feet at 1 inch deep, about 162 square feet at 2 inches, about 108 square feet at 3 inches, about 81 square feet at 4 inches and about 54 square feet at 6 inches. One ton, about 0.71 cubic yards, covers roughly 77 square feet at 3 inches deep.",
        "Soft clay, a damp low spot or a slope argues for the top of the range, plus a proper edge restraint so material stays where you put it. Firm, well drained ground on the flat can sit at the bottom of the range without trouble. If you are topping up an existing driveway rather than starting fresh, measure the depth you are adding, not the total you wish you had. A 1.5 inch refresh over 400 square feet is a modest order, and ordering for a full 4 inches would triple the bill for stone you cannot use or spread sensibly.",
      ],
    },
    {
      heading: "Three worked examples, start to finish",
      paragraphs: [
        "Example one: a single car driveway, 24 feet by 12 feet at 4 inches deep. Area is 288 square feet. Volume is 288 times 0.33 feet, about 96 cubic feet, divided by 27 gives 3.56 cubic yards, or about 5 tons. Adding 10 percent, Tom orders 4 cubic yards, or about 5.5 tons.",
        "Example two: a garden path. Priya wants a pea gravel path 30 feet long and 3 feet wide at 3 inches deep. Area is 90 square feet. Volume is 90 times 0.25 feet, which is 22.5 cubic feet, or 0.83 cubic yards. Pea gravel at about 1.35 tons per yard puts the weight near 1.1 tons. This sits in an awkward middle: too much for a few bags, since she would need about 45 half cubic foot bags, but below many bulk minimums. Her yard delivers a single cubic yard for a modest fee, so she orders the full yard and uses the spare on a small seating circle she had planned for next spring, which turns a potential waste into a head start.",
        "Example three: a shed base, 12 feet by 10 feet at 4 inches deep, plus an apron 10 feet by 3 feet. The pad is about 40 cubic feet and the apron about 10 cubic feet, for 50 cubic feet total, which is 1.85 cubic yards or roughly 2.6 tons. With 10 percent he orders 2 cubic yards. Our guides to the [concrete calculator](/guides/concrete-calculator) and the [mulch calculator](/guides/mulch-calculator) cover neighboring jobs.",
      ],
      steps: [
        "Measure length and width in feet, and multiply them for the area in square feet.",
        "Choose your depth from the job: 2 to 3 inches for paths, 4 inches for a base, 4 to 6 inches total for a driveway.",
        "Convert depth to feet by dividing inches by 12, then multiply area by depth to get cubic feet.",
        "Divide cubic feet by 27 to get cubic yards.",
        "Multiply cubic yards by about 1.4 to get tons, adjusting a little down for pea gravel and a little up for dense river rock.",
        "Add 10 percent, round up to a size your supplier actually delivers, and confirm the delivery truck can reach the spot.",
      ],
    },
    {
      heading: "Bags or bulk: which way should you buy?",
      paragraphs: [
        "Bagged gravel suits genuinely small jobs. Even half a cubic yard is 13.5 cubic feet, or 27 bags of half a cubic foot each. The per yard price inside bags is usually two to four times the bulk price, and each bag weighs roughly 45 to 50 pounds.",
        "Bulk wins past about half a cubic yard. A cubic yard delivered costs far less than the equivalent 54 bags and arrives in one pile. You need a spot for the pile, ideally a tarp on the driveway so you can shovel the last stones cleanly, and a wheelbarrow to move it. A cubic yard is roughly 12 to 14 heaped wheelbarrow loads, which is a solid morning of work, so plan delivery for the day you can actually spread it, ideally in dry weather when the ground is firm.",
        "Many yards charge a flat delivery fee inside a radius, add per mile charges beyond it, and waive the fee above a minimum of 3 to 5 tons. Two neighbours ordering together often clear the minimum and split the fee. Ask whether the truck can dump where you want the pile. A loaded gravel truck is heavy and wide, it will not cross a soft lawn without leaving ruts, and it needs overhead clearance for the raised bed, so low branches and wires matter when you choose the drop spot.",
      ],
    },
    {
      heading: "The ordering mistakes that cost the most",
      paragraphs: [
        "Forgetting compaction is the classic. Loose gravel spread at 4 inches settles to roughly 3 to 3.5 inches, and compacted base shrinks around 20 percent from its loose depth. Order for the compacted result, not the fluffy pile. That is why the allowance is 10 percent generally and closer to 20 percent on a compacted base.",
        "Measuring in the wrong units comes second. Depth in inches must become feet before it meets area in square feet, or the answer is twelve times too big. A normal driveway needs single digit cubic yards. Run it through the [gravel calculator](/calculators/gravel-calculator) and compare.",
        "Ignoring what is underneath ranks third. Gravel on bare topsoil mixes, sinks and grows weeds. Use landscape fabric on paths or a compacted sub base on driveways. Rounded pea gravel rolls under tires, so it belongs on paths, while angular crushed stone packs firm and suits driveways.",
        "The last mistake is rounding down. The difference between 3.56 yards and 4 yards is small against a second delivery fee. Leftover gravel tops up thin spots later, while a shortfall stops the job dead. Round up every time.",
      ],
    },
    {
      heading: "Putting it all together before you order",
      paragraphs: [
        "Sketch the area, break it into rectangles or circles, and write down each measurement. Pick the depth for the job. Convert to cubic yards, then to tons at about 1.4 tons per yard if needed, add your allowance, and round up. Repeat the numbers and material name back to the yard when you order.",
        "Keep the receipt and sketch. When the driveway needs a refresh, you will know what went down and what a top up should cost. Our [guides hub](/guides) collects explainers for neighboring materials and measurements.",
        "If you only remember three numbers from this page, make them these: 27 cubic feet in a yard, about 1.4 tons per yard of gravel, and 10 percent extra on every order. With those in hand, open the [gravel calculator](/calculators/gravel-calculator), feed it your measurements, and order with the confidence of someone who will not be staring at a leftover mountain or a half finished path in June.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much gravel do I need for a 12 by 20 foot driveway?",
      a: "At 4 inches deep, a 12 by 20 foot driveway is 240 square feet times 0.33 feet, about 80 cubic feet, which is roughly 3 cubic yards or about 4.2 tons. Add 10 percent and order 3.5 cubic yards, or about 5 tons, so compaction and the flared end do not leave you short.",
    },
    {
      q: "How many tons are in a cubic yard of gravel?",
      a: "About 1.4 tons for typical gravel, which is roughly 2,800 pounds. Pea gravel runs lighter at around 1.3 tons per yard, and dense river rock can reach 1.5 tons per yard. Always confirm with your supplier, since each yard knows the weight of its own stockpiles.",
    },
    {
      q: "How much area does one ton of gravel cover?",
      a: "One ton is about 0.71 cubic yards, or roughly 19 cubic feet. Spread 3 inches deep it covers about 77 square feet, at 2 inches about 115 square feet, and at 4 inches about 58 square feet. Coverage shrinks fast as depth grows, which is why depth choice drives the whole order.",
    },
    {
      q: "How deep should gravel be on a driveway?",
      a: "Plan on 4 to 6 inches in total, built in layers: a 3 to 4 inch compacted base of larger crushed stone with 2 to 3 inches of finer driveway mix on top. A single thin layer over bare soil ruts and sinks within a season, no matter how carefully it is spread.",
    },
    {
      q: "How many bags of gravel make a cubic yard?",
      a: "A cubic yard is 27 cubic feet, so it takes 54 bags of half a cubic foot each, and each bag weighs roughly 45 to 50 pounds. That is why bulk delivery usually wins on price and effort for anything beyond a small patch or a few stepping stones.",
    },
    {
      q: "Should I put landscape fabric under gravel?",
      a: "Under paths and decorative beds, yes. Fabric keeps stone from sinking into the soil and slows weeds, which keeps the depth you paid for. Under driveways, a compacted sub base matters more than fabric alone, and some installers use a heavy geotextile made for driveways rather than thin garden fabric.",
    },
  ],
  relatedSlugs: ["mulch-calculator", "concrete-calculator", "square-footage-calculator"],
};
