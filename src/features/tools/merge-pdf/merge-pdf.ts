/**
 * PDF merging with pdf-lib. Files are combined in the exact order the
 * user arranges them, entirely in the browser. Nothing is uploaded.
 */

export interface MergeOutcome {
  blob: Blob;
  pageCount: number;
}

/** Move one entry in a list up or down and return the new order. Pure helper. */
export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return [...items];
  const next = [...items];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

/** Combine two or more PDF files into one document, in list order. */
export async function mergePdfFiles(files: File[]): Promise<MergeOutcome> {
  if (files.length < 2) throw new Error("Choose at least two PDF files to merge.");
  const { PDFDocument } = await import("pdf-lib");
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const source = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await merged.copyPages(source, source.getPageIndices());
    for (const page of pages) merged.addPage(page);
  }
  const saved = await merged.save({ useObjectStreams: true });
  const out = saved.slice(0);
  return {
    blob: new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }),
    pageCount: merged.getPageCount(),
  };
}
