"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, Select } from "@/components/ui";
import { calculateFd, type CompoundingFrequency } from "./fd";

const CURRENCIES = ["₹", "$", "£", "Rs", "€"];

export default function FdCalculator() {
  const [currency, setCurrency] = useState("₹");
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("5");
  const [compounding, setCompounding] = useState<CompoundingFrequency>("quarterly");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (p === null || r === null || y === null) return null;
    try {
      return calculateFd({ principal: p, annualRatePercent: r, years: y, compounding });
    } catch {
      return null;
    }
  }, [principal, rate, years, compounding]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Deposit amount" htmlFor="fd-principal">
          <input id="fd-principal" className={inputClass} inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="fd-rate">
          <input id="fd-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Tenure (years)" htmlFor="fd-years" hint="Fractions work too, for example 2.5 years.">
          <input id="fd-years" className={inputClass} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Compounding" htmlFor="fd-compounding" hint="Indian banks compound quarterly by default.">
          <Select id="fd-compounding" value={compounding} onChange={(e) => setCompounding(e.target.value as CompoundingFrequency)}>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="half-yearly">Half yearly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </Field>
        <Field label="Currency" htmlFor="fd-currency">
          <Select id="fd-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
      </div>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="Maturity value" sub="What you get back at the end: your deposit plus all the interest." value={money(result.maturityValue)} />
          <ResultCard label="Total interest earned" sub="The extra money your deposit earned over the full term." value={money(result.totalInterest)} />
          <ResultCard label="Effective yearly rate" value={`${result.effectiveAnnualRatePercent}%`} sub="After compounding" />
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a deposit amount, rate and tenure to see the maturity value.
        </p>
      )}
    </div>
  );
}
