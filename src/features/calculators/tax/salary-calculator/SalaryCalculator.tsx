"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { convertPay, estimateTakeHome, type PayPeriod, type TakeHomeCountry } from "./salary";

const CURRENCIES = [
  { symbol: "$", label: "USD ($)" },
  { symbol: "£", label: "GBP (£)" },
  { symbol: "₹", label: "INR (₹)" },
  { symbol: "Rs", label: "PKR (Rs)" },
  { symbol: "€", label: "EUR (€)" },
];

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("25");
  const [period, setPeriod] = useState<PayPeriod>("hourly");
  const [hours, setHours] = useState("40");
  const [currency, setCurrency] = useState("$");
  const [country, setCountry] = useState<TakeHomeCountry>("us");
  const [stateRate, setStateRate] = useState("0");
  const [flatRate, setFlatRate] = useState("20");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const conversion = useMemo(() => {
    const a = parseNum(amount);
    const h = parseNum(hours);
    if (a === null || h === null) return null;
    try {
      return convertPay({ amount: a, period, hoursPerWeek: h });
    } catch {
      return null;
    }
  }, [amount, period, hours]);

  const takeHome = useMemo(() => {
    if (!conversion) return null;
    const s = parseNum(stateRate);
    const f = parseNum(flatRate);
    if (s === null || f === null) return null;
    try {
      return estimateTakeHome({
        grossYearly: conversion.yearly,
        country,
        stateRatePercent: s,
        flatTaxPercent: f,
      });
    } catch {
      return null;
    }
  }, [conversion, country, stateRate, flatRate]);

  const periods: { label: string; value: number; sub: string }[] = conversion
    ? [
        { label: "Hourly", value: conversion.hourly, sub: "Pay for one hour of work at this rate." },
        { label: "Daily", value: conversion.daily, sub: "One day, worked out as one fifth of the weekly pay." },
        { label: "Weekly", value: conversion.weekly, sub: "Pay for one full working week." },
        { label: "Monthly", value: conversion.monthly, sub: "The yearly pay divided into twelve equal months." },
        { label: "Yearly", value: conversion.yearly, sub: "Pay for a full year at this rate, before tax." },
      ]
    : [];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Pay amount" htmlFor="sal-amount">
          <input id="sal-amount" className={inputClass} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="Pay period" htmlFor="sal-period">
          <select id="sal-period" className={selectClass} value={period} onChange={(e) => setPeriod(e.target.value as PayPeriod)}>
            <option value="hourly">Per hour</option>
            <option value="daily">Per day</option>
            <option value="weekly">Per week</option>
            <option value="monthly">Per month</option>
            <option value="yearly">Per year</option>
          </select>
        </Field>
        <Field label="Hours per week" htmlFor="sal-hours" hint="Used for hourly, daily and weekly conversions. Full time is usually 40.">
          <input id="sal-hours" className={inputClass} inputMode="decimal" value={hours} onChange={(e) => setHours(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="sal-currency">
          <select id="sal-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.symbol} value={c.symbol}>{c.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {conversion ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {periods.map((p) => (
              <ResultCard key={p.label} label={p.label} value={money(p.value)} sub={p.sub} />
            ))}
          </div>

          <h3 className="mt-8 text-base font-semibold text-gray-900">Estimated take home pay</h3>
          <p className="mt-1 text-sm text-gray-500">
            An estimate on the yearly gross figure above. Pick a country, or use a single flat rate of your own.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Take home country" htmlFor="sal-country">
              <select id="sal-country" className={selectClass} value={country} onChange={(e) => setCountry(e.target.value as TakeHomeCountry)}>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="custom">Custom flat rate</option>
              </select>
            </Field>
            {country === "us" && (
              <Field label="State tax rate (%)" htmlFor="sal-state" hint="A flat estimate on gross income. Leave at 0 for federal and payroll taxes only.">
                <input id="sal-state" className={inputClass} inputMode="decimal" value={stateRate} onChange={(e) => setStateRate(e.target.value)} />
              </Field>
            )}
            {country === "custom" && (
              <Field label="Flat tax rate (%)" htmlFor="sal-flat" hint="One single rate applied to the whole gross income. Useful for a quick what if.">
                <input id="sal-flat" className={inputClass} inputMode="decimal" value={flatRate} onChange={(e) => setFlatRate(e.target.value)} />
              </Field>
            )}
          </div>

          {takeHome ? (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ResultCard label="Estimated take home per year" value={money(takeHome.net)} sub="Your yearly gross pay after the estimated deductions." />
                <ResultCard label="Estimated take home per month" value={money(takeHome.monthlyNet)} sub="The yearly take home divided into twelve monthly amounts." />
              </div>
              <div className="mt-4 rounded-2xl bg-white px-5 py-5 ring-1 ring-gray-200">
                <p className="text-sm font-semibold tracking-wide text-gray-700 uppercase">Estimated deductions</p>
                <dl className="mt-3 space-y-1.5 text-sm text-gray-600">
                  {takeHome.breakdown.map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <dt>{item.label}</dt>
                      <dd className="font-medium text-gray-900">{money(item.amount)}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-gray-200 pt-1.5">
                    <dt>Total deductions</dt>
                    <dd className="font-semibold text-gray-900">{money(takeHome.totalDeductions)}</dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Take home figures are estimates only. They use standard deductions and headline rates, with no pension, student loan, benefits or extra credits included. For a fuller figure, use the detailed country calculators on this site.
              </p>
            </>
          ) : (
            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              Enter a tax rate between 0 and 100 to see the take home estimate.
            </p>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a pay amount above zero and hours per week between 1 and 168 to see every period.
        </p>
      )}
    </div>
  );
}
