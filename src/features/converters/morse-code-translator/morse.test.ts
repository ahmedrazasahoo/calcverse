import { describe, expect, it } from "vitest";
import { buildSchedule, morseToText, textToMorse } from "./morse";

describe("textToMorse", () => {
  it("encodes SOS", () => {
    expect(textToMorse("SOS")).toBe("... --- ...");
  });

  it("encodes words with a slash separator and is case insensitive", () => {
    expect(textToMorse("Hello World")).toBe(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
  });

  it("encodes digits and punctuation", () => {
    expect(textToMorse("A1?")).toBe(".- .---- ..--..");
    expect(textToMorse("73")).toBe("--... ...--");
  });
});

describe("morseToText", () => {
  it("decodes SOS", () => {
    expect(morseToText("... --- ...")).toBe("SOS");
  });

  it("round trips a sentence", () => {
    const text = "THE QUICK BROWN FOX 123";
    expect(morseToText(textToMorse(text))).toBe(text);
  });

  it("marks unknown codes with a question mark", () => {
    expect(morseToText(".-.-")).toBe("?");
  });
});

describe("buildSchedule", () => {
  it("schedules a single letter of dits at 20 wpm (dit = 60 ms)", () => {
    expect(buildSchedule("...", 20)).toEqual([
      { on: true, ms: 60 },
      { on: false, ms: 60 },
      { on: true, ms: 60 },
      { on: false, ms: 60 },
      { on: true, ms: 60 },
    ]);
  });

  it("uses 3 dit letter gaps and 3 dit dahs", () => {
    expect(buildSchedule(". -", 20)).toEqual([
      { on: true, ms: 60 },
      { on: false, ms: 180 },
      { on: true, ms: 180 },
    ]);
    const dah = buildSchedule("-", 20);
    expect(dah).toEqual([{ on: true, ms: 180 }]);
  });

  it("uses a 7 dit word gap", () => {
    const schedule = buildSchedule(". / .", 20);
    expect(schedule).toEqual([
      { on: true, ms: 60 },
      { on: false, ms: 420 },
      { on: true, ms: 60 },
    ]);
  });

  it("scales with wpm", () => {
    expect(buildSchedule(".", 10)).toEqual([{ on: true, ms: 120 }]);
    expect(buildSchedule(".", 40)).toEqual([{ on: true, ms: 30 }]);
  });
});
