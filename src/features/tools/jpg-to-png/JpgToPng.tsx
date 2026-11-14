"use client";

import { useEffect, useRef, useState } from "react";
import { ResultCard, primaryButtonClass } from "@/components/ui";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes, reductionPercent } from "../_shared/file-utils";
import { loadImage, type ConvertedImage } from "../png-to-jpg/engine";
import { convertJpgToPng, jpgToPngName } from "./jpg-to-png";

export default function JpgToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const resultUrlRef = useRef("");

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
      setError("This file could not be read as an image. JPG works best, and any image your browser can open is accepted.");
    }
  };

  useEffect(() => {
    if (!file || !natural) return;
    let cancelled = false;
    setWorking(true);
    convertJpgToPng(file)
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
        if (!cancelled) setError("This image could not be converted. Try a current browser and a standard JPG file.");
      })
      .finally(() => {
        if (!cancelled) setWorking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [file, natural]);

  const saved = file && result ? reductionPercent(file.size, result.blob.size) : 0;

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".jpg,.jpeg,image/jpeg,image/*"
        label={file ? file.name : "Choose a JPG image"}
        hint="Drop a JPG here or click to browse. Files never leave your device, nothing is uploaded."
        onFiles={(incoming) => {
          if (incoming[0]) void pickFile(incoming[0]);
        }}
      />

      {file && natural && (
        <p className="rounded-3xl bg-white/55 px-5 py-3.5 text-sm leading-relaxed text-gray-700 ring-1 ring-white/70">
          There is no quality setting on this converter, on purpose. PNG stores pixels losslessly, so the output
          holds exactly the pixels your JPG has, and there is no quality dial to turn. Expect the PNG to be larger
          than the JPG, often much larger for photos.
        </p>
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {file && natural && (
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Original JPG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            <figcaption className="bg-white/60 px-5 py-3 text-sm text-gray-700 backdrop-blur">
              Original: {formatBytes(file.size)}, {natural.width} x {natural.height} px
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/70">
            {resultUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Converted PNG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            ) : (
              <div className="flex max-h-80 min-h-40 items-center justify-center bg-white/40 px-5 text-sm text-gray-500">
                {working ? "Converting..." : "The PNG preview will appear here."}
              </div>
            )}
            <figcaption className="bg-white/60 px-5 py-3 text-sm text-gray-700 backdrop-blur">
              {result
                ? `PNG: ${formatBytes(result.blob.size)}, ${result.width} x ${result.height} px`
                : "PNG result will appear here."}
            </figcaption>
          </figure>
        </div>
      )}

      {file && result && (
        <div aria-live="polite" className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="Original size" value={formatBytes(file.size)} sub="The JPG you picked" />
            <ResultCard label="PNG size" value={formatBytes(result.blob.size)} sub="After conversion" primary />
            <ResultCard
              label={saved >= 0 ? "Saved" : "Change"}
              value={`${Math.abs(saved)}%`}
              sub={saved >= 0 ? "Smaller than the original" : "Bigger than the original, which is normal for PNG"}
            />
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(result.blob, jpgToPngName(file.name))}
            className={primaryButtonClass}
          >
            Download {jpgToPngName(file.name)}
          </button>
        </div>
      )}
    </div>
  );
}
