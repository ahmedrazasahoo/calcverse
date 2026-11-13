"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  calculateBmr,
  feetInchesToCm,
  katchMcArdleBmr,
  poundsToKg,
  type BmrFormula,
  type Sex,
} from "./bmr";

const FORMULA_OPTIONS: { value: BmrFormula; label: string }[] = [
  { value: "mifflin", label: "Mifflin St Jeor (1990)" },
  { value: "harris-revised", label: "Harris Benedict revised (1984)" },
  { value: "harris-original", label: "Harris Benedict original (1919)" },
];

export default function BmrCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [units, setUnits] = useState("metric");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("178");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [formula, setFormula] = useState<BmrFormula>("mifflin");
  const [bodyFat, setBodyFat] = useState("");

  const result = useMemo(() => {
    const ageYears = parseNum(age);
    const rawWeight = parseNum(weight);
    if (ageYears === null || rawWeight === null) return null;
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
    const stats = { sex, ageYears, weightKg, heightCm };
    const selected = calculateBmr(stats, formula);
    if (selected === null) return null;
    const fat = parseNum(bodyFat);
    return {
      selected,
      all: FORMULA_OPTIONS.map((option) => ({
        label: option.label,
        value: calculateBmr(stats, option.value),
      })),
      katch: fat === null ? null : katchMcArdleBmr(weightKg, fat),
    };
  }, [sex, units, age, weight, height, heightFt, heightIn, formula, bodyFat]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sex" htmlFor="bmr-sex">
          <select id="bmr-sex" className={selectClass} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field label="Units" htmlFor="bmr-units">
          <select id="bmr-units" className={selectClass} value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </Field>
        <Field label="Age (years)" htmlFor="bmr-age">
          <input id="bmr-age" type="number" min="1" max="120" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field label={units === "metric" ? "Weight (kg)" : "Weight (lb)"} htmlFor="bmr-weight">
          <input id="bmr-weight" type="number" min="1" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
        {units === "metric" ? (
          <Field label="Height (cm)" htmlFor="bmr-height">
            <input id="bmr-height" type="number" min="1" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Height (ft)" htmlFor="bmr-ft">
              <input id="bmr-ft" type="number" min="0" className={inputClass} value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
            </Field>
            <Field label="Height (in)" htmlFor="bmr-in">
              <input id="bmr-in" type="number" min="0" max="11" className={inputClass} value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
            </Field>
          </div>
        )}
        <Field label="Formula" htmlFor="bmr-formula">
          <select id="bmr-formula" className={selectClass} value={formula} onChange={(e) => setFormula(e.target.value as BmrFormula)}>
            {FORMULA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Body fat percent (optional)" htmlFor="bmr-bodyfat" hint="Fill this in to also see the Katch McArdle result, which is based on lean body mass.">
          <input id="bmr-bodyfat" type="number" min="2" max="70" className={inputClass} value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder="e.g. 20" />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Your BMR" value={`${fmt(result.selected)} kcal`} sub="Calories burned per day at complete rest" />
            {result.katch !== null && (
              <ResultCard label="Katch McArdle BMR" value={`${fmt(result.katch)} kcal`} sub="Based on your lean body mass" />
            )}
          </div>
          <div className="mt-4 rounded-xl border border-gray-200">
            <p className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">How the formulas compare for you</p>
            <ul className="divide-y divide-gray-100">
              {result.all.map((row) => (
                <li key={row.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-600">{row.label}</span>
                  <span className="font-semibold text-gray-900">{row.value === null ? "n/a" : `${fmt(row.value)} kcal`}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            BMR is the energy your body uses just to stay alive: breathing, circulation, cell repair and keeping warm.
            It is not a target for how much to eat. Real daily needs are higher, because BMR does not include any
            movement at all.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a valid age, weight and height to see your BMR.</p>
      )}
    </div>
  );
}
