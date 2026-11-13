import { describe, expect, it } from "vitest";
import {
  QUALITY_LADDER,
  clampQuality,
  formatBytes,
  meetsTarget,
  nextQuality,
  reductionPercent,
  replaceExtension,
  targetBytesForKb,
} from "./file-utils";

describe("formatBytes", () => {
  it("formats bytes, kilobytes and megabytes", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(812)).toBe("812 B");
    expect(formatBytes(200 * 1024)).toBe("200 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(2.4 * 1024 * 1024)).toBe("2.4 MB");
  });

  it("handles invalid input", () => {
    expect(formatBytes(-5)).toBe("0 B");
    expect(formatBytes(Number.NaN)).toBe("0 B");
  });
});

describe("target helpers", () => {
  it("converts kilobytes to bytes and checks targets", () => {
    expect(targetBytesForKb(200)).toBe(204800);
    expect(meetsTarget(204800, 200)).toBe(true);
    expect(meetsTarget(204801, 200)).toBe(false);
  });
});

describe("quality loop decisions", () => {
  it("clamps quality into range", () => {
    expect(clampQuality(2)).toBe(1);
    expect(clampQuality(0)).toBe(0.05);
    expect(clampQuality(0.5)).toBe(0.5);
  });

  it("always steps down and never below the floor", () => {
    let q = QUALITY_LADDER[0];
    for (let i = 0; i < 40; i++) {
      const next = nextQuality(q, 900 * 1024, 100 * 1024);
      expect(next).toBeLessThan(q + 0.001);
      expect(next).toBeGreaterThanOrEqual(0.08);
      q = next;
    }
    expect(q).toBe(0.08);
  });

  it("drops faster for a big overshoot than a small one", () => {
    const bigDrop = nextQuality(0.8, 1000 * 1024, 100 * 1024);
    const smallDrop = nextQuality(0.8, 130 * 1024, 100 * 1024);
    expect(bigDrop).toBeLessThan(smallDrop);
  });
});

describe("reductionPercent", () => {
  it("reports savings and growth honestly", () => {
    expect(reductionPercent(1000, 250)).toBe(75);
    expect(reductionPercent(1000, 1000)).toBe(0);
    expect(reductionPercent(1000, 1200)).toBe(-20);
    expect(reductionPercent(0, 100)).toBe(0);
  });
});

describe("replaceExtension", () => {
  it("swaps and adds extensions", () => {
    expect(replaceExtension("photo.heic", "jpg")).toBe("photo.jpg");
    expect(replaceExtension("archive.tar.pdf", ".png")).toBe("archive.tar.png");
    expect(replaceExtension("noext", "zip")).toBe("noext.zip");
  });
});
