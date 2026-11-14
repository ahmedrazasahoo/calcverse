/**
 * Removing pages from a PDF with pdf-lib.
 *
 * The user types the pages to remove, such as "1-3, 5, 8-10", using
 * the same grammar as the split tool. A new PDF is built from every
 * page except those, in the original order. Removing every page is
 * refused, because the result would be an empty file. Everything runs
 * in the browser; the file is never uploaded.
 */

export type RemoveParseResult =
  | { ok: true; pages: number[] }
  | { ok: false; error: string };

/**
 * Parse a pages to remove string against a known page count.
 * Rules match the split tool: page numbers are one based, ranges use
 * a dash, parts are separated by commas, and every page must exist.
 * The result is sorted with duplicates removed. Removing every page
 * of the document is an error.
 */
export function parsePagesToRemove(input: string, pageCount: number): RemoveParseResult {
  const cleaned = input.trim();
  if (cleaned === "") return { ok: false, error: "Type at least one page or range, for example 1-3, 5." };
  if (pageCount < 1) return { ok: false, error: "This PDF has no pages to remove." };

  const found = new Set<number>();
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
    for (let p = start; p <= end; p++) found.add(p);
  }

  const pages = [...found].sort((a, b) => a - b);
  if (pages.length >= pageCount) {
    return { ok: false, error: "That would remove every page. Keep at least one page." };
  }
  return { ok: true, pages };
}

/**
 * One based page numbers that stay in the document, in original
 * order, given the full page count and the set of pages to remove.
 * Pure helper.
 */
export function pagesToKeep(pageCount: number, pagesToRemove: Iterable<number>): number[] {
  const removeSet = new Set(pagesToRemove);
  const kept: number[] = [];
  for (let p = 1; p <= pageCount; p++) {
    if (!removeSet.has(p)) kept.push(p);
  }
  return kept;
}

/** Count the pages of a PDF file without modifying it. */
export async function countPdfPages(file: File): Promise<number> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return doc.getPageCount();
}

export interface RemovePagesResult {
  blob: Blob;
  keptCount: number;
  removedCount: number;
}

/** Build a new PDF with the listed one based pages removed. */
export async function removePages(
  file: File,
  pagesToRemove: number[]
): Promise<RemovePagesResult> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = source.getPageCount();
  const kept = pagesToKeep(pageCount, pagesToRemove);
  if (kept.length === 0) {
    throw new RangeError("That would remove every page. Keep at least one page.");
  }
  const removedCount = pageCount - kept.length;

  const output = await PDFDocument.create();
  const copied = await output.copyPages(
    source,
    kept.map((p) => p - 1)
  );
  for (const page of copied) output.addPage(page);
  const saved = await output.save({ useObjectStreams: true });
  return {
    blob: new Blob([saved.buffer as ArrayBuffer], { type: "application/pdf" }),
    keptCount: kept.length,
    removedCount,
  };
}
