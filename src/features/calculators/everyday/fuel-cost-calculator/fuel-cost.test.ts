import { describe, expect, it } from "vitest";
import { calculateFuelCost, toLitresPer100Km } from "./fuel-cost";

describe("calculateFuelCost", () => {
  it("works out fuel and cost for a 100 km trip at 15 km per litre", () => {
    // Fuel = 100 km / 15 km per litre = 6.6667 litres. Cost = 6.6667 x 100 = 666.67.
    const result = calculateFuelCost({
      distance: 100,
      distanceUnit: "km",
      efficiency: 15,
      efficiencyUnit: "kmPerLitre",
      fuelPrice: 100,
      priceUnit: "perLitre",
    });
    expect(result.fuelNeededLitres).toBeCloseTo(6.6667, 4);
    expect(result.totalCost).toBeCloseTo(666.67, 2);
    expect(result.costPerDistanceUnit).toBeCloseTo(6.6667, 4);
    expect(result.litresPer100Km).toBeCloseTo(6.6667, 4);
  });

  it("converts 30 mpg US to about 7.84 litres per 100 km", () => {
    // L/100km = 235.215 / 30 = 7.8405.
    expect(toLitresPer100Km(30, "mpgUS")).toBeCloseTo(7.8405, 4);
    const result = calculateFuelCost({
      distance: 100,
      distanceUnit: "km",
      efficiency: 30,
      efficiencyUnit: "mpgUS",
      fuelPrice: 1.5,
      priceUnit: "perLitre",
    });
    expect(result.litresPer100Km).toBeCloseTo(7.84, 2);
    expect(result.fuelNeededLitres).toBeCloseTo(7.8405, 4);
  });

  it("converts miles and a price per US gallon consistently", () => {
    // 100 miles = 160.934 km. At 10 L/100km that is 16.0934 litres.
    // A gallon price of 3.78541 equals exactly 1 per litre, so cost equals litres.
    const result = calculateFuelCost({
      distance: 100,
      distanceUnit: "miles",
      efficiency: 10,
      efficiencyUnit: "litresPer100Km",
      fuelPrice: 3.78541,
      priceUnit: "perGallonUS",
    });
    expect(result.distanceKm).toBeCloseTo(160.934, 3);
    expect(result.fuelNeededLitres).toBeCloseTo(16.0934, 4);
    expect(result.totalCost).toBeCloseTo(16.09, 2);
    expect(result.pricePerLitre).toBeCloseTo(1, 4);
  });

  it("makes a thirstier car cost more over the same trip", () => {
    const efficient = calculateFuelCost({
      distance: 200,
      distanceUnit: "km",
      efficiency: 18,
      efficiencyUnit: "kmPerLitre",
      fuelPrice: 2,
      priceUnit: "perLitre",
    });
    const thirsty = calculateFuelCost({
      distance: 200,
      distanceUnit: "km",
      efficiency: 9,
      efficiencyUnit: "kmPerLitre",
      fuelPrice: 2,
      priceUnit: "perLitre",
    });
    expect(thirsty.totalCost).toBeGreaterThan(efficient.totalCost);
    expect(thirsty.fuelNeededLitres).toBeCloseTo(efficient.fuelNeededLitres * 2, 3);
  });

  it("rejects zero or negative inputs", () => {
    const base = {
      distance: 100,
      distanceUnit: "km" as const,
      efficiency: 15,
      efficiencyUnit: "kmPerLitre" as const,
      fuelPrice: 100,
      priceUnit: "perLitre" as const,
    };
    expect(() => calculateFuelCost({ ...base, distance: 0 })).toThrow(RangeError);
    expect(() => calculateFuelCost({ ...base, efficiency: 0 })).toThrow(RangeError);
    expect(() => calculateFuelCost({ ...base, fuelPrice: -1 })).toThrow(RangeError);
    expect(() => calculateFuelCost({ ...base, distance: Number.NaN })).toThrow(RangeError);
  });
});
