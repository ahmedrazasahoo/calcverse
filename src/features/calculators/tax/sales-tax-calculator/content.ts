import type { ToolContent } from "@/lib/content";
import type { StateSalesTax } from "./states";

/** Format a rate percent without trailing zeros, e.g. 6.875, 7.25, 4, 0. */
function rate(n: number): string {
  return Number(n.toFixed(3)).toString();
}

/** Format a dollar figure for copy, e.g. 9.03 or 109.03. */
function money(n: number): string {
  return n.toFixed(2);
}

/** Page metadata and intro copy for the hub tool. */
export const pageMeta = {
  title: "Sales Tax Calculator: Add or Remove US Sales Tax by State",
  metaDescription:
    "Add sales tax to a price or find the pre-tax price for any US state. Use the state base rate, the average combined rate including local taxes, or your own custom rate.",
  intro:
    "US sales tax is never one number. A state rate sits at the bottom, then counties, cities and special districts stack their own rates on top, so the tax on the same $100 purchase can be zero in one town and over ten dollars in another. This calculator lets you work in either direction, adding tax to a shelf price or pulling the pre-tax price back out of a receipt total, using any state's base rate, its average combined rate, or a custom rate you type in.",
};

export const content: ToolContent = {
  seoTitle: "Sales Tax Calculator: Add or Remove US Sales Tax by State",
  howTo: [
    "Enter the amount: a price before tax, or a receipt total that already includes tax.",
    "Choose what you want to do: add tax to a price, or find the pre-tax price inside a total.",
    "Pick your state, then choose the state base rate, the average combined rate, or switch to a custom rate and type the exact rate for your city and county.",
    "Read the three figures: price before tax, the tax itself, and the total price.",
    "For one state in depth, open its own page from the state index below the calculator.",
  ],
  explanationTitle: "How US sales tax actually stacks up",
  explanation: [
    "Sales tax in the United States is built in layers. The state sets a statewide base rate, which runs from 0 percent in the five states with no statewide tax up to 7.25 percent in California. On top of that, thousands of local governments add their own layers: counties, cities, transit districts and other special districts. That is why the rate that matters at the register is the combined rate, and why it changes when you cross a city line. The combined figures on this site are approximate averages for each state, population weighted in the style of the Tax Foundation state and local tables. They are a good planning number, but actual local rates vary by city and county, and the exact rate at a specific address can sit a point or more above or below the state average.",
    "The maths runs in two directions. Adding tax is a straight multiplication: tax equals the price times the rate, so a $100 item at 8 percent carries $8 of tax and costs $108 in total. Removing tax is the step people get wrong. You cannot subtract the percentage from the total, because the tax was charged on the original price, not on the total. The correct move is to divide the total by (1 plus the rate). A $108 total at 8 percent divides by 1.08 to give a $100 pre-tax price and $8 of tax. Subtracting 8 percent from $108 instead would give $99.36, quietly understating the price and overstating nothing but your error.",
    "Treat every result here as an estimate. Sales tax rules carve out exemptions that vary by state and by item: many states tax groceries at a reduced rate or not at all, clothing is exempt in a few states and during tax holidays in others, and prescription medicine is widely exempt. Businesses buying for resale, manufacturers and nonprofits often hold exemption certificates too. For the official rate at an exact address, use your state department of revenue rate lookup, and for filing or charging customers, follow that official figure rather than any state average.",
  ],
  faqs: [
    {
      q: "How do I add sales tax to a price?",
      a: "Multiply the price by the tax rate to get the tax, then add it on. At a combined rate of 8.20 percent, a $50 item carries $4.10 of tax and costs $54.10 in total. The calculator's add mode does both steps and shows each figure separately.",
    },
    {
      q: "How do I find the price before tax from a receipt total?",
      a: "Divide the total by (1 plus the rate). A $54.10 total at 8.20 percent divides by 1.082 to give the $50 pre-tax price. Never subtract the percentage from the total itself; that understates the price because the tax was charged on the smaller pre-tax amount.",
    },
    {
      q: "What is the difference between the state base rate and the combined rate?",
      a: "The base rate is set by the state alone. The combined rate adds the average of all local county, city and district taxes on top. In Louisiana the gap is huge: a 5 percent state rate becomes about 10.13 percent combined on average. In states like Indiana or Kentucky there are effectively no local sales taxes, so the two figures match.",
    },
    {
      q: "Which states have no sales tax?",
      a: "Five states have no statewide sales tax: Oregon, Montana, New Hampshire, Delaware and Alaska. The first four also have little or no local sales tax, so most purchases there are genuinely untaxed. Alaska is the exception: it has no state rate, but many boroughs and cities charge their own, averaging about 1.82 percent combined.",
    },
    {
      q: "Why might my receipt show a different rate than this calculator?",
      a: "Because combined rates here are state averages, and actual local rates vary by city and county, sometimes street by street where district taxes apply. The item itself matters too: groceries, clothing and medicine are taxed differently in many states. Use the custom rate option with the exact rate from your state revenue department lookup when you need a precise figure.",
    },
  ],
};

