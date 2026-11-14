"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, Select } from "@/components/ui";
import { calculateCompoundInterest, type CompoundingFrequency } from "./compound-interest";

const CURRENCIES = ["$", "₹", "£", "Rs", "€"];

export default function CompoundInterestCalculator() {
  const [currency, setCurrency] = useState("$");
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [compounding, setCompounding] = useState<CompoundingFrequency>("yearly");
  const [contribution, setContribution] = useState("0");

  const money = (n: number) => `${currency} ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const p = parseNum(principal);
    const r = parseNum(rate);
    const y = parseNum(years);
    const c = parseNum(contribution);
    if (p === null || r === null || y === null || c === null) return null;
    try {
      return calculateCompoundInterest({
        principal: p,
        annualRatePercent: r,
        years: y,
        compounding,
        monthlyContribution: c,
      });
    } catch {
      return null;
    }
  }, [principal, rate, years, compounding, contribution]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Starting amount" htmlFor="ci-principal">
          <input id="ci-principal" className={inputClass} inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </Field>
        <Field label="Interest rate (% per year)" htmlFor="ci-rate">
          <input id="ci-rate" className={inputClass} inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Years" htmlFor="ci-years">
          <input id="ci-years" className={inputClass} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Compound frequency" htmlFor="ci-compounding">
          <Select id="ci-compounding" value={compounding} onChange={(e) => setCompounding(e.target.value as CompoundingFrequency)}>
            <option value="yearly">Yearly</option>
            <option value="half-yearly">Half yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </Select>
        </Field>
        <Field label="Monthly contribution (optional)" htmlFor="ci-contribution">
          <input id="ci-contribution" className={inputClass} inputMode="decimal" value={contribution} onChange={(e) => setContribution(e.target.value)} />
        </Field>
        <Field label="Currency" htmlFor="ci-currency">
          <Select id="ci-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Final balance" sub="Your starting money plus all the interest it earned." value={money(result.finalBalance)} />
            <ResultCard label="You put in" sub="The total of your starting amount and every regular deposit you added." value={money(result.totalContributions)} />
            <ResultCard label="Interest earned" value={money(result.totalInterest)} sub="Growth on your money" />
          </div>
          {result.yearlyBreakdown.length > 0 && (
            <div className="mt-4 max-h-80 overflow-auto rounded-2xl ring-1 ring-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Year</th>
                    <th className="px-4 py-2.5 font-semibold">Put in</th>
                    <th className="px-4 py-2.5 font-semibold">Balance</th>
                    <th className="px-4 py-2.5 font-semibold">Interest earned</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-t border-gray-100">
                      <td className="px-4 py-2">{fmt(row.year)}</td>
                      <td className="px-4 py-2">{money(row.totalContributions)}</td>
                      <td className="px-4 py-2">{money(row.balance)}</td>
                      <td className="px-4 py-2">{money(row.interestEarned)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a starting amount or a monthly contribution, a rate and a number of years.
        </p>
      )}
    </div>
  );
}
