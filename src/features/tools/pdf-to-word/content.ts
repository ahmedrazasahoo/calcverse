/** SEO content for the PDF to Word converter page. */
export const content = {
  title: "PDF to Word Converter Online Free, Editable Text Rebuilt in Your Browser",
  metaDescription:
    "Turn a PDF into an editable Word document rebuilt from its text, page by page. Free, in your browser, with no upload. Honest about what a text rebuild can and cannot do.",
  intro:
    "This converter reads the text stored inside your PDF and rebuilds it as an editable Word document, one paragraph per line, with a page break where each PDF page ends. It is the right tool when you need to edit, copy or rewrite the words of a PDF. It does not clone the original design, and the sections below say exactly where the limits are.",
  howTo: [
    "Drop your PDF into the box, or click to browse for it.",
    "Press Convert to Word and watch the page progress as each page is read.",
    "Download the .docx file with the converted name.",
    "Open it in Word, Google Docs or LibreOffice and check the text, then style it the way you need.",
    "If the document comes out empty, the PDF is almost certainly a scan with no text layer. Run it through OCR first, then convert again.",
  ],
  explanationTitle: "What this rebuild keeps, and what it does not",
  explanation: [
    "A PDF stores text as positioned pieces on a page, not as flowing paragraphs. This tool reads those pieces, groups the ones that sit on the same line, and writes each line into the Word file as its own paragraph in reading order. The words, numbers and punctuation come across as real editable text that you can search, select and rewrite.",
    "Headings, columns, tables and images are not recreated. A heading becomes a plain paragraph like any other line, a table arrives as lines of text rather than rows and cells, and pictures are left out entirely. A scanned PDF with no text layer produces an empty or near empty document, because there are no stored words to read. For a perfect copy of a designed document, the original source file is the only route. No converter can recover a layout that was never stored as structure.",
  ],
  faqs: [
    {
      q: "Will my headings and formatting come across?",
      a: "No. Headings arrive as ordinary paragraphs, and fonts, sizes and colours from the PDF are not carried over. You get clean editable text that you can style again in Word.",
    },
    {
      q: "What happens to tables and columns?",
      a: "They are not recreated as tables or columns. The text inside them is read line by line, so a table becomes a series of text lines you may need to tidy or rebuild by hand.",
    },
    {
      q: "The Word file came out empty. Why?",
      a: "The PDF almost certainly has no text layer. Scans and photographed pages are pictures of words, not stored text. Run the file through an OCR tool so the words become real text, then convert it again.",
    },
    {
      q: "Are images from the PDF included?",
      a: "No. This is a text rebuild only, so images, logos and charts are not copied into the Word document.",
    },
    {
      q: "Is my PDF uploaded to a server?",
      a: "No. The reading and rebuilding happen in your browser, on your device. The file never leaves your computer or phone.",
    },
  ],
};
