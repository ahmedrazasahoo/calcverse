"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  ACTIVITY_LEVELS,
  calculateBmr,
  calculateTdee,
  calorieTargets,
  feetInchesToCm,
  macroSplit,
  poundsToKg,
  type Sex,
} from "./tdee";

export default function TdeeCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [units, setUnits] = useState("metric");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("178");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [activity, setActivity] = useState(ACTIVITY_LEVELS[2].value);

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

    const bmr = calculateBmr({ sex, ageYears, weightKg, heightCm });
    if (bmr === null) return null;
    const tdee = calculateTdee(bmr, activity);
    return { bmr, tdee, targets: calorieTargets(tdee), macros: macroSplit(tdee) };
  }, [sex, units, age, weight, height, heightFt, heightIn, activity]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sex" htmlFor="tdee-sex">
          <select id="tdee-sex" className={selectClass} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field label="Units" htmlFor="tdee-units">
          <select id="tdee-units" className={selectClass} value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </Field>
        <Field label="Age (years)" htmlFor="tdee-age">
          <input id="tdee-age" type="number" min="1" max="120" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field label={units === "metric" ? "Weight (kg)" : "Weight (lb)"} htmlFor="tdee-weight">
          <input id="tdee-weight" type="number" min="1" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
        {units === "metric" ? (
          <Field label="Height (cm)" htmlFor="tdee-height">
            <input id="tdee-height" type="number" min="1" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Height (ft)" htmlFor="tdee-ft">
              <input id="tdee-ft" type="number" min="0" className={inputClass} value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
            </Field>
            <Field label="Height (in)" htmlFor="tdee-in">
              <input id="tdee-in" type="number" min="0" max="11" className={inputClass} value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
            </Field>
          </div>
        )}
        <Field label="Activity level" htmlFor="tdee-activity">
          <select
            id="tdee-activity"
            className={selectClass}
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
          >
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Your TDEE" value={`${fmt(result.tdee)} kcal`} sub="Calories burned per day" />
            <ResultCard label="BMR" value={`${fmt(result.bmr)} kcal`} sub="Burned at complete rest" />
            <ResultCard label="Lose weight" value={`${fmt(result.targets.lose)} kcal`} sub="About 0.5 kg per week" />
            <ResultCard label="Gain weight" value={`${fmt(result.targets.gain)} kcal`} sub="About 0.5 kg per week" />
          </div>
          <div className="mt-4 rounded-2xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Suggested daily macros at maintenance ({fmt(result.tdee)} kcal)
            </p>
            <div className="mt-3 grid gap-3 text-center sm:grid-cols-3">
              <p className="rounded-xl bg-gray-50 py-3">
                <span className="block text-lg font-bold text-gray-900">{fmt(result.macros.proteinGrams)} g</span>
                <span className="text-xs tracking-wide text-gray-500 uppercase">Protein (30%)</span>
              </p>
              <p className="rounded-xl bg-gray-50 py-3">
                <span className="block text-lg font-bold text-gray-900">{fmt(result.macros.carbsGrams)} g</span>
                <span className="text-xs tracking-wide text-gray-500 uppercase">Carbs (40%)</span>
              </p>
              <p className="rounded-xl bg-gray-50 py-3">
                <span className="block text-lg font-bold text-gray-900">{fmt(result.macros.fatGrams)} g</span>
                <span className="text-xs tracking-wide text-gray-500 uppercase">Fat (30%)</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a valid age, weight and height to see your daily calorie needs.</p>
      )}
    </div>
  );
}
