/** Shared grade logic used by the whole grade calculator family. Pure and framework free. */

export interface WeightedItem {
  score: number;
  weight: number;
}

export interface PointsItem {
  earned: number;
  possible: number;
}

export interface NeededFinalResult {
  /** Score required on the final, as a percent. Can be below 0 or above 100. */
  required: number;
  /** Weight of the final exam as a percent of the course. */
  finalWeight: number;
  /** True when the target is already secured even with a zero on the final. */
  alreadySecured: boolean;
  /** True when the target cannot be reached even with 100 percent on the final. */
  impossible: boolean;
}

const SCALE: { min: number; letter: string; points: number }[] = [
  { min: 97, letter: "A+", points: 4.0 },
  { min: 93, letter: "A", points: 4.0 },
  { min: 90, letter: "A-", points: 3.7 },
  { min: 87, letter: "B+", points: 3.3 },
  { min: 83, letter: "B", points: 3.0 },
  { min: 80, letter: "B-", points: 2.7 },
  { min: 77, letter: "C+", points: 2.3 },
  { min: 73, letter: "C", points: 2.0 },
  { min: 70, letter: "C-", points: 1.7 },
  { min: 67, letter: "D+", points: 1.3 },
  { min: 63, letter: "D", points: 1.0 },
  { min: 60, letter: "D-", points: 0.7 },
];

export function letterGrade(percent: number): string {
  if (!Number.isFinite(percent)) return "F";
  for (const row of SCALE) {
    if (percent >= row.min) return row.letter;
  }
  return "F";
}

export function gradePoints(percent: number): number {
  if (!Number.isFinite(percent)) return 0;
  for (const row of SCALE) {
    if (percent >= row.min) return row.points;
  }
  return 0;
}

/** Weighted percent: weights are normalised so they do not need to add to exactly 100. */
export function weightedAverage(items: WeightedItem[]): number {
  if (!items || items.length === 0) return 0;
  let totalWeight = 0;
  let sum = 0;
  for (const item of items) {
    if (!Number.isFinite(item.score) || !Number.isFinite(item.weight) || item.weight < 0) continue;
    sum += item.score * item.weight;
    totalWeight += item.weight;
  }
  if (totalWeight <= 0) return 0;
  return sum / totalWeight;
}

export function totalWeight(items: WeightedItem[]): number {
  if (!items) return 0;
  return items.reduce((acc, item) => acc + (Number.isFinite(item.weight) && item.weight > 0 ? item.weight : 0), 0);
}

/** Overall percent from points: total earned divided by total possible, times 100. */
export function pointsPercent(items: PointsItem[]): number {
  if (!items || items.length === 0) return 0;
  let earned = 0;
  let possible = 0;
  for (const item of items) {
    if (!Number.isFinite(item.earned) || !Number.isFinite(item.possible) || item.possible <= 0) continue;
    earned += Math.max(0, item.earned);
    possible += item.possible;
  }
  if (possible <= 0) return 0;
  return (earned / possible) * 100;
}

/**
 * Score needed on the final exam.
 * currentWeight is the percent of the course already completed.
 * The final makes up the remaining weight: 100 minus currentWeight.
 * Formula: required = (target times 100 minus current times currentWeight) divided by finalWeight.
 */
export function neededFinalScore(
  currentPercent: number,
  currentWeight: number,
  targetPercent: number,
): NeededFinalResult {
  const finalWeight = 100 - currentWeight;
  if (!Number.isFinite(currentPercent) || !Number.isFinite(currentWeight) || !Number.isFinite(targetPercent) || finalWeight <= 0) {
    return { required: 0, finalWeight: Math.max(0, finalWeight || 0), alreadySecured: false, impossible: false };
  }
  const required = (targetPercent * 100 - currentPercent * currentWeight) / finalWeight;
  return {
    required,
    finalWeight,
    alreadySecured: required <= 0,
    impossible: required > 100,
  };
}
