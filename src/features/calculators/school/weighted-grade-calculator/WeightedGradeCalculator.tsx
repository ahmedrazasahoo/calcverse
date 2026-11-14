"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, secondaryButtonClass } from "@/components/ui";
import { computeWeightedGrade } from "./weightedGrade";

interface Row { id: number; grade: string; weight: string }
let nextId = 100;

export default function WeightedGradeCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, grade: "92", weight: "30" },
    { id: 2, grade: "85", weight: "30" },
    { id: 3, grade: "78", weight: "40" },
  ]);

  const result = useMemo(() => {
    const items = rows.map((r) => ({ score: parseNum(r.grade), weight: parseNum(r.weight) })).filter((i): i is { score: number; weight: number } => i.score !== null && i.weight !== null && i.weight > 0);
    if (items.length === 0) return null;
    return computeWeightedGrade(items);
  }, [rows]);

  return (
    <div>
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={row.id} className="grid gap-3 sm:grid-cols-[1fr_1fr_90px]">
            <Field label={idx === 0 ? "Grade %" : ""} htmlFor={`wg-grade-${row.id}`}>
              <input id={`wg-grade-${row.id}`} type="number" className={inputClass} value={row.grade} onChange={(e) => setRows(rows.map((r) => r.id === row.id ? { ...r, grade: e.target.value } : r))} placeholder="e.g. 88" />
            </Field>
            <Field label={idx === 0 ? "Weight %" : ""} htmlFor={`wg-weight-${row.id}`}>
              <input id={`wg-weight-${row.id}`} type="number" className={inputClass} value={row.weight} onChange={(e) => setRows(rows.map((r) => r.id === row.id ? { ...r, weight: e.target.value } : r))} placeholder="e.g. 25" />
            </Field>
            <div className="flex items-end pb-1">
              <button type="button" className={secondaryButtonClass} onClick={() => setRows(rows.filter((r) => r.id !== row.id))}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className={secondaryButtonClass} onClick={() => { nextId += 1; setRows([...rows, { id: nextId, grade: "", weight: "" }]); }}>Add row</button>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard primary label="Weighted grade" value={`${fmt(result.percent, 2)}%`} sub="Normalised so your entered weights act as proportions" />
            <ResultCard label="Letter grade" value={result.letter} sub={`Worth ${fmt(result.points, 1)} points on the 4.0 scale`} />
            <ResultCard label="Total weight entered" value={`${fmt(result.totalWeight, 1)}%`} sub={result.isComplete ? "Your weights add to 100 percent, so this is your exact course result." : "Your weights do not add to 100 percent yet."} />
          </div>
          {!result.isComplete && (
            <p className="mt-4 rounded-3xl bg-amber-50/80 px-5 py-3.5 text-sm leading-relaxed font-medium text-amber-900 ring-1 ring-amber-200/80">
              Warning: your weights add to {fmt(result.totalWeight, 1)} percent, not 100 percent. The result above is normalised, meaning each weight is treated as a share of {fmt(result.totalWeight, 1)} rather than of 100. That is correct while a category is still missing or unfinished, but it is not the same as a final course grade until the weights reach 100.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-7"><EmptyState title="Add at least one grade and weight" body="Enter a grade percent with its weight and your weighted result will appear here." /></div>
      )}
    </div>
  );
}
