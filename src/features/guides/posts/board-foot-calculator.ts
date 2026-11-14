import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "board-foot-calculator",
  keyword: "board foot calculator",
  title: "Board Foot Calculator: How to Work Out Lumber Volume and Cost",
  metaTitle: "Board Foot Calculator Guide: Formula, Sizes and Prices",
  metaDescription: "Learn how board feet are calculated, why nominal lumber sizes mislead buyers, how pricing per board foot works, and how much extra to order for waste.",
  excerpt: "Board feet explained in plain language, with the real formula, nominal versus actual sizes, pricing examples for tabletops and decks, and a sensible waste allowance.",
  category: "Home and DIY",
  toolSlug: "board-foot-calculator",
  updatedAt: "2026-11-14",
  intro: [
    "You walk into a lumber yard with a cutting list in your hand, and the price board quotes walnut at so many dollars per board foot. Your list is written in inches and feet, the boards on the rack are rough and oversized, and suddenly you have no idea whether the stack you picked will cost 80 dollars or 300 dollars. That gap between the way you plan a project and the way hardwood is sold is exactly why board foot math trips up so many woodworkers.",
    "The quickest fix is to measure each board and run the numbers through the free [board foot calculator](/calculators/board-foot-calculator) before you reach the till. This guide explains the calculation behind it, so you can check a yard invoice on the spot, compare species fairly, and order enough material without paying for a pile of expensive offcuts. You will work through a dining tabletop and a set of deck boards, step by step, with real sizes and real prices.",
    "A board foot is a unit of volume, not length and not surface area. Once that clicks, the rest follows. Hardwood dealers, sawmills and many custom shops price by volume because a thick, wide board contains far more wood than a thin, narrow one of the same length. Construction lumber at a big box store is usually priced per piece instead, which hides the comparison. Learning to think in board feet lets you price both systems side by side and spot which pile is actually the better deal.",
  ],
  keyPoints: [
    "One board foot is 144 cubic inches of wood: thickness in inches times width in inches times length in inches, divided by 144.",
    "If length is in feet, use thickness times width times length in feet, divided by 12. Both forms give the same answer.",
    "Always calculate with actual measured sizes, not nominal names. A 2 by 4 measures about 1.5 by 3.5 inches once surfaced.",
    "Cost is board feet times the price per board foot for that species and grade, so a small size change can move the total a lot.",
    "Add 10 to 20 percent extra for waste, defects and grain matching. Rough hardwood often needs 20 percent or more.",
    "Round up board by board at the yard if that is how the dealer bills, because rounding on a full stack can add up quickly.",
  ],
  sections: [
    {
      heading: "The board foot formula, explained simply",
      paragraphs: [
        "Start with the definition. One board foot is a piece of wood 1 inch thick, 12 inches wide and 12 inches long. Multiply those together and you get 144 cubic inches. Every board foot calculation is just a comparison against that block. Take the thickness of your board in inches, multiply by the width in inches, multiply by the length in inches, then divide by 144. The result is the volume in board feet, often shortened to BF on invoices.",
        "Most people find the feet version easier at the yard because board lengths are sold in feet. If length is in feet, the formula becomes thickness in inches times width in inches times length in feet, divided by 12. Check that it matches: a board 1 inch thick, 12 inches wide and 1 foot long gives 1 times 12 times 1 divided by 12, which is exactly 1 board foot. A board 2 inches thick, 6 inches wide and 8 feet long gives 2 times 6 times 8 divided by 12, which is 8 board feet.",
        "A concrete example helps it stick. A white oak board 1 inch thick, 8 inches wide and 6 feet long gives 1 times 8 times 6 divided by 12, which equals 4 board feet. If oak is priced at 6.50 dollars per board foot, that board costs 26 dollars. Five matching boards put you at 20 board feet and 130 dollars before tax, the kind of quick check that stops a pleasant Saturday project turning into a surprise at the register.",
      ],
    },
    {
      heading: "Nominal versus actual sizes: the trap that understates your order",
      paragraphs: [
        "Lumber names are historical, not literal. A 2 by 4 was once cut close to 2 inches by 4 inches when rough and green. After drying and planing, the board you take home measures about 1.5 inches by 3.5 inches. The same pattern runs through the whole rack: a 1 by 6 usually measures 0.75 by 5.5 inches, and a 2 by 6 about 1.5 by 5.5 inches. Calculate from the name on the label instead of the tape measure in your hand and you will overstate the volume of surfaced lumber by a wide margin.",
        "Hardwood sold rough works the other way. Thickness is quoted in quarters: 4/4 means about 1 inch rough, 5/4 means about 1.25 inches, 8/4 means about 2 inches. After surfacing it will lose roughly an eighth to a quarter of an inch. A dealer billing rough lumber normally charges on the rough thickness and the full width and length as stacked, even though you will plane some of that away at home. Ask how the yard bills before you add up, because rounding policy alone can shift a large order by several percent.",
        "The practical rule is simple: measure what you will actually pay for, and plan your project from what you will actually keep. For a tabletop that needs to end at 0.75 inches thick, buying 4/4 rough stock at a full inch gives you room to flatten and plane. Our [square footage calculator guide](/guides/square-footage-calculator) is useful here too, because surface area tells you how many boards cover a top, while board feet tell you what that coverage costs by volume.",
      ],
      table: {
        caption: "Common nominal sizes and the actual dimensions you should use in calculations",
        headers: ["Nominal name", "Actual surfaced size", "Board feet in an 8 foot length"],
        rows: [
          ["1 by 4", "0.75 by 3.5 inches", "1.75 board feet"],
          ["1 by 6", "0.75 by 5.5 inches", "2.75 board feet"],
          ["2 by 4", "1.5 by 3.5 inches", "3.5 board feet"],
          ["2 by 6", "1.5 by 5.5 inches", "5.5 board feet"],
          ["2 by 8", "1.5 by 7.25 inches", "7.25 board feet"],
          ["4/4 rough hardwood", "About 1 inch rough, width varies", "Depends on measured width"],
        ],
      },
    },
    {
      heading: "Step by step: working out a cutting list",
      paragraphs: [
        "The cleanest habit is to list every part, calculate each one, then add the list together before you think about waste or price. Keep thickness, width and length in the same order on every line. If two parts share a size, calculate once and multiply by the quantity, but write the quantity down.",
        "Here is a small bookshelf as a worked example. It needs two sides at 0.75 inches thick, 11 inches wide and 36 inches long, three shelves at 0.75 by 10 by 30 inches, and one back panel totalling 0.5 by 30 by 36 inches. Each side is 0.75 times 11 times 36 divided by 144, which is 2.06 board feet, so two sides are 4.13. Each shelf is 1.56 board feet, so three shelves are 4.69. The back is 3.75 board feet. Add them: 4.13 plus 4.69 plus 3.75 equals 12.57 board feet of finished wood.",
        "That 12.57 figure is the net amount in the finished bookshelf, not the amount to buy. Some material disappears as sawdust, end trim and planer shavings. The next sections cover the two adjustments that turn a net figure into a purchase order: price per board foot and a realistic waste allowance. To skip the hand arithmetic on a long list, enter each board into the [board foot calculator](/calculators/board-foot-calculator) and keep a running total.",
      ],
      steps: [
        "Write down every part with its finished thickness, width and length, plus how many you need.",
        "For each part, multiply thickness in inches by width in inches by length in inches, then divide by 144.",
        "Multiply the result by the quantity of that part and add all the parts together for the net board feet.",
        "Add a waste allowance of 10 to 20 percent, higher for rough stock or strong grain matching.",
        "Multiply the purchase board feet by the price per board foot for your species to get the material cost.",
      ],
    },
    {
      heading: "Pricing per board foot: what you actually pay",
      paragraphs: [
        "Hardwood prices are quoted per board foot because thickness and width vary so much between boards. A common domestic species such as red oak or poplar might sell for 3 to 6 dollars per board foot in many regions, walnut often sits well above that, and imported or highly figured stock can cost several times more. Prices move with region, grade, thickness and whether the board is rough or already surfaced. Thicker stock, such as 8/4, usually costs more per board foot than 4/4 of the same species, because large, clear, thick boards are harder to dry without defects.",
        "To compare two yards fairly, convert everything to the same unit. Suppose Yard A sells cherry at 5.80 dollars per board foot for rough 4/4 stock, and Yard B sells surfaced cherry at a set price per piece. A surfaced board measuring 0.75 inches thick, 7 inches wide and 6 feet long contains 0.75 times 7 times 6 divided by 12, which is 2.63 board feet. If that piece is tagged at 21 dollars, you are paying about 8 dollars per board foot. The surfaced board may still be worth it if you have no planer, but now you can see exactly what the convenience costs.",
        "Watch for the small print. Some dealers round each board up to the nearest quarter or half board foot. Some charge a surfacing fee on top of the rough price. Minimum lengths matter too: a yard may sell only full 8, 10 or 12 foot boards, so a project needing 5 foot parts still pays for the full length unless the yard cuts. Ask three questions before a big order: how do you round, is surfacing included, and can I select my own boards?",
      ],
    },
    {
      heading: "Waste allowance: how much extra to buy",
      paragraphs: [
        "Waste is not carelessness. It is built into woodworking. Boards have knots, checks at the ends, sapwood along one edge and grain that runs the wrong way for a visible part. You will trim ends square, rip edges straight, plane out mill marks and cut around defects. Then there is the honest mistake factor: one shelf cut an inch short can ruin a schedule if you have no spare board to remake it from. A sensible allowance turns all of that from a second trip to the yard into a small pile of useful offcuts.",
        "As a starting point, add 10 percent for simple projects built from surfaced lumber with few defects, such as basic shelving or a workbench frame. Add 15 to 20 percent for furniture built from rough hardwood, where you lose thickness in planing and width in straightening each board. Push toward 25 percent or more when the project demands careful grain matching or long clear parts cut from boards that are only a little longer, because your choice of where each part can come from shrinks fast.",
        "Return to the bookshelf. The net figure was 12.57 board feet. At a 20 percent allowance for rough stock, you get 15.08 board feet to buy. At 5.50 dollars per board foot for, say, ash, the cost is about 83 dollars. Without the allowance the math gives about 69 dollars, which looks cheaper on paper and then fails in the workshop. Track your real waste over a few projects and adjust the allowance from your own history.",
      ],
    },
    {
      heading: "Project example: costing a dining tabletop",
      paragraphs: [
        "A dining tabletop shows why width selection matters as much as total volume. Say you want a finished top 72 inches long, 36 inches wide and 0.75 inches thick, made from boards glued edge to edge. The finished volume is 0.75 times 36 times 72 divided by 144, which is 13.5 board feet. That is the wood in the top itself, before you allow for straightening edges, trimming the ends after glue up, and rejecting a board whose grain fights the rest of the panel.",
        "In practice you might buy six rough walnut boards, each about 1 inch thick, 6.5 inches wide and 8 feet long, because the yard stocks 8 foot lengths. Each board is 1 times 6.5 times 8 divided by 12, which is 4.33 board feet, so six boards total about 26 board feet billed. That looks like a lot more than 13.5, but the extra covers the length trimmed from 8 feet to just over 6, the width lost straightening each edge, and the thickness planed away to reach a flat 0.75 inches. At 11 dollars per board foot, the total is about 286 dollars. Knowing that figure before you fall in love with a stack is the whole point of doing the math in the aisle.",
        "There is a smarter way to cut that cost on many tops. Ask whether shorter or narrower boards are priced lower, design the top so offcuts become the aprons or a matching bench, and keep grain direction consistent so you do not waste a wide board on a part that could come from a narrow one. If your project also involves covering a floor or a wall panel, the [tile calculator guide](/guides/tile-calculator) covers a similar net area versus purchase quantity problem, and the same habit of adding a sensible margin applies in both trades. The same volume math also prices deck boards and framing, and if you are pouring concrete footings for a deck, the [concrete calculator guide](/guides/concrete-calculator) works out those quantities alongside. Run your final list through the [board foot calculator](/calculators/board-foot-calculator) once more before you order, and browse the full [guides hub](/guides) for more project guides.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I calculate board feet for a board?",
      a: "Multiply thickness in inches by width in inches by length in inches, then divide by 144. If length is in feet, multiply thickness by width by length in feet and divide by 12 instead. A 1 inch by 8 inch by 6 foot board is 4 board feet either way you run it.",
    },
    {
      q: "Why is a 2 by 4 not 2 inches by 4 inches?",
      a: "The name comes from the rough size before drying and planing. A modern surfaced 2 by 4 measures about 1.5 by 3.5 inches. Always use the actual measured size in a board foot calculation, or you will overstate the volume by roughly a third.",
    },
    {
      q: "How many board feet are in a 2 by 4 by 8 foot stud?",
      a: "Using actual dimensions of 1.5 by 3.5 inches and a length of 8 feet, the calculation is 1.5 times 3.5 times 8 divided by 12, which is 3.5 board feet. Using the nominal 2 by 4 name would wrongly give about 5.33 board feet.",
    },
    {
      q: "What waste percentage should I add when buying hardwood?",
      a: "Add 10 percent for simple work in surfaced lumber and 15 to 20 percent for furniture in rough hardwood. Go higher, toward 25 percent, for long clear parts or careful grain matching. Your own past projects are the best guide once you have built a few.",
    },
    {
      q: "Is lumber priced per board foot always cheaper than per piece?",
      a: "Not always. Convert the per piece price by dividing it by the board feet in that piece, then compare that figure with the per board foot price for the same species and grade. Surfaced, ready to use boards often cost more per board foot, which may still be fair if you lack the tools to surface rough stock.",
    },
    {
      q: "What does 4/4, 5/4 and 8/4 mean at a hardwood yard?",
      a: "These are thickness codes in quarter inches for rough lumber. 4/4 is about 1 inch thick, 5/4 is about 1.25 inches and 8/4 is about 2 inches. After surfacing, expect to lose roughly an eighth to a quarter of an inch from the rough thickness.",
    },
  ],
  relatedSlugs: ["square-footage-calculator", "tile-calculator", "concrete-calculator"],
};
