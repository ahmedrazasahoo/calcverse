/**
 * JPG to PDF conversion with pdf-lib. Each image becomes one page.
 * Pages either match the image size exactly, or the image is fitted
 * onto an A4 or Letter sheet with a small margin, which is what most
 * people want for printing and form uploads. Everything runs locally
 * in the browser; images are never uploaded.
 */

export type PageMode = "image" | "a4" | "letter";

export interface PageSize {
  width: number;
  height: number;
}

/** Standard sheet sizes in PDF points (1 point = 1/72 inch). */
export const SHEET_SIZES: Record<Exclude<PageMode, "image">, PageSize> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

/** Margin used when fitting an image onto a standard sheet, in points. */
export const SHEET_MARGIN = 36;

/**
 * Work out the page size and placement for an image.
 * In "image" mode the page matches the image pixel size one to one.
 * In sheet modes the image is scaled to fit inside the sheet margins,
 * keeping its aspect ratio, and centred. Landscape images on a portrait
 * sheet simply get more empty space above and below.
 */
export function placementForImage(
  imageWidth: number,
  imageHeight: number,
  mode: PageMode
): { page: PageSize; draw: { x: number; y: number; width: number; height: number } } {
  if (mode === "image" || imageWidth <= 0 || imageHeight <= 0) {
    return {
      page: { width: Math.max(imageWidth, 1), height: Math.max(imageHeight, 1) },
      draw: { x: 0, y: 0, width: imageWidth, height: imageHeight },
    };
  }
  const sheet = SHEET_SIZES[mode];
  const availableWidth = sheet.width - SHEET_MARGIN * 2;
  const availableHeight = sheet.height - SHEET_MARGIN * 2;
  const scale = Math.min(availableWidth / imageWidth, availableHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return {
    page: { ...sheet },
    draw: {
      x: (sheet.width - width) / 2,
      y: (sheet.height - height) / 2,
      width,
      height,
    },
  };
}

/** Build one PDF with a page per image, in list order. */
export async function imagesToPdf(files: File[], mode: PageMode): Promise<Blob> {
  if (files.length === 0) throw new Error("Choose at least one image.");
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const isPng = file.type === "image/png";
    const image = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const { page: pageSize, draw } = placementForImage(image.width, image.height, mode);
    const page = doc.addPage([pageSize.width, pageSize.height]);
    page.drawImage(image, draw);
  }

  const saved = await doc.save({ useObjectStreams: true });
  const out = saved.slice(0);
  return new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
}
