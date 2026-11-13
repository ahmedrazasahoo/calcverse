"use client";

import { useCallback, useState } from "react";
import { estimateStrength, generatePassword, MAX_LENGTH, MIN_LENGTH, type PasswordOptions } from "./password";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [families, setFamilies] = useState({ lowercase: true, uppercase: true, digits: true, symbols: false });
  const [password, setPassword] = useState(() =>
    generatePassword({ length: 16, lowercase: true, uppercase: true, digits: true, symbols: false })
  );
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(
    (nextLength: number, nextFamilies: typeof families) => {
      const options: PasswordOptions = { length: nextLength, ...nextFamilies };
      setPassword(generatePassword(options));
      setCopied(false);
    },
    []
  );

  const changeLength = (value: number) => {
    setLength(value);
    regenerate(value, families);
  };

  const changeFamily = (key: keyof typeof families, checked: boolean) => {
    const next = { ...families, [key]: checked };
    setFamilies(next);
    regenerate(length, next);
  };

  const strength = estimateStrength(password);
  const strengthWidth = Math.min(100, strength.bits);
  const strengthColor =
    strength.label === "Weak"
      ? "bg-red-500"
      : strength.label === "Fair"
        ? "bg-amber-500"
        : strength.label === "Strong"
          ? "bg-emerald-500"
          : "bg-emerald-600";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const toggles: { key: keyof typeof families; label: string }[] = [
    { key: "lowercase", label: "Lowercase (a to z)" },
    { key: "uppercase", label: "Uppercase (A to Z)" },
    { key: "digits", label: "Digits (0 to 9)" },
    { key: "symbols", label: "Symbols (! @ # $ ...)" },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-brand-50 px-5 py-4">
        <p className="text-xs font-semibold tracking-wide text-brand-800 uppercase">Your password</p>
        <p className="mt-1 font-mono text-xl font-bold break-all text-gray-900 sm:text-2xl">
          {password || "Turn on at least one character type"}
        </p>
        {password && (
          <>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className={`h-full ${strengthColor}`} style={{ width: `${strengthWidth}%` }} />
            </div>
            <p className="mt-1.5 text-sm text-gray-600">
              Strength: <strong>{strength.label}</strong>, about {strength.bits} bits of entropy
            </p>
          </>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pw-length" className={labelClass}>
            Length: {length} characters
          </label>
          <input
            id="pw-length"
            type="range"
            min={MIN_LENGTH}
            max={64}
            value={length}
            onChange={(e) => changeLength(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
          <p className="mt-1 text-xs text-gray-500">Up to {MAX_LENGTH} characters are supported. Sixteen or more is a good default.</p>
        </div>
        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-gray-700">Characters to include</legend>
          <div className="space-y-2">
            {toggles.map((toggle) => (
              <label key={toggle.key} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={families[toggle.key]}
                  onChange={(e) => changeFamily(toggle.key, e.target.checked)}
                  className="h-4 w-4 accent-brand-600"
                />
                {toggle.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => regenerate(length, families)}
          className="min-h-12 rounded-full bg-gradient-to-b from-white to-brand-50 px-7 py-3 font-semibold text-brand-950 shadow-[0_14px_30px_-12px_rgb(68_33_127/0.35)] ring-1 ring-white/80 backdrop-blur transition duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          Generate new password
        </button>
        <button
          type="button"
          onClick={copy}
          disabled={password === ""}
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-brand-400 disabled:opacity-50"
        >
          {copied ? "Copied" : "Copy password"}
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Passwords are created on your device with its cryptographic random generator. Nothing you generate here is stored,
        logged or sent anywhere.
      </p>
    </div>
  );
}
