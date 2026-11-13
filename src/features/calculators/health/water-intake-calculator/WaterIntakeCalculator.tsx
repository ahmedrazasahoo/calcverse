"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { CLIMATE_OPTIONS, dailyWaterIntake, poundsToKg, type ClimateKey } from "./waterIntake";

export default function WaterIntakeCalculator() {
  const [units, setUnits] = useState("metric");
  const [weight, setWeight] = useState("70");
  const [exercise, setExercise] = useState("30");
  const [climate, setClimate] = useState<ClimateKey>("temperate");

  const result = useMemo(() => {
    const rawWeight = parseNum(weight);
    const exerciseMinutes = parseNum(exercise);
    if (rawWeight === null || exerciseMinutes === null) return null;
    const weightKg = units === "metric" ? rawWeight : poundsToKg(rawWeight);
    return dailyWaterIntake({ weightKg, exerciseMinutes, climate });
  }, [units, weight, exercise, climate]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Units" htmlFor="wi-units">
          <select id="wi-units" className={selectClass} value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (kg)</option>
            <option value="imperial">Imperial (lb)</option>
          </select>
        </Field>
        <Field label={units === "metric" ? "Body weight (kg)" : "Body weight (lb)"} htmlFor="wi-weight">
          <input id="wi-weight" type="number" min="1" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
        <Field label="Exercise today (minutes)" htmlFor="wi-exercise">
          <input id="wi-exercise" type="number" min="0" max="1440" className={inputClass} value={exercise} onChange={(e) => setExercise(e.target.value)} />
        </Field>
        <Field label="Climate" htmlFor="wi-climate">
          <select id="wi-climate" className={selectClass} value={climate} onChange={(e) => setClimate(e.target.value as ClimateKey)}>
            {CLIMATE_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Water per day" value={`${fmt(result.liters, 2)} L`} sub={`${fmt(result.milliliters)} ml in total`} />
            <ResultCard label="In cups" value={fmt(result.cups, 1)} sub="Cups of 250 ml" />
            <ResultCard label="In fluid ounces" value={fmt(result.fluidOunces, 0)} sub="US fluid ounces" />
            <ResultCard label="Extra for exercise" value={`${fmt(result.exerciseMilliliters)} ml`} sub="On top of your base needs" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Treat this as a planning figure, not a prescription. Food provides roughly a fifth of daily water, and
            thirst is a reliable guide for most healthy adults. Pale yellow urine is a practical sign you are drinking
            enough; constantly clear urine can mean you are overdoing it.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter your weight and exercise minutes to see your daily water target.</p>
      )}
    </div>
  );
}
