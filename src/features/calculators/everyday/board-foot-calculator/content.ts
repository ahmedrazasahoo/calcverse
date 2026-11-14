import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Board Foot Calculator: Board Feet, Total Cost and Linear Feet for Lumber",
  metaDescription:
    "Free board foot calculator. Enter thickness, width, length, quantity and price per board foot to get board feet per board, total board feet, total cost and linear feet.",
  intro:
    "Hardwood is priced by the board foot, a unit of volume that hides inside every board. Enter the dimensions and price, and see board feet per board, the project total, what it costs, and the linear feet.",
};

export const content: ToolContent = {
  seoTitle: "Board Foot Calculator: Board Feet, Total Cost and Linear Feet for Lumber",
  howTo: [
    "Enter the thickness and width in inches. For fractional sizes use decimals: 3/4 inch is 0.75, 1 1/2 inches is 1.5.",
    "Enter the length in feet and how many boards you need.",
    "Add the yard price per board foot to see the cost. Leave it in place even when comparing species, since the comparison is the point.",
    "Read board feet per board, total board feet, total cost, cost per board, and total linear feet.",
  ],
  explanationTitle: "What a board foot actually measures",
  explanation: [
    "A board foot is a volume: a piece of wood 1 inch thick, 12 inches wide and 1 foot long, which is 144 cubic inches. The formula is thickness in inches times width in inches times length in feet, divided by 12. A classic 2 by 4 at 8 feet is 2 times 4 times 8 divided by 12, which is 5.333 board feet. A 1 by 6 at 10 feet is exactly 5 board feet. Once you think in volume, prices make sense: a wide or thick board holds far more wood than its length suggests, and it is priced that way.",
    "Nominal sizes are the trap for beginners. A construction 2 by 4 is really 1.5 by 3.5 inches after drying and planing, so its true volume is 3.5 board feet at 8 feet, not 5.333. Hardwood yards usually sell rough or surfaced lumber by its actual measured size, while big box stores price construction lumber per piece or per linear foot. Measure the board you are actually buying, use those numbers here, and ask the yard whether their board foot tally uses nominal or actual dimensions before you compare quotes.",
    "Linear feet simply add up length: ten 8 foot boards are 80 linear feet, whatever their thickness. Linear feet suit trim, decking boards sold by the piece, and checking you have enough length to cut your parts list. Board feet suit buying rough stock, where you should add 15 to 25 percent extra for waste, defects and grain matching on furniture projects, less for simple shelving or shop projects.",
  ],
  faqs: [
    {
      q: "How many board feet are in a 2x4x8?",
      a: "Using the nominal numbers, 2 times 4 times 8 divided by 12 is 5.333 board feet. A real dressed 2 by 4 measures 1.5 by 3.5 inches, which is 3.5 board feet at 8 feet. Hardwood yards price by actual measure, so check which size your quote uses.",
    },
    {
      q: "How do you calculate board feet?",
      a: "Multiply thickness in inches by width in inches by length in feet, then divide by 12. For length in inches instead, divide by 144. Example: a 1 by 8 board, 6 feet long, is 1 times 8 times 6 divided by 12, which is 4 board feet.",
    },
    {
      q: "What is the difference between board feet and linear feet?",
      a: "Linear feet measure length only: a 8 foot board is 8 linear feet whatever its width. Board feet measure volume, so a wider or thicker board of the same length has more board feet. Trim is often sold by linear foot, rough hardwood by board foot.",
    },
    {
      q: "How much extra lumber should I buy for waste?",
      a: "Add 15 to 25 percent for furniture, where grain matching and defects cut into usable stock. Add about 10 percent for simple projects like shelving. Select boards at the yard when you can, since one badly warped board can eat the whole allowance.",
    },
    {
      q: "Why is hardwood priced per board foot?",
      a: "Because hardwood boards come in random widths and lengths, so a per piece price would be meaningless. Board feet give one volume based price that works for any size board, and the yard simply tallies the volume of your stack at the till.",
    },
  ],
};
