/**
 * Ideal weight logic, pure and framework free.
 *
 * Four classic formulas estimate a healthy weight for a height. Each
 * starts from a base weight at 5 feet (60 inches) and adds a fixed
 * amount per extra inch. The BMI healthy range (18.5 to 24.9) for the
 * same height is returned alongside, because no single formula fits
 * every body.
 */

export type Sex = "male" | "female";

export const CM_PER_INCH = 2.54;
export const INCHES_PER_FOOT = 12;
export const BASE_HEIGHT_INCHES = 60; // 5 feet, the base of every formula below
export const BMI_HEALTHY_MIN = 18.5;
export const BMI_HEALTHY_MAX = 24.9;
export const KG_PER_LB = 0.45359237;

const HEIGHT_CM_RANGE = { min: 100, max: 250 } as const;

interface FormulaCoefficients {
  maleBaseKg: number;
  femaleBaseKg: number;
  malePerInchKg: number;
  femalePerInchKg: number;
}

/** Devine (1974), the most widely used in medicine. */
export const DEVINE: FormulaCoefficients = {
  maleBaseKg: 50,
  femaleBaseKg: 45.5,
  malePerInchKg: 2.3,
  femalePerInchKg: 2.3,
};

/** Robinson (1983). */
export const ROBINSON: FormulaCoefficients = {
  maleBaseKg: 52,
  femaleBaseKg: 49,
  malePerInchKg: 1.9,
  femalePerInchKg: 1.7,
};

/** Miller (1983). */
export const MILLER: FormulaCoefficients = {
  maleBaseKg: 56.2,
  femaleBaseKg: 53.1,
  malePerInchKg: 1.41,
  femalePerInchKg: 1.36,
};

/** Hamwi (1964). */
export const HAMWI: FormulaCoefficients = {
  maleBaseKg: 48,
  femaleBaseKg: 45.5,
  malePerInchKg: 2.7,
  femalePerInchKg: 2.2,
};

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

function applyFormula(heightInches: number, sex: Sex, c: FormulaCoefficients): number {
  const overBase = heightInches - BASE_HEIGHT_INCHES;
  return sex === "male"
    ? c.maleBaseKg + c.malePerInchKg * overBase
    : c.femaleBaseKg + c.femalePerInchKg * overBase;
}

export interface IdealWeightResult {
  devineKg: number;
  robinsonKg: number;
  millerKg: number;
  hamwiKg: number;
  /** Mean of the four formula results. */
  averageKg: number;
  bmiRangeKg: { minKg: number; maxKg: number };
}

/**
 * Ideal weight estimates for a height and sex,
 * or null when the height is outside the supported range.
 * Heights below 5 feet extrapolate the formulas below their base,
 * which is what published calculators do; treat those results as
 * rough guides only.
 */
export function idealWeight(heightCm: number, sex: Sex): IdealWeightResult | null {
  if (!inRange(heightCm, HEIGHT_CM_RANGE)) return null;
  const heightInches = heightCm / CM_PER_INCH;
  const devineKg = applyFormula(heightInches, sex, DEVINE);
  const robinsonKg = applyFormula(heightInches, sex, ROBINSON);
  const millerKg = applyFormula(heightInches, sex, MILLER);
  const hamwiKg = applyFormula(heightInches, sex, HAMWI);
  const heightM = heightCm / 100;
  const area = heightM * heightM;
  return {
    devineKg,
    robinsonKg,
    millerKg,
    hamwiKg,
    averageKg: (devineKg + robinsonKg + millerKg + hamwiKg) / 4,
    bmiRangeKg: { minKg: BMI_HEALTHY_MIN * area, maxKg: BMI_HEALTHY_MAX * area },
  };
}

export function kgToPounds(kg: number): number {
  return kg / KG_PER_LB;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * INCHES_PER_FOOT + inches) * CM_PER_INCH;
}
