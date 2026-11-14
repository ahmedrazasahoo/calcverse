/**
 * Descriptive statistics logic, pure and framework free.
 *
 * Parses a list of numbers separated by commas, spaces or newlines,
 * reports any tokens that are not numbers, and computes the summary
 * statistics schools ask for: count, sum, mean, median, range, and
 * both the population and sample variance and standard deviation,
 * plus a per value deviation table that shows the working.
 */

export interface ParsedList {
  values: number[];
  invalid: string[];
}

export interface DeviationRow {
  value: number;
  deviation: number;
  squaredDeviation: number;
}

export interface StatsResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
  populationVariance: number;
  populationSd: number;
  /** Null when there is only one value, because dividing by n minus 1 is impossible. */
  sampleVariance: number | null;
  sampleSd: number | null;
  sumOfSquaredDeviations: number;
  rows: DeviationRow[];
}

/** Splits free text into numbers, collecting the tokens that fail to parse. */
export function parseNumberList(raw: string): ParsedList {
  const tokens = raw.split(/[\s,;]+/).filter((t) => t !== "");
  const values: number[] = [];
  const invalid: string[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (Number.isFinite(n)) {
      values.push(n);
    } else {
      invalid.push(token);
    }
  }
  return { values, invalid };
}

/** Median of a list: the middle value, or the mean of the two middle values. */
export function medianOf(values: number[]): number {
  if (values.length === 0) throw new RangeError("Cannot take the median of an empty list.");
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Computes the full statistics summary for a non empty list. */
export function computeStats(values: number[]): StatsResult {
  if (values.length === 0) throw new RangeError("Add at least one number first.");
  const count = values.length;
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;
  const rows: DeviationRow[] = values.map((value) => {
    const deviation = value - mean;
    return { value, deviation, squaredDeviation: deviation * deviation };
  });
  const sumOfSquaredDeviations = rows.reduce((acc, r) => acc + r.squaredDeviation, 0);
  const populationVariance = sumOfSquaredDeviations / count;
  const sampleVariance = count > 1 ? sumOfSquaredDeviations / (count - 1) : null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return {
    count,
    sum,
    mean,
    median: medianOf(values),
    min,
    max,
    range: max - min,
    populationVariance,
    populationSd: Math.sqrt(populationVariance),
    sampleVariance,
    sampleSd: sampleVariance === null ? null : Math.sqrt(sampleVariance),
    sumOfSquaredDeviations,
    rows,
  };
}
