/** SEO content for the PDF to JPG tool page. */
export const content = {
  title: "PDF to JPG Converter Online Free, Every Page as an Image",
  metaDescription:
    "Convert every page of a PDF into a JPG image and download them all in one zip. Free, in your browser, with three quality levels and no upload.",
  intro:
    "Sometimes a document needs to become pictures: for a presentation slide, a social post, a preview or a system that only accepts images. This tool renders every page of your PDF as a clean JPG and bundles them into one zip file, all inside your browser.",
  howTo: [
    "Drop your PDF into the box, or click to choose it.",
    "Pick a quality level. High suits most documents; Print is for large, sharp output.",
    "Press Convert to JPG and watch the pages render.",
    "Save the zip file and unzip it to find one JPG per page, numbered in order.",
  ],
  explanationTitle: "What rendering a PDF page really means",
  explanation: [
    "A PDF page is a set of instructions: draw this text here, place that image there. Rendering follows those instructions and paints the finished page onto a canvas, the same thing your PDF reader does on screen. The quality levels on this page simply choose how many pixels that painting gets. More pixels means sharper small text and bigger files.",
    "Pages are painted onto a white background, because JPG has no transparency. A PDF with a see-through background would otherwise come out black in many viewers, so white is the safe, expected result.",
  ],
  faqs: [
    {
      q: "Will the text in the JPGs be sharp?",
      a: "Yes, at the High and Print levels small text stays crisp. Standard is fine for quick previews and sharing on screens.",
    },
    {
      q: "How are the files named?",
      a: "Each image carries the document name plus its page number, padded so the files sort in the right order in any folder.",
    },
    {
      q: "Is my PDF uploaded to a server?",
      a: "No. The rendering engine runs in your browser tab and the PDF never leaves your device.",
    },
    {
      q: "Can I convert just one page?",
      a: "Split the PDF first with our Split PDF tool, then convert the single page file. It takes seconds.",
    },
    {
      q: "Why JPG and not PNG?",
      a: "JPG files are far smaller for document pages and open everywhere. For most documents the visible quality is the same.",
    },
  ],
};
