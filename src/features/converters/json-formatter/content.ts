import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "JSON Formatter: Format, Validate, Minify and Convert JSON Online",
  metaDescription:
    "Free JSON formatter and validator. Pretty print JSON with 2 spaces, 4 spaces or tabs, minify it, convert JSON to CSV or XML, and see the exact position of any syntax error.",
  intro:
    "Paste any JSON and tidy it up in one click. Format it with the indent you prefer, shrink it down to a single line, check it for syntax errors with the exact fault position, or convert it to CSV for a spreadsheet and XML for older systems.",
};

export const content: ToolContent = {
  seoTitle: "JSON Formatter: Format, Validate, Minify and Convert JSON Online",
  howTo: [
    "Paste your JSON into the input box, or type it in directly.",
    "Choose an indent style: 2 spaces, 4 spaces or a tab.",
    "Press Format to pretty print, Minify to compress it to one line, or Validate to check for errors and see where they are.",
    "Use JSON to CSV when your data is an array of flat objects, or JSON to XML with your own root element name.",
    "Copy the output or download it as a text file.",
  ],
  explanationTitle: "What JSON formatting actually does",
  explanation: [
    "JSON is a text format, so the same data can be written in many ways. A minified document squeezes everything onto one line with no spaces, which is ideal for sending over a network but painful to read. A formatted document adds line breaks and consistent indentation so the structure is visible at a glance: each nesting level is pushed one indent further right, so objects inside objects inside arrays read like an outline. Formatting never changes the data itself, only the whitespace between tokens, which the JSON specification says parsers must ignore.",
    "Validation is stricter than it looks. The parser reads the text character by character and stops at the first thing it cannot accept, which is often a missing comma, a trailing comma after the last item, single quotes instead of double quotes, or an unquoted key. When this tool reports an error it shows the message from the parser and the character position where parsing failed, so you can jump straight to the fault instead of hunting through the whole document.",
    "The two conversions cover the formats JSON most often meets in real work. JSON to CSV works when the data is an array of objects with flat fields: each object becomes a row, the columns are the union of every key found, and any nested value is written into its cell as compact JSON text. Values that contain commas or quotes are wrapped in double quotes following the CSV rules. JSON to XML walks the structure recursively, turning object keys into element names and arrays into repeated elements under a root element you choose. Attributes are not supported, so every value becomes element text or a child element, which keeps the mapping simple and predictable.",
  ],
  faqs: [
    {
      q: "Why does my JSON fail validation?",
      a: "The most common causes are a trailing comma after the last item in an object or array, single quotes instead of double quotes, keys without quotes, and comments, which JSON does not allow at all. Press Validate and the error message plus character position will point at the first problem the parser found.",
    },
    {
      q: "What is the difference between formatting and minifying?",
      a: "They are opposites. Formatting adds line breaks and indentation so people can read the structure, while minifying strips every unnecessary space so the file is as small as possible for storage or transfer. Both keep the exact same data, so you can switch between them freely.",
    },
    {
      q: "Which indent should I choose, 2 spaces, 4 spaces or tab?",
      a: "It is purely a style choice. Two spaces is the most common in JavaScript projects and web APIs, four spaces is popular in Python and Java codebases, and tabs let every reader set their own display width. Pick whatever your team or project already uses so diffs stay clean.",
    },
    {
      q: "Why did JSON to CSV refuse my data?",
      a: "CSV is a flat table, so the conversion only accepts a top level array where every item is an object, like a list of users or orders. A single object, an array of plain numbers, or an empty array has no rows and columns to build. Nested objects and arrays inside a row are fine: they are written into their cell as JSON text.",
    },
    {
      q: "Is my JSON sent to a server?",
      a: "No. Formatting, validation and both conversions run entirely in your browser using its built in JSON parser, so pasted data, including API responses and config files, never leaves your device.",
    },
  ],
};
