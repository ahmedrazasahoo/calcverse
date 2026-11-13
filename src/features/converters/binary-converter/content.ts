import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free binary converter. Convert between binary, decimal, hexadecimal and octal with exact big number precision, and turn text into binary code and back.";

export const intro =
  "Computers think in binary and programmers argue in hexadecimal. This converter moves numbers between binary, decimal, octal and hex without rounding, and also turns plain text into its binary bytes and back again.";

export const content: ToolContent = {
  seoTitle: "Binary Converter: Binary, Decimal, Hex and Octal, Plus Text to Binary",
  howTo: [
    "For numbers, pick the base your value is written in, then type it. Every other base appears at once.",
    "For text, switch to the text mode. Typing on the left shows the binary bytes; paste binary on the right to read it back.",
    "Binary values can be as long as you like. The conversion uses exact integer arithmetic, so a 64 bit value comes out digit perfect.",
    "Watch the bit count on number results: it tells you the storage size the value needs, which matters for registers, permissions and colour values.",
  ],
  explanationTitle: "Why there are four bases on one page",
  explanation: [
    "Binary is base 2: each position is worth double the one before it, and only the digits 0 and 1 exist. Decimal is the base 10 system humans grow up with. Hexadecimal, base 16, is binary in shorthand: each hex digit stands for exactly four binary digits, so FF is 11111111 and a six digit colour code is just three bytes wearing a coat. Octal, base 8, groups binary in threes and survives mainly in Unix file permissions, where 755 spells out who may read, write and run a file.",
    "Converting between them is place value arithmetic: read the digits from the right, multiply each by its place weight, and add. The catch is size. Everyday calculators quietly switch to approximate floating point past about 15 decimal digits, which corrupts long binary strings. This converter keeps integers exact with arbitrary precision arithmetic, so a full 64 bit pattern converts cleanly in both directions.",
    "Text is a different encoding layered on top. Each character becomes one or more bytes following the UTF-8 standard: plain English letters take one byte, accented letters take two, and most emoji take four. That is why the same word can produce more binary groups than it has letters, and why decoding checks that the bytes form valid UTF-8 rather than guessing.",
  ],
  faqs: [
    {
      q: "How do I convert binary to decimal by hand?",
      a: "Write the place values over the digits from the right: 1, 2, 4, 8, 16 and so on, doubling each time. Add the values sitting under the 1 digits and ignore the zeros. For 1010 that is 8 plus 2, giving 10.",
    },
    {
      q: "Why do programmers use hexadecimal so much?",
      a: "Because it is compact binary. One hex digit is exactly four bits, so a byte is always two hex digits and a memory address or colour stays short and readable. Converting between hex and binary is grouping and ungrouping, with no real arithmetic, which makes it the working shorthand of computing.",
    },
    {
      q: "What does my name look like in binary?",
      a: "Use the text mode: each letter becomes its UTF-8 byte written in binary, so A is 01000001 and a is 01100001. Uppercase and lowercase differ by one bit, a leftover of how the ASCII table was laid out in the 1960s.",
    },
    {
      q: "Can this converter handle negative numbers or decimals?",
      a: "No, and that is deliberate. Signed and fractional binary involve extra conventions (two's complement, floating point formats) with widths and rounding choices that a converter cannot guess. This tool covers non negative whole numbers exactly, which is what homework, permissions and bit questions almost always need.",
    },
    {
      q: "What is the difference between a bit and a byte?",
      a: "A bit is a single 0 or 1. A byte is eight bits, enough for 256 different values, which is why bytes became the standard unit for characters and file sizes. The bit count shown on each result is the number of binary digits the value itself needs.",
    },
  ],
};
