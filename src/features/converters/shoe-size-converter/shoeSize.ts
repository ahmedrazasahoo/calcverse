/**
 * Shoe size conversion logic, pure and framework free.
 *
 * Sizes are held as lookup tables keyed by foot length, because there
 * is no exact formula between systems: US, UK and EU sizes all step
 * differently, and every brand rounds a little differently. The tables
 * below follow the widely published standard charts. US and UK half
 * sizes are stored as decimals (8.5), and the kids table covers youth
 * sizes, where UK numbering restarts after 13.5, which is why a kids
 * UK 1.5 is a bigger shoe than a kids UK 13.5.
 *
 * Converting from a size in US, UK or EU is an exact table match.
 * Converting from a foot length in centimetres picks the nearest row,
 * which is also how a shop assistant would read a printed chart.
 */

export type ShoeGroup = "men" | "women" | "kids";
export type ShoeSystem = "us" | "uk" | "eu" | "cm";

export interface ShoeSizeRow {
  /** Foot length in centimetres for this size. */
  footCm: number;
  us: number;
  uk: number;
  eu: number;
}

export const SHOE_GROUP_LABELS: Record<ShoeGroup, string> = {
  men: "Men",
  women: "Women",
  kids: "Kids (youth)",
};

const MEN: readonly ShoeSizeRow[] = [
  { footCm: 24.0, us: 6, uk: 5.5, eu: 38.5 },
  { footCm: 24.3, us: 6.5, uk: 6, eu: 39 },
  { footCm: 24.7, us: 7, uk: 6.5, eu: 40 },
  { footCm: 25.0, us: 7.5, uk: 7, eu: 40.5 },
  { footCm: 25.4, us: 8, uk: 7.5, eu: 41 },
  { footCm: 25.7, us: 8.5, uk: 8, eu: 42 },
  { footCm: 26.0, us: 9, uk: 8.5, eu: 42.5 },
  { footCm: 26.4, us: 9.5, uk: 9, eu: 43 },
  { footCm: 26.7, us: 10, uk: 9.5, eu: 44 },
  { footCm: 27.1, us: 10.5, uk: 10, eu: 44.5 },
  { footCm: 27.4, us: 11, uk: 10.5, eu: 45 },
  { footCm: 27.8, us: 11.5, uk: 11, eu: 45.5 },
  { footCm: 28.1, us: 12, uk: 11.5, eu: 46 },
  { footCm: 28.8, us: 13, uk: 12.5, eu: 47.5 },
  { footCm: 29.5, us: 14, uk: 13.5, eu: 48.5 },
];

const WOMEN: readonly ShoeSizeRow[] = [
  { footCm: 22.0, us: 5, uk: 3.5, eu: 35.5 },
  { footCm: 22.4, us: 5.5, uk: 4, eu: 36 },
  { footCm: 22.7, us: 6, uk: 4.5, eu: 36.5 },
  { footCm: 23.0, us: 6.5, uk: 5, eu: 37.5 },
  { footCm: 23.4, us: 7, uk: 5.5, eu: 38 },
  { footCm: 23.7, us: 7.5, uk: 6, eu: 38.5 },
  { footCm: 24.1, us: 8, uk: 6.5, eu: 39 },
  { footCm: 24.4, us: 8.5, uk: 7, eu: 40 },
  { footCm: 24.8, us: 9, uk: 7.5, eu: 40.5 },
  { footCm: 25.1, us: 9.5, uk: 8, eu: 41 },
  { footCm: 25.4, us: 10, uk: 8.5, eu: 42 },
  { footCm: 26.2, us: 11, uk: 9.5, eu: 43 },
];

const KIDS: readonly ShoeSizeRow[] = [
  { footCm: 20.0, us: 1, uk: 13.5, eu: 32 },
  { footCm: 21.0, us: 2, uk: 1.5, eu: 33.5 },
  { footCm: 21.9, us: 3, uk: 2.5, eu: 35 },
  { footCm: 22.7, us: 4, uk: 3.5, eu: 36 },
  { footCm: 23.5, us: 5, uk: 4.5, eu: 37 },
  { footCm: 24.3, us: 6, uk: 5.5, eu: 38.5 },
  { footCm: 25.0, us: 7, uk: 6, eu: 39.5 },
];

export const SHOE_TABLES: Record<ShoeGroup, readonly ShoeSizeRow[]> = {
  men: MEN,
  women: WOMEN,
  kids: KIDS,
};

/** Widest foot length gap (cm) accepted for a nearest row match. */
export const MAX_CM_MATCH_GAP = 2;

function valueOf(row: ShoeSizeRow, system: ShoeSystem): number {
  if (system === "us") return row.us;
  if (system === "uk") return row.uk;
  if (system === "eu") return row.eu;
  return row.footCm;
}

/**
 * Converts a shoe size within one group (men, women or kids) and
 * returns the full matching row. Size systems match exactly; a foot
 * length in centimetres matches the nearest row within a small gap.
 * Returns null when no row fits.
 */
export function convertShoeSize(group: ShoeGroup, system: ShoeSystem, value: number): ShoeSizeRow | null {
  if (!Number.isFinite(value) || value <= 0) return null;
  const table = SHOE_TABLES[group];
  if (system === "cm") {
    let best: ShoeSizeRow | null = null;
    let bestGap = Number.POSITIVE_INFINITY;
    for (const row of table) {
      const gap = Math.abs(row.footCm - value);
      // The table runs smallest to largest, so <= hands exact ties to
      // the larger size, the usual advice when a foot falls between sizes.
      if (gap <= bestGap) {
        bestGap = gap;
        best = row;
      }
    }
    return bestGap <= MAX_CM_MATCH_GAP ? best : null;
  }
  return table.find((row) => valueOf(row, system) === value) ?? null;
}

/** Display form for a size: whole numbers plain, halves with one decimal. */
export function formatShoeSize(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
