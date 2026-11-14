/**
 * Sales tax rates for all 50 US states.
 *
 * baseRate is the statewide rate in percent. avgCombined is the average
 * combined rate in percent once local county, city and district taxes are
 * included. Combined figures are population weighted averages in the style
 * of the Tax Foundation state and local sales tax tables, so they are
 * approximate: the exact rate at any one address can be higher or lower.
 * California, Louisiana, New York and Tennessee combined averages were
 * updated to the Tax Foundation midyear 2026 table during the build.
 */
export interface StateSalesTax {
  name: string;
  /** Lowercase state name with dashes, e.g. "north-carolina". */
  slug: string;
  /** Route slug for the state page, e.g. "north-carolina-sales-tax-calculator". */
  stateSlug: string;
  /** USPS abbreviation, e.g. "NC". */
  abbr: string;
  /** Statewide sales tax rate in percent. */
  baseRate: number;
  /** Average combined state plus local rate in percent (approximate). */
  avgCombined: number;
}

function s(name: string, abbr: string, baseRate: number, avgCombined: number): StateSalesTax {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return { name, slug, stateSlug: `${slug}-sales-tax-calculator`, abbr, baseRate, avgCombined };
}

export const states: StateSalesTax[] = [
  s("Alabama", "AL", 4.0, 9.29),
  s("Alaska", "AK", 0.0, 1.82),
  s("Arizona", "AZ", 5.6, 8.37),
  s("Arkansas", "AR", 6.5, 9.44),
  s("California", "CA", 7.25, 9.03),
  s("Colorado", "CO", 2.9, 7.81),
  s("Connecticut", "CT", 6.35, 6.35),
  s("Delaware", "DE", 0.0, 0.0),
  s("Florida", "FL", 6.0, 7.08),
  s("Georgia", "GA", 4.0, 7.35),
  s("Hawaii", "HI", 4.0, 4.44),
  s("Idaho", "ID", 6.0, 6.03),
  s("Illinois", "IL", 6.25, 8.85),
  s("Indiana", "IN", 7.0, 7.0),
  s("Iowa", "IA", 6.0, 6.94),
  s("Kansas", "KS", 6.5, 8.7),
  s("Kentucky", "KY", 6.0, 6.0),
  s("Louisiana", "LA", 5.0, 10.13),
  s("Maine", "ME", 5.5, 5.5),
  s("Maryland", "MD", 6.0, 6.0),
  s("Massachusetts", "MA", 6.25, 6.25),
  s("Michigan", "MI", 6.0, 6.0),
  s("Minnesota", "MN", 6.875, 7.49),
  s("Mississippi", "MS", 7.0, 7.07),
  s("Missouri", "MO", 4.225, 8.39),
  s("Montana", "MT", 0.0, 0.0),
  s("Nebraska", "NE", 5.5, 6.97),
  s("Nevada", "NV", 6.85, 8.23),
  s("New Hampshire", "NH", 0.0, 0.0),
  s("New Jersey", "NJ", 6.625, 6.6),
  s("New Mexico", "NM", 5.0, 7.83),
  s("New York", "NY", 4.0, 8.54),
  s("North Carolina", "NC", 4.75, 6.97),
  s("North Dakota", "ND", 5.0, 7.0),
  s("Ohio", "OH", 5.75, 7.24),
  s("Oklahoma", "OK", 4.5, 8.98),
  s("Oregon", "OR", 0.0, 0.0),
  s("Pennsylvania", "PA", 6.0, 6.34),
  s("Rhode Island", "RI", 7.0, 7.0),
  s("South Carolina", "SC", 6.0, 7.44),
  s("South Dakota", "SD", 4.2, 6.11),
  s("Tennessee", "TN", 7.0, 9.61),
  s("Texas", "TX", 6.25, 8.2),
  s("Utah", "UT", 5.95, 7.19),
  s("Vermont", "VT", 6.0, 6.24),
  s("Virginia", "VA", 5.3, 5.77),
  s("Washington", "WA", 6.5, 9.38),
  s("West Virginia", "WV", 6.0, 6.5),
  s("Wisconsin", "WI", 5.0, 5.72),
  s("Wyoming", "WY", 4.0, 5.44),
];

export function getStateBySlug(slug: string): StateSalesTax | undefined {
  return states.find((state) => state.slug === slug);
}
