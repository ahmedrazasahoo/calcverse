import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { mergePdfFiles } from "../merge-pdf/merge-pdf";
import { parsePageRanges, splitPdf } from "../split-pdf/split-pdf";
import { rotatePdf } from "../rotate-pdf/rotate-pdf";
import { imagesToPdf } from "../jpg-to-pdf/jpg-to-pdf";

// 1x1 white JPEG fixture.
const JPEG_B64 =
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AvwEf/9k=";

async function makePdf(pages: number): Promise<File> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pages; i++) doc.addPage([300, 400]);
  const bytes = await doc.save();
  const copy = bytes.slice(0);
  return new File([copy.buffer as ArrayBuffer], "sample.pdf", { type: "application/pdf" });
}

describe("PDF engine integration", () => {
  it("merges two PDFs", async () => {
    const merged = await mergePdfFiles([await makePdf(2), await makePdf(3)]);
    expect(merged.pageCount).toBe(5);
    expect(merged.blob.size).toBeGreaterThan(0);
  });

  it("splits a PDF into a zip", async () => {
    const file = await makePdf(4);
    const parsed = parsePageRanges("1-2, 4", 4);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      const zip = await splitPdf(file, parsed.groups);
      expect(zip.size).toBeGreaterThan(100);
    }
  });

  it("rotates a PDF", async () => {
    const blob = await rotatePdf(await makePdf(1), 90);
    const doc = await PDFDocument.load(await blob.arrayBuffer());
    expect(doc.getPage(0).getRotation().angle).toBe(90);
  });

  it("builds a PDF from a JPEG image", async () => {
    const jpegBytes = Uint8Array.from(atob(JPEG_B64), (c) => c.charCodeAt(0));
    const copy = jpegBytes.slice(0);
    const imageFile = new File([copy.buffer as ArrayBuffer], "dot.jpg", { type: "image/jpeg" });
    const blob = await imagesToPdf([imageFile], "a4");
    const doc = await PDFDocument.load(await blob.arrayBuffer());
    expect(doc.getPageCount()).toBe(1);
    const page = doc.getPage(0);
    expect(Math.round(page.getWidth())).toBe(595);
  });
});
