"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { ACTIVITY_LEVELS, calculateMacros, CM_PER_INCH, KG_PER_LB, PRESETS, type Goal, type MacroSplit, type Sex } from "./macro";

export default function MacroCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState("80");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ftin">("cm");
  const [heightCm, setHeightCm] = useState("180");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("11");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [preset, setPreset] = useState("balanced");
  const [custom, setCustom] = useState<MacroSplit>({ carbPct: 40, proteinPct: 30, fatPct: 30 });

  const split: MacroSplit = preset === "custom" ? custom : PRESETS[preset].split;
  const sum = custom.carbPct + custom.proteinPct + custom.fatPct;

  const result = useMemo(() => {
    const ageN = parseNum(age);
    const w = parseNum(weight);
    const act = parseNum(activity);
    if (ageN === null || w === null || act === null) return null;
    const weightKg = weightUnit === "kg" ? w : w * KG_PER_LB;
    let hCm: number | null;
    if (heightUnit === "cm") {
      hCm = parseNum(heightCm);
    } else {
      const f = parseNum(feet);
      const i = parseNum(inches);
      hCm = f === null || i === null ? null : (f * 12 + i) * CM_PER_INCH;
    }
    if (hCm === null) return null;
    return calculateMacros({ sex, age: ageN, weightKg, heightCm: hCm, activity: act, goal, split });
  }, [sex, age, weight, weightUnit, heightCm, feet, inches, heightUnit, activity, goal, split]);

  const slider = (key: keyof MacroSplit, label: string) => (
    <Field label={`${label}: ${custom[key]}%`} htmlFor={`macro-${key}`}>
      <input
        id={`macro-${key}`}
        type="range"
        min={0}
        max={100}
        step={1}
        className="min-h-12 w-full accent-brand-600"
        value={custom[key]}
        onChange={(e) => setCustom((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
      />
    </Field>
  );

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Sex" htmlFor="macro-sex">
          <select id="macro-sex" className={selectClass} value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field label="Age (years)" htmlFor="macro-age">
          <input id="macro-age" type="number" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field label={`Weight (${weightUnit})`} htmlFor="macro-weight">
          <div className="flex gap-2">
            <input id="macro-weight" type="number" className={inputClass} value={weight} onChange={(e) => setWeight(e.target.value)} />
            <select aria-label="Weight unit" className={selectClass} value={weightUnit} onChange={(e) => setWeightUnit(e.target.value as "kg" | "lb")}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </Field>
        {heightUnit === "cm" ? (
          <Field label="Height (cm)" htmlFor="macro-height">
            <div className="flex gap-2">
              <input id="macro-height" type="number" className={inputClass} value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              <select aria-label="Height unit" className={selectClass} value={heightUnit} onChange={(e) => setHeightUnit(e.target.value as "cm" | "ftin")}>
                <option value="cm">cm</option>
                <option value="ftin">ft/in</option>
              </select>
            </div>
          </Field>
        ) : (
          <Field label="Height (ft and in)" htmlFor="macro-feet">
            <div className="flex gap-2">
              <input id="macro-feet" type="number" className={inputClass} value={feet} onChange={(e) => setFeet(e.target.value)} aria-label="Feet" />
              <input type="number" className={inputClass} value={inches} onChange={(e) => setInches(e.target.value)} aria-label="Inches" />
              <select aria-label="Height unit" className={selectClass} value={heightUnit} onChange={(e) => setHeightUnit(e.target.value as "cm" | "ftin")}>
                <option value="cm">cm</option>
                <option value="ftin">ft/in</option>
              </select>
            </div>
          </Field>
        )}
        <Field label="Activity level" htmlFor="macro-activity">
          <select id="macro-activity" className={selectClass} value={activity} onChange={(e) => setActivity(e.target.value)}>
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Goal" htmlFor="macro-goal">
          <select id="macro-goal" className={selectClass} value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
            <option value="lose">Lose weight (minus 500 kcal)</option>
            <option value="maintain">Maintain weight</option>
            <option value="gain">Gain weight (plus 300 kcal)</option>
          </select>
        </Field>
        <Field label="Diet style" htmlFor="macro-preset">
          <select id="macro-preset" className={selectClass} value={preset} onChange={(e) => setPreset(e.target.value)}>
            {Object.entries(PRESETS).map(([key, p]) => (
              <option key={key} value={key}>{p.label}</option>
            ))}
            <option value="custom">Custom percentages</option>
          </select>
        </Field>
      </div>

      {preset === "custom" && (
        <div className="mt-5">
          <div className="grid gap-5 sm:grid-cols-3">
            {slider("carbPct", "Carbohydrates")}
            {slider("proteinPct", "Protein")}
            {slider("fatPct", "Fat")}
          </div>
          {sum !== 100 ? (
            <div className="mt-4">
              <ErrorNote>Your percentages add up to {sum}%. Adjust the sliders until they total exactly 100% so the grams match your calorie target.</ErrorNote>
            </div>
          ) : (
            <p className="mt-4 text-sm font-medium text-emerald-700">Percentages total 100%. Your macro split is ready.</p>
          )}
        </div>
      )}

      {result && result.splitValid ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Daily calories" value={`${fmt(result.calories)} kcal`} sub={`BMR ${fmt(result.bmr)} kcal, maintenance ${fmt(result.tdee)} kcal`} primary />
            <ResultCard label="Protein" value={`${fmt(result.proteinGrams)} g`} sub={`${fmt(result.proteinKcal)} kcal from protein`} />
            <ResultCard label="Carbohydrates" value={`${fmt(result.carbGrams)} g`} sub={`${fmt(result.carbKcal)} kcal from carbs`} />
            <ResultCard label="Fat" value={`${fmt(result.fatGrams)} g`} sub={`${fmt(result.fatKcal)} kcal from fat`} />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            Protein and carbohydrates provide 4 kcal per gram and fat provides 9 kcal per gram. These targets are
            general nutrition estimates, not personalised medical advice.
          </p>
        </div>
      ) : result ? (
        <div className="mt-6">
          <EmptyState title="Fix the custom split" body="Your custom percentages do not add up to 100 yet, so the macro grams are paused until they do." />
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Enter your details" body="Add your age, weight, height and activity level to see your calorie and macro targets." />
        </div>
      )}
    </div>
  );
}
