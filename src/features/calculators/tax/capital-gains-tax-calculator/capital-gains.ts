/**
 * US federal capital gains tax estimator logic for tax year 2026.
 *
 * Pure and framework free. Short term gains (assets held a year or
 * less) are taxed as ordinary income. Long term gains stack on top of
 * your other taxable income and are taxed at 0, 15 or 20 percent
 * depending on where the gain sits against the 2026 thresholds. A
 * possible 3.8 percent net investment income tax (NIIT) is added when
 * a modified adjusted gross income (MAGI) figure is supplied.
 *
 * Netting follows the usual pattern: a net short term result and a
 * net long term result offset each other, and a combined net loss is
 * allowed against other income only up to $3,000 in this estimate,
 * with the rest reported as a carryforward and not modelled further.
 *
 * 2026 figures: IRS Revenue Procedure 2025-32. This is an estimator,
 * not a tax return: the qualified dividends worksheet, the 25 and 28
 * percent rate groups, state tax and loss harvesting rules are out of
 * scope.
 */

export type FilingStatus = "single" | "mfj" | "hoh" | "mfs";

export interface BracketBand {
  upTo: number;
  rate: number;
}

/**
 * 2026 ordinary brackets. Single, joint and head of household limits
 * were supplied in the brief; married filing separately limits are
 * exactly half of the joint limits, which is how the IRS sets them.
 */
export const BRACKETS_2026: Record<FilingStatus, BracketBand[]> = {
  single: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 24800, rate: 0.1 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17700, rate: 0.1 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfs: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 384350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

/** Ordinary bracket tax on a taxable income figure. */
export function ordinaryTax(taxableIncome: number, status: FilingStatus): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) return 0;
  let tax = 0;
  let lower = 0;
  for (const band of BRACKETS_2026[status]) {
    if (taxableIncome <= lower) break;
    const slice = Math.min(taxableIncome, band.upTo) - lower;
    if (slice > 0) tax += slice * band.rate;
    lower = band.upTo;
  }
  return round2(tax);
}

export interface CapitalGainsThresholds {
  /** Total taxable income up to which long term gains are taxed at 0 percent. */
  zeroUpTo: number;
  /** Total taxable income up to which long term gains are taxed at 15 percent. */
  fifteenUpTo: number;
  /** MAGI above which the 3.8 percent NIIT can apply. */
  niitThreshold: number;
}

/** 2026 long term capital gains thresholds and NIIT thresholds. */
export const CAPITAL_GAINS_2026: Record<FilingStatus, CapitalGainsThresholds> = {
  single: { zeroUpTo: 49450, fifteenUpTo: 545500, niitThreshold: 200000 },
  mfj: { zeroUpTo: 98900, fifteenUpTo: 613700, niitThreshold: 250000 },
  hoh: { zeroUpTo: 66200, fifteenUpTo: 579600, niitThreshold: 200000 },
  mfs: { zeroUpTo: 49450, fifteenUpTo: 306850, niitThreshold: 125000 },
};

/** Annual capital loss allowed against other income in this estimate. */
export const LOSS_LIMIT = 3000;

export interface CapitalGainsInput {
  filingStatus: FilingStatus;
  /** Taxable income excluding these gains and losses, after deductions. */
  otherTaxableIncome: number;
  /** Net short term result: a gain is positive, a loss is negative. */
  shortTerm: number;
  /** Net long term result: a gain is positive, a loss is negative. */
  longTerm: number;
  /** MAGI for the NIIT check, or null to skip the NIIT entirely. */
  magi: number | null;
}

