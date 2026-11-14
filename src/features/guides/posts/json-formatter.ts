import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "json-formatter",
  keyword: "json formatter",
  title: "JSON Formatter Explained: How to Format, Validate and Fix Broken JSON Without Guessing",
  metaTitle: "JSON Formatter: How to Format, Validate and Fix JSON Errors",
  metaDescription: "Format messy JSON into clean, readable output, validate it in seconds, and fix trailing commas, single quotes and other common errors with clear examples.",
  excerpt: "What formatting and validation really check, how to read the error message instead of guessing, and the five mistakes behind almost every broken JSON file.",
  category: "Text and Dev Tools",
  toolSlug: "json-formatter",
  updatedAt: "2026-11-14",
  intro: [
    "An API sends back a response and it arrives as one endless line of text, hundreds of characters long, with no breaks and no indentation. Somewhere inside it is the one value you need, maybe a status, a price or an error code, but finding it by eye is slow and miserable. Or the opposite problem lands on your desk: a config file that used to work now fails to load, and the app gives you a vague complaint or no message at all. Both problems come down to the same skill, which is working with JSON in a form humans can actually read and check.",
    "That is the job of the free [JSON formatter](/converters/json-formatter) on CalcVerse. Paste in messy or broken JSON and it does two separate things: it checks that the text follows the JSON rules, which is validation, and it rewrites valid JSON with clean indentation, which is formatting. If the text is invalid, it points you toward the position of the problem instead of silently guessing what you meant. Ten seconds in that tool can save an hour of squinting at a wall of text.",
    "This guide explains what JSON is doing in the first place, how formatting and validation differ, and how to fix the errors that cause most failures: trailing commas, single quotes, unquoted keys, unescaped characters and mismatched brackets. You will meet Dev, a support engineer in Denver who untangles customer config files every week, and Lena, a junior developer in Chicago learning APIs for the first time. Their examples use small, real shaped data, described in plain words so you can follow along even if you are reading on a phone with no editor open.",
  ],
  keyPoints: [
    "Formatting changes how JSON looks. Validation checks that it follows the rules. Clean looking JSON can still be invalid, and valid JSON can look terrible.",
    "JSON allows only double quotes around keys and text values, no trailing commas, and no comments inside the data.",
    "A formatter that stops at an error is helping you. The position it reports is usually at, or just after, the real mistake.",
    "Fix one error at a time and validate again after each fix. Later errors often vanish once the first one is repaired.",
    "Pretty printed JSON is for reading and debugging. Minified JSON, with spaces removed, is for sending and storing efficiently.",
    "Never paste secrets, tokens or customer data into a tool you do not trust. Use dummy values when you share an example for help.",
  ],
  sections: [
    {
      heading: "What JSON is, and why it shows up everywhere",
      paragraphs: [
        "JSON stands for JavaScript Object Notation. It is a plain text format for structured data that almost every language can read and write, which is why it became the default language of web APIs, config files, data exports and logs.",
        "The structure uses a few building blocks. An object is a set of key and value pairs wrapped in curly braces: a key such as name, a colon, and a value such as the text Ava. An array is an ordered list in square brackets. Values can be text in double quotes, a number with no quotes, the words true or false, the word null for an empty slot, another object, or another array. Nesting objects and arrays is how JSON describes layered data, such as a customer with an address, and an address with a street, city and postal code.",
        "Two habits help from the start. Keys always wear double quotes, while numbers and the true, false and null values never do. A zip code stored as text keeps its leading zero, while one stored as a number loses it, and that decision causes real bugs. Second, JSON is data only. It has no comments, no formulas and no instructions.",
      ],
    },
    {
      heading: "Formatting and validation are two different jobs",
      paragraphs: [
        "Formatting, often called pretty printing, takes valid JSON and rewrites it with line breaks and indentation so the structure is visible. A one line API response of 4,000 characters becomes perhaps 120 short lines, and suddenly you can see where the customer object ends and the payment object begins. Formatting changes nothing about the data: the keys, values and order stay exactly the same.",
        "Validation is stricter. A validator reads the text against the JSON grammar and answers one question: is this legal JSON, yes or no? It checks that brackets match and close in the right order, that keys and text values use double quotes, that commas sit between items and nowhere else, and that numbers are spelled in allowed forms. Validation does not check that the data is sensible. Checking meaning is done by your app or by a schema.",
        "Keeping the two jobs separate saves real confusion. If the [JSON formatter](/converters/json-formatter) refuses to format your text, it is telling you the text failed validation, so there is nothing legal to pretty print yet. Treat a validation failure as the start of the repair, and the reported position as your best clue.",
      ],
      table: {
        caption: "Formatting compared with validation at a glance",
        headers: ["Question", "Formatting", "Validation"],
        rows: [
          ["What does it check or change?", "Layout only: line breaks, indentation and spacing", "Grammar only: quotes, commas, brackets and allowed value forms"],
          ["Can it run on broken JSON?", "No, it needs valid JSON before it can lay it out", "Yes, finding the break is exactly its job"],
          ["Does it change the data?", "No, keys, values and order stay the same", "No, it reports problems and changes nothing"],
          ["Does it check meaning?", "No", "No, sensible values need app checks or a schema"],
          ["Typical output", "Readable, indented text for humans", "A pass, or an error with a position to inspect"],
        ],
      },
    },
    {
      heading: "Step by step: format and validate a messy response",
      paragraphs: [
        "Here is the workflow Dev, a support engineer in Denver, teaches every new support hire, using a typical API response for a single order. The raw response arrives as one line containing an order number, a customer name, a total of 59.98 and a list of two items. Nothing about it is broken, but nobody can review it in that state.",
      ],
      steps: [
        "Copy the raw text exactly as you received it. Do not tidy it by hand first, because hand edits before validation hide the original problem.",
        "Paste it into the JSON formatter and run it. If it validates, you will get indented output. If it fails, note the line or character position in the message before you change anything.",
        "Read the formatted output from the top, checking that each object opens and closes where you expect and that lists contain the number of items you expect. Two items promised and three shown is a data question to raise, not a formatting problem.",
        "Check the values that matter for your task by eye: names spelled as expected, totals in the right field, dates in the agreed form, and no value sitting in the wrong type, such as a price written as text.",
        "If you edited anything, validate once more after the edit. Then copy the version you need: pretty printed for reading, tickets and documentation, or minified for pasting into a system that stores or sends it.",
        "If the data came from a customer or a live account, replace real names, emails and tokens with dummy values before you share the example anywhere else.",
      ],
    },
    {
      heading: "Common error one: trailing commas",
      paragraphs: [
        "The trailing comma is the single most common JSON error, and it fools people because so many other formats allow it. In JSON it is never legal. The rule is strict: a comma means another item follows. A comma followed by a closing bracket or brace tells the parser to expect an item that never arrives, so it reports an error at that closing character.",
        "Picture a short list of three colors written as an array: red, green and blue in double quotes, separated by commas, and then one more comma after blue before the closing square bracket. To a human that extra comma looks harmless. To a validator it is the whole problem, and the fix is simply to delete that final comma.",
        "The reported position confuses people because the error usually points at the closing bracket, where the parser finally gives up waiting. The actual mistake is one character earlier. When you see an error at a closing bracket and the structure otherwise looks balanced, scan backward a few characters for a comma sitting just before it. Related encoding habits show up in our [Base64 encode and decode guide](/guides/base64-encode-decode), where a single wrong character also breaks an otherwise sound block of text.",
      ],
    },
    {
      heading: "Common error two: single quotes, unquoted keys and comments",
      paragraphs: [
        "JSON has exactly one kind of quote for keys and text: the double quote. Writing a key with single quotes, in the style of a JavaScript file or a Python dictionary, is invalid JSON even though it reads perfectly well. The same applies to text values, and to curly or smart quotes, the kind a word processor inserts automatically.",
        "Unquoted keys are the close cousin. In JavaScript you can write an object with a bare key and it works. In JSON the key must be text in double quotes. A validator stops at the first bare key, which gives you a useful pattern: fix it, validate again, and let the tool walk you to the next one.",
        "Comments fail for a different reason: the format has no comment syntax at all. Lines starting with two slashes, blocks wrapped in slash and star marks, and lines starting with a hash sign are all illegal inside JSON data. Teams work around this by keeping notes in a separate readme file, or by adding a clearly named description field inside the data itself, which is legal because it is data, not a comment.",
      ],
    },
    {
      heading: "Common error three: unescaped characters and mismatched brackets",
      paragraphs: [
        "Text values cause a subtler failure. Because the double quote marks the start and end of a text value, a double quote inside the text ends it early unless it is escaped, with a backslash placed directly before the character. The same rule covers backslashes themselves, which must be doubled inside text, and real line breaks typed inside a value, which must be written as an escape sequence instead.",
        "Mismatched brackets cause the loudest errors and the vaguest messages. Every curly brace and square bracket must close in the reverse order they opened, and a missing closer in a nested file can produce an error reported at the very end of the document, hundreds of lines from the real gap. Formatted indentation is your best defense. In pretty printed JSON, a missing bracket usually shows as a section that stays indented too far. Lena learned to read indentation like a map.",
        "A handful of smaller rules round out the usual suspects. Numbers cannot carry leading zeros, so a value written as 007 fails, while the same digits as a text value pass and usually make more sense for codes. The words true, false and null must be lowercase and unquoted. And a file must contain one top level value: wrap several records in one array. Timestamps in these records often arrive as epoch numbers, and our [epoch converter guide](/guides/epoch-converter) shows how to turn those into readable dates while you debug.",
      ],
      bullets: [
        "Escape an inner double quote with a backslash directly before it, and double any backslash that belongs in the text itself.",
        "Write line breaks inside a text value as an escape sequence, never as a real line break typed into the value.",
        "Let indentation guide you: a line that steps in or out unevenly is near a bracket problem.",
        "Keep codes with leading zeros as text in double quotes, and keep true, false and null lowercase and unquoted.",
      ],
    },
    {
      heading: "Pretty, minified and sorted: choosing an output style",
      paragraphs: [
        "Once your JSON is valid, presentation choices suit different jobs. Pretty printed output with two space indentation is the default for reading, code review and documentation. What matters is consistency inside one project, so a team is not reformatting files back and forth and burying real changes inside walls of whitespace differences.",
        "Minified output removes every optional space and line break, producing the smallest plain version of the same data for sending over a network or storing in a database field. Never edit minified JSON directly if you can avoid it. Format it first, make your change in the readable version, validate, and then minify again if the destination needs it.",
        "Sorting keys is the third option, and it divides opinion. Alphabetical keys make two versions of a file easy to compare, which helps when diffing a customer config against a known good one. If two files differ only in key order, they describe the same data. Identifiers inside these files are another frequent debugging stop, and the [UUID generator guide](/guides/uuid-generator) explains the format you will keep meeting there.",
      ],
    },
    {
      heading: "Working habits that keep JSON problems small",
      paragraphs: [
        "The cheapest JSON error is the one caught in the first minute, so build validation into the moment of editing. Any time you hand edit a config, a payload example or a data fixture, run it through the [JSON formatter](/converters/json-formatter) before you save, send or commit it. Keep a known good copy of important files, dated, so a repair starts from comparison instead of guesswork.",
        "Share examples responsibly. JSON from real systems often carries email addresses, phone numbers, access tokens and internal identifiers that have no business in a public forum post. Replace them with short dummy values that keep the same shape: a fake name, a made up email, a token replaced by a row of x characters.",
        "Finally, fix errors in the order the validator finds them, and resist the urge to rewrite the whole file when it complains. The first error is real. Work top to bottom, one fix and one validation at a time. The [guides hub](/guides) collects the companion pieces mentioned above.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is the difference between formatting and validating JSON?",
      a: "Formatting rearranges valid JSON with line breaks and indentation so people can read it, without changing the data. Validation checks the text against the JSON grammar: double quotes, commas in the right places, matching brackets and legal value forms. A file must validate before it can be formatted.",
    },
    {
      q: "Why does JSON reject a comma after the last item?",
      a: "In JSON a comma is a promise that another item follows. A comma sitting right before a closing bracket or brace breaks that promise, so the parser reports an error at the closing character. Deleting that final comma, and changing nothing else, is the complete fix.",
    },
    {
      q: "Can JSON use single quotes or comments?",
      a: "No to both. Keys and text values must use plain double quotes, and single quotes, smart quotes from a word processor and bare unquoted keys all fail. JSON also has no comment syntax, so notes belong in a separate document or in a normal description field inside the data.",
    },
    {
      q: "The error points at the end of my file. Where is the real problem?",
      a: "Probably a missing or extra bracket much earlier. A parser can only be sure something is wrong when the file ends with a structure still open, so it reports the end. Format what you can, then read the indentation: a section that stays stepped in too far usually sits right below the missing closer.",
    },
    {
      q: "Should I store JSON pretty printed or minified?",
      a: "Store the version humans edit as pretty printed, because changes stay reviewable and diffs stay small and honest. Minify for sending over a network or for machine only storage, where the smaller size helps and nobody needs to read it. You can convert between the two freely once the JSON is valid.",
    },
    {
      q: "Is it safe to paste JSON into an online formatter?",
      a: "Only with data you are comfortable sharing with that tool. Replace real names, emails, tokens and keys with dummy values of the same shape before you paste anywhere, and prefer tools that process text locally in your browser. The structure is what you need checked, not the private values inside it.",
    },
  ],
  relatedSlugs: ["base64-encode-decode", "epoch-converter", "uuid-generator"],
};
