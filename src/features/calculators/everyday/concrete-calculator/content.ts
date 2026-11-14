import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Concrete Calculator: Cubic Yards, Cubic Feet and Premix Bags for Slabs, Footings and Columns",
  metaDescription:
    "Free concrete calculator for slabs, footings and round columns. Get volume in cubic yards, cubic feet and cubic metres, plus premix bag counts for 40, 50, 60 and 80 lb bags with a waste allowance.",
  intro:
    "Ordering too little concrete stops a pour cold, and ordering too much leaves you paying for a part load. Enter your slab, footing or column size, add a waste allowance, and see the exact volume and how many premix bags it takes.",
};

export const content: ToolContent = {
  seoTitle: "Concrete Calculator: Cubic Yards, Cubic Feet and Premix Bags for Slabs, Footings and Columns",
  howTo: [
    "Pick the shape: slab, footing, or round column.",
    "Choose feet and inches or metres, then enter the dimensions. Slab thickness and footing depth are in inches for imperial, metres for metric.",
    "Set the waste allowance, 10 percent for most home pours, to cover spillage and uneven ground.",
    "Read the volume to order in cubic yards, and the bag counts if you are mixing premix yourself.",
    "Round the order up to the nearest quarter yard when you call the ready mix plant.",
  ],
  explanationTitle: "How concrete volume and bag counts work",
  explanation: [
    "Volume is just area times thickness, with one trap: thickness is usually measured in inches while length and width are in feet. A 10 by 10 foot slab at 4 inches thick is 100 square feet times a third of a foot, which is 33.33 cubic feet. Divide by 27 to get cubic yards, the unit ready mix is sold in, giving 1.235 cubic yards before any waste. Round columns use the circle formula, pi times the radius squared times the height, so a 12 inch diameter column 8 feet tall holds about 6.28 cubic feet.",
    "Premix bags are rated by yield, the wet volume one bag makes when mixed. A 40 lb bag yields about 0.30 cubic feet, a 50 lb bag 0.375, a 60 lb bag 0.45 and an 80 lb bag 0.60 cubic feet. Dividing your volume by the yield gives the bag count, always rounded up because a part bag still has to be bought and mixed. That same 10 by 10 slab needs about 82 bags at 60 lb before waste, which is why anything past a small repair is usually cheaper and far less work as a ready mix delivery.",
    "The waste allowance is not padding for its own sake. Sub bases are never perfectly level, forms bow a little under load, and some concrete stays in the wheelbarrow and on tools. Ten percent covers a well prepared home job. Use 15 percent for uneven ground, hand dug footings, or a first pour where your measurements are rough, and 5 percent only for machine levelled work with tight forms.",
  ],
  faqs: [
    {
      q: "How much concrete do I need for a 10x10 slab?",
      a: "At 4 inches thick, a 10 by 10 foot slab needs 33.33 cubic feet, which is 1.235 cubic yards before waste. With a 10 percent allowance, order 1.36 cubic yards, or about 82 bags of 60 lb premix if you mix it yourself.",
    },
    {
      q: "How many 60 lb bags of concrete are in a cubic yard?",
      a: "One cubic yard is 27 cubic feet. A 60 lb bag yields 0.45 cubic feet, so 27 divided by 0.45 is 60 bags per cubic yard. For 80 lb bags at 0.60 cubic feet each, the figure is 45 bags per yard.",
    },
    {
      q: "How thick should a concrete slab be?",
      a: "Patios and paths are usually 4 inches. Driveways that take cars are 4 to 5 inches, and anything taking trucks or heavy loads is 6 inches or more over a compacted base. Always check local code for footings, which often need to reach below the frost line.",
    },
    {
      q: "Why add a waste allowance to concrete?",
      a: "Because real ground is uneven, forms flex, and some mix is lost in transit and tools. Running short mid pour creates a cold joint, a weak line where old and new concrete meet. Ten percent extra is cheap insurance against that.",
    },
    {
      q: "Is bagged concrete or ready mix cheaper?",
      a: "For tiny jobs under about a third of a cubic yard, bags win because delivery fees dominate. Past that, ready mix is usually cheaper per yard and much faster to place. Compare the bag total here against a local short load quote for your exact volume.",
    },
  ],
};
