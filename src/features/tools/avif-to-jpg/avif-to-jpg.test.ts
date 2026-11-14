import { describe, expect, it } from "vitest";
import { JPG_QUALITY, avifOutputName } from "./avif-to-jpg";

// File name mapping: strip the final .avif extension (any case) and
// replace it with .jpg; a name with no extension gains .jpg so the
// download still opens as a JPEG; earlier dots in the name are kept.
describe("avifOutputName", () => {
  it("renames a lower case AVIF file to JPG", () => {
    expect(avifOutputName("photo.avif")).toBe("photo.jpg");
  });

  it("renames an upper case AVIF file to JPG", () => {
    expect(avifOutputName("photo.AVIF")).toBe("photo.jpg");
    expect(avifOutputName("screenshot.Avif")).toBe("screenshot.jpg");
  });

  it("adds a JPG extension when the name has none", () => {
    expect(avifOutputName("no-extension")).toBe("no-extension.jpg");
  });

  it("keeps earlier dots and only replaces the final extension", () => {
    expect(avifOutputName("my.holiday.photo.avif")).toBe("my.holiday.photo.jpg");
    expect(avifOutputName("archive.tar.avif")).toBe("archive.tar.jpg");
  });

  it("replaces a different final extension with JPG", () => {
    expect(avifOutputName("image.png")).toBe("image.jpg");
  });
});

describe("JPG_QUALITY", () => {
  it("is the stated 0.92 quality constant", () => {
    expect(JPG_QUALITY).toBe(0.92);
    expect(JPG_QUALITY).toBeGreaterThan(0);
    expect(JPG_QUALITY).toBeLessThanOrEqual(1);
  });
});
