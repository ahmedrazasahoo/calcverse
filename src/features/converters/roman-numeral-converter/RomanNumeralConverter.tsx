"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, parseNum, selectClass } from "@/components/ui";
import { fromRoman, romanDate, toRoman } from "./roman";

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState("toRoman");
  const [number, setNumber] = useState("2026");
  const [numeral, setNumeral] = useState("MMXXVI");
  const [date, setDate] = useState("2026-11-13");

  const numberResult = useMemo(() => {
    if (mode !== "toRoman") return null;
    const parsed = parseNum(number);
    if (parsed === null) return null;
    return toRoman(parsed);
  }, [mode, number]);

  const numeralResult = useMemo(() => {
    if (mode !== "fromRoman") return null;
    return fromRoman(numeral);
  }, [mode, numeral]);

  const dateResult = useMemo(() => (mode === "date" ? romanDate(date) : null), [mode, date]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Conversion" htmlFor="rn-mode">
          <select id="rn-mode" className={selectClass} value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="toRoman">Number to Roman numeral</option>
            <option value="fromRoman">Roman numeral to number</option>
            <option value="date">Date to Roman numerals</option>
          </select>
        </Field>
        {mode === "toRoman" && (
          <Field label="Number (1 to 3999)" htmlFor="rn-number">
            <input id="rn-number" type="number" min="1" max="3999" className={inputClass} value={number} onChange={(e) => setNumber(e.target.value)} />
          </Field>
        )}
        {mode === "fromRoman" && (
          <Field label="Roman numeral" htmlFor="rn-numeral" hint="Standard form only, so IV is accepted and IIII is not.">
            <input id="rn-numeral" type="text" className={`${inputClass} uppercase`} value={numeral} onChange={(e) => setNumeral(e.target.value)} placeholder="e.g. MCMXCIV" />
          </Field>
        )}
        {mode === "date" && (
          <Field label="Date" htmlFor="rn-date" hint="A favourite format for tattoos, rings and anniversary gifts.">
            <input id="rn-date" type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
        )}
      </div>

      <div className="mt-7" aria-live="polite">
        {mode === "toRoman" &&
          (numberResult ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Roman numeral" value={numberResult} sub={`For the number ${number}`} />
              <ResultCard label="Reading it back" value={String(fromRoman(numberResult) ?? "")} sub="Proof the conversion round trips cleanly" />
            </div>
          ) : (
            <p className="text-sm text-gray-500">Enter a whole number between 1 and 3999. Roman numerals have no zero and no standard form above 3999.</p>
          ))}
        {mode === "fromRoman" &&
          (numeralResult !== null ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Number" value={String(numeralResult)} sub={`For the numeral ${numeral.trim().toUpperCase()}`} />
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              That is not a standard Roman numeral. Check for repeated fives (VV, LL, DD), four in a row of the same
              letter, or subtractive pairs like IC that the standard form does not allow.
            </p>
          ))}
        {mode === "date" &&
          (dateResult ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard label="Your date in Roman numerals" value={dateResult.combined} sub="Day, month and year joined with dots" />
              <ResultCard label="The parts" value={`${dateResult.day} · ${dateResult.month} · ${dateResult.year}`} sub="Day · month · year, if you prefer spaces or lines" />
            </div>
          ) : (
            <p className="text-sm text-gray-500">Pick a valid date with a year of 3999 or earlier.</p>
          ))}
      </div>
    </div>
  );
}
