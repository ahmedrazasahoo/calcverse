import { describe, expect, it } from "vitest";
import { webpOutputName } from "./webp-to-png";

describe("webpOutputName", () => {
  it("renames WebP files to PNG", () => {
    expect(webpOutputName("banner.webp")).toBe("banner.png");
    expect(webpOutputName("sticker.WEBP")).toBe("sticker.png");
    expect(webpOutputName("no-extension")).toBe("no-extension");
  });
});
