"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateIndiaIncomeTax, type IndiaAgeGroup, type IndiaRegimeResult } from "./india-income-tax";

function RegimeCard({ result, winner }: { result: IndiaRegimeResult; winner: boolean }) {
  const money = (n: number) => `Rs ${fmtMoney(n)}`;
  return (
    <div className={`rounded-2xl px-5 py-5 ring-1 ${winner ? "bg-emerald-50 ring-emerald-200" : "bg-white ring-gray-200"}`}>
      <p className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
        {result.regime === "new" ? "New regime" : "Old regime"}
        {winner && <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white normal-case">Better for you</span>}
      </p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{money(result.totalTax)}</p>
      <dl className="mt-4 space-y-1.5 text-sm text-gray-600">
        <div className="flex justify-between"><dt>Taxable income</dt><dd className="font-medium text-gray-900">{money(result.taxableIncome)}</dd></div>
        <div className="flex justify-between"><dt>Standard deduction</dt><dd className="font-medium text-gray-900">{money(result.standardDeduction)}</dd></div>
        {result.otherDeductions > 0 && (
          <div className="flex justify-between"><dt>Other deductions</dt><dd className="font-medium text-gray-900">{money(result.otherDeductions)}</dd></div>
        )}
        <div className="flex justify-between"><dt>Slab tax</dt><dd className="font-medium text-gray-900">{money(result.slabTax)}</dd></div>
        {result.rebate > 0 && (
          <div className="flex justify-between"><dt>Rebate (87A)</dt><dd className="font-medium text-emerald-700">minus {money(result.rebate)}</dd></div>
        )}
        {result.surcharge > 0 && (
          <div className="flex justify-between"><dt>Surcharge</dt><dd className="font-medium text-gray-900">{money(result.surcharge)}</dd></div>
        )}
        <div className="flex justify-between"><dt>Cess (4%)</dt><dd className="font-medium text-gray-900">{money(result.cess)}</dd></div>
        <div className="flex justify-between border-t border-gray-200 pt-1.5"><dt>Take home</dt><dd className="font-semibold text-gray-900">{money(result.netIncome)}</dd></div>
      </dl>
    </div>
  );
}

export default function IndiaIncomeTaxCalculator() {
  const [income, setIncome] = useState("1275000");
  const [deductions, setDeductions] = useState("0");
  const [ageGroup, setAgeGroup] = useState<IndiaAgeGroup>("below60");

  const result = useMemo(() => {
    const inc = parseNum(income);
    const ded = parseNum(deductions);
    if (inc === null || ded === null) return null;
    try {
      return calculateIndiaIncomeTax({
        grossAnnualIncome: inc,
        oldRegimeDeductions: ded,
        ageGroup,
      });
    } catch {
      return null;
    }
  }, [income, deductions, ageGroup]);

  const money = (n: number) => `Rs ${fmtMoney(n)}`;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Gross annual salary (Rs)" htmlFor="in-income">
          <input id="in-income" className={inputClass} inputMode="decimal" value={income} onChange={(e) => setIncome(e.target.value)} />
        </Field>
        <Field label="Old regime deductions (Rs)" htmlFor="in-deductions" hint="Total of 80C, 80D, HRA exemption and similar. Old regime only.">
          <input id="in-deductions" className={inputClass} inputMode="decimal" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
        </Field>
        <Field label="Age group" htmlFor="in-age" hint="Changes the old regime basic exemption.">
          <select id="in-age" className={selectClass} value={ageGroup} onChange={(e) => setAgeGroup(e.target.value as IndiaAgeGroup)}>
            <option value="below60">Below 60 years</option>
            <option value="60to80">60 to 80 years (senior citizen)</option>
            <option value="above80">Above 80 years (super senior)</option>
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <RegimeCard result={result.newRegime} winner={result.betterRegime === "new"} />
            <RegimeCard result={result.oldRegime} winner={result.betterRegime === "old"} />
          </div>
          <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900 ring-1 ring-brand-100">
            {result.betterRegime === "equal"
              ? "Both regimes cost you exactly the same on these figures."
              : `Choosing the ${result.betterRegime} regime saves you ${money(result.savings)} this year.`}
          </p>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a valid income and deductions figure to compare the regimes.
        </p>
      )}
    </div>
  );
}
