"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, fmtMoney, inputClass, parseNum, Select } from "@/components/ui";
import { addTax, removeTax } from "./salestax";
import { states, getStateBySlug } from "./states";

type Mode = "add" | "remove";
type RateSource = "base" | "combined" | "custom";

/** Format a rate percent without trailing zeros, e.g. 6.875, 7.25, 4, 0. */
export function rateLabel(n: number): string {
  return Number(n.toFixed(3)).toString();
}

export default function SalesTaxCalculator({
  initialStateSlug = "california",
  showIndex = true,
}: {
  initialStateSlug?: string;
  showIndex?: boolean;
}) {
  const [amount, setAmount] = useState("100");
  const [mode, setMode] = useState<Mode>("add");
  const [stateSlug, setStateSlug] = useState(initialStateSlug);
  const [rateSource, setRateSource] = useState<RateSource>("combined");
  const [customRate, setCustomRate] = useState("8.25");

  const selected = getStateBySlug(stateSlug) ?? states[0];

  const rate = useMemo(() => {
    if (rateSource === "base") return selected.baseRate;
    if (rateSource === "combined") return selected.avgCombined;
    return parseNum(customRate);
  }, [rateSource, selected, customRate]);

  const amountValue = parseNum(amount);

  const result = useMemo(() => {
    if (amountValue === null || amountValue < 0 || rate === null || rate < 0) return null;
    return mode === "add" ? addTax(amountValue, rate) : removeTax(amountValue, rate);
  }, [amountValue, mode, rate]);

  const rateDescription =
    rateSource === "custom"
      ? "your custom rate"
      : rateSource === "base"
        ? `the ${selected.name} statewide base rate`
        : `the ${selected.name} average combined rate (state plus local, approximate)`;

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label={mode === "add" ? "Price before tax ($)" : "Total price including tax ($)"} htmlFor="st-amount">
          <input
            id="st-amount"
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>
        <Field label="What do you want to do?" htmlFor="st-mode">
          <Select id="st-mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="add">Add tax to a price</option>
            <option value="remove">Find the pre-tax price</option>
          </Select>
        </Field>
        <Field label="State" htmlFor="st-state">
          <Select
            id="st-state"
            value={stateSlug}
            onChange={(e) => setStateSlug(e.target.value)}
          >
            {states.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({s.abbr})
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Which rate?" htmlFor="st-rate-source">
          <Select
            id="st-rate-source"
            value={rateSource}
            onChange={(e) => setRateSource(e.target.value as RateSource)}
          >
            <option value="combined">Average combined rate: {rateLabel(selected.avgCombined)}%</option>
            <option value="base">State base rate: {rateLabel(selected.baseRate)}%</option>
            <option value="custom">Custom rate</option>
          </Select>
        </Field>
      </div>

      {rateSource === "custom" && (
        <div className="mt-5 max-w-xs">
          <Field label="Custom tax rate (%)" htmlFor="st-custom-rate" hint="Use the exact combined rate for your city and county if you know it.">
            <input
              id="st-custom-rate"
              type="number"
              min="0"
              step="0.001"
              className={inputClass}
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
            />
          </Field>
        </div>
      )}

      <div className="mt-7" aria-live="polite">
        {amount.trim() === "" ? (
          <EmptyState
            title="Enter an amount to see the tax"
            body="Type a price, pick your state and rate, and the tax, pre-tax price and total update as you type."
          />
        ) : result ? (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <ResultCard label="Price before tax" value={`$${fmtMoney(result.net)}`} sub="The amount the tax is charged on" />
              <ResultCard
                label="Sales tax"
                value={`$${fmtMoney(result.tax)}`}
                sub={`At ${rateLabel(rate ?? 0)}%, ${rateDescription}`}
              />
              <ResultCard
                label="Total price"
                value={`$${fmtMoney(result.gross)}`}
                sub="What you pay at the register, before any tips or fees"
                primary
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Rates are estimates. The average combined rate is an approximate average including local taxes, and
              actual local rates vary by city and county, so your exact rate can differ. The statewide base rate for{" "}
              {selected.name} is {rateLabel(selected.baseRate)}% and the average combined rate is{" "}
              {rateLabel(selected.avgCombined)}%.
            </p>
          </>
        ) : (
          <ErrorNote>
            Check your entries: the amount and the tax rate both need to be numbers of 0 or more. Current rate
            reading: {rate === null ? "not a number" : `${fmt(rate, 3)}%`}.
          </ErrorNote>
        )}
      </div>

      {showIndex && (
        <div className="mt-10">
          <h3 className="text-lg font-bold tracking-tight text-gray-900">Sales tax calculators by state</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
            Every state has its own page with its base rate, its average combined rate and the same calculator pre-set
            to that state.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/calculators/${s.stateSlug}`}
                className="glass rounded-full px-4 py-2.5 text-center text-sm font-semibold text-gray-800 transition duration-200 hover:-translate-y-0.5 hover:text-brand-900"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
