"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { ACTIVITY_LEVELS, caloriePlan, feetInchesToCm, poundsToKg, type Sex } from "./calorie";

function weeklyText(kg: number): string {
  if (kg === 0) return "Steady";
  const direction = kg < 0 ? "Lose" : "Gain";
  return `${direction} about ${fmt(Math.abs(kg), 2)} kg a week`;
}

export default function CalorieCalculator() {
  const [sex, setSex] = useState<Sex>("female");
  const [units, setUnits] = useState("metric");
  const [age, setAge] = useState("28");
  const [weight, setWeight] = useState("65");
  const [height, setHeight] = useState("165");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("5");
  const [activity, setActivity] = useState(ACTIVITY_LEVELS[1].value);

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
    return caloriePlan({ sex, ageYears, weightKg, heightCm }, activity);
  }, [sex, units, age, weight, height, heightFt, heightIn, activity]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sex" htmlFor="cal-sex">
          <select id="cal-sex" className={selectClass} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field label="Units" htmlFor="cal-units">
          <select id="cal-units" className={selectClass} value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </Field>
        <Field label="Age (years)" htmlFor="cal-age">
          <input id="cal-age" type="number" min="1" max="120" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field label={units === "metric" ? "Weight (kg)" : "Weight (lb)"} htmlFor="cal-weight">
          <input id="cal-weight" type="number" min="1" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
        {units === "metric" ? (
          <Field label="Height (cm)" htmlFor="cal-height">
            <input id="cal-height" type="number" min="1" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Height (ft)" htmlFor="cal-ft">
              <input id="cal-ft" type="number" min="0" className={inputClass} value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
            </Field>
            <Field label="Height (in)" htmlFor="cal-in">
              <input id="cal-in" type="number" min="0" max="11" className={inputClass} value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
            </Field>
          </div>
        )}
        <Field label="Activity level" htmlFor="cal-activity">
          <select id="cal-activity" className={selectClass} value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Maintenance calories" value={`${fmt(result.maintenance)} kcal`} sub="Eat this much to stay the same weight" />
            <ResultCard label="Your BMR" value={`${fmt(result.bmr)} kcal`} sub="Burned each day at complete rest" />
          </div>
          <div className="mt-4 rounded-xl border border-gray-200">
            <p className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">Daily calorie targets by goal</p>
            <ul className="divide-y divide-gray-100">
              {result.goals.map((goal) => (
                <li key={goal.key} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm">
                  <span className="text-gray-600">{goal.label}</span>
                  <span className="text-right">
                    <span className="font-semibold text-gray-900">{fmt(goal.calories)} kcal</span>
                    <span className="ml-2 text-gray-500">{weeklyText(goal.weeklyChangeKg)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            These targets are estimates built from averages. No target here ever drops below 1,200 kcal a day, and even
            that floor is too low for many people. If a target leaves you constantly hungry, tired or losing strength,
            it is the wrong target, whatever the table says.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a valid age, weight and height to see your calorie targets.</p>
      )}
    </div>
  );
}
