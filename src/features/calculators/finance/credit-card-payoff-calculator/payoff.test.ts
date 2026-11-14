import { describe, expect, it } from "vitest";
import { compareStrategies, minimumDue, monthLabel, monthlyInterest, simulatePayoff, totalFirstMinimums } from "./payoff";

const START = { year: 2026, month: 10 }; // November 2026

describe("helpers", () => {
  it("computes monthly interest as balance times APR over 1200", () => {
    expect(monthlyInterest(300, 12)).toBe(3);
    expect(monthlyInterest(1000, 24)).toBe(20);
  });

  it("computes the minimum due with the floor and percent rules", () => {
    // Interest 20 plus 2 percent of 1000 (20) is 40, above the 25 floor.
    expect(minimumDue(1000, 24, { name: "A", balance: 1000, aprPercent: 24 })).toBe(40);
    // Small balance: interest 1 plus 2 percent of 100 (2) is 3, so the 25 floor wins.
    expect(minimumDue(100, 12, { name: "A", balance: 100, aprPercent: 12 })).toBe(25);
  });

  it("labels payoff months from the start month", () => {
    expect(monthLabel(START, 1)).toBe("November 2026");
    expect(monthLabel(START, 3)).toBe("January 2027");
    expect(monthLabel(START, 14)).toBe("December 2027");
  });

  it("totals the first month minimums", () => {
    expect(totalFirstMinimums([{ name: "A", balance: 1000, aprPercent: 24 }])).toBe(40);
  });
});

// Hand checked small simulation from the brief, fixed budget strategy:
// Card: 300 at 12 percent APR, budget 100 per month.
// Month 1: interest 3.00, balance 303, pay 100, left 203.
// Month 2: interest 2.03, balance 205.03, pay 100, left 105.03.
// Month 3: interest 1.05, balance 106.08, pay 106.08, done.
// Total interest 6.08, total paid 306.08, debt free in 3 months.
describe("fixed budget strategy against the hand checked simulation", () => {
  const cards = [{ name: "Test card", balance: 300, aprPercent: 12 }];

  it("avalanche clears the card in 3 months with 6.08 interest", () => {
    const r = simulatePayoff(cards, "avalanche", 100, START);
    expect(r.error).toBeNull();
    expect(r.notPayable).toBe(false);
    expect(r.months).toBe(3);
    expect(r.totalInterest).toBeCloseTo(6.08, 2);
    expect(r.totalPaid).toBeCloseTo(306.08, 2);
    expect(r.payoffOrder).toEqual([{ name: "Test card", month: 3, monthLabel: "January 2027" }]);
  });

  it("snowball matches avalanche for a single card", () => {
    const r = simulatePayoff(cards, "snowball", 100, START);
    expect(r.months).toBe(3);
    expect(r.totalInterest).toBeCloseTo(6.08, 2);
  });

  it("checks the 1000 at 24 percent with 100 budget case runs and clears", () => {
    const r = simulatePayoff([{ name: "Big", balance: 1000, aprPercent: 24 }], "avalanche", 100, START);
    expect(r.error).toBeNull();
    expect(r.notPayable).toBe(false);
    expect(r.months).toBeGreaterThan(3);
    expect(r.totalPaid).toBeCloseTo(1000 + r.totalInterest, 2);
  });
});

describe("minimums only strategy", () => {
  it("clears a small card and reports the payoff month", () => {
    const r = simulatePayoff([{ name: "Small", balance: 100, aprPercent: 12 }], "minimums", null, START);
    expect(r.error).toBeNull();
    expect(r.notPayable).toBe(false);
    // Minimum is the 25 floor each month: month 1 interest 1, pay 25, left 76.
    // Month 2 interest 0.76, pay 25, left 51.76. Month 3 interest 0.52, pay 25, left 27.28.
    // Month 4 interest 0.27, pay 25, left 2.55. Month 5 interest 0.03, pay 2.58, done.
    expect(r.months).toBe(5);
    expect(r.payoffOrder[0].monthLabel).toBe("March 2027");
  });
});

describe("not payable and validation states", () => {
  it("flags a minimum payment that never covers the interest", () => {
    // Interest is 20 a month. Minimum percent 0 and floor 10 give a due of
    // max(10, 0 plus 20) = 20, exactly the interest, so the balance never falls.
    const r = simulatePayoff(
      [{ name: "Trap", balance: 1000, aprPercent: 24, minPaymentPercent: 0, minPaymentFloor: 10 }],
      "minimums",
      null,
      START,
    );
    expect(r.notPayable).toBe(true);
  });

  it("rejects a budget that does not beat the total minimums", () => {
    const r = simulatePayoff([{ name: "A", balance: 1000, aprPercent: 24 }], "avalanche", 40, START);
    expect(r.error).not.toBeNull();
    expect(r.error).toContain("must be more than");
  });

  it("rejects empty and all zero card lists", () => {
    expect(simulatePayoff([], "minimums", null, START).error).not.toBeNull();
    expect(
      simulatePayoff([{ name: "A", balance: 0, aprPercent: 10 }], "minimums", null, START).error,
    ).not.toBeNull();
  });
});

describe("avalanche versus snowball ordering", () => {
  it("avalanche targets the highest APR card and snowball the smallest balance", () => {
    const cards = [
      { name: "Small low rate", balance: 400, aprPercent: 6 },
      { name: "Big high rate", balance: 1200, aprPercent: 30 },
    ];
    const results = compareStrategies(cards, 300, START);
    expect(results).toHaveLength(3);
    const avalanche = results[1];
    const snowball = results[2];
    expect(avalanche.error).toBeNull();
    expect(snowball.error).toBeNull();
    // With a shared budget, the targeted card should clear first in each method.
    expect(avalanche.payoffOrder[0].name).toBe("Big high rate");
    expect(snowball.payoffOrder[0].name).toBe("Small low rate");
    // Avalanche should cost no more interest than snowball here.
    expect(avalanche.totalInterest).toBeLessThanOrEqual(snowball.totalInterest);
  });
});
