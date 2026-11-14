"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { calculateProtein, KG_PER_LB, PROTEIN_FACTORS } from "./protein";

export default function ProteinCalculator() {
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("70");
  const [factorKey, setFactorKey] = useState("active");

  const result = useMemo(() => {
    const w = parseNum(weight);
    if (w === null) return null;
    return calculateProtein(unit === "kg" ? w : w * KG_PER_LB, factorKey);
  }, [weight, unit, factorKey]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`Body weight (${unit})`} htmlFor="protein-weight">
          <div className="flex gap-2">
            <input id="protein-weight" type="number" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Select aria-label="Weight unit" value={unit} onChange={(e) => setUnit(e.target.value as "kg" | "lb")}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </Select>
          </div>
        </Field>
        <Field label="Activity and goal" htmlFor="protein-factor">
          <Select id="protein-factor" value={factorKey} onChange={(e) => setFactorKey(e.target.value)}>
            {PROTEIN_FACTORS.map((f) => (
              <option key={f.key} value={f.key}>{f.label} ({fmt(f.gramsPerKg, 1)} g per kg)</option>
            ))}
          </Select>
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label="Recommended protein" value={`${fmt(result.recommendedGrams)} g per day`} sub={`${fmt(result.gramsPerLbBodyWeight, 2)} g per lb of body weight`} primary />
            <ResultCard label="Sensible range" value={`${fmt(result.lowGrams)} to ${fmt(result.highGrams)} g`} sub="Staying inside this band most days is a realistic target" />
            <ResultCard label="Factor used" value={`${fmt(result.factor, 1)} g per kg`} sub="Grams of protein per kilogram of body weight" />
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Per meal split</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {result.perMeal.map((m) => (
              <ResultCard key={m.meals} label={`${m.meals} meals a day`} value={`${fmt(m.grams)} g per meal`} sub="Your daily total divided evenly" />
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            This is general nutrition information only. If you have kidney problems or any medical condition that
            affects protein intake, get professional advice before changing your diet.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Enter your weight" body="Add your body weight and pick your activity level to see your daily protein target." />
        </div>
      )}
    </div>
  );
}
