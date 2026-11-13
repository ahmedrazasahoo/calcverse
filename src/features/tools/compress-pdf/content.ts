/** SEO content for the Compress PDF tool page, kept as data so the route stays thin. */
export const content = {
  title: "Compress PDF Online Free, No Upload, No Signup",
  metaDescription:
    "Shrink a PDF to a target size in KB right in your browser. Your file never leaves your device, there is no signup, no watermark and no page limit.",
  intro:
    "Pick a target size, drop in your PDF, and this tool reworks the photos and scans inside the file until it fits. Everything happens in your own browser, so private documents like contracts, ID scans and bank statements never travel to anyone's server.",
  howTo: [
    "Drop your PDF into the box, or click to browse for it.",
    "Choose a target size from the preset buttons, or type your own size in KB.",
    "Press the compress button and watch the attempts run. The tool starts gently and only gets more aggressive if the target needs it.",
    "Download the finished file and check the before and after sizes.",
  ],
  explanationTitle: "How PDF compression actually works",
  explanation: [
    "Most of the weight in a typical PDF is not the text. It is the images: scanned pages, photos, screenshots and logos stored inside the file, often at a far higher quality than anyone needs on screen. This tool decodes those images, re-encodes them at a quality matched to your target, and rebuilds the document around them. Text stays text, so words remain sharp and selectable even when the file gets much smaller.",
    "There is an honest limit. A PDF that is pure text and line drawings has almost nothing to squeeze, and no tool can make it dramatically smaller without deleting content. When that happens here, you are told plainly and offered the original file back rather than a damaged one.",
    "Because the work happens locally, the usual worries disappear. There is no upload queue, no file sitting on a stranger's server, and no account to create. Close the tab and the file is gone from memory.",
  ],
  faqs: [
    {
      q: "Is my PDF uploaded to a server?",
      a: "No. The compression runs entirely in your browser using code downloaded with this page. Your file is never sent anywhere, which makes this safe for contracts, certificates and personal documents.",
    },
    {
      q: "Will the text in my PDF stay sharp?",
      a: "Yes. Only the embedded images are re-encoded. Real text in the PDF stays as text, so it prints cleanly and can still be selected and copied.",
    },
    {
      q: "Why could my file not reach the target size?",
      a: "Some files hit a floor. A scanned document can only shrink so far before the writing becomes hard to read, and a text heavy PDF has little compressible content in the first place. The tool stops at the smallest honest result instead of ruining the document.",
    },
    {
      q: "Is there a file size or page limit?",
      a: "There is no artificial limit. Very large files depend on your device's memory, so a several hundred page scan may take a little longer on an older phone.",
    },
    {
      q: "Does compression remove anything from my document?",
      a: "No pages, text or form fields are removed. Only the image data inside the file is stored more efficiently.",
    },
  ],
};
