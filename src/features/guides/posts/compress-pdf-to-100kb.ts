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
        "Open a typical problem file and you can guess its story from its size alone. A single scanned page in colour at 300 DPI holds roughly 2,500 by 3,500 pixels. Stored as a lightly compressed JPEG, that is often 800KB to 1.5 MB for one page. A three page scanned degree transcript can easily reach 4 MB. By contrast, the same three pages as a born-digital PDF, where the words are real text, might total 60KB. The words did not change. The storage method did, and that gap of 50 times or more is the whole ballgame when your limit is 100KB.",
        "Three settings drive the weight of a scanned page. The first is resolution, measured in DPI, or dots per inch. Doubling the DPI quadruples the pixel count, because both width and height double, so a 300 DPI page holds four times the data of a 150 DPI page. The second is colour depth. A colour scan stores three channels of information for every pixel, a greyscale scan stores one, and a pure black and white scan stores a fraction of that. The third is compression quality. A scanner or app set to maximum quality keeps fine detail you will never see on screen, at a large cost in bytes. Background texture matters too: a scan of a page on a grey, shadowed background forces the compressor to store all that noise, while a clean white background compresses to almost nothing.",
        "Not every heavy PDF is a scan, though. Certificates designed in graphics software can hide surprises: a full page background photograph, an embedded high resolution logo repeated on every page, or fonts embedded in full when only a few characters are used. Photographs pasted into a Word document and then exported are another classic culprit, because Word keeps the original camera resolution even when the picture is shown small on the page. If your file was never printed and scanned, check for big embedded images first. Our guide to how to [compress a PDF to 200KB](/guides/compress-pdf-to-200kb) walks through that born-digital case in more detail, including what to do when the 200KB limit gives you a little more room to work with.",
      ],
      bullets: [
        "A 300 DPI colour scan of one A4 page: roughly 800KB to 1.5 MB as a PDF page.",
        "The same page at 150 DPI in greyscale: often 40KB to 90KB, small enough for most 100KB limits.",
        "Real text in a born-digital PDF: a few KB per page, which is why typed documents rarely hit limits.",
        "Phone scanner apps at default settings usually produce colour, high DPI files unless you change them.",
      ],
    },
    {
      heading: "The settings that get a scan under 100KB",
      paragraphs: [
        "Think of the 100KB budget as something you spend across your pages. A one page certificate has the full budget for itself, so it can afford 200 DPI greyscale and still land near 70KB to 90KB. A four page document has about 25KB per page, which pushes you toward 150 DPI greyscale and firmer compression. Page count is therefore the first question to ask. People often panic over a five page file that was never going to fit in one upload slot, when the portal actually expects the certificate in one slot and the transcript in another, each with its own 100KB allowance.",
        "Work through the levers in this order, because the early ones cost you the least quality. First, convert colour to greyscale unless the portal explicitly demands colour. Most certificates, transcripts and ID documents are black text on white paper, and the colour in the scan is mostly scanner noise and paper tint. Greyscale typically removes 50 to 70 percent of the size in one move. Second, set resolution near 150 to 200 DPI. At 150 DPI, a page of printed text is still perfectly legible on screen and in print at normal size. Third, only if you are still over the limit, increase image compression, which trades a little sharpness around letter edges for a smaller file. Fourth, clean up the scan itself: crop away desk edges and shadows, straighten the page, and let the app boost contrast so the background goes properly white.",
        "Here is a worked example. Fatima scanned her one page matriculation certificate on a phone app at default settings and got a 2.8 MB colour file for a university portal with a 100KB limit. Converting to greyscale brought it to about 950KB. Reducing resolution from roughly 350 DPI to 200 DPI brought it near 320KB. A stronger compression pass with the [compress PDF to 100KB tool](/tools/compress-pdf-to-100kb) finished at 88KB. She then zoomed in on the result: her name, roll number and the board seal were all crisp. Total time, under five minutes, and most of it was checking rather than compressing. If your problem file is a single photo rather than a PDF, the same greyscale and resolution logic applies, and our guide to how to [compress an image to 50KB](/guides/compress-image-to-50kb) shows the numbers for JPG files.",
      ],
      table: {
        caption: "Typical sizes for one scanned A4 page under different settings",
        headers: ["Scan settings", "Typical size", "Readable for documents?"],
        rows: [
          ["Colour, 300 DPI, high quality", "800KB to 1.5 MB", "Yes, but far over a 100KB limit"],
          ["Colour, 200 DPI, medium quality", "250KB to 450KB", "Yes, still too big for one page at 100KB"],
          ["Greyscale, 200 DPI, medium quality", "90KB to 160KB", "Yes, close to the limit"],
          ["Greyscale, 150 DPI, medium quality", "40KB to 90KB", "Yes, the usual sweet spot"],
          ["Black and white, 200 DPI", "25KB to 60KB", "Fine for plain text, risky for photos and seals"],
          ["Black and white, 150 DPI", "15KB to 40KB", "Fine for typed text only, stamps can suffer"],
        ],
      },
    },
    {
      heading: "A step-by-step routine for a stubborn file",
      paragraphs: [
        "When a file refuses to shrink, guessing at settings wastes time. Follow a fixed routine instead, checking the size after each pass so you know which lever did the work. The routine below assumes a scanned document of one to six pages, which covers most certificates, transcripts, CNIC or passport copies and signed forms. Keep your original file untouched in a separate folder the whole time. You may need it again if a portal later asks for a higher quality copy, and re-scanning is always more annoying than re-compressing.",
        "Notice what the routine does not do: it never compresses an already compressed copy again and again. Each extra pass over a JPEG image eats a little more detail, a bit like photocopying a photocopy. Always start each attempt from the original scan, change one or two settings, and export a fresh result. That single habit explains the difference between people whose 90KB files look clean and people whose 90KB files look like they were faxed in 1994.",
      ],
      steps: [
        "Check the current size and page count, and note the exact limit and format the portal states.",
        "If the file is colour and the document is black text on white paper, convert it to greyscale.",
        "Reduce image resolution to 200 DPI and compress; check the new size.",
        "If still over 100KB, drop to 150 DPI and compress again from the original file.",
        "Open the result at 100 percent zoom and read the smallest text, every number and any seal or signature.",
        "Rename the file clearly, for example Ahmed-Certificate-100KB.pdf, and confirm it is under the limit before uploading.",
      ],
    },
    {
      heading: "Staying readable: the checks that matter",
      paragraphs: [
        "A file can pass the portal size check and still fail the human check that follows. Reviewers reject compressed documents for three reasons, and all three are visible if you know where to look. The first is blurred small print: footnotes, registration numbers and dates are usually the smallest text on a certificate, so they blur first. The second is a washed out or broken seal and signature. A stamp that turns into a grey smudge invites suspicion, especially on attested copies. The third is moire and shadow: patterns from the scanner and dark corners make a document look careless even when the words are sharp.",
        "Do a proper quality check every time, on the actual compressed file, not the preview inside the compressor. Open it in a normal PDF reader, set zoom to 100 percent, and read the whole page the way a stranger would. Then zoom to 150 percent and look at one dense paragraph and the seal. Letters should have clean edges without fuzzy halos, and the background should be white or light grey, not blotchy. If a number could be misread, a 6 that looks like an 8, for example, the file is not ready, no matter how small it is. Go back to the original scan, ease off the compression, and try saving bytes somewhere else, such as cropping empty margins, which shrinks the image without touching the text at all.",
        "Signatures deserve special care. A signature is thin, light strokes, exactly the kind of detail aggressive compression deletes first. If your signed form comes back with a signature that looks faint or broken, switch from black and white mode to greyscale, which preserves those light strokes, and accept a slightly larger file. On a multi-page form, you can also treat pages differently where a tool allows it: firm compression for the plain text pages, gentler settings for the signed page. The limit applies to the whole file, so bytes saved on boring pages buy quality for the page that matters.",
      ],
      subsections: [
        {
          heading: "Colour seals, photos and ID documents",
          paragraphs: [
            "Some documents genuinely need colour. A passport style photograph pasted on a form, a colour university seal, or an ID card with a colour photo and coloured security printing can all look wrong in greyscale, and a few portals state plainly that ID copies must be colour. For a one page colour document, 150 DPI colour with medium compression usually lands between 80KB and 130KB, which is close enough that cropping margins and cleaning the background often gets you the rest of the way. If the photo is the heavy part, shrinking a separate photo first with our guide to how to [compress an image to 30KB](/guides/compress-image-to-30kb) and then rebuilding the page can beat compressing the finished PDF, because you control exactly where the bytes go.",
          ],
        },
      ],
    },
    {
      heading: "Multi-page documents and portals with several slots",
      paragraphs: [
        "Transcripts, bank statements and experience letters rarely travel alone, and portals handle them in two different ways. Some give you one upload field per document, each with its own size limit. Others give you a single field for everything and expect one merged PDF. Read the form carefully before you compress anything, because the right strategy is opposite in the two cases. With separate slots, compress each document to fit its own limit and keep quality as high as each budget allows. With one merged slot, your real budget is the whole limit divided by total pages, and a six page statement at 100KB means roughly 16KB per page, which needs 150 DPI greyscale and a clean, shadow free scan to stay readable.",
        "Worked example: Daniel needed to upload a four page bank statement as one PDF under 100KB for a rental application. His bank export was born-digital and already only 210KB, because it was text with a small logo. Stripping nothing but the embedded full font set and re-exporting at standard compression got him to 96KB, but he then applied greyscale image compression out of habit and the bank logo and one table turned mushy. The lesson is to match the method to the file. Born-digital files usually need light touches: remove duplicate embedded images, subset fonts, flatten form fields. Scanned files need the DPI and colour treatment. Applying scan medicine to a digital file just damages it.",
        "If a merged document simply will not fit at readable quality, look for legitimate alternatives before you butcher the file. Many portals accept the same document split across an extra documents or supporting documents slot. Some accept a ZIP file. Some have a higher limit on the desktop site than on the mobile app, odd as that sounds. What you should never do is delete pages the form asks for, or shrink text until it is decorative rather than readable. A rejected document costs you days; a slightly awkward upload arrangement costs you minutes. Browse the rest of our [guides](/guides) for the limits other common portals set, because the same document often needs different versions for different forms.",
      ],
    },
    {
      heading: "Common mistakes that keep files too big or too blurry",
      paragraphs: [
        "The most common mistake is scanning at the highest setting because it feels safest. A 600 DPI colour scan of a certificate can exceed 8 MB, and from that starting point people apply brutal compression to reach 100KB, which destroys detail that a modest 200 DPI scan would have kept easily at the same final size. Start near your target. A clean scan at sensible settings beats a giant scan crushed down, every time. The second mistake is screenshotting the PDF and pasting the screenshot into a new document. Screenshots are screen resolution, so text that looked fine on your monitor turns soft in the file, and the size is often not even smaller.",
        "Third, people compress the same copy repeatedly, as mentioned earlier, and wonder why the fifth version looks dreadful. Work from the original each time. Fourth, they forget that some portals count 100KB as 100,000 bytes while others count it as 102,400 bytes, and a file at exactly 100.5KB on your computer can be rejected. Leave a margin: 95KB or under is a safe finishing line. Fifth, they upload without opening the final file, so the first person to discover that page two is upside down or blank is the reviewer. Sixth, they rename the file with spaces and special characters that some older portals reject; plain names with hyphens are safest.",
        "One more mistake is subtler: compressing a document that was already small enough. If your exported certificate is 82KB, upload it as it is. Every compression pass is a small quality risk taken for a reason, and when there is no reason, the risk is pure downside. Check the size first, always, before reaching for any tool. A surprising number of born-digital documents already sit under 100KB, especially single page letters and certificates generated by universities and employers directly as PDFs.",
      ],
    },
    {
      heading: "When 100KB is not enough, and what to do instead",
      paragraphs: [
        "Occasionally the honest answer is that a document cannot be both under 100KB and genuinely readable: a detailed engineering drawing, a page dense with tiny table text, or a certificate with a full colour background design. Before concluding that, exhaust the fair options. Crop to the document edges so no bytes are spent on desk and shadow. Scan on a flatbed rather than photographing the page, because even lighting and a white background compress far better. Flatten the PDF so layers and editing data are removed. Remove any pages the portal does not ask for, such as blank backs of pages that some scanners add automatically.",
        "If it still does not fit, communicate rather than disguise. Many institutions have an email alternative for oversized documents, a help desk that can raise a limit, or a physical submission route. Send the smallest readable version through the portal so the application is complete, and offer the full quality original by email at the same time, noting the file name and size. Reviewers deal with this daily and generally prefer that honesty over an unreadable upload. Keep both versions, the compressed one and the original, in a clearly named folder until your application is fully decided.",
        "For the everyday case, though, which is a scanned certificate, transcript or signed form of a few pages, 100KB is a workable target and thousands of people hit it daily. Get the scan clean, go greyscale, pick 150 to 200 DPI, compress once from the original with the [compress PDF to 100KB tool](/tools/compress-pdf-to-100kb), and then do the human check at full zoom. That routine, done calmly, solves the red error message without creating a worse problem at the review desk.",
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
