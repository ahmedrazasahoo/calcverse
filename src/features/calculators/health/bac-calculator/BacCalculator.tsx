"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, secondaryButtonClass, Select } from "@/components/ui";
import { alcoholGrams, calculateBac, DRINK_PRESETS, KG_PER_LB, type BacSex } from "./bac";

interface CustomDrink { volume: string; abv: string; count: string; }

export default function BacCalculator() {
  const [sex, setSex] = useState<BacSex>("male");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("80");
  const [hours, setHours] = useState("0");
  const [counts, setCounts] = useState<Record<string, string>>({ beer: "4", wine: "0", spirits: "0" });
  const [customs, setCustoms] = useState<CustomDrink[]>([]);

  const result = useMemo(() => {
    const w = parseNum(weight);
    const h = parseNum(hours);
    if (w === null || h === null) return null;
    let grams = 0;
    for (const p of DRINK_PRESETS) {
      const c = parseNum(counts[p.key] ?? "0");
      if (c === null || c < 0) return null;
      grams += alcoholGrams(p.volumeMl, p.abvPct) * c;
    }
    for (const cd of customs) {
      const v = parseNum(cd.volume);
      const a = parseNum(cd.abv);
      const c = parseNum(cd.count);
      if (v === null || a === null || c === null) continue;
      grams += alcoholGrams(v, a) * c;
    }
    return calculateBac({ sex, weightKg: unit === "kg" ? w : w * KG_PER_LB, totalAlcoholGrams: grams, hours: h });
  }, [sex, weight, unit, hours, counts, customs]);

  const hoursText = (v: number) => (v === 0 ? "Already there" : `About ${fmt(v, 1)} hours`);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Sex" htmlFor="bac-sex" hint="Sets the body water factor: 0.68 male, 0.55 female. These are population averages.">
          <Select id="bac-sex" value={sex} onChange={(e) => setSex(e.target.value as BacSex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Field>
        <Field label={`Body weight (${unit})`} htmlFor="bac-weight">
          <div className="flex gap-2">
            <input id="bac-weight" type="number" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Select aria-label="Weight unit" value={unit} onChange={(e) => setUnit(e.target.value as "kg" | "lb")}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </Select>
          </div>
        </Field>
        <Field label="Hours since drinking started" htmlFor="bac-hours">
          <input id="bac-hours" type="number" min={0} step="0.25" className={inputClass} value={hours} onChange={(e) => setHours(e.target.value)} />
        </Field>
      </div>

      <h3 className="mt-7 text-lg font-bold tracking-tight text-gray-900">Your drinks</h3>
      <div className="mt-3 grid gap-5 sm:grid-cols-3">
        {DRINK_PRESETS.map((p) => (
          <Field key={p.key} label={`${p.label}: how many?`} htmlFor={`bac-count-${p.key}`}>
            <input
              id={`bac-count-${p.key}`}
              type="number"
              min={0}
              step={1}
              className={inputClass}
              value={counts[p.key]}
              onChange={(e) => setCounts((prev) => ({ ...prev, [p.key]: e.target.value }))}
            />
          </Field>
        ))}
      </div>

      {customs.map((cd, i) => (
        <div key={i} className="mt-4 grid gap-5 sm:grid-cols-3">
          <Field label={`Custom drink ${i + 1}: volume (ml)`} htmlFor={`bac-cv-${i}`}>
            <input id={`bac-cv-${i}`} type="number" min={0} className={inputClass} value={cd.volume} onChange={(e) => setCustoms((prev) => prev.map((x, j) => (j === i ? { ...x, volume: e.target.value } : x)))} />
          </Field>
          <Field label="Alcohol percent (ABV)" htmlFor={`bac-ca-${i}`}>
            <input id={`bac-ca-${i}`} type="number" min={0} max={100} className={inputClass} value={cd.abv} onChange={(e) => setCustoms((prev) => prev.map((x, j) => (j === i ? { ...x, abv: e.target.value } : x)))} />
          </Field>
          <Field label="How many?" htmlFor={`bac-cc-${i}`}>
            <input id={`bac-cc-${i}`} type="number" min={0} step={1} className={inputClass} value={cd.count} onChange={(e) => setCustoms((prev) => prev.map((x, j) => (j === i ? { ...x, count: e.target.value } : x)))} />
          </Field>
        </div>
      ))}
      <button type="button" className={`${secondaryButtonClass} mt-4`} onClick={() => setCustoms((prev) => [...prev, { volume: "250", abv: "5", count: "1" }])}>
        Add a custom drink
      </button>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Estimated current BAC" value={`${fmt(result.currentBac, 3)}%`} sub="After elimination for the hours entered" primary />
            <ResultCard label="Estimated peak BAC" value={`${fmt(result.peakBac, 3)}%`} sub="With no elimination, straight after drinking" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Until 0.08%" value={hoursText(result.hoursUntil008)} sub="A common legal limit, but limits vary" />
            <ResultCard label="Until 0.05%" value={hoursText(result.hoursUntil005)} sub="The limit in many countries" />
            <ResultCard label="Until 0.00%" value={hoursText(result.hoursUntilZero)} sub="Until the estimate fully clears" />
          </div>
          <p className="mt-5 text-sm leading-relaxed font-medium text-rose-800">
            This is a rough estimate only. Many factors change real BAC, including food, drinking speed, body
            composition and medication, so your true level could be higher. Never drive after drinking. Legal limits
            vary by place, and this tool is not medical advice.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Enter your details" body="Add your weight, drinks and hours since drinking started to see an estimated BAC." />
        </div>
      )}
    </div>
  );
}
