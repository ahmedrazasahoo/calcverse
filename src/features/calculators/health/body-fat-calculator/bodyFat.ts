/**
 * Body fat logic, pure and framework free.
 *
 * Method: the US Navy circumference method (Hodgdon and Beckett, 1984).
 * It estimates body fat percentage from height and tape measurements.
 * The published equations work in inches, so centimetre inputs are
 * converted first and the standard inch constants are applied.
 * Categories follow the American Council on Exercise (ACE) bands.
 */

export type Sex = "male" | "female";

export const CM_PER_INCH = 2.54;

const HEIGHT_CM_RANGE = { min: 50, max: 300 } as const;
const CIRCUMFERENCE_CM_RANGE = { min: 10, max: 300 } as const;
const WEIGHT_KG_RANGE = { min: 1, max: 500 } as const;
/** Results outside this band are treated as bad measurements, not answers. */
const RESULT_PERCENT_RANGE = { min: 1, max: 80 } as const;

/** Navy equation constants for men: waist and neck at the abdomen and throat. */
export const NAVY_MEN = { differenceFactor: 86.01, heightFactor: 70.041, constant: 36.76 } as const;
/** Navy equation constants for women: waist plus hip minus neck. */
export const NAVY_WOMEN = { combinedFactor: 163.205, heightFactor: 97.684, constant: 78.387 } as const;

export interface BodyFatMeasurements {
  heightCm: number;
  neckCm: number;
  waistCm: number;
  /** Required for women, ignored for men. */
  hipCm?: number;
}

export type BodyFatCategoryKey = "below-essential" | "essential" | "athletes" | "fitness" | "average" | "obese";

export interface BodyFatCategory {
  key: BodyFatCategoryKey;
  label: string;
  rangeLabel: string;
}

/** ACE bands per sex, ordered lowest to highest. upperBelow is exclusive. */
const ACE_BANDS: Record<Sex, readonly { upperBelow: number; category: BodyFatCategory }[]> = {
  male: [
    { upperBelow: 2, category: { key: "below-essential", label: "Below essential fat", rangeLabel: "Below 2 percent" } },
    { upperBelow: 6, category: { key: "essential", label: "Essential fat", rangeLabel: "2 to 5 percent" } },
    { upperBelow: 14, category: { key: "athletes", label: "Athletes", rangeLabel: "6 to 13 percent" } },
    { upperBelow: 18, category: { key: "fitness", label: "Fitness", rangeLabel: "14 to 17 percent" } },
    { upperBelow: 25, category: { key: "average", label: "Average", rangeLabel: "18 to 24 percent" } },
    { upperBelow: Number.POSITIVE_INFINITY, category: { key: "obese", label: "Obese", rangeLabel: "25 percent and above" } },
  ],
  female: [
    { upperBelow: 10, category: { key: "below-essential", label: "Below essential fat", rangeLabel: "Below 10 percent" } },
    { upperBelow: 14, category: { key: "essential", label: "Essential fat", rangeLabel: "10 to 13 percent" } },
    { upperBelow: 21, category: { key: "athletes", label: "Athletes", rangeLabel: "14 to 20 percent" } },
    { upperBelow: 25, category: { key: "fitness", label: "Fitness", rangeLabel: "21 to 24 percent" } },
    { upperBelow: 32, category: { key: "average", label: "Average", rangeLabel: "25 to 31 percent" } },
    { upperBelow: Number.POSITIVE_INFINITY, category: { key: "obese", label: "Obese", rangeLabel: "32 percent and above" } },
  ],
};

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

function cmToInches(cm: number): number {
  return cm / CM_PER_INCH;
}

/**
 * Estimated body fat percentage from the Navy method,
 * or null when measurements are missing, out of range, or impossible
 * (for example a neck wider than the waist on a man).
 */
export function bodyFatPercent(sex: Sex, m: BodyFatMeasurements): number | null {
  if (!inRange(m.heightCm, HEIGHT_CM_RANGE)) return null;
  if (!inRange(m.neckCm, CIRCUMFERENCE_CM_RANGE)) return null;
  if (!inRange(m.waistCm, CIRCUMFERENCE_CM_RANGE)) return null;

  const heightIn = cmToInches(m.heightCm);
  const neckIn = cmToInches(m.neckCm);
  const waistIn = cmToInches(m.waistCm);

  let percent: number;
  if (sex === "male") {
    const difference = waistIn - neckIn;
    if (difference <= 0) return null;
    percent =
      NAVY_MEN.differenceFactor * Math.log10(difference) -
      NAVY_MEN.heightFactor * Math.log10(heightIn) +
      NAVY_MEN.constant;
  } else {
    if (m.hipCm === undefined || !inRange(m.hipCm, CIRCUMFERENCE_CM_RANGE)) return null;
    const combined = waistIn + cmToInches(m.hipCm) - neckIn;
    if (combined <= 0) return null;
    percent =
      NAVY_WOMEN.combinedFactor * Math.log10(combined) -
      NAVY_WOMEN.heightFactor * Math.log10(heightIn) -
      NAVY_WOMEN.constant;
  }

  if (!inRange(percent, RESULT_PERCENT_RANGE)) return null;
  return percent;
}

/** ACE category for a body fat percentage, or null for unusable values. */
export function classifyBodyFat(sex: Sex, percent: number): BodyFatCategory | null {
  if (!Number.isFinite(percent) || percent <= 0) return null;
  for (const band of ACE_BANDS[sex]) {
    if (percent < band.upperBelow) return band.category;
  }
  return null;
}

export interface BodyComposition {
  fatMassKg: number;
  leanMassKg: number;
}

/** Splits total weight into fat mass and lean mass for a given percentage. */
export function bodyComposition(weightKg: number, percent: number): BodyComposition | null {
  if (!inRange(weightKg, WEIGHT_KG_RANGE)) return null;
  if (!inRange(percent, RESULT_PERCENT_RANGE)) return null;
  const fatMassKg = (weightKg * percent) / 100;
  return { fatMassKg, leanMassKg: weightKg - fatMassKg };
}
