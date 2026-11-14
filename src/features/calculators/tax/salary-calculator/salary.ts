/**
 * Salary calculator logic: pay period conversion plus a take home
 * estimate.
 *
 * Conversion: every period figure is derived from the yearly amount.
 * A working week is five days, so the daily rate is the weekly rate
 * divided by five, and the weekly rate is the hourly rate times the
 * hours worked per week.
 *
 * Take home: a compact estimate only. The US and UK figures repeat
 * the bracket tables used by the income tax estimator on this site so
 * this module stays independent, and the custom option applies one
 * flat rate. Pension contributions, student loans, extra deductions
 * and credits are not modelled; the detailed country calculators on
 * this site cover those.
 */

export type PayPeriod = "hourly" | "daily" | "weekly" | "monthly" | "yearly";

export interface PayConversionInput {
  amount: number;
  period: PayPeriod;
  /** Hours worked per week. Defaults to 40. Must be above 0 and at most 168. */
  hoursPerWeek?: number;
  /** Weeks worked per year. Defaults to 52. Must be above 0 and at most 52. */
  weeksPerYear?: number;
}

export interface PayConversion {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export type TakeHomeCountry = "us" | "uk" | "custom";

export interface TakeHomeInput {
  /** Gross pay per year, for example the yearly figure from a conversion. */
  grossYearly: number;
  country: TakeHomeCountry;
  /** US only: flat state tax rate on gross income, in percent. Defaults to 0. */
  stateRatePercent?: number;
  /** Custom only: one flat tax rate on gross income, in percent. Defaults to 0. */
  flatTaxPercent?: number;
}

export interface TakeHomeResult {
  gross: number;
  totalDeductions: number;
  net: number;
  monthlyNet: number;
  effectiveRatePercent: number;
  breakdown: { label: string; amount: number }[];
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function convertPay(input: PayConversionInput): PayConversion {
  const hoursPerWeek = input.hoursPerWeek ?? 40;
  const weeksPerYear = input.weeksPerYear ?? 52;

  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    throw new RangeError("Amount must be greater than zero.");
  }
  if (!Number.isFinite(hoursPerWeek) || hoursPerWeek <= 0 || hoursPerWeek > 168) {
    throw new RangeError("Hours per week must be above 0 and at most 168.");
  }
  if (!Number.isFinite(weeksPerYear) || weeksPerYear <= 0 || weeksPerYear > 52) {
    throw new RangeError("Weeks per year must be above 0 and at most 52.");
  }

  let yearly: number;
  switch (input.period) {
    case "hourly":
      yearly = input.amount * hoursPerWeek * weeksPerYear;
      break;
    case "daily":
      // A day is one fifth of a working week.
      yearly = input.amount * 5 * weeksPerYear;
      break;
    case "weekly":
      yearly = input.amount * weeksPerYear;
      break;
    case "monthly":
      yearly = input.amount * 12;
      break;
    case "yearly":
      yearly = input.amount;
      break;
    default:
      throw new RangeError(`Unknown pay period: ${String(input.period)}`);
  }

