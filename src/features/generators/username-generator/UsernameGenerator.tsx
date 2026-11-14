"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, inputClass, primaryButtonClass, Select } from "@/components/ui";
import {
  generateUsernames,
  separatorAllowed,
  type Capitalisation,
  type NumberStyle,
  type Separator,
  type UsernameOptions,
  type UsernameStyle,
} from "./username";

const STYLE_OPTIONS: { value: UsernameStyle; label: string }[] = [
  { value: "gamer", label: "Gamer" },
  { value: "aesthetic", label: "Aesthetic" },
  { value: "professional", label: "Professional" },
  { value: "funny", label: "Funny" },
  { value: "nature", label: "Nature" },
  { value: "tech", label: "Tech" },
];

export default function UsernameGenerator() {
  const [style, setStyle] = useState<UsernameStyle>("gamer");
  const [themeWord, setThemeWord] = useState("");
  const [separator, setSeparator] = useState<Separator>("underscore");
  const [capitalisation, setCapitalisation] = useState<Capitalisation>("lower");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [numberStyle, setNumberStyle] = useState<NumberStyle>("two-digit");
  const [round, setRound] = useState(0);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const options: UsernameOptions = useMemo(
    () => ({ style, themeWord, separator, capitalisation, includeNumbers, numberStyle }),
    [style, themeWord, separator, capitalisation, includeNumbers, numberStyle]
  );

  // Regenerate only when the button is pressed or the options change, so a
  // list stays still while the user reads and copies from it. The round
  // counter is the deliberate refresh trigger. Generation happens in an
  // effect, never during render: random names rendered on the server can
  // never match the ones the client would generate, which fails hydration.
  const [names, setNames] = useState<string[]>([]);
  useEffect(() => {
    setNames(generateUsernames(options));
  }, [options, round]);

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
    } catch {
      setCopiedName(null);
    }
  };

  const allSeparatorOptions: { value: Separator; label: string }[] = [
    { value: "none", label: "None (joined)" },
    { value: "underscore", label: "Underscore ( _ )" },
    { value: "dot", label: "Dot ( . )" },
    { value: "dash", label: "Dash ( - )" },
  ];
  const separatorOptions = allSeparatorOptions.filter((option) => separatorAllowed(style, option.value));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Style" htmlFor="username-style">
          <Select
            id="username-style"
            value={style}
            onChange={(e) => setStyle(e.target.value as UsernameStyle)}
          >
            {STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Theme word (optional)" htmlFor="username-theme" hint="One word that matters to you: a hobby, a pet, your band. It replaces the second word in about half the suggestions.">
          <input
            id="username-theme"
            type="text"
            value={themeWord}
            maxLength={20}
            onChange={(e) => setThemeWord(e.target.value)}
            placeholder="e.g. falcon"
            className={inputClass}
          />
        </Field>
        <Field label="Separator" htmlFor="username-separator" hint={style === "professional" ? "Dash is hidden for the professional style, where it reads too casual." : undefined}>
          <Select
            id="username-separator"
            value={separatorAllowed(style, separator) ? separator : "underscore"}
            onChange={(e) => setSeparator(e.target.value as Separator)}
          >
            {separatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Capitalisation" htmlFor="username-capitalisation" hint="camelCase joins the words, so the separator is not used with it.">
          <Select
            id="username-capitalisation"
            value={capitalisation}
            onChange={(e) => setCapitalisation(e.target.value as Capitalisation)}
          >
            <option value="lower">all lowercase</option>
            <option value="capitalised">Capitalised Words</option>
            <option value="camel">camelCase</option>
          </Select>
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="h-4 w-4 accent-brand-600"
          />
          Add numbers at the end
        </label>
        {includeNumbers && (
          <Field label="Number style" htmlFor="username-number-style">
            <Select
              id="username-number-style"
              value={numberStyle}
              onChange={(e) => setNumberStyle(e.target.value as NumberStyle)}
            >
              <option value="year">Short year (90 to 26)</option>
              <option value="two-digit">Random two digits</option>
            </Select>
          </Field>
        )}
      </div>

      <button type="button" onClick={() => setRound((r) => r + 1)} className={primaryButtonClass}>
        Generate 12 fresh usernames
      </button>

      <ul className="grid gap-3 sm:grid-cols-2">
        {names.map((name) => (
          <li key={name} className="glass flex items-center gap-3 rounded-[1.5rem] px-5 py-3.5">
            <span className="min-w-0 flex-1 truncate font-mono text-base text-gray-900">{name}</span>
            <button
              type="button"
              onClick={() => copy(name)}
              className="min-h-11 shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-900/5 transition duration-200 hover:bg-white focus:ring-4 focus:ring-brand-500/20 focus:outline-none active:scale-[0.99]"
            >
              {copiedName === name ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
      </ul>

      <p className="rounded-3xl bg-amber-50/70 px-5 py-3.5 text-sm leading-relaxed font-medium text-amber-900 ring-1 ring-amber-200/80">
        Please note: this generator does not check whether a name is available on Instagram, TikTok, YouTube, Xbox or
        any other platform. A suggestion here can already be taken elsewhere. Always check the name inside the app or
        site where you plan to use it before you commit to it.
      </p>
    </div>
  );
}
