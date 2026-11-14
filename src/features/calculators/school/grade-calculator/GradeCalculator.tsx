"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, secondaryButtonClass, selectClass } from "@/components/ui";
import { gradePoints, letterGrade, pointsPercent, weightedAverage } from "./grades";

interface WRow { id: number; name: string; score: string; weight: string }
interface PRow { id: number; name: string; earned: string; possible: string }

let nextId = 100;

export default function GradeCalculator() {
  const [mode, setMode] = useState<"weighted" | "points">("weighted");
  const [wRows, setWRows] = useState<WRow[]>([
    { id: 1, name: "Homework", score: "92", weight: "20" },
    { id: 2, name: "Quizzes", score: "88", weight: "20" },
    { id: 3, name: "Tests", score: "84", weight: "40" },
    { id: 4, name: "Final exam", score: "90", weight: "20" },
  ]);
  const [pRows, setPRows] = useState<PRow[]>([
    { id: 1, name: "Homework", earned: "184", possible: "200" },
    { id: 2, name: "Tests", earned: "255", possible: "300" },
  ]);

  const result = useMemo(() => {
    if (mode === "weighted") {
      const items = wRows.map((r) => ({ score: parseNum(r.score), weight: parseNum(r.weight) })).filter((i): i is { score: number; weight: number } => i.score !== null && i.weight !== null && i.weight > 0);
      if (items.length === 0) return null;
      const percent = weightedAverage(items);
      return { percent, letter: letterGrade(percent), points: gradePoints(percent) };
    }
    const items = pRows.map((r) => ({ earned: parseNum(r.earned), possible: parseNum(r.possible) })).filter((i): i is { earned: number; possible: number } => i.earned !== null && i.possible !== null && i.possible > 0);
    if (items.length === 0) return null;
    const percent = pointsPercent(items);
    return { percent, letter: letterGrade(percent), points: gradePoints(percent) };
  }, [mode, wRows, pRows]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Grading method" htmlFor="grade-mode">
          <select id="grade-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as "weighted" | "points")}>
            <option value="weighted">Weighted categories (score and weight)</option>
            <option value="points">Points based (earned out of possible)</option>
          </select>
        </Field>
      </div>

      {mode === "weighted" ? (
        <div className="mt-6 space-y-3">
          {wRows.map((row, idx) => (
            <div key={row.id} className="grid gap-3 sm:grid-cols-[1fr_110px_110px_90px]">
              <Field label={idx === 0 ? "Category name" : ""} htmlFor={`w-name-${row.id}`}>
                <input id={`w-name-${row.id}`} className={inputClass} value={row.name} onChange={(e) => setWRows(wRows.map((r) => r.id === row.id ? { ...r, name: e.target.value } : r))} placeholder="Category" />
              </Field>
              <Field label={idx === 0 ? "Score %" : ""} htmlFor={`w-score-${row.id}`}>
                <input id={`w-score-${row.id}`} type="number" className={inputClass} value={row.score} onChange={(e) => setWRows(wRows.map((r) => r.id === row.id ? { ...r, score: e.target.value } : r))} />
              </Field>
              <Field label={idx === 0 ? "Weight %" : ""} htmlFor={`w-weight-${row.id}`}>
                <input id={`w-weight-${row.id}`} type="number" className={inputClass} value={row.weight} onChange={(e) => setWRows(wRows.map((r) => r.id === row.id ? { ...r, weight: e.target.value } : r))} />
              </Field>
              <div className="flex items-end pb-1">
                <button type="button" className={secondaryButtonClass} onClick={() => setWRows(wRows.filter((r) => r.id !== row.id))}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className={secondaryButtonClass} onClick={() => { nextId += 1; setWRows([...wRows, { id: nextId, name: "", score: "", weight: "" }]); }}>Add category</button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {pRows.map((row, idx) => (
            <div key={row.id} className="grid gap-3 sm:grid-cols-[1fr_110px_110px_90px]">
              <Field label={idx === 0 ? "Assignment name" : ""} htmlFor={`p-name-${row.id}`}>
                <input id={`p-name-${row.id}`} className={inputClass} value={row.name} onChange={(e) => setPRows(pRows.map((r) => r.id === row.id ? { ...r, name: e.target.value } : r))} placeholder="Assignment" />
              </Field>
              <Field label={idx === 0 ? "Points earned" : ""} htmlFor={`p-earned-${row.id}`}>
                <input id={`p-earned-${row.id}`} type="number" className={inputClass} value={row.earned} onChange={(e) => setPRows(pRows.map((r) => r.id === row.id ? { ...r, earned: e.target.value } : r))} />
              </Field>
              <Field label={idx === 0 ? "Points possible" : ""} htmlFor={`p-possible-${row.id}`}>
                <input id={`p-possible-${row.id}`} type="number" className={inputClass} value={row.possible} onChange={(e) => setPRows(pRows.map((r) => r.id === row.id ? { ...r, possible: e.target.value } : r))} />
              </Field>
              <div className="flex items-end pb-1">
                <button type="button" className={secondaryButtonClass} onClick={() => setPRows(pRows.filter((r) => r.id !== row.id))}>Remove</button>
              </div>
            </div>
          ))}
          <button type="button" className={secondaryButtonClass} onClick={() => { nextId += 1; setPRows([...pRows, { id: nextId, name: "", earned: "", possible: "" }]); }}>Add assignment</button>
        </div>
      )}

      {result ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-3" aria-live="polite">
          <ResultCard primary label="Current grade" value={`${fmt(result.percent, 2)}%`} sub="Your overall percent from the rows above" />
          <ResultCard label="Letter grade" value={result.letter} sub="On the standard plus and minus scale" />
          <ResultCard label="GPA points" value={fmt(result.points, 1)} sub="Grade points on the 4.0 scale for this percent" />
        </div>
      ) : (
        <div className="mt-7"><EmptyState title="Add at least one complete row" body="Enter a score with a weight, or points earned out of points possible, and your grade will appear here." /></div>
      )}
    </div>
  );
}
