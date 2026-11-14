/** Pure JSON formatting, validation and conversion helpers. No browser globals. */

export type JsonIndent = 2 | 4 | "tab";

export interface JsonValidation {
  ok: boolean;
  error?: string;
  position?: number;
}

function parseOrThrow(text: string): unknown {
  return JSON.parse(text) as unknown;
}

/** Pretty print JSON text with the chosen indent. Throws the parser error on bad input. */
export function formatJson(text: string, indent: JsonIndent): string {
  const value = parseOrThrow(text);
  return JSON.stringify(value, null, indent === "tab" ? "\t" : indent);
}

/** Compact JSON text with no extra whitespace. Throws the parser error on bad input. */
export function minifyJson(text: string): string {
  const value = parseOrThrow(text);
  return JSON.stringify(value);
}

/** Validate JSON text, surfacing the parser message and its position when extractable. */
export function validateJson(text: string): JsonValidation {
  try {
    JSON.parse(text);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const match = /position\s+(\d+)/i.exec(message);
    const result: JsonValidation = { ok: false, error: message };
    if (match) result.position = Number(match[1]);
    return result;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function csvCell(value: unknown): string {
  let raw: string;
  if (value === null || value === undefined) raw = "";
  else if (typeof value === "object") raw = JSON.stringify(value);
  else raw = String(value);
  if (/[",\n\r]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`;
  return raw;
}

/**
 * Convert an array of objects to CSV. Keys are the union of all object keys in
 * first seen order. Nested objects and arrays are JSON encoded into their cell.
 * Throws a plain Error when the value is not an array of objects.
 */
export function jsonToCsv(value: unknown): string {
  if (!Array.isArray(value)) {
    throw new Error("JSON to CSV needs a top level array of objects.");
  }
  if (value.length === 0) {
    throw new Error("The array is empty, so there are no rows or columns to convert.");
  }
  for (const item of value) {
    if (!isPlainObject(item)) {
      throw new Error("Every item in the array must be an object with named fields.");
    }
  }
  const rows = value as Record<string, unknown>[];
  const keys: string[] = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!keys.includes(key)) keys.push(key);
    }
  }
  const lines = [keys.map(csvCell).join(",")];
  for (const row of rows) {
    lines.push(keys.map((key) => csvCell(row[key])).join(","));
  }
  return lines.join("\n");
}

function escapeXmlText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function xmlLines(value: unknown, tag: string, depth: number): string[] {
  const pad = "  ".repeat(depth);
  if (Array.isArray(value)) {
    const lines: string[] = [];
    for (const item of value) lines.push(...xmlLines(item, tag, depth));
    return lines;
  }
  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return [`${pad}<${tag}/>`];
    const lines = [`${pad}<${tag}>`];
    for (const [key, child] of entries) lines.push(...xmlLines(child, key, depth + 1));
    lines.push(`${pad}</${tag}>`);
    return lines;
  }
  if (value === null || value === undefined) return [`${pad}<${tag}/>`];
  return [`${pad}<${tag}>${escapeXmlText(String(value))}</${tag}>`];
}

/**
 * Convert a JSON value to an indented XML document under the given root element.
 * Object keys become element names and arrays become repeated elements.
 * Attributes are not supported: every value becomes element text or a child element.
 */
export function jsonToXml(value: unknown, rootName: string): string {
  const root = rootName.trim() || "root";
  return xmlLines(value, root, 0).join("\n");
}
