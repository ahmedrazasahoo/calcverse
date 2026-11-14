/**
 * UK Stamp Duty Land Tax (SDLT) calculator logic.
 *
 * Applies to residential purchases in England and Northern Ireland
 * completing on or after 1 April 2025. Rates verified on gov.uk and
 * unchanged through the October 2026 Budget. Rates checked November
 * 2026.
 *
 * SDLT is charged in slices, like income tax: each band rate applies
 * only to the part of the price inside that band, never to the whole
 * price. First time buyer relief raises the tax free slice, but it is
 * lost completely once the price passes GBP 500,000.
 *
 * Out of scope, and stated on the page: the additional property
 * surcharge, the non-resident surcharge, non-residential and mixed
 * use rates, and linked transactions. Scotland charges Land and
 * Buildings Transaction Tax (LBTT) and Wales charges Land Transaction
 * Tax (LTT) instead, with different bands.
 */

export interface SdltBand {
  /** Top of this band. Infinity for the top band. */
  upTo: number;
  /** Rate charged on the slice of the price inside this band, decimal. */
  rate: number;
  label: string;
}

/** Standard residential bands in force from 1 April 2025. */
export const STANDARD_BANDS: SdltBand[] = [
  { upTo: 125000, rate: 0, label: "£0 to £125,000" },
  { upTo: 250000, rate: 0.02, label: "£125,000 to £250,000" },
  { upTo: 925000, rate: 0.05, label: "£250,000 to £925,000" },
  { upTo: 1500000, rate: 0.1, label: "£925,000 to £1,500,000" },
  { upTo: Infinity, rate: 0.12, label: "Above £1,500,000" },
];

/** First time buyer bands, available only at prices up to £500,000. */
export const FIRST_TIME_BUYER_BANDS: SdltBand[] = [
  { upTo: 300000, rate: 0, label: "£0 to £300,000" },
  { upTo: 500000, rate: 0.05, label: "£300,000 to £500,000" },
];

/** Price above which first time buyer relief is lost entirely. */
export const FTB_PRICE_LIMIT = 500000;

export interface BandBreakdown {
  label: string;
  ratePercent: number;
  /** Part of the price falling inside this band. */
  amountInBand: number;
  /** Tax charged on that part. */
  tax: number;
}

export interface StampDutyInput {
  /** Purchase price in GBP. */
  price: number;
  /** True when every buyer is a first time buyer. */
  firstTimeBuyer: boolean;
}

export interface StampDutyResult {
  price: number;
  firstTimeBuyer: boolean;
  /** True when relief was claimed but the price is over £500,000, so standard bands apply. */
  reliefLost: boolean;
  totalTax: number;
  /** Total tax as a percentage of the price. */
  effectiveRatePercent: number;
  breakdown: BandBreakdown[];
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function taxForBands(price: number, bands: SdltBand[]): BandBreakdown[] {
  const rows: BandBreakdown[] = [];
  let lower = 0;
  for (const band of bands) {
    const amountInBand = Math.max(0, Math.min(price, band.upTo) - lower);
    if (amountInBand > 0 || band.rate === 0) {
      rows.push({
        label: band.label,
        ratePercent: band.rate * 100,
        amountInBand: round2(amountInBand),
        tax: round2(amountInBand * band.rate),
      });
    }
    lower = band.upTo;
    if (price <= band.upTo) break;
  }
  return rows;
}

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  if (!Number.isFinite(input.price) || input.price <= 0) {
    throw new RangeError("Price must be greater than zero.");
  }
  const reliefLost = input.firstTimeBuyer && input.price > FTB_PRICE_LIMIT;
  const useFtbBands = input.firstTimeBuyer && !reliefLost;
  const breakdown = taxForBands(input.price, useFtbBands ? FIRST_TIME_BUYER_BANDS : STANDARD_BANDS);
  const totalTax = round2(breakdown.reduce((sum, row) => sum + row.tax, 0));
  return {
    price: round2(input.price),
    firstTimeBuyer: input.firstTimeBuyer,
    reliefLost,
    totalTax,
    effectiveRatePercent: round2((totalTax / input.price) * 100),
    breakdown,
  };
}

/** Format a number as pounds sterling, en-GB style, for example £43,750. */
export function fmtGbp(n: number, digits = 0): string {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
