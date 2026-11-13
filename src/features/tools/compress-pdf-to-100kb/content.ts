/** SEO content for the Compress PDF to 100KB preset page. */
export const content = {
  title: "Compress PDF to 100KB Online Free, No Upload",
  metaDescription:
    "Shrink a PDF to 100KB or less for strict online forms and portals. Processed locally in your browser, no signup, no watermark, no upload.",
  intro:
    "Some forms are stricter than others, and 100 KB is one of the toughest limits in common use. This page targets exactly that size: your PDF's images are re-encoded step by step until the file fits, and if the content simply cannot go that small, you will see the smallest honest result instead of a broken file.",
  howTo: [
    "Drop your PDF into the box, or click to browse for it.",
    "Press the compress button. The target is already set to 100 KB.",
    "Let the attempts run; reaching 100 KB may take a few passes on a large file.",
    "Download the finished PDF and check it opens correctly before submitting.",
  ],
  explanationTitle: "Reaching 100KB without wrecking the document",
  explanation: [
    "At 100 KB, quality choices matter. This tool works down a ladder: first it lowers image quality gently, then more firmly, and only as a last resort does it reduce the pixel size of the images themselves. That order keeps documents readable for as long as possible, because a slightly softer scan still reads fine, while a page that has been mangled by random deletion does not.",
    "Short documents, one or two pages of scans or certificates, reach 100 KB comfortably. Long photo heavy documents may not, and no honest tool can force them there without removing content. When that happens you get the smallest version possible, plus a clear note.",
  ],
  faqs: [
    {
      q: "Is 100KB small enough for government and exam portals?",
      a: "It is one of the most common strict limits on application and exam portals, which is why this preset exists. Always check the exact limit written on your form; if it asks for less, use our 50KB page.",
    },
    {
      q: "Does my file leave my device?",
      a: "Never. The work is done by code running in your browser tab, and nothing is uploaded to a server.",
    },
    {
      q: "Why did my long PDF stop above 100KB?",
      a: "Every page adds structure and content that cannot be compressed away. Splitting the document and compressing each part is the standard workaround for very strict portals.",
    },
    {
      q: "Will form fields and signatures survive?",
      a: "Yes. Pages, text and form fields are kept. Only the stored image data is made smaller.",
    },
  ],
};
