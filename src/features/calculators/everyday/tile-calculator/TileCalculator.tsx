"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { calculateTile, cmToIn } from "./tile";

export default function TileCalculator() {
  const [roomL, setRoomL] = useState("10");
  const [roomW, setRoomW] = useState("10");
  const [tileL, setTileL] = useState("12");
  const [tileW, setTileW] = useState("12");
  const [tileUnit, setTileUnit] = useState<"in" | "cm">("in");
  const [gap, setGap] = useState("0.125");
  const [waste, setWaste] = useState("10");
  const [perBox, setPerBox] = useState("10");

  const result = useMemo(() => {
    const rl = parseNum(roomL); const rw = parseNum(roomW);
    const tl = parseNum(tileL); const tw = parseNum(tileW);
    const g = parseNum(gap); const w = parseNum(waste); const pb = parseNum(perBox);
    if (rl === null || rw === null || tl === null || tw === null || g === null || w === null || pb === null) return null;
    try {
      return calculateTile({
        roomLengthFt: rl, roomWidthFt: rw,
        tileLengthIn: tileUnit === "cm" ? cmToIn(tl) : tl,
        tileWidthIn: tileUnit === "cm" ? cmToIn(tw) : tw,
        groutGapIn: g, wastePercent: w, tilesPerBox: pb,
      });
    } catch {
      return null;
    }
  }, [roomL, roomW, tileL, tileW, tileUnit, gap, waste, perBox]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Room length (ft)" htmlFor="ti-rl"><input id="ti-rl" type="number" min="0" step="any" className={inputClass} value={roomL} onChange={(e) => setRoomL(e.target.value)} /></Field>
        <Field label="Room width (ft)" htmlFor="ti-rw"><input id="ti-rw" type="number" min="0" step="any" className={inputClass} value={roomW} onChange={(e) => setRoomW(e.target.value)} /></Field>
        <Field label="Tile size unit" htmlFor="ti-unit">
          <Select id="ti-unit" value={tileUnit} onChange={(e) => setTileUnit(e.target.value as "in" | "cm")}>
            <option value="in">Inches</option>
            <option value="cm">Centimetres</option>
          </Select>
        </Field>
        <Field label={`Tile length (${tileUnit})`} htmlFor="ti-tl"><input id="ti-tl" type="number" min="0" step="any" className={inputClass} value={tileL} onChange={(e) => setTileL(e.target.value)} /></Field>
        <Field label={`Tile width (${tileUnit})`} htmlFor="ti-tw"><input id="ti-tw" type="number" min="0" step="any" className={inputClass} value={tileW} onChange={(e) => setTileW(e.target.value)} /></Field>
        <Field label="Grout gap (inches)" htmlFor="ti-gap" hint="Common gaps are 1/16 to 1/4 inch. The gap is added to the tile pitch.">
          <input id="ti-gap" type="number" min="0" step="any" className={inputClass} value={gap} onChange={(e) => setGap(e.target.value)} />
        </Field>
        <Field label="Waste allowance (percent)" htmlFor="ti-waste" hint="10 percent for straight layouts, 15 percent for diagonal patterns.">
          <input id="ti-waste" type="number" min="0" step="any" className={inputClass} value={waste} onChange={(e) => setWaste(e.target.value)} />
        </Field>
        <Field label="Tiles per box" htmlFor="ti-box"><input id="ti-box" type="number" min="1" step="1" className={inputClass} value={perBox} onChange={(e) => setPerBox(e.target.value)} /></Field>
      </div>
      {result ? (
        <div className="mt-7" aria-live="polite"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard label="Tiles needed" value={fmt(result.tilesNeeded)} sub="Includes grout gap pitch and your waste allowance" primary />
          <ResultCard label="Boxes to buy" value={fmt(result.boxesNeeded)} sub={`At ${perBox} tiles per box, rounded up`} />
          <ResultCard label="Area to tile" value={`${fmt(result.roomAreaSqFt)} sq ft`} sub={`${fmt(result.roomAreaSqM, 1)} square metres`} />
        </div></div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter room and tile sizes" body="Add the room dimensions and tile size and the tile and box counts appear here." /></div>
      )}
    </div>
  );
}
