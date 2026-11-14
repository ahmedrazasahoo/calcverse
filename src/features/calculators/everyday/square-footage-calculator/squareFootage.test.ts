import { describe, expect, it } from "vitest";
import { calculatePaint, circleArea, flooringBoxes, rectangleArea, triangleArea } from "./squareFootage";

describe("shapes", () => {
  it("rectangle 10 by 12 is 120 sq ft", () => {
    const r = rectangleArea(10, 12);
    expect(r.sqFt).toBe(120);
    expect(r.sqM).toBeCloseTo(11.148, 2);
  });
  it("circle radius 5", () => {
    const r = circleArea(5);
    expect(r.sqFt).toBeCloseTo(78.54, 2);
    expect(r.sqM).toBeCloseTo(7.297, 2);
  });
  it("triangle base 10 height 6 is 30 sq ft", () => {
    expect(triangleArea(10, 6).sqFt).toBe(30);
  });
});

describe("flooring and paint", () => {
  it("flooring boxes round up", () => {
    expect(flooringBoxes(120, 20)).toBe(6);
    expect(flooringBoxes(121, 20)).toBe(7);
    expect(flooringBoxes(100, 20, 10)).toBe(6);
  });
  it("paint wall math: 12x10 room, 8 ft walls, 1 door, 2 windows, 2 coats", () => {
    const r = calculatePaint({ lengthFt: 12, widthFt: 10, heightFt: 8, doors: 1, windows: 2, coats: 2 });
    expect(r.grossWallAreaSqFt).toBe(352);
    expect(r.deductionsSqFt).toBe(21 + 30);
    expect(r.netWallAreaSqFt).toBe(301);
    expect(r.gallonsExact).toBeCloseTo((301 * 2) / 350, 6);
    expect(r.gallonsToBuy).toBe(2);
  });
  it("paint with no openings, 1 coat", () => {
    const r = calculatePaint({ lengthFt: 10, widthFt: 10, heightFt: 8, doors: 0, windows: 0, coats: 1 });
    expect(r.netWallAreaSqFt).toBe(320);
    expect(r.gallonsToBuy).toBe(1);
  });
});
