import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Military Time Converter: 24 Hour Clock, Spoken Forms and Full Chart",
  metaDescription:
    "Free military time converter. Turn 24 hour time into 12 hour time and back, hear how each time is spoken, check the live military and Zulu clock, and use the full 24 hour reference chart.",
  intro:
    "Convert between military time and the regular 12 hour clock in both directions, see how every time is pronounced, and check the live clock showing your current military time next to Zulu time. The full 24 row chart underneath covers every hour of the day.",
};

export const content: ToolContent = {
  seoTitle: "Military Time Converter: 24 Hour Clock, Spoken Forms and Full Chart",
  howTo: [
    "To convert from military time, enter the hour from 0 to 23 and the minutes, and read the 12 hour result with its spoken form.",
    "To convert the other way, enter a 12 hour time, pick AM or PM, and read the four digit military result.",
    "Check the live line at the top for the current military time where you are, next to the current Zulu time.",
    "Use the reference chart to look up any hour on the hour, from 0000 at midnight to 2300 late in the evening.",
    "Copy the spoken form when you need to say a time out loud, for example in a radio check or a briefing.",
  ],
  explanationTitle: "How military time works and how to say it",
  explanation: [
    "Military time is the 24 hour clock written as four digits with no colon and no AM or PM. The day starts at 0000, which is midnight, and runs to 2359 just before the next midnight. Noon is 1200. Morning hours look familiar, so 0900 is 9:00 AM, while afternoon and evening hours keep counting past 12 instead of starting again: add 12 to any PM hour, so 1 PM becomes 1300, 6 PM becomes 1800 and 11 PM becomes 2300. Because every time of day has exactly one name, there is never any doubt about whether a flight, a shift or an operation starts in the morning or the evening.",
    "Saying the times follows a simple pattern. Whole hours are spoken as the hour pair plus the word hundred: 0900 is zero nine hundred, 1200 is twelve hundred and 1800 is eighteen hundred. The one special case is midnight, 0000, spoken as zero hundred. When minutes appear, the time is read as two number pairs: 1430 is fourteen thirty, 0905 is zero nine zero five, and a trailing word hours often closes the phrase, as in fourteen thirty hours. Single digits always take a leading zero when spoken, which keeps 0905 clearly different from 905 or nine five.",
    "Zulu time is the military name for time stated in the UTC time zone, and the letter Z in a timestamp, pronounced Zulu in the NATO phonetic alphabet, is what gives it the name. Pilots, sailors and soldiers work across time zones, so flight plans and orders are written in Zulu time to give everyone one shared clock: 1800Z means the same moment everywhere on Earth. The live line at the top of this converter shows your local military time and the Zulu time side by side, so you can see the offset your own zone sits at right now.",
  ],
  faqs: [
    {
      q: "What time is 1730 in regular time?",
      a: "5:30 PM. Subtract 12 from any hour above 12 to get the PM hour: 17 minus 12 is 5, and the minutes stay the same. Spoken, 1730 is seventeen thirty hours.",
    },
    {
      q: "What is midnight and noon in military time?",
      a: "Midnight is 0000, spoken zero hundred hours, and noon is 1200, spoken twelve hundred hours. The day then runs up to 2359, which is 11:59 PM, before rolling back to 0000.",
    },
    {
      q: "How do you convert PM times to military time?",
      a: "Add 12 to the hour for every PM time except 12 PM itself, which stays 1200. So 2:30 PM becomes 1430 and 9:45 PM becomes 2145. AM times mostly stay as they are, except 12 AM, which becomes 0000.",
    },
    {
      q: "What is Zulu time?",
      a: "Zulu time is military time measured on the UTC time zone instead of your local one. It lets pilots, ships and units in different countries share one clock. The Z in a timestamp like 1800Z stands for the Zulu time zone, named with the NATO phonetic alphabet.",
    },
    {
      q: "How do you pronounce 0600 and 2045?",
      a: "0600 is zero six hundred hours, following the whole hour pattern. 2045 has minutes, so it is read as two pairs: twenty forty five hours.",
    },
  ],
};
