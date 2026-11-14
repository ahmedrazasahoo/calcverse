"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, inputClass, parseNum, selectClass } from "@/components/ui";
import { computeFromCorrect, computeTestGrade, testGradeTable } from "./testGrade";

export default function TestGradeCalculator() {
  const [total, setTotal] = useState("20");
  const [mode, setMode] = useState<"wrong" | "correct">("wrong");
  const [count, setCount] = useState("2");

  const result = useMemo(() => {
    const t = parseNum(total);
    const c = parseNum(count);
    if (t === null || c === null || t <= 0) return null;
    return mode === "wrong" ? computeTestGrade(t, c) : computeFromCorrect(t, c);
  }, [total, mode, count]);

  const table = useMemo(() => {
    const t = parseNum(total);
    if (t === null || t <= 0) return [];
    return testGradeTable(t, 10);
  }, [total]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Total questions" htmlFor="test-total">
          <input id="test-total" type="number" className={inputClass} value={total} onChange={(e) => setTotal(e.target.value)} />
        </Field>
        <Field label="Count by" htmlFor="test-mode">
          <select id="test-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as "wrong" | "correct")}>
            <option value="wrong">Questions wrong</option>
            <option value="correct">Questions correct</option>
          </select>
        </Field>
        <Field label={mode === "wrong" ? "Number wrong" : "Number correct"} htmlFor="test-count">
          <input id="test-count" type="number" className={inputClass} value={count} onChange={(e) => setCount(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard primary label="Your score" value={`${fmt(result.percent, 2)}%`} sub={`${result.correct} correct out of ${result.total}`} />
            <ResultCard label="Letter grade" value={result.letter} sub={`Worth ${fmt(result.points, 1)} points on the 4.0 scale`} />
            <ResultCard label="Questions wrong" value={fmt(result.wrong)} sub={`${result.correct} questions answered correctly`} />
            <ResultCard label="Points per question" value={`${fmt(result.pointsPerQuestion, 2)}%`} sub="Each question is worth this share of the total" />
          </div>

          {table.length > 0 && (
            <div className="glass mt-6 overflow-hidden rounded-[2rem] px-6 py-5">
              <p className="text-sm font-semibold text-gray-900">Quick reference: 0 to 10 wrong on a {result.total} question test</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500"><th className="py-2 pr-4 font-semibold">Wrong</th><th className="py-2 pr-4 font-semibold">Correct</th><th className="py-2 pr-4 font-semibold">Percent</th><th className="py-2 font-semibold">Letter</th></tr>
                  </thead>
                  <tbody>
                    {table.map((row) => (
                      <tr key={row.wrong} className={row.wrong === result.wrong ? "font-bold text-brand-900" : "text-gray-700"}>
                        <td className="py-1.5 pr-4 tabular-nums">{row.wrong}</td>
                        <td className="py-1.5 pr-4 tabular-nums">{row.correct}</td>
                        <td className="py-1.5 pr-4 tabular-nums">{fmt(row.percent, 2)}%</td>
                        <td className="py-1.5">{row.letter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter the test size to see your grade" body="Add the total number of questions and how many you got wrong or correct." /></div>
      )}
    </div>
  );
}
