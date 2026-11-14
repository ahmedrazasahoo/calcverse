/**
 * Average calculator logic, pure and framework free.
 *
 * The mean is the sum divided by the count. The median is the middle
 * value of the sorted list, or the mean of the two middle values when
 * the count is even. The mode is the value that appears most often,
 * and there is no mode when every value appears exactly once.
 */

export interface AverageStats {
  count: number;
  sum: number;
  mean: number;
  median: number;
  /** Most frequent values, in ascending order. Empty when there is no mode. */
  modes: number[];
  min: number;
  max: number;
  range: number;
  /** A sorted ascending copy of the input. */
  sorted: number[];
}

/**
 * Splits free text into numbers. Commas, spaces, semicolons and line
 * breaks all work as separators, and empty gaps are ignored.
 */
export function parseNumbers(text: string): number[] {
  if (typeof text !== "string") {
    throw new RangeError("Enter your numbers as text first.");
  }
  const tokens = text.split(/[\s,;]+/).filter((token) => token.length > 0);
  if (tokens.length === 0) {
    throw new RangeError("Enter at least one number.");
  }
  const numbers: number[] = [];
  for (const token of tokens) {
    const value = Number(token);
    if (!Number.isFinite(value)) {
      throw new RangeError(`"${token}" is not a number. Remove it and try again.`);
    }
    numbers.push(value);
  }
  return numbers;
}

export function computeStats(numbers: readonly number[]): AverageStats {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new RangeError("Enter at least one number.");
  }
  for (const value of numbers) {
    if (!Number.isFinite(value)) {
      throw new RangeError("Every value must be a valid number.");
    }
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, value) => acc + value, 0);
  const mean = sum / count;

  const mid = Math.floor(count / 2);
  const median = count % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const frequency = new Map<number, number>();
  for (const value of sorted) frequency.set(value, (frequency.get(value) ?? 0) + 1);
  const maxFrequency = Math.max(...frequency.values());
  const modes =
    maxFrequency <= 1
      ? []
      : [...frequency.entries()]
          .filter(([, times]) => times === maxFrequency)
          .map(([value]) => value)
          .sort((a, b) => a - b);

  const min = sorted[0];
  const max = sorted[count - 1];
  return { count, sum, mean, median, modes, min, max, range: max - min, sorted };
}

/** Weighted mean: sum of value times weight, divided by the sum of the weights. */
export function weightedAverage(
  values: readonly number[],
  weights: readonly number[],
): number {
  if (
    !Array.isArray(values) ||
    !Array.isArray(weights) ||
    values.length === 0 ||
    values.length !== weights.length
  ) {
    throw new RangeError("Values and weights must be lists of the same length, with at least one entry.");
  }
  let weightedSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < values.length; i += 1) {
    if (!Number.isFinite(values[i])) {
      throw new RangeError("Every value must be a valid number.");
    }
    if (!Number.isFinite(weights[i]) || weights[i] < 0) {
      throw new RangeError("Every weight must be zero or greater.");
    }
    weightedSum += values[i] * weights[i];
    totalWeight += weights[i];
  }
  if (totalWeight <= 0) {
    throw new RangeError("The weights must add up to more than zero.");
  }
  return weightedSum / totalWeight;
}
