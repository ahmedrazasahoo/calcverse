"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, fmtMoney, inputClass, parseNum, primaryButtonClass, secondaryButtonClass, Select } from "@/components/ui";
import { MONTH_NAMES, compareStrategies, totalFirstMinimums, type CardInput, type StrategyResult } from "./payoff";

interface CardRow {
  name: string;
  balance: string;
  apr: string;
  minPercent: string;
  minFloor: string;
}

const STARTER: CardRow[] = [
  { name: "Card 1", balance: "3000", apr: "24.99", minPercent: "2", minFloor: "25" },
  { name: "Card 2", balance: "1200", apr: "19.99", minPercent: "2", minFloor: "25" },
];

export default function CreditCardPayoffCalculator() {
  const [rows, setRows] = useState<CardRow[]>(STARTER);
  const [budget, setBudget] = useState("400");
  const now = new Date();
  const [startMonth, setStartMonth] = useState(String(now.getMonth()));
  const [startYear, setStartYear] = useState(String(now.getFullYear()));

  const cards: CardInput[] | null = useMemo(() => {
    const out: CardInput[] = [];
    for (let i = 0; i < rows.length; i += 1) {
      const r = rows[i];
      const balance = parseNum(r.balance);
      const apr = parseNum(r.apr);
      const pct = parseNum(r.minPercent);
      const floor = parseNum(r.minFloor);
      if (balance === null || apr === null || pct === null || floor === null) return null;
      out.push({
        name: r.name.trim() === "" ? `Card ${i + 1}` : r.name.trim(),
        balance,
        aprPercent: apr,
        minPaymentPercent: pct,
        minPaymentFloor: floor,
      });
    }
    return out;
  }, [rows]);

  const budgetNum = parseNum(budget);
  const start = useMemo(() => {
    const y = parseNum(startYear);
    const m = parseNum(startMonth);
    if (y === null || m === null || m < 0 || m > 11) return null;
    return { year: y, month: m };
  }, [startYear, startMonth]);

  const results = useMemo(() => {
    if (!cards || !start) return null;
    return compareStrategies(cards, budgetNum, start);
  }, [cards, start, budgetNum]);

  const firstMinimums = useMemo(() => (cards ? totalFirstMinimums(cards) : 0), [cards]);

  const updateRow = (index: number, field: keyof CardRow, value: string) =>
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));

  const strategyCell = (r: StrategyResult | undefined): string => {
    if (!r) return "n/a";
    if (r.error) return "Check inputs";
    if (r.notPayable) return "Not payable";
    return `${r.months} months`;
  };

  return (
    <div>
      <div className="space-y-6">
        {rows.map((row, i) => (
          <fieldset key={i} className="glass rounded-[2rem] px-6 py-5">
            <legend className="px-1 text-sm font-semibold text-gray-800">Card {i + 1}</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Field label="Card name" htmlFor={`ccp-name-${i}`}>
                <input id={`ccp-name-${i}`} type="text" className={inputClass} value={row.name} onChange={(e) => updateRow(i, "name", e.target.value)} />
              </Field>
              <Field label="Balance" htmlFor={`ccp-bal-${i}`}>
                <input id={`ccp-bal-${i}`} type="number" step="0.01" min="0" className={inputClass} value={row.balance} onChange={(e) => updateRow(i, "balance", e.target.value)} />
              </Field>
              <Field label="APR percent" htmlFor={`ccp-apr-${i}`}>
                <input id={`ccp-apr-${i}`} type="number" step="0.01" min="0" className={inputClass} value={row.apr} onChange={(e) => updateRow(i, "apr", e.target.value)} />
              </Field>
              <Field label="Minimum percent of balance" htmlFor={`ccp-pct-${i}`} hint="Commonly 1 to 3 percent.">
                <input id={`ccp-pct-${i}`} type="number" step="0.1" min="0" className={inputClass} value={row.minPercent} onChange={(e) => updateRow(i, "minPercent", e.target.value)} />
              </Field>
              <Field label="Minimum payment floor" htmlFor={`ccp-floor-${i}`} hint="Commonly 25.">
                <input id={`ccp-floor-${i}`} type="number" step="1" min="0" className={inputClass} value={row.minFloor} onChange={(e) => updateRow(i, "minFloor", e.target.value)} />
              </Field>
            </div>
            {rows.length > 1 && (
              <button type="button" className={`${secondaryButtonClass} mt-4`} onClick={() => setRows((prev) => prev.filter((_, j) => j !== i))}>
                Remove this card
              </button>
            )}
          </fieldset>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className={primaryButtonClass}
          onClick={() =>
            setRows((prev) => [
              ...prev,
              { name: `Card ${prev.length + 1}`, balance: "1000", apr: "22.99", minPercent: "2", minFloor: "25" },
            ])
          }
        >
          Add another card
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <Field label="Total monthly budget for the budget strategies" htmlFor="ccp-budget" hint={`First month minimums total ${fmtMoney(firstMinimums)}. The budget must be higher than that.`}>
          <input id="ccp-budget" type="number" step="1" min="0" className={inputClass} value={budget} onChange={(e) => setBudget(e.target.value)} />
        </Field>
        <Field label="Start month" htmlFor="ccp-start-month">
          <Select id="ccp-start-month" value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
            {MONTH_NAMES.map((name, i) => (
              <option key={name} value={String(i)}>
                {name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Start year" htmlFor="ccp-start-year">
          <input id="ccp-start-year" type="number" step="1" className={inputClass} value={startYear} onChange={(e) => setStartYear(e.target.value)} />
        </Field>
      </div>

      {!results ? (
        <div className="mt-7">
          <EmptyState title="Fill in every card field to begin" body="Balances, APR values and minimum payment settings must all be numbers before the three payoff plans can be simulated." />
        </div>
      ) : (
        <div className="mt-7" aria-live="polite">
          {results.map(
            (r) =>
              r.error && (
                <div key={`err-${r.strategy}`} className="mb-3">
                  <ErrorNote>
                    {r.label}: {r.error}
                  </ErrorNote>
                </div>
              ),
          )}

          <h3 className="text-lg font-bold tracking-tight text-gray-900">Strategy comparison</h3>
          <div className="glass mt-3 overflow-x-auto rounded-[1.75rem] p-2">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="text-xs tracking-widest text-brand-800 uppercase">
                  <th className="px-4 py-2.5 font-semibold">Strategy</th>
                  <th className="px-4 py-2.5 font-semibold">Debt free in</th>
                  <th className="px-4 py-2.5 font-semibold">Total interest</th>
                  <th className="px-4 py-2.5 font-semibold">Total paid</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.strategy} className="border-t border-gray-900/5">
                    <td className="px-4 py-2.5 font-semibold text-gray-900">{r.label}</td>
                    <td className="px-4 py-2.5 text-gray-700 tabular-nums">{strategyCell(r)}</td>
                    <td className="px-4 py-2.5 text-gray-700 tabular-nums">{r.error ? "n/a" : fmtMoney(r.totalInterest)}</td>
                    <td className="px-4 py-2.5 text-gray-700 tabular-nums">{r.error ? "n/a" : fmtMoney(r.totalPaid)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {results.map((r) => (
              <div key={r.strategy} className="glass rounded-[2rem] px-6 py-5">
                <p className="text-xs font-semibold tracking-widest text-brand-800 uppercase">{r.label}</p>
                {r.error ? (
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">Fix the note above to see this plan.</p>
                ) : r.notPayable ? (
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    This plan never clears the debt: at some point the payment stops covering the monthly interest,
                    so the balance cannot fall. Raise the budget or check the minimum payment settings.
                  </p>
                ) : (
                  <>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                      {r.months} months
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Interest {fmtMoney(r.totalInterest)}, total paid {fmtMoney(r.totalPaid)}, in the same currency
                      as the balances you entered.
                    </p>
                    <p className="mt-3 text-sm font-semibold text-gray-800">Payoff order</p>
                    <ol className="mt-1.5 space-y-1 text-sm text-gray-700">
                      {r.payoffOrder.map((entry) => (
                        <li key={entry.name}>
                          {entry.name}: clear in {entry.monthLabel} (month {entry.month})
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
