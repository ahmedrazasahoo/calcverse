import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "compress-pdf-to-100kb",
  keyword: "compress pdf to 100kb",
  title: "Compress PDF to 100KB: How to Shrink Scans and Certificates and Stay Readable",
  metaTitle: "Compress PDF to 100KB: Guide to Small, Readable Files",
  metaDescription: "Compress a PDF to 100KB for strict upload limits. Learn what makes scans heavy, the DPI and color settings that matter, and how to keep text sharp and readable.",
  excerpt: "A strict 100KB upload limit is mostly a problem of scanned images, colour and DPI. This guide shows what makes a PDF heavy and how to shrink it while keeping every line readable.",
  category: "Files and Converters",
  toolSlug: "compress-pdf-to-100kb",
  updatedAt: "2026-11-14",
  intro: [
    "The upload form accepts your certificate, the progress bar climbs, and then a red message appears: file too large, maximum 100KB. Your scan is 2.4 MB, which is 24 times over the limit, and the deadline is tonight. This is one of the most common file problems in job applications, university admissions, visa forms and government portals, and it almost never comes from the text on the page. It comes from how the page was scanned. Use the free [compress PDF to 100KB tool](/tools/compress-pdf-to-100kb) to bring the file down to size, and read on to understand what the tool is actually changing, so you can judge whether the result will still pass a human check.",
    "A PDF is a container, not a single kind of content. A one page certificate born on a computer, exported from Word or a design program, might be 40KB because its text is stored as text and its logo is a small vector shape. The same certificate printed, signed and scanned on an office machine can be 3 MB, because the scanner throws away the text and stores a photograph of the whole page instead. Photographs are heavy. Text is light. Nearly every trick in this guide comes back to that one difference, and once you see it, a 100KB target stops looking impossible and starts looking like a settings problem you can fix in a few minutes.",
    "There is a catch worth naming early. Shrinking a file is easy; shrinking it and keeping it acceptable is the real job. An admissions officer or a case worker still has to read your name, your registration number and the seal at the bottom. The goal is not the smallest possible file at any cost. The goal is a file under 100KB, with margin to spare, that still looks like a proper document when someone opens it at full size.",
  ],
  keyPoints: [
    "Scanned pages are photographs inside a PDF, and those images account for almost all of the file size.",
    "Colour scans at 300 DPI are the usual reason a single page weighs 1 to 4 MB.",
    "Dropping to greyscale and 150 to 200 DPI often cuts size by 80 percent or more with little visible loss.",
    "Aim for 85 to 95KB rather than exactly 100KB, because portals count bytes in slightly different ways.",
    "Always open the result at 100 percent zoom and check names, numbers and seals before you upload it.",
    "Split a long document across files only if the portal allows it; never cut pages the form asks for.",
  ],
  sections: [
    {
      heading: "What actually makes a PDF heavy",
      paragraphs: [
        "A single scanned page in colour at 300 DPI holds roughly 2,500 by 3,500 pixels, often 800KB to 1.5 MB as a PDF page. A three page scanned transcript can easily reach 4 MB. The same three pages as a born-digital PDF, where the words are real text, might total 60KB. The words did not change. The storage method did.",
        "Three settings drive the weight of a scanned page. Resolution, measured in DPI: doubling it quadruples the pixel count, so a 300 DPI page holds four times the data of a 150 DPI page. Colour depth: a colour scan stores three channels per pixel, a greyscale scan stores one. And compression quality. Background texture matters too: a clean white background compresses to almost nothing, while a shadowed one does not.",
        "Not every heavy PDF is a scan. Designed certificates can hide a full page background photograph, and photographs pasted into Word keep their original camera resolution even when shown small. If your file was never scanned, check for big embedded images first. Our guide to how to [compress a PDF to 200KB](/guides/compress-pdf-to-200kb) walks through that born-digital case.",
      ],
      bullets: [
        "A 300 DPI colour scan of one A4 page: roughly 800KB to 1.5 MB.",
        "The same page at 150 DPI in greyscale: often 40KB to 90KB.",
        "Real text in a born-digital PDF: a few KB per page.",
        "Phone scanner apps at default settings usually produce colour, high DPI files.",
      ],
    },
    {
      heading: "The settings that get a scan under 100KB",
      paragraphs: [
        "Think of the 100KB budget as something you spend across your pages. A one page certificate can afford 200 DPI greyscale and still land near 70KB to 90KB. A four page document has about 25KB per page, which pushes you toward 150 DPI greyscale and firmer compression. Page count is the first question to ask.",
        "Work through the levers in this order. First, convert colour to greyscale unless the portal demands colour: greyscale typically removes 50 to 70 percent of the size. Second, set resolution near 150 to 200 DPI. Third, only if you are still over, increase image compression. Fourth, clean up the scan: crop desk edges and shadows, straighten the page, and boost contrast so the background goes properly white.",
        "Fatima scanned her one page matriculation certificate at default settings and got a 2.8 MB colour file for a portal with a 100KB limit. Greyscale brought it to about 950KB. Reducing resolution from roughly 350 DPI to 200 DPI brought it near 320KB. A stronger compression pass with the [compress PDF to 100KB tool](/tools/compress-pdf-to-100kb) finished at 88KB, with her name, roll number and the board seal all crisp. If your problem file is a single photo, our guide to how to [compress an image to 50KB](/guides/compress-image-to-50kb) shows the JPG numbers.",
      ],
      table: {
        caption: "Typical sizes for one scanned A4 page under different settings",
        headers: ["Scan settings", "Typical size", "Readable for documents?"],
        rows: [
          ["Colour, 300 DPI, high quality", "800KB to 1.5 MB", "Yes, but far over a 100KB limit"],
          ["Greyscale, 200 DPI, medium quality", "90KB to 160KB", "Yes, close to the limit"],
          ["Greyscale, 150 DPI, medium quality", "40KB to 90KB", "Yes, the usual sweet spot"],
          ["Black and white, 200 DPI", "25KB to 60KB", "Fine for plain text, risky for photos and seals"],
        ],
      },
    },
    {
      heading: "A step-by-step routine for a stubborn file",
      paragraphs: [
        "When a file refuses to shrink, follow a fixed routine, checking the size after each pass so you know which lever did the work. Keep your original file untouched in a separate folder the whole time.",
        "Never compress an already compressed copy again and again. Each extra pass eats a little more detail, like photocopying a photocopy. Always start each attempt from the original scan, change one or two settings, and export a fresh result.",
      ],
      steps: [
        "Check the current size and page count, and note the exact limit the portal states.",
        "If the file is colour and the document is black text on white paper, convert to greyscale.",
        "Reduce image resolution to 200 DPI and compress; check the new size.",
        "If still over 100KB, drop to 150 DPI and compress again from the original.",
        "Open the result at 100 percent zoom and read the smallest text, numbers and any seal.",
        "Rename the file clearly and confirm it is under the limit before uploading.",
      ],
    },
    {
      heading: "Staying readable: the checks that matter",
      paragraphs: [
        "A file can pass the size check and still fail the human check. Reviewers reject documents for blurred small print, since footnotes, registration numbers and dates blur first, for a washed out or broken seal and signature, and for moire and shadow that make a document look careless.",
        "Do a proper quality check on the actual compressed file. Open it in a normal PDF reader at 100 percent zoom and read the whole page. Then zoom to 150 percent and look at one dense paragraph and the seal. If a number could be misread, the file is not ready. Go back to the original and save bytes somewhere else, such as cropping empty margins.",
        "Signatures deserve special care, because thin, light strokes are exactly what aggressive compression deletes first. If a signature comes back faint or broken, switch from black and white mode to greyscale. On a multi-page form, treat pages differently where a tool allows it: firm compression for plain text pages, gentler settings for the signed page.",
      ],
      subsections: [
        {
          heading: "Colour seals, photos and ID documents",
          paragraphs: [
            "Some documents genuinely need colour. A colour university seal, or an ID card with coloured security printing, can look wrong in greyscale, and a few portals state that ID copies must be colour. For a one page colour document, 150 DPI colour with medium compression usually lands between 80KB and 130KB. If the photo is the heavy part, shrinking it first with our guide to how to [compress an image to 30KB](/guides/compress-image-to-30kb) can beat compressing the finished PDF.",
          ],
        },
      ],
    },
    {
      heading: "Multi-page documents and portals with several slots",
      paragraphs: [
        "Portals handle multi-document uploads in two ways. Some give you one upload field per document, each with its own size limit. Others give you a single field and expect one merged PDF. Read the form carefully first, because the right strategy is opposite in the two cases. With separate slots, keep quality as high as each budget allows. With one merged slot, your budget is the whole limit divided by total pages.",
        "Worked example: Daniel needed a four page bank statement as one PDF under 100KB. His bank export was born-digital and already only 210KB. Re-exporting at standard compression got him to 96KB, but greyscale image compression applied out of habit turned the logo and one table mushy. Match the method to the file: born-digital files need light touches, scanned files need the DPI and colour treatment.",
        "If a merged document will not fit at readable quality, look for legitimate alternatives first. Many portals accept the same document split across a supporting documents slot, or a ZIP file. Never delete pages the form asks for, or shrink text until it is unreadable. Browse the rest of our [guides](/guides) for the limits other common portals set.",
      ],
    },
    {
      heading: "Common mistakes that keep files too big or too blurry",
      paragraphs: [
        "The most common mistake is scanning at the highest setting because it feels safest. A 600 DPI colour scan can exceed 8 MB, and crushing that down to 100KB destroys detail a modest 200 DPI scan would have kept. Start near your target. The second mistake is screenshotting the PDF into a new document: screenshots are screen resolution, so text turns soft.",
        "Third, people compress the same copy repeatedly. Work from the original each time. Fourth, portals count 100KB differently, as 100,000 or 102,400 bytes, so leave a margin: 95KB or under is a safe finishing line. Fifth, they upload without opening the final file. Sixth, they rename the file with spaces and special characters some older portals reject.",
        "One more mistake is compressing a document that was already small enough. If your exported certificate is 82KB, upload it as it is. Every compression pass is a small quality risk taken for a reason, and when there is no reason, the risk is pure downside. Check the size first, always, before reaching for any tool.",
      ],
    },
    {
      heading: "When 100KB is not enough, and what to do instead",
      paragraphs: [
        "Occasionally a document cannot be both under 100KB and genuinely readable: a detailed engineering drawing, or a page dense with tiny table text. Before concluding that, crop to the document edges, scan on a flatbed rather than photographing the page, flatten the PDF, and remove pages the portal does not ask for.",
        "If it still does not fit, communicate rather than disguise. Many institutions have an email alternative, a help desk that can raise a limit, or a physical submission route. Send the smallest readable version through the portal, and offer the full quality original by email at the same time.",
        "For the everyday case, 100KB is a workable target and thousands of people hit it daily. Get the scan clean, go greyscale, pick 150 to 200 DPI, compress once from the original with the [compress PDF to 100KB tool](/tools/compress-pdf-to-100kb), and do the human check at full zoom.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I compress a PDF to 100KB without losing quality?",
      a: "You cannot compress with literally zero loss when a scan is many times over the limit, but you can lose almost nothing that matters. Convert colour to greyscale, set resolution near 200 DPI for a single page, and compress once from the original scan. Then check the result at 100 percent zoom; for black text on white paper, the difference from the original is usually invisible.",
    },
    {
      q: "Why is my one page scanned certificate 3 MB?",
      a: "Because the scanner stored a photograph of the page, most likely in colour at 300 DPI or higher, with generous quality settings. A colour photograph of an A4 page holds millions of pixels, while the same page as real text would be a few KB. Greyscale and a lower DPI fix almost all of that weight.",
    },
    {
      q: "What DPI should I use for a document that must be under 100KB?",
      a: "For a single page, 200 DPI in greyscale usually fits and stays sharp. For several pages sharing one 100KB budget, 150 DPI greyscale is the practical choice. Below about 120 DPI, small text starts to soften, so treat that as a floor for documents someone must read closely.",
    },
    {
      q: "Should I use black and white mode instead of greyscale?",
      a: "Only for clean typed pages with no photos, stamps or signatures. Black and white mode is smaller, but it can break up light signature strokes and turn seals into solid blobs. Greyscale costs a few more KB and is much safer for anything with a stamp, a photo or handwriting.",
    },
    {
      q: "The portal says 100KB but rejects my 99KB file. Why?",
      a: "Portals and operating systems count a kilobyte differently, and some forms round the limit down or include the file name and metadata in odd ways. Aim for 95KB or less to leave a safe margin. Also check that the form wants a PDF, since a few reject files that were renamed rather than properly converted.",
    },
    {
      q: "Can I compress a PDF to 100KB on my phone?",
      a: "Yes. Most scanner apps let you rescan or export in greyscale at a lower resolution, which does most of the work, and browser based compressors finish the job. The important part is the same on any device: export the smallest version, then open it and read the smallest text before you upload.",
    },
  ],
  relatedSlugs: ["compress-pdf-to-200kb", "compress-image-to-50kb", "compress-image-to-30kb"],
};
