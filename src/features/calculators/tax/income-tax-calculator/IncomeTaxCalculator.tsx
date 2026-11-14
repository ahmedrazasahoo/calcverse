"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { estimateIncomeTax, type IncomeTaxCountry } from "./income-tax";

const COUNTRY_META: Record<IncomeTaxCountry, { label: string; symbol: string; grossLabel: string }> = {
  india: { label: "India", symbol: "₹", grossLabel: "Gross yearly income (₹)" },
  us: { label: "United States", symbol: "$", grossLabel: "Gross yearly income ($)" },
  uk: { label: "United Kingdom", symbol: "£", grossLabel: "Gross yearly income (£)" },
};

const DEFAULT_GROSS: Record<IncomeTaxCountry, string> = {
  india: "1275000",
  us: "85000",
  uk: "60000",
};

export default function IncomeTaxCalculator() {
  const [country, setCountry] = useState<IncomeTaxCountry>("india");
  const [gross, setGross] = useState(DEFAULT_GROSS.india);
  const [stateRate, setStateRate] = useState("0");

  const meta = COUNTRY_META[country];
  const money = (n: number) => `${meta.symbol} ${fmtMoney(n)}`;

  const changeCountry = (next: IncomeTaxCountry) => {
    setCountry(next);
    setGross(DEFAULT_GROSS[next]);
  };

  const result = useMemo(() => {
    const g = parseNum(gross);
    const s = parseNum(stateRate);
    if (g === null || (country === "us" && s === null)) return null;
    try {
      return estimateIncomeTax(country, g, s ?? 0);
    } catch {
      return null;
    }
  }, [country, gross, stateRate]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Country" htmlFor="it-country" hint="Each country uses the figures from its detailed calculator on this site.">
          <select id="it-country" className={selectClass} value={country} onChange={(e) => changeCountry(e.target.value as IncomeTaxCountry)}>
            <option value="india">India</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </Field>
        <Field label={meta.grossLabel} htmlFor="it-gross">
          <input id="it-gross" className={inputClass} inputMode="decimal" value={gross} onChange={(e) => setGross(e.target.value)} />
        </Field>
        {country === "us" && (
          <Field label="State tax rate (%)" htmlFor="it-state" hint="A flat estimate on your gross income. Set 0 if your state has no income tax or you want federal only.">
            <input id="it-state" className={inputClass} inputMode="decimal" value={stateRate} onChange={(e) => setStateRate(e.target.value)} />
          </Field>
        )}
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Estimated total tax" value={money(result.totalTax)} sub="All taxes and payroll deductions for this country combined, as an estimate." />
            <ResultCard label="Take home pay" value={money(result.net)} sub="What is left of your gross yearly income after the estimated tax." />
            <ResultCard label="Effective tax rate" value={`${fmt(result.effectiveRatePercent, 2)}%`} sub={`Your estimated total tax as a share of gross income. Top rate that applies: ${fmt(result.marginalRatePercent, 0)}%.`} />
          </div>

          <div className="mt-4 rounded-2xl bg-white px-5 py-5 ring-1 ring-gray-200">
            <p className="text-sm font-semibold tracking-wide text-gray-700 uppercase">How the estimate breaks down</p>
            <dl className="mt-3 space-y-1.5 text-sm text-gray-600">
              {result.breakdown.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <dt>{item.label}</dt>
                  <dd className="font-medium text-gray-900">{money(item.amount)}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-gray-200 pt-1.5">
                <dt>Gross income</dt>
                <dd className="font-semibold text-gray-900">{money(result.gross)}</dd>
              </div>
            </dl>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            This is an estimate only, based on a single gross income with standard deductions and no extra credits or reliefs. For a fuller figure, use the detailed calculator for your country on this site: the India income tax calculator, the UK salary calculator, or the Pakistan salary tax calculator.
          </p>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a valid gross income of zero or more{country === "us" ? " and a state rate between 0 and 100" : ""} to see your estimate.
        </p>
      )}
    </div>
  );
}
