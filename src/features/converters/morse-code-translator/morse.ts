/** Pure Morse code translation and playback timing helpers. */

export const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", $: "...-..-", "@": ".--.-.",
};

const REVERSE_MAP: Record<string, string> = {};
for (const [ch, code] of Object.entries(MORSE_MAP)) REVERSE_MAP[code] = ch;

/**
 * Convert text to Morse. Letters are separated by one space, words by " / ".
 * Characters with no Morse code are skipped.
 */
export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) =>
      [...word]
        .map((ch) => MORSE_MAP[ch])
        .filter((code): code is string => code !== undefined)
        .join(" "),
    )
    .filter((word) => word.length > 0)
    .join(" / ");
}

/**
 * Convert Morse back to text. Letters are separated by spaces and words by
 * a slash. Unknown codes decode to a question mark so nothing is lost silently.
 */
export function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s*\/\s*/)
    .filter((word) => word.length > 0)
    .map((word) =>
      word
        .split(/\s+/)
        .filter((code) => code.length > 0)
        .map((code) => REVERSE_MAP[code] ?? "?")
        .join(""),
    )
    .join(" ");
}

export interface ScheduleSegment {
  on: boolean;
  ms: number;
}

/**
 * Build the on/off timing schedule for a Morse string at the given speed.
 * One dit is 1200 / wpm milliseconds. A dah is 3 dits, the gap inside a
 * letter is 1 dit, the gap between letters is 3 dits and between words 7.
 * Adjacent segments in the same state are merged.
 */
export function buildSchedule(morse: string, wpm: number): ScheduleSegment[] {
  const dit = 1200 / Math.max(1, wpm);
  const raw: ScheduleSegment[] = [];
  const push = (on: boolean, ms: number) => {
    const last = raw[raw.length - 1];
    if (last && last.on === on) last.ms += ms;
    else raw.push({ on, ms });
  };

  const words = morse.trim().split(/\s*\/\s*/).filter((w) => w.length > 0);
  words.forEach((word, wi) => {
    if (wi > 0) push(false, 7 * dit);
    const letters = word.split(/\s+/).filter((l) => l.length > 0);
    letters.forEach((letter, li) => {
      if (li > 0) push(false, 3 * dit);
      [...letter].forEach((symbol, si) => {
        if (si > 0) push(false, 1 * dit);
        if (symbol === ".") push(true, dit);
        else if (symbol === "-") push(true, 3 * dit);
      });
    });
  });

  while (raw.length > 0 && !raw[0].on) raw.shift();
  while (raw.length > 0 && !raw[raw.length - 1].on) raw.pop();
  return raw;
}
