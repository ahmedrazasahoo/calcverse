export type BacSex = "male" | "female";
export const R_FACTORS: Record<BacSex, number> = { male: 0.68, female: 0.55 };
export const ELIMINATION_PER_HOUR = 0.015;
export const KG_PER_LB = 0.45359237;

export interface DrinkPreset { key: string; label: string; volumeMl: number; abvPct: number; }
export const DRINK_PRESETS: readonly DrinkPreset[] = [
  { key: "beer", label: "Beer (355 ml at 5%)", volumeMl: 355, abvPct: 5 },
  { key: "wine", label: "Wine (150 ml at 12%)", volumeMl: 150, abvPct: 12 },
  { key: "spirits", label: "Spirits (44 ml at 40%)", volumeMl: 44, abvPct: 40 },
];

/** Pure alcohol in grams: volume ml times ABV percent times 0.789 divided by 100. */
export function alcoholGrams(volumeMl: number, abvPct: number): number {
  return (volumeMl * abvPct * 0.789) / 100;
}

export interface BacInput { sex: BacSex; weightKg: number; totalAlcoholGrams: number; hours: number; }
export interface BacResult {
  peakBac: number;
  currentBac: number;
  hoursUntil008: number;
  hoursUntil005: number;
  hoursUntilZero: number;
}

function hoursUntil(current: number, threshold: number): number {
  if (current <= threshold) return 0;
  return (current - threshold) / ELIMINATION_PER_HOUR;
}

/** Widmark estimate. BAC percent equals A divided by (weight kg times r times 10). */
export function calculateBac(input: BacInput): BacResult | null {
  const { sex, weightKg, totalAlcoholGrams, hours } = input;
  if (!Number.isFinite(weightKg) || weightKg < 25 || weightKg > 500) return null;
  if (!Number.isFinite(totalAlcoholGrams) || totalAlcoholGrams < 0) return null;
  if (!Number.isFinite(hours) || hours < 0 || hours > 72) return null;
  const peak = totalAlcoholGrams / (weightKg * R_FACTORS[sex] * 10);
  const current = Math.max(0, peak - ELIMINATION_PER_HOUR * hours);
  return {
    peakBac: peak,
    currentBac: current,
    hoursUntil008: hoursUntil(current, 0.08),
    hoursUntil005: hoursUntil(current, 0.05),
    hoursUntilZero: hoursUntil(current, 0),
  };
}
