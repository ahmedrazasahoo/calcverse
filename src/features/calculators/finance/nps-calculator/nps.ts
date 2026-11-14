/**
 * NPS (National Pension System, India) calculator logic.
 *
 * Contributions are made at the start of each month until age 60 and
 * compound monthly. With P as the monthly contribution, i as the monthly
 * rate (annual return percent divided by 1200) and n as the number of
 * months until age 60:
 *
 * corpus = P * [((1 + i)^n - 1) / i] * (1 + i)
 *
 * The extra (1 + i) factor reflects contributions at the start of the
 * month. When the return is zero, the corpus is simply P * n.
 * At 60, at least 40 percent of the corpus must buy an annuity. The rest
 * can be withdrawn as a lump sum. The monthly pension is the annuity
 * corpus multiplied by the yearly annuity rate, divided by 12.
 */

export const RETIREMENT_AGE = 60;
export const MIN_ANNUITY_PERCENT = 40;
export const DEFAULT_ANNUITY_PERCENT = 40;
export const DEFAULT_ANNUITY_RATE_PERCENT = 6;

export interface NpsInput {
  /** Amount contributed every month. Must be greater than zero. */
  monthlyContribution: number;
  /** Current age, from 18 to 59. */
  currentAge: number;
  /** Expected yearly return in percent, for example 10 means 10%. Must be zero or greater. */
  expectedReturnPercent: number;
  /** Share of the corpus used to buy an annuity, from 40 to 100. Defaults to 40. */
  annuityPurchasePercent?: number;
  /** Yearly annuity rate in percent. Defaults to 6. Must be greater than zero. */
  annuityRatePercent?: number;
}

export interface NpsResult {
  corpus: number;
  estimatedCorpus: number;
  totalInvested: number;
  gains: number;
  totalGains: number;
  annuityCorpus: number;
  lumpSum: number;
  monthlyPension: number;
  months: number;
  yearsToRetirement: number;
  retirementAge: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateNps(input: NpsInput): NpsResult {
  const annuityPurchasePercent = input.annuityPurchasePercent ?? DEFAULT_ANNUITY_PERCENT;
  const annuityRatePercent = input.annuityRatePercent ?? DEFAULT_ANNUITY_RATE_PERCENT;

  if (!Number.isFinite(input.monthlyContribution) || input.monthlyContribution <= 0) {
    throw new RangeError("Monthly contribution must be greater than zero.");
  }
  if (
    !Number.isFinite(input.currentAge) ||
    input.currentAge < 18 ||
    input.currentAge >= RETIREMENT_AGE
  ) {
    throw new RangeError("Current age must be between 18 and 59.");
  }
  if (!Number.isFinite(input.expectedReturnPercent) || input.expectedReturnPercent < 0) {
    throw new RangeError("Expected return must be zero or greater.");
  }
  if (
    !Number.isFinite(annuityPurchasePercent) ||
    annuityPurchasePercent < MIN_ANNUITY_PERCENT ||
    annuityPurchasePercent > 100
  ) {
    throw new RangeError("Annuity purchase must be between 40 and 100 percent.");
  }
  if (!Number.isFinite(annuityRatePercent) || annuityRatePercent <= 0) {
    throw new RangeError("Annuity rate must be greater than zero.");
  }

  const months = Math.round((RETIREMENT_AGE - input.currentAge) * 12);
  const i = input.expectedReturnPercent / 1200;
  const corpusRaw =
    i === 0
      ? input.monthlyContribution * months
      : input.monthlyContribution * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));

  const corpus = round2(corpusRaw);
  const totalInvested = round2(input.monthlyContribution * months);
  const annuityCorpus = round2((corpus * annuityPurchasePercent) / 100);
  const lumpSum = round2(corpus - annuityCorpus);
  const monthlyPension = round2((annuityCorpus * (annuityRatePercent / 100)) / 12);
  const gains = round2(corpus - totalInvested);

  return {
    corpus,
    estimatedCorpus: corpus,
    totalInvested,
    gains,
    totalGains: gains,
    annuityCorpus,
    lumpSum,
    monthlyPension,
    months,
    yearsToRetirement: RETIREMENT_AGE - input.currentAge,
    retirementAge: RETIREMENT_AGE,
  };
}
