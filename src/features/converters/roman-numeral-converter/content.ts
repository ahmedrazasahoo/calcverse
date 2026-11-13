import type { ToolContent } from "@/lib/content";

export const metaDescription =
  "Free Roman numeral converter. Turn numbers into Roman numerals and back, with strict standard notation, plus full dates for tattoos, chapters and anniversaries.";

export const intro =
  "Roman numerals turn up everywhere once you start looking: film credits, clock faces, book chapters, sporting finals and tattoo studios. This converter works in both directions and checks its own answers, so the numeral you copy is the standard one.";

export const content: ToolContent = {
  seoTitle: "Roman Numeral Converter: Numbers, Numerals and Full Dates",
  howTo: [
    "Choose the direction: number to numeral, numeral to number, or a full date.",
    "Type your value. Numbers run from 1 to 3999, the full range of standard notation.",
    "For numerals, use the standard form: the converter accepts IV but politely rejects IIII, because 4 written that way belongs on a clock face, not in standard notation.",
    "For dates, the result joins day, month and year with dots, the format most people choose for tattoos and engraving.",
  ],
  explanationTitle: "How Roman numerals work",
  explanation: [
    "The system is built from seven symbols: I (1), V (5), X (10), L (50), C (100), D (500) and M (1000). You build a number by stacking symbols from largest to smallest and adding them up, so 2026 is MMXXVI: two thousands, ten plus ten, five and one. Pure addition gets unwieldy quickly, which is why the subtractive shortcut exists: placing a smaller symbol just before a bigger one subtracts it, giving IV for 4, IX for 9, XL for 40 and CM for 900.",
    "The rules of the standard form are strict about that shortcut. Only I, X and C can subtract, each only from the next two values above it, and the five symbols (V, L, D) never repeat or subtract. That strictness is useful: it means every number has exactly one correct spelling, and this converter enforces it. Feed it IC hoping for 99 and it refuses, because 99 is XCIX. Clocks are the famous exception; many clock faces write IIII for 4 out of tradition, a quirk historians still argue about.",
    "The ceiling of 3999 is real, not a limitation of this page. Beyond it, classical notation put a bar over a numeral to multiply it by a thousand, a device that is hard to type and rarely wanted. There is also no zero: Roman bookkeeping had no symbol for nothing, which is one reason European mathematics accelerated once Hindu Arabic numerals, with their positional zero, took over.",
  ],
  faqs: [
    {
      q: "What is 2026 in Roman numerals?",
      a: "MMXXVI. Two M symbols make 2000, XX adds 20, and VI adds 6. The year changes on a lot of engraved gifts, so it is worth knowing the pattern: only the final digits change as the years tick over.",
    },
    {
      q: "Why is 4 written IV but shown as IIII on clocks?",
      a: "Tradition and looks. Clockmakers have used IIII for centuries, possibly for visual balance against the VIII opposite it, possibly because it was common in ancient inscriptions before the subtractive rule hardened. In standard written notation, IV is correct and IIII is not.",
    },
    {
      q: "How do I write a date as a Roman numeral tattoo?",
      a: "Convert the day, month and year separately and join them, most often with dots or lines: 13 November 2026 becomes XIII.XI.MMXXVI. Decide your month order carefully if you are used to the American month first style, and double check the final string digit by digit before it becomes permanent.",
    },
    {
      q: "What is the largest Roman numeral?",
      a: "In standard notation, 3999: MMMCMXCIX. Larger values need the overbar system, where a line above a numeral multiplies it by a thousand, so 10,000 can be written as X with a bar. Everyday uses, from years to chapter numbers, never need to go there.",
    },
    {
      q: "Did the Romans really calculate with these numerals?",
      a: "Mostly not on paper. Romans calculated with counting boards and abacuses, then recorded the result in numerals. Try long multiplication in Roman numerals once and you will understand why the abacus did the heavy lifting for a thousand years.",
    },
  ],
};
