/**
 * PDF to JPG conversion. Each page is rendered with pdf.js (loaded
 * lazily, it is a heavy library) onto a canvas at the chosen
 * resolution, exported as a JPEG, and bundled into one zip file with
 * JSZip. Rendering happens in the browser; the PDF is never uploaded.
 */

export type PdfJpgQuality = "standard" | "high" | "print";

/** Render scale for each quality level. Scale 1 equals 72 DPI. Pure helper. */
export function scaleForQuality(quality: PdfJpgQuality): number {
  switch (quality) {
    case "standard":
      return 1.5;
    case "high":
      return 2.5;
    case "print":
      return 4;
  }
}

/** Output image file name for a page, zero padded so lists sort correctly. */
export function pageImageName(baseName: string, pageNumber: number, totalPages: number): string {
  const width = String(totalPages).length;
  return `${baseName}-page-${String(pageNumber).padStart(width, "0")}.jpg`;
}

let workerReady = false;

/** Convert every page of a PDF to a JPG and return a zip blob. */
export async function pdfToJpgZip(
  file: File,
  quality: PdfJpgQuality,
  onProgress?: (page: number, total: number) => void
): Promise<Blob> {
  const pdfjs = await import("pdfjs-dist");
  if (!workerReady) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    workerReady = true;
  }
  const JSZip = (await import("jszip")).default;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const base = file.name.replace(/\.pdf$/i, "");
  const zip = new JSZip();
  const scale = scaleForQuality(quality);

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not available in this browser.");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
      if (!blob) throw new Error(`Page ${pageNumber} could not be rendered.`);
      zip.file(pageImageName(base, pageNumber, pdf.numPages), blob);
      page.cleanup();
      onProgress?.(pageNumber, pdf.numPages);
    }
  } finally {
    await loadingTask.destroy();
  }

  return zip.generateAsync({ type: "blob", mimeType: "application/zip" });
}