/** State specific honest notes for states whose tax works unusually. */
function specialNote(state: StateSalesTax): string | null {
  switch (state.slug) {
    case "oregon":
      return "Oregon is one of the simplest tax states in the country: there is no statewide sales tax and Oregon local governments do not add a general sales tax either, so the price on the shelf is normally the price you pay. A small number of local levies exist on specific things, such as prepared food taxes in a few cities, but ordinary shopping in Oregon is untaxed.";
    case "montana":
      return "Montana has no statewide sales tax and most Montana towns add none either. The honest exception is a handful of resort communities, such as Whitefish, Big Sky and West Yellowstone, which charge a local resort tax of around 3 to 4 percent on lodging, restaurants and luxury items to help pay for visitor driven costs.";
    case "new-hampshire":
      return "New Hampshire has no sales tax on goods, which is why its border towns draw shoppers from Massachusetts and Maine. It does charge a separate meals and rooms tax, currently 8.5 percent, on restaurant meals, hotel stays and car rentals, so eating out and staying over in New Hampshire is taxed even though buying goods is not.";
    case "delaware":
      return "Delaware has no sales tax at the state or local level, and shoppers from nearby states have long crossed the border for exactly that reason. Delaware businesses instead pay a gross receipts tax on their total sales, which is a cost of doing business for the seller and is never added as a line on your receipt.";
    case "alaska":
      return "Alaska is the unusual case among the no-state-tax states. There is no statewide rate at all, but more than a hundred boroughs and cities charge their own local sales taxes, and those average out to about 1.82 percent statewide. In practice that means tax depends entirely on where you are: Anchorage charges no local sales tax, while some smaller communities charge 5 percent or more.";
    case "hawaii":
      return "Hawaii does not run a traditional sales tax. It charges a general excise tax, or GET, of 4 percent on the gross receipts of businesses, and businesses are allowed to pass it on visibly to customers, which is why Hawaii receipts typically show a charge of about 4.166 percent rather than a round 4 percent. Oahu also adds a county surcharge for rail transit, which pushes the passed on figure higher there. The tax also reaches services and many transactions a normal sales tax would never touch.";
    case "new-jersey":
      return "New Jersey has a small quirk worth knowing: the average combined rate, 6.60 percent, sits slightly below the state rate of 6.625 percent. That happens because designated Urban Enterprise Zones, in cities such as Newark, Camden and Trenton, charge half the state rate on many purchases, which pulls the statewide average down.";
    case "california":
      return "California's 7.25 percent statewide rate is the highest state level rate in the country, and district taxes set by counties and cities stack on top of it. In much of Los Angeles County the combined rate is above 9.5 percent, and a few California cities sit above 10 percent, so the state average of 9.03 percent understates what many Californians actually pay.";
    case "louisiana":
      return "Louisiana has the highest average combined sales tax in the United States at about 10.13 percent. The state rate is only 5 percent; the rest is layered on by parishes, cities and special districts, and in some places the true local total pushes past 11 percent. Louisiana also taxes groceries at the state level, though parish taxes on food vary.";
    case "tennessee":
      return "Tennessee pairs one of the highest state rates, 7 percent, with solid local additions, giving it the second highest average combined rate in the country. One relief built into the system: groceries are taxed at a reduced state rate of 4 percent rather than the full 7 percent, though local taxes still apply on top.";
    case "new-york":
      return "New York's 4 percent state rate looks low, but county and city taxes more than double it in most of the state. New York City's combined rate is 8.875 percent, which includes a Metropolitan Commuter Transportation District charge, and several upstate counties sit in the 8 percent range as well. Clothing and footwear under $110 are exempt from the state rate, and many counties drop their share too.";
    case "texas":
      return "Texas law caps the combined rate: local taxes can add at most 2 percent on top of the 6.25 percent state rate, so no Texas address pays more than 8.25 percent in total. Most metro areas, including Dallas, Houston, Austin and San Antonio, sit exactly at that 8.25 percent cap, above the 8.20 percent state average.";
    case "colorado":
      return "Colorado has the lowest state rate of any state that charges one, 2.90 percent, but some of the heaviest local layering in the country. Counties, cities and special districts, plus self collecting home rule cities with their own rules, push the average combined rate to 7.81 percent and popular destinations like Aspen and Winter Park well above 10 percent.";
    default:
      return null;
  }
}

