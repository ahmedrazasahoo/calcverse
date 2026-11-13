"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Field, ResultCard, fmt, selectClass } from "@/components/ui";
import { PRACTICE_TEXTS } from "./content";
import { TEST_DURATIONS_SECONDS, isComplete, scoreTyping, speedVerdict } from "./typing";

type Status = "idle" | "running" | "done";

const textareaClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-base outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-gray-50";

export default function TypingTest() {
  const [duration, setDuration] = useState<number>(60);
  const [textIndex, setTextIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startAtRef = useRef<number | null>(null);

  const target = PRACTICE_TEXTS[textIndex % PRACTICE_TEXTS.length];
  const timeLeft = Math.max(0, duration - Math.floor(elapsed));

  const score = useMemo(() => {
    if (typed.length === 0 || elapsed <= 0) return null;
    return scoreTyping(target, typed, elapsed);
  }, [target, typed, elapsed]);

  const finish = (finalElapsed: number) => {
    setElapsed(finalElapsed);
    setStatus("done");
    startAtRef.current = null;
  };

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setInterval(() => {
      if (startAtRef.current === null) return;
      const now = (Date.now() - startAtRef.current) / 1000;
      if (now >= duration) {
        finish(duration);
      } else {
        setElapsed(now);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [status, duration]);

  const reset = (nextTextIndex?: number) => {
    if (nextTextIndex !== undefined) setTextIndex(nextTextIndex);
    setTyped("");
    setStatus("idle");
    setElapsed(0);
    startAtRef.current = null;
  };

  const handleChange = (value: string) => {
    if (status === "done") return;
    const capped = value.slice(0, target.length);
    if (status === "idle" && capped.length > 0) {
      startAtRef.current = Date.now();
      setStatus("running");
    }
    setTyped(capped);
    if (startAtRef.current !== null && isComplete(target, capped)) {
      finish((Date.now() - startAtRef.current) / 1000);
    }
  };

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Test length" htmlFor="tt-duration">
          <select
            id="tt-duration"
            className={selectClass}
            value={duration}
            onChange={(e) => {
              setDuration(Number(e.target.value));
              reset();
            }}
          >
            {TEST_DURATIONS_SECONDS.map((seconds) => (
              <option key={seconds} value={seconds}>
                {seconds === 60 ? "1 minute" : `${seconds / 60} minutes`}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex items-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-700"
            onClick={() => reset()}
          >
            Restart
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-700"
            onClick={() => reset(textIndex + 1)}
          >
            New text
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 rounded-xl bg-gray-50 px-4 py-3 text-sm" aria-live="polite">
        <p>
          <span className="font-semibold text-gray-900">{status === "done" ? "0" : timeLeft}s</span>{" "}
          <span className="text-gray-500">left</span>
        </p>
        <p>
          <span className="font-semibold text-gray-900">{score ? fmt(score.netWpm, 0) : "0"}</span>{" "}
          <span className="text-gray-500">net WPM</span>
        </p>
        <p>
          <span className="font-semibold text-gray-900">{score ? `${fmt(score.accuracyPercent, 0)}%` : "100%"}</span>{" "}
          <span className="text-gray-500">accuracy</span>
        </p>
        <p>
          <span className="font-semibold text-gray-900">
            {typed.length} / {target.length}
          </span>{" "}
          <span className="text-gray-500">characters</span>
        </p>
      </div>

      <div
        aria-label="Text to type"
        className="mt-4 rounded-xl border border-gray-200 bg-white px-4 py-4 font-mono text-base leading-relaxed select-none"
      >
        {target.split("").map((char, i) => {
          const typedChar = typed[i];
          let className = "text-gray-400";
          if (typedChar !== undefined) {
            className = typedChar === char ? "text-emerald-600" : "bg-rose-100 text-rose-700";
          } else if (i === typed.length && status !== "done") {
            className = "text-gray-400 underline decoration-brand-500 decoration-2 underline-offset-4";
          }
          return (
            <span key={i} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <div className="mt-4">
        <label htmlFor="tt-input" className="mb-1.5 block text-sm font-medium text-gray-700">
          Type here. The clock starts on your first keystroke.
        </label>
        <textarea
          id="tt-input"
          rows={3}
          className={textareaClass}
          value={typed}
          disabled={status === "done"}
          onChange={(e) => handleChange(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          placeholder={status === "done" ? "Test finished. Restart or pick a new text to go again." : "Start typing the text above..."}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {status === "done" && score && (
        <div className="mt-7" aria-live="polite">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard label="Net speed" value={`${fmt(score.netWpm, 0)} WPM`} sub="Correct characters only, the honest figure" />
            <ResultCard label="Gross speed" value={`${fmt(score.grossWpm, 0)} WPM`} sub="Every character, mistakes included" />
            <ResultCard label="Accuracy" value={`${fmt(score.accuracyPercent, 1)}%`} sub={`${score.correctChars} right, ${score.incorrectChars} wrong`} />
            <ResultCard label="Time taken" value={`${fmt(score.elapsedSeconds, 0)} seconds`} sub={isComplete(target, typed) ? "Finished the text early" : "Full test length"} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{speedVerdict(score.netWpm)}</p>
        </div>
      )}
    </div>
  );
}
