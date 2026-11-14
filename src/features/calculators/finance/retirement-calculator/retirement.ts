/**
 * Retirement savings calculator logic.
 *
 * Current savings grow for n months at a monthly rate i, where i is the
 * yearly return percent divided by 1200 and n is the months until
 * retirement. Monthly contributions are added at the end of each month:
 *
 * savings future value = S * (1 + i)^n
 * contributions future value = P * [((1 + i)^n - 1) / i]
 *
 * When the return is zero, the contributions part is simply P * n and
 * the savings part stays unchanged.
 * When a goal is given, the monthly amount needed to reach it is solved
 * from the same formula after subtracting what current savings alone
 * would grow to.
 */

export interface RetirementInput {
  /** Current age, from 18 to 80. */
  currentAge: number;
  /** Age at retirement. Must be after current age and at most 90. */
  retirementAge: number;
  /** Savings already set aside. Must be zero or greater. */
  currentSavings: number;
  /** Amount added every month. Must be zero or greater. */
  monthlyContribution: number;
  /** Expected yearly return in percent. Must be zero or greater. */
  expectedReturnPercent: number;
  /** Optional target amount. Zero means no goal. Defaults to zero. */
  goalAmount?: number;
}

export interface RetirementResult {
  projectedCorpus: number;
  totalContributions: number;
  totalMonthlyContributions: number;
  growth: number;
  yearsToRetirement: number;
  monthsToRetirement: number;
  /** Amount short of the goal, or null when no goal was given. */
  shortfall: number | null;
  /** Monthly amount needed to hit the goal, or null when no goal was given. */
  monthlyNeeded: number | null;
  goalAmount: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const goalAmount = input.goalAmount ?? 0;

  if (!Number.isFinite(input.currentAge) || input.currentAge < 18 || input.currentAge > 80) {
    throw new RangeError("Current age must be between 18 and 80.");
  }
  if (
    !Number.isFinite(input.retirementAge) ||
    input.retirementAge <= input.currentAge ||
    input.retirementAge > 90
  ) {
    throw new RangeError("Retirement age must be after your current age and at most 90.");
  }
  if (!Number.isFinite(input.currentSavings) || input.currentSavings < 0) {
    throw new RangeError("Current savings must be zero or greater.");
  }
  if (!Number.isFinite(input.monthlyContribution) || input.monthlyContribution < 0) {
    throw new RangeError("Monthly contribution must be zero or greater.");
  }
  if (input.currentSavings === 0 && input.monthlyContribution === 0) {
    throw new RangeError("Enter current savings or a monthly contribution.");
  }
  if (!Number.isFinite(input.expectedReturnPercent) || input.expectedReturnPercent < 0) {
    throw new RangeError("Expected return must be zero or greater.");
  }
  if (!Number.isFinite(goalAmount) || goalAmount < 0) {
    throw new RangeError("Goal amount must be zero or greater.");
  }

  const yearsToRetirement = input.retirementAge - input.currentAge;
  const n = Math.round(yearsToRetirement * 12);
  const i = input.expectedReturnPercent / 1200;

  const savingsFuture = input.currentSavings * Math.pow(1 + i, n);
  const contributionsFuture =
    i === 0
      ? input.monthlyContribution * n
      : input.monthlyContribution * ((Math.pow(1 + i, n) - 1) / i);

  const projectedCorpus = round2(savingsFuture + contributionsFuture);
  const totalMonthlyContributions = round2(input.monthlyContribution * n);
  const totalContributions = round2(input.currentSavings + totalMonthlyContributions);
  const growth = round2(projectedCorpus - totalContributions);

  let shortfall: number | null = null;
  let monthlyNeeded: number | null = null;
  if (goalAmount > 0) {
    shortfall = round2(Math.max(0, goalAmount - projectedCorpus));
    const gap = goalAmount - savingsFuture;
    if (gap <= 0) {
      monthlyNeeded = 0;
    } else if (i === 0) {
      monthlyNeeded = round2(gap / n);
    } else {
      monthlyNeeded = round2((gap * i) / (Math.pow(1 + i, n) - 1));
    }
  }

  return {
    projectedCorpus,
    totalContributions,
    totalMonthlyContributions,
    growth,
    yearsToRetirement,
    monthsToRetirement: n,
    shortfall,
    monthlyNeeded,
    goalAmount,
  };
}
