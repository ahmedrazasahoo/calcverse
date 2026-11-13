/**
 * Typing test scoring logic, pure and framework free.
 *
 * Standard scoring: one "word" counts as five characters, including
 * spaces. Gross WPM uses every character typed; net WPM uses only the
 * characters that match the target text position by position, which
 * is the figure employers and typing certificates quote. Accuracy is
 * the share of typed characters that are correct.
 */

export const CHARS_PER_WORD = 5;
export const SECONDS_PER_MINUTE = 60;

/** The two test lengths offered, in seconds. */
export const TEST_DURATIONS_SECONDS: readonly number[] = [60, 300];
export const DEFAULT_DURATION_SECONDS = 60;

export interface TypingScore {
  grossWpm: number;
  netWpm: number;
  accuracyPercent: number;
  correctChars: number;
  incorrectChars: number;
  typedChars: number;
  elapsedSeconds: number;
}

/** Counts characters of typedText that match targetText at the same position. */
export function countCorrectChars(targetText: string, typedText: string): number {
  const limit = Math.min(targetText.length, typedText.length);
  let correct = 0;
  for (let i = 0; i < limit; i += 1) {
    if (typedText[i] === targetText[i]) correct += 1;
  }
  return correct;
}

/**
 * Scores a finished or in progress attempt. Returns null when no time
 * has elapsed yet, because a speed over zero seconds is meaningless.
 */
export function scoreTyping(targetText: string, typedText: string, elapsedSeconds: number): TypingScore | null {
  if (!Number.isFinite(elapsedSeconds) || elapsedSeconds <= 0) return null;
  const typedChars = typedText.length;
  const correctChars = countCorrectChars(targetText, typedText);
  const incorrectChars = typedChars - correctChars;
  const minutes = elapsedSeconds / SECONDS_PER_MINUTE;
  return {
    grossWpm: typedChars / CHARS_PER_WORD / minutes,
    netWpm: correctChars / CHARS_PER_WORD / minutes,
    accuracyPercent: typedChars === 0 ? 0 : (correctChars / typedChars) * 100,
    correctChars,
    incorrectChars,
    typedChars,
    elapsedSeconds,
  };
}

/** True when the typed text has reached the end of the target text. */
export function isComplete(targetText: string, typedText: string): boolean {
  return targetText.length > 0 && typedText.length >= targetText.length;
}

/**
 * A plain language verdict for a net speed, used under the result.
 * Bands follow the ranges quoted in most typing course material:
 * under 20 is slow going, 20 to 39 is around average for the general
 * public, 40 to 59 is a solid office speed, 60 to 79 is fast, and
 * 80 and above is professional typist territory.
 */
export function speedVerdict(netWpm: number): string {
  if (!Number.isFinite(netWpm) || netWpm < 0) return "";
  if (netWpm < 20) return "Keep practicing. Accuracy first, speed follows.";
  if (netWpm < 40) return "Around the average for most computer users.";
  if (netWpm < 60) return "A solid office typing speed.";
  if (netWpm < 80) return "Fast. Quicker than most professionals.";
  return "Exceptional. Professional typist territory.";
}
