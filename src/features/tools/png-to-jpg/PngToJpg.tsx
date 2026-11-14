"use client";

import { useEffect, useRef, useState } from "react";
import { Field, ResultCard, inputClass, primaryButtonClass, Select } from "@/components/ui";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes, reductionPercent } from "../_shared/file-utils";
import { loadImage, type ConvertedImage } from "./engine";
import { convertPngToJpg, pngToJpgName } from "./png-to-jpg";

type BgChoice = "white" | "black" | "custom";

export default function PngToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [quality, setQuality] = useState(92);
  const [bgChoice, setBgChoice] = useState<BgChoice>("white");
  const [customBg, setCustomBg] = useState("#f5c542");
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const resultUrlRef = useRef("");

  const background = bgChoice === "white" ? "#ffffff" : bgChoice === "black" ? "#000000" : customBg;

  const pickFile = async (picked: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = "";
    setResultUrl("");
    setResult(null);
    setError("");
    setFile(picked);
    setPreviewUrl(URL.createObjectURL(picked));
    try {
      const img = await loadImage(picked);
      setNatural({ width: img.naturalWidth, height: img.naturalHeight });
    } catch {
      setNatural(null);
      setError("This file could not be read as an image. PNG works best, and any image your browser can open is accepted.");
    }
  };

  useEffect(() => {
    if (!file || !natural) return;
    let cancelled = false;
    setWorking(true);
    convertPngToJpg(file, quality, background)
      .then((converted) => {
        if (cancelled) return;
        if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
        const url = URL.createObjectURL(converted.blob);
        resultUrlRef.current = url;
        setResultUrl(url);
        setResult(converted);
        setError("");
      })
      .catch(() => {
        if (!cancelled) setError("This image could not be converted. Try a current browser and a standard PNG, JPG or WebP file.");
      })
      .finally(() => {
        if (!cancelled) setWorking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [file, natural, quality, background]);

  const saved = file && result ? reductionPercent(file.size, result.blob.size) : 0;

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".png,image/png,image/*"
        label={file ? file.name : "Choose a PNG image"}
        hint="Drop a PNG here or click to browse. Any image your browser can open works. Files never leave your device, nothing is uploaded."
        onFiles={(incoming) => {
          if (incoming[0]) void pickFile(incoming[0]);
        }}
      />

      {file && natural && (
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label={`JPG quality: ${quality}%`}
            htmlFor="pj-quality"
            hint="Higher quality keeps more detail and makes a bigger file. 85 to 95 suits most photos."
          >
            <input
              id="pj-quality"
              type="range"
              min={10}
              max={100}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="min-h-12 w-full accent-brand-600"
            />
          </Field>
          <Field
            label="Background colour"
            htmlFor="pj-bg"
            hint="JPG has no transparency, so see-through areas are filled with this colour."
          >
            <Select
              id="pj-bg"
              value={bgChoice}
              onChange={(e) => setBgChoice(e.target.value as BgChoice)}
            >
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="custom">Custom colour</option>
            </Select>
          </Field>
          <Field label="Custom colour" htmlFor="pj-custom-bg" hint="Used only when the background is set to custom.">
            <input
              id="pj-custom-bg"
              type="color"
              value={customBg}
              disabled={bgChoice !== "custom"}
              onChange={(e) => setCustomBg(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {file && natural && (
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Original PNG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            <figcaption className="bg-white px-5 py-3 text-sm text-gray-700">
              Original: {formatBytes(file.size)}, {natural.width} x {natural.height} px
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
            {resultUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Converted JPG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            ) : (
              <div className="flex max-h-80 min-h-40 items-center justify-center bg-slate-50 px-5 text-sm text-gray-500">
                {working ? "Converting..." : "The JPG preview will appear here."}
              </div>
            )}
            <figcaption className="bg-white px-5 py-3 text-sm text-gray-700">
              {result
                ? `JPG: ${formatBytes(result.blob.size)}, ${result.width} x ${result.height} px`
                : "JPG result will appear here."}
            </figcaption>
          </figure>
        </div>
      )}

      {file && result && (
        <div aria-live="polite" className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="Original size" value={formatBytes(file.size)} sub="The PNG you picked" />
            <ResultCard label="JPG size" value={formatBytes(result.blob.size)} sub="After conversion" primary />
            <ResultCard
              label={saved >= 0 ? "Saved" : "Change"}
              value={`${Math.abs(saved)}%`}
              sub={saved >= 0 ? "Smaller than the original" : "Bigger than the original, common for flat graphics"}
            />
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(result.blob, pngToJpgName(file.name))}
            className={primaryButtonClass}
          >
            Download {pngToJpgName(file.name)}
          </button>
        </div>
      )}
    </div>
  );
}
