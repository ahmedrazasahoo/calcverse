"use client";

import { useMemo, useState } from "react";
import { EmptyState, Field, ResultCard, fmt, fmtMoney, inputClass, parseNum } from "@/components/ui";
import { calculateBoardFoot } from "./boardFoot";

export default function BoardFootCalculator() {
  const [thickness, setThickness] = useState("2");
  const [width, setWidth] = useState("4");
  const [length, setLength] = useState("8");
  const [quantity, setQuantity] = useState("10");
  const [price, setPrice] = useState("6.50");

  const result = useMemo(() => {
    const t = parseNum(thickness); const w = parseNum(width); const l = parseNum(length);
    const q = parseNum(quantity); const p = parseNum(price);
    if (t === null || w === null || l === null || q === null || p === null) return null;
    try {
      return calculateBoardFoot({ thicknessIn: t, widthIn: w, lengthFt: l, quantity: q, pricePerBoardFoot: p });
    } catch {
      return null;
    }
  }, [thickness, width, length, quantity, price]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Thickness (inches)" htmlFor="bf-t" hint="Use decimals for fractions: 3/4 inch is 0.75, 1 1/2 is 1.5. Nominal sizes run smaller than the name suggests, so measure rough lumber as sold.">
          <input id="bf-t" type="number" min="0" step="any" className={inputClass} value={thickness} onChange={(e) => setThickness(e.target.value)} />
        </Field>
        <Field label="Width (inches)" htmlFor="bf-w"><input id="bf-w" type="number" min="0" step="any" className={inputClass} value={width} onChange={(e) => setWidth(e.target.value)} /></Field>
        <Field label="Length (feet)" htmlFor="bf-l"><input id="bf-l" type="number" min="0" step="any" className={inputClass} value={length} onChange={(e) => setLength(e.target.value)} /></Field>
        <Field label="Quantity (boards)" htmlFor="bf-q"><input id="bf-q" type="number" min="1" step="1" className={inputClass} value={quantity} onChange={(e) => setQuantity(e.target.value)} /></Field>
        <Field label="Price per board foot" htmlFor="bf-p" hint="The yard price, in your currency. Leave the maths in board feet either way.">
          <input id="bf-p" type="number" min="0" step="any" className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
      </div>
      {result ? (
        <div className="mt-7" aria-live="polite"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ResultCard label="Total board feet" value={fmt(result.totalBoardFeet, 2)} sub={`${fmt(result.boardFeetPerBoard, 3)} board feet per board`} primary />
          <ResultCard label="Total cost" value={fmtMoney(result.totalCost)} sub={`${fmtMoney(result.costPerBoard)} per board at ${fmtMoney(parseNum(price) ?? 0)} per board foot`} />
          <ResultCard label="Linear feet" value={fmt(result.linearFeet)} sub="Total running length of all boards together" />
        </div></div>
      ) : (
        <div className="mt-7"><EmptyState title="Enter the board sizes" body="Add thickness, width, length, quantity and price to see board feet and total cost." /></div>
      )}
    </div>
  );
}
