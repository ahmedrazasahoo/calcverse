"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { applyDecrease, decreaseBetween } from "./percentage-decrease";

type Mode = "between" | "apply";

export default function PercentageDecreaseCalculator() {
  const [mode, setMode] = useState<Mode>("between");
  const [oldValue, setOldValue] = useState("200");
  const [newValue, setNewValue] = useState("150");
  const [value, setValue] = useState("80");
  const [percent, setPercent] = useState("25");

  const between = useMemo(() => {
    if (mode !== "between") return null;
    const oldNum = parseNum(oldValue);
    const newNum = parseNum(newValue);
    if (oldNum === null || newNum === null) return null;
    try {
      return decreaseBetween(oldNum, newNum);
    } catch {
      return null;
    }
  }, [mode, oldValue, newValue]);

  const applied = useMemo(() => {
    if (mode !== "apply") return null;
    const v = parseNum(value);
    const p = parseNum(percent);
    if (v === null || p === null) return null;
    try {
      return applyDecrease(v, p);
    } catch {
      return null;
    }
  }, [mode, value, percent]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you want to do?" htmlFor="pd-mode">
          <select id="pd-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="between">Decrease between two numbers</option>
            <option value="apply">Decrease a number by a percent</option>
          </select>
        </Field>
      </div>

      {mode === "between" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Old value" htmlFor="pd-old">
              <input id="pd-old" type="number" className={inputClass} value={oldValue} onChange={(e) => setOldValue(e.target.value)} />
            </Field>
            <Field label="New value" htmlFor="pd-new">
              <input id="pd-new" type="number" className={inputClass} value={newValue} onChange={(e) => setNewValue(e.target.value)} />
            </Field>
          </div>
          {between ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
              <ResultCard
                label="Percentage drop"
                value={`${fmt(between.percentDrop, 2)}%`}
                sub={between.isDecrease ? "The new value sits below the old value, so this is a real decrease." : "The new value is not below the old one, so there is no decrease here."}
              />
              <ResultCard
                label="Difference"
                value={fmt(between.difference, 2)}
                sub="The old value minus the new value. A positive figure means the number shrank."
              />
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter both values, and make sure the old value is not zero.
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Number to reduce" htmlFor="pd-value">
              <input id="pd-value" type="number" className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
            </Field>
            <Field label="Decrease by (percent)" htmlFor="pd-percent">
              <input id="pd-percent" type="number" min="0" max="100" className={inputClass} value={percent} onChange={(e) => setPercent(e.target.value)} />
            </Field>
          </div>
          {applied ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
              <ResultCard
                label="Reduced value"
                value={fmt(applied.reducedValue, 2)}
                sub="What is left of your starting number once the percentage has been taken off."
              />
              <ResultCard
                label="Amount removed"
                value={fmt(applied.amountRemoved, 2)}
                sub="The slice the decrease cut away from the starting number."
              />
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter a number and a percent between 0 and 100 to see the reduced value.
            </p>
          )}
        </>
      )}
    </div>
  );
}
