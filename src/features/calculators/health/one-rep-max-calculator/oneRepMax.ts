export const KG_PER_LB = 0.45359237;

export interface FormulaEstimate { name: string; value: number; }

export function estimateOneRepMax(weight: number, reps: number): { estimates: FormulaEstimate[]; average: number } | null {
  if (!Number.isFinite(weight) || weight <= 0) return null;
  if (!Number.isInteger(reps) || reps < 1 || reps > 15) return null;
  if (reps === 1) {
    const names = ["Epley", "Brzycki", "Lander", "Lombardi", "Mayhew", "O'Conner", "Wathen"];
    return { estimates: names.map((name) => ({ name, value: weight })), average: weight };
  }
  const r = reps;
  const w = weight;
  const estimates: FormulaEstimate[] = [
    { name: "Epley", value: w * (1 + r / 30) },
    { name: "Brzycki", value: (w * 36) / (37 - r) },
    { name: "Lander", value: (100 * w) / (101.3 - 2.67123 * r) },
    { name: "Lombardi", value: w * Math.pow(r, 0.1) },
    { name: "Mayhew", value: (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r)) },
    { name: "O'Conner", value: w * (1 + 0.025 * r) },
    { name: "Wathen", value: (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)) },
  ];
  const average = estimates.reduce((s, e) => s + e.value, 0) / estimates.length;
  return { estimates, average };
}

export interface PercentageRow { pct: number; weight: number; typicalReps: number; }
const REPS_AT_PCT: Record<number, number> = {
  100: 1, 95: 2, 90: 4, 85: 6, 80: 8, 75: 10, 70: 12, 65: 16, 60: 20, 55: 24, 50: 30,
};

export function percentageTable(oneRepMax: number): PercentageRow[] {
  return Object.keys(REPS_AT_PCT)
    .map(Number)
    .sort((a, b) => b - a)
    .map((pct) => ({ pct, weight: (oneRepMax * pct) / 100, typicalReps: REPS_AT_PCT[pct] }));
}
