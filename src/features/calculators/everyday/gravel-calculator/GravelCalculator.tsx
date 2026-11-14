"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { MATERIALS, calculateGravel } from "./gravel";

export default function GravelCalculator() {
  const [entry, setEntry] = useState<"area" | "dims">("area");
  const [area, setArea] = useState("100");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("3");
  const [material, setMaterial] = useState("pea-gravel");
  const [customDensity, setCustomDensity] = useState("1.40");

  const density = material === "custom" ? parseNum(customDensity) : MATERIALS[material]?.densityTonsPerCuYd;

  const result = useMemo(() => {
    const depthIn = parseNum(depth);
    if (depthIn === null || density === undefined || density === null) return null;
    try {
      return entry === "area"
        ? calculateGravel({ areaSqFt: parseNum(area) ?? undefined, depthIn, densityTonsPerCuYd: density })
        : calculateGravel({ lengthFt: parseNum(length) ?? undefined, widthFt: parseNum(width) ?? undefined, depthIn, densityTonsPerCuYd: density });
    } catch {
      return null;
    }
  }, [entry, area, length, width, depth, density]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Area entry" htmlFor="gr-entry">
          <select id="gr-entry" className={selectClass} value={entry} onChange={(e) => setEntry(e.target.value as "area" | "dims")}>
            <option value="area">I know the area</option>
            <option value="dims">Length and width</option>
          </select>
        </Field>
        {entry === "area" ? (
          <Field label="Area (sq ft)" htmlFor="gr-area"><input id="gr-area" type="number" min="0" step="any" className={inputClass} value={area} onChange={(e) => setArea(e.target.value)} /></Field>
        ) : (
          <>
            <Field label="Length (ft)" htmlFor="gr-length"><input id="gr-length" type="number" min="0" step="any" className={inputClass} value={length} onChange={(e) => setLength(e.target.value)} /></Field>
            <Field label="Width (ft)" htmlFor="gr-width"><input id="gr-width" type="number" min="0" step="any" className={inputClass} value={width} onChange={(e) => setWidth(e.target.value)} /></Field>
          </>
        )}
        <Field label="Depth (inches)" htmlFor="gr-depth" hint="Driveways usually need 4 to 6 inches over a base layer. Paths need 2 to 3 inches.">
          <input id="gr-depth" type="number" min="0" step="any" className={inputClass} value={depth} onChange={(e) => setDepth(e.target.value)} />
        </Field>
        <Field label="Material" htmlFor="gr-material">
          <select id="gr-material" className={selectClass} value={material} onChange={(e) => setMaterial(e.target.value)}>
            {Object.entries(MATERIALS).map(([key, m]) => (
              <option key={key} value={key}>{m.label} ({fmt(m.densityTonsPerCuYd, 2)} tons per cu yd)</option>
            ))}
            <option value="custom">Custom density</option>
          </select>
        </Field>
        {material === "custom" && (
          <Field label="Density (tons per cu yd)" htmlFor="gr-density"><input id="gr-density" type="number" min="0" step="any" className={inputClass} value={customDensity} onChange={(e) => setCustomDensity(e.target.value)} /></Field>
        )}
      </div>
      {result ? (
        <div className="mt-7" aria-live="polite"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard label="Weight to order" value={`${fmt(result.tons, 2)} tons`} sub={`${fmt(result.kg)} kg, or ${fmt(result.pounds)} lb`} primary />
          <ResultCard label="Volume" value={`${fmt(result.volumeCuYd, 2)} cu yd`} sub={`${fmt(result.volumeCuFt, 1)} cubic feet`} />
          <ResultCard label="Area covered" value={`${fmt(result.areaSqFt)} sq ft`} sub={`At ${depth} inches deep`} />
        </div></div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter area, depth and material" body="Pick your material for its density and the weight and volume appear here." /></div>
      )}
    </div>
  );
}
