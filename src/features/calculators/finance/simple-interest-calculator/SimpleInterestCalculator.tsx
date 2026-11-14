"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateSimpleInterest, type TimeUnit } from "./simple-interest";

const CURRENCIES = ["$", "₹", "£", "Rs", "€"];

export default function SimpleInterestCalculator() {
  const [currency, setCurrency] = useState("$");
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7.5");
  const [timeValue, setTimeValue] = useState("3");
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("years");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const p = parseNum(principal);
    const r = parseNum(rate);
    const t = parseNum(timeValue);
    if (p === null || r === null || t === null) return null;
    try {
      return calculateSimpleInterest({
        principal: p,
        annualRatePercent: r,
        timeValue: t,
        timeUnit,
      });
    } catch {
      return null;
    }
  }, [principal, rate, timeValue, timeUnit]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Principal amount" htmlFor="si-principal">
          <input id="si-principal" className={inputClass} inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="si-rate">
          <input id="si-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Time" htmlFor="si-time">
          <input id="si-time" className={inputClass} inputMode="decimal" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} />
        </Field>
        <Field label="Time unit" htmlFor="si-unit">
          <select id="si-unit" className={selectClass} value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as TimeUnit)}>
            <option value="years">Years</option>
            <option value="months">Months</option>
            <option value="days">Days</option>
          </select>
        </Field>
        <Field label="Currency" htmlFor="si-currency">
          <select id="si-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="Interest earned" value={money(result.interest)} sub="The extra money the principal earns over the full period, before any tax or fees." />
          <ResultCard label="Total amount" value={money(result.totalAmount)} sub="Your original principal plus the interest earned, so this is what you end up with." />
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a principal above zero, a rate of zero or more, and a time above zero.
        </p>
      )}
    </div>
  );
}
