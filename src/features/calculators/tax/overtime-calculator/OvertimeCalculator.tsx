"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateCaliforniaOvertime, calculateSimpleOvertime, calculateWeeklyOvertime } from "./overtime";

type Mode = "simple" | "weekly" | "california";
const DAY_LABELS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
const money = (n: number) => `$${fmtMoney(n)}`;

export default function OvertimeCalculator() {
  const [mode, setMode] = useState<Mode>("simple");
  const [rate, setRate] = useState("25");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("10");
  const [multiplier, setMultiplier] = useState("1.5");
  const [customMultiplier, setCustomMultiplier] = useState("1.75");
  const [totalHours, setTotalHours] = useState("50");
  const [daily, setDaily] = useState<string[]>(["9", "9", "9", "9", "9", "0", "0"]);

  const effectiveMultiplier = multiplier === "custom" ? parseNum(customMultiplier) : parseNum(multiplier);

  const simple = useMemo(() => {
    if (mode !== "simple") return null;
    const r = parseNum(rate); const reg = parseNum(regularHours); const ot = parseNum(overtimeHours);
    if (r === null || reg === null || ot === null || effectiveMultiplier === null) return null;
    try { return calculateSimpleOvertime({ hourlyRate: r, regularHours: reg, overtimeHours: ot, multiplier: effectiveMultiplier }); } catch { return null; }
  }, [mode, rate, regularHours, overtimeHours, effectiveMultiplier]);

  const weekly = useMemo(() => {
    if (mode !== "weekly") return null;
    const r = parseNum(rate); const t = parseNum(totalHours);
    if (r === null || t === null) return null;
    try { return calculateWeeklyOvertime({ hourlyRate: r, totalHours: t }); } catch { return null; }
  }, [mode, rate, totalHours]);

  const california = useMemo(() => {
    if (mode !== "california") return null;
    const r = parseNum(rate);
    const days = daily.map((d) => parseNum(d));
    if (r === null || days.some((d) => d === null)) return null;
    try { return calculateCaliforniaOvertime({ hourlyRate: r, dailyHours: days as number[] }); } catch { return null; }
  }, [mode, rate, daily]);

  const hasError = (mode === "simple" && !simple) || (mode === "weekly" && !weekly) || (mode === "california" && !california);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Calculation mode" htmlFor="ot-mode">
          <select id="ot-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="simple">Simple: regular plus overtime hours</option>
            <option value="weekly">Weekly FLSA: hours over 40 in a week</option>
            <option value="california">California daily overtime</option>
          </select>
        </Field>
        <Field label="Hourly rate ($)" htmlFor="ot-rate">
          <input id="ot-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        {mode === "simple" && (
          <>
            <Field label="Regular hours" htmlFor="ot-reg">
              <input id="ot-reg" className={inputClass} inputMode="decimal" value={regularHours} onChange={(e) => setRegularHours(e.target.value)} />
            </Field>
            <Field label="Overtime hours" htmlFor="ot-ot">
              <input id="ot-ot" className={inputClass} inputMode="decimal" value={overtimeHours} onChange={(e) => setOvertimeHours(e.target.value)} />
            </Field>
            <Field label="Overtime multiplier" htmlFor="ot-mult">
              <select id="ot-mult" className={selectClass} value={multiplier} onChange={(e) => setMultiplier(e.target.value)}>
                <option value="1.5">1.5x, time and a half</option>
                <option value="2">2x, double time</option>
                <option value="custom">Custom multiplier</option>
              </select>
            </Field>
            {multiplier === "custom" && (
              <Field label="Custom multiplier" htmlFor="ot-custom" hint="For example 1.75 means the overtime rate is 1.75 times your regular rate.">
                <input id="ot-custom" className={inputClass} inputMode="decimal" value={customMultiplier} onChange={(e) => setCustomMultiplier(e.target.value)} />
              </Field>
            )}
          </>
        )}
        {mode === "weekly" && (
          <Field label="Total hours worked this week" htmlFor="ot-total" hint="Hours over 40 are paid at 1.5x under federal FLSA rules.">
            <input id="ot-total" className={inputClass} inputMode="decimal" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} />
          </Field>
        )}
      </div>

      {mode === "california" && (
        <div className="mt-5">
          <p className="mb-2 px-1 text-sm font-semibold text-gray-800">Hours worked each day</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {daily.map((d, i) => (
              <Field key={i} label={DAY_LABELS[i]} htmlFor={`ot-day-${i}`}>
                <input id={`ot-day-${i}`} className={inputClass} inputMode="decimal" value={d} onChange={(e) => setDaily((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))} />
              </Field>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">Enter the days in workweek order. Day 7 only gets the seventh consecutive day rule if you worked all seven days.</p>
        </div>
      )}

      {hasError ? (
        <div className="mt-6"><ErrorNote>Enter valid numbers to see your overtime pay. Hours cannot be negative, and each California day must be between 0 and 24 hours.</ErrorNote></div>
      ) : mode === "simple" && simple ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          <ResultCard label="Total gross pay" value={money(simple.totalGross)} sub={`${fmt(simple.totalHours, 2)} total hours`} primary />
          <ResultCard label="Regular pay" value={money(simple.regularPay)} sub={`${fmt(simple.regularHours, 2)} hours at ${money(parseNum(rate) ?? 0)}`} />
          <ResultCard label="Overtime pay" value={money(simple.overtimePay)} sub={`${fmt(simple.overtimeHours, 2)} hours at ${money(simple.overtimeRate)}`} />
          <ResultCard label="Effective hourly rate" value={money(simple.effectiveHourlyRate)} sub="Total gross divided by total hours, including the overtime premium" />
        </div>
      ) : mode === "weekly" && weekly ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          <ResultCard label="Total gross pay" value={money(weekly.totalGross)} sub={`${fmt(weekly.totalHours, 2)} hours in the week`} primary />
          <ResultCard label="Regular pay" value={money(weekly.regularPay)} sub={`${fmt(weekly.regularHours, 2)} hours at the regular rate`} />
          <ResultCard label="Overtime pay" value={money(weekly.overtimePay)} sub={`${fmt(weekly.overtimeHours, 2)} hours over 40 at 1.5x`} />
          <ResultCard label="Effective hourly rate" value={money(weekly.effectiveHourlyRate)} sub="Total gross divided by total hours" />
        </div>
      ) : mode === "california" && california ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Total gross pay" value={money(california.totalGross)} sub={`${fmt(california.totalHours, 2)} total hours`} primary />
            <ResultCard label="Regular pay" value={money(california.regularPay)} sub={`${fmt(california.regularHours, 2)} straight time hours`} />
            <ResultCard label="Overtime at 1.5x" value={money(california.overtime15Pay)} sub={`${fmt(california.overtime15Hours, 2)} hours`} />
            <ResultCard label="Double time at 2x" value={money(california.doubleTimePay)} sub={`${fmt(california.doubleTimeHours, 2)} hours`} />
            <ResultCard label="Effective hourly rate" value={money(california.effectiveHourlyRate)} sub="Total gross divided by total hours" />
          </div>
          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Per day breakdown</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead><tr className="text-gray-500"><th className="py-2 pr-3">Day</th><th className="py-2 pr-3">Hours</th><th className="py-2 pr-3">Regular</th><th className="py-2 pr-3">At 1.5x</th><th className="py-2 pr-3">At 2x</th><th className="py-2">Pay</th></tr></thead>
              <tbody>
                {california.days.map((d) => (
                  <tr key={d.dayIndex} className="border-t border-gray-100">
                    <td className="py-2 pr-3 font-medium text-gray-800">{DAY_LABELS[d.dayIndex]}{d.isSeventhConsecutiveDay ? " (7th consecutive)" : ""}</td>
                    <td className="py-2 pr-3 tabular-nums">{fmt(d.hours, 2)}</td>
                    <td className="py-2 pr-3 tabular-nums">{fmt(d.regularHours, 2)}</td>
                    <td className="py-2 pr-3 tabular-nums">{fmt(d.overtime15Hours, 2)}</td>
                    <td className="py-2 pr-3 tabular-nums">{fmt(d.doubleTimeHours, 2)}</td>
                    <td className="py-2 tabular-nums">{money(d.totalPay)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6"><EmptyState title="Enter your hours" body="Add your rate and hours to see regular pay, overtime pay and your total gross." /></div>
      )}
    </div>
  );
}
