"use client";

import { useMemo, useRef, useState } from "react";
import {
  ErrorNote,
  Field,
  inputClass,
  secondaryButtonClass,
  selectClass,
} from "@/components/ui";
import { encodeBarcode, type BarcodeFormat } from "./barcode";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const QUIET = 10;

function buildSvg(widths: number[], text: string, barHeight: number, scale: number): string {
  const totalUnits = widths.reduce((a, b) => a + b, 0);
  const width = (totalUnits + QUIET * 2) * scale;
  const textHeight = 18;
  const height = barHeight + textHeight + 8;
  let x = QUIET * scale;
  let rects = "";
  widths.forEach((w, i) => {
    if (i % 2 === 0) {
      rects += `<rect x="${x}" y="0" width="${w * scale}" height="${barHeight}" fill="#000000"/>`;
    }
    x += w * scale;
  });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff"/>` +
    rects +
    `<text x="${width / 2}" y="${barHeight + textHeight}" font-family="monospace" font-size="15" fill="#000000" text-anchor="middle" letter-spacing="2">${escapeXml(text)}</text>` +
    `</svg>`
  );
}

const FORMATS: { id: BarcodeFormat; label: string; placeholder: string; hint: string }[] = [
  {
    id: "code128",
    label: "Code 128",
    placeholder: "ABC-1234",
    hint: "Any plain ASCII text. Long even runs of digits use the compact set C automatically.",
  },
  {
    id: "code39",
    label: "Code 39",
    placeholder: "CODE-39",
    hint: "Uppercase letters, digits and - . $ / + % or space.",
  },
  {
    id: "ean13",
    label: "EAN-13",
    placeholder: "590123412345",
    hint: "12 digits and the check digit is added, or a full 13 digits with a valid check digit.",
  },
  {
    id: "upca",
    label: "UPC-A",
    placeholder: "03600029145",
    hint: "11 digits and the check digit is added, or a full 12 digits with a valid check digit.",
  },
];

export default function BarcodeGenerator() {
  const [format, setFormat] = useState<BarcodeFormat>("code128");
  const [value, setValue] = useState("ABC-1234");
  const [code39Checksum, setCode39Checksum] = useState(false);
  const [barHeight, setBarHeight] = useState(64);
  const [scale, setScale] = useState(2);
  const previewRef = useRef<HTMLDivElement>(null);

  const active = FORMATS.find((f) => f.id === format) ?? FORMATS[0];

  const result = useMemo(() => {
    try {
      const encoded = encodeBarcode(format, value, { code39Checksum });
      return { svg: buildSvg(encoded.widths, encoded.text, barHeight, scale), error: null as string | null };
    } catch (err) {
      return { svg: "", error: err instanceof Error ? err.message : String(err) };
    }
  }, [format, value, code39Checksum, barHeight, scale]);

  const downloadSvg = () => {
    const blob = new Blob([result.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barcode-${format}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const svgEl = previewRef.current?.querySelector("svg");
    if (!svgEl) return;
    const serialized = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * 3;
      canvas.height = img.height * 3;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((png) => {
        if (!png) return;
        const pngUrl = URL.createObjectURL(png);
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `barcode-${format}.png`;
        link.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };
    img.src = url;
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Barcode format" htmlFor="barcode-format">
          <select
            id="barcode-format"
            className={selectClass}
            value={format}
            onChange={(e) => setFormat(e.target.value as BarcodeFormat)}
          >
            {FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Value to encode" htmlFor="barcode-value" hint={active.hint}>
          <input
            id="barcode-value"
            className={inputClass}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={active.placeholder}
          />
        </Field>
      </div>

      {format === "code39" && (
        <label className="flex items-center gap-2.5 px-1 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-5 w-5 accent-brand-600"
            checked={code39Checksum}
            onChange={(e) => setCode39Checksum(e.target.checked)}
          />
          Add the optional mod 43 checksum character
        </label>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={`Bar height: ${barHeight}px`} htmlFor="barcode-height">
          <input
            id="barcode-height"
            type="range"
            min={32}
            max={140}
            step={4}
            className="min-h-12 w-full accent-brand-600"
            value={barHeight}
            onChange={(e) => setBarHeight(Number(e.target.value))}
          />
        </Field>
        <Field label={`Module scale: ${scale}x`} htmlFor="barcode-scale">
          <input
            id="barcode-scale"
            type="range"
            min={1}
            max={5}
            step={0.5}
            className="min-h-12 w-full accent-brand-600"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </Field>
      </div>

      {result.error ? (
        <ErrorNote>{result.error}</ErrorNote>
      ) : (
        <div
          ref={previewRef}
          className="glass overflow-x-auto rounded-[2rem] px-6 py-6 text-center"
          dangerouslySetInnerHTML={{ __html: result.svg }}
        />
      )}

      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={secondaryButtonClass} onClick={downloadSvg} disabled={!result.svg}>
          Download SVG
        </button>
        <button type="button" className={secondaryButtonClass} onClick={downloadPng} disabled={!result.svg}>
          Download PNG
        </button>
      </div>
    </div>
  );
}
