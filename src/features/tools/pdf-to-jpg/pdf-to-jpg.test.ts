import { describe, expect, it } from "vitest";
import { pageImageName, scaleForQuality } from "./pdf-to-jpg";

describe("scaleForQuality", () => {
  it("rises with the quality level", () => {
    expect(scaleForQuality("standard")).toBeLessThan(scaleForQuality("high"));
    expect(scaleForQuality("high")).toBeLessThan(scaleForQuality("print"));
  });
});

describe("pageImageName", () => {
  it("pads page numbers so file lists sort in order", () => {
    expect(pageImageName("report", 2, 9)).toBe("report-page-2.jpg");
    expect(pageImageName("report", 2, 40)).toBe("report-page-02.jpg");
    expect(pageImageName("report", 12, 120)).toBe("report-page-012.jpg");
  });
});
