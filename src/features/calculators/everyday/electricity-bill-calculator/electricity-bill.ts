/**
 * Electricity bill calculator logic, pure and framework free.
 *
 * Flat mode: energy charge is units times the rate per unit, the fixed
 * charge is added, and tax is a percentage of that subtotal.
 * Tiered mode: units are priced progressively, so the first band of
 * units is charged at the first rate, the next band at the next rate,
 * and everything above the last limit at the final rate.
 * Appliance mode: monthly energy in kWh is watts divided by 1000,
 * times hours per day, times days per month.
 */

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function round4(value: number): number {
  return Math.round((value + Number.EPSILON) * 10000) / 10000;
}

function checkNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be zero or greater.`);
  }
}

export interface BillFromUnitsInput {
  /** Electricity used, in kilowatt hours. Must be zero or greater. */
  unitsKwh: number;
  /** Price per unit (per kWh). Must be zero or greater. */
  ratePerUnit: number;
  /** Standing or meter charge added to every bill. Defaults to zero. */
  fixedCharge?: number;
  /** Tax or VAT percentage applied to the subtotal. Defaults to zero. */
  taxPercent?: number;
}

export interface BillResult {
  unitsKwh: number;
  energyCharge: number;
  fixedCharge: number;
  subtotal: number;
  taxAmount: number;
  total: number;
}

export function billFromUnits(input: BillFromUnitsInput): BillResult {
  const fixedCharge = input.fixedCharge ?? 0;
  const taxPercent = input.taxPercent ?? 0;
  checkNonNegative(input.unitsKwh, "Units");
  checkNonNegative(input.ratePerUnit, "Rate per unit");
  checkNonNegative(fixedCharge, "Fixed charge");
  checkNonNegative(taxPercent, "Tax percent");

  const energyCharge = round2(input.unitsKwh * input.ratePerUnit);
  const subtotal = round2(energyCharge + fixedCharge);
  const taxAmount = round2((subtotal * taxPercent) / 100);
  return {
    unitsKwh: input.unitsKwh,
    energyCharge,
    fixedCharge,
    subtotal,
    taxAmount,
    total: round2(subtotal + taxAmount),
  };
}

export interface Tier {
  /** Upper limit of this band in units, or null for the open ended final band. */
  upTo: number | null;
  /** Price per unit inside this band. Must be zero or greater. */
  rate: number;
}

export interface TierBreakdownRow {
  units: number;
  rate: number;
  amount: number;
}

export interface TieredBillResult extends BillResult {
  breakdown: TierBreakdownRow[];
}

export function billFromTiers(
  unitsKwh: number,
  tiers: readonly Tier[],
  fixedCharge = 0,
  taxPercent = 0,
): TieredBillResult {
  checkNonNegative(unitsKwh, "Units");
  checkNonNegative(fixedCharge, "Fixed charge");
  checkNonNegative(taxPercent, "Tax percent");
  if (tiers.length === 0) {
    throw new RangeError("Add at least one pricing tier.");
  }
  let previousLimit = 0;
  tiers.forEach((tier, index) => {
    checkNonNegative(tier.rate, "Tier rate");
    if (tier.upTo === null) {
      if (index !== tiers.length - 1) {
        throw new RangeError("Only the last tier can be open ended.");
      }
    } else {
      if (!Number.isFinite(tier.upTo) || tier.upTo <= previousLimit) {
        throw new RangeError("Tier limits must be in ascending order.");
      }
      previousLimit = tier.upTo;
    }
  });

  const breakdown: TierBreakdownRow[] = [];
  let remaining = unitsKwh;
  let lowerBound = 0;
  let energyCharge = 0;
  for (const tier of tiers) {
    if (remaining <= 0) break;
    const bandWidth = tier.upTo === null ? remaining : tier.upTo - lowerBound;
    const unitsInBand = Math.min(remaining, bandWidth);
    const amount = round2(unitsInBand * tier.rate);
    breakdown.push({ units: unitsInBand, rate: tier.rate, amount });
    energyCharge += amount;
    remaining -= unitsInBand;
    if (tier.upTo !== null) lowerBound = tier.upTo;
  }
  if (remaining > 0) {
    throw new RangeError("The last tier must be open ended so every unit has a price.");
  }

  const roundedEnergy = round2(energyCharge);
  const subtotal = round2(roundedEnergy + fixedCharge);
  const taxAmount = round2((subtotal * taxPercent) / 100);
  return {
    unitsKwh,
    energyCharge: roundedEnergy,
    fixedCharge,
    subtotal,
    taxAmount,
    total: round2(subtotal + taxAmount),
    breakdown,
  };
}

export interface ApplianceInput {
  /** Appliance power draw in watts. Must be greater than zero. */
  watts: number;
  /** Hours used per day, from 0 to 24. */
  hoursPerDay: number;
  /** Days used per month, from 1 to 31. */
  daysPerMonth: number;
  /** Price per unit (per kWh). Must be zero or greater. */
  ratePerUnit: number;
}

export interface ApplianceResult {
  monthlyKwh: number;
  monthlyCost: number;
}

export function applianceCost(input: ApplianceInput): ApplianceResult {
  if (!Number.isFinite(input.watts) || input.watts <= 0) {
    throw new RangeError("Watts must be greater than zero.");
  }
  if (!Number.isFinite(input.hoursPerDay) || input.hoursPerDay < 0 || input.hoursPerDay > 24) {
    throw new RangeError("Hours per day must be between 0 and 24.");
  }
  if (!Number.isFinite(input.daysPerMonth) || input.daysPerMonth < 1 || input.daysPerMonth > 31) {
    throw new RangeError("Days per month must be between 1 and 31.");
  }
  checkNonNegative(input.ratePerUnit, "Rate per unit");

  // Monthly energy: watts / 1000 gives kilowatts, times hours per day, times days.
  const monthlyKwh = (input.watts / 1000) * input.hoursPerDay * input.daysPerMonth;
  return {
    monthlyKwh: round4(monthlyKwh),
    monthlyCost: round2(monthlyKwh * input.ratePerUnit),
  };
}
