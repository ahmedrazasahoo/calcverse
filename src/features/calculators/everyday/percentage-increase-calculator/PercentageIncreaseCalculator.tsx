"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { applyIncrease, increaseBetween } from "./percentage-increase";

type Mode = "between" | "apply";

export default function PercentageIncreaseCalculator() {
  const [mode, setMode] = useState<Mode>("between");
  const [oldValue, setOldValue] = useState("80");
  const [newValue, setNewValue] = useState("100");
  const [value, setValue] = useState("150");
  const [percent, setPercent] = useState("20");

  const between = useMemo(() => {
    if (mode !== "between") return null;
    const oldNum = parseNum(oldValue);
    const newNum = parseNum(newValue);
    if (oldNum === null || newNum === null) return null;
    try {
      return increaseBetween(oldNum, newNum);
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
      return applyIncrease(v, p);
    } catch {
      return null;
    }
  }, [mode, value, percent]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you want to do?" htmlFor="pi-mode">
          <select id="pi-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="between">Increase between two numbers</option>
            <option value="apply">Increase a number by a percent</option>
          </select>
        </Field>
      </div>

      {mode === "between" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Old value" htmlFor="pi-old">
              <input id="pi-old" type="number" className={inputClass} value={oldValue} onChange={(e) => setOldValue(e.target.value)} />
            </Field>
            <Field label="New value" htmlFor="pi-new">
              <input id="pi-new" type="number" className={inputClass} value={newValue} onChange={(e) => setNewValue(e.target.value)} />
            </Field>
          </div>
          {between ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
              <ResultCard
                label="Percentage change"
                value={`${fmt(between.percentChange, 2)}%`}
                sub={between.isIncrease ? "The new value is higher than the old value, so this is an increase." : "The new value is lower than the old value, so this is actually a decrease."}
              />
              <ResultCard
                label="Difference"
                value={fmt(between.difference, 2)}
                sub="The new value minus the old value, before turning it into a percentage."
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
            <Field label="Number to increase" htmlFor="pi-value">
              <input id="pi-value" type="number" className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
            </Field>
            <Field label="Increase by (percent)" htmlFor="pi-percent">
              <input id="pi-percent" type="number" min="0" className={inputClass} value={percent} onChange={(e) => setPercent(e.target.value)} />
            </Field>
          </div>
          {applied ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
              <ResultCard
                label="New value"
                value={fmt(applied.increasedValue, 2)}
                sub="Your starting number after the percentage increase has been added."
              />
              <ResultCard
                label="Amount added"
                value={fmt(applied.addedAmount, 2)}
                sub="The extra amount the increase put on top of the starting number."
              />
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter a number and a percent of zero or more to see the increased value.
            </p>
          )}
        </>
      )}
    </div>
  );
}
