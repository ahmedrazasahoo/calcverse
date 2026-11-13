/**
 * Calorie needs logic, pure and framework free.
 *
 * Method: Mifflin St Jeor gives BMR, an activity multiplier gives
 * maintenance calories (TDEE), and fixed daily steps above or below
 * maintenance give weight change targets. A deficit or surplus of
 * about 7,700 kcal corresponds to roughly one kilogram of body weight,
 * which is used for the weekly change estimate. No target is ever set
 * below the safe floor.
 */

export type Sex = "male" | "female";

export interface BodyStats {
  sex: Sex;
  ageYears: number;
  weightKg: number;
  heightCm: number;
}

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

/** Never suggest a daily target below this many calories. */
export const MIN_SAFE_CALORIES = 1200;
/** Energy roughly equal to one kilogram of body weight change. */
export const KCAL_PER_KG_BODY_WEIGHT = 7700;
export const DAYS_PER_WEEK = 7;

export const KG_PER_LB = 0.45359237;
export const CM_PER_INCH = 2.54;
export const INCHES_PER_FOOT = 12;

const AGE_RANGE = { min: 1, max: 120 } as const;
const WEIGHT_KG_RANGE = { min: 1, max: 500 } as const;
const HEIGHT_CM_RANGE = { min: 50, max: 300 } as const;
const ACTIVITY_RANGE = { min: 1, max: 2.5 } as const;

export type GoalKey = "fast-lose" | "lose" | "mild-lose" | "maintain" | "mild-gain" | "gain";

export interface CalorieGoal {
  key: GoalKey;
  label: string;
  /** Signed daily adjustment against maintenance calories. */
  adjustmentPerDay: number;
  /** Suggested daily intake in kcal, never below the safe floor. */
  calories: number;
  /** Expected body weight change per week in kg, negative when losing. */
  weeklyChangeKg: number;
}

const GOAL_STEPS: readonly { key: GoalKey; label: string; adjustmentPerDay: number }[] = [
  { key: "fast-lose", label: "Lose weight fast", adjustmentPerDay: -1000 },
  { key: "lose", label: "Lose weight", adjustmentPerDay: -500 },
  { key: "mild-lose", label: "Lose weight slowly", adjustmentPerDay: -250 },
  { key: "maintain", label: "Maintain weight", adjustmentPerDay: 0 },
  { key: "mild-gain", label: "Gain weight slowly", adjustmentPerDay: 250 },
  { key: "gain", label: "Gain weight", adjustmentPerDay: 500 },
];

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

/** Expected weekly weight change in kg for a daily calorie adjustment. */
export function weeklyChangeKg(dailyAdjustment: number): number {
  return (dailyAdjustment * DAYS_PER_WEEK) / KCAL_PER_KG_BODY_WEIGHT;
}

export interface CaloriePlan {
  bmr: number;
  maintenance: number;
  goals: CalorieGoal[];
}

/**
 * Full calorie plan for a person, or null when any input is out of range.
 * Losing targets are clamped at the safe floor; when the floor binds,
 * the weekly change estimate is recomputed from the real adjustment.
 */
export function caloriePlan(stats: BodyStats, activityMultiplier: number): CaloriePlan | null {
  if (!inRange(stats.ageYears, AGE_RANGE)) return null;
  if (!inRange(stats.weightKg, WEIGHT_KG_RANGE)) return null;
  if (!inRange(stats.heightCm, HEIGHT_CM_RANGE)) return null;
  if (!inRange(activityMultiplier, ACTIVITY_RANGE)) return null;

  const base =
    MIFFLIN.weightFactor * stats.weightKg +
    MIFFLIN.heightFactor * stats.heightCm -
    MIFFLIN.ageFactor * stats.ageYears;
  const bmr = base + (stats.sex === "male" ? MIFFLIN.maleConstant : MIFFLIN.femaleConstant);
  const maintenance = bmr * activityMultiplier;

  const goals = GOAL_STEPS.map((step) => {
    const raw = maintenance + step.adjustmentPerDay;
    const calories = Math.max(raw, MIN_SAFE_CALORIES);
    const realAdjustment = calories - maintenance;
    return {
      key: step.key,
      label: step.label,
      adjustmentPerDay: step.adjustmentPerDay,
      calories,
      weeklyChangeKg: weeklyChangeKg(realAdjustment),
    };
  });

  return { bmr, maintenance, goals };
}

export function poundsToKg(pounds: number): number {
  return pounds * KG_PER_LB;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * INCHES_PER_FOOT + inches) * CM_PER_INCH;
}
