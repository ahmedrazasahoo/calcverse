import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "compress-image-to-30kb",
  keyword: "compress image to 30kb",
  title: "Compress Image to 30KB: How to Fit Job Portal and Admission Form Limits",
  metaTitle: "Compress Image to 30KB: Job and Admission Photo Guide",
  metaDescription: "Learn how to compress an image to 30KB for job portals and admission forms, with JPG quality settings, pixel sizes and worked examples that stay sharp.",
  excerpt: "A 30KB photo limit looks tiny until a portal rejects your upload at midnight. Here is how dimensions, JPG quality and file type really work, with examples for photos, signatures and scans.",
  category: "Files and Converters",
  toolSlug: "compress-image-to-30kb",
  updatedAt: "2026-11-14",
  intro: [
    "You have filled in the whole form, checked every spelling, and reached the final upload box, and then the portal stops you cold: photo must be under 30KB. Your phone photo is 3.8 MB, roughly one hundred and twenty times too large, and the deadline is tonight. That mismatch is normal, not a mistake on your part, and it is fixable in a minute once you know which setting does the heavy lifting. Use the free [compress image to 30KB tool](/tools/compress-image-to-30kb) to shrink the file to the exact target, then read the checks below so the result passes the portal review as well as the size test.",
    "The 30KB limit turns up most often where thousands of people upload at once: government job portals, university and college admission forms, scholarship applications, exam registration pages and public sector recruitment drives. The server has to store a photo for every applicant, so the limit keeps storage and page loading manageable. A clerk reviewing your application does not need a poster sized portrait. They need a small, clear head and shoulders image that prints cleanly on an admit card or identity sheet, and 30KB is plenty for that job if the pixels are used well.",
    "The trap is shrinking the file the wrong way. Dragging a quality slider to the bottom will hit 30KB, but it can leave a face blurred, text on a scanned certificate unreadable, or a signature looking like a grey smudge. Portals reject files for quality as well as size, and a human reviewer may reject them again later. This guide works through a calmer method: set the pixel dimensions first, choose JPG where it fits, pick a sensible quality level, and only then check the final kilobytes. You will see real numbers for a portrait, a signature and a marksheet scan, so you can judge your own file instead of guessing.",
  ],
  keyPoints: [
    "Set pixel dimensions before touching quality: resizing a 4000 pixel wide phone photo to 600 pixels wide removes most of the excess size at once.",
    "JPG suits photos and signatures on plain paper. PNG is usually too heavy for a 30KB target unless the image is a tiny logo or simple graphic.",
    "For a passport style photo at 350 to 450 pixels wide, JPG quality near 70 to 80 often lands close to 30KB and stays clear.",
    "Check the portal rules for width, height, background and file format as well as size. A file can pass the kilobyte test and still be rejected.",
    "Keep the original untouched on your phone or computer. Always compress a copy, so you can start again with different settings if needed.",
  ],
  sections: [
    {
      heading: "Why 30KB, and why it appears on job and admission portals",
      paragraphs: [
        "Thirty kilobytes is a compromise. If 200,000 candidates each upload a 3 MB photo, the server must store about 600 GB of portraits. At 30KB per photo, the same intake needs about 6 GB, and review screens and admit card printing run far faster.",
        "Admission forms use the same reasoning. Capping each photo, signature and thumb impression at 20KB to 50KB keeps the portal responsive during deadline week. Many forms set different limits for different uploads on the same page: the photo might be 30KB, the signature 20KB, and a scanned certificate 200KB as a PDF. Read each row separately.",
        "A standard sized, recent portrait at modest resolution is also easier for software to check for a plain background, a centered face and a matching aspect ratio. Some portals measure pixel dimensions as strictly as file size, which is why instructions often give both, for example 350 pixels wide by 450 pixels tall and under 30KB in JPG format. Treat those three numbers as one specification.",
      ],
      bullets: [
        "Government job portals: photo and signature limits keep huge applicant volumes manageable.",
        "Admission and scholarship forms: small files keep the portal fast during deadline week.",
        "Exam registrations: the photo prints on the admit card, so clarity matters as much as size.",
        "Always note the stated width, height and format beside the size limit before you compress.",
      ],
    },
    {
      heading: "Why your image is so far over the limit in the first place",
      paragraphs: [
        "A modern phone camera is built for large screens and prints, not for a form upload box. A typical rear camera saves at 4080 by 3060 pixels, and 3 MB to 6 MB is an ordinary size. Your 30KB target asks for about one percent of that data, until you remember the portal displays the image at roughly the size of a postage stamp.",
        "Screenshots and scans balloon for different reasons. A screenshot saved as PNG keeps every pixel exact, which is terrible for file size, because PNG cannot discard detail the way JPG can. A scanner set to 600 dots per inch can produce a single A4 certificate over 8 MB. Lowering the scan resolution to 200 dots per inch usually keeps names and seals readable while cutting the size dramatically.",
        "Re saving a file over and over adds a hidden cost. Each time you save a JPG again at low quality, the compression discards a little more detail, like photocopying a photocopy. Start from the original camera file or scan whenever you can. If the only copy arrived through a chat app, check it at full size first, because chat apps often shrink images before you ever see them.",
      ],
    },
    {
      heading: "Pixel dimensions and JPG quality: the two levers that matter",
      paragraphs: [
        "Pixel count is the bigger lever. Halving the width and height quarters the number of pixels, and taking a portrait from 2000 pixels wide down to 500 removes about 94 percent of them. Resizing first almost always beats dropping quality alone.",
        "JPG quality, usually 1 to 100, tells the encoder how much detail it may discard. At quality 90, edges stay crisp but files stay large. At quality 50, busy detail such as hair starts to smear. Quality 70 to 85 keeps faces recognizable at small sizes and usually lands near 30KB.",
        "Take a studio portrait at 1200 pixels by 1500 pixels and 780KB. Resize it to 360 by 450 and save at quality 80: about 32KB to 38KB. Nudge quality to 75 and it falls to 26KB to 30KB, with no visible change at admit card size. Keeping the large width and dropping quality to 30 fits the size but turns the face waxy.",
        "Signatures are mostly white space. A signature cropped tightly at 400 by 150 pixels and saved at quality 80 can be as small as 8KB to 14KB. If yours is still over 30KB, the usual cause is a loose crop with a shadowed border. Crop close to the ink, in good light.",
      ],
      table: {
        caption: "Typical results when the same portrait is prepared in different ways",
        headers: ["Starting point", "Dimensions used", "JPG quality", "Typical result"],
        rows: [
          ["Portal sized portrait", "360 by 450", "80", "About 32KB to 38KB, close"],
          ["Portal sized portrait", "360 by 450", "75", "About 26KB to 30KB, usually passes"],
          ["Tight signature crop", "400 by 150", "80", "About 8KB to 14KB, passes easily"],
        ],
      },
    },
    {
      heading: "How to compress an image to 30KB, step by step",
      paragraphs: [
        "The method below takes about a minute. Check three things at the end, not one: the file size in kilobytes, the pixel dimensions, and how the image looks when you zoom in slightly.",
        "If your first attempt lands at 34KB or 35KB, do not slash the quality to 40. Reduce quality by five points, or trim the width by 20 to 30 pixels, and test again. If it lands at 18KB, you have headroom to raise quality for a clearer face. Aiming for 24KB to 29KB is a sensible target.",
      ],
      steps: [
        "Make a copy of the original and work only on the copy, keeping the original safe.",
        "Crop the copy to the shape the portal asks for, with the face centered.",
        "Resize to the stated pixel dimensions, or to about 350 to 450 pixels wide for a portrait.",
        "Open the [compress image to 30KB tool](/tools/compress-image-to-30kb) and upload the resized copy.",
        "Let the tool target 30KB, then download the result and note its size and dimensions.",
        "Open the downloaded file, zoom to 100 percent, and check eyes, hair edge and any text for blur.",
        "If it is slightly over, lower quality by a small step and repeat. If well under, raise quality once.",
        "Rename the file exactly as the portal requests and upload that file.",
      ],
    },
    {
      heading: "Worked examples: a portrait, a signature and a marksheet scan",
      paragraphs: [
        "Consider Sana, applying for a nursing admission. Her studio photo arrives as a 2400 by 3000 pixel JPG of 2.1 MB, against a light blue background. The rules ask for a white background, 350 by 450 pixels, JPG, under 30KB. Compression cannot fix a background color, so she takes a fresh photo against a white wall in daylight. Resized and compressed at quality near 78, the new file is 27KB and passes.",
        "Now the signature. Sana signs in dark blue ink on white paper, photographs it from directly above, and gets a 1900 pixel by 900 pixel image of 640KB with a grey shadow along one edge. She crops tightly around the signature, straightens it, and resizes to 420 pixels by 160 pixels. The compressed result is 11KB, crisp and clearly hers. For signatures, the crop does more work than the compressor.",
        "The marksheet is the hardest case because it contains small printed text. A color scan at 300 dots per inch gives Sana a 2480 pixel by 3508 pixel page of 5.4 MB, and squeezing that to 30KB as an image would destroy the text. Her form asks for certificates as a PDF under a separate limit, so she follows the guide to [compress PDF to 100KB](/guides/compress-pdf-to-100kb) instead. Where a portal genuinely asks for a certificate as a 30KB image, convert it to grayscale if color is not required and check every mark and the seal at full zoom.",
      ],
    },
    {
      heading: "Mistakes that still get applications rejected",
      paragraphs: [
        "The most common failure is uploading an older compressed copy with a similar name from the downloads folder. Rename the finished file with the size in the name, for example sana-photo-27kb.jpg, and move failed attempts out of that folder.",
        "Selfies cause a second wave of rejections. A front camera selfie at arm length distorts the face and may be flipped left to right. Most instructions ask for a recent studio style portrait with a plain background, taken straight on at eye level, in daylight. A sharp, evenly lit source file survives compression far better than a grainy one.",
        "Watch the edges of the rules. Some portals count 30KB as 30,000 bytes, others as 30,720 bytes, so a file reported as exactly 30.0KB can tip over on theirs. Stay a kilobyte or two under. Some also reject PNG or WebP, or a photo older than three or six months.",
      ],
      bullets: [
        "Do not upload a screenshot of a photo. Screenshots add borders and lose detail.",
        "Do not stretch a small photo up to the requested dimensions. Upscaling adds size, not clarity.",
        "Do not compress the same JPG repeatedly. Go back to the original for each attempt.",
        "Do not leave the file at exactly 30.0KB. Aim for 24KB to 29KB.",
      ],
    },
    {
      heading: "Choosing between 20KB, 30KB and 50KB, and doing a final check",
      paragraphs: [
        "Sibling limits behave differently. A 20KB ceiling forces tighter dimensions, and the guide to [compress image to 20KB](/guides/compress-image-to-20kb) walks through that stricter case. A 50KB ceiling gives breathing room, and the guide to [compress image to 50KB](/guides/compress-image-to-50kb) shows how to spend it on clarity. A 42KB file that would pass a 50KB rule will fail a 30KB rule every time.",
        "Before you submit, run one last pass: confirm the file name and format match the instructions, the size sits between 24KB and 29KB, and the pixel dimensions match the stated width and height. Then open the file fresh and check the face, background color and any required text. That check catches problems a size counter cannot see.",
        "To produce the file itself, go back to the [compress image to 30KB tool](/tools/compress-image-to-30kb), start from your original copy, resize first and adjust quality in small steps. Browse the [guides hub](/guides) if a different document on your form has a different limit.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I compress an image to 30KB without it looking blurry?",
      a: "Resize first, then compress. Bring a portrait down to about 350 to 450 pixels wide before you touch quality, then save as JPG near quality 75 to 80. Most blur comes from keeping huge dimensions and dropping quality sharply, or from compressing a copy that was already compressed several times.",
    },
    {
      q: "What pixel size works best for a 30KB passport style photo?",
      a: "A size of 350 pixels by 450 pixels is the most common portal specification and fits the target well. At JPG quality around 75, most plain background portraits at those dimensions land between 24KB and 30KB while keeping the face clear at admit card size.",
    },
    {
      q: "Should I use JPG or PNG to reach 30KB?",
      a: "Use JPG for photos, signatures on paper and scans, because JPG discards fine detail gradually and reaches small sizes without harsh artifacts. PNG keeps every pixel exact, so a photo in PNG will usually be several times larger. Keep PNG for tiny logos or simple graphics with flat colors and sharp edges.",
    },
    {
      q: "Why does the portal still reject my photo after it passes 30KB?",
      a: "Size is only one rule. Portals also check pixel dimensions, format, background color, how recent the photo is and whether a face is clearly visible and centered. Read the instructions beside the upload box again and match each point, then check the preview the portal shows before you submit the form.",
    },
    {
      q: "Can I compress a scanned certificate to 30KB as an image?",
      a: "Only with real caution. A full page of small text squeezed to 30KB as an image often becomes unreadable, which leads to rejection at document verification. Most forms want certificates as a PDF under a separate, larger limit. Follow that route when it is offered and reserve 30KB images for photos and signatures.",
    },
    {
      q: "My file is 31KB or 32KB. What is the smallest change that fixes it?",
      a: "Make a small move, not a drastic one. Lower JPG quality by about five points, or reduce the width by 20 to 30 pixels, then export again from the original copy. Aim for 24KB to 29KB rather than exactly 30KB, since portals differ slightly in how they count a kilobyte.",
    },
  ],
  relatedSlugs: ["compress-image-to-20kb", "compress-image-to-50kb", "compress-pdf-to-100kb"],
};
