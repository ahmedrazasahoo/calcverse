/**
 * Gratuity (end of service benefit) calculator logic for India, the UAE
 * and Qatar. The salary meaning differs by country and is stated on the
 * input: India uses last drawn basic pay plus dearness allowance per
 * month, while the UAE and Qatar use last basic monthly salary.
 *
 * India: gratuity = (15 / 26) * monthly salary * years counted, where a
 * part of a year above six months counts as a full year. Payable after
 * five years of service, and capped at 2,000,000.
 *
 * UAE: the first five years accrue 21 days of basic salary per year and
 * later years accrue 30 days per year. Daily wage is monthly salary
 * divided by 30. The total is capped at two years of salary.
 *
 * Qatar: three weeks of basic salary per year of service. Weekly pay is
 * monthly salary times 12 divided by 52, and the amount is years times
 * three times the weekly pay. Payable after one year of service.
 */

export type GratuityCountry = "india" | "uae" | "qatar";

export const INDIA_GRATUITY_CAP = 2_000_000;

export interface GratuityInput {
  country: GratuityCountry;
  /** Monthly salary as defined per country in the notes above. Must be greater than zero. */
  monthlySalary: number;
  /** Years of service. Decimals are allowed. Must be zero or greater. */
  yearsOfService: number;
}

export interface GratuityResult {
  country: GratuityCountry;
  amount: number;
  uncappedAmount: number;
  eligible: boolean;
  capped: boolean;
  /** Years used in the calculation. For India this is the rounded year count. */
  yearsCounted: number;
  /** Daily wage used, for the UAE calculation. Null for other countries. */
  dailyWage: number | null;
  /** Weekly pay used, for the Qatar calculation. Null for other countries. */
  weeklyPay: number | null;
  /** Days of salary accrued, for the UAE calculation. Null for other countries. */
  daysAccrued: number | null;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateGratuity(input: GratuityInput): GratuityResult {
  if (input.country !== "india" && input.country !== "uae" && input.country !== "qatar") {
    throw new RangeError("Country must be india, uae or qatar.");
  }
  if (!Number.isFinite(input.monthlySalary) || input.monthlySalary <= 0) {
    throw new RangeError("Monthly salary must be greater than zero.");
  }
  if (!Number.isFinite(input.yearsOfService) || input.yearsOfService < 0) {
    throw new RangeError("Years of service must be zero or greater.");
  }

  const salary = input.monthlySalary;
  const years = input.yearsOfService;

  if (input.country === "india") {
    const wholeYears = Math.floor(years);
    const fraction = years - wholeYears;
    const roundedYears = wholeYears + (fraction > 0.5 ? 1 : 0);
    const raw = (15 / 26) * salary * roundedYears;
    const capped = raw > INDIA_GRATUITY_CAP;
    return {
      country: input.country,
      amount: round2(capped ? INDIA_GRATUITY_CAP : raw),
      uncappedAmount: round2(raw),
      eligible: roundedYears >= 5,
      capped,
      yearsCounted: roundedYears,
      dailyWage: null,
      weeklyPay: null,
      daysAccrued: null,
    };
  }

  if (input.country === "uae") {
    const daysAccrued = Math.min(years, 5) * 21 + Math.max(0, years - 5) * 30;
    const dailyWage = salary / 30;
    const raw = daysAccrued * dailyWage;
    const cap = salary * 24;
    const capped = raw > cap;
    return {
      country: input.country,
      amount: round2(capped ? cap : raw),
      uncappedAmount: round2(raw),
      eligible: years >= 1,
      capped,
      yearsCounted: years,
      dailyWage: round2(dailyWage),
      weeklyPay: null,
      daysAccrued: round2(daysAccrued),
    };
  }

  // Qatar
  const weeklyPay = (salary * 12) / 52;
  const raw = years * 3 * weeklyPay;
  return {
    country: input.country,
    amount: round2(raw),
    uncappedAmount: round2(raw),
    eligible: years >= 1,
    capped: false,
    yearsCounted: years,
    dailyWage: null,
    weeklyPay: round2(weeklyPay),
    daysAccrued: null,
  };
}
