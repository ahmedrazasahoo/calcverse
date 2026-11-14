"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Field, inputClass } from "@/components/fields";
import { fmt, parseNum } from "@/lib/format";
import { percentOf, percentageChange, whatPercent } from "./percentage";

function ModeCard({ title, children, result }: { title: string; children: ReactNode; result: string | null }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300">
      <h3 className="text-[15px] font-semibold tracking-tight text-slate-900">{title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
      <p className="mt-4 rounded-lg bg-slate-900 px-4 py-3 font-mono text-[15px] font-semibold text-white tabular-nums" aria-live="polite">
        {result ?? "Enter both numbers to see the answer"}
      </p>
    </div>
  );
}

export default function PercentageCalculator() {
  const [a1, setA1] = useState("15");
  const [a2, setA2] = useState("200");
  const [b1, setB1] = useState("45");
  const [b2, setB2] = useState("180");
  const [c1, setC1] = useState("120");
  const [c2, setC2] = useState("150");

  const modeA = useMemo(() => {
    const x = parseNum(a1);
    const y = parseNum(a2);
    if (x === null || y === null) return null;
    const value = percentOf(x, y);
    return value === null ? null : `${fmt(x)}% of ${fmt(y)} is ${fmt(value, 2)}`;
  }, [a1, a2]);

  const modeB = useMemo(() => {
    const x = parseNum(b1);
    const y = parseNum(b2);
    if (x === null || y === null) return null;
    const value = whatPercent(x, y);
    return value === null ? "Cannot divide by zero: the whole cannot be 0" : `${fmt(x)} is ${fmt(value, 2)}% of ${fmt(y)}`;
  }, [b1, b2]);

  const modeC = useMemo(() => {
    const from = parseNum(c1);
    const to = parseNum(c2);
    if (from === null || to === null) return null;
    const result = percentageChange(from, to);
    if (result === null) return "Cannot work out change from a starting value of 0";
    const label = result.direction === "no-change" ? "change" : result.direction;
    return `From ${fmt(from)} to ${fmt(to)} is a ${fmt(Math.abs(result.change), 2)}% ${label}`;
  }, [c1, c2]);

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <ModeCard title="What is X% of Y?" result={modeA}>
        <Field label="Percent (X)" htmlFor="pct-a1">
          <input id="pct-a1" type="number" className={inputClass} value={a1} onChange={(e) => setA1(e.target.value)} />
        </Field>
        <Field label="Number (Y)" htmlFor="pct-a2">
          <input id="pct-a2" type="number" className={inputClass} value={a2} onChange={(e) => setA2(e.target.value)} />
        </Field>
      </ModeCard>

      <ModeCard title="X is what percent of Y?" result={modeB}>
        <Field label="Part (X)" htmlFor="pct-b1">
          <input id="pct-b1" type="number" className={inputClass} value={b1} onChange={(e) => setB1(e.target.value)} />
        </Field>
        <Field label="Whole (Y)" htmlFor="pct-b2">
          <input id="pct-b2" type="number" className={inputClass} value={b2} onChange={(e) => setB2(e.target.value)} />
        </Field>
      </ModeCard>

      <ModeCard title="Percentage change" result={modeC}>
        <Field label="From" htmlFor="pct-c1">
          <input id="pct-c1" type="number" className={inputClass} value={c1} onChange={(e) => setC1(e.target.value)} />
        </Field>
        <Field label="To" htmlFor="pct-c2">
          <input id="pct-c2" type="number" className={inputClass} value={c2} onChange={(e) => setC2(e.target.value)} />
        </Field>
      </ModeCard>
    </div>
  );
}
