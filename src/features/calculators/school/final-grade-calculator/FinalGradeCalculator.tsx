"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, inputClass, parseNum, secondaryButtonClass, Select } from "@/components/ui";
import { finalNeeded, type WeightMode } from "./finalGrade";

export default function FinalGradeCalculator() {
  const [current, setCurrent] = useState("88");
  const [mode, setMode] = useState<WeightMode>("final");
  const [weight, setWeight] = useState("25");
  const [target, setTarget] = useState("90");

  const result = useMemo(() => {
    const c = parseNum(current);
    const w = parseNum(weight);
    const t = parseNum(target);
    if (c === null || w === null || t === null) return null;
    if (w <= 0 || w >= 100) return null;
    return finalNeeded(c, mode, w, t);
  }, [current, mode, weight, target]);

  const weightInvalid = parseNum(weight) !== null && (parseNum(weight)! <= 0 || parseNum(weight)! >= 100);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Current grade %" htmlFor="final-current">
          <input id="final-current" type="number" className={inputClass} value={current} onChange={(e) => setCurrent(e.target.value)} />
        </Field>
        <Field label="How will you enter the weight?" htmlFor="final-mode">
          <Select id="final-mode" value={mode} onChange={(e) => setMode(e.target.value as WeightMode)}>
            <option value="final">I know the final exam weight</option>
            <option value="current">I know the weight so far</option>
          </Select>
        </Field>
        <Field label={mode === "final" ? "Final exam weight %" : "Weight of work so far %"} htmlFor="final-weight">
          <input id="final-weight" type="number" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
        <Field label="Target grade %" htmlFor="final-target">
          <input id="final-target" type="number" className={inputClass} value={target} onChange={(e) => setTarget(e.target.value)} />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Quick pick a target letter grade">
        {[{ label: "A: 90%", value: "90" }, { label: "B: 80%", value: "80" }, { label: "C: 70%", value: "70" }, { label: "D: 60%", value: "60" }].map((b) => (
          <button key={b.label} type="button" className={secondaryButtonClass} onClick={() => setTarget(b.value)}>{b.label}</button>
        ))}
      </div>

      {weightInvalid && <div className="mt-4"><ErrorNote>The weight must be between 1 and 99 percent. A final worth 0 or 100 percent leaves nothing for the other part of the course.</ErrorNote></div>}

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard primary label="Score needed on the final" value={`${fmt(result.required, 2)}%`} sub={result.alreadySecured ? "You have already secured this target even with a zero on the final." : result.impossible ? "This target is not reachable even with 100 percent on the final. The number above is what the maths would require." : "The score you need on the final exam to hit your target."} />
            <ResultCard label="Final exam weight" value={`${fmt(result.finalWeight, 1)}%`} sub="Share of your course grade decided by the final" />
            <ResultCard label="Weight already done" value={`${fmt(result.currentWeight, 1)}%`} sub="Share of your course grade already completed" />
          </div>
          {result.alreadySecured && <p className="mt-4 text-sm font-medium text-emerald-800">Good news: your target is already secured even with a zero on the final. Still sit the exam, because a higher final lifts your overall grade further.</p>}
          {result.impossible && <p className="mt-4 text-sm font-medium text-rose-800">Heads up: this target is not reachable even with 100 percent on the final. Try a lower target to see what is still within reach.</p>}
        </div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter your current grade, weight and target" body="Fill in all three numbers and the score you need on the final will appear here." /></div>
      )}
    </div>
  );
}
