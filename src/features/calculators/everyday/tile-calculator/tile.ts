/**
 * Tile quantity logic.
 *
 * The grout gap is added to each tile dimension to get the effective
 * pitch, so a 12 inch tile with a 0.25 inch gap covers 12.25 by 12.25
 * inches of floor per tile. Waste percent is applied before rounding
 * the tile count up. Boxes are based on tiles per box.
 */

export interface TileInput {
  roomLengthFt: number;
  roomWidthFt: number;
  tileLengthIn: number;
  tileWidthIn: number;
  groutGapIn: number;
  wastePercent: number;
  tilesPerBox: number;
}

export interface TileResult {
  roomAreaSqFt: number;
  roomAreaSqM: number;
  effectiveTileAreaSqFt: number;
  tilesNeeded: number;
  boxesNeeded: number;
}

function assertPositive(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${label} must be a positive number.`);
  return value;
}

export function cmToIn(cm: number): number {
  return cm / 2.54;
}

export function calculateTile(input: TileInput): TileResult {
  const roomLength = assertPositive(input.roomLengthFt, "Room length");
  const roomWidth = assertPositive(input.roomWidthFt, "Room width");
  const tileLength = assertPositive(input.tileLengthIn, "Tile length");
  const tileWidth = assertPositive(input.tileWidthIn, "Tile width");
  if (!Number.isFinite(input.groutGapIn) || input.groutGapIn < 0) {
    throw new RangeError("Grout gap must be zero or more.");
  }
  if (!Number.isFinite(input.wastePercent) || input.wastePercent < 0) {
    throw new RangeError("Waste percent must be zero or more.");
  }
  if (!Number.isInteger(input.tilesPerBox) || input.tilesPerBox < 1) {
    throw new RangeError("Tiles per box must be a whole number of at least 1.");
  }
  const roomAreaSqFt = roomLength * roomWidth;
  const effectiveTileAreaSqFt = ((tileLength + input.groutGapIn) * (tileWidth + input.groutGapIn)) / 144;
  const tilesNeeded = Math.ceil((roomAreaSqFt / effectiveTileAreaSqFt) * (1 + input.wastePercent / 100) - 1e-9);
  return {
    roomAreaSqFt,
    roomAreaSqM: roomAreaSqFt * 0.09290304,
    effectiveTileAreaSqFt,
    tilesNeeded,
    boxesNeeded: Math.ceil(tilesNeeded / input.tilesPerBox),
  };
}

/** Tiles needed when a box is sold by square foot coverage instead. */
export function boxesByCoverage(tilesNeeded: number, tileAreaSqFtNoGap: number, sqFtPerBox: number): number {
  const tileArea = assertPositive(tileAreaSqFtNoGap, "Tile area");
  const coverage = assertPositive(sqFtPerBox, "Square feet per box");
  if (!Number.isInteger(tilesNeeded) || tilesNeeded < 0) throw new RangeError("Tiles needed must be zero or more.");
  return Math.ceil((tilesNeeded * tileArea) / coverage);
}
