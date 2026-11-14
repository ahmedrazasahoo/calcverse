/**
 * Percentage increase logic, pure and framework free.
 *
 * Two jobs live here: measuring the change between an old value and a new
 * value, and growing a single value by a chosen percent.
 */

export interface IncreaseBetweenResult {
  /** Signed gap between the values: newValue minus oldValue. */
  difference: number;
  /**
   * Signed percentage change. The base is the absolute value of the old
   * value, which is the common calculator convention, so a move from a
   * negative starting point is still measured against its size.
   */
  percentChange: number;
  /** True when the new value is the same as or larger than the old value. */
  isIncrease: boolean;
}

export interface ApplyIncreaseResult {
  /** The value after the increase has been applied. */
  increasedValue: number;
  /** How much was added on top of the starting value. */
  addedAmount: number;
}

export function increaseBetween(oldValue: number, newValue: number): IncreaseBetweenResult {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue)) {
    throw new RangeError("Both values must be finite numbers.");
  }
  if (oldValue === 0) {
    throw new RangeError("Percentage change is undefined when the old value is 0.");
  }
  const difference = newValue - oldValue;
  // Percent change uses the absolute base: difference / |oldValue| * 100.
  const percentChange = (difference / Math.abs(oldValue)) * 100;
  return {
    difference,
    percentChange,
    isIncrease: newValue >= oldValue,
  };
}

export function applyIncrease(value: number, percent: number): ApplyIncreaseResult {
  if (!Number.isFinite(value)) {
    throw new RangeError("Value must be a finite number.");
  }
  if (!Number.isFinite(percent) || percent < 0) {
    throw new RangeError("Percent must be zero or greater for an increase.");
  }
  const increasedValue = value * (1 + percent / 100);
  return {
    increasedValue,
    addedAmount: increasedValue - value,
  };
}
