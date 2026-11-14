import { describe, expect, it } from "vitest";
import { calculateCapitalGains, ordinaryTax } from "./capital-gains";

// Hand checks against the 2026 thresholds (IRS Rev. Proc. 2025-32).
// Single filer: long term gains are taxed at 0 percent while total
// taxable income stays up to $49,450, then 15 percent up to $545,500,
// then 20 percent.

describe("calculateCapitalGains", () => {
  it("splits a long term gain across the 0 and 15 percent bands", () => {
    // Other income $40,000 plus a $20,000 long term gain. The gain
    // fills income from $40,000 to $60,000, so $9,450 sits under the
    // $49,450 line at 0 percent and $10,550 is taxed at 15 percent:
    // $10,550 x 0.15 = $1,582.50. Ordinary tax on $40,000 is $4,552.
    const r = calculateCapitalGains({
      filingStatus: "single",
      otherTaxableIncome: 40000,
      shortTerm: 0,
      longTerm: 20000,
      magi: null,
    });
    expect(r.ltAtZero).toBe(9450);
    expect(r.ltAtFifteen).toBe(10550);
    expect(r.ltAtTwenty).toBe(0);
    expect(r.taxOnLongTerm).toBe(1582.5);
    expect(r.ordinaryTaxTotal).toBe(4552);
    expect(r.totalTax).toBe(6134.5);
    expect(r.totalTaxableIncome).toBe(60000);
    expect(r.niit).toBeNull();
  });

  it("taxes the whole gain at 20 percent when income is already above the 15 percent ceiling", () => {
    // Other income $600,000 is already past the $545,500 ceiling, so
    // all $100,000 of gain is taxed at 20 percent = $20,000.
    const r = calculateCapitalGains({
      filingStatus: "single",
      otherTaxableIncome: 600000,
      shortTerm: 0,
      longTerm: 100000,
      magi: null,
    });
    expect(r.ltAtZero).toBe(0);
    expect(r.ltAtFifteen).toBe(0);
    expect(r.ltAtTwenty).toBe(100000);
    expect(r.taxOnLongTerm).toBe(20000);
  });

  it("taxes a short term only gain through the ordinary brackets", () => {
    // Other income $30,000, short term gain $10,000. Ordinary tax on
    // $40,000 is $4,552 and on $30,000 alone is $3,352, so the short
    // term gain itself costs $1,200, all inside the 12 percent band.
    const r = calculateCapitalGains({
      filingStatus: "single",
      otherTaxableIncome: 30000,
      shortTerm: 10000,
      longTerm: 0,
      magi: null,
    });
    expect(r.taxOnShortTerm).toBe(1200);
    expect(r.taxOnLongTerm).toBe(0);
    expect(r.totalTax).toBe(4552);
  });

  it("nets a long term loss against a short term gain", () => {
    // $8,000 short term gain minus a $3,000 long term loss leaves a
    // $5,000 net short term gain and no long term gain.
    const r = calculateCapitalGains({
      filingStatus: "single",
      otherTaxableIncome: 20000,
      shortTerm: 8000,
      longTerm: -3000,
      magi: null,
    });
    expect(r.netShortTerm).toBe(5000);
    expect(r.netLongTerm).toBe(0);
    expect(r.totalTaxableIncome).toBe(25000);
    expect(r.totalTax).toBe(ordinaryTax(25000, "single"));
  });

  it("limits a net loss to $3,000 against other income and carries the rest forward", () => {
    // A $10,000 long term loss: $3,000 offsets other income this year
    // and $7,000 carries forward. Base income falls to $47,000, whose
    // ordinary tax is $1,240 + 12% of $34,600 = $5,392.
    const r = calculateCapitalGains({
      filingStatus: "single",
      otherTaxableIncome: 50000,
      shortTerm: 0,
      longTerm: -10000,
      magi: null,
    });
    expect(r.netLoss).toBe(10000);
    expect(r.lossUsedAgainstIncome).toBe(3000);
    expect(r.lossCarryforward).toBe(7000);
    expect(r.baseTaxableIncome).toBe(47000);
    expect(r.totalTax).toBe(5392);
  });

  it("adds NIIT at 3.8 percent when MAGI passes the joint threshold", () => {
    // MFJ, MAGI $300,000 is $50,000 over the $250,000 threshold, and
    // the net investment gain is $50,000, so NIIT is 3.8% of $50,000
    // = $1,900.
    const r = calculateCapitalGains({
      filingStatus: "mfj",
      otherTaxableIncome: 100000,
      shortTerm: 0,
      longTerm: 50000,
      magi: 300000,
    });
    expect(r.niit).toBe(1900);
    // The gain starts at $100,000 of income, already above the $98,900
    // zero percent ceiling, so it is all taxed at 15 percent.
    expect(r.ltAtZero).toBe(0);
    expect(r.ltAtFifteen).toBe(50000);
    expect(r.taxOnLongTerm).toBe(7500);
  });

  it("charges no NIIT when MAGI is under the threshold", () => {
    const r = calculateCapitalGains({
      filingStatus: "single",
      otherTaxableIncome: 40000,
      shortTerm: 0,
      longTerm: 20000,
      magi: 150000,
    });
    expect(r.niit).toBe(0);
  });

  it("uses the married filing separately 15 percent ceiling of $306,850", () => {
    const r = calculateCapitalGains({
      filingStatus: "mfs",
      otherTaxableIncome: 300000,
      shortTerm: 0,
      longTerm: 20000,
      magi: null,
    });
    // Gain fills $300,000 to $320,000: $6,850 at 15 percent, the
    // remaining $13,150 at 20 percent.
    expect(r.ltAtFifteen).toBe(6850);
    expect(r.ltAtTwenty).toBe(13150);
    expect(r.taxOnLongTerm).toBe(6850 * 0.15 + 13150 * 0.2);
  });

  it("rejects negative other income and a negative MAGI", () => {
    expect(() =>
      calculateCapitalGains({ filingStatus: "single", otherTaxableIncome: -5, shortTerm: 0, longTerm: 0, magi: null }),
    ).toThrow(RangeError);
    expect(() =>
      calculateCapitalGains({ filingStatus: "single", otherTaxableIncome: 0, shortTerm: 0, longTerm: 0, magi: -1 }),
    ).toThrow(RangeError);
  });
});
