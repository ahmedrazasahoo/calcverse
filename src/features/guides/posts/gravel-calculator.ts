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
        "Every gravel estimate is the same four steps wearing different clothes. First you measure the area, length times width, in feet. Then you choose a depth, usually in inches, because nobody describes a path as 0.25 feet deep. Then you turn area times depth into a volume, and because suppliers think in cubic yards, you convert that volume into cubic yards. Finally, if the supplier sells by weight, you convert cubic yards into tons. A calculator just strings those steps together without arithmetic slips, but it helps to know what each number means when you read the result.",
        "The volume formula is length in feet multiplied by width in feet multiplied by depth in feet, divided by 27. The 27 is the number of cubic feet in a cubic yard, since a yard is 3 feet and 3 times 3 times 3 is 27. Depth is the part people fumble, because it arrives in inches. Divide inches by 12 to get feet: 3 inches is 0.25 feet, 4 inches is 0.33 feet, 6 inches is 0.5 feet. A patch 10 feet by 10 feet at 3 inches deep is 100 square feet times 0.25 feet, which is 25 cubic feet, divided by 27, giving about 0.93 cubic yards. Close enough to one yard that most people just order the yard.",
        "Odd shapes are handled by breaking them into rectangles. An L shaped side yard becomes two boxes, each measured and calculated on its own, with the volumes added at the end. For a circle, like a fire pit pad, use 3.14 times the radius times the radius for the area, then carry on with the same depth and division steps. Our guide to the [square footage calculator](/guides/square-footage-calculator) walks through measuring awkward rooms and yards in more detail, and the same measuring habits apply outdoors: measure twice, write it down, and round each dimension up to the nearest half foot rather than down.",
        "One more habit separates good estimates from bad ones: measure the ground you actually have, not the ground in the brochure photo. Driveways flare at the street end, paths curve, and beds have planting pockets that need no gravel. Spending five extra minutes with a tape and a rough sketch beats discovering the truth while a driver waits with the bed raised.",
      ],
    },
    {
      heading: "Cubic yards to tons: the 1.4 ton rule",
      paragraphs: [
        "Here is the number that causes the most confusion at the landscape yard. Some suppliers price gravel by the cubic yard, a measure of volume, and others price it by the ton, a measure of weight. To compare quotes or order from a yard that sells the other way, you need the density of the material. For typical gravel, one cubic yard weighs roughly 1.4 tons, which is about 2,800 pounds. Multiply cubic yards by 1.4 to get tons, and divide tons by 1.4 to get cubic yards. Three cubic yards is about 4.2 tons, and a 5 ton load is about 3.6 cubic yards.",
        "The word roughly is doing real work in that sentence. Gravel is not one material. Pea gravel, those smooth rounded stones, packs loosely and usually weighs about 1.3 to 1.35 tons per cubic yard. Standard crushed stone with angular edges lands close to the 1.4 average. Dense river rock and larger crushed stone can reach 1.5 tons per cubic yard. Moisture nudges the number too: a yard of gravel weighed after a week of rain is measurably heavier than the same yard in a dry spell, because the stone itself holds water in its pores and surface film.",
        "The table below gives working weights for the materials people order most. Use them as planning numbers, then confirm with your supplier, because every yard knows the density of its own stockpiles and will happily tell you. If a quote seems strangely cheap per ton, check the assumed density before you celebrate. A light material at a low price per ton can cost more per finished path than a dense material at a higher price.",
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
        "Depth is the decision that drives both cost and performance, and it depends entirely on what drives, walks or sits on top. A driveway takes the most punishment. Cars concentrate thousands of pounds onto four small tire patches, and turning wheels shove stone sideways. A gravel driveway wants 4 to 6 inches of total depth, built in layers: a base of larger crushed stone about 3 to 4 inches deep once compacted, topped with 2 to 3 inches of finer driveway mix that locks together. Skimp to 2 inches over bare soil and the stone migrates into the mud within one wet season, leaving ruts that hold water exactly where you park.",
        "Paths and walkways live an easier life. Foot traffic and the odd wheelbarrow need only 2 to 3 inches of gravel, with 2.5 to 3 inches being the comfortable range for pea gravel or decomposed granite over landscape fabric. Shallower than 2 inches and the fabric peeks through within weeks. Deeper than 4 inches and walking feels like a beach, because loose stone shifts underfoot when there is too much of it. A base under a paver patio, a shed or a hot tub pad is a different job again: plan on about 4 inches of compacted crusher run, placed in two lifts and compacted between them, so the surface above stays level for years.",
        "Coverage figures make depth choices concrete. One cubic yard covers about 324 square feet at 1 inch deep, about 162 square feet at 2 inches, about 108 square feet at 3 inches, about 81 square feet at 4 inches and about 54 square feet at 6 inches. Flipped around, one ton of typical gravel, about 0.71 cubic yards, covers roughly 77 square feet at 3 inches deep. When a supplier says a ton covers about 80 square feet, this is the math behind the claim, and it assumes the full 1.4 tons per yard density.",
        "Ground conditions can push you deeper. Soft clay soil, a low spot that stays damp, or a slope where stone creeps downhill all argue for the top of the depth range, plus a proper edge restraint so the material stays where you put it. Firm, well drained ground on the flat can sit at the bottom of the range without trouble. If you are topping up an existing driveway rather than starting fresh, measure the depth you are adding, not the total you wish you had. A 1.5 inch refresh over 400 square feet is a modest order, and ordering for 4 inches would triple the bill for stone you cannot use.",
      ],
    },
    {
      heading: "Three worked examples, start to finish",
      paragraphs: [
        "Example one: a single car driveway. Tom is rebuilding a driveway that measures 24 feet long by 12 feet wide, and he wants 4 inches of gravel over the whole thing. Area is 24 times 12, which is 288 square feet. Depth in feet is 4 divided by 12, which is 0.33 feet. Volume is 288 times 0.33, about 96 cubic feet. Divide by 27 and the answer is 3.56 cubic yards. In weight, 3.56 times 1.4 is about 5 tons. Adding 10 percent for compaction and the flare at the street end, Tom orders 4 cubic yards, or about 5.5 tons if his yard sells by weight. One delivery, no second trip.",
        "Example two: a garden path. Priya wants a pea gravel path 30 feet long and 3 feet wide at 3 inches deep. Area is 90 square feet. Volume is 90 times 0.25 feet, which is 22.5 cubic feet, or 0.83 cubic yards. Pea gravel at about 1.35 tons per yard puts the weight near 1.1 tons. This sits in the awkward middle: too much for a few bags, since bagged gravel usually comes in half cubic foot bags and she would need about 45 of them, but below many bulk minimums. Her yard delivers a single cubic yard for a modest fee, so she orders the full yard and uses the spare on a small seating circle she had planned for next spring.",
        "Example three: a shed base. Marcus needs a base 12 feet by 10 feet for a storage shed, 4 inches deep in compacted crusher run, plus a small apron in front of the doors measuring 10 feet by 3 feet at the same depth. The main pad is 120 square feet times 0.33 feet, about 40 cubic feet. The apron adds 30 square feet times 0.33, about 10 cubic feet. Total is 50 cubic feet, which is 1.85 cubic yards, or roughly 2.6 tons at 1.4 tons per yard. With the 10 percent allowance he orders 2 cubic yards, about 2.9 tons. Note that Marcus is compacting in two layers, and compacted crusher run shrinks by roughly a fifth compared with its loose depth, which is exactly the kind of loss the extra allowance covers. For the shed itself he checked timber quantities with the same measuring approach he uses for concrete, and our guides to the [concrete calculator](/guides/concrete-calculator) and the [mulch calculator](/guides/mulch-calculator) cover those neighboring jobs, since a finished yard usually needs all three materials in the same weekend.",
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
        "Bagged gravel from a home center is convenient and clean, and for a genuinely small job it is the right call. Topping up a stepping stone border, filling a planter drainage layer, or covering 20 square feet at 2 inches takes well under half a cubic yard. Even half a cubic yard is 13.5 cubic feet, which works out to 27 bags of half a cubic foot each. The per bag price looks gentle, but the per yard price hidden inside it is usually two to four times the bulk price, and your car will make the point about weight for you, since each bag weighs roughly 45 to 50 pounds.",
        "Bulk wins as soon as the job passes about half a cubic yard. A cubic yard delivered costs far less than the equivalent 54 bags, arrives in one pile, and spares you fifty trips with a torn bag leaking stones across the store parking lot. The trade offs are real but manageable: you need a spot for the pile, ideally a tarp on the driveway so you can shovel the last stones cleanly, and you need to move it yourself with a wheelbarrow. A cubic yard is roughly 12 to 14 heaped wheelbarrow loads, which is a solid morning of work, so plan the delivery for the day you can actually spread it.",
        "Delivery fees follow their own logic. Many yards charge one flat fee inside a radius and add per mile charges beyond it, and some waive the fee above a minimum order of 3 to 5 tons. Two neighbors ordering together often clear the minimum and split the fee, which is worth asking about on any street where driveways age at the same rate. Also ask whether the truck can dump where you want the pile. A loaded gravel truck is heavy and wide, it will not cross a soft lawn without leaving ruts, and it needs overhead clearance for the raised bed, so trees and wires matter.",
      ],
    },
    {
      heading: "The ordering mistakes that cost the most",
      paragraphs: [
        "Forgetting compaction is the classic. Loose gravel spread at 4 inches settles to roughly 3 to 3.5 inches once tires, feet and rain have worked on it, and compacted base material shrinks even more, around 20 percent from its loose depth. If you calculate exactly to the finished depth you want, you will end up thinner than planned. This is the practical reason behind the 10 percent extra rule, and on a compacted base the honest allowance is closer to 20 percent. Order for the compacted result, not the fluffy pile.",
        "Measuring in the wrong units comes second. Depth in inches has to become feet before it meets an area in square feet, and skipping that step produces an answer twelve times too big, which has genuinely been ordered by real people. The sanity checks are simple: a normal driveway needs single digit cubic yards, not forty, and a path needs about a yard, not a truck fleet. If your number looks absurd, it is. Run it through the [gravel calculator](/calculators/gravel-calculator) and compare, because a two minute check is cheaper than refusing a delivery at the curb.",
        "Ignoring what is underneath ranks third. Gravel poured straight onto bare topsoil mixes with the soil, sinks, and grows weeds through the gaps, whatever the depth. A layer of landscape fabric on paths, or a properly graded and compacted sub base on driveways, keeps the stone separate and working. Stone choice matters here too: rounded pea gravel rolls under tires and never locks, so it belongs on paths and in beds, while angular crushed stone with fines packs into a firm surface that suits driveways. Ordering the pretty stone for the working job is an expensive aesthetic decision.",
        "The last mistake is rounding down to save money. Suppliers deliver in whole or half yard and ton increments, and the difference between 3.56 yards and 4 yards is a small sum against a second delivery fee. Leftover gravel is genuinely useful: it tops up thin spots after the first winter, fills the dip by the gate, and edges the bed you have not built yet. A shortfall, on the other hand, stops the job dead with half a driveway covered. Round up every time.",
      ],
    },
    {
      heading: "Putting it all together before you order",
      paragraphs: [
        "A good gravel order takes ten minutes of measuring and two minutes of arithmetic. Sketch the area, break it into rectangles or circles, and write down each measurement as you take it. Pick the depth for the job, not the depth that makes the total feel cheaper. Convert to cubic yards, convert to tons if your yard sells by weight using about 1.4 tons per yard, add your allowance, and round up to a deliverable size. Then call the yard and repeat the numbers back, including the material name and size, because a yard of pea gravel and a yard of crusher run look nothing alike when they land on your driveway.",
        "Keep the receipt and your sketch with the project notes. When the driveway needs a refresh in three years, you will know exactly what went down, how deep it went, and what a top up at 1.5 inches should cost, instead of starting from a blank page. The same habit pays off across the yard: our [guides hub](/guides) collects explainers for the neighboring materials and measurements, so the next project starts from what you learned on this one.",
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
