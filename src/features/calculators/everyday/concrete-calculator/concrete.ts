/**
 * Concrete volume and premix bag logic, pure and framework free.
 *
 * Imperial inputs: length and width in feet, thickness or depth in
 * inches, column diameter in inches and column height in feet.
 * Metric inputs: length, width, diameter and height in metres, and
 * thickness or depth in metres. Everything is converted to cubic feet
 * internally, then reported in cubic feet, cubic yards and cubic metres.
 * Waste allowance is applied to the volume before bag counts.
 */

export type ConcreteMode = "slab" | "footing" | "column";
export type ConcreteUnit = "imperial" | "metric";

export const BAG_YIELDS_CU_FT: Record<number, number> = {
  40: 0.3,
  50: 0.375,
  60: 0.45,
  80: 0.6,
};

export const BAG_SIZES = [40, 50, 60, 80] as const;

export interface ConcreteInput {
  mode: ConcreteMode;
  unit: ConcreteUnit;
  /** Slab and footing length. Feet (imperial) or metres (metric). */
  length?: number;
  /** Slab and footing width. Feet (imperial) or metres (metric). */
  width?: number;
  /** Slab thickness or footing depth. Inches (imperial) or metres (metric). */
  thickness?: number;
  /** Column diameter. Inches (imperial) or metres (metric). */
  diameter?: number;
  /** Column height. Feet (imperial) or metres (metric). */
  height?: number;
  wastePercent: number;
}

export interface ConcreteResult {
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  volumeWithWasteCuFt: number;
  volumeWithWasteCuYd: number;
  volumeWithWasteCuM: number;
  bags: Record<number, number>;
}

const METRES_TO_FEET = 3.280839895;
const CU_FT_TO_CU_M = 0.0283168466;

function assertPositive(value: number | undefined, label: string): number {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive number.`);
  }
  return value;
}

/** Volume in cubic feet for imperial dimensions. */
export function volumeCuFtImperial(input: ConcreteInput): number {
  if (input.mode === "column") {
    const diameterIn = assertPositive(input.diameter, "Diameter");
    const heightFt = assertPositive(input.height, "Height");
    const radiusFt = diameterIn / 12 / 2;
    return Math.PI * radiusFt * radiusFt * heightFt;
  }
  const lengthFt = assertPositive(input.length, "Length");
  const widthFt = assertPositive(input.width, "Width");
  const thicknessIn = assertPositive(input.thickness, "Thickness");
  return lengthFt * widthFt * (thicknessIn / 12);
}

/** Converts a metric input set into the equivalent imperial input set. */
export function metricToImperial(input: ConcreteInput): ConcreteInput {
  const converted: ConcreteInput = { ...input, unit: "imperial" };
  if (input.length !== undefined) converted.length = input.length * METRES_TO_FEET;
  if (input.width !== undefined) converted.width = input.width * METRES_TO_FEET;
  if (input.height !== undefined) converted.height = input.height * METRES_TO_FEET;
  // Thickness and diameter are entered in metres for metric, inches for imperial.
  if (input.thickness !== undefined) converted.thickness = input.thickness * METRES_TO_FEET * 12;
  if (input.diameter !== undefined) converted.diameter = input.diameter * METRES_TO_FEET * 12;
  return converted;
}

/** Bags needed for a given volume in cubic feet, rounded up. */
export function bagsNeeded(volumeCuFt: number, bagSizeLb: number): number {
  const yieldCuFt = BAG_YIELDS_CU_FT[bagSizeLb];
  if (yieldCuFt === undefined) throw new RangeError("Bag size must be 40, 50, 60 or 80 lb.");
  if (!Number.isFinite(volumeCuFt) || volumeCuFt < 0) throw new RangeError("Volume must not be negative.");
  return Math.ceil(volumeCuFt / yieldCuFt);
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  if (!Number.isFinite(input.wastePercent) || input.wastePercent < 0) {
    throw new RangeError("Waste percent must be zero or more.");
  }
  const imperial = input.unit === "metric" ? metricToImperial(input) : input;
  const volumeCuFt = volumeCuFtImperial(imperial);
  const withWaste = volumeCuFt * (1 + input.wastePercent / 100);
  const bags: Record<number, number> = {};
  for (const size of BAG_SIZES) bags[size] = bagsNeeded(withWaste, size);
  return {
    volumeCuFt,
    volumeCuYd: volumeCuFt / 27,
    volumeCuM: volumeCuFt * CU_FT_TO_CU_M,
    volumeWithWasteCuFt: withWaste,
    volumeWithWasteCuYd: withWaste / 27,
    volumeWithWasteCuM: withWaste * CU_FT_TO_CU_M,
    bags,
  };
}
