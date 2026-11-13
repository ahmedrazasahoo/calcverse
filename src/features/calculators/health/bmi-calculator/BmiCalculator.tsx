"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  calculateBmi,
  classifyBmi,
  feetInchesToCm,
  healthyWeightRangeKg,
  kgToPounds,
  poundsToKg,
  type BmiCategoryKey,
} from "./bmi";

const CATEGORY_STYLES: Record<BmiCategoryKey, string> = {
  "severe-thinness": "bg-sky-100 text-sky-900",
  "moderate-thinness": "bg-sky-100 text-sky-900",
  "mild-thinness": "bg-sky-100 text-sky-900",
  healthy: "bg-emerald-100 text-emerald-900",
  overweight: "bg-amber-100 text-amber-900",
  "obese-class-1": "bg-rose-100 text-rose-900",
  "obese-class-2": "bg-rose-100 text-rose-900",
  "obese-class-3": "bg-rose-100 text-rose-900",
};

export default function BmiCalculator() {
  const [units, setUnits] = useState("metric");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("178");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");

  const result = useMemo(() => {
    const rawWeight = parseNum(weight);
    if (rawWeight === null) return null;
    let weightKg = rawWeight;
    let heightCm: number | null;
    if (units === "metric") {
      heightCm = parseNum(height);
    } else {
      const ft = parseNum(heightFt);
      const inch = parseNum(heightIn);
      if (ft === null || inch === null) return null;
      heightCm = feetInchesToCm(ft, inch);
      weightKg = poundsToKg(rawWeight);
    }
    if (heightCm === null) return null;
    const bmi = calculateBmi(weightKg, heightCm);
    if (bmi === null) return null;
    const category = classifyBmi(bmi);
    const range = healthyWeightRangeKg(heightCm);
    if (!category || !range) return null;
    return { bmi, category, range };
  }, [units, weight, height, heightFt, heightIn]);

  const rangeText = result
    ? units === "metric"
      ? `${fmt(result.range.minKg, 1)} kg to ${fmt(result.range.maxKg, 1)} kg`
      : `${fmt(kgToPounds(result.range.minKg), 1)} lb to ${fmt(kgToPounds(result.range.maxKg), 1)} lb`
    : "";

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Units" htmlFor="bmi-units">
          <select id="bmi-units" className={selectClass} value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </Field>
        <Field label={units === "metric" ? "Weight (kg)" : "Weight (lb)"} htmlFor="bmi-weight">
          <input id="bmi-weight" type="number" min="1" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
        {units === "metric" ? (
          <Field label="Height (cm)" htmlFor="bmi-height">
            <input id="bmi-height" type="number" min="1" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Height (ft)" htmlFor="bmi-ft">
              <input id="bmi-ft" type="number" min="0" className={inputClass} value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
            </Field>
            <Field label="Height (in)" htmlFor="bmi-in">
              <input id="bmi-in" type="number" min="0" max="11" className={inputClass} value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
            </Field>
          </div>
        )}
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Your BMI" value={fmt(result.bmi, 1)} sub="Body mass index" />
            <div className="rounded-xl bg-gray-50 px-4 py-4">
              <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">WHO category</p>
              <p className="mt-1.5">
                <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${CATEGORY_STYLES[result.category.key]}`}>
                  {result.category.label}
                </span>
              </p>
              <p className="mt-1.5 text-sm text-gray-600">Band: {result.category.rangeLabel}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            For your height, the healthy weight range is <strong className="text-gray-900">{rangeText}</strong>. BMI is a
            screening number for adults. It does not tell body fat from muscle, so very muscular people can score high
            without excess fat, and older adults can score normal while carrying more fat than is healthy.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a valid weight and height to see your BMI.</p>
      )}
    </div>
  );
}
