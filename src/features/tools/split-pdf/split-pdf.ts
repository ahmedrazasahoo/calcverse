/**
 * PDF splitting with pdf-lib, packaged with JSZip.
 *
 * The user types page ranges such as "1-3, 5, 8-10". Each comma
 * separated part becomes one PDF inside the downloaded zip file.
 * Everything runs in the browser; the file is never uploaded.
 */

export interface RangeGroup {
  /** One based page numbers, inclusive and in order. */
  pages: number[];
  /** Original label from the user, used in the output file name. */
  label: string;
}

export type RangeParseResult = { ok: true; groups: RangeGroup[] } | { ok: false; error: string };

/**
 * Parse a range string against a known page count.
 * Rules: page numbers are one based, ranges use a dash, parts are
 * separated by commas, and every page must exist in the document.
 */
export function parsePageRanges(input: string, pageCount: number): RangeParseResult {
  const cleaned = input.trim();
  if (cleaned === "") return { ok: false, error: "Type at least one page or range, for example 1-3, 5." };
  if (pageCount < 1) return { ok: false, error: "This PDF has no pages to split." };

  const groups: RangeGroup[] = [];
  for (const part of cleaned.split(",")) {
    const piece = part.trim();
    if (piece === "") return { ok: false, error: "Remove the empty section between commas." };
    const match = piece.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
    if (!match) return { ok: false, error: `"${piece}" is not a page or a range like 4-7.` };
    const start = Number(match[1]);
    const end = match[2] !== undefined ? Number(match[2]) : start;
    if (start < 1 || end < 1) return { ok: false, error: "Page numbers start at 1." };
    if (end < start) return { ok: false, error: `"${piece}" runs backwards. Put the smaller page first.` };
    if (end > pageCount) return { ok: false, error: `This PDF has ${pageCount} pages, so page ${end} does not exist.` };
    const pages: number[] = [];
    for (let p = start; p <= end; p++) pages.push(p);
    groups.push({ pages, label: start === end ? `page-${start}` : `pages-${start}-${end}` });
  }
  return { ok: true, groups };
}

/** Count the pages of a PDF file without modifying it. */
export async function countPdfPages(file: File): Promise<number> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return doc.getPageCount();
}

/** Split a PDF into one file per range group and zip the results. */
export async function splitPdf(file: File, groups: RangeGroup[]): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const JSZip = (await import("jszip")).default;
  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const base = file.name.replace(/\.pdf$/i, "");
  const zip = new JSZip();

  for (const group of groups) {
    const part = await PDFDocument.create();
    const indices = group.pages.map((p) => p - 1);
    const copied = await part.copyPages(source, indices);
    for (const page of copied) part.addPage(page);
    const saved = await part.save({ useObjectStreams: true });
    zip.file(`${base}-${group.label}.pdf`, saved);
  }
  return zip.generateAsync({ type: "blob", mimeType: "application/zip" });
}
