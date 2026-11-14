import { describe, expect, it } from "vitest";
import { boardFeetPerBoard, calculateBoardFoot } from "./boardFoot";

describe("board foot", () => {
  it("2x4x8 is 5.333 board feet", () => {
    expect(boardFeetPerBoard(2, 4, 8)).toBeCloseTo(5.333, 3);
  });
  it("totals for quantity, cost and linear feet", () => {
    const r = calculateBoardFoot({ thicknessIn: 2, widthIn: 4, lengthFt: 8, quantity: 10, pricePerBoardFoot: 5 });
    expect(r.boardFeetPerBoard).toBeCloseTo(5.333, 3);
    expect(r.totalBoardFeet).toBeCloseTo(53.333, 2);
    expect(r.totalCost).toBeCloseTo(266.67, 1);
    expect(r.linearFeet).toBe(80);
    expect(r.costPerBoard).toBeCloseTo(26.667, 2);
  });
  it("1x6x10 is 5 board feet exactly", () => {
    expect(boardFeetPerBoard(1, 6, 10)).toBe(5);
  });
  it("fractional thickness via decimal works: 0.75 x 6 x 8", () => {
    expect(boardFeetPerBoard(0.75, 6, 8)).toBe(3);
  });
  it("zero price gives zero cost but real board feet", () => {
    const r = calculateBoardFoot({ thicknessIn: 2, widthIn: 6, lengthFt: 10, quantity: 2, pricePerBoardFoot: 0 });
    expect(r.totalBoardFeet).toBe(20);
    expect(r.totalCost).toBe(0);
  });
  it("throws on zero quantity", () => {
    expect(() => calculateBoardFoot({ thicknessIn: 2, widthIn: 4, lengthFt: 8, quantity: 0, pricePerBoardFoot: 5 })).toThrow(RangeError);
  });
});
