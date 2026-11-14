import { describe, expect, it } from "vitest";
import { addTax, removeTax } from "./salestax";

describe("addTax", () => {
  it("adds 10 percent to 100", () => {
    const r = addTax(100, 10);
    expect(r.net).toBe(100);
    expect(r.tax).toBeCloseTo(10, 10);
    expect(r.gross).toBeCloseTo(110, 10);
  });

  it("adds the California base rate to 250", () => {
    const r = addTax(250, 7.25);
    expect(r.tax).toBeCloseTo(18.125, 10);
    expect(r.gross).toBeCloseTo(268.125, 10);
  });

  it("returns zeros for a zero price", () => {
    expect(addTax(0, 9.03)).toEqual({ net: 0, tax: 0, gross: 0 });
  });

  it("adds nothing at a zero rate, as in Oregon", () => {
    const r = addTax(80, 0);
    expect(r.tax).toBe(0);
    expect(r.gross).toBe(80);
  });

  it("handles a fractional rate like Minnesota 6.875 percent", () => {
    const r = addTax(200, 6.875);
    expect(r.tax).toBeCloseTo(13.75, 10);
    expect(r.gross).toBeCloseTo(213.75, 10);
  });
});

describe("removeTax", () => {
  it("strips 10 percent back out of 110", () => {
    const r = removeTax(110, 10);
    expect(r.net).toBeCloseTo(100, 10);
    expect(r.tax).toBeCloseTo(10, 10);
    expect(r.gross).toBe(110);
  });

  it("reverses the California average combined rate on 109.03", () => {
    const r = removeTax(109.03, 9.03);
    expect(r.net).toBeCloseTo(100, 8);
    expect(r.tax).toBeCloseTo(9.03, 8);
  });

  it("leaves the amount untouched at a zero rate", () => {
    const r = removeTax(50, 0);
    expect(r.net).toBe(50);
    expect(r.tax).toBe(0);
  });

  it("returns zeros for a zero total", () => {
    expect(removeTax(0, 7)).toEqual({ net: 0, tax: 0, gross: 0 });
  });

  it("round trips: removing what addTax added returns the starting price", () => {
    const added = addTax(199.99, 6.35);
    const back = removeTax(added.gross, 6.35);
    expect(back.net).toBeCloseTo(199.99, 8);
    expect(back.tax).toBeCloseTo(added.tax, 8);
  });

  it("does not equal simply subtracting the percentage from the total", () => {
    const r = removeTax(118, 18);
    expect(r.net).toBeCloseTo(100, 10);
    expect(r.net).not.toBeCloseTo(118 * 0.82, 6);
  });
});
