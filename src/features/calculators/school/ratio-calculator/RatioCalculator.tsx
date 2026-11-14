"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { scaleRatio, simplifyRatio, solveMissing, type ScaleMode } from "./ratio";

type Mode = "simplify" | "scale" | "missing";

function joinRatio(parts: number[], digits = 0): string {
  return parts.map((part) => fmt(part, digits)).join(" : ");
}

function needsDecimals(parts: number[]): number {
  return parts.some((part) => !Number.isInteger(part)) ? 4 : 0;
}

export default function RatioCalculator() {
  const [mode, setMode] = useState<Mode>("simplify");
  const [partCount, setPartCount] = useState<2 | 3>(2);
  const [parts, setParts] = useState<string[]>(["12", "18", "30"]);
  const [scaleMode, setScaleMode] = useState<ScaleMode>("total");
  const [target, setTarget] = useState("100");
  const [missA, setMissA] = useState("3");
  const [missB, setMissB] = useState("4");
  const [missC, setMissC] = useState("9");

  const activeParts = useMemo(
    () => parts.slice(0, partCount).map((part) => parseNum(part)),
    [parts, partCount],
  );

  const simplified = useMemo(() => {
    if (mode !== "simplify") return null;
    if (activeParts.some((part) => part === null)) return null;
    try {
      return simplifyRatio(activeParts as number[]);
    } catch {
      return null;
    }
  }, [mode, activeParts]);

  const scaled = useMemo(() => {
    if (mode !== "scale") return null;
    const targetValue = parseNum(target);
    if (targetValue === null || activeParts.some((part) => part === null)) return null;
    try {
      return scaleRatio(activeParts as number[], targetValue, scaleMode);
    } catch {
      return null;
    }
  }, [mode, activeParts, target, scaleMode]);

  const missing = useMemo(() => {
    if (mode !== "missing") return null;
    const a = parseNum(missA);
    const b = parseNum(missB);
    const c = parseNum(missC);
    if (a === null || b === null || c === null) return null;
    try {
      return solveMissing(a, b, c);
    } catch {
      return null;
    }
  }, [mode, missA, missB, missC]);

  const updatePart = (index: number, next: string) => {
    setParts((prev) => prev.map((part, i) => (i === index ? next : part)));
  };

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="What do you want to do" htmlFor="rc-mode">
          <Select id="rc-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="simplify">Simplify a ratio</option>
            <option value="scale">Scale up or down</option>
            <option value="missing">Find the missing value</option>
          </Select>
        </Field>
        {mode !== "missing" && (
          <Field label="Number of parts" htmlFor="rc-count">
            <Select
              id="rc-count"
              value={partCount}
              onChange={(e) => setPartCount(Number(e.target.value) as 2 | 3)}
            >
              <option value={2}>Two parts</option>
              <option value={3}>Three parts</option>
            </Select>
          </Field>
        )}
      </div>

      {mode !== "missing" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parts.slice(0, partCount).map((part, i) => (
              <Field key={i} label={`Part ${i + 1}`} htmlFor={`rc-part-${i}`}>
                <input id={`rc-part-${i}`} className={inputClass} inputMode="decimal" value={part} onChange={(e) => updatePart(i, e.target.value)} />
              </Field>
            ))}
            {mode === "scale" && (
              <>
                <Field label="Scale so that" htmlFor="rc-scale-mode">
                  <Select id="rc-scale-mode" value={scaleMode} onChange={(e) => setScaleMode(e.target.value as ScaleMode)}>
                    <option value="total">The parts add up to the target</option>
                    <option value="firstPart">The first part equals the target</option>
                  </Select>
                </Field>
                <Field label="Target value" htmlFor="rc-target">
                  <input id="rc-target" className={inputClass} inputMode="decimal" value={target} onChange={(e) => setTarget(e.target.value)} />
                </Field>
              </>
            )}
          </div>

          {mode === "simplify" && simplified ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Simplified ratio"
                value={joinRatio(simplified.simplified)}
                sub="Every part divided by the largest number that divides them all."
                primary
              />
              <ResultCard
                label="As 1 : n form"
                value={joinRatio(simplified.oneToN, 4)}
                sub="The same ratio rewritten so the first part is exactly one."
              />
            </div>
          ) : mode === "scale" && scaled ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Scaled ratio"
                value={joinRatio(scaled, 2)}
                sub={
                  scaleMode === "total"
                    ? "Every part multiplied by the same factor so the parts reach your target total."
                    : "Every part multiplied by the same factor so the first part reaches your target."
                }
                primary
              />
              <ResultCard
                label="Check the total"
                value={fmt(scaled.reduce((sum, part) => sum + part, 0), 2)}
                sub="The scaled parts added together, handy for splitting money, mixtures and maps."
              />
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter every part as a number greater than zero{mode === "scale" ? ", and a target greater than zero" : ""}.
            </p>
          )}
        </>
      ) : (
        <>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            Fill in the proportion a : b = c : x and the calculator finds x.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="a (first ratio, left)" htmlFor="rc-a">
              <input id="rc-a" className={inputClass} inputMode="decimal" value={missA} onChange={(e) => setMissA(e.target.value)} />
            </Field>
            <Field label="b (first ratio, right)" htmlFor="rc-b">
              <input id="rc-b" className={inputClass} inputMode="decimal" value={missB} onChange={(e) => setMissB(e.target.value)} />
            </Field>
            <Field label="c (second ratio, left)" htmlFor="rc-c">
              <input id="rc-c" className={inputClass} inputMode="decimal" value={missC} onChange={(e) => setMissC(e.target.value)} />
            </Field>
            <Field label="x (the answer)" htmlFor="rc-x">
              <input id="rc-x" className={inputClass} value={missing !== null ? fmt(missing, needsDecimals([missing])) : ""} readOnly />
            </Field>
          </div>
          {missing !== null ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultCard
                label="Missing value x"
                value={fmt(missing, needsDecimals([missing]))}
                sub="Worked out as b multiplied by c, then divided by a."
                primary
              />
              <ResultCard
                label="The full proportion"
                value={`${missA} : ${missB} = ${missC} : ${fmt(missing, needsDecimals([missing]))}`}
                sub="Both sides reduce to the same ratio, which is how you can check the answer."
              />
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter a, b and c as numbers greater than zero.
            </p>
          )}
        </>
      )}
    </div>
  );
}
