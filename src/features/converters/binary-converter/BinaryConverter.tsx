"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, inputClass, Select } from "@/components/ui";
import { binaryToText, convertInteger, textToBinary, type NumberBase } from "./binary";

const textareaClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function BinaryConverter() {
  const [mode, setMode] = useState("numbers");
  const [value, setValue] = useState("1010");
  const [fromBase, setFromBase] = useState<NumberBase>(2);
  const [plainText, setPlainText] = useState("Hello");
  const [binaryText, setBinaryText] = useState("01001000 01101001");

  const numbers = useMemo(() => (mode === "numbers" ? convertInteger(value, fromBase) : null), [mode, value, fromBase]);

  const encoded = useMemo(() => (mode === "text" ? textToBinary(plainText) : ""), [mode, plainText]);
  const decoded = useMemo(() => (mode === "text" ? binaryToText(binaryText) : null), [mode, binaryText]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Converter" htmlFor="bn-mode">
          <Select id="bn-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="numbers">Number bases (binary, decimal, hex, octal)</option>
            <option value="text">Text to binary and back</option>
          </Select>
        </Field>
        {mode === "numbers" && (
          <Field label="The number is written in" htmlFor="bn-base">
            <Select id="bn-base" value={fromBase} onChange={(e) => setFromBase(Number(e.target.value) as NumberBase)}>
              <option value={2}>Binary (base 2)</option>
              <option value={10}>Decimal (base 10)</option>
              <option value={16}>Hexadecimal (base 16)</option>
              <option value={8}>Octal (base 8)</option>
            </Select>
          </Field>
        )}
      </div>

      {mode === "numbers" ? (
        <>
          <div className="mt-5">
            <Field label="Value" htmlFor="bn-value" hint="Whole numbers only, and very long binary strings are fine: the conversion is exact, with no floating point rounding.">
              <input id="bn-value" type="text" inputMode="text" className={`${inputClass} font-mono`} value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 1010" />
            </Field>
          </div>
          {numbers ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
              <ResultCard label="Binary" value={numbers.binary} sub={`Base 2, ${numbers.bitLength} bit${numbers.bitLength === 1 ? "" : "s"}`} />
              <ResultCard label="Decimal" value={numbers.decimal} sub="Base 10, everyday counting" />
              <ResultCard label="Hexadecimal" value={numbers.hexadecimal} sub="Base 16, used in code and colours" />
              <ResultCard label="Octal" value={numbers.octal} sub="Base 8, used in file permissions" />
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">
              That value does not fit the base you picked. Binary uses only 0 and 1, octal uses 0 to 7, and hexadecimal
              uses 0 to 9 plus A to F.
            </p>
          )}
        </>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2" aria-live="polite">
          <div>
            <Field label="Plain text" htmlFor="bn-text">
              <textarea id="bn-text" rows={4} className={textareaClass} value={plainText} onChange={(e) => setPlainText(e.target.value)} />
            </Field>
            <p className="mt-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">As binary (UTF-8 bytes)</p>
            <p className="mt-1 rounded-lg bg-gray-50 px-3.5 py-2.5 font-mono text-sm break-all text-gray-800">{encoded || "Nothing to encode yet."}</p>
          </div>
          <div>
            <Field label="Binary to decode" htmlFor="bn-binary" hint="Eight bit groups, with or without spaces between them.">
              <textarea id="bn-binary" rows={4} className={textareaClass} value={binaryText} onChange={(e) => setBinaryText(e.target.value)} />
            </Field>
            <p className="mt-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">Decoded text</p>
            <p className="mt-1 rounded-lg bg-gray-50 px-3.5 py-2.5 text-sm break-all text-gray-800">
              {decoded === null ? "That binary does not decode to valid text. Check each group is eight bits of 0s and 1s." : decoded === "" ? "Nothing decoded yet." : decoded}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
