"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass, parseNum } from "@/components/ui";
import { addSalesTax, applyStackedDiscounts } from "./discount";

function money(n: number): string {
  return fmt(n, 2);
}

export default function DiscountCalculator() {
  const [price, setPrice] = useState("120");
  const [first, setFirst] = useState("25");
  const [second, setSecond] = useState("");
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const original = parseNum(price);
    const firstOff = parseNum(first);
    if (original === null || firstOff === null) return null;
    const percents = [firstOff];
    const secondOff = parseNum(second);
    if (second.trim() !== "") {
      if (secondOff === null) return null;
      percents.push(secondOff);
    }
    const discounted = applyStackedDiscounts(original, percents);
    if (!discounted) return null;
    let taxInfo: { taxAmount: number; totalPrice: number; taxPercent: number } | null = null;
    if (tax.trim() !== "") {
      const taxPercent = parseNum(tax);
      if (taxPercent === null) return null;
      const taxed = addSalesTax(discounted.finalPrice, taxPercent);
      if (!taxed) return null;
      taxInfo = { taxAmount: taxed.taxAmount, totalPrice: taxed.totalPrice, taxPercent };
    }
    return { discounted, taxInfo };
  }, [price, first, second, tax]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Original price" htmlFor="di-price">
          <input id="di-price" type="number" min="0" step="0.01" className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
        <Field label="Discount (percent off)" htmlFor="di-first">
          <input id="di-first" type="number" min="0" max="100" className={inputClass} value={first} onChange={(e) => setFirst(e.target.value)} />
        </Field>
        <Field label="Extra discount (percent, optional)" htmlFor="di-second" hint="For stacked offers like an extra 10 percent at checkout.">
          <input id="di-second" type="number" min="0" max="100" className={inputClass} value={second} onChange={(e) => setSecond(e.target.value)} placeholder="Optional" />
        </Field>
        <Field label="Sales tax (percent, optional)" htmlFor="di-tax" hint="Applied after the discount, the way shops charge it.">
          <input id="di-tax" type="number" min="0" max="100" className={inputClass} value={tax} onChange={(e) => setTax(e.target.value)} placeholder="Optional" />
        </Field>
      </div>

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard label={result.taxInfo ? "Price after discount" : "You pay"} value={money(result.discounted.finalPrice)} sub={`Was ${money(result.discounted.originalPrice)}`} />
            <ResultCard label="You save" value={money(result.discounted.savedAmount)} sub={`${fmt(result.discounted.effectivePercent, 1)} percent off in total`} />
            {result.taxInfo && (
              <ResultCard label="Total with tax" value={money(result.taxInfo.totalPrice)} sub={`Includes ${money(result.taxInfo.taxAmount)} tax at ${fmt(result.taxInfo.taxPercent, 1)} percent`} />
            )}
          </div>
          {result.discounted.steps.length > 1 && (
            <div className="mt-4 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">How the stacked discounts land</p>
              <ul className="mt-2 space-y-1">
                {result.discounted.steps.map((step, i) => (
                  <li key={i}>
                    After {fmt(step.percentOff, 1)} percent off: <strong className="text-gray-900">{money(step.priceAfter)}</strong>
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                Stacked discounts multiply rather than add, which is why the total saving is less than the two
                percentages added together.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Enter a price and a discount between 0 and 100 percent to see the final price.</p>
      )}
    </div>
  );
}
