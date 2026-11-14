"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { convertGrade, sgpaToCgpa, type GradeSystem } from "./cgpa";

const SYSTEM_OPTIONS: { value: GradeSystem; label: string; max: number }[] = [
  { value: "cbse10", label: "CGPA (10 point, CBSE style)", max: 10 },
  { value: "percent", label: "Percentage", max: 100 },
  { value: "gpa4", label: "GPA (4.0 scale)", max: 4 },
];

interface SemesterRow {
  sgpa: string;
  credits: string;
}

export default function CgpaToPercentageCalculator() {
  const [from, setFrom] = useState<GradeSystem>("cbse10");
  const [to, setTo] = useState<GradeSystem>("percent");
  const [value, setValue] = useState("8.5");
  const [rows, setRows] = useState<SemesterRow[]>([
    { sgpa: "8.8", credits: "20" },
    { sgpa: "9.1", credits: "22" },
  ]);

  const converted = useMemo(() => {
    const parsed = parseNum(value);
    if (parsed === null) return null;
    return convertGrade(parsed, from, to);
  }, [value, from, to]);

  const combined = useMemo(() => {
    const semesters = rows.map((row) => {
      const sgpa = parseNum(row.sgpa);
      const credits = parseNum(row.credits);
      if (sgpa === null || credits === null) return null;
      return { sgpa, credits };
    });
    if (semesters.some((s) => s === null)) return null;
    return sgpaToCgpa(semesters as { sgpa: number; credits: number }[]);
  }, [rows]);

  const fromOption = SYSTEM_OPTIONS.find((o) => o.value === from);
  const toOption = SYSTEM_OPTIONS.find((o) => o.value === to);

  const updateRow = (index: number, field: keyof SemesterRow, next: string) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: next } : row)));
  };

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Convert from" htmlFor="cg-from">
          <Select
            id="cg-from"
            value={from}
            onChange={(e) => {
              const next = e.target.value as GradeSystem;
              setFrom(next);
              if (next === to) setTo(from);
            }}
          >
            {SYSTEM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={`Your grade (out of ${fromOption?.max})`} htmlFor="cg-value">
          <input id="cg-value" type="number" min="0" step="0.01" className={inputClass} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label="Convert to" htmlFor="cg-to">
          <Select id="cg-to" value={to} onChange={(e) => setTo(e.target.value as GradeSystem)}>
            {SYSTEM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {converted !== null ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard
              label={`Your ${toOption?.label.toLowerCase()}`}
              value={fmt(converted, 2)}
              sub={
                from === "cbse10" && to === "percent"
                  ? "CGPA multiplied by 9.5, the CBSE formula"
                  : from === "percent" && to === "cbse10"
                    ? "Percentage divided by 9.5"
                    : "Converted through percentage"
              }
            />
            <ResultCard label="Quick reference" value="9.5 CGPA = 90.25 percent" sub="And a perfect 10 CGPA equals 95 percent, not 100" />
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a grade inside the scale you chose, for example 0 to 10 for CGPA.</p>
      )}

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900">Combine semester SGPAs into one CGPA</h3>
        <p className="mt-1 text-sm text-gray-600">
          Add each semester with its credit count. Semesters with more credits pull the final CGPA harder, which is
          why a credit weighted average is the honest way to combine them.
        </p>
        <div className="mt-4 space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
              <Field label={`Semester ${i + 1} SGPA`} htmlFor={`cg-sgpa-${i}`}>
                <input id={`cg-sgpa-${i}`} type="number" min="0" max="10" step="0.01" className={inputClass} value={row.sgpa} onChange={(e) => updateRow(i, "sgpa", e.target.value)} />
              </Field>
              <Field label="Credits" htmlFor={`cg-credits-${i}`}>
                <input id={`cg-credits-${i}`} type="number" min="0" className={inputClass} value={row.credits} onChange={(e) => updateRow(i, "credits", e.target.value)} />
              </Field>
              <button
                type="button"
                aria-label={`Remove semester ${i + 1}`}
                className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-600 hover:border-rose-400 hover:text-rose-600 disabled:opacity-40"
                disabled={rows.length <= 1}
                onClick={() => setRows((prev) => prev.filter((_, j) => j !== i))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-700"
          onClick={() => setRows((prev) => [...prev, { sgpa: "", credits: "" }])}
        >
          Add a semester
        </button>
        {combined !== null ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2" aria-live="polite">
            <ResultCard label="Your overall CGPA" value={fmt(combined, 2)} sub="Credit weighted across your semesters" />
            <ResultCard label="As a percentage" value={`${fmt(combined * 9.5, 2)} percent`} sub="Using the CBSE multiplier of 9.5" />
          </div>
        ) : (
          <p className="mt-5 text-sm text-gray-500">Fill every semester row with an SGPA from 0 to 10 and a credit count above zero.</p>
        )}
      </div>
    </div>
  );
}
