"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { CM_PER_INCH, bodyComposition, bodyFatPercent, classifyBodyFat, type Sex } from "./bodyFat";

export default function BodyFatCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [units, setUnits] = useState("metric");
  const [height, setHeight] = useState("178");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");
  const [weight, setWeight] = useState("80");

  const result = useMemo(() => {
    const factor = units === "metric" ? 1 : CM_PER_INCH;
    const heightCm = parseNum(height);
    const neckCm = parseNum(neck);
    const waistCm = parseNum(waist);
    const hipCm = parseNum(hip);
    if (heightCm === null || neckCm === null || waistCm === null) return null;
    if (sex === "female" && hipCm === null) return null;
    const percent = bodyFatPercent(sex, {
      heightCm: heightCm * factor,
      neckCm: neckCm * factor,
      waistCm: waistCm * factor,
      hipCm: sex === "female" ? (hipCm as number) * factor : undefined,
    });
    if (percent === null) return null;
    const category = classifyBodyFat(sex, percent);
    const rawWeight = parseNum(weight);
    const weightKg = rawWeight === null ? null : units === "metric" ? rawWeight : rawWeight * 0.45359237;
    const composition = weightKg === null ? null : bodyComposition(weightKg, percent);
    return { percent, category, composition, weightUnit: units === "metric" ? "kg" : "lb", originalWeight: rawWeight };
  }, [sex, units, height, neck, waist, hip, weight]);

  const unitLabel = units === "metric" ? "cm" : "inches";

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sex" htmlFor="bf-sex">
          <Select id="bf-sex" value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </Field>
        <Field label="Units" htmlFor="bf-units">
          <Select id="bf-units" value={units} onChange={(e) => setUnits(e.target.value)}>
            <option value="metric">Metric (cm, kg)</option>
            <option value="imperial">Imperial (inches, lb)</option>
          </Select>
        </Field>
        <Field label={`Height (${unitLabel})`} htmlFor="bf-height">
          <input id="bf-height" type="number" min="1" className={inputClass} value={height} onChange={(e) => setHeight(e.target.value)} />
        </Field>
        <Field label={`Waist (${unitLabel})`} htmlFor="bf-waist" hint={sex === "male" ? "Measure at navel level, relaxed." : "Measure at the narrowest point."}>
          <input id="bf-waist" type="number" min="1" className={inputClass} value={waist} onChange={(e) => setWaist(e.target.value)} />
        </Field>
        <Field label={`Neck (${unitLabel})`} htmlFor="bf-neck" hint="Measure just below the Adam's apple.">
          <input id="bf-neck" type="number" min="1" className={inputClass} value={neck} onChange={(e) => setNeck(e.target.value)} />
        </Field>
        {sex === "female" && (
          <Field label={`Hips (${unitLabel})`} htmlFor="bf-hip" hint="Measure at the widest point of the hips.">
            <input id="bf-hip" type="number" min="1" className={inputClass} value={hip} onChange={(e) => setHip(e.target.value)} />
          </Field>
        )}
        <Field label={`Weight (${units === "metric" ? "kg" : "lb"}, optional)`} htmlFor="bf-weight" hint="Add your weight to see fat mass and lean mass.">
          <input id="bf-weight" type="number" min="1" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label="Body fat estimate" value={`${fmt(result.percent, 1)}%`} sub="US Navy tape measure method" />
            {result.category && (
              <ResultCard label="ACE category" value={result.category.label} sub={`Band: ${result.category.rangeLabel}`} />
            )}
            {result.composition && (
              <ResultCard
                label="Fat mass / lean mass"
                value={`${fmt(result.composition.fatMassKg, 1)} / ${fmt(result.composition.leanMassKg, 1)} kg`}
                sub="Split of the weight you entered"
              />
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Tape measure methods are honest estimates, not scans. Expect the true figure to sit within about 3 to 4
            percentage points of this result if your measurements were careful. Measure at the same time of day, on
            bare skin, with the tape snug but not digging in.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Enter your height, waist and neck{sex === "female" ? " and hip" : ""} measurements to see your estimate. Check
          that your waist is wider than your neck.
        </p>
      )}
    </div>
  );
}
