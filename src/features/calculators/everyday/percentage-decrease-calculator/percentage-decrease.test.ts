import { describe, expect, it } from "vitest";
import { applyDecrease, decreaseBetween } from "./percentage-decrease";

// Formula: percentDrop = (old - new) / |old| * 100
// Formula: reducedValue = value * (1 - percent / 100)

describe("decreaseBetween", () => {
  it("measures a fall from 200 to 150 as a 25 percent drop", () => {
    const result = decreaseBetween(200, 150);
    expect(result.difference).toBe(50);
    expect(result.percentDrop).toBeCloseTo(25, 5);
    expect(result.isDecrease).toBe(true);
  });

  it("reports a negative drop when the value actually rose", () => {
    const result = decreaseBetween(100, 125);
    expect(result.difference).toBe(-25);
    expect(result.percentDrop).toBeCloseTo(-25, 5);
    expect(result.isDecrease).toBe(false);
  });

  it("reports no drop when the values match", () => {
    const result = decreaseBetween(75, 75);
    expect(result.difference).toBe(0);
    expect(result.percentDrop).toBe(0);
    expect(result.isDecrease).toBe(false);
  });

  it("throws when the old value is zero", () => {
    expect(() => decreaseBetween(0, 10)).toThrow(RangeError);
  });
});

describe("applyDecrease", () => {
  it("cuts 80 by 25 percent to 60", () => {
    const result = applyDecrease(80, 25);
    expect(result.reducedValue).toBeCloseTo(60, 5);
    expect(result.amountRemoved).toBeCloseTo(20, 5);
  });

  it("removes everything at 100 percent", () => {
    const result = applyDecrease(80, 100);
    expect(result.reducedValue).toBe(0);
    expect(result.amountRemoved).toBe(80);
  });

  it("throws when the percent is over 100", () => {
    expect(() => applyDecrease(80, 101)).toThrow(RangeError);
  });

  it("throws on a negative percent", () => {
    expect(() => applyDecrease(80, -10)).toThrow(RangeError);
  });
});
