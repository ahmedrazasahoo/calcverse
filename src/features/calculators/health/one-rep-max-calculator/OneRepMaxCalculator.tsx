"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { estimateOneRepMax, KG_PER_LB, percentageTable } from "./oneRepMax";

export default function OneRepMaxCalculator() {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("10");

  const result = useMemo(() => {
    const w = parseNum(weight);
    const r = parseNum(reps);
    if (w === null || r === null) return null;
    const est = estimateOneRepMax(unit === "kg" ? w : w * KG_PER_LB, r);
    if (!est) return null;
    const toUnit = (kg: number) => (unit === "kg" ? kg : kg / KG_PER_LB);
    return { est, toUnit, table: percentageTable(est.average) };
  }, [weight, reps, unit]);

  const repsN = parseNum(reps);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label={`Weight lifted (${unit})`} htmlFor="orm-weight">
          <div className="flex gap-2">
            <input id="orm-weight" type="number" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Select aria-label="Weight unit" value={unit} onChange={(e) => setUnit(e.target.value as "kg" | "lb")}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </Select>
          </div>
        </Field>
        <Field label="Reps completed" htmlFor="orm-reps" hint="Between 1 and 15. Estimates get less reliable above 10 reps.">
          <input id="orm-reps" type="number" min={1} max={15} step={1} className={inputClass} value={reps} onChange={(e) => setReps(e.target.value)} />
        </Field>
      </div>
      {repsN !== null && repsN > 10 && (
        <p className="mt-4 text-sm leading-relaxed text-amber-800">Note: estimates from sets above 10 reps are less reliable, because endurance starts to matter as much as strength.</p>
      )}

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Estimated one rep max" value={`${fmt(result.toUnit(result.est.average), 1)} ${unit}`} sub="Average of seven established formulas" primary />
            <ResultCard label="Formulas compared" value={`${fmt(result.toUnit(Math.min(...result.est.estimates.map((e) => e.value))), 1)} to ${fmt(result.toUnit(Math.max(...result.est.estimates.map((e) => e.value))), 1)} ${unit}`} sub="The spread across all seven formulas" />
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">By formula</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.est.estimates.map((e) => (
              <ResultCard key={e.name} label={e.name} value={`${fmt(result.toUnit(e.value), 1)} ${unit}`} />
            ))}
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Percentage table (a guide)</h3>
          <div className="glass mt-3 overflow-x-auto rounded-[1.75rem] p-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2 pr-4 font-semibold">Percent of max</th>
                  <th className="py-2 pr-4 font-semibold">Weight</th>
                  <th className="py-2 font-semibold">Typical reps</th>
                </tr>
              </thead>
              <tbody>
                {result.table.map((row) => (
                  <tr key={row.pct} className="border-t border-gray-900/5 text-gray-800">
                    <td className="py-2 pr-4 tabular-nums">{row.pct}%</td>
                    <td className="py-2 pr-4 tabular-nums">{fmt(result.toUnit(row.weight), 1)} {unit}</td>
                    <td className="py-2 tabular-nums">{row.typicalReps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-600">Typical reps at each percentage are approximate and vary by lifter and exercise. Use the table as a guide, not a target to force.</p>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Enter a set" body="Add a weight and between 1 and 15 reps to estimate your one rep max." />
        </div>
      )}
    </div>
  );
}
