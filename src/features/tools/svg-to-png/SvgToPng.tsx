"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Field, ResultCard, inputClass, parseNum, primaryButtonClass, Select } from "@/components/ui";
import FileDrop from "../_shared/FileDrop";
import { downloadBlob, formatBytes } from "../_shared/file-utils";
import type { ConvertedImage } from "../png-to-jpg/engine";
import {
  computeOutputSize,
  convertSvgToPng,
  parseSvgIntrinsicSize,
  svgToPngName,
} from "./svg";

const SCALE_OPTIONS = [0.5, 1, 2, 3, 4];

export default function SvgToPng() {
  const [svgText, setSvgText] = useState("");
  const [fileName, setFileName] = useState("image.svg");
  const [widthInput, setWidthInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [scale, setScale] = useState(2);
  const [bgMode, setBgMode] = useState<"transparent" | "color">("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const resultUrlRef = useRef("");

  const intrinsic = useMemo(
    () => (svgText.trim() ? parseSvgIntrinsicSize(svgText) : null),
    [svgText]
  );

  const outputSize = useMemo(
    () =>
      computeOutputSize(intrinsic, {
        width: widthInput.trim() ? parseNum(widthInput) : null,
        height: heightInput.trim() ? parseNum(heightInput) : null,
        scale,
      }),
    [intrinsic, widthInput, heightInput, scale]
  );

  const previewUrl = useMemo(() => {
    if (!svgText.trim()) return "";
    return URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml;charset=utf-8" }));
  }, [svgText]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!svgText.trim() || !outputSize) {
      setResult(null);
      return;
    }
    let cancelled = false;
    setWorking(true);
    convertSvgToPng(svgText, outputSize, bgMode === "color" ? bgColor : undefined)
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
        if (!cancelled) {
          setError(
            "This SVG could not be rendered. Check the markup is a complete, valid SVG document with an opening svg tag."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setWorking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [svgText, outputSize, bgMode, bgColor]);

  const readFile = async (picked: File) => {
    setError("");
    setFileName(picked.name);
    try {
      setSvgText(await picked.text());
    } catch {
      setError("This file could not be read as text. SVG files are plain text markup, so check the file is a real SVG.");
    }
  };

  const sizeProblem =
    svgText.trim() && !outputSize
      ? "This SVG has no width, height or viewBox to work out its size from. Enter both an exact width and an exact height to render it."
      : "";

  return (
    <div className="space-y-5">
      <FileDrop
        accept=".svg,image/svg+xml"
        label={svgText ? fileName : "Choose an SVG file"}
        hint="Drop an SVG here or click to browse, or paste the markup in the box below. Files never leave your device, nothing is uploaded."
        onFiles={(incoming) => {
          if (incoming[0]) void readFile(incoming[0]);
        }}
      />

      <Field
        label="Or paste SVG markup"
        htmlFor="sp-markup"
        hint="An SVG loaded as an image cannot run scripts, and external references inside it, such as linked images or fonts, will not load. Self contained files with inline shapes convert exactly."
      >
        <textarea
          id="sp-markup"
          value={svgText}
          onChange={(e) => {
            setSvgText(e.target.value);
            setFileName("pasted.svg");
          }}
          rows={5}
          spellCheck={false}
          placeholder='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">...</svg>'
          className="min-h-32 w-full rounded-3xl border border-white/80 bg-white/70 px-5 py-3 font-mono text-sm text-gray-900 shadow-sm backdrop-blur outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
        />
      </Field>

      {svgText.trim() && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field
            label="Output width (px)"
            htmlFor="sp-width"
            hint={intrinsic ? `Intrinsic size: ${Math.round(intrinsic.width)} x ${Math.round(intrinsic.height)}.` : "Leave empty to derive it."}
          >
            <input
              id="sp-width"
              type="number"
              min={1}
              step={1}
              value={widthInput}
              onChange={(e) => setWidthInput(e.target.value)}
              placeholder="Auto"
              className={inputClass}
            />
          </Field>
          <Field label="Output height (px)" htmlFor="sp-height" hint="Leave empty to derive it from the width or the scale.">
            <input
              id="sp-height"
              type="number"
              min={1}
              step={1}
              value={heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              placeholder="Auto"
              className={inputClass}
            />
          </Field>
          <Field label="Scale" htmlFor="sp-scale" hint="Used when no exact width or height is set.">
            <Select
              id="sp-scale"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            >
              {SCALE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}x
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Background" htmlFor="sp-bg" hint="Transparent keeps the see-through areas of the SVG.">
            <div className="flex gap-2">
              <Select
                id="sp-bg"
                value={bgMode}
                onChange={(e) => setBgMode(e.target.value as "transparent" | "color")}
              >
                <option value="transparent">Transparent</option>
                <option value="color">Colour</option>
              </Select>
              <input
                id="sp-bg-color"
                type="color"
                aria-label="Background colour"
                value={bgColor}
                disabled={bgMode !== "color"}
                onChange={(e) => setBgColor(e.target.value)}
                className={inputClass}
              />
            </div>
          </Field>
        </div>
      )}

      {sizeProblem && <p className="text-sm font-medium text-red-600">{sizeProblem}</p>}
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      {svgText.trim() && outputSize && (
        <div className="grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/70">
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Original SVG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            )}
            <figcaption className="bg-white/60 px-5 py-3 text-sm text-gray-700 backdrop-blur">
              {intrinsic
                ? `SVG artwork, intrinsic size ${Math.round(intrinsic.width)} x ${Math.round(intrinsic.height)}`
                : "SVG artwork, no intrinsic size in the markup"}
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[2rem] ring-1 ring-white/70">
            {resultUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Rendered PNG preview" className="max-h-80 w-full bg-white/50 object-contain" />
            ) : (
              <div className="flex max-h-80 min-h-40 items-center justify-center bg-white/40 px-5 text-sm text-gray-500">
                {working ? "Rendering..." : "The PNG preview will appear here."}
              </div>
            )}
            <figcaption className="bg-white/60 px-5 py-3 text-sm text-gray-700 backdrop-blur">
              PNG output: {outputSize.width} x {outputSize.height} px
              {result ? `, ${formatBytes(result.blob.size)}` : ""}
            </figcaption>
          </figure>
        </div>
      )}

      {result && outputSize && (
        <div aria-live="polite" className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="PNG size" value={formatBytes(result.blob.size)} sub="The rendered file" primary />
            <ResultCard
              label="Dimensions"
              value={`${result.width} x ${result.height}`}
              sub="Exact pixels, as requested"
            />
          </div>
          <button
            type="button"
            onClick={() => downloadBlob(result.blob, svgToPngName(fileName))}
            className={primaryButtonClass}
          >
            Download {svgToPngName(fileName)}
          </button>
        </div>
      )}
    </div>
  );
}
