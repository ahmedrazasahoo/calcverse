import type { ToolContent } from "@/lib/content";
import { getPair, type ZonePair } from "./pairs";
import { convertWallTime, formatClock, formatZoned } from "./tz";

/** Short code from a pair label, for example "EST" from "EST (Eastern)". */
function shortCode(label: string): string {
  return label.split(" ")[0];
}

/**
 * Page copy for one time zone pair, generated from the pair data so
 * every page talks about its own cities, its own difference across
 * the year and its own worked examples. The two noon examples are
 * computed with the same conversion logic the tool itself uses, for
 * a winter date and a summer date, so the daylight saving behaviour
 * on the page is real rather than boilerplate.
 */
export function contentForPair(pair: ZonePair): {
  pageMeta: { title: string; metaDescription: string; intro: string };
  content: ToolContent;
} {
  const fromShort = shortCode(pair.fromLabel);
  const toShort = shortCode(pair.toLabel);
  const title = `${fromShort} to ${toShort} Converter: ${pair.fromName} to ${pair.toName} Time`;

  const winterNoon = convertWallTime({ y: 2026, mo: 1, d: 15, h: 12, mi: 0 }, pair.fromZone, pair.toZone);
  const summerNoon = convertWallTime({ y: 2026, mo: 7, d: 15, h: 12, mi: 0 }, pair.fromZone, pair.toZone);

  const isMountain = pair.slug.includes("mst");
  const isGmt = pair.slug.includes("gmt");

  const thirdParagraph = isMountain
    ? "One Mountain Time trap catches people every summer: Denver and most of the region observe daylight saving, moving to Mountain Daylight Time in March, but most of Arizona does not change its clocks at all. Phoenix stays on Mountain Standard Time all year, which means Arizona matches Mountain Time in winter and lines up with Pacific Time in summer. This converter follows America/Denver, so it is exact for Denver, Salt Lake City and Albuquerque; for Phoenix in summer, read the Pacific result instead."
    : isGmt
      ? "One GMT trap catches people every summer: London is only actually on GMT in winter. From the last Sunday of March to the last Sunday of October the United Kingdom runs on British Summer Time, one hour ahead of GMT, so a July flight itinerary timed in London time is BST even when a ticket or a colleague calls it GMT. This converter follows the Europe/London zone, so it applies GMT in winter and BST in summer automatically, which is what you want whenever the other end of the conversion is a real person in the United Kingdom."
      : `Scheduling across this pair is forgiving in one way: the two regions change their clocks on the same dates, so a weekly call set for 10:00 AM in ${pair.fromCities.split(",")[0]} stays at the same time in ${pair.toCities.split(",")[0]} all year. The risk is not the gap changing, it is forgetting the gap exists: an invitation written in one zone and read in the other silently shifts the meeting by the full difference, which is why converting the exact date, not just the hour, is the habit worth building.`;

  const fifthFaq = isMountain
    ? {
        q: "Is Arizona on the same time as Denver?",
        a: "Only in winter. Denver observes daylight saving and moves forward in spring, while most of Arizona stays on Mountain Standard Time all year. From March to November, Phoenix is one hour behind Denver and matches Pacific Time instead.",
      }
    : isGmt
      ? {
          q: "Is London on GMT in summer?",
          a: "No. London uses GMT in winter and British Summer Time, one hour ahead, from the last Sunday of March to the last Sunday of October. This converter follows the Europe/London zone, so summer dates are converted with BST even though the page is named GMT.",
        }
      : {
          q: `Which cities use ${pair.fromName} and ${pair.toName}?`,
          a: `${pair.fromName} covers ${pair.fromCities}. ${pair.toName} covers ${pair.toCities}. If your city is in one of these regions, this conversion applies to it directly.`,
        };

  const pageMeta = {
    title,
    metaDescription: `Convert ${pair.fromName} (${fromShort}) to ${pair.toName} (${toShort}) instantly for any date, with daylight saving handled by IANA zone rules. ${pair.differenceNote}`,
    intro: `${pair.blurb} Enter any date and time in ${pair.fromName} and read it in ${pair.toName}, with the live time in both zones and the exact difference for the date you picked. The usual difference: ${pair.differenceNote}`,
  };

  const content: ToolContent = {
    seoTitle: title,
    howTo: [
      `Pick the date and time you want to convert, entered as ${pair.fromName} time. It starts at the current moment.`,
      `Read the converted result in ${pair.toName}, shown with its weekday and full date, because the conversion can land on a different day.`,
      "Check the difference line: it is worked out for the exact date you chose, so daylight saving weeks are handled correctly.",
      "Compare with the two live clocks to see what the time is in both zones right now.",
    ],
    explanationTitle: `${pair.fromName} to ${pair.toName}: how the difference works`,
    explanation: [
      `${pair.blurb} The headline difference between the two zones is simple to state: ${pair.differenceNote} That difference is what the converter applies, but it is worked out from the calendar date rather than memorised, which matters more than it sounds, because the clocks a zone shows depend on the rules in force on that date.`,
      `A note on the names themselves. ${fromShort === "GMT" || toShort === "GMT" ? "GMT" : fromShort} strictly refers to standard time, the winter setting, and in summer these regions run one hour ahead on daylight time, under names like EDT, CDT, MDT, PDT and, in London, British Summer Time. People keep using the short standard time names all year, in searches and in conversation, so these pages use them as labels for the regions. Underneath, the conversion follows the IANA zones ${pair.fromZone} and ${pair.toZone}, which encode the real rules, so a date you pick in January and a date you pick in July each get the offset that is actually in force.`,
      thirdParagraph,
    ],
    faqs: [
      {
        q: `What is the time difference between ${pair.fromName} and ${pair.toName}?`,
        a: pair.differenceNote,
      },
      {
        q: `If it is 12:00 PM in ${pair.fromName} in winter, what time is it in ${pair.toName}?`,
        a: `On January 15, noon in ${pair.fromName} is ${formatClock(winterNoon.result)} in ${pair.toName}: ${formatZoned(winterNoon.result)}. The weekday is included because conversions near midnight can land on a different day.`,
      },
      {
        q: `If it is 12:00 PM in ${pair.fromName} in summer, what time is it in ${pair.toName}?`,
        a: `On July 15, noon in ${pair.fromName} is ${formatClock(summerNoon.result)} in ${pair.toName}: ${formatZoned(summerNoon.result)}. Comparing the winter and summer examples shows exactly how daylight saving affects this pair.`,
      },
      {
        q: "Does this converter handle daylight saving automatically?",
        a: `Yes. It converts with the IANA zones ${pair.fromZone} and ${pair.toZone}, which carry the full daylight saving rules, so the answer is right for the specific date you enter, including the awkward weeks when one region has changed its clocks and the other has not.`,
      },
      fifthFaq,
    ],
  };

  return { pageMeta, content };
}

const defaults = contentForPair(getPair("est-to-pst")!);

/** Default page metadata (for the EST to PST pair) for static imports. */
export const pageMeta = defaults.pageMeta;

/** Default page content (for the EST to PST pair) for static imports. */
export const content: ToolContent = defaults.content;
