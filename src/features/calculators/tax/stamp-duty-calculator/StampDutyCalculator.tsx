"use client";

import { useMemo, useState } from "react";
import { EmptyState, ErrorNote, Field, ResultCard, fmt, inputClass, parseNum, Select } from "@/components/ui";
import { calculateStampDuty, fmtGbp } from "./stamp-duty";

export default function StampDutyCalculator() {
  const [price, setPrice] = useState("300000");
  const [buyerType, setBuyerType] = useState<"standard" | "ftb">("standard");

  const parsedPrice = parseNum(price);
  const hasBadPrice = parsedPrice !== null && parsedPrice <= 0;

  const result = useMemo(() => {
    if (parsedPrice === null || parsedPrice <= 0) return null;
    try {
      return calculateStampDuty({ price: parsedPrice, firstTimeBuyer: buyerType === "ftb" });
    } catch {
      return null;
    }
  }, [parsedPrice, buyerType]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Purchase price (£)"
          htmlFor="sdlt-price"
          hint="The full price of the home, for a purchase in England or Northern Ireland completing on or after 1 April 2025."
        >
          <input id="sdlt-price" className={inputClass} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
        <Field
          label="Buyer type"
          htmlFor="sdlt-buyer"
          hint="First time buyer relief only applies when every buyer is a first time buyer and the price is £500,000 or less."
        >
          <Select
            id="sdlt-buyer"
            value={buyerType}
            onChange={(e) => setBuyerType(e.target.value as "standard" | "ftb")}
          >
            <option value="standard">Standard buyer</option>
            <option value="ftb">First time buyer (all buyers)</option>
          </Select>
        </Field>
      </div>

      {hasBadPrice && (
        <div className="mt-5">
          <ErrorNote>The purchase price must be above zero. Enter the full price of the property in pounds.</ErrorNote>
        </div>
      )}

      {result ? (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              label="Stamp duty (SDLT) to pay"
              value={fmtGbp(result.totalTax, 2)}
              sub="Charged in slices: each band rate applies only to the part of the price inside that band."
              primary
            />
            <ResultCard
              label="Effective rate"
              value={`${fmt(result.effectiveRatePercent, 2)}%`}
              sub="The total SDLT as a share of the purchase price. It is always lower than your highest band rate."
            />
            <ResultCard
              label="Price plus stamp duty"
              value={fmtGbp(result.price + result.totalTax, 2)}
              sub="The purchase price and the SDLT together, before legal fees, surveys and other moving costs."
            />
          </div>

          {result.reliefLost && (
            <div className="mt-5">
              <ErrorNote>
                First time buyer relief is lost at this price. Relief only applies up to £500,000, so the standard
                bands have been applied to the whole price instead.
              </ErrorNote>
            </div>
          )}

          <h3 className="mt-8 text-lg font-bold tracking-tight text-gray-900">Band by band breakdown</h3>
          <div className="mt-3 overflow-hidden rounded-[1.75rem] ring-1 ring-gray-900/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/70 text-left">
                  <th className="px-5 py-3 font-semibold text-gray-800">Band</th>
                  <th className="px-5 py-3 text-right font-semibold text-gray-800">Rate</th>
                  <th className="px-5 py-3 text-right font-semibold text-gray-800">In band</th>
                  <th className="px-5 py-3 text-right font-semibold text-gray-800">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row) => (
                  <tr key={row.label} className="bg-white/60 odd:bg-white/30">
                    <td className="px-5 py-3 text-gray-700">{row.label}</td>
                    <td className="px-5 py-3 text-right text-gray-700 tabular-nums">{fmt(row.ratePercent, 0)}%</td>
                    <td className="px-5 py-3 text-right text-gray-700 tabular-nums">{fmtGbp(row.amountInBand, 2)}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900 tabular-nums">{fmtGbp(row.tax, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            England and Northern Ireland only, standard residential rates, checked November 2026. The additional
            property surcharge and the non-resident surcharge are not included. Scotland charges LBTT and Wales
            charges LTT instead, with different bands.
          </p>
        </div>
      ) : (
        !hasBadPrice && (
          <div className="mt-7">
            <EmptyState
              title="Enter a purchase price to see the stamp duty"
              body="Pick whether all buyers are first time buyers, and the total SDLT, the effective rate and the band by band breakdown appear straight away."
            />
          </div>
        )
      )}
    </div>
  );
}
