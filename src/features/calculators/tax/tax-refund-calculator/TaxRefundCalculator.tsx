"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmtMoney, inputClass, parseNum, Select } from "@/components/ui";
import { calculateTaxRefund, type FilingStatus } from "./tax-refund";

const money = (n: number) => `$ ${fmtMoney(n)}`;

export default function TaxRefundCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [wages, setWages] = useState("60000");
  const [otherIncome, setOtherIncome] = useState("0");
  const [adjustments, setAdjustments] = useState("0");
  const [withheld, setWithheld] = useState("7000");
  const [children, setChildren] = useState("0");
  const [dependents, setDependents] = useState("0");
  const [eitcChildren, setEitcChildren] = useState("0");

  const parsed = useMemo(() => {
    const w = parseNum(wages);
    const o = parseNum(otherIncome);
    const a = parseNum(adjustments);
    const wh = parseNum(withheld);
    const c = parseNum(children);
    const d = parseNum(dependents);
    const e = parseNum(eitcChildren);
    if (w === null || o === null || a === null || wh === null || c === null || d === null || e === null) return null;
    return { w, o, a, wh, c, d, e };
  }, [wages, otherIncome, adjustments, withheld, children, dependents, eitcChildren]);

  const hasNegative = parsed !== null && [parsed.w, parsed.o, parsed.a, parsed.wh].some((v) => v < 0);

  const result = useMemo(() => {
    if (!parsed || hasNegative) return null;
    try {
      return calculateTaxRefund({
        filingStatus,
        wages: parsed.w,
        otherIncome: parsed.o,
        adjustments: parsed.a,
        federalWithheld: parsed.wh,
        childrenUnder17: parsed.c,
        otherDependents: parsed.d,
        eitcChildren: parsed.e,
      });
    } catch {
      return null;
    }
  }, [parsed, hasNegative, filingStatus]);

  const rows: { label: string; value: string }[] = result
    ? [
        { label: "Total income", value: money(result.totalIncome) },
        { label: "Adjusted gross income (AGI)", value: money(result.agi) },
        { label: "Standard deduction (2026)", value: money(result.standardDeduction) },
        { label: "Taxable income", value: money(result.taxableIncome) },
        { label: "Tax from the 2026 brackets", value: money(result.bracketTax) },
        { label: "Child tax credit allowed", value: money(result.childTaxCredit) },
        { label: "Other dependent credit allowed", value: money(result.otherDependentCredit) },
        { label: "Tax after nonrefundable credits", value: money(result.taxAfterCredits) },
        { label: "Refundable additional child tax credit", value: money(result.additionalChildTaxCredit) },
        { label: "Earned income tax credit (EITC)", value: money(result.eitc) },
        { label: "Federal tax withheld", value: money(parsed?.wh ?? 0) },
        { label: "Total payments and refundable credits", value: money(result.totalPayments) },
      ]
    : [];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Filing status" htmlFor="refund-status">
          <Select
            id="refund-status"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          >
            <option value="single">Single</option>
            <option value="mfj">Married filing jointly</option>
            <option value="hoh">Head of household</option>
          </Select>
        </Field>
        <Field label="Wages and salary ($)" htmlFor="refund-wages" hint="Your pay before tax, for example box 1 of a W-2. This counts as earned income for the EITC.">
          <input id="refund-wages" className={inputClass} inputMode="decimal" value={wages} onChange={(e) => setWages(e.target.value)} />
        </Field>
        <Field label="Other income ($)" htmlFor="refund-other" hint="Interest, pensions, rental profit and anything else on top of wages.">
          <input id="refund-other" className={inputClass} inputMode="decimal" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} />
        </Field>
        <Field label="Adjustments to income ($)" htmlFor="refund-adj" hint="One combined figure, for example pretax 401(k) or HSA contributions and student loan interest.">
          <input id="refund-adj" className={inputClass} inputMode="decimal" value={adjustments} onChange={(e) => setAdjustments(e.target.value)} />
        </Field>
        <Field label="Federal tax withheld ($)" htmlFor="refund-withheld" hint="Tax already taken from your pay during the year, for example box 2 of a W-2.">
          <input id="refund-withheld" className={inputClass} inputMode="decimal" value={withheld} onChange={(e) => setWithheld(e.target.value)} />
        </Field>
        <Field label="Children under 17" htmlFor="refund-children" hint="Children who qualify for the $2,200 child tax credit.">
          <input id="refund-children" className={inputClass} inputMode="numeric" value={children} onChange={(e) => setChildren(e.target.value)} />
        </Field>
        <Field label="Other dependents" htmlFor="refund-deps" hint="Dependents who qualify for the $500 other dependent credit instead.">
          <input id="refund-deps" className={inputClass} inputMode="numeric" value={dependents} onChange={(e) => setDependents(e.target.value)} />
        </Field>
        <Field label="EITC qualifying children" htmlFor="refund-eitc">
          <Select id="refund-eitc" value={eitcChildren} onChange={(e) => setEitcChildren(e.target.value)}>
            <option value="0">None</option>
            <option value="1">1 child</option>
            <option value="2">2 children</option>
            <option value="3">3 or more children</option>
          </Select>
        </Field>
      </div>

      {hasNegative && (
        <div className="mt-5">
          <ErrorNote>Income, adjustments and withholding cannot be negative. Set any negative figure to zero or a positive amount.</ErrorNote>
        </div>
      )}

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              label={result.isRefund ? "Estimated refund" : "Estimated amount owed"}
              value={money(result.isRefund ? result.refund : result.amountOwed)}
              sub={
                result.isRefund
                  ? "Your withholding and refundable credits are higher than your final tax bill, so the difference comes back to you."
                  : "Your withholding and refundable credits fall short of your final tax bill, so this is the balance still to pay."
              }
              primary
            />
            <ResultCard
              label="Effective tax rate"
              value={`${fmtMoney(result.effectiveRatePercent)}%`}
              sub="Your tax after nonrefundable credits, as a share of your adjusted gross income."
            />
            <ResultCard
              label="Marginal tax rate"
              value={`${fmtMoney(result.marginalRatePercent)}%`}
              sub="The 2026 bracket your last dollar of taxable income falls in. The next extra dollar is taxed at this rate."
            />
          </div>

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">How the estimate is built</h3>
          <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-gray-900/5">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="bg-white odd:bg-white/30">
                    <td className="px-5 py-3 text-gray-700">{row.label}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900 tabular-nums">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Estimate only, for tax year 2026. State tax, itemised deductions, self employment tax, capital gains rates
            and most other credits are not included, so your real return can come out higher or lower.
          </p>
        </div>
      ) : (
        !hasNegative && (
          <div className="mt-7">
            <EmptyState
              title="Fill in every box to see your estimate"
              body="Use whole numbers for the child and dependent counts, and zero anywhere that does not apply to you. The refund or balance owed appears as soon as every figure is valid."
            />
          </div>
        )
      )}
    </div>
  );
}
