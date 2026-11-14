import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Fuel Cost Calculator: Trip Cost in Any Efficiency Unit",
  metaDescription:
    "Work out what a trip costs in fuel. Enter the distance, your efficiency in km per litre, litres per 100 km or mpg, and the pump price per litre or gallon, and see fuel needed, total cost and cost per mile or kilometre.",
  intro:
    "A long drive feels cheap until you add up the fuel. Enter your trip distance, how thirsty your vehicle is and what fuel costs near you, and this calculator gives you the fuel needed, the total trip cost and the cost of every kilometre or mile along the way.",
};

export const content: ToolContent = {
  seoTitle: "Fuel Cost Calculator: Trip Cost in Any Efficiency Unit",
  howTo: [
    "Enter the distance of your trip and choose kilometres or miles. Tick round trip if you are coming back the same way.",
    "Enter your vehicle efficiency and pick its unit: km per litre, litres per 100 km, or miles per gallon in US or UK form.",
    "Enter the fuel price you actually pay and choose whether it is quoted per litre or per gallon.",
    "Read the fuel needed, the total cost and the cost per kilometre or mile, which is the handy figure for splitting a trip between passengers.",
  ],
  explanationTitle: "How trip fuel cost is worked out",
  explanation: [
    "Every efficiency figure describes the same thing in a different dialect, so the calculator first translates yours into litres per 100 km. Kilometres per litre flips over: 100 divided by 15 km per litre gives 6.67 litres per 100 km. Miles per gallon converts with a fixed factor: 235.215 divided by mpg for US gallons, or 282.481 divided by mpg for the larger UK gallon. Once everything speaks the same language, the fuel needed is simply the distance in kilometres multiplied by that figure and divided by 100.",
    "The price gets the same treatment. A price per gallon is divided by the litres in that gallon, 3.78541 for a US gallon and 4.54609 for a UK gallon, to get a price per litre. Total cost is then fuel needed times price per litre, and cost per kilometre or mile is the total divided by the distance in the unit you chose.",
    "Real trips rarely match the neat maths exactly. Air conditioning, hills, a roof box, heavy traffic and an impatient right foot all push consumption up, often by ten to twenty percent. Use the result as a solid planning figure, then leave a little headroom in the budget rather than arriving at your destination running on fumes and optimism.",
  ],
  faqs: [
    {
      q: "How do I find my car efficiency figure?",
      a: "Check the trip computer on your dashboard, the figure in the owner manual, or work it out from one full tank: note the distance driven on a tank and divide it by the litres you put in to refill it. That real world figure beats the brochure number, because it reflects your roads, your traffic and your driving.",
    },
    {
      q: "Why do US and UK mpg give different results?",
      a: "Because the gallons are different sizes. A UK gallon holds about 4.546 litres and a US gallon about 3.785 litres, so the same miles per gallon figure means better efficiency in the UK version. Picking the wrong one quietly skews your trip cost by about twenty percent.",
    },
    {
      q: "How do I split fuel costs between passengers?",
      a: "Use the total cost figure and divide it by the number of people sharing, or use the cost per kilometre figure if passengers join for only part of the route. Many groups add a small extra share for the driver, who is also providing the car, its wear and the driving itself.",
    },
    {
      q: "Does the round trip option change anything else?",
      a: "It only doubles the distance before the maths runs. Fuel needed and total cost double with it, while the cost per kilometre or mile stays exactly the same, because the efficiency and the price have not changed.",
    },
    {
      q: "Why did my real fuel use come out higher than the estimate?",
      a: "The calculator assumes steady efficiency for the whole trip. Cold starts, short hops, hills, headwinds, air conditioning and stop start traffic all burn extra fuel. If your trips consistently run above the estimate, lower the efficiency figure you enter until it matches what your tank is really telling you.",
    },
  ],
};
