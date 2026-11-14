"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateMulch } from "./mulch";

export default function MulchCalculator() {
  const [entry, setEntry] = useState<"area" | "dims">("area");
  const [area, setArea] = useState("100");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("3");

  const result = useMemo(() => {
    const depthIn = parseNum(depth);
    if (depthIn === null) return null;
    try {
      return entry === "area"
        ? calculateMulch({ areaSqFt: parseNum(area) ?? undefined, depthIn })
        : calculateMulch({ lengthFt: parseNum(length) ?? undefined, widthFt: parseNum(width) ?? undefined, depthIn });
    } catch {
      return null;
    }
  }, [entry, area, length, width, depth]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Area entry" htmlFor="mu-entry">
          <select id="mu-entry" className={selectClass} value={entry} onChange={(e) => setEntry(e.target.value as "area" | "dims")}>
            <option value="area">I know the area</option>
            <option value="dims">Length and width</option>
          </select>
        </Field>
        {entry === "area" ? (
          <Field label="Area (sq ft)" htmlFor="mu-area"><input id="mu-area" type="number" min="0" step="any" className={inputClass} value={area} onChange={(e) => setArea(e.target.value)} /></Field>
        ) : (
          <>
            <Field label="Length (ft)" htmlFor="mu-length"><input id="mu-length" type="number" min="0" step="any" className={inputClass} value={length} onChange={(e) => setLength(e.target.value)} /></Field>
            <Field label="Width (ft)" htmlFor="mu-width"><input id="mu-width" type="number" min="0" step="any" className={inputClass} value={width} onChange={(e) => setWidth(e.target.value)} /></Field>
          </>
        )}
        <Field label="Depth (inches)" htmlFor="mu-depth" hint="3 inches is the standard depth for flower beds, 2 inches for a top up.">
          <input id="mu-depth" type="number" min="0" step="any" className={inputClass} value={depth} onChange={(e) => setDepth(e.target.value)} />
        </Field>
      </div>
      {result ? (
        <div className="mt-7" aria-live="polite"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard label="Mulch needed" value={`${fmt(result.volumeCuYd, 2)} cu yd`} sub={`${fmt(result.volumeCuFt, 1)} cubic feet for ${fmt(result.areaSqFt)} sq ft`} primary />
          <ResultCard label="2 cu ft bags" value={fmt(result.bags2CuFt)} sub="The most common bag size at garden centres" />
          <ResultCard label="3 cu ft bags" value={fmt(result.bags3CuFt)} sub="Larger bags, fewer trips to the car" />
        </div></div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter area and depth" body="Tell us the bed size and how deep the mulch should sit, and the volume and bag counts appear here." /></div>
      )}
    </div>
  );
}