/** Whether this state's copy needs the no-statewide-tax framing. */
function hasNoStateTax(state: StateSalesTax): boolean {
  return state.baseRate === 0;
}

export function pageMetaForState(state: StateSalesTax): {
  title: string;
  metaDescription: string;
  intro: string;
} {
  const title = `${state.name} Sales Tax Calculator: ${state.abbr} Rates, Base ${rate(state.baseRate)}% and Average Combined ${rate(state.avgCombined)}%`;
  if (hasNoStateTax(state)) {
    return {
      title,
      metaDescription: `${state.name} has no statewide sales tax. See what that really means, where local taxes still apply in ${state.name}, and check any amount with the calculator.`,
      intro: `${state.name} is one of the five states with no statewide sales tax, which makes shopping there simpler than almost anywhere else in the US. This page explains how ${state.name} handles tax in practice, where the exceptions hide, and gives you the calculator for the cases where a local rate or a special levy does apply.`,
    };
  }
  return {
    title,
    metaDescription: `Work out sales tax in ${state.name} at the ${rate(state.baseRate)} percent state rate or the ${rate(state.avgCombined)} percent average combined rate. Add tax to a price or find the pre-tax price.`,
    intro: `In ${state.name} the statewide sales tax rate is ${rate(state.baseRate)} percent, and once county, city and district taxes are layered on, the average combined rate reaches about ${rate(state.avgCombined)} percent. This page walks through how ${state.name} tax stacks up, shows the tax on real amounts, and gives you the calculator pre-set to ${state.name} so you can add tax to a price or pull the pre-tax price out of a receipt total.`,
  };
}

