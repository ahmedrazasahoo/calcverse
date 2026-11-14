import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "compress-pdf-to-200kb",
  keyword: "compress pdf to 200kb",
  title: "Compress PDF to 200KB: How to Shrink Scans So Admission Portals Accept Them",
  metaTitle: "Compress PDF to 200KB: Shrink PDFs for Portal Uploads",
  metaDescription: "Compress a PDF to 200KB without losing readability. Step by step help for university applications and exam forms, with settings for scanned transcripts.",
  excerpt: "Your transcript scan is twenty times over the 200KB portal limit and the application closes on Friday. Here is how to shrink it and keep every grade readable.",
  category: "Files and Converters",
  toolSlug: "compress-pdf-to-200kb",
  updatedAt: "2026-11-14",
  intro: [
    "Lena has her statement written, her references confirmed, and her masters application nearly submitted, except for one stubborn box on the documents page. The university wants her undergraduate transcript as a single PDF under 200KB, and the scan sitting on her laptop is 4.6 MB, more than twenty times too large. Every attempt she makes either stays far above the limit or turns her grades into grey fuzz that no admissions officer could reasonably accept. It feels like the portal is asking for the impossible, but thousands of applicants clear this exact hurdle each cycle.",
    "The direct fix is the free [compress PDF to 200KB tool](/tools/compress-pdf-to-200kb), which reduces the images inside a PDF to a size suited to a strict portal cap while keeping the pages in order and the text as sharp as the target allows. Upload the transcript, download the lighter copy, and read every page of the result before you submit it. That final reading check matters more for documents than for almost any other file, because a grade, a date, or a stamp that cannot be read can quietly sink an otherwise strong application.",
    "This guide walks through why universities and exam boards choose a limit like 200KB, where the weight inside a scanned PDF actually lives, and how to deal with three common document problems: a long transcript, a single ornate certificate, and a bulky evidence pack. You will also learn when compressing harder is the wrong answer and splitting or rescanning the document is the smarter move.",
  ],
  keyPoints: [
    "Most of the weight in a scanned PDF is the page images, so reducing scan resolution and switching needless colour pages to greyscale saves the most.",
    "A six page transcript scanned at 300 dpi in colour can exceed 5 MB, while the same pages at 200 dpi in greyscale often compress to under 200KB and stay readable.",
    "Born digital PDFs, exported from a word processor or a student system, are usually light already; heavy ones almost always contain scans or photographs.",
    "Read the entire compressed file page by page before uploading, checking grades, dates, registration numbers, stamps, and signatures at 150 percent zoom.",
    "If a long document cannot stay readable at 200KB, ask the institution whether separate files per section are allowed before you sacrifice legibility.",
  ],
  sections: [
    {
      heading: "Why universities and exam boards set a 200KB limit",
      paragraphs: [
        "A popular masters programme can receive 3,000 applications, each with perhaps eight documents. If every file averaged 5 MB, the university would store well over 100 GB for one programme in one year. A 200KB cap trims that burden and keeps the review system responsive for staff opening hundreds of files a day.",
        "Exam boards add another motive: entry forms are completed in a short window by tens of thousands of candidates, many on slow connections, and small files upload reliably under that load. Scholarship panels often review offline, downloading batches of files to laptops, and a folder of 200KB documents moves in minutes where large scans take an afternoon.",
        "The limit is about reviewer workflow, not doubting your documents. Staff view the file on screen at normal size, so your job is to spend the kilobytes on what they check: names, grades, dates, and official marks. Shrinking a photograph for a job form is a different job, covered in the guide on how to [compress image to 50KB](/guides/compress-image-to-50kb).",
      ],
    },
    {
      heading: "Where the weight hides inside a PDF",
      paragraphs: [
        "A PDF is a container, and two files with the same page count can differ in size by a factor of fifty. A transcript exported from a student system contains real text and might weigh only 60KB for six pages. The same transcript printed and scanned becomes six full page images, and images are heavy: at 300 dpi in colour, one A4 page can produce 800KB to 1.2 MB, so six pages land between 5 MB and 7 MB.",
        "Colour is the silent multiplier. A colour scan records the cream paper, the blue stamp ink, and shadows at every pixel. Switching a text page to greyscale typically cuts its weight by about two thirds and often looks cleaner. Coloured crests and embossed seals are the exceptions where colour carries real meaning.",
        "Other weight hides in blank reverse sides, cover sheets, and scanner bed edges stored as extra images. Compression attacks the biggest costs first: it reduces image resolution to what a screen review needs and strips out data the reader never sees.",
      ],
      bullets: [
        "Scanned pages at 300 dpi colour: often 800KB to 1.2 MB per page.",
        "The same pages at 200 dpi greyscale: often 25KB to 35KB per page after compression.",
        "Blank backs and cover sheets add weight while adding no information.",
        "Exported text PDFs are naturally light; a heavy file means scans are inside it.",
      ],
    },
    {
      heading: "How to compress a PDF to 200KB, step by step",
      paragraphs: [
        "Start by looking at your document the way the portal will receive it. Count the pages and remove anything that does not belong: a blank side, a cover sheet, a duplicate page. Removing one unwanted page is worth more than any quality setting. Confirm the pages run in the order the institution expects, since reorganising after compression means doing the job twice.",
        "Then compress, check, and only then upload. Some portals lock a document slot after a set number of attempts, so your own page by page check at a generous zoom is the reliable test. If the first result lands a little over the limit, greyscale for text pages and a modest resolution change usually close the gap.",
      ],
      steps: [
        "Keep the original PDF untouched and work on a duplicate.",
        "Delete blank pages, cover sheets, and duplicates, and confirm the pages are in the right order.",
        "Upload the duplicate to the [compress PDF to 200KB tool](/tools/compress-pdf-to-200kb) and download the copy, aiming for 160KB to 195KB.",
        "Read every page at 150 percent zoom, checking names, grades, dates, registration numbers, stamps, and signatures.",
        "If one page is weak, rescan it well and compress the whole file again.",
        "Rename the file plainly, for example transcript.pdf, and upload it once, saving the confirmation.",
      ],
    },
    {
      heading: "Scan settings that decide whether 200KB is reachable",
      paragraphs: [
        "If you control the scan, the battle for 200KB is mostly won before compression begins. At 300 dpi a page holds detail suitable for printing, but a reader on screen gains almost nothing beyond 200 dpi for ordinary text, and the weight falls sharply. At 150 dpi most office text is still readable, though small print in grade tables starts to soften, so treat that as a floor for documents with detailed tables.",
        "The table below assumes A4 or letter pages with printed text and a stamp. Pages covered in small print will sit above these ranges; clean printed pages often land below them. Colour and high resolution are pleasant luxuries on a one page certificate, but unaffordable habits across a long transcript.",
        "Where a board asks for 100KB instead, the guide on how to [compress PDF to 100KB](/guides/compress-pdf-to-100kb) applies, with greyscale close to mandatory. If a portal wants a photo rather than a document, the companion piece on how to [compress image to 20KB](/guides/compress-image-to-20kb) covers the tightest of those targets.",
      ],
      table: {
        caption: "Estimated compressed size by scan setting and page count",
        headers: ["Scan setting", "1 page", "4 pages", "8 pages"],
        rows: [
          ["300 dpi, colour", "180KB to 260KB", "700KB to 1 MB", "1.4 MB to 2 MB"],
          ["300 dpi, greyscale", "70KB to 110KB", "280KB to 420KB", "550KB to 800KB"],
          ["200 dpi, colour", "80KB to 120KB", "300KB to 450KB", "600KB to 900KB"],
          ["200 dpi, greyscale", "25KB to 35KB", "100KB to 140KB", "195KB to 260KB"],
          ["150 dpi, greyscale", "15KB to 22KB", "60KB to 85KB", "120KB to 165KB"],
        ],
      },
    },
    {
      heading: "Three documents, three worked examples",
      paragraphs: [
        "First, the long transcript. Yusuf must upload eight pages of semester results as one file under 200KB. His copy shop scan, at 300 dpi in colour, weighs 6.9 MB, and deleting one blank reverse page leaves seven content pages. Recompressing that scan alone stalls at about 480KB with soft text. The proper fix is to rescan at 200 dpi in greyscale, producing a 210KB file, and a final compression pass brings it to 172KB with grade tables legible at screen size. Long documents reward fixing the scan, not punishing the compressor.",
        "Second, the ornate certificate. Priya must upload her degree certificate, one page with a coloured crest, a gold seal, and a signature. Her phone photograph is 2.3 MB and slightly skewed. She photographs it flat and straight in daylight, crops away the table surface, and compresses the result to 148KB in colour. The crest and seal keep their colour, which matters for a document judged partly by appearance.",
        "Third, the evidence pack that should not be one file. A scholarship applicant gathers fourteen pages totalling 9.4 MB; squeezed into one 200KB file, the bank figures blur beyond use. The form actually provides six separate document slots, each with its own 200KB limit, so she compresses each group to between 120KB and 185KB and every figure stays readable. Many supposed single file problems are really filing problems.",
      ],
    },
    {
      heading: "Keeping grades, stamps, and seals readable at 200KB",
      paragraphs: [
        "Large headings survive almost any compression, while the details a reviewer verifies are the ones compression threatens first: a grade of B plus versus B in a crowded table, the final digit of a registration number, the date inside a stamp. Ignore the headings, zoom to 150 percent, find the smallest print on each page, and ask whether a stranger could transcribe it without guessing. If not, the file is not ready, whatever its size says.",
      ],
      subsections: [
        {
          heading: "Scanned pages versus born digital pages",
          paragraphs: [
            "If your institution offers a transcript download from its student portal, take it. That exported file contains real selectable text, so it compresses with no loss at all. Many students print such a file, sign it, scan the print, and unknowingly convert a 70KB document into a 5 MB image collection. If a signature must be added, ask whether the digital file plus a separate signed statement is accepted; often it is.",
          ],
        },
        {
          heading: "Protecting stamps, seals, and signatures",
          paragraphs: [
            "If a stamp is faint in the original, it will be fainter after compression; no setting can invent ink that was barely pressed onto the paper. A colour page for the stamped sheet, balanced by greyscale for the plain text sheets around it, is a sensible compromise. Check signatures the same way: the line should be continuous and dark, not broken into pale segments, because a broken signature can trigger a request for the document all over again.",
          ],
          bullets: [
            "Check the smallest print on every page at 150 percent zoom.",
            "Keep colour only where it carries meaning: a seal, a stamp, a photograph.",
            "Prefer an exported digital transcript over a scan of a printout.",
            "Keep your full quality originals after submitting.",
          ],
        },
      ],
    },
    {
      heading: "When compression is the wrong answer",
      paragraphs: [
        "Some documents hold more information than 200KB can carry at a readable standard: a twelve page transcript with dense tables, a design portfolio, medical reports with imaging plates. The honest options are to split the document if the portal provides multiple slots, or to email the admissions office asking whether a larger file is acceptable. A short polite email before the deadline beats an unreadable upload discovered after it.",
        "The other wrong answer is the last minute scramble. Scanning, compressing, and checking takes an unhurried half hour, best done a week before the deadline. Browse the broader [guides hub](/guides) if the same application throws up other file problems.",
        "For most transcripts, certificates, and exam documents, though, 200KB is enough: clean pages, sensible scan settings, one compression pass with the [compress PDF to 200KB tool](/tools/compress-pdf-to-200kb), and a proper read through of the result. Do those four things and the documents page becomes a quiet administrative step.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why is my one page PDF already bigger than 200KB?",
      a: "A single page can exceed the limit if it contains a high resolution colour scan or a phone photograph, which often weighs 1 MB or more on its own. Photographed certificates and scanned pages at 300 dpi are the usual causes. Compressing the file, or rescanning that page at 200 dpi in greyscale if it is plain text, normally brings a single page well under 200KB.",
    },
    {
      q: "Will admissions staff be able to read a transcript compressed to 200KB?",
      a: "Yes, provided the source scan was decent and you check the result before uploading. A seven page transcript at 200 dpi in greyscale can sit near 170KB with grade tables that read clearly on screen. Problems come from poor originals, such as dim photographs taken at an angle, and compression cannot repair those, so rescan weak pages rather than compressing harder.",
    },
    {
      q: "Should I scan my documents in colour or greyscale for a 200KB limit?",
      a: "Use greyscale for pages that are printed text with a simple stamp, because it cuts the file weight by roughly two thirds and often looks cleaner. Keep colour for pages where colour itself is evidence, such as a page with a coloured seal, a photograph, or colour coded results. Mixing the two across a document is a practical way to protect important pages while saving space on plain ones.",
    },
    {
      q: "My PDF has 15 pages. Can it really fit into 200KB?",
      a: "It can fit, but readability may suffer, because fifteen pages share the same budget that gives a six page transcript comfortable room. At 150 dpi in greyscale the text of a clean document may remain acceptable, yet dense tables will soften. First check whether the portal allows several files or a separate upload per section, and if the document must stay whole and detailed, email the institution to ask about alternatives before the deadline.",
    },
    {
      q: "The portal accepts my file but the preview looks rotated or cut off. What went wrong?",
      a: "That usually traces back to the scan or phone photograph rather than the compression step. A page photographed at an angle, or a scan that captured only part of the sheet, will preview exactly as flawed as the source. Return to the original, rescan or rephotograph that page flat and complete, rebuild the PDF in the correct order, and compress the corrected file.",
    },
    {
      q: "Is it safe to upload my transcript to an online compressor?",
      a: "Treat transcripts and identity documents as sensitive, because they carry personal details and official records. Use a tool you trust, avoid uploading documents you do not need to compress, and keep your own copies stored securely. If an institution offers an official route for oversized files, that route is the safest option of all and is worth asking about for unusually personal documents.",
    },
  ],
  relatedSlugs: ["compress-pdf-to-100kb", "compress-image-to-50kb", "compress-image-to-20kb"],
};
