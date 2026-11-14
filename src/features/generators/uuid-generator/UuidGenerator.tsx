"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Field,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from "@/components/ui";
import { uuidV4, uuidV7 } from "./uuid";

type Version = "v4" | "v7";

function generateOne(version: Version): string {
  if (version === "v4" && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return version === "v4" ? uuidV4(bytes) : uuidV7(Date.now(), bytes);
}

function decorate(id: string, uppercase: boolean, hyphens: boolean): string {
  let out = hyphens ? id : id.replace(/-/g, "");
  if (uppercase) out = out.toUpperCase();
  return out;
}

export default function UuidGenerator() {
  const [version, setVersion] = useState<Version>("v4");
  const [quantity, setQuantity] = useState("10");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [ids, setIds] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = useCallback(() => {
    const count = Math.min(100, Math.max(1, Math.trunc(Number(quantity) || 1)));
    const fresh: string[] = [];
    for (let i = 0; i < count; i++) fresh.push(decorate(generateOne(version), uppercase, hyphens));
    setIds(fresh);
    setCopied(null);
  }, [version, quantity, uppercase, hyphens]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyOne = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
    } catch {
      setCopied(null);
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(ids.join("\n"));
      setCopied("all");
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Version" htmlFor="uuid-version" hint="v4 is fully random. v7 starts with the current time, so IDs sort in creation order.">
          <select
            id="uuid-version"
            className={selectClass}
            value={version}
            onChange={(e) => setVersion(e.target.value as Version)}
          >
            <option value="v4">Version 4 (random)</option>
            <option value="v7">Version 7 (time ordered)</option>
          </select>
        </Field>
        <Field label="How many (1 to 100)" htmlFor="uuid-qty">
          <input
            id="uuid-qty"
            type="number"
            min={1}
            max={100}
            className={inputClass}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6 px-1">
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-5 w-5 accent-brand-600"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          Uppercase
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-5 w-5 accent-brand-600"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
          />
          Hyphens
        </label>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={primaryButtonClass} onClick={generate}>
          Generate fresh UUIDs
        </button>
        <button type="button" className={secondaryButtonClass} onClick={copyAll} disabled={ids.length === 0}>
          {copied === "all" ? "Copied all" : "Copy all"}
        </button>
      </div>

      <ul className="space-y-2">
        {ids.map((id, i) => (
          <li
            key={`${id}-${i}`}
            className="glass flex items-center justify-between gap-3 rounded-full px-5 py-2.5"
          >
            <span className="min-w-0 truncate font-mono text-sm text-gray-900 sm:text-base">{id}</span>
            <button
              type="button"
              className="shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-900"
              onClick={() => copyOne(id)}
            >
              {copied === id ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
