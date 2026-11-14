/**
 * Percentage decrease logic, pure and framework free.
 *
 * Two jobs live here: measuring how far a value has fallen from an old
 * value to a new one, and shrinking a single value by a chosen percent.
 */

export interface DecreaseBetweenResult {
  /** How much the value fell by: oldValue minus newValue. Positive when it fell. */
  difference: number;
  /**
   * Percentage drop measured against the absolute value of the old value.
   * Positive when the value fell, negative when it actually rose.
   */
  percentDrop: number;
  /** True when the new value is smaller than the old value. */
  isDecrease: boolean;
}

export interface ApplyDecreaseResult {
  /** The value after the decrease has been applied. */
  reducedValue: number;
  /** How much was taken off the starting value. */
  amountRemoved: number;
}

export function decreaseBetween(oldValue: number, newValue: number): DecreaseBetweenResult {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue)) {
    throw new RangeError("Both values must be finite numbers.");
  }
  if (oldValue === 0) {
    throw new RangeError("Percentage change is undefined when the old value is 0.");
  }
  // Percent drop uses the absolute base: (old - new) / |old| * 100.
  return {
    difference: oldValue - newValue,
    percentDrop: ((oldValue - newValue) / Math.abs(oldValue)) * 100,
    isDecrease: newValue < oldValue,
  };
}

export function applyDecrease(value: number, percent: number): ApplyDecreaseResult {
  if (!Number.isFinite(value)) {
    throw new RangeError("Value must be a finite number.");
  }
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new RangeError("Percent must be between 0 and 100 for a decrease.");
  }
  const reducedValue = value * (1 - percent / 100);
  return {
    reducedValue,
    amountRemoved: value - reducedValue,
  };
}
