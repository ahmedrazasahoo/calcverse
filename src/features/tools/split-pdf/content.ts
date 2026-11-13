/** SEO content for the Split PDF tool page. */
export const content = {
  title: "Split PDF Online Free, Extract Pages In Your Browser",
  metaDescription:
    "Split a PDF by page ranges and download the parts in one zip. Free, in your browser, with no upload and no signup.",
  intro:
    "Type the pages you need, like 1-3, 5, 8-10, and each part becomes its own PDF, delivered together in one zip file. Handy when a form wants one chapter, one certificate or one section instead of the whole book. The splitting happens on your device, so the document is never uploaded.",
  howTo: [
    "Drop your PDF into the box, or click to choose it.",
    "Check the page count shown under the file name.",
    "Type your ranges. Each comma separated part becomes a separate PDF.",
    "Press Split PDF and save the zip file that downloads.",
  ],
  explanationTitle: "Splitting by ranges, explained simply",
  explanation: [
    "A range like 8-10 means pages 8, 9 and 10 together in one new file. A single number like 5 means just that page on its own. Mixing them, for example 1-3, 5, 8-10, gives you three files in one download: the opening section, the single page, and the closing section.",
    "Splitting is also the standard fix for strict upload limits. When a portal allows 50 KB or 200 KB per file and your document is too big even after compression, one file per section usually slips under the limit, because each field on the form gets its own allowance.",
  ],
  faqs: [
    {
      q: "Do the split files keep their quality?",
      a: "Yes. Pages are copied exactly, with no compression or re-rendering, so text and images look identical to the original.",
    },
    {
      q: "Can I extract just one page?",
      a: "Yes. Type only that page number, like 7, and you will get a one page PDF in the zip.",
    },
    {
      q: "Is my PDF uploaded to a server?",
      a: "No. The split runs in your browser and the zip is built on your device.",
    },
    {
      q: "What if I type a page number that does not exist?",
      a: "The tool checks your ranges against the real page count and tells you before doing any work.",
    },
    {
      q: "Can the same page appear in two parts?",
      a: "Yes. Ranges may overlap if you need a page in more than one of the output files.",
    },
  ],
};
