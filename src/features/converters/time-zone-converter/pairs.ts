/**
 * The ten time zone pair pages. The short names people search for
 * (EST, PST and friends) strictly mean standard time, but searchers
 * use them all year, so each label is mapped to the IANA zone of the
 * region it names. The converters then follow that region's real
 * rules, including daylight saving, instead of a fixed offset.
 */

export interface ZonePair {
  slug: string;
  /** Short label for the source, for example "EST (Eastern)". */
  fromLabel: string;
  /** Full source name, for example "Eastern Time". */
  fromName: string;
  toLabel: string;
  toName: string;
  fromZone: string;
  toZone: string;
  /** Main cities in the source zone. */
  fromCities: string;
  /** Main cities in the target zone. */
  toCities: string;
  /** One or two sentences naming the pair and its main cities. */
  blurb: string;
  /** How the difference behaves across the year, in plain words. */
  differenceNote: string;
}

const EASTERN = {
  label: "EST (Eastern)",
  name: "Eastern Time",
  zone: "America/New_York",
  cities: "New York, Washington DC, Atlanta, Miami and Toronto",
};
const CENTRAL = {
  label: "CST (Central)",
  name: "Central Time",
  zone: "America/Chicago",
  cities: "Chicago, Dallas, Houston, New Orleans and Minneapolis",
};
const MOUNTAIN = {
  label: "MST (Mountain)",
  name: "Mountain Time",
  zone: "America/Denver",
  cities: "Denver, Salt Lake City, Albuquerque and Phoenix",
};
const PACIFIC = {
  label: "PST (Pacific)",
  name: "Pacific Time",
  zone: "America/Los_Angeles",
  cities: "Los Angeles, San Francisco, Seattle, San Diego and Las Vegas",
};
const GMT = {
  label: "GMT",
  name: "GMT (London)",
  zone: "Europe/London",
  cities: "London and the rest of the United Kingdom",
};

const SAME_YEAR_ROUND = (hours: string) =>
  `${hours} all year round. Both regions move their clocks on the same dates in spring and autumn, so the gap between them never changes.`;

