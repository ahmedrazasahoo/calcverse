"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  RACE_PRESETS,
  convertDistance,
  formatDuration,
  formatPace,
  parseDurationToSeconds,
  solvePace,
  type DistanceUnit,
} from "./pace";

export default function PaceCalculator() {
  const [unit, setUnit] = useState<DistanceUnit>("km");
  const [distance, setDistance] = useState("10");
  const [time, setTime] = useState("50:00");
  const [pace, setPace] = useState("");

  const result = useMemo(() => {
    const d = parseNum(distance);
    const t = time.trim() === "" ? null : parseDurationToSeconds(time);
    const p = pace.trim() === "" ? null : parseDurationToSeconds(pace);
    const filled = [d, t, p].filter((v) => v !== null && v !== 0).length;
    if (filled !== 2) return null;
    return solvePace({
      distance: d ?? undefined,
      totalSeconds: t ?? undefined,
      paceSecondsPerUnit: p ?? undefined,
    });
  }, [distance, time, pace]);

  const filledCount = [distance.trim(), time.trim(), pace.trim()].filter((v) => v !== "").length;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {RACE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className="rounded-full border border-gray-300 px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-700"
            onClick={() => {
              setDistance(unit === "km" ? String(preset.km) : String(Math.round((preset.km / 1.609344) * 1000) / 1000));
              setPace("");
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Distance unit" htmlFor="pa-unit">
          <select
            id="pa-unit"
            className={selectClass}
            value={unit}
            onChange={(e) => {
              const next = e.target.value as DistanceUnit;
              const current = parseNum(distance);
              if (current !== null) setDistance(String(Math.round(convertDistance(current, unit, next) * 1000) / 1000));
              setUnit(next);
            }}
          >
            <option value="km">Kilometres</option>
            <option value="mi">Miles</option>
          </select>
        </Field>
        <Field label={`Distance (${unit})`} htmlFor="pa-distance" hint="Fill in any two of the three boxes.">
          <input id="pa-distance" type="number" min="0" step="0.01" className={inputClass} value={distance} onChange={(e) => setDistance(e.target.value)} />
        </Field>
        <Field label="Finish time" htmlFor="pa-time" hint="As minutes:seconds or hours:minutes:seconds, for example 50:00 or 1:45:30.">
          <input id="pa-time" type="text" inputMode="numeric" className={inputClass} value={time} onChange={(e) => setTime(e.target.value)} placeholder="50:00" />
        </Field>
        <Field label={`Pace (per ${unit})`} htmlFor="pa-pace" hint="As minutes:seconds, for example 5:00.">
          <input id="pa-pace" type="text" inputMode="numeric" className={inputClass} value={pace} onChange={(e) => setPace(e.target.value)} placeholder="Optional" />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Your pace" value={formatPace(result.paceSecondsPerUnit, unit)} sub="Per kilometre or mile, as chosen" />
            <ResultCard label="Finish time" value={formatDuration(result.totalSeconds)} sub={`Over ${fmt(result.distance, 2)} ${unit}`} />
            <ResultCard label="Distance" value={`${fmt(result.distance, 2)} ${unit}`} sub="The third side of the triangle" />
            <ResultCard label="Average speed" value={`${fmt(result.speedPerHour, 1)} ${unit}/h`} sub="Handy for treadmill settings" />
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          {filledCount > 2
            ? "All three boxes are filled. Clear one of them and the calculator will work it out from the other two."
            : "Fill in exactly two boxes: distance with time, distance with pace, or time with pace."}
        </p>
      )}
    </div>
  );
}
