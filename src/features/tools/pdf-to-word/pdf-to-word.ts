/**
 * PDF to Word conversion, rebuilt from the PDF text layer.
 *
 * Each page is read with pdf.js (loaded lazily, it is a heavy library).
 * Text items are grouped into lines by their position, each line becomes
 * one paragraph, and the paragraphs are packed into a real .docx file
 * with JSZip. A .docx is a zip of XML parts, so no extra library is
 * needed. This rebuilds editable text only: headings, columns, tables
 * and images from the original design are not recreated. Everything
 * runs in the browser; the PDF is never uploaded.
 */

export const DOCX_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Simplified text item shape, so line grouping is testable without pdf.js. */
export interface SimpleTextItem {
  str: string;
  x: number;
  y: number;
  hasEOL?: boolean;
}

/** Escape the five XML special characters. Pure helper. */
export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Group simplified text items into paragraph lines for one page.
 * Items are sorted top to bottom (higher y first, as pdf.js reports
 * positions from the bottom of the page) and items whose y differs by
 * less than 2 points from the first item of the current line belong to
 * that line. Within a line, items are ordered by x and joined with a
 * single space. An item marked hasEOL ends its line. Pure helper.
 */
export function groupTextItems(items: SimpleTextItem[]): string[] {
  const usable = items.filter((item) => item.str.trim() !== "");
  const sorted = [...usable].sort((a, b) => {
    if (Math.abs(a.y - b.y) >= 2) return b.y - a.y;
    return a.x - b.x;
  });

  const lines: string[] = [];
  let current: SimpleTextItem[] = [];
  let lineY: number | null = null;

  const flush = () => {
    if (current.length === 0) return;
    const ordered = [...current].sort((a, b) => a.x - b.x);
    const text = ordered
      .map((item) => item.str.trim())
      .filter((part) => part !== "")
      .join(" ");
    if (text !== "") lines.push(text);
    current = [];
    lineY = null;
  };

  for (const item of sorted) {
    if (lineY === null || Math.abs(item.y - lineY) >= 2) {
      flush();
      lineY = item.y;
    }
    current.push(item);
    if (item.hasEOL) flush();
  }
  flush();
  return lines;
}

/**
 * Build word/document.xml from pages of paragraph lines. Each line is
 * one paragraph, and a page break paragraph sits between pages. Pure
 * helper.
 */
export function buildDocumentXml(pages: string[][]): string {
  const body: string[] = [];
  pages.forEach((lines, pageIndex) => {
    if (pageIndex > 0) {
      body.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
    }
    for (const line of lines) {
      body.push(
        `<w:p><w:r><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`
      );
    }
  });
  return (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
    `<w:body>${body.join("")}</w:body></w:document>`
  );
}

const CONTENT_TYPES_XML =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
  '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
  '<Default Extension="xml" ContentType="application/xml"/>' +
  '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.main+xml"/>' +
  "</Types>";

const ROOT_RELS_XML =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
  '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
  "</Relationships>";

const DOCUMENT_RELS_XML =
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
  '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>';

let workerReady = false;

/** Extract the text of a PDF as pages of paragraph lines, using pdf.js. */
export async function extractTextPages(
  file: File,
  onProgress?: (page: number, total: number) => void
): Promise<string[][]> {
  const pdfjs = await import("pdfjs-dist");
  if (!workerReady) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    workerReady = true;
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;

  const pages: string[][] = [];
  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const items: SimpleTextItem[] = [];
      for (const raw of textContent.items) {
        const item = raw as {
          str?: unknown;
          transform?: unknown;
          hasEOL?: unknown;
        };
        if (typeof item.str !== "string") continue;
        const transform = Array.isArray(item.transform) ? item.transform : [];
        items.push({
          str: item.str,
          x: typeof transform[4] === "number" ? transform[4] : 0,
          y: typeof transform[5] === "number" ? transform[5] : 0,
          hasEOL: item.hasEOL === true,
        });
      }
      pages.push(groupTextItems(items));
      page.cleanup();
      onProgress?.(pageNumber, pdf.numPages);
    }
  } finally {
    await loadingTask.destroy();
  }
  return pages;
}

/** Convert a PDF into an editable Word document rebuilt from its text. */
export async function convertPdfToWord(
  file: File,
  onProgress?: (page: number, total: number) => void
): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const pages = await extractTextPages(file, onProgress);
  const zip = new JSZip();
  zip.file("[Content_Types].xml", CONTENT_TYPES_XML);
  zip.file("_rels/.rels", ROOT_RELS_XML);
  zip.file("word/document.xml", buildDocumentXml(pages));
  zip.file("word/_rels/document.xml.rels", DOCUMENT_RELS_XML);
  return zip.generateAsync({ type: "blob", mimeType: DOCX_MIME_TYPE });
}
