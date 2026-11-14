"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmtMoney, inputClass, parseNum, Select } from "@/components/ui";
import { calculateCapitalGains, type FilingStatus } from "./capital-gains";

const money = (n: number) => `$ ${fmtMoney(n)}`;

export default function CapitalGainsCalculator() {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [otherIncome, setOtherIncome] = useState("40000");
  const [shortTerm, setShortTerm] = useState("0");
  const [longTerm, setLongTerm] = useState("20000");
  const [magi, setMagi] = useState("");

  const parsed = useMemo(() => {
    const o = parseNum(otherIncome);
    const s = parseNum(shortTerm);
    const l = parseNum(longTerm);
    if (o === null || s === null || l === null) return null;
    let m: number | null = null;
    if (magi.trim() !== "") {
      m = parseNum(magi);
      if (m === null) return null;
    }
    return { o, s, l, m };
  }, [otherIncome, shortTerm, longTerm, magi]);

  const hasBadSign = parsed !== null && (parsed.o < 0 || (parsed.m !== null && parsed.m < 0));

  const result = useMemo(() => {
    if (!parsed || hasBadSign) return null;
    try {
      return calculateCapitalGains({
        filingStatus,
        otherTaxableIncome: parsed.o,
        shortTerm: parsed.s,
        longTerm: parsed.l,
        magi: parsed.m,
      });
    } catch {
      return null;
    }
  }, [parsed, hasBadSign, filingStatus]);

  const rows: { label: string; value: string }[] = result
    ? [
        { label: "Other taxable income (after any loss used)", value: money(result.baseTaxableIncome) },
        { label: "Net short term gain after netting", value: money(result.netShortTerm) },
        { label: "Net long term gain after netting", value: money(result.netLongTerm) },
        { label: "Total taxable income including gains", value: money(result.totalTaxableIncome) },
        { label: "Long term gain taxed at 0%", value: money(result.ltAtZero) },
        { label: "Long term gain taxed at 15%", value: money(result.ltAtFifteen) },
        { label: "Long term gain taxed at 20%", value: money(result.ltAtTwenty) },
        { label: "Tax on the long term gain", value: money(result.taxOnLongTerm) },
        { label: "Extra ordinary tax from the short term gain", value: money(result.taxOnShortTerm) },
        { label: "Ordinary tax on income plus short term gain", value: money(result.ordinaryTaxTotal) },
        ...(result.netLoss > 0
          ? [
              { label: "Net capital loss", value: money(result.netLoss) },
              { label: "Loss used against other income (max $3,000)", value: money(result.lossUsedAgainstIncome) },
              { label: "Loss carried forward (not modelled further)", value: money(result.lossCarryforward) },
            ]
          : []),
        {
          label: "Net investment income tax (NIIT)",
          value: result.niit === null ? "Skipped, no MAGI entered" : money(result.niit),
        },
      ]
    : [];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Filing status" htmlFor="cg-status">
          <Select
            id="cg-status"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          >
            <option value="single">Single</option>
            <option value="mfj">Married filing jointly</option>
            <option value="hoh">Head of household</option>
            <option value="mfs">Married filing separately</option>
          </Select>
        </Field>
        <Field
          label="Other taxable income ($)"
          htmlFor="cg-other"
          hint="Your taxable income without these gains, after deductions. The gains stack on top of this figure."
        >
          <input id="cg-other" className={inputClass} inputMode="decimal" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} />
        </Field>
        <Field
          label="Short term gain or loss ($)"
          htmlFor="cg-st"
          hint="Assets held a year or less. Enter a loss as a negative number, for example -3000."
        >
          <input id="cg-st" className={inputClass} inputMode="decimal" value={shortTerm} onChange={(e) => setShortTerm(e.target.value)} />
        </Field>
        <Field
          label="Long term gain or loss ($)"
          htmlFor="cg-lt"
          hint="Assets held more than a year. Enter a loss as a negative number, for example -10000."
        >
          <input id="cg-lt" className={inputClass} inputMode="decimal" value={longTerm} onChange={(e) => setLongTerm(e.target.value)} />
        </Field>
        <Field
          label="MAGI for NIIT ($, optional)"
          htmlFor="cg-magi"
          hint="Modified adjusted gross income. Leave blank to skip the 3.8 percent net investment income tax check."
        >
          <input id="cg-magi" className={inputClass} inputMode="decimal" value={magi} onChange={(e) => setMagi(e.target.value)} placeholder="Leave blank to skip" />
        </Field>
      </div>

      {hasBadSign && (
        <div className="mt-5">
          <ErrorNote>Other taxable income and MAGI cannot be negative. Gains and losses can be negative, because a loss is entered with a minus sign.</ErrorNote>
        </div>
      )}

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Estimated total tax"
              value={money(result.totalTax)}
              sub="Ordinary tax on your other income and short term gain, plus the tax on the long term gain, plus NIIT when it applies."
              primary
            />
            <ResultCard
              label="Tax on long term gain"
              value={money(result.taxOnLongTerm)}
              sub="Only the slice of the gain that rises above the 0 percent threshold is taxed, at 15 percent and then 20 percent."
            />
            <ResultCard
              label="Total taxable income"
              value={money(result.totalTaxableIncome)}
              sub="Your other taxable income plus the net gains after netting. The long term thresholds are measured against this total."
            />
          </div>

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Breakdown</h3>
          <div className="mt-3 overflow-hidden rounded-[1.75rem] ring-1 ring-gray-900/5">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="bg-white/60 odd:bg-white/30">
                    <td className="px-5 py-3 text-gray-700">{row.label}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900 tabular-nums">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Estimate only, for tax year 2026, federal tax only. State tax, the special 25 and 28 percent rate groups,
            collectibles and unrecaptured section 1250 gains, and detailed loss rules are not included.
          </p>
        </div>
      ) : (
        !hasBadSign && (
          <div className="mt-7">
            <EmptyState
              title="Enter your income and gains to see the estimate"
              body="Use a negative number for a loss. Leave MAGI blank if you do not want the net investment income tax checked, and the breakdown appears as soon as the figures are valid."
            />
          </div>
        )
      )}
    </div>
  );
}
