/**
 * PDF rotation with pdf-lib. Rotation is stored as a page property, so
 * the turn is permanent when the file is saved or printed, not just a
 * viewer trick. Runs in the browser; the file is never uploaded.
 */

export type RotationAngle = 90 | 180 | 270;

/**
 * Bring any degree value into the 0, 90, 180 or 270 set that PDF page
 * rotation allows. Non right angles round to the nearest quarter turn.
 */
export function normalizeAngle(degrees: number): number {
  if (!Number.isFinite(degrees)) return 0;
  const wrapped = ((Math.round(degrees / 90) * 90) % 360 + 360) % 360;
  return wrapped;
}

/** Combine a page's existing rotation with a requested turn. Pure helper. */
export function combinedRotation(existingDegrees: number, turn: RotationAngle): number {
  return normalizeAngle(normalizeAngle(existingDegrees) + turn);
}

/** Rotate every page of a PDF by the chosen angle and return the new file. */
export async function rotatePdf(file: File, angle: RotationAngle): Promise<Blob> {
  const { PDFDocument, degrees } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  for (const page of doc.getPages()) {
    page.setRotation(degrees(combinedRotation(page.getRotation().angle, angle)));
  }
  const saved = await doc.save({ useObjectStreams: true });
  const out = saved.slice(0);
  return new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
}
