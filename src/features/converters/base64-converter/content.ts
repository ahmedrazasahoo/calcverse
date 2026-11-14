import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "Base64 Encoder and Decoder: Text, Unicode and Files",
  metaDescription:
    "Free Base64 encoder and decoder. Encode text with full Unicode support, use the URL safe alphabet, turn files into Base64 with size stats, and decode Base64 back into a downloadable file.",
  intro:
    "Encode and decode Base64 in both directions, for text and for whole files. Unicode is handled properly, the URL safe alphabet is one toggle away, and everything runs in your browser so nothing you paste is uploaded anywhere.",
};

export const content: ToolContent = {
  seoTitle: "Base64 Encoder and Decoder: Text, Unicode and Files",
  howTo: [
    "Pick a mode: Encode text, Decode text, File to Base64, or Base64 to file.",
    "For text, type or paste into the box and read the result instantly. Any language or emoji works, because the text is encoded as UTF-8 first.",
    "Turn on the URL safe toggle when the result will travel inside a link, a JWT or a file name.",
    "For a file, choose it from your device to see its Base64 plus the original size, encoded length and overhead. To reverse it, paste Base64, name the file and download the decoded bytes.",
  ],
  explanationTitle: "How Base64 turns binary data into safe text",
  explanation: [
    "Base64 exists because many systems were built to carry text, not raw bytes. Email, JSON, URLs and old data formats can mangle or reject arbitrary byte values, so Base64 re-encodes any bytes using only 64 safe characters: A to Z, a to z, 0 to 9, plus + and /. It works three bytes at a time: 24 bits are split into four groups of 6 bits, and each group picks one character from the alphabet. When the input does not divide neatly by three, equals signs pad the end so the decoder knows how many real bytes the last group holds.",
    "That safety costs size. Four characters carry three bytes, so encoded data is about 33 percent larger than the original, which is exactly the overhead figure shown when you encode a file here. Text needs one extra step: characters are not bytes, so this tool first encodes your text as UTF-8, the standard byte form of Unicode, and only then applies Base64. That is why accented letters, Arabic, Chinese and emoji all survive the round trip, where naive encoders that treat each character as one byte break on anything outside plain English.",
    "The URL safe variant swaps the two troublemakers: + becomes - and / becomes _ , and the padding is dropped, because + means a space in a URL query string and / would split a path. You will meet it in JSON Web Tokens, signed links and cache keys. A common gotcha is decoding data that was encoded with the other alphabet, which either fails or quietly corrupts, so if a decode here errors out, try flipping the URL safe toggle before assuming the data is broken.",
  ],
  faqs: [
    {
      q: "Why is Base64 output about a third bigger than the input?",
      a: "Because every 3 bytes become 4 characters. That fixed 4 to 3 ratio means roughly 33 percent overhead on any input, text or file. It is the price of carrying binary data through systems that only accept safe text characters.",
    },
    {
      q: "Can Base64 handle text in other languages and emoji?",
      a: "Yes, as long as the text is turned into UTF-8 bytes first, which this tool does automatically. Problems appear with encoders that assume one character equals one byte; those fail or corrupt anything beyond basic English characters.",
    },
    {
      q: "What is URL safe Base64 and when should I use it?",
      a: "It replaces + with - and / with _ and removes the = padding, so the result can sit inside a URL, file name or token without being misread. Use it for links, JWTs and anything that travels in an address bar. Use the standard alphabet for email attachments and data URIs.",
    },
    {
      q: "Is Base64 a form of encryption?",
      a: "No. Base64 is an encoding, not encryption. Anyone can decode it instantly with no key, which this page demonstrates. Never use it to protect passwords or secrets; it only makes data safe to transport, not safe from readers.",
    },
    {
      q: "Why does my Base64 fail to decode?",
      a: "Usually because a character outside the alphabet crept in during copying, the padding was cut off mid string, or the data was encoded with the URL safe alphabet (or the reverse). This tool tolerates missing padding and stray line breaks; if it still fails, toggle the URL safe option and try again.",
    },
  ],
};
