/**
 * Square footage logic for common shapes, flooring boxes and paint.
 * Areas are reported in square feet and square metres.
 * One square foot equals 0.09290304 square metres.
 */

export type ShapeKind = "rectangle" | "circle" | "triangle";

export const SQ_FT_TO_SQ_M = 0.09290304;
export const DOOR_AREA_SQ_FT = 21;
export const WINDOW_AREA_SQ_FT = 15;
export const DEFAULT_PAINT_COVERAGE = 350;

export interface AreaResult {
  sqFt: number;
  sqM: number;
}

function assertPositive(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${label} must be a positive number.`);
  return value;
}

export function toArea(sqFt: number): AreaResult {
  return { sqFt, sqM: sqFt * SQ_FT_TO_SQ_M };
}

export function rectangleArea(lengthFt: number, widthFt: number): AreaResult {
  return toArea(assertPositive(lengthFt, "Length") * assertPositive(widthFt, "Width"));
}

export function circleArea(radiusFt: number): AreaResult {
  const r = assertPositive(radiusFt, "Radius");
  return toArea(Math.PI * r * r);
}

export function triangleArea(baseFt: number, heightFt: number): AreaResult {
  return toArea((assertPositive(baseFt, "Base") * assertPositive(heightFt, "Height")) / 2);
}

export function shapeArea(shape: ShapeKind, a: number, b?: number): AreaResult {
  if (shape === "circle") return circleArea(a);
  if (b === undefined) throw new RangeError("A second dimension is required for this shape.");
  return shape === "rectangle" ? rectangleArea(a, b) : triangleArea(a, b);
}

/** Flooring boxes needed, rounded up, from coverage per box in square feet. */
export function flooringBoxes(areaSqFt: number, coveragePerBoxSqFt: number, wastePercent = 0): number {
  const area = assertPositive(areaSqFt, "Area");
  const coverage = assertPositive(coveragePerBoxSqFt, "Coverage per box");
  if (!Number.isFinite(wastePercent) || wastePercent < 0) throw new RangeError("Waste percent must be zero or more.");
  return Math.ceil((area * (1 + wastePercent / 100)) / coverage - 1e-9);
}

export interface PaintInput {
  lengthFt: number;
  widthFt: number;
  heightFt: number;
  doors: number;
  windows: number;
  coats: number;
  coveragePerGallon?: number;
}

export interface PaintResult {
  grossWallAreaSqFt: number;
  deductionsSqFt: number;
  netWallAreaSqFt: number;
  netWallAreaSqM: number;
  gallonsExact: number;
  gallonsToBuy: number;
}

export function calculatePaint(input: PaintInput): PaintResult {
  const length = assertPositive(input.lengthFt, "Room length");
  const width = assertPositive(input.widthFt, "Room width");
  const height = assertPositive(input.heightFt, "Wall height");
  const coverage = input.coveragePerGallon ?? DEFAULT_PAINT_COVERAGE;
  assertPositive(coverage, "Coverage per gallon");
  if (!Number.isInteger(input.doors) || input.doors < 0) throw new RangeError("Doors must be zero or more.");
  if (!Number.isInteger(input.windows) || input.windows < 0) throw new RangeError("Windows must be zero or more.");
  if (!Number.isInteger(input.coats) || input.coats < 1) throw new RangeError("Coats must be at least 1.");
  const gross = 2 * (length + width) * height;
  const deductions = input.doors * DOOR_AREA_SQ_FT + input.windows * WINDOW_AREA_SQ_FT;
  const net = Math.max(0, gross - deductions);
  const gallonsExact = (net * input.coats) / coverage;
  return {
    grossWallAreaSqFt: gross,
    deductionsSqFt: deductions,
    netWallAreaSqFt: net,
    netWallAreaSqM: net * SQ_FT_TO_SQ_M,
    gallonsExact,
    gallonsToBuy: Math.ceil(gallonsExact),
  };
}
