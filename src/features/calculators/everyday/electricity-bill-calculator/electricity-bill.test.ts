import { describe, expect, it } from "vitest";
import { applianceCost, billFromTiers, billFromUnits } from "./electricity-bill";

describe("billFromUnits", () => {
  it("adds the fixed charge on top of the energy charge", () => {
    // Energy = 350 x 0.30 = 105, plus fixed 5, tax 0, total 110.
    const result = billFromUnits({ unitsKwh: 350, ratePerUnit: 0.3, fixedCharge: 5, taxPercent: 0 });
    expect(result.energyCharge).toBe(105);
    expect(result.total).toBe(110);
  });

  it("applies tax to the subtotal of energy plus fixed charge", () => {
    // Subtotal = 100 x 0.30 + 5 = 35, tax at 20 percent = 7, total 42.
    const result = billFromUnits({ unitsKwh: 100, ratePerUnit: 0.3, fixedCharge: 5, taxPercent: 20 });
    expect(result.subtotal).toBe(35);
    expect(result.taxAmount).toBe(7);
    expect(result.total).toBe(42);
  });

  it("returns just the fixed charge at zero units", () => {
    const result = billFromUnits({ unitsKwh: 0, ratePerUnit: 0.3, fixedCharge: 5 });
    expect(result.energyCharge).toBe(0);
    expect(result.total).toBe(5);
  });

  it("rejects negative inputs", () => {
    expect(() => billFromUnits({ unitsKwh: -1, ratePerUnit: 0.3 })).toThrow(RangeError);
    expect(() => billFromUnits({ unitsKwh: 10, ratePerUnit: -0.3 })).toThrow(RangeError);
    expect(() => billFromUnits({ unitsKwh: 10, ratePerUnit: 0.3, taxPercent: -5 })).toThrow(RangeError);
  });
});

describe("billFromTiers", () => {
  it("prices units progressively across two tiers", () => {
    // First 100 units at 0.20 = 20, remaining 150 at 0.35 = 52.50, energy charge 72.50.
    const result = billFromTiers(250, [
      { upTo: 100, rate: 0.2 },
      { upTo: null, rate: 0.35 },
    ]);
    expect(result.energyCharge).toBe(72.5);
    expect(result.total).toBe(72.5);
    expect(result.breakdown).toEqual([
      { units: 100, rate: 0.2, amount: 20 },
      { units: 150, rate: 0.35, amount: 52.5 },
    ]);
  });

  it("stays inside the first tier when usage is low", () => {
    const result = billFromTiers(60, [
      { upTo: 100, rate: 0.2 },
      { upTo: null, rate: 0.35 },
    ]);
    expect(result.energyCharge).toBe(12);
    expect(result.breakdown).toHaveLength(1);
  });

  it("rejects tiers that are not ascending or leave units unpriced", () => {
    expect(() =>
      billFromTiers(250, [
        { upTo: 200, rate: 0.2 },
        { upTo: 100, rate: 0.35 },
        { upTo: null, rate: 0.4 },
      ]),
    ).toThrow(RangeError);
    expect(() => billFromTiers(250, [{ upTo: 100, rate: 0.2 }])).toThrow(RangeError);
    expect(() => billFromTiers(10, [])).toThrow(RangeError);
    expect(() => billFromTiers(10, [{ upTo: null, rate: -1 }])).toThrow(RangeError);
  });
});

describe("applianceCost", () => {
  it("works out monthly energy and cost for a 100 W appliance", () => {
    // kWh = 100 / 1000 x 10 hours x 30 days = 30 kWh. Cost = 30 x 0.30 = 9.00.
    const result = applianceCost({ watts: 100, hoursPerDay: 10, daysPerMonth: 30, ratePerUnit: 0.3 });
    expect(result.monthlyKwh).toBe(30);
    expect(result.monthlyCost).toBe(9);
  });

  it("scales with power: a 2000 W heater costs twenty times a 100 W bulb at the same use", () => {
    const bulb = applianceCost({ watts: 100, hoursPerDay: 5, daysPerMonth: 30, ratePerUnit: 0.3 });
    const heater = applianceCost({ watts: 2000, hoursPerDay: 5, daysPerMonth: 30, ratePerUnit: 0.3 });
    expect(heater.monthlyCost).toBeCloseTo(bulb.monthlyCost * 20, 2);
  });

  it("rejects invalid appliance inputs", () => {
    expect(() => applianceCost({ watts: 0, hoursPerDay: 10, daysPerMonth: 30, ratePerUnit: 0.3 })).toThrow(RangeError);
    expect(() => applianceCost({ watts: 100, hoursPerDay: 25, daysPerMonth: 30, ratePerUnit: 0.3 })).toThrow(RangeError);
    expect(() => applianceCost({ watts: 100, hoursPerDay: 10, daysPerMonth: 0, ratePerUnit: 0.3 })).toThrow(RangeError);
  });
});
