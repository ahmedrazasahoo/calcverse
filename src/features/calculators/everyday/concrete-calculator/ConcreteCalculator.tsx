"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { calculateConcrete, type ConcreteMode, type ConcreteUnit } from "./concrete";

export default function ConcreteCalculator() {
  const [mode, setMode] = useState<ConcreteMode>("slab");
  const [unit, setUnit] = useState<ConcreteUnit>("imperial");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [thickness, setThickness] = useState("4");
  const [diameter, setDiameter] = useState("12");
  const [height, setHeight] = useState("8");
  const [waste, setWaste] = useState("10");

  const metric = unit === "metric";
  const result = useMemo(() => {
    const wastePercent = parseNum(waste);
    if (wastePercent === null) return null;
    try {
      return calculateConcrete({
        mode,
        unit,
        length: parseNum(length) ?? undefined,
        width: parseNum(width) ?? undefined,
        thickness: parseNum(thickness) ?? undefined,
        diameter: parseNum(diameter) ?? undefined,
        height: parseNum(height) ?? undefined,
        wastePercent,
      });
    } catch {
      return null;
    }
  }, [mode, unit, length, width, thickness, diameter, height, waste]);

  const hasBad = [length, width, thickness, diameter, height, waste].some((v) => v.trim() !== "" && parseNum(v) === null);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Shape" htmlFor="cc-mode">
          <Select id="cc-mode" value={mode} onChange={(e) => setMode(e.target.value as ConcreteMode)}>
            <option value="slab">Slab</option>
            <option value="footing">Footing</option>
            <option value="column">Round column</option>
          </Select>
        </Field>
        <Field label="Units" htmlFor="cc-unit">
          <Select id="cc-unit" value={unit} onChange={(e) => setUnit(e.target.value as ConcreteUnit)}>
            <option value="imperial">Feet and inches</option>
            <option value="metric">Metres</option>
          </Select>
        </Field>
        <Field label="Waste allowance (percent)" htmlFor="cc-waste" hint="Extra for spillage, uneven ground and over excavation. 10 percent is typical.">
          <input id="cc-waste" type="number" min="0" step="1" className={inputClass} value={waste} onChange={(e) => setWaste(e.target.value)} />
        </Field>
        {mode !== "column" ? (
          <>
            <Field label={metric ? "Length (m)" : "Length (ft)"} htmlFor="cc-length">
              <input id="cc-length" type="number" min="0" step="any" className={inputClass} value={length} onChange={(e) => setLength(e.target.value)} />
            </Field>
            <Field label={metric ? "Width (m)" : "Width (ft)"} htmlFor="cc-width">
              <input id="cc-width" type="number" min="0" step="any" className={inputClass} value={width} onChange={(e) => setWidth(e.target.value)} />
            </Field>
            <Field label={mode === "slab" ? (metric ? "Thickness (m)" : "Thickness (in)") : metric ? "Depth (m)" : "Depth (in)"} htmlFor="cc-thickness">
              <input id="cc-thickness" type="number" min="0" step="any" className={inputClass} value={thickness} onChange={(e) => setThickness(e.target.value)} />
            </Field>
          </>
        ) : (
          <>
            <Field label={metric ? "Diameter (m)" : "Diameter (in)"} htmlFor="cc-diameter">
              <input id="cc-diameter" type="number" min="0" step="any" className={inputClass} value={diameter} onChange={(e) => setDiameter(e.target.value)} />
            </Field>
            <Field label={metric ? "Height (m)" : "Height (ft)"} htmlFor="cc-height">
              <input id="cc-height" type="number" min="0" step="any" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
            </Field>
          </>
        )}
      </div>
      {hasBad && <div className="mt-4"><ErrorNote>Please enter numbers only in every field you use.</ErrorNote></div>}
      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label="Concrete to order (with waste)" value={`${fmt(result.volumeWithWasteCuYd, 3)} cu yd`} sub={`${fmt(result.volumeWithWasteCuFt, 2)} cubic feet, ${fmt(result.volumeWithWasteCuM, 3)} cubic metres`} primary />
            <ResultCard label="Exact volume (before waste)" value={`${fmt(result.volumeCuYd, 3)} cu yd`} sub={`${fmt(result.volumeCuFt, 2)} cubic feet, ${fmt(result.volumeCuM, 3)} cubic metres`} />
            <ResultCard label="60 lb premix bags" value={fmt(result.bags[60])} sub={`Or ${fmt(result.bags[40])} x 40 lb, ${fmt(result.bags[50])} x 50 lb, ${fmt(result.bags[80])} x 80 lb bags`} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">Bag counts include the waste allowance and are rounded up to whole bags. Ready mix is usually ordered by the cubic yard, so round the with waste figure up to the nearest quarter yard when you call the plant.</p>
        </div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter your dimensions" body="Fill in the size of your slab, footing or column and the volume and bag counts appear here instantly." /></div>
      )}
    </div>
  );
}
