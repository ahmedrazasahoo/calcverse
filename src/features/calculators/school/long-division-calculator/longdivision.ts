/**
 * Long division logic, pure and framework free.
 *
 * Integer mode follows the classic school algorithm digit by digit:
 * build a partial dividend, count how many times the divisor goes
 * into it, multiply, subtract, then bring down the next digit. Each
 * pass becomes one structured step the component can narrate.
 *
 * Signs: a negative dividend is supported by working with its size
 * and putting the sign back on the quotient and remainder at the
 * end. The divisor must be positive, which keeps the step wording
 * simple and matches how the method is taught.
 *
 * Decimal mode keeps dividing past the point: the remainder is
 * multiplied by ten for each extra place until the requested number
 * of decimal places is reached or the division comes out exact.
 */

export interface LongDivisionStep {
  /** The digit of the dividend being processed, counted from 0. */
  digitIndex: number;
  /** The partial dividend at this stage. */
  partialDividend: number;
  /** How many times the divisor goes into the partial dividend (one quotient digit). */
  times: number;
  /** times multiplied by the divisor. */
  product: number;
  /** partialDividend minus product. */
  remainderAfter: number;
  /** The next digit brought down, or null on the last step. */
  broughtDown: number | null;
  /** The step written out in words. */
  description: string;
}

export interface LongDivisionResult {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  /** Quotient written with its sign, for example "-135". */
  quotientText: string;
  steps: LongDivisionStep[];
}

export interface DecimalDivisionResult {
  dividend: number;
  divisor: number;
  places: number;
  /** Quotient to the requested places, for example "3.333". */
  quotientText: string;
  /** True when the division finished exactly before using all the places. */
  exact: boolean;
  finalRemainder: number;
  steps: string[];
}

const SMALL_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function timesWord(times: number): string {
  if (times >= 0 && times <= 9) return `${SMALL_WORDS[times]} time${times === 1 ? "" : "s"}`;
  return `${times} times`;
}

function assertInputs(dividend: number, divisor: number): void {
  if (!Number.isFinite(dividend) || !Number.isInteger(dividend)) {
    throw new RangeError("The number being divided must be a whole number.");
  }
  if (!Number.isFinite(divisor) || !Number.isInteger(divisor)) {
    throw new RangeError("The divisor must be a whole number.");
  }
  if (divisor === 0) {
    throw new RangeError("You cannot divide by zero.");
  }
  if (divisor < 0) {
    throw new RangeError("Use a positive divisor. Put any minus sign on the number being divided instead.");
  }
}

/** Classic integer long division with the full step list. */
export function longDivide(dividend: number, divisor: number): LongDivisionResult {
  assertInputs(dividend, divisor);
  const negative = dividend < 0;
  const absDividend = Math.abs(dividend);
  const digits = String(absDividend).split("").map((ch) => Number(ch));

  const steps: LongDivisionStep[] = [];
  let remainder = 0;
  let quotientDigits = "";

  for (let i = 0; i < digits.length; i += 1) {
    const partial = remainder * 10 + digits[i];
    const times = Math.floor(partial / divisor);
    const product = times * divisor;
    const remainderAfter = partial - product;
    quotientDigits += String(times);
    const broughtDown = i + 1 < digits.length ? digits[i + 1] : null;

    let description: string;
    if (i === 0) {
      description = `${absDividend} split into groups of ${divisor}: ${divisor} goes into ${partial} ${timesWord(times)}. ${times} x ${divisor} = ${product}, and ${partial} - ${product} = ${remainderAfter}`;
    } else {
      description = `Bring down the ${digits[i]} to make ${partial}. ${divisor} goes into ${partial} ${timesWord(times)}. ${times} x ${divisor} = ${product}, and ${partial} - ${product} = ${remainderAfter}`;
    }
    if (broughtDown === null && digits.length > 1) {
      description += `. No digits are left to bring down, so the remainder is ${remainderAfter}`;
    }

    steps.push({
      digitIndex: i,
      partialDividend: partial,
      times,
      product,
      remainderAfter,
      broughtDown,
      description,
    });
    remainder = remainderAfter;
  }

  const quotientMagnitude = Number(quotientDigits.replace(/^0+(?=\d)/, ""));
  const quotient = negative && quotientMagnitude !== 0 ? -quotientMagnitude : quotientMagnitude;
  const signedRemainder = negative && remainder !== 0 ? -remainder : remainder;

  return {
    dividend,
    divisor,
    quotient,
    remainder: signedRemainder,
    quotientText: String(quotient),
    steps,
  };
}

/** Division continued past the decimal point to a chosen number of places. */
export function longDivideDecimal(
  dividend: number,
  divisor: number,
  places = 4,
): DecimalDivisionResult {
  assertInputs(dividend, divisor);
  if (!Number.isInteger(places) || places < 0 || places > 10) {
    throw new RangeError("Decimal places must be a whole number from 0 to 10.");
  }
  const negative = dividend < 0;
  const absDividend = Math.abs(dividend);
  const steps: string[] = [];

  const integerPart = Math.floor(absDividend / divisor);
  let remainder = absDividend - integerPart * divisor;
  steps.push(
    `${divisor} goes into ${absDividend} ${integerPart} times with remainder ${remainder}, giving the whole part ${integerPart}`,
  );

  let decimalDigits = "";
  let exact = remainder === 0;
  for (let i = 0; i < places && remainder !== 0; i += 1) {
    const scaled = remainder * 10;
    const digit = Math.floor(scaled / divisor);
    const product = digit * divisor;
    const newRemainder = scaled - product;
    decimalDigits += String(digit);
    steps.push(
      `Place ${i + 1} after the point: remainder ${remainder} becomes ${scaled}. ${divisor} goes into ${scaled} ${digit} times (${digit} x ${divisor} = ${product}), leaving remainder ${newRemainder}`,
    );
    remainder = newRemainder;
    if (remainder === 0) exact = true;
  }
  if (places === 0) {
    decimalDigits = "";
  } else if (decimalDigits === "") {
    decimalDigits = "0".repeat(places);
    exact = true;
  } else if (exact) {
    decimalDigits = decimalDigits.padEnd(places, "0");
  }

  const sign = negative && (integerPart !== 0 || Number(decimalDigits) !== 0) ? "-" : "";
  const quotientText =
    places === 0 ? `${sign}${integerPart}` : `${sign}${integerPart}.${decimalDigits}`;

  if (exact) {
    steps.push(`The division comes out exact: the answer is ${quotientText}`);
  } else {
    steps.push(
      `After ${places} decimal places the remainder is ${remainder}, so ${quotientText} is the answer to that many places`,
    );
  }

  return {
    dividend,
    divisor,
    places,
    quotientText,
    exact,
    finalRemainder: negative && remainder !== 0 ? -remainder : remainder,
    steps,
  };
}
