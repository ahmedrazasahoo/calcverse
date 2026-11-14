"use client";

import { useEffect, useRef, useState } from "react";
import {
  ErrorNote,
  Field,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui";
import { buildSchedule, morseToText, textToMorse } from "./morse";

const textareaClass =
  "w-full rounded-3xl border border-white/80 bg-white/70 px-5 py-4 text-base leading-relaxed text-gray-900 shadow-sm backdrop-blur outline-none transition duration-200 placeholder:text-gray-400 hover:bg-white/90 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-500/15";

export default function MorseCodeTranslator() {
  const [text, setText] = useState("SOS");
  const [morse, setMorse] = useState("... --- ...");
  const [wpm, setWpm] = useState(20);
  const [playing, setPlaying] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);
  const runRef = useRef(0);

  const stop = () => {
    runRef.current += 1;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    if (audioRef.current) {
      try {
        audioRef.current.gain.gain.value = 0;
        audioRef.current.osc.stop();
        void audioRef.current.ctx.close();
      } catch {
        // already stopped
      }
      audioRef.current = null;
    }
    setLightOn(false);
    setPlaying(false);
  };

  useEffect(() => {
    return () => {
      runRef.current += 1;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioRef.current) void audioRef.current.ctx.close().catch(() => undefined);
    };
  }, []);

  const play = () => {
    const schedule = buildSchedule(morse, wpm);
    if (schedule.length === 0) {
      setError("Nothing to play yet. Type some text or Morse first.");
      return;
    }
    setError(null);
    stop();
    const run = runRef.current;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 600;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    audioRef.current = { ctx, osc, gain };
    setPlaying(true);

    let index = 0;
    const step = () => {
      if (runRef.current !== run) return;
      if (index >= schedule.length) {
        stop();
        return;
      }
      const segment = schedule[index];
      index += 1;
      if (audioRef.current) audioRef.current.gain.gain.value = segment.on ? 0.12 : 0;
      setLightOn(segment.on);
      timeoutRef.current = setTimeout(step, segment.ms);
    };
    step();
  };

  const onTextChange = (value: string) => {
    setText(value);
    setMorse(textToMorse(value));
  };

  const onMorseChange = (value: string) => {
    setMorse(value);
    setText(morseToText(value));
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Text" htmlFor="morse-text">
          <textarea
            id="morse-text"
            className={textareaClass}
            rows={5}
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type text to translate into Morse."
          />
        </Field>
        <Field label="Morse code" htmlFor="morse-code" hint="Letters separated by spaces, words by a slash, like ... --- ...">
          <textarea
            id="morse-code"
            className={`${textareaClass} font-mono`}
            rows={5}
            value={morse}
            onChange={(e) => onMorseChange(e.target.value)}
            placeholder="Type Morse to translate back into text."
            spellCheck={false}
          />
        </Field>
      </div>

      <Field label={`Playback speed: ${wpm} words per minute`} htmlFor="morse-wpm">
        <input
          id="morse-wpm"
          type="range"
          min={5}
          max={40}
          step={1}
          className="min-h-12 w-full accent-brand-600 sm:max-w-sm"
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
        />
      </Field>

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="flex flex-wrap items-center gap-4">
        {playing ? (
          <button type="button" className={primaryButtonClass} onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="button" className={primaryButtonClass} onClick={play}>
            Play Morse
          </button>
        )}
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => {
            onTextChange("");
          }}
        >
          Clear
        </button>
        <span className="flex items-center gap-2.5 text-sm font-medium text-gray-600">
          <span
            aria-hidden="true"
            className={`inline-block h-6 w-6 rounded-full ring-2 ring-gray-300 transition-colors duration-75 ${
              lightOn ? "bg-amber-400 ring-amber-300" : "bg-gray-200"
            }`}
          />
          Signal light
        </span>
      </div>
    </div>
  );
}
