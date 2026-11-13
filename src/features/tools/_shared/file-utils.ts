/**
 * Shared helpers for the browser based file tools.
 *
 * Everything in this file is pure and framework free so it can be unit
 * tested and reused by every file tool module. Files handled by these
 * tools are processed locally in the visitor's browser and are never
 * uploaded to a server.
 */

/** Ordered JPEG quality steps used when shrinking images inside a PDF or
 *  on their own. The loop walks down this ladder until the target size
 *  is met or the ladder runs out. */
export const QUALITY_LADDER: readonly number[] = [0.85, 0.7, 0.55, 0.4, 0.28, 0.18];

/** Smallest quality worth trying. Below this, text in scans turns unreadable. */
export const MIN_QUALITY = 0.08;

/** Convert a target expressed in kilobytes into bytes. */
export function targetBytesForKb(targetKb: number): number {
  return Math.round(targetKb * 1024);
}

/** True when a byte size fits inside a target expressed in kilobytes. */
export function meetsTarget(sizeBytes: number, targetKb: number): boolean {
  return sizeBytes <= targetBytesForKb(targetKb);
}

/** Clamp a JPEG quality value into the usable 0.05 to 1 range. */
export function clampQuality(quality: number): number {
  if (!Number.isFinite(quality)) return 1;
  return Math.min(1, Math.max(0.05, quality));
}

/**
 * Decide the next quality to try after an attempt that is still too big.
 * Uses the size ratio so big overshoots drop quality fast and small
 * overshoots step down gently. Always returns a value lower than the
 * current quality and never below MIN_QUALITY.
 */
export function nextQuality(currentQuality: number, currentSize: number, targetBytes: number): number {
  const current = clampQuality(currentQuality);
  if (currentSize <= 0 || targetBytes <= 0) return clampQuality(current - 0.1);
  const ratio = targetBytes / currentSize;
  const stepped = current * Math.sqrt(ratio) * 0.95;
  const bounded = Math.min(stepped, current - 0.02);
  return Math.max(MIN_QUALITY, clampQuality(bounded));
}

/** Human readable byte size, for example "812 B", "196 KB" or "2.4 MB". */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb >= 100 ? Math.round(kb) : Math.round(kb * 10) / 10} KB`;
  const mb = kb / 1024;
  return `${Math.round(mb * 10) / 10} MB`;
}

/** Percentage of size saved, rounded to one decimal. Negative when the
 *  result is bigger than the original. */
export function reductionPercent(originalBytes: number, resultBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Math.round(((originalBytes - resultBytes) / originalBytes) * 1000) / 10;
}

/** Replace the extension of a file name, keeping the base name intact. */
export function replaceExtension(fileName: string, extension: string): string {
  const clean = extension.replace(/^\./, "");
  const dot = fileName.lastIndexOf(".");
  const base = dot > 0 ? fileName.slice(0, dot) : fileName;
  return `${base}.${clean}`;
}

/** Trigger a browser download for an in-memory blob. */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
