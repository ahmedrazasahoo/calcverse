import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "UUID Generator: Bulk v4 and v7 UUIDs With Copy Options",
  metaDescription:
    "Free UUID generator. Create up to 100 version 4 random or version 7 time ordered UUIDs at once, with uppercase and hyphen options and one click copy for one or all.",
  intro:
    "Generate UUIDs in bulk, up to 100 at a time. Choose version 4 for pure random IDs or version 7 for time ordered IDs that sort by creation time, then set uppercase and hyphen options and copy one or all in a click.",
};

export const content: ToolContent = {
  seoTitle: "UUID Generator: Bulk v4 and v7 UUIDs With Copy Options",
  howTo: [
    "Choose the version: v4 for fully random UUIDs, or v7 for time ordered UUIDs that sort in the order they were created.",
    "Set how many you need, from 1 to 100.",
    "Toggle uppercase and hyphens to match the format your system expects.",
    "Press Generate fresh UUIDs, then copy a single ID from its row or use Copy all to grab the whole list.",
  ],
  explanationTitle: "What a UUID is and how v4 and v7 differ",
  explanation: [
    "A UUID is a 128 bit identifier written as 32 hexadecimal digits in five groups, like 550e8400-e29b-41d4-a716-446655440000. The groups are not all random: one nibble in the third group states the version, and the top bits of the fourth group state the variant, which is why a v4 UUID always has a 4 in the same position and a letter from 8, 9, a or b starting the fourth group. The remaining bits carry the actual uniqueness, 122 of them in version 4, drawn here from your browser's cryptographic random source.",
    "Version 4 is pure randomness, which makes it simple and safe almost everywhere, but the IDs land in a database index in random order, so large tables can suffer from scattered inserts. Version 7 fixes that by spending its first 48 bits on the current Unix time in milliseconds. Newer IDs are bigger numbers than older ones, so they append neatly in sorted order, which keeps indexes compact and makes debugging friendlier because the ID itself hints at when the record was created. The rest of a v7 UUID is random, so two IDs minted in the same millisecond still differ.",
    "Collisions are the usual worry, and with random UUIDs the numbers are reassuring: you would need to generate roughly a billion UUIDs per second for about 85 years before the chance of a single duplicate reached 50 percent. In practice, duplicates come from broken random generators or copy and paste errors, not from the format itself. Uppercase and removing the hyphens change only the presentation, not the value, but some systems store one fixed form, so match the options above to whatever your code expects before you paste a batch into a seed file or a database.",
  ],
  faqs: [
    {
      q: "Should I use UUID v4 or v7 for a database primary key?",
      a: "For new systems, v7 is usually the better key: because it starts with the timestamp, inserts arrive in near sorted order, which keeps B-tree indexes fast and compact. v4 remains fine for smaller tables and is supported by every library and database already, so pick v4 when compatibility matters more than index behaviour.",
    },
    {
      q: "How many UUIDs can I generate at once here?",
      a: "Up to 100 per batch. Press Generate fresh UUIDs again for another batch; every press uses new random bytes, so batches never repeat each other in practice.",
    },
    {
      q: "Are these UUIDs generated securely?",
      a: "Yes. They are built in your browser from crypto.getRandomValues, the operating system's cryptographic random source, and the built in crypto.randomUUID where it is available for v4. Nothing is sent to a server, so the IDs are safe to use as tokens and keys.",
    },
    {
      q: "What is the difference between a UUID and a GUID?",
      a: "Nothing practical. GUID is Microsoft's name for the same 128 bit format defined by the UUID standard. A GUID generated on Windows and a UUID generated here are interchangeable.",
    },
    {
      q: "Why do some systems want UUIDs without hyphens or in uppercase?",
      a: "The hyphens are only visual grouping and the case of hex letters carries no meaning, but databases, file formats and older tools often store one canonical form. If a column or API rejects your IDs, regenerate with the hyphen and uppercase options set to match what it expects.",
    },
  ],
};
