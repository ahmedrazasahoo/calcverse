"use client";

import { useEffect, useRef, useState } from "react";
import { Field, ResultCard, inputClass, primaryButtonClass, selectClass } from "@/components/ui";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes, reductionPercent } from "../_shared/file-utils";
import { loadImage, type ConvertedImage } from "../png-to-jpg/engine";
import { convertWebpToJpg, webpToJpgName } from "./webp-to-jpg";

type BgChoice = "white" | "black" | "custom";

export default function WebpToJpg() {
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
      setError("This file could not be read as an image. Check that it is a genuine WebP image and try a current browser.");
    }
  };

  useEffect(() => {
    if (!file || !natural) return;
    let cancelled = false;
    setWorking(true);
    convertWebpToJpg(file, quality, background)
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
        if (!cancelled) setError("This WebP image could not be converted. Try a current version of Chrome, Edge, Firefox or Safari.");
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
        accept=".webp,image/webp"
        label={file ? file.name : "Choose a WebP image"}
        hint="Drop a WebP image here or click to browse. Files never leave your device, nothing is uploaded."
        onFiles={(incoming) => {
          if (incoming[0]) void pickFile(incoming[0]);
        }}
      />

      {file && natural && (
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label={`JPG quality: ${quality}%`}
            htmlFor="wj-quality"
            hint="Higher quality keeps more detail and makes a bigger file. 85 to 95 suits most photos."
          >
            <input
              id="wj-quality"
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
            htmlFor="wj-bg"
            hint="JPG has no transparency, so see-through areas of the WebP are filled with this colour."
          >
            <select
              id="wj-bg"
              className={selectClass}
              value={bgChoice}
              onChange={(e) => setBgChoice(e.target.value as BgChoice)}
            >
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="custom">Custom colour</option>
            </select>
          </Field>
          <Field label="Custom colour" htmlFor="wj-custom-bg" hint="Used only when the background is set to custom.">
            <input
              id="wj-custom-bg"
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
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Original WebP preview" className="max-h-80 w-full bg-white/50 object-contain" />
            <figcaption className="bg-white/60 px-5 py-3 text-sm text-gray-700 backdrop-blur">
              Original: {formatBytes(file.size)}, {natural.width} x {natural.height} px
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/70">
            {resultUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Converted JPG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            ) : (
              <div className="flex max-h-80 min-h-40 items-center justify-center bg-white/40 px-5 text-sm text-gray-500">
                {working ? "Converting..." : "The JPG preview will appear here."}
              </div>
            )}
            <figcaption className="bg-white/60 px-5 py-3 text-sm text-gray-700 backdrop-blur">
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
            <ResultCard label="Original size" value={formatBytes(file.size)} sub="The WebP you picked" />
            <ResultCard label="JPG size" value={formatBytes(result.blob.size)} sub="After conversion" primary />
            <ResultCard
              label={saved >= 0 ? "Saved" : "Change"}
              value={`${Math.abs(saved)}%`}
              sub={saved >= 0 ? "Smaller than the original" : "Bigger than the original, common because WebP compresses harder"}
            />
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(result.blob, webpToJpgName(file.name))}
            className={primaryButtonClass}
          >
            Download {webpToJpgName(file.name)}
          </button>
        </div>
      )}
    </div>
  );
}
