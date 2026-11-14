/**
 * Square root calculator logic, pure and framework free.
 *
 * For whole numbers the root is also given in simplified radical form:
 * the number is split into prime factors, each pair of equal factors
 * comes out of the root as a single factor, and any factor without a
 * partner stays inside. So 72 = 2 x 2 x 2 x 3 x 3 gives a coefficient
 * of 2 x 3 = 6 and a radicand of 2, written as 6 sqrt(2).
 */

export interface SimplifiedRadical {
  /** The factor that sits outside the root sign. */
  coefficient: number;
  /** The factor that stays inside the root sign. */
  radicand: number;
}

export interface PerfectSquareNeighbour {
  value: number;
  root: number;
}

export interface SquareRootResult {
  value: number;
  root: number;
  isPerfectSquare: boolean;
  simplified: SimplifiedRadical;
  /** Nearest perfect square below, only for non perfect whole numbers. */
  nearestBelow: PerfectSquareNeighbour | null;
  /** Nearest perfect square above, only for non perfect whole numbers. */
  nearestAbove: PerfectSquareNeighbour | null;
  steps: string[];
}

/** Prime factorisation steps are only built for whole numbers up to this size. */
export const MAX_FACTORISATION_INPUT = 1_000_000_000;

function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

/** Returns the prime factors of a positive whole number, in order. */
export function primeFactorisation(n: number): number[] {
  if (!Number.isFinite(n) || !isInteger(n) || n < 1) {
    throw new RangeError("Prime factorisation needs a whole number of 1 or more.");
  }
  const factors: number[] = [];
  let remaining = n;
  for (let p = 2; p * p <= remaining; p += p === 2 ? 1 : 2) {
    while (remaining % p === 0) {
      factors.push(p);
      remaining /= p;
    }
  }
  if (remaining > 1) factors.push(remaining);
  return factors;
}

function simplifiedFromFactors(factors: number[]): SimplifiedRadical {
  const counts = new Map<number, number>();
  for (const factor of factors) counts.set(factor, (counts.get(factor) ?? 0) + 1);
  let coefficient = 1;
  let radicand = 1;
  for (const [prime, count] of counts) {
    coefficient *= prime ** Math.floor(count / 2);
    if (count % 2 === 1) radicand *= prime;
  }
  return { coefficient, radicand };
}

function buildSteps(value: number, simplified: SimplifiedRadical): string[] {
  if (!isInteger(value) || value > MAX_FACTORISATION_INPUT) {
    return [
      `The square root is the number that multiplies by itself to give ${value}.`,
      `Square root of ${value} is approximately ${Math.sqrt(value)}.`,
    ];
  }
  if (value === 0) return ["The square root of 0 is 0, because 0 multiplied by itself is 0."];
  if (value === 1) return ["The square root of 1 is 1, because 1 multiplied by itself is 1."];

  const factors = primeFactorisation(value);
  const factorText = factors.join(" x ");
  const steps: string[] = [`${value} = ${factorText}`];

  const pairs: string[] = [];
  const outside: number[] = [];
  const leftover: number[] = [];
  for (let i = 0; i < factors.length; ) {
    let j = i;
    while (j < factors.length && factors[j] === factors[i]) j += 1;
    const count = j - i;
    for (let p = 0; p < Math.floor(count / 2); p += 1) {
      pairs.push(`(${factors[i]} x ${factors[i]})`);
      outside.push(factors[i]);
    }
    if (count % 2 === 1) leftover.push(factors[i]);
    i = j;
  }

  if (pairs.length > 0 && leftover.length > 0) {
    const pairList = pairs.length === 1 ? pairs[0] : `${pairs.slice(0, -1).join(", ")} and ${pairs[pairs.length - 1]}`;
    const leftoverText =
      leftover.length === 1 ? `one ${leftover[0]} stays` : `${leftover.join(" and ")} stay`;
    steps.push(`Pair the factors: ${pairList} come out, ${leftoverText} inside`);
  } else if (pairs.length > 0) {
    const pairList = pairs.length === 1 ? pairs[0] : `${pairs.slice(0, -1).join(", ")} and ${pairs[pairs.length - 1]}`;
    steps.push(`Pair the factors: ${pairList} come out, nothing stays inside`);
  } else {
    steps.push(`No pair can be formed, so ${value} stays inside the root`);
  }

  const { coefficient, radicand } = simplified;
  if (radicand === 1) {
    steps.push(
      outside.length > 1
        ? `Root = ${outside.join(" x ")} = ${coefficient}`
        : `Root = ${coefficient}`,
    );
  } else if (coefficient === 1) {
    steps.push(`Root = sqrt(${radicand})`);
  } else {
    steps.push(
      `Root = ${outside.join(" x ")} x sqrt(${radicand}) = ${coefficient} sqrt(${radicand})`,
    );
  }
  return steps;
}

export function calculateSquareRoot(value: number): SquareRootResult {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError("Enter a number that is zero or greater. Negative numbers have no real square root.");
  }
  const root = Math.sqrt(value);
  const whole = isInteger(value);
  const isPerfectSquare = whole && Number.isInteger(root);

  let simplified: SimplifiedRadical;
  if (value === 0) {
    simplified = { coefficient: 0, radicand: 0 };
  } else if (whole) {
    simplified = simplifiedFromFactors(primeFactorisation(value));
  } else {
    simplified = { coefficient: 1, radicand: value };
  }

  let nearestBelow: PerfectSquareNeighbour | null = null;
  let nearestAbove: PerfectSquareNeighbour | null = null;
  if (whole && !isPerfectSquare && value > 0) {
    const belowRoot = Math.floor(root);
    const aboveRoot = belowRoot + 1;
    nearestBelow = { value: belowRoot * belowRoot, root: belowRoot };
    nearestAbove = { value: aboveRoot * aboveRoot, root: aboveRoot };
  }

  return {
    value,
    root,
    isPerfectSquare,
    simplified,
    nearestBelow,
    nearestAbove,
    steps: buildSteps(value, simplified),
  };
}
