import { describe, expect, it } from "vitest";
import { calculateStampDuty, fmtGbp } from "./stamp-duty";

// Hand checks with the slice method. Standard bands from 1 April
// 2025: 0% to £125,000, 2% to £250,000, 5% to £925,000, 10% to
// £1,500,000, 12% above that.

describe("calculateStampDuty standard bands", () => {
  it("charges nothing at £125,000 and nothing extra just above it beyond the 2 percent slice", () => {
    expect(calculateStampDuty({ price: 125000, firstTimeBuyer: false }).totalTax).toBe(0);
    // £130,000: only £5,000 sits in the 2 percent band = £100.
    expect(calculateStampDuty({ price: 130000, firstTimeBuyer: false }).totalTax).toBe(100);
  });

  it("works out £300,000 at standard rates as £5,000", () => {
    // 0 + 2% of £125,000 = £2,500, plus 5% of £50,000 = £2,500.
    const r = calculateStampDuty({ price: 300000, firstTimeBuyer: false });
    expect(r.totalTax).toBe(5000);
    expect(r.reliefLost).toBe(false);
    expect(r.effectiveRatePercent).toBe(1.67);
  });

  it("works out £1,000,000 at standard rates as £43,750", () => {
    // 0 + 2% of £125,000 = £2,500; 5% of £675,000 = £33,750; 10% of
    // £75,000 = £7,500. Total £2,500 + £33,750 + £7,500 = £43,750.
    const r = calculateStampDuty({ price: 1000000, firstTimeBuyer: false });
    expect(r.totalTax).toBe(43750);
    expect(r.breakdown.map((b) => b.tax)).toEqual([0, 2500, 33750, 7500]);
  });

  it("reaches into the 12 percent band at £2,000,000", () => {
    // £2,500 + £33,750 + 10% of £575,000 = £57,500, plus 12% of
    // £500,000 = £60,000. Total £153,750.
    expect(calculateStampDuty({ price: 2000000, firstTimeBuyer: false }).totalTax).toBe(153750);
  });
});

describe("calculateStampDuty first time buyer relief", () => {
  it("charges nothing on a £300,000 first home", () => {
    const r = calculateStampDuty({ price: 300000, firstTimeBuyer: true });
    expect(r.totalTax).toBe(0);
    expect(r.reliefLost).toBe(false);
  });

  it("charges 5 percent only on the slice above £300,000 at £400,000", () => {
    // 5% of (£400,000 - £300,000) = £5,000.
    expect(calculateStampDuty({ price: 400000, firstTimeBuyer: true }).totalTax).toBe(5000);
  });

  it("charges the maximum relief bill of £10,000 at exactly £500,000", () => {
    // 5% of £200,000 = £10,000, and relief still applies at the limit.
    const r = calculateStampDuty({ price: 500000, firstTimeBuyer: true });
    expect(r.totalTax).toBe(10000);
    expect(r.reliefLost).toBe(false);
  });

  it("loses relief completely above £500,000 and falls back to standard bands", () => {
    // £600,000 with relief lost: 2% of £125,000 = £2,500 plus 5% of
    // £350,000 = £17,500, total £20,000, the same as a standard buyer.
    const r = calculateStampDuty({ price: 600000, firstTimeBuyer: true });
    expect(r.reliefLost).toBe(true);
    expect(r.totalTax).toBe(20000);
    expect(r.totalTax).toBe(calculateStampDuty({ price: 600000, firstTimeBuyer: false }).totalTax);
  });
});

describe("fmtGbp", () => {
  it("formats pounds with en-GB grouping and no pence by default", () => {
    expect(fmtGbp(43750)).toBe("£43,750");
    expect(fmtGbp(5000)).toBe("£5,000");
    expect(fmtGbp(0)).toBe("£0");
  });
});

describe("validation", () => {
  it("rejects a zero or negative price", () => {
    expect(() => calculateStampDuty({ price: 0, firstTimeBuyer: false })).toThrow(RangeError);
    expect(() => calculateStampDuty({ price: -100, firstTimeBuyer: true })).toThrow(RangeError);
  });
});
