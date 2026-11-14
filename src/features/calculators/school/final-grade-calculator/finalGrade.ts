import { neededFinalScore, type NeededFinalResult } from "../grade-calculator/grades";

export type WeightMode = "current" | "final";

export function resolveCurrentWeight(mode: WeightMode, enteredWeight: number): number {
  if (mode === "final") return 100 - enteredWeight;
  return enteredWeight;
}

export function finalNeeded(
  currentPercent: number,
  mode: WeightMode,
  enteredWeight: number,
  targetPercent: number,
): NeededFinalResult & { currentWeight: number } {
  const currentWeight = resolveCurrentWeight(mode, enteredWeight);
  const result = neededFinalScore(currentPercent, currentWeight, targetPercent);
  return { ...result, currentWeight };
}
