/**
 * Compound interest calculator logic, with optional monthly contributions.
 *
 * Growth is simulated period by period so any compounding frequency works
 * with the same code path:
 * balance grows by (annualRate / periodsPerYear) each period, and the
 * monthly contribution is spread evenly across the periods of each year.
 * Contributions are added at the end of each period.
 */

export type CompoundingFrequency = "yearly" | "half-yearly" | "quarterly" | "monthly" | "daily";

export const COMPOUNDING_PERIODS_PER_YEAR: Record<CompoundingFrequency, number> = {
  yearly: 1,
  "half-yearly": 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export interface CompoundInterestInput {
  /** Starting amount. Must be zero or greater. */
  principal: number;
  /** Annual interest rate in percent, for example 8 means 8%. */
  annualRatePercent: number;
  /** Growth period in years. Must be greater than zero. */
  years: number;
  /** How often interest compounds. */
  compounding: CompoundingFrequency;
  /** Optional amount added every month. Defaults to zero. */
  monthlyContribution?: number;
}

export interface CompoundYearRow {
  year: number;
  /** Total put in by the end of this year (principal plus contributions). */
  totalContributions: number;
  /** Balance at the end of this year. */
  balance: number;
  /** Interest earned up to the end of this year. */
  interestEarned: number;
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: CompoundYearRow[];
}

export const MAX_YEARS = 100;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult {
  const monthlyContribution = input.monthlyContribution ?? 0;
  if (!Number.isFinite(input.principal) || input.principal < 0) {
    throw new RangeError("Principal must be zero or greater.");
  }
  if (input.principal === 0 && monthlyContribution <= 0) {
    throw new RangeError("Enter a starting amount or a monthly contribution.");
  }
  if (!Number.isFinite(input.annualRatePercent) || input.annualRatePercent < 0) {
    throw new RangeError("Annual rate must be zero or greater.");
  }
  if (!Number.isFinite(input.years) || input.years <= 0 || input.years > MAX_YEARS) {
    throw new RangeError(`Years must be greater than 0 and at most ${MAX_YEARS}.`);
  }
  if (!Number.isFinite(monthlyContribution) || monthlyContribution < 0) {
    throw new RangeError("Monthly contribution must be zero or greater.");
  }

  const periodsPerYear = COMPOUNDING_PERIODS_PER_YEAR[input.compounding];
  const periodRate = input.annualRatePercent / 100 / periodsPerYear;
  const contributionPerPeriod = (monthlyContribution * 12) / periodsPerYear;
  const totalPeriods = Math.round(periodsPerYear * input.years);

  let balance = input.principal;
  const yearlyBreakdown: CompoundYearRow[] = [];

  for (let period = 1; period <= totalPeriods; period += 1) {
    balance = balance * (1 + periodRate) + contributionPerPeriod;
    if (period % periodsPerYear === 0) {
      const year = period / periodsPerYear;
      const contributed = input.principal + monthlyContribution * 12 * year;
      yearlyBreakdown.push({
        year,
        totalContributions: round2(contributed),
        balance: round2(balance),
        interestEarned: round2(balance - contributed),
      });
    }
  }

  const totalContributions = round2(
    input.principal + monthlyContribution * 12 * input.years,
  );
  const finalBalance = round2(balance);
  return {
    finalBalance,
    totalContributions,
    totalInterest: round2(finalBalance - totalContributions),
    yearlyBreakdown,
  };
}
