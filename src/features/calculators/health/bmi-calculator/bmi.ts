/**
 * BMI logic, pure and framework free.
 *
 * Method: body mass index is weight in kilograms divided by height in
 * metres squared. Adult categories follow the World Health Organization
 * bands. BMI is a screening figure for adults; it does not apply to
 * children, pregnancy or elite athletes.
 */

export const KG_PER_LB = 0.45359237;
export const CM_PER_INCH = 2.54;
export const INCHES_PER_FOOT = 12;

/** Healthy BMI band edges used for the healthy weight range. */
export const BMI_HEALTHY_MIN = 18.5;
export const BMI_HEALTHY_MAX = 24.9;

const WEIGHT_KG_RANGE = { min: 1, max: 500 } as const;
const HEIGHT_CM_RANGE = { min: 50, max: 300 } as const;

export type BmiCategoryKey =
  | "severe-thinness"
  | "moderate-thinness"
  | "mild-thinness"
  | "healthy"
  | "overweight"
  | "obese-class-1"
  | "obese-class-2"
  | "obese-class-3";

export interface BmiCategory {
  key: BmiCategoryKey;
  label: string;
  /** Human readable band, for example "18.5 to 24.9". */
  rangeLabel: string;
}

/** WHO adult bands, ordered from lowest to highest. upperBelow is exclusive. */
const BMI_BANDS: readonly { upperBelow: number; category: BmiCategory }[] = [
  { upperBelow: 16, category: { key: "severe-thinness", label: "Severely underweight", rangeLabel: "Below 16" } },
  { upperBelow: 17, category: { key: "moderate-thinness", label: "Moderately underweight", rangeLabel: "16 to 16.9" } },
  { upperBelow: 18.5, category: { key: "mild-thinness", label: "Mildly underweight", rangeLabel: "17 to 18.4" } },
  { upperBelow: 25, category: { key: "healthy", label: "Healthy weight", rangeLabel: "18.5 to 24.9" } },
  { upperBelow: 30, category: { key: "overweight", label: "Overweight", rangeLabel: "25 to 29.9" } },
  { upperBelow: 35, category: { key: "obese-class-1", label: "Obese (class I)", rangeLabel: "30 to 34.9" } },
  { upperBelow: 40, category: { key: "obese-class-2", label: "Obese (class II)", rangeLabel: "35 to 39.9" } },
  { upperBelow: Number.POSITIVE_INFINITY, category: { key: "obese-class-3", label: "Obese (class III)", rangeLabel: "40 and above" } },
];

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

/** Body mass index, or null when weight or height is outside a sane range. */
export function calculateBmi(weightKg: number, heightCm: number): number | null {
  if (!inRange(weightKg, WEIGHT_KG_RANGE)) return null;
  if (!inRange(heightCm, HEIGHT_CM_RANGE)) return null;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/** WHO category for a BMI value, or null when the value is not usable. */
export function classifyBmi(bmi: number): BmiCategory | null {
  if (!Number.isFinite(bmi) || bmi <= 0) return null;
  for (const band of BMI_BANDS) {
    if (bmi < band.upperBelow) return band.category;
  }
  return null;
}

export interface WeightRangeKg {
  minKg: number;
  maxKg: number;
}

/** Weight range that keeps BMI inside the healthy band for a height. */
export function healthyWeightRangeKg(heightCm: number): WeightRangeKg | null {
  if (!inRange(heightCm, HEIGHT_CM_RANGE)) return null;
  const heightM = heightCm / 100;
  const area = heightM * heightM;
  return { minKg: BMI_HEALTHY_MIN * area, maxKg: BMI_HEALTHY_MAX * area };
}

export function poundsToKg(pounds: number): number {
  return pounds * KG_PER_LB;
}

export function kgToPounds(kg: number): number {
  return kg / KG_PER_LB;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * INCHES_PER_FOOT + inches) * CM_PER_INCH;
}
