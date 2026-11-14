"use client";

import { useState } from "react";
import { ErrorNote, Field, primaryButtonClass, secondaryButtonClass, Select, selectClass } from "@/components/ui";
import { formatJson, jsonToCsv, jsonToXml, minifyJson, validateJson, type JsonIndent } from "./json";

const textareaClass =
  "w-full rounded-3xl border border-white/80 bg-white/70 px-5 py-4 font-mono text-sm leading-relaxed text-gray-900 shadow-sm backdrop-blur outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15";

type Mode = "format" | "minify" | "csv" | "xml";

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"CalcVerse","tools":["json","csv"],"nested":{"ok":true}}');
  const [indent, setIndent] = useState<JsonIndent>(2);
  const [rootName, setRootName] = useState("root");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = (mode: Mode) => {
    setError(null);
    setNotice(null);
    setCopied(false);
    try {
      if (mode === "format") setOutput(formatJson(input, indent));
      else if (mode === "minify") setOutput(minifyJson(input));
      else if (mode === "csv") setOutput(jsonToCsv(JSON.parse(input) as unknown));
      else setOutput(jsonToXml(JSON.parse(input) as unknown, rootName));
    } catch (err) {
      setOutput("");
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const validate = () => {
    setError(null);
    setCopied(false);
    const result = validateJson(input);
    if (result.ok) {
      setNotice("Valid JSON. It parses cleanly with no errors.");
    } else {
      const where = result.position !== undefined ? ` (near character ${result.position})` : "";
      setError(`Invalid JSON: ${result.error ?? "unknown parse error"}${where}`);
      setNotice(null);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "json-output.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <Field label="JSON input" htmlFor="json-input">
        <textarea
          id="json-input"
          className={textareaClass}
          rows={9}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste JSON here, for example {"a": 1}'
          spellCheck={false}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Indent for formatting" htmlFor="json-indent">
          <Select
            id="json-indent"
            value={indent === "tab" ? "tab" : String(indent)}
            onChange={(e) => {
              const v = e.target.value;
              setIndent(v === "tab" ? "tab" : (Number(v) as JsonIndent));
            }}
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="tab">Tab</option>
          </Select>
        </Field>
        <Field label="XML root element name" htmlFor="json-xml-root" hint="Used only by JSON to XML. Attributes are not supported, every value becomes an element.">
          <input
            id="json-xml-root"
            className={`${selectClass} font-mono`}
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={primaryButtonClass} onClick={() => run("format")}>
          Format
        </button>
        <button type="button" className={secondaryButtonClass} onClick={() => run("minify")}>
          Minify
        </button>
        <button type="button" className={secondaryButtonClass} onClick={validate}>
          Validate
        </button>
        <button type="button" className={secondaryButtonClass} onClick={() => run("csv")}>
          JSON to CSV
        </button>
        <button type="button" className={secondaryButtonClass} onClick={() => run("xml")}>
          JSON to XML
        </button>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}
      {notice && (
        <p className="rounded-3xl bg-emerald-50/70 px-5 py-3.5 text-sm leading-relaxed font-medium text-emerald-800 ring-1 ring-emerald-200/80 backdrop-blur">
          {notice}
        </p>
      )}

      <Field label="Output" htmlFor="json-output">
        <textarea
          id="json-output"
          className={`${textareaClass} bg-gray-50`}
          rows={9}
          value={output}
          readOnly
          placeholder="Formatted, minified, CSV or XML output appears here."
          spellCheck={false}
        />
      </Field>

      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={secondaryButtonClass} onClick={copy} disabled={!output}>
          {copied ? "Copied" : "Copy output"}
        </button>
        <button type="button" className={secondaryButtonClass} onClick={download} disabled={!output}>
          Download output
        </button>
      </div>
    </div>
  );
}
