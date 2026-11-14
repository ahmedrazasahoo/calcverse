"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateNoTaxOnTips, type TipsFilingStatus } from "./noTaxOnTips";

const money = (n: number) => `$${fmtMoney(n)}`;
const RATES = [10, 12, 22, 24, 32, 35, 37];

export default function NoTaxOnTipsCalculator() {
  const [filingStatus, setFilingStatus] = useState<TipsFilingStatus>("single");
  const [magi, setMagi] = useState("55000");
  const [tips, setTips] = useState("15000");
  const [marginalRate, setMarginalRate] = useState("12");
  const [selfEmployed, setSelfEmployed] = useState(false);
  const [netIncome, setNetIncome] = useState("40000");

  const result = useMemo(() => {
    const m = parseNum(magi); const t = parseNum(tips); const mr = parseNum(marginalRate); const net = parseNum(netIncome);
    if (m === null || t === null || mr === null) return null;
    if (selfEmployed && net === null) return null;
    try {
      return calculateNoTaxOnTips({ filingStatus, magi: m, annualTips: t, marginalRatePercent: mr, selfEmployed, netIncome: net ?? undefined });
    } catch { return null; }
  }, [filingStatus, magi, tips, marginalRate, selfEmployed, netIncome]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Filing status" htmlFor="ntt-status">
          <select id="ntt-status" className={selectClass} value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as TipsFilingStatus)}>
            <option value="single">Single</option>
            <option value="headOfHousehold">Head of household</option>
            <option value="marriedFilingJointly">Married filing jointly</option>
            <option value="marriedFilingSeparately">Married filing separately</option>
          </select>
        </Field>
        <Field label="Annual qualified tips ($)" htmlFor="ntt-tips" hint="Voluntary tips in cash or cash equivalents, reported on a W-2, 1099 or Form 4137. Service charges do not count.">
          <input id="ntt-tips" className={inputClass} inputMode="decimal" value={tips} onChange={(e) => setTips(e.target.value)} />
        </Field>
        <Field label="Modified adjusted gross income (MAGI) ($)" htmlFor="ntt-magi">
          <input id="ntt-magi" className={inputClass} inputMode="decimal" value={magi} onChange={(e) => setMagi(e.target.value)} />
        </Field>
        <Field label="Marginal federal tax rate" htmlFor="ntt-marginal" hint="Your top tax bracket, used only to estimate the saving from the deduction.">
          <select id="ntt-marginal" className={selectClass} value={marginalRate} onChange={(e) => setMarginalRate(e.target.value)}>
            {RATES.map((r) => (<option key={r} value={r}>{r}%</option>))}
          </select>
        </Field>
        <Field label="Are you self employed in the tipped work?" htmlFor="ntt-self">
          <select id="ntt-self" className={selectClass} value={selfEmployed ? "yes" : "no"} onChange={(e) => setSelfEmployed(e.target.value === "yes")}>
            <option value="no">No, I am an employee</option>
            <option value="yes">Yes, self employed</option>
          </select>
        </Field>
        {selfEmployed && (
          <Field label="Net income from that business ($)" htmlFor="ntt-net" hint="For the self employed, the deduction cannot exceed net income from the tipped business.">
            <input id="ntt-net" className={inputClass} inputMode="decimal" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} />
          </Field>
        )}
      </div>

      {result && !result.eligible ? (
        <div className="mt-6"><ErrorNote>{result.ineligibleReason} This estimator shows a deduction of $0.00 for married filing separately. Rules checked November 2026.</ErrorNote></div>
      ) : result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label="Estimated deduction" value={money(result.finalDeduction)} sub="Amount you could deduct on Schedule 1-A Part II, after the cap and phase out" primary />
            <ResultCard label="Estimated federal tax saved" value={money(result.estimatedTaxSaved)} sub={`Deduction times your ${marginalRate}% marginal rate. An estimate only, not a promised refund.`} />
            <ResultCard label="Amount after the cap" value={money(result.cappedAmount)} sub="Cap is $25,000 per return for every filing status" />
            <ResultCard label="Phase out reduction" value={money(result.phaseOutReduction)} sub="Reduction for MAGI above the threshold, if any" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">This is an estimator for tax years 2025 to 2028, rules checked November 2026. Payroll taxes still apply to tips, and only tips in occupations that customarily and regularly received tips on or before 31 December 2024 can qualify. Check the IRS list for your occupation before you file.</p>
        </div>
      ) : tips.trim() === "" ? (
        <div className="mt-6"><EmptyState title="Enter your tips" body="Add your annual tips, MAGI and filing status to estimate the deduction." /></div>
      ) : (
        <div className="mt-6"><ErrorNote>Check your numbers. Tips, MAGI and net income must be zero or greater.</ErrorNote></div>
      )}
    </div>
  );
}
