"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculatePpf } from "./ppf";

const CURRENCIES = ["₹", "$", "£", "Rs", "€"];

export default function PpfCalculator() {
  const [currency, setCurrency] = useState("₹");
  const [deposit, setDeposit] = useState("150000");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const d = parseNum(deposit);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (d === null || r === null || y === null) return null;
    try {
      return calculatePpf({ yearlyDeposit: d, annualRatePercent: r, years: y });
    } catch {
      return null;
    }
  }, [deposit, rate, years]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Yearly deposit" htmlFor="ppf-deposit" hint="PPF allows at most 150000 in one financial year, deposited in one go or in instalments.">
          <input id="ppf-deposit" className={inputClass} inputMode="decimal" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="ppf-rate" hint="The rate is set by the government and reviewed regularly. 7.1 percent is prefilled as a recent rate.">
          <input id="ppf-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Years" htmlFor="ppf-years" hint="A PPF account runs for 15 years and can then be extended in blocks of 5 years at a time.">
          <input id="ppf-years" className={inputClass} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="ppf-currency">
          <select id="ppf-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Maturity value" value={money(result.maturityValue)} sub="The closing balance at the end of the chosen period, ready to withdraw or to carry into an extension." />
            <ResultCard label="Total deposited" value={money(result.totalDeposited)} sub="Your yearly deposit multiplied by the number of years you stay invested." />
            <ResultCard label="Interest earned" value={money(result.totalInterest)} sub="All the yearly interest credits added together across the full period." />
          </div>
          {result.yearlyBreakdown.length > 0 && (
            <div className="mt-4 max-h-80 overflow-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Year</th>
                    <th className="px-4 py-2.5 font-semibold">Opening</th>
                    <th className="px-4 py-2.5 font-semibold">Deposit</th>
                    <th className="px-4 py-2.5 font-semibold">Interest</th>
                    <th className="px-4 py-2.5 font-semibold">Closing</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-t border-gray-100">
                      <td className="px-4 py-2">{fmt(row.year)}</td>
                      <td className="px-4 py-2">{money(row.opening)}</td>
                      <td className="px-4 py-2">{money(row.deposit)}</td>
                      <td className="px-4 py-2">{money(row.interest)}</td>
                      <td className="px-4 py-2">{money(row.closing)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a yearly deposit above zero and at most 150000, a rate of zero or more, and a whole number of years from 5 to 50.
        </p>
      )}
    </div>
  );
}
