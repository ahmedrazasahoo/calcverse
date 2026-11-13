"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum } from "@/components/ui";
import { TIP_PRESETS, calculateTip } from "./tip";

export default function TipCalculator() {
  const [bill, setBill] = useState("60");
  const [tipPct, setTipPct] = useState<number>(TIP_PRESETS[2]);
  const [custom, setCustom] = useState("");
  const [people, setPeople] = useState("2");

  const activePct = useMemo(() => {
    const c = parseNum(custom);
    return c !== null ? c : tipPct;
  }, [custom, tipPct]);

  const result = useMemo(() => {
    const b = parseNum(bill);
    const p = parseNum(people);
    if (b === null || p === null) return null;
    return calculateTip({ bill: b, tipPercent: activePct, people: Math.floor(p) });
  }, [bill, people, activePct]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Bill amount" htmlFor="tip-bill">
          <input id="tip-bill" type="number" min="0" step="0.01" className={inputClass} value={bill} onChange={(e) => setBill(e.target.value)} />
        </Field>
        <Field label="Custom tip %" htmlFor="tip-custom" hint="Leave empty to use a preset below">
          <input
            id="tip-custom"
            type="number"
            min="0"
            max="100"
            className={inputClass}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="e.g. 22"
          />
        </Field>
        <Field label="Number of people" htmlFor="tip-people">
          <input id="tip-people" type="number" min="1" className={inputClass} value={people} onChange={(e) => setPeople(e.target.value)} />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Tip percentage presets">
        <span className="text-sm font-medium text-gray-700">Tip:</span>
        {TIP_PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setTipPct(p);
              setCustom("");
            }}
            aria-pressed={custom === "" && tipPct === p}
            className={`min-h-11 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              custom === "" && tipPct === p
                ? "bg-brand-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-brand-50 hover:text-brand-800"
            }`}
          >
            {p}%
          </button>
        ))}
        <span className="text-sm text-gray-500">Active tip: {activePct}%</span>
      </div>

      {result ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          <ResultCard label="Tip amount" value={fmt(result.tipAmount, 2)} />
          <ResultCard label="Total bill" value={fmt(result.total, 2)} />
          <ResultCard label="Each person pays" value={fmt(result.perPerson, 2)} sub="Bill plus tip, split evenly" />
          <ResultCard label="Tip per person" value={fmt(result.tipPerPerson, 2)} />
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a bill amount and at least one person to see the split.</p>
      )}
    </div>
  );
}
