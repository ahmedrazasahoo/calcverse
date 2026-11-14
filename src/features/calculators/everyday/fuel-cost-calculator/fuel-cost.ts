/**
 * Fuel cost calculator logic, pure and framework free.
 *
 * Everything is normalised to litres per 100 km internally:
 *   L/100km = 100 / kmPerLitre
 *   L/100km = 235.215 / mpg (US)
 *   L/100km = 282.481 / mpg (UK)
 * Fuel used is distance in km times L/100km divided by 100, and the
 * price is normalised to a price per litre before costing.
 */

export type DistanceUnit = "km" | "miles";
export type EfficiencyUnit = "kmPerLitre" | "litresPer100Km" | "mpgUS" | "mpgUK";
export type PriceUnit = "perLitre" | "perGallonUS" | "perGallonUK";

export const KM_PER_MILE = 1.60934;
export const LITRES_PER_GALLON_US = 3.78541;
export const LITRES_PER_GALLON_UK = 4.54609;

export interface FuelCostInput {
  /** Trip distance, expressed in distanceUnit. Must be greater than zero. */
  distance: number;
  distanceUnit: DistanceUnit;
  /** Vehicle efficiency value, expressed in efficiencyUnit. Must be greater than zero. */
  efficiency: number;
  efficiencyUnit: EfficiencyUnit;
  /** Fuel price, expressed in priceUnit. Must be greater than zero. */
  fuelPrice: number;
  priceUnit: PriceUnit;
}

export interface FuelCostResult {
  distanceKm: number;
  /** Efficiency normalised to litres per 100 km. */
  litresPer100Km: number;
  fuelNeededLitres: number;
  totalCost: number;
  /** Total cost divided by the distance in the unit the user chose. */
  costPerDistanceUnit: number;
  /** Price normalised to a price per litre, in the chosen currency. */
  pricePerLitre: number;
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function toLitresPer100Km(efficiency: number, unit: EfficiencyUnit): number {
  switch (unit) {
    case "kmPerLitre":
      return 100 / efficiency;
    case "litresPer100Km":
      return efficiency;
    case "mpgUS":
      return 235.215 / efficiency;
    case "mpgUK":
      return 282.481 / efficiency;
  }
}

export function toPricePerLitre(fuelPrice: number, unit: PriceUnit): number {
  switch (unit) {
    case "perLitre":
      return fuelPrice;
    case "perGallonUS":
      return fuelPrice / LITRES_PER_GALLON_US;
    case "perGallonUK":
      return fuelPrice / LITRES_PER_GALLON_UK;
  }
}

export function calculateFuelCost(input: FuelCostInput): FuelCostResult {
  if (!Number.isFinite(input.distance) || input.distance <= 0) {
    throw new RangeError("Distance must be greater than zero.");
  }
  if (!Number.isFinite(input.efficiency) || input.efficiency <= 0) {
    throw new RangeError("Efficiency must be greater than zero.");
  }
  if (!Number.isFinite(input.fuelPrice) || input.fuelPrice <= 0) {
    throw new RangeError("Fuel price must be greater than zero.");
  }

  const distanceKm =
    input.distanceUnit === "miles" ? input.distance * KM_PER_MILE : input.distance;
  const litresPer100Km = toLitresPer100Km(input.efficiency, input.efficiencyUnit);
  const pricePerLitre = toPricePerLitre(input.fuelPrice, input.priceUnit);

  const fuelNeededLitres = (distanceKm * litresPer100Km) / 100;
  const totalCost = fuelNeededLitres * pricePerLitre;

  return {
    distanceKm: round(distanceKm, 4),
    litresPer100Km: round(litresPer100Km, 4),
    fuelNeededLitres: round(fuelNeededLitres, 4),
    totalCost: round(totalCost, 2),
    costPerDistanceUnit: round(totalCost / input.distance, 4),
    pricePerLitre: round(pricePerLitre, 4),
  };
}
