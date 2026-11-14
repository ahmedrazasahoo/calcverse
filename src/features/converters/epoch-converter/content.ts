import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Epoch Converter: Unix Timestamp to Date and Date to Epoch Time",
  metaDescription:
    "Free epoch converter. Turn Unix timestamps in seconds, milliseconds, microseconds or nanoseconds into readable UTC and local dates, convert any date back to epoch time, and watch the current epoch tick live.",
  intro:
    "Convert Unix timestamps to human dates and back again. Paste a timestamp in seconds, milliseconds, microseconds or nanoseconds (or let the tool detect the unit from its length), and convert any date and time into every epoch unit at once.",
};

export const content: ToolContent = {
  seoTitle: "Epoch Converter: Unix Timestamp to Date and Date to Epoch Time",
  howTo: [
    "Paste a Unix timestamp into the first box and choose its unit, or leave the unit on Auto detect and the tool will guess from the number of digits.",
    "Read the same moment as a UTC string, your local time, ISO 8601 format and a relative description such as 3 days ago.",
    "To go the other way, pick a date and time and read its epoch value in seconds, milliseconds, microseconds and nanoseconds.",
    "Use the live clock at the bottom whenever you need the current epoch value, and pause it to copy the number without it changing.",
  ],
  explanationTitle: "What epoch time is and why the units trip people up",
  explanation: [
    "Epoch time, usually called Unix time, counts the seconds that have passed since midnight at the start of 1 January 1970 in UTC. That single agreed starting point lets every computer on earth describe any moment with one plain number, with no time zones, month lengths or leap years to argue about. The date itself was chosen by the early Unix engineers as a round, recent date, and the count has been ticking ever since: it passed 1,700,000,000 seconds on 14 November 2023.",
    "The catch is that different systems store the same count at different resolutions. Classic Unix timestamps and most APIs use seconds, which today is a 10 digit number. JavaScript counts milliseconds, giving 13 digits. Logs and high frequency systems may use microseconds (16 digits) or nanoseconds (19 digits). Feed a millisecond value into a tool expecting seconds and you get a date tens of thousands of years in the future, which is why this converter asks for the unit, and why auto detect works at all: the digit count alone almost always gives the unit away.",
    "Two more details matter in practice. First, epoch values are always in UTC, so the same timestamp is a different wall clock time in every time zone; the local time shown here uses your own device settings. Second, relative descriptions like 2 hours ago are computed against the current moment, so they drift as time passes. For anything you store or share, keep the raw number and the ISO 8601 string, which pins the moment down unambiguously as text, for example 2023-11-14T22:13:20.000Z, where the Z confirms it is UTC.",
  ],
  faqs: [
    {
      q: "How do I know if a timestamp is in seconds or milliseconds?",
      a: "Count the digits. A current timestamp in seconds has 10 digits, milliseconds has 13, microseconds has 16 and nanoseconds has 19. If you are not sure, use Auto detect on this page and it will pick the unit from the length.",
    },
    {
      q: "What date is epoch 0?",
      a: "Epoch 0 is 1 January 1970 at 00:00:00 UTC, the start of the Unix clock. Negative timestamps count backwards from that moment into 1969 and earlier.",
    },
    {
      q: "Why does my converted date look a few hours off?",
      a: "The timestamp itself is correct, but you are probably comparing a UTC result with your local wall clock. Epoch time is always UTC, so the local time result shifts by your time zone offset. Check the UTC and ISO 8601 results if you need the absolute moment.",
    },
    {
      q: "How do I convert nanoseconds without losing precision?",
      a: "A nanosecond timestamp has 19 digits, which is more precision than a normal number can hold exactly. This tool divides large values as text first, so converting 1700000000000000000 nanoseconds gives exactly 1700000000 seconds with nothing rounded away at the top end.",
    },
    {
      q: "What is the year 2038 problem?",
      a: "Older systems store epoch seconds in a signed 32 bit integer, which runs out on 19 January 2038 and wraps to a date in 1901. Modern 64 bit systems are not affected, but embedded devices and old databases still need checking before that date arrives.",
    },
  ],
};
