"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { calculatePaint, flooringBoxes, shapeArea, type ShapeKind } from "./squareFootage";

type Mode = ShapeKind | "flooring" | "paint";

export default function SquareFootageCalculator() {
  const [mode, setMode] = useState<Mode>("rectangle");
  const [a, setA] = useState("12");
  const [b, setB] = useState("10");
  const [coverage, setCoverage] = useState("20");
  const [waste, setWaste] = useState("10");
  const [roomL, setRoomL] = useState("12");
  const [roomW, setRoomW] = useState("10");
  const [roomH, setRoomH] = useState("8");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");
  const [coats, setCoats] = useState("2");

  const areaResult = useMemo(() => {
    if (mode === "paint") return null;
    const av = parseNum(a);
    if (av === null) return null;
    const shape: ShapeKind = mode === "flooring" ? "rectangle" : mode;
    try {
      const area = shapeArea(shape, av, parseNum(b) ?? undefined);
      const boxes = mode === "flooring" ? flooringBoxes(area.sqFt, parseNum(coverage) ?? NaN, parseNum(waste) ?? 0) : null;
      return { area, boxes };
    } catch {
      return null;
    }
  }, [mode, a, b, coverage, waste]);

  const paintResult = useMemo(() => {
    if (mode !== "paint") return null;
    const L = parseNum(roomL); const W = parseNum(roomW); const H = parseNum(roomH);
    const d = parseNum(doors); const w = parseNum(windows); const c = parseNum(coats);
    if (L === null || W === null || H === null || d === null || w === null || c === null) return null;
    try {
      return calculatePaint({ lengthFt: L, widthFt: W, heightFt: H, doors: d, windows: w, coats: c });
    } catch {
      return null;
    }
  }, [mode, roomL, roomW, roomH, doors, windows, coats]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="What are you measuring?" htmlFor="sf-mode">
          <Select id="sf-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="rectangle">Rectangle area</option>
            <option value="circle">Circle area</option>
            <option value="triangle">Triangle area</option>
            <option value="flooring">Flooring boxes</option>
            <option value="paint">Paint for a room</option>
          </Select>
        </Field>
        {mode !== "paint" && (
          <>
            <Field label={mode === "circle" ? "Radius (ft)" : mode === "triangle" ? "Base (ft)" : "Length (ft)"} htmlFor="sf-a">
              <input id="sf-a" type="number" min="0" step="any" className={inputClass} value={a} onChange={(e) => setA(e.target.value)} />
            </Field>
            {mode !== "circle" && (
              <Field label={mode === "triangle" ? "Height (ft)" : "Width (ft)"} htmlFor="sf-b">
                <input id="sf-b" type="number" min="0" step="any" className={inputClass} value={b} onChange={(e) => setB(e.target.value)} />
              </Field>
            )}
            {mode === "flooring" && (
              <>
                <Field label="Coverage per box (sq ft)" htmlFor="sf-coverage" hint="Printed on the box, often 20 to 24 sq ft.">
                  <input id="sf-coverage" type="number" min="0" step="any" className={inputClass} value={coverage} onChange={(e) => setCoverage(e.target.value)} />
                </Field>
                <Field label="Waste allowance (percent)" htmlFor="sf-waste" hint="For cuts and mistakes. 10 percent suits straight layouts.">
                  <input id="sf-waste" type="number" min="0" step="any" className={inputClass} value={waste} onChange={(e) => setWaste(e.target.value)} />
                </Field>
              </>
            )}
          </>
        )}
        {mode === "paint" && (
          <>
            <Field label="Room length (ft)" htmlFor="sf-rl"><input id="sf-rl" type="number" min="0" step="any" className={inputClass} value={roomL} onChange={(e) => setRoomL(e.target.value)} /></Field>
            <Field label="Room width (ft)" htmlFor="sf-rw"><input id="sf-rw" type="number" min="0" step="any" className={inputClass} value={roomW} onChange={(e) => setRoomW(e.target.value)} /></Field>
            <Field label="Wall height (ft)" htmlFor="sf-rh"><input id="sf-rh" type="number" min="0" step="any" className={inputClass} value={roomH} onChange={(e) => setRoomH(e.target.value)} /></Field>
            <Field label="Doors" htmlFor="sf-doors" hint="Each standard door is counted as 21 sq ft."><input id="sf-doors" type="number" min="0" step="1" className={inputClass} value={doors} onChange={(e) => setDoors(e.target.value)} /></Field>
            <Field label="Windows" htmlFor="sf-windows" hint="Each average window is counted as 15 sq ft."><input id="sf-windows" type="number" min="0" step="1" className={inputClass} value={windows} onChange={(e) => setWindows(e.target.value)} /></Field>
            <Field label="Coats" htmlFor="sf-coats"><input id="sf-coats" type="number" min="1" step="1" className={inputClass} value={coats} onChange={(e) => setCoats(e.target.value)} /></Field>
          </>
        )}
      </div>
      {mode === "paint" ? (
        paintResult ? (
          <div className="mt-7" aria-live="polite"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label="Paint to buy" value={`${fmt(paintResult.gallonsToBuy)} gal`} sub={`${fmt(paintResult.gallonsExact, 2)} gallons exact at 350 sq ft per gallon per coat`} primary />
            <ResultCard label="Wall area to paint" value={`${fmt(paintResult.netWallAreaSqFt)} sq ft`} sub={`${fmt(paintResult.netWallAreaSqM, 1)} sq m, after doors and windows are taken out`} />
            <ResultCard label="Gross wall area" value={`${fmt(paintResult.grossWallAreaSqFt)} sq ft`} sub={`${fmt(paintResult.deductionsSqFt)} sq ft deducted for openings`} />
          </div></div>
        ) : <div className="mt-7"><EmptyState title="Enter the room size" body="Add the room dimensions, openings and coats to see the paint you need." /></div>
      ) : areaResult ? (
        <div className="mt-7" aria-live="polite"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard label="Area" value={`${fmt(areaResult.area.sqFt, 2)} sq ft`} sub={`${fmt(areaResult.area.sqM, 2)} square metres`} primary />
          {areaResult.boxes !== null && <ResultCard label="Flooring boxes needed" value={fmt(areaResult.boxes)} sub="Includes your waste allowance, rounded up to whole boxes" />}
        </div></div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter your measurements" body="Type a length and width, a radius, or a base and height, and the area appears here." /></div>
      )}
    </div>
  );
}
