"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { feetInchesToCm, idealWeight, kgToPounds, type Sex } from "./idealWeight";

export default function IdealWeightCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [units, setUnits] = useState("metric");
  const [height, setHeight] = useState("178");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");

  const result = useMemo(() => {
    let heightCm: number | null;
    if (units === "metric") {
      heightCm = parseNum(height);
    } else {
      const ft = parseNum(heightFt);
      const inch = parseNum(heightIn);
      if (ft === null || inch === null) return null;
      heightCm = feetInchesToCm(ft, inch);
    }
    if (heightCm === null) return null;
    return idealWeight(heightCm, sex);
  }, [sex, units, height, heightFt, heightIn]);

  const show = (kg: number) => (units === "metric" ? `${fmt(kg, 1)} kg` : `${fmt(kgToPounds(kg), 1)} lb`);

  const formulas = result
    ? [
        { label: "Devine (1974)", value: result.devineKg, note: "Most used in medicine" },
        { label: "Robinson (1983)", value: result.robinsonKg, note: "A gentler slope per inch" },
        { label: "Miller (1983)", value: result.millerKg, note: "Highest starting base" },
        { label: "Hamwi (1964)", value: result.hamwiKg, note: "The oldest of the four" },
      ]
    : [];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sex" htmlFor="iw-sex">
          <select id="iw-sex" className={selectClass} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field label="Units" htmlFor="iw-units">
          <select id="iw-units" className={selectClass} value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (cm)</option>
            <option value="imperial">Imperial (ft/in)</option>
          </select>
        </Field>
        {units === "metric" ? (
          <Field label="Height (cm)" htmlFor="iw-height">
            <input id="iw-height" type="number" min="1" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Height (ft)" htmlFor="iw-ft">
              <input id="iw-ft" type="number" min="0" className={inputClass} value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
            </Field>
            <Field label="Height (in)" htmlFor="iw-in">
              <input id="iw-in" type="number" min="0" max="11" className={inputClass} value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
            </Field>
          </div>
        )}
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="Average of the four formulas" value={show(result.averageKg)} sub="A sensible middle estimate" />
            <ResultCard
              label="Healthy BMI range for your height"
              value={`${show(result.bmiRangeKg.minKg)} to ${show(result.bmiRangeKg.maxKg)}`}
              sub="BMI 18.5 to 24.9 at this height"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formulas.map((f) => (
              <div key={f.label} className="rounded-xl bg-gray-50 px-4 py-4">
                <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{f.label}</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{show(f.value)}</p>
                <p className="mt-0.5 text-sm text-gray-600">{f.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Notice how the four formulas disagree by several kilograms for the same height. That disagreement is the
            honest answer: there is no single ideal weight, only a healthy range that depends on your frame, muscle
            and health. Use the range, not one magic number.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a valid height to see the ideal weight estimates.</p>
      )}
    </div>
  );
}
