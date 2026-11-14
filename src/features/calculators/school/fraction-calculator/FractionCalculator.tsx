"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import {
  calculateFraction,
  formatImproper,
  formatMixed,
  type FractionInput,
  type FractionOperation,
} from "./fraction";

interface FractionFieldsProps {
  prefix: string;
  title: string;
  whole: string;
  numerator: string;
  denominator: string;
  onChange: (field: "whole" | "numerator" | "denominator", value: string) => void;
}

function FractionFields({ prefix, title, whole, numerator, denominator, onChange }: FractionFieldsProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 px-1 text-sm font-semibold text-gray-800">{title}</legend>
      <div className="grid grid-cols-3 gap-2.5">
        <div>
          <label htmlFor={`${prefix}-whole`} className="sr-only">
            {title} whole part
          </label>
          <input
            id={`${prefix}-whole`}
            type="number"
            step="1"
            className={inputClass}
            value={whole}
            onChange={(e) => onChange("whole", e.target.value)}
            aria-label={`${title} whole part`}
          />
          <p className="mt-1 text-center text-xs text-gray-500">Whole</p>
        </div>
        <div>
          <label htmlFor={`${prefix}-num`} className="sr-only">
            {title} numerator
          </label>
          <input
            id={`${prefix}-num`}
            type="number"
            step="1"
            className={inputClass}
            value={numerator}
            onChange={(e) => onChange("numerator", e.target.value)}
            aria-label={`${title} numerator`}
          />
          <p className="mt-1 text-center text-xs text-gray-500">Top</p>
        </div>
        <div>
          <label htmlFor={`${prefix}-den`} className="sr-only">
            {title} denominator
          </label>
          <input
            id={`${prefix}-den`}
            type="number"
            step="1"
            className={inputClass}
            value={denominator}
            onChange={(e) => onChange("denominator", e.target.value)}
            aria-label={`${title} denominator`}
          />
          <p className="mt-1 text-center text-xs text-gray-500">Bottom</p>
        </div>
      </div>
    </fieldset>
  );
}

function toInput(whole: string, numerator: string, denominator: string): FractionInput | null {
  const w = parseNum(whole);
  const n = parseNum(numerator);
  const d = parseNum(denominator);
  if (w === null || n === null || d === null) return null;
  return { whole: w, numerator: n, denominator: d };
}

export default function FractionCalculator() {
  const [operation, setOperation] = useState<FractionOperation>("add");
  const [a, setA] = useState({ whole: "1", numerator: "1", denominator: "2" });
  const [b, setB] = useState({ whole: "0", numerator: "2", denominator: "3" });

  const result = useMemo(() => {
    const aInput = toInput(a.whole, a.numerator, a.denominator);
    const bInput = toInput(b.whole, b.numerator, b.denominator);
    if (!aInput || !bInput) return null;
    try {
      return calculateFraction(aInput, bInput, operation);
    } catch {
      return null;
    }
  }, [a, b, operation]);

  const update =
    (setter: typeof setA) =>
    (field: "whole" | "numerator" | "denominator", value: string) =>
      setter((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FractionFields
          prefix="frac-a"
          title="First fraction"
          whole={a.whole}
          numerator={a.numerator}
          denominator={a.denominator}
          onChange={update(setA)}
        />
        <Field label="Operation" htmlFor="frac-op">
          <Select
            id="frac-op"
            value={operation}
            onChange={(e) => setOperation(e.target.value as FractionOperation)}
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (x)</option>
            <option value="divide">Divide (/)</option>
          </Select>
        </Field>
        <FractionFields
          prefix="frac-b"
          title="Second fraction"
          whole={b.whole}
          numerator={b.numerator}
          denominator={b.denominator}
          onChange={update(setB)}
        />
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Leave the whole part at 0 for a plain fraction, and use a negative whole part for a negative mixed number
        such as negative 1 1/2.
      </p>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Answer"
              value={formatMixed(result.mixed)}
              sub="The answer as a mixed number, simplified to its lowest terms"
              primary
            />
            <ResultCard
              label="As an improper fraction"
              value={formatImproper(result.improper)}
              sub="The same answer with the whole part folded into the top number"
            />
            <ResultCard
              label="As a decimal"
              value={fmt(result.decimal, 4)}
              sub="The same answer in decimal form, rounded to 4 decimal places"
            />
          </div>

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Working</h3>
          <ol className="mt-3 space-y-2.5">
            {result.steps.map((step, i) => (
              <li key={i} className="glass flex gap-3.5 rounded-xl p-4">
                <span
                  className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-800"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Enter whole numbers in every box to see the answer. The bottom number cannot be 0, and you cannot divide
          by a fraction that equals 0.
        </p>
      )}
    </div>
  );
}
