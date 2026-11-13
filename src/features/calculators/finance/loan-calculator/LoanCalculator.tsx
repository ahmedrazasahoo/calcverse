"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateLoan } from "./loan";

const CURRENCIES = ["$", "₹", "£", "Rs", "€"];

export default function LoanCalculator() {
  const [currency, setCurrency] = useState("$");
  const [principal, setPrincipal] = useState("200000");
  const [rate, setRate] = useState("6");
  const [termYears, setTermYears] = useState("5");
  const [termMonths, setTermMonths] = useState("0");
  const [extra, setExtra] = useState("0");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(termYears);
    const m = parseNum(termMonths);
    const e = parseNum(extra);
    if (p === null || r === null || y === null || m === null || e === null) return null;
    try {
      return calculateLoan({
        principal: p,
        annualRatePercent: r,
        termYears: y,
        termMonths: m,
        extraMonthlyPayment: e,
      });
    } catch {
      return null;
    }
  }, [principal, rate, termYears, termMonths, extra]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Loan amount" htmlFor="loan-principal">
          <input id="loan-principal" className={inputClass} inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="loan-rate">
          <input id="loan-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="loan-currency">
          <select id="loan-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Term (years)" htmlFor="loan-years">
          <input id="loan-years" className={inputClass} inputMode="numeric" value={termYears} onChange={(e) => setTermYears(e.target.value)} />
        </Field>
        <Field label="Term (extra months)" htmlFor="loan-months" hint="0 to 11, for terms like 5 years 6 months.">
          <input id="loan-months" className={inputClass} inputMode="numeric" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} />
        </Field>
        <Field label="Extra monthly payment (optional)" htmlFor="loan-extra" hint="See what paying a little extra every month does.">
          <input id="loan-extra" className={inputClass} inputMode="decimal" value={extra} onChange={(e) => setExtra(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Monthly payment" value={money(result.monthlyPayment)} sub={`${fmt(result.termInMonths)} month term`} />
            <ResultCard label="Total interest" sub="The full cost of borrowing, on top of the amount you borrowed." value={money(result.standard.totalInterest)} />
            <ResultCard label="Total cost of the loan" sub="Everything you repay in total: the loan amount plus all the interest." value={money(result.standard.totalPayment)} />
          </div>
          {result.monthsSaved > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <ResultCard label="Debt free sooner by" value={`${fmt(result.monthsSaved)} months`} sub={`Loan ends in ${fmt(result.withExtra.months)} months`} />
              <ResultCard label="Interest saved" sub="How much interest your extra payments wipe out compared with paying normally." value={money(result.interestSaved)} />
              <ResultCard label="Interest with extra payments" sub="The interest left to pay once your extra payments are counted." value={money(result.withExtra.totalInterest)} />
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a loan amount, rate and term to see the payment and total cost.
        </p>
      )}
    </div>
  );
}
