import { describe, expect, it } from "vitest";
import {
  bedtimesForWakeUp,
  formatSleepDuration,
  formatTime12h,
  parseClockTime,
  wakeTimesForBedtime,
} from "./sleep";

describe("parseClockTime", () => {
  it("parses padded and short times", () => {
    expect(parseClockTime("07:00")).toEqual({ hours: 7, minutes: 0 });
    expect(parseClockTime("7:05")).toEqual({ hours: 7, minutes: 5 });
    expect(parseClockTime("23:59")).toEqual({ hours: 23, minutes: 59 });
  });

  it("rejects invalid times", () => {
    expect(parseClockTime("24:00")).toBeNull();
    expect(parseClockTime("12:60")).toBeNull();
    expect(parseClockTime("7pm")).toBeNull();
    expect(parseClockTime("")).toBeNull();
  });
});

describe("bedtimesForWakeUp", () => {
  it("counts back whole cycles plus 15 minutes to fall asleep from 07:00", () => {
    const options = bedtimesForWakeUp("07:00");
    const byCycles = new Map(options?.map((o) => [o.cycles, o.time]));
    // 07:00 minus 555 minutes is 21:45, minus 465 is 23:15,
    // minus 375 is 00:45, minus 285 is 02:15.
    expect(byCycles.get(6)).toBe("21:45");
    expect(byCycles.get(5)).toBe("23:15");
    expect(byCycles.get(4)).toBe("00:45");
    expect(byCycles.get(3)).toBe("02:15");
  });

  it("marks five and six cycles as recommended", () => {
    const options = bedtimesForWakeUp("07:00");
    expect(options?.find((o) => o.cycles === 6)?.recommended).toBe(true);
    expect(options?.find((o) => o.cycles === 5)?.recommended).toBe(true);
    expect(options?.find((o) => o.cycles === 3)?.recommended).toBe(false);
    expect(options?.find((o) => o.cycles === 6)?.sleepLabel).toBe("9 h");
  });

  it("returns null for a bad time", () => {
    expect(bedtimesForWakeUp("wake me up")).toBeNull();
  });
});

describe("wakeTimesForBedtime", () => {
  it("counts forward from a 23:00 bedtime", () => {
    const options = wakeTimesForBedtime("23:00");
    const byCycles = new Map(options?.map((o) => [o.cycles, o.time]));
    // 23:00 plus 555 minutes is 08:15, plus 465 is 06:45,
    // plus 375 is 05:15, plus 285 is 03:45.
    expect(byCycles.get(6)).toBe("08:15");
    expect(byCycles.get(5)).toBe("06:45");
    expect(byCycles.get(4)).toBe("05:15");
    expect(byCycles.get(3)).toBe("03:45");
  });
});

describe("formatting helpers", () => {
  it("formats 12 hour times", () => {
    expect(formatTime12h("21:45")).toBe("9:45 PM");
    expect(formatTime12h("00:45")).toBe("12:45 AM");
    expect(formatTime12h("12:00")).toBe("12:00 PM");
    expect(formatTime12h("bad")).toBeNull();
  });

  it("formats sleep durations", () => {
    expect(formatSleepDuration(540)).toBe("9 h");
    expect(formatSleepDuration(450)).toBe("7 h 30 min");
    expect(formatSleepDuration(45)).toBe("45 min");
  });
});
