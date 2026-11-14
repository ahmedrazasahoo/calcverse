import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "compress-image-to-20kb",
  keyword: "compress image to 20kb",
  title: "Compress Image to 20KB: Get Signatures and ID Photos Under Tiny Limits",
  metaTitle: "Compress Image to 20KB: Guide to Tiny Upload Limits",
  metaDescription: "Learn how to compress an image to 20KB for signatures, passport photos and exam forms, with resizing tips, format choices and fixes for rejected uploads.",
  excerpt: "Why exam forms, visa portals and job applications insist on a 20KB image, and how to hit that tiny target without making your photo or signature unreadable.",
  category: "Files and Converters",
  toolSlug: "compress-image-to-20kb",
  updatedAt: "2026-11-14",
  intro: [
    "You have filled in the whole form, checked every detail twice, and then the last box stops you cold: upload a photo under 20KB, or a signature under 20KB, and your perfectly good phone picture is 2.4 MB. That gap feels absurd the first time you meet it, but it is routine on exam applications, government ID portals, scholarship forms and older recruitment sites that were built for slow connections and small server storage. The file is not being judged on how nice it looks on your phone. It is being judged on whether it fits a strict box the portal was programmed to enforce.",
    "The good news is that 20KB is very doable once you understand the trade you are making. You are not just lowering quality with one slider. You are combining three levers: pixel dimensions, file format and compression quality, and at this size the order matters. Shrink the dimensions first, pick the right format second, and only then lower quality. If you start with the quality slider on a huge photo, you will get a blurry mess that is still too big. Use the free [compress image to 20KB tool](/tools/compress-image-to-20kb) to test the combination in seconds, then read the sections below so you know why one attempt passes and the next one gets rejected.",
    "This guide walks through the jobs that most often demand 20KB, what the number actually means in pixels, and three worked examples with real starting sizes. It also covers the quiet reasons portals reject files that look correct, such as the wrong dimensions, a PNG saved where a JPG was expected, or a signature with so much white border that the writing itself ends up tiny. By the end you should be able to prepare a photo, a signature and a scanned document sketch that all pass on the first upload.",
  ],
  keyPoints: [
    "Resize first, compress second: cutting dimensions saves far more space than lowering quality alone, and it protects sharpness where it matters.",
    "JPG is almost always the right format at 20KB for photos and signatures; PNG is useful for crisp line art but it is usually too heavy for photographs.",
    "A signature at 20KB wants a tight crop with very little white border, while a face photo wants correct proportions and a plain background kept intact.",
    "Portals check more than file size: dimensions in pixels, format, and sometimes color mode can all cause a rejection even when the size is right.",
    "Always keep an untouched copy of the original scan or photo, because a 20KB file cannot be enlarged back into a high quality print later.",
  ],
  sections: [
    {
      heading: "Why so many forms still insist on 20KB",
      paragraphs: [
        "A 20KB limit sounds like a leftover from the dial up era, and in many cases it is. Exam boards, civil service commissions and university admission systems often run software that has barely changed in a decade. If 200,000 candidates each upload a 20KB photo, the total is about 4 GB. At 2 MB per phone photo, it would be about 400 GB.",
        "The limit also acts as a crude standard. A passport style photo does not need millions of pixels, because it will only ever be printed small on an admit card or ID card, or shown as a thumbnail. A signature appears as an even smaller strip under a declaration.",
      ],
    },
    {
      heading: "What 20KB really means for pixels and quality",
      paragraphs: [
        "Kilobytes measure file weight, not picture size on screen, and confusing the two is where most failed attempts begin. A phone photo at 4000 by 3000 pixels holds 12 million pixels. Forcing that detail into 20KB makes faces turn soft and text unreadable. The same budget spent on a 350 by 450 pixel image, about 157,500 pixels, is far more comfortable: edges stay clean and the result looks sharp at the size it will actually be used.",
        "Format changes the maths. JPG was designed for photographs: it discards subtle colour variation the eye barely notices. PNG keeps every pixel faithful, which is great for a logo but wasteful for a face photo, often five to ten times heavier at the same dimensions. Grayscale is another quiet saver for signatures and text scans, cutting 20 to 40 percent of the weight with no loss that matters.",
      ],
      table: {
        caption: "Typical results when the same portrait is saved at different sizes and formats",
        headers: ["Image setup", "Dimensions", "Format", "Typical weight"],
        rows: [
          ["Original phone photo", "4000 by 3000", "JPG high quality", "1800KB to 3500KB"],
          ["Resized only, high quality", "350 by 450", "JPG quality 90", "45KB to 70KB"],
          ["Resized, balanced quality", "350 by 450", "JPG quality 70", "16KB to 24KB"],
          ["Resized, same dimensions", "350 by 450", "PNG", "120KB to 220KB"],
          ["Small signature crop", "280 by 120", "JPG quality 75", "8KB to 15KB"],
          ["Full A4 scan, unreadable if forced", "2480 by 3508", "JPG quality 30", "Still often above 60KB and blurry"],
        ],
      },
    },
    {
      heading: "How to get under 20KB without wrecking the image",
      paragraphs: [
        "Start from the cleanest original you have, not a screenshot or a copy already compressed by a messaging app. Work through the levers in order and check the weight after each change, rather than dragging every setting to its extreme. The portal only cares that you are at or under the limit, so aim for 17KB to 19.5KB to use the full budget with a small safety margin.",
        "If you also handle larger limits on other forms, the same method scales up. Our guide on how to [compress image to 50KB](/guides/compress-image-to-50kb) covers uploads that allow a bit more detail, and the companion guide to [compress image to 30KB](/guides/compress-image-to-30kb) covers the in between case many university forms use. The resize first habit works for all three targets.",
      ],
      steps: [
        "Check the form instructions and note all three requirements: maximum file weight, exact pixel dimensions if given, and required format, usually JPG or JPEG.",
        "Crop tightly before resizing: remove extra wall around a portrait and extra white paper around a signature, but keep the required head and shoulders framing for ID photos.",
        "Resize to the requested dimensions, or to about 350 by 450 pixels for a standard portrait and about 280 by 120 pixels for a signature if no dimensions are stated.",
        "Save or export as JPG and start at quality 75. Check the file weight in your file manager before uploading anywhere.",
        "If the file is still above 20KB, lower quality in small steps to 65, then 55. If it is still heavy, reduce dimensions by about 10 percent and try again.",
        "If the file is far below 20KB, for example under 10KB, raise quality a little to use the budget and keep faces and handwriting crisp.",
        "Zoom in to 100 percent and confirm the face is recognizable, eyes are clear, and every stroke of the signature is unbroken, then upload promptly.",
      ],
    },
    {
      heading: "Signatures, portraits and documents need different tactics",
      paragraphs: [
        "Each type of image fails in a different way. A signature rewards a tight crop and strong contrast. A portrait rewards correct proportions and the background the portal expects. A document scan rewards honesty: some pages simply do not belong at 20KB at all.",
      ],
      subsections: [
        {
          heading: "Signatures: crop tight and protect the strokes",
          paragraphs: [
            "A signature file fails most often because of empty space. Photograph a full A4 sheet and squeeze the whole sheet to 20KB, and the signature inside may end up only 60 pixels wide, thin and broken. Crop so the signature fills most of the frame, leaving a small white margin of roughly 5 to 10 percent of the width. At about 300 by 130 pixels you will typically land between 8KB and 16KB with handwriting intact.",
          ],
        },
        {
          heading: "Portraits: keep proportions and background exactly as asked",
          paragraphs: [
            "Portrait portals often validate dimensions automatically and reject the wrong shape even at the perfect weight. If the instructions say 350 by 450 pixels with a plain white or light background, do not upload a square selfie or a photo cut from a group picture. If the file sits at 23KB, trimming dimensions to 320 by 410 pixels usually saves the last few kilobytes with no visible change.",
          ],
        },
        {
          heading: "Scans and certificates: know when 20KB is the wrong tool",
          paragraphs: [
            "A full page certificate with small print, seals and a photograph cannot stay readable at 20KB. If a form seems to ask for one, reread the instructions: often the 20KB row applies only to the photo or signature, while certificates have a separate PDF upload allowing 200KB or more. In that case prepare the document as a PDF instead, following our guide to [compress PDF to 200KB](/guides/compress-pdf-to-200kb). If only a stamp or thumb impression is needed as an image, crop to just that element rather than the whole page.",
          ],
        },
      ],
    },
    {
      heading: "Three worked examples from real starting files",
      paragraphs: [
        "Example one is a portrait for an exam application. Sara's phone produced a 3264 by 2448 pixel JPG weighing 2,180KB. She cropped out the extra room behind her, resized to 350 by 450 pixels, and exported at quality 80, which gave 28KB.",
        "Example two is a signature for a bank recruitment form. Daniel signed on lined notebook paper and the lines added detail the encoder had to store, giving 34KB at 600 by 260 pixels. He retook the signature on plain white paper with a black gel pen, cropped to 300 by 130 pixels, converted to grayscale, and exported at quality 72. The new file weighed 11.4KB and looked cleaner than the heavier first attempt.",
        "Example three shows the boundary case. A scholarship form asked Joseph for a thumb impression under 20KB and his mark sheet as a PDF under a much larger limit. The thumb impression, cropped at 200 by 240 pixels, compressed to 13.7KB at quality 70 with the ridge pattern still visible. The mark sheet belonged in the PDF slot, not the image slot. Splitting the uploads correctly got his application accepted. More upload tasks like these sit on the [guides hub](/guides).",
      ],
    },
    {
      heading: "Mistakes that get uploads rejected even at the right size",
      paragraphs: [
        "The most frustrating rejection is the file that shows 19KB on your laptop and still fails. One common cause is a format mismatch hiding behind a renamed file. Renaming photo.png to photo.jpg does not convert the file: the portal reads the internal format and rejects a PNG wearing a JPG name. A second cause is dimensions: some portals accept only an exact size such as 200 by 230 pixels and reject 201 by 230 without explaining why.",
        "Orientation and lighting cause quieter failures. A portrait saved sideways because the phone stored rotation in metadata can upload rotated on an older portal. Very dark or pale portraits also draw manual rejections later, because a reviewer cannot match the face to an ID. Keep the face evenly lit, avoid sunglasses and beauty filters, and never overwrite your only original with the compressed version. Save each version with the limit in its name, for example portrait-20kb.jpg.",
      ],
      bullets: [
        "Renaming a PNG to JPG without converting it, so the portal rejects the hidden format.",
        "Matching the weight but missing exact pixel dimensions the form requires.",
        "Leaving huge white borders around a signature, so the writing itself becomes too small to verify.",
        "Using a filtered or group cropped selfie where a plain, front facing portrait was specified.",
        "Overwriting the original photo with the 20KB version and having no clear copy left for the next form.",
      ],
    },
    {
      heading: "Checking your file properly before you submit",
      paragraphs: [
        "A one minute check saves the most common resubmission delays. Confirm three numbers: weight at or under 20KB, dimensions matching the instructions, and format shown as JPEG or JPG. Then open the file at full size and look at it as a reviewer would. Can you recognize the person instantly? If any answer is no, fix the source photo or the crop rather than pushing compression harder.",
        "Judge your file locally, not by a fuzzy preview thumbnail inside the form,. If the portal offers a final review page showing photo and signature together, use it: many candidates discover only there that they swapped the two files. Once your file passes, run the final version through the [compress image to 20KB tool](/tools/compress-image-to-20kb), download the result with a clear name, and upload that exact file rather than an earlier draft in the same folder.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I compress an image to 20KB without it looking blurry?",
      a: "Resize the image to the dimensions the form actually needs before you lower quality. A portrait at 350 by 450 pixels compressed at quality around 65 to 75 will look sharp at admit card size and usually lands just under 20KB, while a full phone photo forced to 20KB without resizing will always look blurry.",
    },
    {
      q: "Should I use JPG or PNG to reach 20KB?",
      a: "Use JPG for portraits and for most signatures, because it stores photographs far more efficiently. PNG keeps every pixel exact and is often five to ten times heavier at the same dimensions, so reserve it for simple logos or line art when the form explicitly asks for PNG.",
    },
    {
      q: "What dimensions work best for a 20KB passport style photo?",
      a: "Follow the dimensions printed in the form instructions whenever they are given, because many portals validate them exactly. If no size is stated, 350 by 450 pixels is a widely accepted portrait shape that compresses comfortably to under 20KB while staying clear enough for ID printing.",
    },
    {
      q: "Why was my 19KB file still rejected by the portal?",
      a: "Size is only one check. Rejections at the correct weight usually come from wrong pixel dimensions, a PNG file renamed as JPG, a rotated image, or a photo that breaks content rules such as sunglasses or a busy background. Recheck format, dimensions and framing, then export a fresh JPG rather than renaming the old file.",
    },
    {
      q: "Can I enlarge a 20KB image back to high quality later?",
      a: "No. Compression to 20KB discards detail permanently, and enlarging the small file only stretches the remaining pixels. Always keep the untouched original photo or scan in a separate folder and treat the 20KB version as a disposable upload copy made only for that form.",
    },
  ],
  relatedSlugs: ["compress-image-to-50kb", "compress-image-to-30kb", "compress-pdf-to-200kb"],
};