export interface CapitalGainsResult {
  /** Short term result after netting against the long term result. */
  netShortTerm: number;
  /** Long term result after netting against the short term result. */
  netLongTerm: number;
  /** Combined net capital loss (positive figure), or zero. */
  netLoss: number;
  /** Loss used against other income this year, capped at $3,000. */
  lossUsedAgainstIncome: number;
  /** Loss left over as a carryforward, not modelled further. */
  lossCarryforward: number;
  /** Other taxable income after any allowed loss. */
  baseTaxableIncome: number;
  /** Total taxable income including net gains. */
  totalTaxableIncome: number;
  ltAtZero: number;
  ltAtFifteen: number;
  ltAtTwenty: number;
  taxOnLongTerm: number;
  /** Extra ordinary tax caused by the short term gain alone. */
  taxOnShortTerm: number;
  /** Ordinary tax on the base income plus any short term gain. */
  ordinaryTaxTotal: number;
  /** Net investment income tax, or null when no MAGI was supplied. */
  niit: number | null;
  totalTax: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateCapitalGains(input: CapitalGainsInput): CapitalGainsResult {
  if (!Number.isFinite(input.otherTaxableIncome) || input.otherTaxableIncome < 0) {
    throw new RangeError("Other taxable income must be zero or more.");
  }
  if (!Number.isFinite(input.shortTerm) || !Number.isFinite(input.longTerm)) {
    throw new RangeError("Gains and losses must be valid numbers.");
  }
  if (input.magi !== null && (!Number.isFinite(input.magi) || input.magi < 0)) {
    throw new RangeError("MAGI must be zero or more, or left blank.");
  }

  const st = input.shortTerm;
  const lt = input.longTerm;

  // Netting: opposite signs offset each other and any remainder keeps
  // the character of the larger side. Matching signs stay separate.
  let netShortTerm = st;
  let netLongTerm = lt;
  if (st > 0 && lt < 0) {
    const combined = st + lt;
    netShortTerm = combined > 0 ? combined : 0;
    netLongTerm = combined < 0 ? combined : 0;
  } else if (st < 0 && lt > 0) {
    const combined = st + lt;
    netLongTerm = combined > 0 ? combined : 0;
    netShortTerm = combined < 0 ? combined : 0;
  } else if (st < 0 && lt < 0) {
    netShortTerm = st + lt;
    netLongTerm = 0;
  }

  const combinedNet = netShortTerm + netLongTerm;

  let netLoss = 0;
  let lossUsedAgainstIncome = 0;
  let lossCarryforward = 0;
  let baseTaxableIncome = input.otherTaxableIncome;
  let gainShort = 0;
  let gainLong = 0;

  if (combinedNet < 0) {
    netLoss = -combinedNet;
    lossUsedAgainstIncome = Math.min(LOSS_LIMIT, netLoss);
    lossCarryforward = round2(netLoss - lossUsedAgainstIncome);
    baseTaxableIncome = Math.max(0, round2(input.otherTaxableIncome - lossUsedAgainstIncome));
    netShortTerm = 0;
    netLongTerm = 0;
  } else {
    gainShort = Math.max(0, netShortTerm);
    gainLong = Math.max(0, netLongTerm);
    netShortTerm = gainShort;
    netLongTerm = gainLong;
  }

  const thresholds = CAPITAL_GAINS_2026[input.filingStatus];

  // Long term stacking: ordinary income and any short term gain fill
  // the income scale first, and the long term gain sits on top. The
  // thresholds measure total taxable income including the gain.
  const ltStart = baseTaxableIncome + gainShort;
  const ltAtZero = Math.min(gainLong, Math.max(0, thresholds.zeroUpTo - ltStart));
  const ltAtFifteen = Math.min(gainLong - ltAtZero, Math.max(0, thresholds.fifteenUpTo - ltStart - ltAtZero));
  const ltAtTwenty = gainLong - ltAtZero - ltAtFifteen;
  const taxOnLongTerm = round2(ltAtFifteen * 0.15 + ltAtTwenty * 0.2);

  const ordinaryTaxTotal = ordinaryTax(baseTaxableIncome + gainShort, input.filingStatus);
  const taxOnShortTerm = round2(ordinaryTaxTotal - ordinaryTax(baseTaxableIncome, input.filingStatus));

  // NIIT: 3.8 percent of the smaller of the net investment gain and
  // the amount by which MAGI passes the threshold. Only when MAGI was
  // actually supplied; blank means the NIIT is skipped, not zero rated
  // by assumption.
  let niit: number | null = null;
  if (input.magi !== null) {
    const netInvestmentGain = Math.max(0, gainShort + gainLong);
    const excess = Math.max(0, input.magi - thresholds.niitThreshold);
    niit = round2(0.038 * Math.min(netInvestmentGain, excess));
  }

  const totalTaxableIncome = round2(baseTaxableIncome + gainShort + gainLong);
  const totalTax = round2(ordinaryTaxTotal + taxOnLongTerm + (niit ?? 0));

  return {
    netShortTerm: round2(netShortTerm),
    netLongTerm: round2(netLongTerm),
    netLoss: round2(netLoss),
    lossUsedAgainstIncome: round2(lossUsedAgainstIncome),
    lossCarryforward,
    baseTaxableIncome: round2(baseTaxableIncome),
    totalTaxableIncome,
    ltAtZero: round2(ltAtZero),
    ltAtFifteen: round2(ltAtFifteen),
    ltAtTwenty: round2(ltAtTwenty),
    taxOnLongTerm,
    taxOnShortTerm,
    ordinaryTaxTotal,
    niit,
    totalTax,
  };
}
