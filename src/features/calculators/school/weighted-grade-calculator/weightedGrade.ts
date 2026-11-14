import { gradePoints, letterGrade, totalWeight, weightedAverage, type WeightedItem } from "../grade-calculator/grades";

export interface WeightedGradeResult {
  percent: number;
  letter: string;
  points: number;
  totalWeight: number;
  isComplete: boolean;
}

export function computeWeightedGrade(items: WeightedItem[]): WeightedGradeResult {
  const valid = items.filter((i) => Number.isFinite(i.score) && Number.isFinite(i.weight) && i.weight > 0);
  const percent = weightedAverage(valid);
  return {
    percent,
    letter: letterGrade(percent),
    points: gradePoints(percent),
    totalWeight: totalWeight(valid),
    isComplete: Math.abs(totalWeight(valid) - 100) < 0.001,
  };
}
