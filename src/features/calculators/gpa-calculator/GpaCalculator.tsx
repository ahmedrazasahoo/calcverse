"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { GRADE_SCALE, calculateGpa, type CourseInput } from "./gpa";

interface Row {
  id: number;
  course: string;
  grade: string;
  credits: string;
}

let nextId = 5;

export default function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, course: "English 101", grade: "A", credits: "3" },
    { id: 2, course: "Math 120", grade: "B+", credits: "4" },
    { id: 3, course: "Biology 110", grade: "A-", credits: "3" },
    { id: 4, course: "History 201", grade: "B", credits: "3" },
  ]);

  const update = (id: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const remove = (id: number) => setRows((rs) => rs.filter((r) => r.id !== id));
  const add = () => setRows((rs) => [...rs, { id: nextId++, course: "", grade: "A", credits: "3" }]);

  const result = useMemo(() => {
    const courses: CourseInput[] = rows.flatMap((row) => {
      const credits = parseNum(row.credits);
      return credits === null ? [] : [{ gradeLabel: row.grade, credits }];
    });
    return calculateGpa(courses);
  }, [rows]);

  return (
    <div>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={row.id} className="grid items-end gap-3 rounded-2xl border border-gray-200 p-4 transition hover:shadow-sm sm:grid-cols-[1fr_130px_110px_auto]">
            <Field label={`Course ${i + 1}`} htmlFor={`gpa-course-${row.id}`}>
              <input
                id={`gpa-course-${row.id}`}
                type="text"
                className={inputClass}
                value={row.course}
                onChange={(e) => update(row.id, { course: e.target.value })}
                placeholder="Course name (optional)"
              />
            </Field>
            <Field label="Grade" htmlFor={`gpa-grade-${row.id}`}>
              <select
                id={`gpa-grade-${row.id}`}
                className={selectClass}
                value={row.grade}
                onChange={(e) => update(row.id, { grade: e.target.value })}
              >
                {GRADE_SCALE.map((g) => (
                  <option key={g.label} value={g.label}>
                    {g.label} ({g.points.toFixed(1)})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Credits" htmlFor={`gpa-credits-${row.id}`}>
              <input
                id={`gpa-credits-${row.id}`}
                type="number"
                min="0"
                step="0.5"
                className={inputClass}
                value={row.credits}
                onChange={(e) => update(row.id, { credits: e.target.value })}
              />
            </Field>
            <button
              type="button"
              onClick={() => remove(row.id)}
              disabled={rows.length <= 1}
              className="min-h-11 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-300"
              aria-label={`Remove course ${i + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-4 min-h-11 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-sm ring-1 ring-white/80 backdrop-blur transition hover:bg-white"
      >
        Add a course
      </button>

      {result ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
          <ResultCard label="Your GPA" value={result.gpa.toFixed(2)} sub="On the US 4.0 scale" />
          <ResultCard label="Total credits counted" value={fmt(result.totalCredits, 1)} sub="Across all courses with valid credits" />
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Add at least one course with credits above zero to calculate your GPA.</p>
      )}
    </div>
  );
}
