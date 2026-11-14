import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "concrete-calculator",
  keyword: "concrete calculator",
  title: "Concrete Calculator: How Much Concrete Do You Need for Slabs, Patios and Footings?",
  metaTitle: "Concrete Calculator Guide: Yards, Bags and Costs Explained",
  metaDescription: "Learn how to calculate concrete in cubic yards, how many 80 lb and 60 lb bags you need, and how to order the right amount for slabs, patios and footings.",
  excerpt: "How to work out cubic yards and bag counts for slabs, patios and footings, with real project examples, waste allowances and the measuring mistakes that leave people short mid-pour.",
  category: "Home and DIY",
  toolSlug: "concrete-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "Running short of concrete halfway through a pour is one of the most stressful mistakes in home building. The truck has left, the slab is half finished, and the concrete already down is starting to set while you scramble for more. Order too much and you have paid for material that gets hauled away. Getting the amount right starts with simple volume math, but the details, thickness, waste and the shape of your forms, are where most estimates drift.",
    "The quickest way to check your numbers is to enter your measurements into the free [concrete calculator](/calculators/concrete-calculator) and compare the result with a hand calculation. This guide shows you how that calculation works, so you can spot a bad measurement before it becomes an expensive problem. You will see full examples for a driveway slab, a small patio and a row of fence post footings, plus how to convert the answer into ready-mix yards or into bags you mix yourself.",
    "Concrete is sold in two very different ways in the United States, and choosing between them early saves money. Small jobs are usually mixed on site from bags bought at a home center. Larger jobs are delivered ready mixed by the cubic yard in a rotating drum truck. The math for the volume is identical either way. What changes is how you round, how much extra you allow for waste, and how you handle delivery fees and minimum orders, all of which this guide covers in plain steps.",
  ],
  keyPoints: [
    "Volume is length times width times thickness, all in feet, divided by 27 to get cubic yards.",
    "A standard slab is 4 inches thick, which is 0.333 feet. Driveways that carry cars often use 4 to 6 inches.",
    "An 80 lb bag yields about 0.6 cubic feet and a 60 lb bag yields about 0.45 cubic feet of mixed concrete.",
    "Add 5 to 10 percent extra for waste, uneven ground and spillage. Running short costs far more than a small surplus.",
    "Jobs under about 1 cubic yard are usually cheaper with bags. Larger pours favor a ready-mix truck.",
    "Measure the inside of your forms, not the outside, and check the depth in several places, not just at the edges.",
  ],
  sections: [
    {
      heading: "The basic formula: volume in cubic yards",
      paragraphs: [
        "Concrete volume is just the space your forms will fill: length times width times thickness. The catch is units. Suppliers sell by the cubic yard, while thickness is usually given in inches. Convert everything to feet first, multiply to get cubic feet, then divide by 27, because one cubic yard contains 27 cubic feet. That final division is the step people forget most often.",
        "A shed base measures 10 feet long by 8 feet wide, at 4 inches thick. Four inches is 4 divided by 12, which is 0.333 feet. Multiply 10 by 8 by 0.333 and you get 26.64 cubic feet. Divide by 27 and the answer is 0.99 cubic yards, call it 1 cubic yard before waste, or about 1.1 cubic yards with a 10 percent waste allowance. A pad that looks small still needs a full yard, which is why guessing by eye underestimates.",
        "Thickness has an outsized effect: going from 4 inches to 6 inches increases volume by half, even though the footprint stays the same. Ground that looks flat often is not, and if one corner of your excavation sits an inch deeper than the rest, that extra inch spreads across the whole slab. So measure depth at the four corners and in the center, average the readings, and use that average in your calculation.",
      ],
    },
    {
      heading: "Worked example: a standard driveway slab",
      paragraphs: [
        "Say you are replacing a single car driveway measuring 20 feet long by 10 feet wide. Because it will carry a car and a pickup, you choose 4 inches thick on a well compacted gravel base, the common residential standard where soils are stable and loads are light. Many builders choose 5 or 6 inches for heavier vehicles or weaker soil, and your local code or a contractor can advise which fits your site.",
        "Length 20 feet times width 10 feet gives 200 square feet. Multiply by the thickness in feet, 0.333, and you get 66.6 cubic feet. Divide by 27 and the volume is 2.47 cubic yards. Add 10 percent for waste and the order quantity becomes about 2.7 cubic yards, so order 2.75 or 3 yards and gain a small cushion for a low spot in the base.",
        "Mixing this driveway from bags explains why almost nobody does. At 0.6 cubic feet per 80 lb bag, 66.6 cubic feet needs 111 bags before waste, about 122 with waste: more than two pallets, hours of mixing, and a real risk of cold joints. A ready-mix truck gets one consistent slab poured in a single session. Confirm the bag count and yardage side by side in the [concrete calculator](/calculators/concrete-calculator) before you commit.",
      ],
      steps: [
        "Measure the driveway length and width in feet: 20 feet by 10 feet in this example.",
        "Choose thickness and convert to feet: 4 inches divided by 12 equals 0.333 feet.",
        "Multiply length by width by thickness: 20 times 10 times 0.333 equals 66.6 cubic feet.",
        "Divide by 27 to get cubic yards: 66.6 divided by 27 equals 2.47 cubic yards.",
        "Add 10 percent for waste: 2.47 times 1.10 equals about 2.7 cubic yards, so order 2.75 to 3 yards.",
      ],
    },
    {
      heading: "Bags or ready-mix truck: which one fits your job",
      paragraphs: [
        "Bagged concrete puts you in control of timing: mix a little at a time and store leftover bags for the next repair. The tradeoff is labor and consistency, since every batch must be mixed the same and placed before it stiffens. Once a job passes about 1 cubic yard, or roughly 45 bags of the 80 lb size, a ready-mix delivery usually wins on cost per yard and finished quality.",
        "Bag yield is the number to memorize. An 80 lb bag yields about 0.6 cubic feet once mixed, a 60 lb bag about 0.45 cubic feet, and a 50 lb bag about 0.375 cubic feet. Divide the cubic feet your project needs by the yield, round up, and add waste. A repair needing 6 cubic feet takes 10 bags of the 80 lb size, or about 14 bags of the 60 lb size, which cost more per cubic foot but are easier to lift.",
        "Ready-mix pricing works differently: you pay per cubic yard, plus a delivery fee and often a short load fee below the supplier minimum, commonly 4 to 5 yards. Ask for the full delivered price and the unloading time limit. Rounding your 2.7 yard driveway up to 3 yards is usually cheaper than a second short load later. Our [gravel calculator guide](/guides/gravel-calculator) helps you size the compacted base under the slab.",
      ],
      table: {
        caption: "Bag counts for common volumes, before adding a waste allowance",
        headers: ["Volume needed", "80 lb bags (0.6 cu ft each)", "60 lb bags (0.45 cu ft each)"],
        rows: [
          ["0.25 cubic yard (6.75 cu ft)", "12 bags", "15 bags"],
          ["0.5 cubic yard (13.5 cu ft)", "23 bags", "30 bags"],
          ["1 cubic yard (27 cu ft)", "45 bags", "60 bags"],
          ["2 cubic yards (54 cu ft)", "90 bags", "120 bags"],
        ],
      },
    },
    {
      heading: "Worked example: fence post footings and a patio",
      paragraphs: [
        "Fence post footings are cylinders, and the formula changes to pi times the radius squared times the depth. Picture a fence with 8 posts. Each hole is 12 inches wide, so the radius is 0.5 feet, and 30 inches deep, or 2.5 feet, to get below the frost line. One hole is 3.1416 times 0.5 times 0.5 times 2.5, about 1.96 cubic feet. Most builders ignore the small deduction for the post itself and treat the extra as built in waste allowance.",
        "For 8 holes, that is about 15.7 cubic feet, or 0.58 cubic yards. In bags, 15.7 divided by 0.6 gives about 27 bags of the 80 lb size, or about 35 bags of the 60 lb size. Bags make sense here: the holes are spread along a fence line, the total volume is modest, and you can set two or three posts at a time, brace them, and move on without racing a truck driver clock. Digging a hole a little wider than planned is common, so buy a few extra bags and keep the receipt; unopened bags return easily, an emergency trip mid-job does not.",
        "A patio sits between those cases. A patio 12 feet by 10 feet at 4 inches thick has a surface of 120 square feet, which you can verify with our [square footage calculator guide](/guides/square-footage-calculator). Volume is 12 times 10 times 0.333, which equals 40 cubic feet, or 1.48 cubic yards, about 1.6 yards with waste. That is right at the crossover point, and most homeowners will get a better, flatter finish from a short ready-mix delivery.",
      ],
    },
    {
      heading: "How thick should it be, and what goes underneath",
      paragraphs: [
        "Thickness is a structural choice, not just a cost choice. A 4 inch slab is the standard for patios, walkways, shed bases and most residential driveways on good soil. Garage floors and heavier loads often go to 5 or 6 inches, and footings under load bearing walls are sized by code. Going one step thicker on a small job adds little material and buys real strength, because strength rises fast with depth.",
        "What sits underneath matters as much. A compacted gravel base, usually 2 to 4 inches deep, spreads load, helps drainage and gives you a level surface to screed against, which also makes your depth more even and your volume estimate more honest. Soil that pumps or holds water needs more base and better drainage before any concrete goes down. Wire mesh or rebar does not stop concrete cracking as it shrinks, but it holds cracks tight and keeps sections level with each other. Control joints, cut or tooled at regular intervals, tell those shrinkage cracks where to go so the surface stays tidy.",
        "Finishing and curing decide how the surface looks five years later. Keep the slab moist and protected for several days, avoid pouring onto frozen ground or in heavy rain, and do not add extra water at the truck to make finishing easier: extra water makes the mix easier to move for ten minutes and weaker for decades.",
      ],
      bullets: [
        "Patios and walkways: 4 inches thick on 2 to 4 inches of compacted gravel is the usual build.",
        "Driveways for cars: 4 inches minimum, with 5 to 6 inches common for pickups, weak soil or freeze and thaw climates.",
        "Fence posts: hole diameter about three times the post width, depth often one third of the post length and below the frost line.",
        "Footings for walls and structures: depth and width set by local code and load, so check before you dig and order.",
      ],
    },
    {
      heading: "Common mistakes that throw the estimate off",
      paragraphs: [
        "The most common error is mixing units. Multiplying feet by feet by inches without converting produces a number twelve times too big. Always convert thickness to feet and sanity check the result: a single car driveway should land near 2 to 3 yards, not 30. Suppliers will happily deliver exactly the wrong amount you asked for.",
        "The second error is measuring the outside of the forms or the excavation instead of the inside, where the concrete actually goes. Measure inside to inside. The third error is assuming the base is level: a base that dips by an inch across a 200 square foot driveway adds about 0.6 cubic yards you did not budget for. On a well prepared job, 5 percent waste is enough. On rough ground or hand dug holes, use 10 percent or a little more.",
        "Finally, people forget the small pours attached to the main job: the thickened edge, the step at the door, the pad under a heat pump. Walk the whole project with a notebook, list every piece with its own measurements, add them together, then apply waste once to the total. If your patio will be tiled later, our [tile calculator guide](/guides/tile-calculator) carries the same measured area into a tile estimate.",
      ],
    },
    {
      heading: "Ordering day: a calm checklist for delivery or bags",
      paragraphs: [
        "Order ready-mix for a morning slot when you can: cooler temperatures give you more working time, and a morning delay still leaves daylight to finish. Have forms braced, base compacted, reinforcement placed and tools ready before the truck arrives, because suppliers allow a set unloading window and charge for extra time. Line up enough helpers, since placing and screeding is heavy, fast work, and confirm access: a loaded mixer is heavy and wide, and should not cross a septic field or soft lawn without thought.",
        "If you are mixing bags, stage them close to the mixer, keep them off damp ground, and mix full bags so the proportions stay right. Count bags against your calculation as you go. If you are halfway through the bags but only a third of the way through the forms, stop and recheck your depth.",
        "However you buy, run the final numbers once more the night before. Put your measurements through the [concrete calculator](/calculators/concrete-calculator), compare with your hand math, and make sure the two agree before you order. For more project guides, browse the full [guides hub](/guides).",
      ],
    },
  ],
  faqs: [
    {
      q: "How many cubic yards are in a standard driveway?",
      a: "A single car driveway 20 feet by 10 feet at 4 inches thick needs 2.47 cubic yards before waste, so most people order 2.75 to 3 yards. A double width driveway at 20 feet by 20 feet at the same thickness needs about 5 cubic yards before waste. Thickness and waste allowance move the total more than any other choice.",
    },
    {
      q: "How many 80 lb bags make one cubic yard?",
      a: "One cubic yard is 27 cubic feet, and an 80 lb bag yields about 0.6 cubic feet, so you need 45 bags per cubic yard before waste. With a 10 percent waste allowance, plan on about 50 bags per yard. For 60 lb bags at 0.45 cubic feet each, the count is 60 bags per yard before waste.",
    },
    {
      q: "How much extra concrete should I order for waste?",
      a: "Add 5 percent on a flat, well measured job with tight forms, and 10 percent for most home projects. Use a little more for hand dug holes, rough ground or irregular shapes, because digging almost always removes more soil than the plan shows. A small surplus is cheap insurance compared with a second delivery and a cold joint in the slab.",
    },
    {
      q: "What thickness should a patio slab be?",
      a: "Four inches is the standard thickness for a residential patio on a compacted gravel base, and it handles furniture, grills and foot traffic comfortably. If the patio will carry a hot tub, a heavy outdoor kitchen or vehicle loads, increase the thickness to 5 or 6 inches and add reinforcement, and check local requirements for your area.",
    },
    {
      q: "Is it cheaper to mix bags or order a truck?",
      a: "For small jobs under about half a cubic yard, bags are usually cheaper because you avoid delivery and short load fees. As the job grows past about 1 cubic yard, a ready-mix truck usually wins on total cost and almost always wins on finish quality, because the whole pour is placed at one consistency in one session.",
    },
    {
      q: "How do I calculate concrete for a round slab or footing?",
      a: "For a circle, multiply pi (3.1416) by the radius in feet squared, then by the thickness or depth in feet, to get cubic feet. Divide by 27 for cubic yards. For example, a round base 6 feet across (radius 3 feet) and 4 inches thick is 3.1416 times 9 times 0.333, about 9.4 cubic feet, or 0.35 cubic yards before waste.",
    },
  ],
  relatedSlugs: ["square-footage-calculator", "gravel-calculator", "tile-calculator"],
};
