import { describe, expect, it } from "vitest";
import { MATERIALS, calculateGravel } from "./gravel";

describe("calculateGravel", () => {
  it("100 sq ft x 3 in pea gravel is 0.926 cu yd and 1.25 tons", () => {
    const r = calculateGravel({ areaSqFt: 100, depthIn: 3, densityTonsPerCuYd: MATERIALS["pea-gravel"].densityTonsPerCuYd });
    expect(r.volumeCuYd).toBeCloseTo(0.926, 3);
    expect(r.tons).toBeCloseTo(1.25, 2);
    expect(r.kg).toBeCloseTo(1133.98, 1);
  });
  it("material densities match the brief", () => {
    expect(MATERIALS["pea-gravel"].densityTonsPerCuYd).toBe(1.35);
    expect(MATERIALS["crushed-stone"].densityTonsPerCuYd).toBe(1.4);
    expect(MATERIALS.sand.densityTonsPerCuYd).toBe(1.33);
    expect(MATERIALS.topsoil.densityTonsPerCuYd).toBe(1.2);
    expect(MATERIALS["river-rock"].densityTonsPerCuYd).toBe(1.5);
  });
  it("length by width matches direct area", () => {
    const a = calculateGravel({ lengthFt: 20, widthFt: 5, depthIn: 3, densityTonsPerCuYd: 1.4 });
    expect(a.areaSqFt).toBe(100);
    expect(a.volumeCuFt).toBe(25);
  });
  it("custom density is used directly", () => {
    const r = calculateGravel({ areaSqFt: 270, depthIn: 12, densityTonsPerCuYd: 2 });
    expect(r.volumeCuYd).toBe(10);
    expect(r.tons).toBe(20);
  });
  it("throws on missing density", () => {
    expect(() => calculateGravel({ areaSqFt: 100, depthIn: 3, densityTonsPerCuYd: 0 })).toThrow(RangeError);
  });
});
