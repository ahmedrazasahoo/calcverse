"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateNoTaxOnOvertime, qualifiedPremiumFromHours, type OvertimeFilingStatus } from "./noTaxOnOvertime";

const money = (n: number) => `$${fmtMoney(n)}`;
const RATES = [10, 12, 22, 24, 32, 35, 37];

export default function NoTaxOnOvertimeCalculator() {
  const [filingStatus, setFilingStatus] = useState<OvertimeFilingStatus>("single");
  const [magi, setMagi] = useState("85000");
  const [inputMode, setInputMode] = useState<"direct" | "hours">("hours");
  const [directPremium, setDirectPremium] = useState("6000");
  const [hourlyRate, setHourlyRate] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("8");
  const [weeks, setWeeks] = useState("50");
  const [marginalRate, setMarginalRate] = useState("22");

  const premium = useMemo(() => {
    if (inputMode === "direct") return parseNum(directPremium);
    const r = parseNum(hourlyRate); const h = parseNum(hoursPerWeek); const w = parseNum(weeks);
    if (r === null || h === null || w === null) return null;
    try { return qualifiedPremiumFromHours({ hourlyRate: r, overtimeHoursPerWeek: h, weeksPerYear: w }); } catch { return null; }
  }, [inputMode, directPremium, hourlyRate, hoursPerWeek, weeks]);

  const result = useMemo(() => {
    const m = parseNum(magi); const mr = parseNum(marginalRate);
    if (m === null || mr === null || premium === null) return null;
    try { return calculateNoTaxOnOvertime({ filingStatus, magi: m, qualifiedPremium: premium, marginalRatePercent: mr }); } catch { return null; }
  }, [filingStatus, magi, marginalRate, premium]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Filing status" htmlFor="nto-status" hint="Married filers must file jointly to claim this deduction.">
          <select id="nto-status" className={selectClass} value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as OvertimeFilingStatus)}>
            <option value="single">Single</option>
            <option value="marriedFilingJointly">Married filing jointly</option>
          </select>
        </Field>
        <Field label="Modified adjusted gross income (MAGI) ($)" htmlFor="nto-magi">
          <input id="nto-magi" className={inputClass} inputMode="decimal" value={magi} onChange={(e) => setMagi(e.target.value)} />
        </Field>
        <Field label="How do you want to enter overtime?" htmlFor="nto-mode">
          <select id="nto-mode" className={selectClass} value={inputMode} onChange={(e) => setInputMode(e.target.value as "direct" | "hours")}>
            <option value="hours">From rate and overtime hours</option>
            <option value="direct">Enter the premium directly</option>
          </select>
        </Field>
        {inputMode === "direct" ? (
          <Field label="Annual qualified overtime premium ($)" htmlFor="nto-premium" hint="Only the premium half counts: overtime hours times half your regular rate. Not your full overtime pay.">
            <input id="nto-premium" className={inputClass} inputMode="decimal" value={directPremium} onChange={(e) => setDirectPremium(e.target.value)} />
          </Field>
        ) : (
          <>
            <Field label="Hourly rate ($)" htmlFor="nto-rate"><input id="nto-rate" className={inputClass} inputMode="decimal" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} /></Field>
            <Field label="Overtime hours per week" htmlFor="nto-hours"><input id="nto-hours" className={inputClass} inputMode="decimal" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} /></Field>
            <Field label="Weeks per year" htmlFor="nto-weeks"><input id="nto-weeks" className={inputClass} inputMode="decimal" value={weeks} onChange={(e) => setWeeks(e.target.value)} /></Field>
          </>
        )}
        <Field label="Marginal federal tax rate" htmlFor="nto-marginal" hint="Your top tax bracket. This turns the deduction into an estimated saving. It is an estimate only, not a promised refund.">
          <select id="nto-marginal" className={selectClass} value={marginalRate} onChange={(e) => setMarginalRate(e.target.value)}>
            {RATES.map((r) => (<option key={r} value={r}>{r}%</option>))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label="Estimated deduction" value={money(result.finalDeduction)} sub="The amount you could deduct on Schedule 1-A, after the cap and phase out" primary />
            <ResultCard label="Estimated federal tax saved" value={money(result.estimatedTaxSaved)} sub={`Deduction times your ${marginalRate}% marginal rate. An estimate only.`} />
            <ResultCard label="Qualified overtime premium" value={money(result.qualifiedPremium)} sub={inputMode === "hours" ? "Overtime hours times 0.5 times your regular rate, for the year" : "The premium amount you entered"} />
            <ResultCard label="Amount after the cap" value={money(result.cappedAmount)} sub={`Cap is ${money(result.cap)} for this filing status`} />
            <ResultCard label="Phase out reduction" value={money(result.phaseOutReduction)} sub="Reduction for MAGI above the threshold, if any" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">This is an estimator for tax years 2025 to 2028, rules checked November 2026. It does not promise a refund. Your actual saving depends on your full return, and overtime pay is still subject to withholding and FICA taxes.</p>
        </div>
      ) : premium === null && inputMode === "hours" ? (
        <div className="mt-6"><EmptyState title="Enter your overtime" body="Add your rate, overtime hours per week and weeks worked to estimate the premium and deduction." /></div>
      ) : (
        <div className="mt-6"><ErrorNote>Check your numbers. MAGI, premium and rate must be zero or greater.</ErrorNote></div>
      )}
    </div>
  );
}
