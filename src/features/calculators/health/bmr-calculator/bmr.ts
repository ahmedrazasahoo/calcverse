/**
 * BMR logic, pure and framework free.
 *
 * Basal metabolic rate is the energy a body uses at complete rest.
 * Four published equations are supported:
 *  - Mifflin St Jeor (1990), the most accurate for most adults and the
 *    equation recommended by the Academy of Nutrition and Dietetics.
 *  - Harris Benedict original (1919).
 *  - Harris Benedict revised by Roza and Shizgal (1984).
 *  - Katch McArdle, which uses lean body mass instead of total weight
 *    and needs a body fat percentage.
 */

export type Sex = "male" | "female";

export type BmrFormula = "mifflin" | "harris-original" | "harris-revised";

export interface BodyStats {
  sex: Sex;
  ageYears: number;
  weightKg: number;
  heightCm: number;
}

const AGE_RANGE = { min: 1, max: 120 } as const;
const WEIGHT_KG_RANGE = { min: 1, max: 500 } as const;
const HEIGHT_CM_RANGE = { min: 50, max: 300 } as const;
const BODY_FAT_RANGE = { min: 2, max: 70 } as const;

/** Mifflin St Jeor constants. */
export const MIFFLIN = {
  weightFactor: 10,
  heightFactor: 6.25,
  ageFactor: 5,
  maleConstant: 5,
  femaleConstant: -161,
} as const;

interface LinearCoefficients {
  base: number;
  weight: number;
  height: number;
  age: number;
}

/** Harris Benedict, as published in 1919. */
export const HARRIS_ORIGINAL: Record<Sex, LinearCoefficients> = {
  male: { base: 66.5, weight: 13.75, height: 5.003, age: 6.75 },
  female: { base: 655.1, weight: 9.563, height: 1.85, age: 4.676 },
};

/** Harris Benedict as revised by Roza and Shizgal in 1984. */
export const HARRIS_REVISED: Record<Sex, LinearCoefficients> = {
  male: { base: 88.362, weight: 13.397, height: 4.799, age: 5.677 },
  female: { base: 447.593, weight: 9.247, height: 3.098, age: 4.33 },
};

/** Katch McArdle constants: BMR = base + factor * lean mass in kg. */
export const KATCH_MCARDLE = { base: 370, leanMassFactor: 21.6 } as const;

export const KG_PER_LB = 0.45359237;
export const CM_PER_INCH = 2.54;
export const INCHES_PER_FOOT = 12;

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

function validStats(stats: BodyStats): boolean {
  return (
    inRange(stats.ageYears, AGE_RANGE) &&
    inRange(stats.weightKg, WEIGHT_KG_RANGE) &&
    inRange(stats.heightCm, HEIGHT_CM_RANGE)
  );
}

function linearBmr(stats: BodyStats, c: LinearCoefficients): number {
  return c.base + c.weight * stats.weightKg + c.height * stats.heightCm - c.age * stats.ageYears;
}

/**
 * BMR in kcal per day using the chosen equation,
 * or null when any input is out of range.
 */
export function calculateBmr(stats: BodyStats, formula: BmrFormula = "mifflin"): number | null {
  if (!validStats(stats)) return null;
  if (formula === "harris-original") return linearBmr(stats, HARRIS_ORIGINAL[stats.sex]);
  if (formula === "harris-revised") return linearBmr(stats, HARRIS_REVISED[stats.sex]);
  const base =
    MIFFLIN.weightFactor * stats.weightKg +
    MIFFLIN.heightFactor * stats.heightCm -
    MIFFLIN.ageFactor * stats.ageYears;
  return base + (stats.sex === "male" ? MIFFLIN.maleConstant : MIFFLIN.femaleConstant);
}

/** Katch McArdle BMR from total weight and body fat percentage. */
export function katchMcArdleBmr(weightKg: number, bodyFatPercent: number): number | null {
  if (!inRange(weightKg, WEIGHT_KG_RANGE)) return null;
  if (!inRange(bodyFatPercent, BODY_FAT_RANGE)) return null;
  const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
  return KATCH_MCARDLE.base + KATCH_MCARDLE.leanMassFactor * leanMassKg;
}

export function poundsToKg(pounds: number): number {
  return pounds * KG_PER_LB;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * INCHES_PER_FOOT + inches) * CM_PER_INCH;
}
