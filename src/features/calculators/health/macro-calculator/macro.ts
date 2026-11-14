export type Sex = "male" | "female";
export type Goal = "lose" | "maintain" | "gain";

export interface ActivityLevel { value: number; label: string; }
export const ACTIVITY_LEVELS: readonly ActivityLevel[] = [
  { value: 1.2, label: "Sedentary (desk job, little exercise)" },
  { value: 1.375, label: "Lightly active (exercise 1 to 3 days a week)" },
  { value: 1.55, label: "Moderately active (exercise 3 to 5 days a week)" },
  { value: 1.725, label: "Very active (exercise 6 to 7 days a week)" },
  { value: 1.9, label: "Athlete (physical job or twice daily training)" },
];

export interface MacroSplit { carbPct: number; proteinPct: number; fatPct: number; }
export const PRESETS: Record<string, { label: string; split: MacroSplit }> = {
  balanced: { label: "Balanced (40 / 30 / 30)", split: { carbPct: 40, proteinPct: 30, fatPct: 30 } },
  "high-protein": { label: "High Protein (30 / 40 / 30)", split: { carbPct: 30, proteinPct: 40, fatPct: 30 } },
  "low-carb": { label: "Low Carb (20 / 40 / 40)", split: { carbPct: 20, proteinPct: 40, fatPct: 40 } },
  keto: { label: "Keto (5 / 25 / 70)", split: { carbPct: 5, proteinPct: 25, fatPct: 70 } },
};

export const MIN_CALORIES = 1200;
export const KG_PER_LB = 0.45359237;
export const CM_PER_INCH = 2.54;

export function mifflinBmr(sex: Sex, age: number, weightKg: number, heightCm: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function goalCalories(tdee: number, goal: Goal): number {
  if (goal === "lose") return Math.max(MIN_CALORIES, tdee - 500);
  if (goal === "gain") return tdee + 300;
  return tdee;
}

export interface MacroInput {
  sex: Sex; age: number; weightKg: number; heightCm: number;
  activity: number; goal: Goal; split: MacroSplit;
}
export interface MacroResult {
  bmr: number; tdee: number; calories: number;
  proteinGrams: number; carbGrams: number; fatGrams: number;
  proteinKcal: number; carbKcal: number; fatKcal: number;
  splitValid: boolean;
}

export function splitSumsTo100(split: MacroSplit): boolean {
  return Math.abs(split.carbPct + split.proteinPct + split.fatPct - 100) < 0.01;
}

export function calculateMacros(input: MacroInput): MacroResult | null {
  const { sex, age, weightKg, heightCm, activity, goal, split } = input;
  if (![age, weightKg, heightCm, activity].every(Number.isFinite)) return null;
  if (age < 10 || age > 100 || weightKg < 25 || weightKg > 500 || heightCm < 100 || heightCm > 280) return null;
  if (!ACTIVITY_LEVELS.some((a) => a.value === activity)) return null;
  const bmr = mifflinBmr(sex, age, weightKg, heightCm);
  const tdee = bmr * activity;
  const calories = goalCalories(tdee, goal);
  const valid = splitSumsTo100(split);
  const proteinKcal = (calories * split.proteinPct) / 100;
  const carbKcal = (calories * split.carbPct) / 100;
  const fatKcal = (calories * split.fatPct) / 100;
  return {
    bmr, tdee, calories,
    proteinGrams: proteinKcal / 4, carbGrams: carbKcal / 4, fatGrams: fatKcal / 9,
    proteinKcal, carbKcal, fatKcal,
    splitValid: valid,
  };
}
