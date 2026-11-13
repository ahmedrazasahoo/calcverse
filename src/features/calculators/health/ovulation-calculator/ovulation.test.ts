import { describe, expect, it } from "vitest";
import { addDays, estimateOvulation, parseIsoDate } from "./ovulation";

describe("parseIsoDate", () => {
  it("accepts a real date", () => {
    expect(parseIsoDate("2026-01-01")).toEqual({ y: 2026, m: 1, d: 1 });
  });

  it("rejects impossible and malformed dates", () => {
    expect(parseIsoDate("2026-02-30")).toBeNull();
    expect(parseIsoDate("2026-13-01")).toBeNull();
    expect(parseIsoDate("01/01/2026")).toBeNull();
    expect(parseIsoDate("")).toBeNull();
  });
});

describe("addDays", () => {
  it("crosses month and year boundaries", () => {
    expect(addDays("2026-01-30", 3)).toBe("2026-02-02");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2024-03-01", -1)).toBe("2024-02-29");
  });
});

describe("estimateOvulation with a 28 day cycle", () => {
  // Last period 1 January 2026, ovulation expected 14 days later.
  const result = estimateOvulation("2026-01-01", 28);

  it("places ovulation 14 days after the last period", () => {
    expect(result?.ovulationDate).toBe("2026-01-15");
  });

  it("opens the fertile window five days before ovulation", () => {
    expect(result?.fertileWindowStart).toBe("2026-01-10");
    expect(result?.fertileWindowEnd).toBe("2026-01-16");
    expect(result?.peakFertileStart).toBe("2026-01-14");
    expect(result?.peakFertileEnd).toBe("2026-01-15");
  });

  it("predicts the next period and the following ovulation", () => {
    expect(result?.nextPeriodDate).toBe("2026-01-29");
    expect(result?.followingOvulationDate).toBe("2026-02-12");
  });
});

describe("estimateOvulation with other cycle lengths", () => {
  it("shifts ovulation later in a 35 day cycle", () => {
    // Ovulation is cycle length minus 14: day 21 of the cycle.
    expect(estimateOvulation("2026-01-01", 35)?.ovulationDate).toBe("2026-01-22");
  });

  it("shifts ovulation earlier in a 24 day cycle", () => {
    expect(estimateOvulation("2026-01-01", 24)?.ovulationDate).toBe("2026-01-11");
  });

  it("rejects cycle lengths outside 21 to 45 days", () => {
    expect(estimateOvulation("2026-01-01", 20)).toBeNull();
    expect(estimateOvulation("2026-01-01", 46)).toBeNull();
    expect(estimateOvulation("2026-01-01", 28.5)).toBeNull();
  });

  it("rejects invalid dates", () => {
    expect(estimateOvulation("2026-02-30", 28)).toBeNull();
    expect(estimateOvulation("not-a-date", 28)).toBeNull();
  });
});
