import { describe, expect, it } from "vitest";
import { calculateTile, cmToIn } from "./tile";

describe("calculateTile", () => {
  it("clean case: 10x10 ft room, 12x12 in tiles, no gap, no waste, 10 per box", () => {
    const r = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, groutGapIn: 0, wastePercent: 0, tilesPerBox: 10 });
    expect(r.roomAreaSqFt).toBe(100);
    expect(r.effectiveTileAreaSqFt).toBe(1);
    expect(r.tilesNeeded).toBe(100);
    expect(r.boxesNeeded).toBe(10);
  });
  it("grout gap increases effective pitch and reduces tile count", () => {
    const r = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, groutGapIn: 0.25, wastePercent: 0, tilesPerBox: 10 });
    expect(r.effectiveTileAreaSqFt).toBeCloseTo(1.042, 3);
    expect(r.tilesNeeded).toBe(96);
  });
  it("waste percent increases tiles", () => {
    const r = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 12, tileWidthIn: 12, groutGapIn: 0, wastePercent: 10, tilesPerBox: 10 });
    expect(r.tilesNeeded).toBe(110);
    expect(r.boxesNeeded).toBe(11);
  });
  it("cm conversion: 30 cm is about 11.81 in", () => {
    expect(cmToIn(30)).toBeCloseTo(11.811, 3);
    expect(cmToIn(2.54)).toBe(1);
  });
  it("smaller tiles need more pieces", () => {
    const r = calculateTile({ roomLengthFt: 10, roomWidthFt: 10, tileLengthIn: 6, tileWidthIn: 6, groutGapIn: 0, wastePercent: 0, tilesPerBox: 20 });
    expect(r.tilesNeeded).toBe(400);
    expect(r.boxesNeeded).toBe(20);
  });
});
