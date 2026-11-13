"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import {
  calculatePakistanSalaryTax,
  PAKISTAN_TAX_YEARS,
  type PakistanTaxYearId,
} from "./pakistan-salary-tax";

export default function PakistanSalaryTaxCalculator() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [salary, setSalary] = useState("150000");
  const [taxYear, setTaxYear] = useState<PakistanTaxYearId>("2026-27");

  const money = (n: number) => `Rs ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const s = parseNum(salary);
    if (s === null) return null;
    try {
      return calculatePakistanSalaryTax({
        annualTaxableIncome: period === "monthly" ? s * 12 : s,
        taxYear,
      });
    } catch {
      return null;
    }
  }, [salary, period, taxYear]);

  const yearInfo = PAKISTAN_TAX_YEARS[taxYear];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Salary period" htmlFor="pk-period">
          <select id="pk-period" className={selectClass} value={period} onChange={(e) => setPeriod(e.target.value as "monthly" | "yearly")}>
            <option value="monthly">Monthly salary</option>
            <option value="yearly">Yearly salary</option>
          </select>
        </Field>
        <Field label={period === "monthly" ? "Monthly salary (Rs)" : "Yearly salary (Rs)"} htmlFor="pk-salary">
          <input id="pk-salary" className={inputClass} inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </Field>
        <Field label="Tax year" htmlFor="pk-year" hint={`${yearInfo.financeAct}, salaried slabs`}>
          <select id="pk-year" className={selectClass} value={taxYear} onChange={(e) => setTaxYear(e.target.value as PakistanTaxYearId)}>
            <option value="2026-27">Tax Year 2026-27</option>
            <option value="2025-26">Tax Year 2025-26</option>
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Tax per month" value={money(result.monthlyTax)} sub="Deducted by your employer under section 149" />
            <ResultCard label="Take home per month" value={money(result.netMonthlyIncome)} />
            <ResultCard label="Tax per year" value={money(result.totalTax)} sub={`Effective rate ${result.effectiveRatePercent}%`} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Gross salary per year" value={money(result.annualTaxableIncome)} />
            <ResultCard label="Your top slab rate" value={`${result.marginalRatePercent}%`} sub="Charged only on income inside that slab" />
            <ResultCard
              label="Surcharge (section 4AB)"
              value={money(result.surcharge)}
              sub={result.surcharge > 0 ? "9% on tax above Rs 10 million income" : taxYear === "2026-27" ? "Withdrawn for salaried staff in 2026-27" : "Applies only above Rs 10 million income"}
            />
          </div>
          <div className="mt-4 overflow-auto rounded-2xl ring-1 ring-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Annual taxable salary</th>
                  <th className="px-4 py-2.5 font-semibold">Tax</th>
                </tr>
              </thead>
              <tbody>
                {yearInfo.slabs.map((slab) => (
                  <tr key={slab.from} className="border-t border-gray-100">
                    <td className="px-4 py-2">
                      {slab.upTo === null
                        ? `Above Rs ${slab.from.toLocaleString("en-US")}`
                        : slab.from === 0
                          ? `Up to Rs ${slab.upTo.toLocaleString("en-US")}`
                          : `Rs ${slab.from.toLocaleString("en-US")} to Rs ${slab.upTo.toLocaleString("en-US")}`}
                    </td>
                    <td className="px-4 py-2">
                      {slab.ratePercent === 0
                        ? "Nil"
                        : `${slab.fixedAmount > 0 ? `Rs ${slab.fixedAmount.toLocaleString("en-US")} + ` : ""}${slab.ratePercent}% of the amount above Rs ${slab.from.toLocaleString("en-US")}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a valid salary to see your tax.
        </p>
      )}
    </div>
  );
}
