"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateRd } from "./rd";

const CURRENCIES = ["₹", "$", "£", "Rs", "€"];

export default function RdCalculator() {
  const [currency, setCurrency] = useState("₹");
  const [deposit, setDeposit] = useState("5000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("5");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const d = parseNum(deposit);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (d === null || r === null || y === null) return null;
    try {
      return calculateRd({ monthlyDeposit: d, annualRatePercent: r, years: y });
    } catch {
      return null;
    }
  }, [deposit, rate, years]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Monthly deposit" htmlFor="rd-deposit">
          <input id="rd-deposit" className={inputClass} inputMode="decimal" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="rd-rate">
          <input id="rd-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Tenure (years)" htmlFor="rd-years" hint="Common tenures are 1, 2, 3, 5 and 10 years. Fractions such as 1.5 are allowed.">
          <input id="rd-years" className={inputClass} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="rd-currency">
          <select id="rd-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Maturity value" value={money(result.maturityValue)} sub="What the deposit grows to at the end of the tenure, deposits plus all credited interest." />
            <ResultCard label="Total deposited" value={money(result.totalDeposited)} sub="Your monthly deposit multiplied by the number of months in the full tenure." />
            <ResultCard label="Interest earned" value={money(result.totalInterest)} sub="The gain the bank adds on top of your own deposits through quarterly compounding." />
          </div>
          {result.yearlyBreakdown.length > 0 && (
            <div className="mt-4 max-h-80 overflow-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Year</th>
                    <th className="px-4 py-2.5 font-semibold">Deposited so far</th>
                    <th className="px-4 py-2.5 font-semibold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-t border-gray-100">
                      <td className="px-4 py-2">{fmt(row.year)}</td>
                      <td className="px-4 py-2">{money(row.totalDeposited)}</td>
                      <td className="px-4 py-2">{money(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a monthly deposit above zero, a rate of zero or more, and a tenure above zero.
        </p>
      )}
    </div>
  );
}
