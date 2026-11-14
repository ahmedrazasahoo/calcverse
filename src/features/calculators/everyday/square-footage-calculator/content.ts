import type { ToolContent } from "@/lib/content";

export const pageMeta = {
  title: "Square Footage Calculator: Area for Rectangles, Circles and Triangles, Plus Flooring and Paint",
  metaDescription:
    "Free square footage calculator for rectangles, circles and triangles. Get area in square feet and square metres, flooring boxes needed, and paint gallons for a room after doors and windows.",
  intro:
    "Square footage drives almost every home material order, from flooring boxes to gallons of paint. Measure once here and get the area in square feet and square metres, plus boxes or paint where you need them.",
};

export const content: ToolContent = {
  seoTitle: "Square Footage Calculator: Area for Rectangles, Circles and Triangles, Plus Flooring and Paint",
  howTo: [
    "Pick what you are measuring: a rectangle, circle or triangle area, flooring boxes, or paint for a room.",
    "For a shape, enter the dimensions in feet. Circles need the radius, half the full width across.",
    "For flooring, add the coverage printed on the box and a waste allowance, usually 10 percent.",
    "For paint, enter the room length, width and wall height, then the numbers of doors and windows and how many coats you plan.",
    "Read the area in square feet and square metres, and the boxes or gallons to buy.",
  ],
  explanationTitle: "Area formulas and how paint and flooring estimates use them",
  explanation: [
    "Each shape has one core formula. A rectangle is length times width, so a 12 by 10 foot room is 120 square feet. A circle is pi times the radius squared, so a round rug or patio 10 feet across, radius 5 feet, covers about 78.5 square feet. A triangle is base times height divided by two, which is why gable ends and triangular garden beds always need less material than the bounding rectangle suggests. One square foot equals 0.0929 square metres, so 120 square feet is about 11.15 square metres.",
    "Flooring is sold by the box, and each box covers a stated area, often 20 to 24 square feet for laminate and vinyl plank. Dividing your floor area by the box coverage gives the box count, but cuts at walls, doorways and pattern matching waste real material, so a 10 percent allowance is standard for straight layouts and 15 percent for diagonal or herringbone patterns. Always round boxes up, and keep one spare box from the same batch for future repairs.",
    "Paint math starts with wall area: the room perimeter times the wall height. A 12 by 10 foot room with 8 foot walls has 352 square feet of wall. Doors take out about 21 square feet each and average windows about 15 square feet each, leaving 301 square feet in that room with one door and two windows. At a typical coverage of 350 square feet per gallon per coat, two coats need about 1.72 gallons, so you buy 2 gallons. Rough, porous or dark to light colour changes may need a primer coat on top of that.",
  ],
  faqs: [
    {
      q: "How do I calculate square footage of a room?",
      a: "Multiply the length by the width, both in feet. A 12 by 10 foot room is 120 square feet of floor. For wall area, multiply the full perimeter by the wall height instead: 44 feet of perimeter times 8 feet is 352 square feet of wall.",
    },
    {
      q: "How many square feet are in a square metre?",
      a: "One square metre is about 10.764 square feet, and one square foot is 0.0929 square metres. To convert square feet to square metres, divide by 10.764. A 120 square foot room is about 11.15 square metres.",
    },
    {
      q: "How much paint do I need for one room?",
      a: "Work out the wall area, subtract about 21 square feet per door and 15 per window, multiply by the number of coats, then divide by 350, the typical coverage per gallon. The 12 by 10 example above needs 2 gallons for two coats.",
    },
    {
      q: "How much extra flooring should I buy for waste?",
      a: "Add 10 percent for straight plank or tile layouts in simple rooms, and 15 percent for diagonal layouts, herringbone, or rooms with many corners and closets. Buy it all from one batch so the colour and pattern match.",
    },
    {
      q: "How do I measure an odd shaped space?",
      a: "Split it into rectangles, circles and triangles you can measure, calculate each part, and add them together. For an L shaped room, measure the two rectangles that make the L and add their areas. This split and add method is accurate for almost every real room.",
    },
  ],
};
