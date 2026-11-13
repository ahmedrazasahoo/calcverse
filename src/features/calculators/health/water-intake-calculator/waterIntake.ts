/**
 * Daily water intake logic, pure and framework free.
 *
 * Method: a widely used weight based guideline of about 35 ml of water
 * per kilogram of body weight per day, plus extra water for exercise
 * (about 355 ml for every 30 minutes, in line with sports medicine
 * guidance to replace sweat losses), scaled by climate because heat
 * raises sweat losses. Individual needs vary a lot; thirst and urine
 * colour are better day to day guides than any formula.
 */

export const ML_PER_KG_BODY_WEIGHT = 35;
/** Extra water for each 30 minutes of exercise. */
export const ML_PER_30_MIN_EXERCISE = 355;
export const ML_PER_LITER = 1000;
/** One metric cup. */
export const ML_PER_CUP = 250;
export const ML_PER_FLUID_OUNCE = 29.5735;

export type ClimateKey = "temperate" | "warm" | "hot";

export interface ClimateOption {
  key: ClimateKey;
  label: string;
  /** Multiplier applied to the base plus exercise total. */
  factor: number;
}

export const CLIMATE_OPTIONS: readonly ClimateOption[] = [
  { key: "temperate", label: "Temperate (mild weather, mostly indoors)", factor: 1 },
  { key: "warm", label: "Warm (a hot season or regular outdoor time)", factor: 1.1 },
  { key: "hot", label: "Hot and humid (heavy sweating weather)", factor: 1.2 },
];

const WEIGHT_KG_RANGE = { min: 1, max: 500 } as const;
const EXERCISE_MINUTES_RANGE = { min: 0, max: 1440 } as const;

export const KG_PER_LB = 0.45359237;

function inRange(value: number, range: { min: number; max: number }): boolean {
  return Number.isFinite(value) && value >= range.min && value <= range.max;
}

export interface WaterIntakeInput {
  weightKg: number;
  exerciseMinutes: number;
  climate: ClimateKey;
}

export interface WaterIntakeResult {
  milliliters: number;
  liters: number;
  cups: number;
  fluidOunces: number;
  /** The part of the total that comes from body weight alone. */
  baseMilliliters: number;
  /** The extra part added for exercise, after the climate factor. */
  exerciseMilliliters: number;
}

/**
 * Suggested daily water intake, or null when an input is out of range
 * or the climate key is unknown.
 */
export function dailyWaterIntake(input: WaterIntakeInput): WaterIntakeResult | null {
  if (!inRange(input.weightKg, WEIGHT_KG_RANGE)) return null;
  if (!inRange(input.exerciseMinutes, EXERCISE_MINUTES_RANGE)) return null;
  const climate = CLIMATE_OPTIONS.find((option) => option.key === input.climate);
  if (!climate) return null;

  const baseMilliliters = input.weightKg * ML_PER_KG_BODY_WEIGHT;
  const exerciseRaw = (input.exerciseMinutes / 30) * ML_PER_30_MIN_EXERCISE;
  const milliliters = (baseMilliliters + exerciseRaw) * climate.factor;

  return {
    milliliters,
    liters: milliliters / ML_PER_LITER,
    cups: milliliters / ML_PER_CUP,
    fluidOunces: milliliters / ML_PER_FLUID_OUNCE,
    baseMilliliters: baseMilliliters * climate.factor,
    exerciseMilliliters: exerciseRaw * climate.factor,
  };
}

export function poundsToKg(pounds: number): number {
  return pounds * KG_PER_LB;
}
