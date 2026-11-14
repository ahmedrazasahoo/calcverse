"use client";

import { useMemo, useState } from "react";
import { Field, ResultCard, fmt, inputClass } from "@/components/ui";
import { calculateLove } from "./love";

export default function LoveCalculator() {
  const [name1, setName1] = useState("Alex");
  const [name2, setName2] = useState("Jordan");
  const [birthDate1, setBirthDate1] = useState("");
  const [birthDate2, setBirthDate2] = useState("");

  const result = useMemo(() => {
    try {
      return calculateLove({ name1, name2, birthDate1, birthDate2 });
    } catch {
      return null;
    }
  }, [name1, name2, birthDate1, birthDate2]);

  const sharedLine = result
    ? result.sharedLetters > 0
      ? `Your names share ${fmt(result.sharedLetters)} letter${result.sharedLetters === 1 ? "" : "s"}: ${result.sharedLetterList.join(", ")}.`
      : "Your names do not share a single letter, which is rarer than it sounds."
    : "";

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="lv-name1">
          <input id="lv-name1" className={inputClass} value={name1} onChange={(e) => setName1(e.target.value)} placeholder="Enter a name" />
        </Field>
        <Field label="Second name" htmlFor="lv-name2">
          <input id="lv-name2" className={inputClass} value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Enter another name" />
        </Field>
        <Field label="First birth date (optional)" htmlFor="lv-dob1" hint="Add both birth dates and they become part of the playful maths too.">
          <input id="lv-dob1" type="date" className={inputClass} value={birthDate1} onChange={(e) => setBirthDate1(e.target.value)} />
        </Field>
        <Field label="Second birth date (optional)" htmlFor="lv-dob2">
          <input id="lv-dob2" type="date" className={inputClass} value={birthDate2} onChange={(e) => setBirthDate2(e.target.value)} />
        </Field>
      </div>

      {result ? (
        <div className="mt-6" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ResultCard
              primary
              label="Love score"
              value={`${fmt(result.score)}%`}
              sub="A bit of fun maths. Real love is not measured in percent."
            />
            <ResultCard label="Verdict" value={result.verdict} sub={result.verdictLine} />
            <ResultCard label="Shared letters" value={fmt(result.sharedLetters)} sub={sharedLine} />
          </div>
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
            For entertainment only. The same two names always give the same score, whichever order you type them in, and the number says nothing real about a relationship.
          </p>
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
          Enter two names with at least one letter each to see your playful score.
        </p>
      )}
    </div>
  );
}