export const ZONE_PAIRS: ZonePair[] = [
  {
    slug: "est-to-pst",
    fromLabel: EASTERN.label, fromName: EASTERN.name, fromZone: EASTERN.zone, fromCities: EASTERN.cities,
    toLabel: PACIFIC.label, toName: PACIFIC.name, toZone: PACIFIC.zone, toCities: PACIFIC.cities,
    blurb: "Eastern to Pacific is the classic coast to coast conversion in the United States, from New York and Washington DC over to Los Angeles, San Francisco and Seattle.",
    differenceNote: SAME_YEAR_ROUND("3 hours"),
  },
  {
    slug: "pst-to-est",
    fromLabel: PACIFIC.label, fromName: PACIFIC.name, fromZone: PACIFIC.zone, fromCities: PACIFIC.cities,
    toLabel: EASTERN.label, toName: EASTERN.name, toZone: EASTERN.zone, toCities: EASTERN.cities,
    blurb: "Pacific to Eastern covers the west coast to east coast jump, from Los Angeles, San Francisco and Seattle over to New York, Washington DC and Miami.",
    differenceNote: SAME_YEAR_ROUND("3 hours"),
  },
  {
    slug: "est-to-cst",
    fromLabel: EASTERN.label, fromName: EASTERN.name, fromZone: EASTERN.zone, fromCities: EASTERN.cities,
    toLabel: CENTRAL.label, toName: CENTRAL.name, toZone: CENTRAL.zone, toCities: CENTRAL.cities,
    blurb: "Eastern to Central is the one hour step from New York and Atlanta into Chicago, Dallas and Houston, the most common business call pairing in the United States.",
    differenceNote: SAME_YEAR_ROUND("1 hour"),
  },
  {
    slug: "cst-to-est",
    fromLabel: CENTRAL.label, fromName: CENTRAL.name, fromZone: CENTRAL.zone, fromCities: CENTRAL.cities,
    toLabel: EASTERN.label, toName: EASTERN.name, toZone: EASTERN.zone, toCities: EASTERN.cities,
    blurb: "Central to Eastern steps one hour forward from Chicago, Dallas and Houston to New York, Washington DC and Miami, the pairing behind most US flight and meeting schedules.",
    differenceNote: SAME_YEAR_ROUND("1 hour"),
  },
  {
    slug: "pst-to-cst",
    fromLabel: PACIFIC.label, fromName: PACIFIC.name, fromZone: PACIFIC.zone, fromCities: PACIFIC.cities,
    toLabel: CENTRAL.label, toName: CENTRAL.name, toZone: CENTRAL.zone, toCities: CENTRAL.cities,
    blurb: "Pacific to Central covers the two hour jump from Los Angeles and Seattle into Chicago, Dallas and Houston, common for remote teams spread across the western half of the United States.",
    differenceNote: SAME_YEAR_ROUND("2 hours"),
  },
  {
    slug: "cst-to-pst",
    fromLabel: CENTRAL.label, fromName: CENTRAL.name, fromZone: CENTRAL.zone, fromCities: CENTRAL.cities,
    toLabel: PACIFIC.label, toName: PACIFIC.name, toZone: PACIFIC.zone, toCities: PACIFIC.cities,
    blurb: "Central to Pacific steps two hours back from Chicago, Dallas and Houston to Los Angeles, San Francisco and Seattle.",
    differenceNote: SAME_YEAR_ROUND("2 hours"),
  },
  {
    slug: "est-to-mst",
    fromLabel: EASTERN.label, fromName: EASTERN.name, fromZone: EASTERN.zone, fromCities: EASTERN.cities,
    toLabel: MOUNTAIN.label, toName: MOUNTAIN.name, toZone: MOUNTAIN.zone, toCities: MOUNTAIN.cities,
    blurb: "Eastern to Mountain is the two hour step from New York and Miami into Denver, Salt Lake City and Albuquerque.",
    differenceNote: SAME_YEAR_ROUND("2 hours"),
  },
  {
    slug: "mst-to-est",
    fromLabel: MOUNTAIN.label, fromName: MOUNTAIN.name, fromZone: MOUNTAIN.zone, fromCities: MOUNTAIN.cities,
    toLabel: EASTERN.label, toName: EASTERN.name, toZone: EASTERN.zone, toCities: EASTERN.cities,
    blurb: "Mountain to Eastern steps two hours forward from Denver, Salt Lake City and Albuquerque to New York, Washington DC and Atlanta.",
    differenceNote: SAME_YEAR_ROUND("2 hours"),
  },
  {
    slug: "gmt-to-est",
    fromLabel: GMT.label, fromName: GMT.name, fromZone: GMT.zone, fromCities: GMT.cities,
    toLabel: EASTERN.label, toName: EASTERN.name, toZone: EASTERN.zone, toCities: EASTERN.cities,
    blurb: "GMT to EST is the transatlantic conversion between London and the United Kingdom and the US east coast: New York, Washington DC and Miami.",
    differenceNote:
      "5 hours for most of the year. For a few weeks in March, and again around the end of October and start of November, the gap narrows to 4 hours, because the United States and the United Kingdom change their clocks on different dates.",
  },
  {
    slug: "est-to-gmt",
    fromLabel: EASTERN.label, fromName: EASTERN.name, fromZone: EASTERN.zone, fromCities: EASTERN.cities,
    toLabel: GMT.label, toName: GMT.name, toZone: GMT.zone, toCities: GMT.cities,
    blurb: "EST to GMT converts US east coast time, New York, Washington DC and Miami, into London and United Kingdom time.",
    differenceNote:
      "5 hours for most of the year. For a few weeks in March, and again around the end of October and start of November, the gap narrows to 4 hours, because the United States and the United Kingdom change their clocks on different dates.",
  },
];

/** Find a pair by slug, or undefined when the slug is not one of the ten. */
export function getPair(slug: string): ZonePair | undefined {
  return ZONE_PAIRS.find((pair) => pair.slug === slug);
}
