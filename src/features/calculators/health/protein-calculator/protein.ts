export const KG_PER_LB = 0.45359237;

export interface ProteinFactor { key: string; label: string; gramsPerKg: number; }
export const PROTEIN_FACTORS: readonly ProteinFactor[] = [
  { key: "sedentary", label: "Sedentary (little or no exercise)", gramsPerKg: 0.8 },
  { key: "light", label: "Lightly active", gramsPerKg: 1.0 },
  { key: "active", label: "Active (regular training)", gramsPerKg: 1.2 },
  { key: "endurance", label: "Endurance athlete", gramsPerKg: 1.4 },
  { key: "strength", label: "Strength and muscle building", gramsPerKg: 1.8 },
  { key: "maximum", label: "Maximum evidence based upper range", gramsPerKg: 2.2 },
];

export interface ProteinResult {
  factor: number;
  recommendedGrams: number;
  lowGrams: number;
  highGrams: number;
  gramsPerLbBodyWeight: number;
  perMeal: { meals: number; grams: number }[];
}

export function calculateProtein(weightKg: number, factorKey: string): ProteinResult | null {
  const entry = PROTEIN_FACTORS.find((f) => f.key === factorKey);
  if (!entry || !Number.isFinite(weightKg) || weightKg < 20 || weightKg > 500) return null;
  const factor = entry.gramsPerKg;
  const recommended = factor * weightKg;
  const lowFactor = Math.max(0.8, factor - 0.2);
  const highFactor = factor + 0.2;
  const weightLb = weightKg / KG_PER_LB;
  return {
    factor,
    recommendedGrams: recommended,
    lowGrams: lowFactor * weightKg,
    highGrams: highFactor * weightKg,
    gramsPerLbBodyWeight: recommended / weightLb,
    perMeal: [3, 4, 5].map((meals) => ({ meals, grams: recommended / meals })),
  };
}
