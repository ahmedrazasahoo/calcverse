/**
 * SVG to PNG conversion.
 *
 * SVG is a vector format: the file describes shapes, not pixels, so it
 * can be rendered at any size. This module reads the intrinsic size
 * from the SVG markup (pure string parsing, unit tested), works out
 * the exact output size from the visitor's width, height or scale
 * choice, and renders the SVG through an image element into a canvas
 * at exactly those pixels.
 *
 * Two honest limits of rendering SVG as an image: scripts inside the
 * SVG never run (the browser treats it as a picture, not a document),
 * and external references inside the file, such as linked images,
 * fonts or stylesheets, do not load. Self contained SVGs with inline
 * shapes and fills convert exactly. Runs entirely in the browser;
 * files are never uploaded.
 */

import { convertImage, type ConvertedImage, type ImageSize } from "../png-to-jpg/engine";
import { replaceExtension } from "../_shared/file-utils";

export interface SvgIntrinsicSize {
  width: number;
  height: number;
}

/** Parse a length attribute such as "240", "240px" into pixels.
 *  Returns null for percentages and other units a raster size cannot
 *  be derived from directly. */
export function parseSvgLength(value: string | undefined): number | null {
  if (value === undefined) return null;
  const match = /^\s*(\d+(?:\.\d+)?)\s*(px)?\s*$/.exec(value);
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Read the attributes of the opening svg tag as a name to value map. */
function svgTagAttributes(svg: string): Map<string, string> {
  const attrs = new Map<string, string>();
  const tagMatch = /<svg\b[^>]*>/i.exec(svg);
  if (!tagMatch) return attrs;
  const attrPattern = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m: RegExpExecArray | null;
  while ((m = attrPattern.exec(tagMatch[0])) !== null) {
    attrs.set(m[1].toLowerCase(), m[2] ?? m[3] ?? "");
  }
  return attrs;
}

/** Parse the viewBox into its width and height, or null when absent or invalid. */
export function parseSvgViewBox(svg: string): SvgIntrinsicSize | null {
  const raw = svgTagAttributes(svg).get("viewbox");
  if (raw === undefined) return null;
  const parts = raw
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  const [, , width, height] = parts;
  if (width <= 0 || height <= 0) return null;
  return { width, height };
}

/**
 * Work out the intrinsic size of an SVG document: the width and
 * height attributes when both are plain pixel lengths, otherwise the
 * viewBox size, combining one attribute with the viewBox aspect ratio
 * when only one attribute is present. Null when the markup carries no
 * usable size at all.
 */
export function parseSvgIntrinsicSize(svg: string): SvgIntrinsicSize | null {
  const attrs = svgTagAttributes(svg);
  const attrWidth = parseSvgLength(attrs.get("width"));
  const attrHeight = parseSvgLength(attrs.get("height"));
  const viewBox = parseSvgViewBox(svg);
  if (attrWidth !== null && attrHeight !== null) {
    return { width: attrWidth, height: attrHeight };
  }
  if (viewBox) {
    if (attrWidth !== null) {
      return { width: attrWidth, height: (attrWidth * viewBox.height) / viewBox.width };
    }
    if (attrHeight !== null) {
      return { width: (attrHeight * viewBox.width) / viewBox.height, height: attrHeight };
    }
    return viewBox;
  }
  return null;
}

export interface SvgOutputOptions {
  /** Exact output width in pixels, or null to derive it. */
  width?: number | null;
  /** Exact output height in pixels, or null to derive it. */
  height?: number | null;
  /** Scale factor applied to the intrinsic size when neither an exact
   *  width nor an exact height is given. Defaults to 1. */
  scale?: number;
}

/**
 * Compute the exact PNG size. An exact width and height win together.
 * One exact side derives the other from the intrinsic aspect ratio.
 * With neither, the intrinsic size is multiplied by the scale factor.
 * Returns null when there is not enough information, for example an
 * SVG with no intrinsic size and only one exact side.
 */
export function computeOutputSize(
  intrinsic: SvgIntrinsicSize | null,
  options: SvgOutputOptions
): ImageSize | null {
  const width = options.width ?? null;
  const height = options.height ?? null;
  if (width !== null && width > 0 && height !== null && height > 0) {
    return { width: Math.round(width), height: Math.round(height) };
  }
  if (!intrinsic) return null;
  if (width !== null && width > 0) {
    return {
      width: Math.round(width),
      height: Math.max(1, Math.round((width * intrinsic.height) / intrinsic.width)),
    };
  }
  if (height !== null && height > 0) {
    return {
      width: Math.max(1, Math.round((height * intrinsic.width) / intrinsic.height)),
      height: Math.round(height),
    };
  }
  const scale = options.scale !== undefined && options.scale > 0 ? options.scale : 1;
  return {
    width: Math.max(1, Math.round(intrinsic.width * scale)),
    height: Math.max(1, Math.round(intrinsic.height * scale)),
  };
}

/** Output file name for a converted SVG. Pure helper. */
export function svgToPngName(fileName: string): string {
  return replaceExtension(fileName, "png");
}

/**
 * Render SVG markup to a PNG blob at an exact size. The optional
 * background colour is painted first; omit it for a transparent PNG.
 */
export async function convertSvgToPng(
  svgText: string,
  size: ImageSize,
  background?: string
): Promise<ConvertedImage> {
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    return await convertImage(url, {
      mimeType: "image/png",
      background,
      width: size.width,
      height: size.height,
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
