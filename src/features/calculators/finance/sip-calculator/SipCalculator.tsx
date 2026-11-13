"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateSip } from "./sip";

const CURRENCIES = ["₹", "$", "£", "Rs", "€"];

export default function SipCalculator() {
  const [currency, setCurrency] = useState("₹");
  const [monthly, setMonthly] = useState("10000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const m = parseNum(monthly);
    const r = parseNum(rate);
    const y = parseNum(years);
    if (m === null || r === null || y === null) return null;
    try {
      return calculateSip({ monthlyInvestment: m, expectedAnnualReturnPercent: r, years: y });
    } catch {
      return null;
    }
  }, [monthly, rate, years]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Monthly investment" htmlFor="sip-monthly">
          <input id="sip-monthly" className={inputClass} inputMode="decimal" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        </Field>
        <Field label="Expected return (% per year)" htmlFor="sip-rate" hint="12% is a common planning figure for equity funds.">
          <input id="sip-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Time period (years)" htmlFor="sip-years">
          <input id="sip-years" className={inputClass} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="sip-currency">
          <select id="sip-currency" className={selectClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Invested amount" value={money(result.investedAmount)} />
            <ResultCard label="Estimated gains" value={money(result.estimatedGain)} />
            <ResultCard label="Maturity value" value={money(result.maturityValue)} sub="Projection, not a guarantee" />
          </div>
          {result.yearlyBreakdown.length > 0 && (
            <div className="mt-4 max-h-80 overflow-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Year</th>
                    <th className="px-4 py-2.5 font-semibold">Invested</th>
                    <th className="px-4 py-2.5 font-semibold">Value</th>
                    <th className="px-4 py-2.5 font-semibold">Gains</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-t border-gray-100">
                      <td className="px-4 py-2">{fmt(row.year)}</td>
                      <td className="px-4 py-2">{money(row.investedAmount)}</td>
                      <td className="px-4 py-2">{money(row.value)}</td>
                      <td className="px-4 py-2">{money(row.estimatedGain)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a monthly amount, an expected return and a time period to see the projection.
        </p>
      )}
    </div>
  );
}
