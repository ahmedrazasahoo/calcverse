/**
 * TDEE logic, pure and framework free.
 *
 * Method: Mifflin St Jeor equation for BMR, multiplied by an activity
 * factor to give Total Daily Energy Expenditure.
 */

export type Sex = "male" | "female";

export interface ActivityLevel {
  value: number;
  label: string;
}

/** Standard activity multipliers applied to BMR. */
export const ACTIVITY_LEVELS: readonly ActivityLevel[] = [
  { value: 1.2, label: "Sedentary (desk job, little exercise)" },
  { value: 1.375, label: "Lightly active (exercise 1 to 3 days a week)" },
  { value: 1.55, label: "Moderately active (exercise 3 to 5 days a week)" },
  { value: 1.725, label: "Very active (exercise 6 to 7 days a week)" },
  { value: 1.9, label: "Athlete (physical job or twice daily training)" },
];

/** Mifflin St Jeor constants. */
export const MIFFLIN = {
  weightFactor: 10,
  heightFactor: 6.25,
  ageFactor: 5,
  maleConstant: 5,
  femaleConstant: -161,
} as const;

/** Daily calorie adjustment used for the lose and gain targets. */
export const DAILY_CALORIE_STEP = 500;
/** Never suggest a target below this many calories. */
export const MIN_SAFE_CALORIES = 1200;

/** Unit conversions. */
export const KG_PER_LB = 0.45359237;
export const CM_PER_INCH = 2.54;
export const INCHES_PER_FOOT = 12;

/** Balanced macro distribution used for the maintenance split. */
export const MACRO_SHARES = { protein: 0.3, carbs: 0.4, fat: 0.3 } as const;
export const KCAL_PER_GRAM = { protein: 4, carbs: 4, fat: 9 } as const;

export interface BodyStats {
  sex: Sex;
  ageYears: number;
  weightKg: number;
  heightCm: number;
}

const AGE_RANGE = { min: 1, max: 120 } as const;
const WEIGHT_KG_RANGE = { min: 1, max: 500 } as const;
const HEIGHT_CM_RANGE = { min: 50, max: 300 } as const;

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

/** Basal metabolic rate in kcal per day, or null when the input is out of range. */
export function calculateBmr(stats: BodyStats): number | null {
  if (!inRange(stats.ageYears, AGE_RANGE)) return null;
  if (!inRange(stats.weightKg, WEIGHT_KG_RANGE)) return null;
  if (!inRange(stats.heightCm, HEIGHT_CM_RANGE)) return null;
  const base =
    MIFFLIN.weightFactor * stats.weightKg +
    MIFFLIN.heightFactor * stats.heightCm -
    MIFFLIN.ageFactor * stats.ageYears;
  return base + (stats.sex === "male" ? MIFFLIN.maleConstant : MIFFLIN.femaleConstant);
}

export function calculateTdee(bmr: number, activityMultiplier: number): number {
  return bmr * activityMultiplier;
}

export interface CalorieTargets {
  maintain: number;
  lose: number;
  gain: number;
}

export function calorieTargets(tdee: number): CalorieTargets {
  return {
    maintain: tdee,
    lose: Math.max(tdee - DAILY_CALORIE_STEP, MIN_SAFE_CALORIES),
    gain: tdee + DAILY_CALORIE_STEP,
  };
}

export interface MacroSplit {
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export function macroSplit(calories: number): MacroSplit {
  return {
    proteinGrams: (calories * MACRO_SHARES.protein) / KCAL_PER_GRAM.protein,
    carbsGrams: (calories * MACRO_SHARES.carbs) / KCAL_PER_GRAM.carbs,
    fatGrams: (calories * MACRO_SHARES.fat) / KCAL_PER_GRAM.fat,
  };
}

export function poundsToKg(pounds: number): number {
  return pounds * KG_PER_LB;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * INCHES_PER_FOOT + inches) * CM_PER_INCH;
}
