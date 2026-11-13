/**
 * QR code payload builders and rendering.
 *
 * A QR code is just text in a square costume, so the interesting logic
 * is building the exact payload string each scanner app expects: a URL
 * as it stands, the WIFI: format phones recognise for joining a
 * network, and the vCard format address books import. Rendering uses
 * the qrcode library onto a data URL for preview and download.
 */

/** Characters that must be escaped inside WIFI payload values. */
const WIFI_SPECIALS = /([\\;,:"'])/g;

/** Escape a value for the WIFI payload format. Pure helper. */
export function escapeWifiValue(value: string): string {
  return value.replace(WIFI_SPECIALS, "\\$1");
}

export type WifiEncryption = "WPA" | "WEP" | "nopass";

/** Build the payload that makes phones offer to join a WiFi network. */
export function buildWifiPayload(input: {
  ssid: string;
  password?: string;
  encryption: WifiEncryption;
  hidden?: boolean;
}): string {
  const parts = [`WIFI:T:${input.encryption}`, `S:${escapeWifiValue(input.ssid)}`];
  if (input.encryption !== "nopass" && input.password) {
    parts.push(`P:${escapeWifiValue(input.password)}`);
  }
  if (input.hidden) parts.push("H:true");
  return parts.join(";") + ";;";
}

export interface VCardInput {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  organisation?: string;
  url?: string;
}

/** Escape a value for vCard text fields. Pure helper. */
export function escapeVCardValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

/** Build a vCard 3.0 contact payload that phones save as a contact. */
export function buildVCardPayload(input: VCardInput): string {
  const fullName = [input.firstName, input.lastName ?? ""].join(" ").trim();
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(input.lastName ?? "")};${escapeVCardValue(input.firstName)};;;`,
    `FN:${escapeVCardValue(fullName)}`,
  ];
  if (input.organisation) lines.push(`ORG:${escapeVCardValue(input.organisation)}`);
  if (input.phone) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(input.phone)}`);
  if (input.email) lines.push(`EMAIL:${escapeVCardValue(input.email)}`);
  if (input.url) lines.push(`URL:${escapeVCardValue(input.url)}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

/** Normalise free text into a link payload, adding https when it looks bare. */
export function buildLinkPayload(text: string): string {
  const trimmed = text.trim();
  if (trimmed === "") return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  if (/^[\w-]+(\.[\w-]+)+/.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

/** Render a payload as a PNG data URL for preview and download. */
export async function renderQrDataUrl(payload: string, size = 512): Promise<string> {
  const QRCode = (await import("qrcode")).default;
  return QRCode.toDataURL(payload, {
    width: size,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#111827", light: "#ffffff" },
  });
}
