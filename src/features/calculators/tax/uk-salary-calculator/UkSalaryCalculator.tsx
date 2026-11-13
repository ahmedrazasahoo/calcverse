"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmtMoney, inputClass, parseNum, selectClass } from "@/components/ui";
import { calculateUkSalary, type StudentLoanPlan } from "./uk-salary";

export default function UkSalaryCalculator() {
  const [salary, setSalary] = useState("50000");
  const [pension, setPension] = useState("5");
  const [plan, setPlan] = useState<StudentLoanPlan>("none");

  const money = (n: number) => `£ ${fmtMoney(n)}`;

  const result = useMemo(() => {
    const s = parseNum(salary);
    const p = parseNum(pension);
    if (s === null || p === null) return null;
    try {
      return calculateUkSalary({
        grossAnnualSalary: s,
        pensionPercent: p,
        studentLoanPlan: plan,
      });
    } catch {
      return null;
    }
  }, [salary, pension, plan]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Gross annual salary (£)" htmlFor="uk-salary">
          <input id="uk-salary" className={inputClass} inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </Field>
        <Field label="Pension contribution (%)" htmlFor="uk-pension" hint="Treated as salary sacrifice, taken before tax and NI. Set 0 if none.">
          <input id="uk-pension" className={inputClass} inputMode="decimal" value={pension} onChange={(e) => setPension(e.target.value)} />
        </Field>
        <Field label="Student loan plan" htmlFor="uk-plan">
          <select id="uk-plan" className={selectClass} value={plan} onChange={(e) => setPlan(e.target.value as StudentLoanPlan)}>
            <option value="none">No student loan</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4 (Scotland)</option>
            <option value="plan5">Plan 5 (England, from Aug 2023)</option>
            <option value="postgraduate">Postgraduate loan</option>
          </select>
        </Field>
      </div>

      {result ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Take home per year" sub="Your yearly pay after income tax and National Insurance." value={money(result.netAnnual)} />
            <ResultCard label="Take home per month" sub="Your yearly take home divided into twelve monthly amounts." value={money(result.netMonthly)} />
            <ResultCard label="Take home per week" sub="Your yearly take home divided into 52 weekly amounts." value={money(result.netWeekly)} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Income tax" value={money(result.incomeTax)} sub={`${result.marginalTaxBand}, allowance £${result.personalAllowance.toLocaleString("en-GB")}`} />
            <ResultCard label="National Insurance" value={money(result.nationalInsurance)} sub="8% main rate, 2% above £50,270" />
            {result.pensionContribution > 0 && (
              <ResultCard label="Pension contribution" value={money(result.pensionContribution)} sub="Into your pension pot" />
            )}
            {result.studentLoanRepayment > 0 && (
              <ResultCard label="Student loan repayment" value={money(result.studentLoanRepayment)} sub="Collected through payroll" />
            )}
            <ResultCard label="Total deductions" value={money(result.totalDeductions)} sub={`Effective rate ${result.effectiveRatePercent}% of gross`} />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Rates for England, Wales and Northern Ireland, tax year 2025-26. Scotland sets its own income tax bands, so Scottish results will differ.
          </p>
        </>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter a valid salary and a pension percentage under 100 to see your take home pay.
        </p>
      )}
    </div>
  );
}
