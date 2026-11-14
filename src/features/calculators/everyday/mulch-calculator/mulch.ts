/**
 * Mulch volume logic. Area in square feet times depth in inches gives
 * cubic feet, cubic yards, and bag counts for 2 and 3 cubic foot bags.
 */

export interface MulchInput {
  areaSqFt?: number;
  lengthFt?: number;
  widthFt?: number;
  depthIn: number;
}

export interface MulchResult {
  areaSqFt: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeCuM: number;
  bags2CuFt: number;
  bags3CuFt: number;
}

function assertPositive(value: number | undefined, label: string): number {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive number.`);
  }
  return value;
}

export function areaFromInput(input: MulchInput): number {
  if (input.areaSqFt !== undefined) return assertPositive(input.areaSqFt, "Area");
  return assertPositive(input.lengthFt, "Length") * assertPositive(input.widthFt, "Width");
}

export function calculateMulch(input: MulchInput): MulchResult {
  const areaSqFt = areaFromInput(input);
  const depthIn = assertPositive(input.depthIn, "Depth");
  const volumeCuFt = areaSqFt * (depthIn / 12);
  return {
    areaSqFt,
    volumeCuFt,
    volumeCuYd: volumeCuFt / 27,
    volumeCuM: volumeCuFt * 0.0283168466,
    bags2CuFt: Math.ceil(volumeCuFt / 2),
    bags3CuFt: Math.ceil(volumeCuFt / 3),
  };
}