export function contentForState(state: StateSalesTax): ToolContent {
  const note = specialNote(state);
  const taxOn100 = (100 * state.avgCombined) / 100;
  const grossOn100 = 100 + taxOn100;
  const localAddOn = state.avgCombined - state.baseRate;

  const howTo: string[] = hasNoStateTax(state)
    ? [
        `Enter the amount you want to check. In most of ${state.name} the sales tax is zero, so the price and the total are the same number.`,
        "Leave the rate on the average combined figure if you are in an area with a local tax, or switch to a custom rate and type the exact local rate you were quoted.",
        "Choose add tax to see a total, or find the pre-tax price to work backwards from a total.",
        "Read the price before tax, the tax amount and the total side by side.",
      ]
    : [
        `Enter the amount: a shelf price before tax, or a receipt total that already includes ${state.name} tax.`,
        `Choose the rate: the ${rate(state.baseRate)} percent ${state.name} state base rate, or the ${rate(state.avgCombined)} percent average combined rate that includes local taxes.`,
        "Choose add tax to build a total, or find the pre-tax price to work backwards from a total.",
        "If you know the exact combined rate for your city and county, switch to custom rate and type it in for a precise figure.",
        "Read the price before tax, the tax amount and the total side by side.",
      ];

  const layerParagraph = hasNoStateTax(state)
    ? `${state.name} charges no statewide sales tax, and its average combined rate is ${rate(state.avgCombined)} percent. The combined figure is an approximate average including local taxes where they exist, and actual local rates vary by city and county, so a purchase in one ${state.name} community can be taxed while the same purchase a few miles away is not. Every result on this page is an estimate based on the rate you select.`
    : localAddOn > 0.005
      ? `${state.name} starts with a statewide base rate of ${rate(state.baseRate)} percent. Counties, cities and special districts then add their own layers on top, worth about ${rate(localAddOn)} percentage points on average, which brings the average combined rate to about ${rate(state.avgCombined)} percent. That combined figure is an approximate average including local taxes, and actual local rates vary by city and county, so the exact rate where you shop can sit noticeably above or below it. Every result on this page is an estimate based on the average or on the rate you enter.`
      : `${state.name} keeps its tax simple compared with most states: the statewide rate of ${rate(state.baseRate)} percent is effectively the whole story, because ${state.name} local governments do not generally add a sales tax of their own, which is why the average combined rate matches the state rate at about ${rate(state.avgCombined)} percent. Even so, the combined figure is an approximate average including local taxes, actual local rates vary by city and county in the few places that do levy them, and every result on this page is an estimate.`;

  const mathsParagraph =
    state.avgCombined > 0
      ? `The calculator works in both directions. Adding tax at the ${state.name} average combined rate of ${rate(state.avgCombined)} percent turns a $100 price into $${money(taxOn100)} of tax and a $${money(grossOn100)} total. Working backwards from a receipt is the step people get wrong: you divide the total by ${money(1 + state.avgCombined / 100)} rather than subtracting the percentage, because the tax was charged on the pre-tax price, not on the total. So a $${money(grossOn100)} total at that rate divides back to exactly $100 before tax. Use the state base rate alone only when you are sure no local tax applies to the purchase.`
      : `Because the applicable rate across most of ${state.name} is zero, the maths here is usually trivial: the price before tax, the tax and the total collapse into one number, with tax at $0. Where a local rate does apply, the same two rules as everywhere else hold. Adding tax means multiplying the price by the rate, and finding a pre-tax price means dividing the total by (1 plus the rate), never subtracting the percentage from the total.`;

  const honestyParagraph = `A few honest limits before you rely on a figure. These results are estimates. Item rules matter as much as place rules: groceries, clothing, prescription medicine and digital goods are taxed differently from state to state, and ${state.name} has its own set of exemptions and reduced rates that a single percentage cannot capture. Sellers also apply tax based on where the buyer receives the goods, so an online order shipped into ${state.name} can be taxed differently from one picked up in store. For the official rate at an exact address, check the ${state.name} department of revenue rate lookup, and use that figure for filing or for charging customers.`;

  const explanation = [layerParagraph, mathsParagraph, honestyParagraph];
  if (note) explanation.splice(1, 0, note);

  const localFaq = hasNoStateTax(state)
    ? {
        q: `Does ${state.name} have local sales taxes on top of the state rate?`,
        a:
          state.avgCombined > 0
            ? `There is no state rate to stack on, but yes, local taxes are the whole game in ${state.name}. Many local governments charge their own sales tax, and averaged across the state they come to about ${rate(state.avgCombined)} percent. Plenty of places charge nothing at all while others charge several percent, so check the specific city or borough.`
            : `No. ${state.name} has no statewide sales tax and its local governments do not levy a general sales tax either, so the combined average is 0 percent. Narrow levies on specific things can still exist, but ordinary retail purchases are untaxed anywhere in the state.`,
      }
    : localAddOn > 0.005
      ? {
          q: `Does ${state.name} have local sales taxes on top of the state rate?`,
          a: `Yes, and they are a big part of the bill. On top of the ${rate(state.baseRate)} percent state rate, counties, cities and special districts in ${state.name} add about ${rate(localAddOn)} percentage points on average, producing the ${rate(state.avgCombined)} percent average combined rate. The exact local layer depends on the city and county, which is why two towns in ${state.name} can charge noticeably different totals on the same item.`,
        }
      : {
          q: `Does ${state.name} have local sales taxes on top of the state rate?`,
          a: `Generally no. Unlike most states, ${state.name} does not give its counties and cities a broad local sales tax, so the ${rate(state.baseRate)} percent state rate is what almost every purchase is charged, and the average combined rate is the same ${rate(state.avgCombined)} percent. A few narrow district charges exist, but they rarely change a normal receipt.`,
        };

  return {
    seoTitle: pageMetaForState(state).title,
    howTo,
    explanationTitle: `How sales tax works in ${state.name}`,
    explanation,
    faqs: [
      {
        q: `What is the sales tax rate in ${state.name}?`,
        a: hasNoStateTax(state)
          ? `${state.name} has no statewide sales tax. Its average combined rate, which reflects local taxes only, is about ${rate(state.avgCombined)} percent. That combined figure is an approximate average including local taxes, and actual local rates vary by city and county, from zero in many places to several percent in others.`
          : `The ${state.name} statewide rate is ${rate(state.baseRate)} percent. Including local county, city and district taxes, the average combined rate is about ${rate(state.avgCombined)} percent. That combined figure is an approximate average including local taxes, and actual local rates vary by city and county, so your exact rate depends on where the purchase happens.`,
      },
      {
        q: `How much tax do I pay on a $100 purchase in ${state.name}?`,
        a:
          state.avgCombined > 0
            ? `At the average combined rate of ${rate(state.avgCombined)} percent, a $100 purchase carries about $${money(taxOn100)} of tax, for a total of $${money(grossOn100)}. At the state base rate alone it would be $${money((100 * state.baseRate) / 100)}. Your real figure depends on the local rate where you buy and on whether the item is exempt, so treat this as an estimate.`
            : `In most of ${state.name}, nothing: with no statewide tax and no general local tax, a $100 purchase costs $100. If you are in one of the few spots or categories where a special local levy applies, enter that rate as a custom rate in the calculator to see the exact add-on.`,
      },
      localFaq,
      {
        q: `How do I find the price before tax in ${state.name}?`,
        a:
          state.avgCombined > 0
            ? `Divide the total by (1 plus the rate). At the average combined rate of ${rate(state.avgCombined)} percent, divide by ${money(1 + state.avgCombined / 100)}: a $${money(grossOn100)} total works back to $100 before tax. The calculator's find the pre-tax price mode does this for any amount and rate. Subtracting the percentage from the total instead would give you the wrong, lower price.`
            : `Where no tax applies, the total is the pre-tax price, so there is nothing to strip out. Where a local rate does apply, divide the total by (1 plus that rate) to recover the original price, which is what the calculator's find the pre-tax price mode does.`,
      },
      {
        q: `Is the ${state.name} rate in this calculator exact?`,
        a: `No, and it is not meant to be. The statewide rate of ${rate(state.baseRate)} percent is fixed by law, but the combined figure is an approximate average including local taxes, actual local rates vary by city and county, and results here are estimates for planning and checking receipts. For an exact figure, look up the rate for the precise address on the ${state.name} department of revenue site, or enter that rate as a custom rate here.`,
      },
    ],
  };
}
