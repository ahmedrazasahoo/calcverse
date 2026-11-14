import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "epoch-converter",
  keyword: "epoch converter",
  title: "Epoch Converter: How Unix Timestamps Work and Why They Break",
  metaTitle: "Epoch Converter Guide: Unix Timestamps Explained Simply",
  metaDescription: "Learn how an epoch converter turns Unix timestamps into readable dates, why seconds and milliseconds clash, and how UTC and the 2038 problem cause bugs.",
  excerpt: "What a long number like 1735689600 actually means, how to convert it by hand and in code, and the seconds, time zone and 2038 traps that break real systems.",
  category: "Text and Dev Tools",
  toolSlug: "epoch-converter",
  updatedAt: "2026-11-14",
  intro: [
    "You open a log file, an API response or a database row and instead of a date you get a bare number: 1735689600. No slashes, no month name, nothing a human can read at a glance. That number is a Unix timestamp, a count of seconds since a fixed starting point in 1970, and turning it into a real date quickly is the whole job of an epoch converter.",
    "Paste any timestamp into the free [epoch converter](/converters/epoch-converter) and it will show you the matching date and time in UTC and in your local time. Keep it open as you read, because the fastest way to understand timestamps is to convert a few real ones from your own logs, tokens or analytics exports and watch how the digits change when you add a day, a year or three extra zeros.",
    "This guide covers what the epoch is, how seconds, milliseconds and other units differ, why UTC is the safe reference point, and how time zone handling creates bugs that look like data errors. It also explains the year 2038 problem in plain terms, with a conversion table you can use to check your own conversions without trusting a tool blindly.",
  ],
  keyPoints: [
    "A Unix timestamp counts seconds since January 1, 1970 at 00:00:00 UTC, a moment called the Unix epoch.",
    "Ten digits usually means seconds, thirteen digits usually means milliseconds. Mixing them up is the most common conversion bug.",
    "Always store and compare timestamps in UTC, then convert to local time only when you display them to a person.",
    "A timestamp of 0 is the epoch itself, negative values are dates before 1970, and 2147483647 is the last second a signed 32 bit system can hold.",
    "The 2038 problem affects old 32 bit systems. Modern 64 bit systems can represent dates billions of years into the future.",
  ],
  sections: [
    {
      heading: "What the Unix epoch actually is",
      paragraphs: [
        "The Unix epoch is midnight at the start of January 1, 1970, measured in Coordinated Universal Time, or UTC. Unix systems in the early 1970s needed a simple way to store a moment in time as a single number, and counting seconds from a fixed zero point was simpler than storing year, month, day, hour and minute as separate fields. That choice spread far beyond Unix. Today Linux, macOS, most programming languages, web APIs, databases and log formats all use the same zero point, which is why a timestamp made on a phone in Texas can be read correctly by a server in Frankfurt.",
        "The arithmetic is deliberately plain. A timestamp of 60 means one minute after the epoch. A timestamp of 86400 means exactly one day after it, because a day holds 60 times 60 times 24, or 86400 seconds. A timestamp of 1735689600 means that many seconds after the epoch, which works out to January 1, 2025 at 00:00:00 UTC. Nobody does that division in their head for large numbers, which is why converters exist, but knowing the unit is seconds is what lets you estimate. If two timestamps differ by about 604800, they are about a week apart, because 86400 times 7 is 604800.",
        "Negative timestamps cover dates before 1970. A value of -86400 is December 31, 1969 at 00:00:00 UTC, and historians, astronomers and anyone working with older records will meet negative values in archives and datasets. Most modern tools handle them, but some older code assumes timestamps are always positive and will reject or misread a pre 1970 date. If a conversion of an old date produces a date in 1970 or a huge future date instead, a sign or range assumption in the code is a likely cause.",
      ],
    },
    {
      heading: "Seconds, milliseconds, microseconds and nanoseconds",
      paragraphs: [
        "The single most common epoch bug is a unit mismatch. Unix timestamps in their classic form count seconds and currently have ten digits. JavaScript, however, works in milliseconds. The JavaScript Date.now() method returns milliseconds since the epoch, a thirteen digit number, and many JSON APIs copy that habit. Python time.time() returns seconds as a decimal, Java System.currentTimeMillis() returns milliseconds as the name says, and some high speed trading and measurement systems use microseconds with sixteen digits or nanoseconds with nineteen digits. The numbers all describe the same kind of thing, but they differ by factors of a thousand.",
        "The symptoms of a mix up are easy to recognize once you have seen them. Feed a millisecond value into a converter that expects seconds and you get a date tens of thousands of years in the future, because the tool multiplies your already large number by another thousand seconds. Feed a seconds value into a tool that expects milliseconds and you get a date in January 1970, because ten digits of seconds read as milliseconds barely move past the epoch. Before you debug anything else, count the digits. Ten points to seconds, thirteen to milliseconds, and anything else deserves a look at the documentation for that specific API.",
        "Conversion between units is just multiplication or division by 1000 at each step. To turn seconds into milliseconds, multiply by 1000. To turn milliseconds back into seconds, divide by 1000 and decide what to do with the remainder, since dropping it loses sub second precision that a log or a payment record might actually need. Try it in the [epoch converter](/converters/epoch-converter) with a value from your own system: convert it as seconds, then add three zeros and convert again, and the size of the jump will make the unit problem impossible to forget.",
      ],
      table: {
        caption: "The same moment written in four common timestamp units",
        headers: ["Unit", "Digits today", "Value for Jan 1, 2025 00:00:00 UTC", "Often used by"],
        rows: [
          ["Seconds", "10", "1735689600", "Unix, Linux, most APIs, databases"],
          ["Milliseconds", "13", "1735689600000", "JavaScript, Java, many JSON APIs"],
          ["Microseconds", "16", "1735689600000000", "High resolution logs and tracing"],
          ["Nanoseconds", "19", "1735689600000000000", "Precision measurement and finance systems"],
        ],
      },
    },
    {
      heading: "How to convert a timestamp by hand and in code",
      paragraphs: [
        "Converting by hand teaches you what the tools are doing. Start with a timestamp in seconds, divide by 86400 to get whole days since the epoch, then work out the year by accounting for leap years, which is the fiddly part nobody should do for a real deadline. The practical hand method is shorter: use a known anchor. January 1, 2025 at 00:00:00 UTC is 1735689600. January 1, 2026 is 1767225600, exactly 31536000 seconds later because 2025 has 365 days. If your timestamp sits between those anchors, subtract the earlier anchor and divide the remainder by 86400 to get days into the year, then count months forward. It is slow, but it is a reliable way to check whether a converter output is in the right year and month.",
        "In code, every major language has a built in path. In JavaScript, new Date(1735689600 * 1000) creates the date, and the multiplication by 1000 is the step people forget, producing a date in 1970 that looks like a data bug. In Python, datetime.fromtimestamp(1735689600, tz=timezone.utc) does the job, and the explicit time zone argument matters, as the next section explains. In SQL, functions such as FROM_UNIXTIME in MySQL or to_timestamp in PostgreSQL take seconds directly. Whichever language you use, write one small test with a timestamp whose answer you already know, like the anchors above, and keep that test. It will catch unit and time zone changes when libraries update.",
        "Reading code that handles timestamps pairs well with structured data work. API responses often nest a timestamp inside JSON, and the [JSON formatter guide](/guides/json-formatter) shows how to make those payloads readable so you can spot the timestamp fields, check their digit counts and copy exact values into a converter without losing a digit in a long unformatted line.",
      ],
      steps: [
        "Copy the timestamp exactly and count its digits to decide the likely unit: 10 for seconds, 13 for milliseconds.",
        "Convert with a tool or library function that matches that unit, and note whether the result is shown in UTC or local time.",
        "Check the result against a known anchor, such as 1735689600 for January 1, 2025 at 00:00:00 UTC.",
        "If the result lands in 1970 or tens of thousands of years ahead, suspect a unit mismatch before suspecting bad data.",
        "Record the original timestamp beside the converted date in any report, so another person can reproduce your conversion.",
      ],
    },
    {
      heading: "UTC versus local time: where timestamp bugs hide",
      paragraphs: [
        "A timestamp itself has no time zone. The number 1735689600 names one single instant, the same instant everywhere on Earth. Time zones enter only when a human reads that instant as a wall clock time. That instant is midnight in UTC, but it is 7 pm on December 31, 2024 in New York, which is on Eastern Standard Time at UTC minus 5, and 5:30 am on January 1, 2025 in India at UTC plus 5:30. All three readings are correct. Bugs start when code converts a timestamp using the local time of the server instead of the time zone of the user, or stores a local wall clock time as if it were UTC.",
        "Consider a support team in Chicago reviewing a login recorded as 1735689600. A tool set to UTC shows midnight on January 1. A tool set to Central Time shows 6 pm on December 31. If a report says the login happened on New Year Day and a customer insists it was New Year Eve, both may be reading the same record with different display settings. The fix is a habit, not a library: store timestamps in UTC, transmit them in UTC, and convert to a local zone only at the moment of display, with the zone named next to the time. Writing 2025-01-01 00:00 UTC removes the ambiguity that writing just midnight creates.",
        "Daylight saving time adds a second trap for anyone converting local dates into timestamps. On the day clocks spring forward in the US, a local time like 2:30 am may not exist at all, and on the fall back day, 1:30 am happens twice. Code that builds a timestamp from a local date and time has to pick a rule for those gaps and repeats, and different libraries pick differently. Working in UTC sidesteps both problems for storage and sorting, which is why logs, tokens and database created_at fields are almost always UTC even in products built for one city.",
        "The same zone discipline helps with everyday time notation. If you meet a time written as 1730 in a schedule or a log, the [military time converter guide](/guides/military-time-converter) explains the 24 hour clock that pairs naturally with UTC timestamps in aviation, medicine and operations work, where a zone label plus a 24 hour time leaves no room for AM and PM confusion.",
      ],
      table: {
        caption: "One timestamp, 1735689600, read in different time zones",
        headers: ["Time zone", "Local reading", "Date"],
        rows: [
          ["UTC", "12:00 am", "January 1, 2025"],
          ["New York (EST, UTC-5)", "7:00 pm", "December 31, 2024"],
          ["Los Angeles (PST, UTC-8)", "4:00 pm", "December 31, 2024"],
          ["London (GMT, UTC+0)", "12:00 am", "January 1, 2025"],
          ["Berlin (CET, UTC+1)", "1:00 am", "January 1, 2025"],
          ["Sydney (AEDT, UTC+11)", "11:00 am", "January 1, 2025"],
        ],
      },
    },
    {
      heading: "Where you meet timestamps in real work",
      paragraphs: [
        "Once you start looking, timestamps are everywhere in technical work. Web tokens such as JSON Web Tokens carry iat and exp fields as seconds since the epoch, so a token with an exp of 1735776000 expires exactly one day after January 1, 2025 at midnight UTC. Log files from servers and cloud services stamp each line with epoch values because numbers sort cleanly and never suffer from month name language differences. Analytics exports, ad platforms and payment webhooks all pass event times as timestamps, and a mismatch between seconds in one system and milliseconds in another is a recurring cause of events appearing in the wrong order or on the wrong day in a dashboard.",
        "File systems store creation and modification times as timestamps under the surface, even when your file manager shows friendly dates. Databases do the same for created_at and updated_at columns in many frameworks. That hidden consistency is useful: sorting by the raw number is always chronological, comparing two moments is a single subtraction, and finding everything that happened in the last hour is a range check between two numbers. The cost is readability, which is exactly the trade a converter reverses when a person needs to answer a question like when did this account actually sign up.",
        "Encoded data often travels with timestamps, and the two formats get debugged side by side. An API key, a signed URL or a webhook payload may arrive Base64 encoded with a timestamp tucked inside the decoded JSON. The [Base64 encode and decode guide](/guides/base64-encode-decode) covers that decoding step, after which this guide method applies: count the digits, convert in UTC, and check against a known anchor before you trust the expiry or event time you found.",
      ],
    },
    {
      heading: "The 2038 problem, in plain terms",
      paragraphs: [
        "Early Unix systems stored the timestamp in a signed 32 bit integer. A signed 32 bit number can hold values up to 2147483647, and no further. Count that many seconds from the epoch and you reach January 19, 2038 at 03:14:07 UTC. One second later, a 32 bit counter cannot go higher, so it wraps around to the most negative value it can hold, which reads as a date in December 1901. On an affected system, dates suddenly jump back by about 136 years, files can look impossibly old, and scheduled tasks can fire at once or never, depending on how the code compares times.",
        "The good news is that most systems you touch today are already safe. Modern operating systems, databases and languages on 64 bit hardware store timestamps in 64 bit integers, and a signed 64 bit counter counting seconds will not run out for about 292 billion years. The risk that remains lives in older embedded devices, long lived industrial controllers, some file formats and file systems with 32 bit time fields, and legacy code that was compiled decades ago and never updated. A router, a medical device or a factory controller installed in 2010 and expected to run for thirty years is the kind of system auditors actually check for this problem.",
        "For ordinary web and app work, your practical duties are small. Use the date and time types your language recommends today rather than storing timestamps in a plain 32 bit integer column, choose 64 bit or proper timestamp types in new database tables, and test any system that schedules far future dates, like a thirty year mortgage calculation or a pension record, with a date after 2038 to see what it does. If a test date in 2040 comes back as 1904 or 1970, you have found a 32 bit assumption while it is still cheap to fix.",
      ],
    },
    {
      heading: "A practical conversion table and checking routine",
      paragraphs: [
        "A small table of anchor timestamps is worth keeping near your desk or in your notes. Anchors let you check a converter, a library or a colleague claim in seconds, without converting anything from scratch. If a tool tells you that 1767225600 is a date in 2024, you know from the table that it should be January 1, 2026, and you can start looking for a unit or zone mistake instead of doubting your own reading. Anchors for round durations help too: 3600 seconds is one hour, 86400 is one day, 604800 is one week and 31536000 is a 365 day year.",
        "Build a short routine for any timestamp that matters, like an expiry, a billing date or a piece of evidence in a dispute. First, count the digits and name the unit out loud. Second, convert in UTC and write the UTC result down. Third, convert to the local zone of the person who will read it, and label that zone in writing. Fourth, compare against an anchor or a second tool. That routine takes under a minute and catches nearly every real world timestamp error, because almost all of them are unit slips or zone slips, not exotic calendar problems.",
        "When you are done checking, browse the [guides hub](/guides) for the other developer and everyday guides, or go straight back to the [epoch converter](/converters/epoch-converter) and pin your own anchors: convert your birth date at midnight UTC, the start of your current project, and one timestamp from a live log, and save the three pairs. Personal anchors stick in memory far better than round numbers, and they make the next mystery timestamp much faster to place.",
      ],
      table: {
        caption: "Anchor timestamps for January 1 at 00:00:00 UTC, in seconds",
        headers: ["Date (UTC)", "Timestamp (seconds)", "Note"],
        rows: [
          ["January 1, 1970", "0", "The epoch itself"],
          ["January 1, 2000", "946684800", "Start of the year 2000"],
          ["January 1, 2020", "1577836800", "Start of the decade"],
          ["January 1, 2025", "1735689600", "365 day year follows"],
          ["January 1, 2026", "1767225600", "One normal year after 2025 anchor"],
          ["January 19, 2038", "2147483647", "Last second for signed 32 bit storage, at 03:14:07 UTC"],
        ],
      },
    },
  ],
  faqs: [
    {
      q: "How do I know if a timestamp is in seconds or milliseconds?",
      a: "Count the digits. Current timestamps in seconds have 10 digits, while milliseconds have 13, microseconds have 16 and nanoseconds have 19. If a conversion gives a date in January 1970 or tens of thousands of years in the future, you almost certainly picked the wrong unit.",
    },
    {
      q: "What date is a timestamp of 0?",
      a: "Zero is the Unix epoch itself: January 1, 1970 at 00:00:00 UTC. In a US local time zone it displays as the evening of December 31, 1969, which is why a zero or near zero value in a report usually means a missing or unset date rather than a real event in 1969.",
    },
    {
      q: "Why does the same timestamp show different dates on different sites?",
      a: "The timestamp names one instant, but sites display it in different time zones. One tool may show UTC while another shows your browser local time, so the hour and sometimes the date differ. Check the zone label on each result, and compare both in UTC to see that they agree.",
    },
    {
      q: "Will the 2038 problem affect my website or app?",
      a: "Almost certainly not, if you use current languages, frameworks and databases, which store time in 64 bit values or dedicated timestamp types. The risk sits in old 32 bit systems, embedded devices and legacy file formats. A quick test with a date after January 2038 will show you whether your own stack handles it.",
    },
    {
      q: "How do I convert milliseconds to a readable date?",
      a: "Divide the millisecond value by 1000 to get seconds, then convert as usual, or paste the full value into a converter and select milliseconds as the unit. In JavaScript you can pass milliseconds directly to the Date constructor, which is the one common place where no division is needed.",
    },
    {
      q: "Can timestamps be negative?",
      a: "Yes. Negative values count backward from the epoch and represent dates before January 1, 1970, with -86400 equal to December 31, 1969 at 00:00:00 UTC. Most modern tools handle them, but some older code assumes positive values, so test pre 1970 dates if your data includes historical records.",
    },
  ],
  relatedSlugs: ["json-formatter", "base64-encode-decode", "military-time-converter"],
};