  const weekly = yearly / weeksPerYear;
  return {
    hourly: round2(yearly / (hoursPerWeek * weeksPerYear)),
    daily: round2(weekly / 5),
    weekly: round2(weekly),
    monthly: round2(yearly / 12),
    yearly: round2(yearly),
    hoursPerWeek,
    weeksPerYear,
  };
}

interface Band {
  upTo: number | null;
  ratePercent: number;
}

function progressive(amount: number, bands: Band[]): number {
  let tax = 0;
  let lower = 0;
  for (const band of bands) {
    const upper = band.upTo ?? Number.POSITIVE_INFINITY;
    if (amount <= lower) break;
    const slice = Math.min(amount, upper) - lower;
    tax += (slice * band.ratePercent) / 100;
    lower = upper;
  }
  return round2(tax);
}

// Compact copies of the estimator tables, kept here on purpose so
// this module does not depend on the income tax calculator module.
// US federal 2025, single filer, standard deduction 15,000.
const US_BRACKETS: Band[] = [
  { upTo: 11_925, ratePercent: 10 },
  { upTo: 48_475, ratePercent: 12 },
  { upTo: 103_350, ratePercent: 22 },
  { upTo: 197_300, ratePercent: 24 },
  { upTo: 250_525, ratePercent: 32 },
  { upTo: 626_350, ratePercent: 35 },
  { upTo: null, ratePercent: 37 },
];

// UK 2025-26, bands on taxable income after the personal allowance.
const UK_BANDS: Band[] = [
  { upTo: 37_700, ratePercent: 20 },
  { upTo: 112_570, ratePercent: 40 },
  { upTo: null, ratePercent: 45 },
];

function usTakeHome(gross: number, stateRatePercent: number): TakeHomeResult {
  const taxable = Math.max(0, gross - 15_000);
  const federal = progressive(taxable, US_BRACKETS);
  const socialSecurity = round2((Math.min(gross, 176_100) * 6.2) / 100);
  const medicare = round2((gross * 1.45) / 100);
  const state = round2((gross * stateRatePercent) / 100);
  const totalDeductions = round2(federal + socialSecurity + medicare + state);
  const breakdown = [
    { label: "Federal income tax", amount: federal },
    { label: "Social Security (6.2 percent)", amount: socialSecurity },
    { label: "Medicare (1.45 percent)", amount: medicare },
  ];
  if (state > 0) breakdown.push({ label: "State tax (flat estimate)", amount: state });
  return finish(gross, totalDeductions, breakdown);
}

function ukTakeHome(gross: number): TakeHomeResult {
  let allowance = 12_570;
  if (gross > 100_000) {
    allowance = Math.max(0, 12_570 - Math.floor((gross - 100_000) / 2));
  }
  const taxable = Math.max(0, gross - allowance);
  const incomeTax = progressive(taxable, UK_BANDS);
  let nationalInsurance = 0;
  if (gross > 12_570) {
    nationalInsurance += ((Math.min(gross, 50_270) - 12_570) * 8) / 100;
    if (gross > 50_270) nationalInsurance += ((gross - 50_270) * 2) / 100;
  }
  nationalInsurance = round2(nationalInsurance);
  const totalDeductions = round2(incomeTax + nationalInsurance);
  return finish(gross, totalDeductions, [
    { label: "Income tax", amount: incomeTax },
    { label: "National Insurance", amount: nationalInsurance },
  ]);
}

function finish(
  gross: number,
  totalDeductions: number,
  breakdown: { label: string; amount: number }[],
): TakeHomeResult {
  const net = round2(gross - totalDeductions);
  return {
    gross,
    totalDeductions,
    net,
    monthlyNet: round2(net / 12),
    effectiveRatePercent: gross > 0 ? Math.round((totalDeductions / gross) * 10000) / 100 : 0,
    breakdown,
  };
}

export function estimateTakeHome(input: TakeHomeInput): TakeHomeResult {
  if (!Number.isFinite(input.grossYearly) || input.grossYearly < 0) {
    throw new RangeError("Gross yearly pay must be zero or greater.");
  }
  const stateRatePercent = input.stateRatePercent ?? 0;
  const flatTaxPercent = input.flatTaxPercent ?? 0;
  if (!Number.isFinite(stateRatePercent) || stateRatePercent < 0 || stateRatePercent > 100) {
    throw new RangeError("State tax rate must be between 0 and 100 percent.");
  }
  if (!Number.isFinite(flatTaxPercent) || flatTaxPercent < 0 || flatTaxPercent > 100) {
    throw new RangeError("Flat tax rate must be between 0 and 100 percent.");
  }

  if (input.country === "us") return usTakeHome(input.grossYearly, stateRatePercent);
  if (input.country === "uk") return ukTakeHome(input.grossYearly);
  if (input.country === "custom") {
    const tax = round2((input.grossYearly * flatTaxPercent) / 100);
    return finish(input.grossYearly, tax, [{ label: "Flat rate tax", amount: tax }]);
  }
  throw new RangeError(`Unknown country: ${String(input.country)}`);
}
