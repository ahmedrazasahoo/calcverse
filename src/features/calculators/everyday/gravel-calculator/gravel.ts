/**
 * Gravel and aggregate volume and weight logic.
 * Volume from area times depth, weight from density in tons per cubic yard.
 * Tons here are US short tons. One short ton equals 907.185 kg.
 */

export const MATERIALS: Record<string, { label: string; densityTonsPerCuYd: number }> = {
  "pea-gravel": { label: "Pea gravel", densityTonsPerCuYd: 1.35 },
  "crushed-stone": { label: "Crushed stone", densityTonsPerCuYd: 1.4 },
  sand: { label: "Sand", densityTonsPerCuYd: 1.33 },
  topsoil: { label: "Topsoil", densityTonsPerCuYd: 1.2 },
  "river-rock": { label: "River rock", densityTonsPerCuYd: 1.5 },
};

export const KG_PER_SHORT_TON = 907.185;

export interface GravelInput {
  areaSqFt?: number;
  lengthFt?: number;
  widthFt?: number;
  depthIn: number;
  densityTonsPerCuYd: number;
}

export interface GravelResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  tons: number;
  kg: number;
  pounds: number;
}

function assertPositive(value: number | undefined, label: string): number {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive number.`);
  }
  return value;
}

export function calculateGravel(input: GravelInput): GravelResult {
  const areaSqFt =
    input.areaSqFt !== undefined
      ? assertPositive(input.areaSqFt, "Area")
      : assertPositive(input.lengthFt, "Length") * assertPositive(input.widthFt, "Width");
  const depthIn = assertPositive(input.depthIn, "Depth");
  const density = assertPositive(input.densityTonsPerCuYd, "Density");
  const volumeCuFt = areaSqFt * (depthIn / 12);
  const volumeCuYd = volumeCuFt / 27;
  const tons = volumeCuYd * density;
  return {
    areaSqFt,
    volumeCuFt,
    volumeCuYd,
    tons,
    kg: tons * KG_PER_SHORT_TON,
    pounds: tons * 2000,
  };
}
