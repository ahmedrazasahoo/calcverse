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
        "Thirty kilobytes is a compromise worked out by whoever runs the portal. Multiply it out and the logic becomes clear. If 200,000 candidates apply for a set of government posts and each uploads a 3 MB phone photo, the server must store about 600 GB of portraits alone, before signatures and certificates are added. At 30KB per photo, the same intake needs about 6 GB. Backups, review screens and admit card printing all run faster at the smaller size, and applicants on slow connections can actually finish the form. The limit is about scale, not about making your life difficult, even though it can feel that way at 11 pm.",
        "Admission forms use the same reasoning with a different calendar pressure. A university may open applications for six weeks and receive most uploads in the final three days. Capping each photo, signature and thumb impression at 20KB to 50KB keeps the portal responsive during that rush. Many forms set different limits for different uploads on the same page: the photo might be 30KB, the signature 20KB, and a scanned certificate 200KB as a PDF. Read each row separately instead of assuming one number covers everything, because uploading the right file in the wrong box is a common and avoidable rejection.",
        "There is also an identity reason. A standard sized, recent portrait at a modest resolution is easier for software to check for a plain background, a centered face and a matching aspect ratio. Some portals run an automatic check the moment you upload, and they measure pixel dimensions as strictly as file size. That is why the instructions often give both, for example 350 pixels wide by 450 pixels tall and under 30KB in JPG format. Treat those three numbers as one specification, not as optional hints, and you will clear most checks on the first attempt.",
      ],
      bullets: [
        "Government job portals: photo and signature limits keep huge applicant volumes manageable.",
        "Admission and scholarship forms: small files keep the portal fast during deadline week.",
        "Exam registrations: the photo often prints on the admit card, so clarity matters as much as size.",
        "Always note the stated width, height and format beside the size limit before you compress anything.",
      ],
    },
    {
      heading: "Why your image is so far over the limit in the first place",
      paragraphs: [
        "A modern phone camera is built to capture detail for large screens and prints, not for a form upload box. A typical rear camera saves a photo at 4080 pixels by 3060 pixels, about 12.5 million pixels in total. Each pixel carries color data, and a JPG also stores camera notes, location tags and a thumbnail copy inside the same file. Add sharp detail in hair, fabric and a busy background, and 3 MB to 6 MB is an ordinary size. Your 30KB target asks for about one percent of that data, which sounds brutal until you remember the portal will display the image at roughly the size of a postage stamp.",
        "Screenshots and scans balloon for different reasons. A screenshot saved as PNG keeps every pixel exact, which is wonderful for text on a screen and terrible for file size, because PNG cannot discard detail the way JPG can. A scanner set to 600 dots per inch produces a huge page image: a single A4 certificate scanned in color at that setting can pass 8 MB. The scanner was not wrong, it was set for archiving, not uploading. Lowering the scan resolution to 200 dots per inch for an upload copy usually keeps names and seals readable while cutting the size dramatically.",
        "Re saving a file over and over adds another hidden cost. Each time you open a JPG, edit it and save it again at a low quality, the compression discards a little more detail, like photocopying a photocopy. That is why a photo that has passed through two messaging apps and a crop tool can look soft even before you compress it. Start from the original camera file or the original scan whenever you can. If the only copy you have is one that arrived through a chat app, check it at full size first, because chat apps often shrink images to about 1600 pixels wide and compress them before you ever see them.",
      ],
    },
    {
      heading: "Pixel dimensions and JPG quality: the two levers that matter",
      paragraphs: [
        "File size is driven mainly by two things: how many pixels the image contains, and how hard the JPG encoder squeezes each pixel. Pixel count is the bigger lever. Halving the width and height quarters the number of pixels, because area shrinks in both directions at once. Taking a portrait from 2000 pixels wide down to 500 pixels wide removes about 94 percent of the pixels before quality settings enter the picture at all. That is why resizing first almost always beats dropping quality alone, and why a photo squeezed only with a quality slider often ends up both large and ugly.",
        "JPG quality is a scale, usually 1 to 100, that tells the encoder how much fine detail it may discard. At quality 90, edges stay crisp but files stay large. At quality 50, flat areas such as skies, walls and plain backgrounds compress very well, while busy detail such as hair, leaves or patterned clothing starts to smear. The useful range for portal photos sits in the middle. Quality 70 to 85 keeps faces recognizable and eyes sharp at small display sizes, and for a correctly sized portrait it usually lands near the 30KB mark without extreme measures.",
        "A worked example makes this concrete. Take a studio portrait saved at 1200 pixels by 1500 pixels and 780KB. Resize it to 360 pixels by 450 pixels, the size many portals request, and save as JPG at quality 80: the result is about 32KB to 38KB for most plain backgrounds. Nudge quality to 75 and it typically falls to 26KB to 30KB, with no visible change at admit card size. Now compare the lazy route: keep the 1200 pixel width and drop quality to 30 to force 30KB. The file fits, but the face turns waxy and the ears and hairline blur into the background. Same target size, very different outcome, and the difference came from choosing dimensions first.",
        "Signatures behave differently because they are mostly white space with a dark line. A signature cropped tightly at 400 pixels by 150 pixels and saved as JPG at quality 80 can be as small as 8KB to 14KB, because white areas cost almost nothing to store. If your signature file is still over 30KB, the usual cause is a loose crop with a big shadowed border from the desk or table around the paper. Crop close to the ink, use a plain white sheet in good light, and the size problem often solves itself before compression begins.",
      ],
      table: {
        caption: "Typical results when the same portrait is prepared in different ways",
        headers: ["Starting point", "Dimensions used", "JPG quality", "Typical result"],
        rows: [
          ["Phone photo, 3.8 MB", "4080 by 3060", "90", "Far over 30KB, no resize done"],
          ["Phone photo, cropped", "800 by 1000", "80", "About 110KB to 160KB, still over"],
          ["Portal sized portrait", "360 by 450", "80", "About 32KB to 38KB, close"],
          ["Portal sized portrait", "360 by 450", "75", "About 26KB to 30KB, usually passes"],
          ["Tight signature crop", "400 by 150", "80", "About 8KB to 14KB, passes easily"],
        ],
      },
    },
    {
      heading: "How to compress an image to 30KB, step by step",
      paragraphs: [
        "The method below works for a phone photo, a studio scan or a signature, and it takes about a minute once you have done it once. The key habit is checking three things at the end, not one: the file size in kilobytes, the pixel dimensions, and how the image looks when you open it and zoom in slightly. A file that passes only the first check can still disappoint you at review stage, when fixing it may no longer be possible because the application window has closed.",
        "If your first attempt lands at 34KB or 35KB, do not panic and do not slash the quality to 40. Small misses need small moves. Reduce quality by five points, or trim the width by 20 to 30 pixels, and test again. If the attempt lands at 18KB, you have headroom to spare, and you can afford to raise quality a little for a clearer face. Aiming for 24KB to 29KB is a sensible target: safely under the limit, with a buffer in case the portal counts size slightly differently, and with better quality than a file squeezed down to 12KB for no reason.",
      ],
      steps: [
        "Make a copy of the original photo or scan and work only on the copy, keeping the original safe.",
        "Crop the copy to the shape the portal asks for, usually a vertical portrait, with the face centered and some space above the head.",
        "Resize to the stated pixel dimensions if the portal gives them, or to about 350 to 450 pixels wide for a standard portrait.",
        "Open the [compress image to 30KB tool](/tools/compress-image-to-30kb) and upload the resized copy.",
        "Let the tool target 30KB, then download the result and note its exact size and dimensions.",
        "Open the downloaded file, zoom to 100 percent, and check eyes, hair edge and any text or signature strokes for blur.",
        "If it is slightly over, lower quality by a small step and repeat. If it is well under, raise quality once for a clearer result.",
        "Rename the file exactly as the portal requests, for example photo.jpg or your application number, and upload that file.",
      ],
    },
    {
      heading: "Worked examples: a portrait, a signature and a marksheet scan",
      paragraphs: [
        "Consider an applicant, Sana, applying for a nursing admission. Her studio photo arrives as a 2400 pixel by 3000 pixel JPG of 2.1 MB, taken against a light blue background because the studio used its default backdrop. The admission rules ask for a white background, 350 pixels by 450 pixels, JPG, under 30KB. Compression alone cannot fix a background color, so Sana first uses a plain white wall at home, takes a fresh photo in daylight facing a window, and crops it to the requested ratio. Resized to 350 by 450 and compressed at quality near 78, the new file is 27KB. It passes the size check, matches the stated dimensions, and shows a face the reviewers can match against her identity card at the interview.",
        "Now a different upload on the same form: the signature. Sana signs in dark blue ink on white paper, photographs it from directly above, and gets a 1900 pixel by 900 pixel image of 640KB with a grey shadow along one edge. Instead of compressing that whole frame, she crops tightly around the signature, straightens it, and resizes to 420 pixels by 160 pixels. The compressed result is 11KB, crisp and clearly hers. The lesson travels well: for signatures, the crop does more work than the compressor, and a tight crop also removes the table, fingers and shadows that make automated checks fail.",
        "The marksheet is the hardest case because it contains small printed text. A color scan at 300 dots per inch gives Sana a 2480 pixel by 3508 pixel page of 5.4 MB. Squeezing a full page like that down to 30KB as an image would destroy the text, and she should not try. Her form actually asks for certificates as a PDF under a separate limit, which is the normal pattern, so she follows the guide to [compress PDF to 100KB](/guides/compress-pdf-to-100kb) for that document instead. Where a portal genuinely asks for a certificate as a 30KB image, upload only the single requested page, convert it to grayscale if color is not required, resize the long edge to about 1200 pixels, and check every mark and the seal at full zoom before submitting. If the text is not readable to you, it will not be readable to the reviewer either.",
      ],
    },
    {
      heading: "Mistakes that still get applications rejected",
      paragraphs: [
        "The most common failure is also the dullest: uploading the right photo at the wrong size because an older compressed copy was sitting in the downloads folder with a similar name. Phones and browsers create files called photo.jpg, photo (1).jpg and final-photo.jpg, and under deadline pressure it is easy to pick the 180KB version by accident. After you compress, rename the finished file immediately with the size in the name, for example sana-photo-27kb.jpg, and delete or move the failed attempts out of that folder. When the portal preview appears, check that the preview looks like the new photo, not a cached older one, and refresh the page if it looks stale.",
        "Selfies cause a second wave of rejections. A front camera selfie at arm length distorts the face, often includes a cluttered room, and may be flipped left to right by the camera app. Most job and admission instructions ask for a recent studio style portrait with a plain background, taken straight on at eye level. Ask someone else to take the photo from about a meter and a half away, in daylight, with you facing the light rather than standing in front of a bright window. That single change improves clarity more than any compression setting, because a sharp, evenly lit source file survives compression far better than a grainy one.",
        "Watch the edges of the rules too. Some portals count 30KB as 30,000 bytes, others as 30 times 1024, which is 30,720 bytes, so a file reported as exactly 30.0KB on your device can tip over on theirs. Stay a kilobyte or two under. Some reject PNG or WebP even when the size is correct, because their printing pipeline expects JPG. Some reject a photo older than three or six months, a photo wearing sunglasses or a cap, or a black and white copy where color was requested. The size tool solves the size problem. Reading the ten lines of instructions beside the upload box solves the rest, and it takes less time than reapplying after a rejection.",
      ],
      bullets: [
        "Do not upload a screenshot of a photo. Screenshots add screen borders and lose detail.",
        "Do not stretch a small photo up to the requested dimensions. Upscaling adds size without adding clarity.",
        "Do not compress the same JPG repeatedly. Go back to the original copy for each new attempt.",
        "Do not leave the file at exactly 30.0KB. Aim for 24KB to 29KB to leave a safety margin.",
      ],
    },
    {
      heading: "Choosing between 20KB, 30KB and 50KB, and doing a final check",
      paragraphs: [
        "Sibling limits look alike but behave differently in practice. A 20KB ceiling, common for signatures and small identity photos, forces tighter dimensions and a leaner quality setting, and the guide to [compress image to 20KB](/guides/compress-image-to-20kb) walks through that stricter case. A 50KB ceiling gives you breathing room for a slightly larger portrait or a more detailed scan, and the guide to [compress image to 50KB](/guides/compress-image-to-50kb) shows how to spend that extra room on clarity rather than wasting it. Never aim for the neighboring limit out of habit. Portals enforce the exact number on their own form, and a 42KB file that would pass a 50KB rule will fail a 30KB rule every time.",
        "Before you submit, run one last pass in this order. First, confirm the file name and format match the instructions. Second, confirm the size sits between 24KB and 29KB, or at least safely under 30KB. Third, confirm the pixel dimensions match the stated width and height if the portal gave them. Fourth, open the file fresh and look at it the way a reviewer will: is the face clear, is the background the right color, is any required text readable, and does it look like you on a normal day. That thirty second check catches the problems a size counter cannot see.",
        "If you still need to produce the file itself, go back to the [compress image to 30KB tool](/tools/compress-image-to-30kb), start from your original copy, resize first and adjust quality in small steps. Browse the other walkthroughs on the [guides hub](/guides) if a different document on your form has a different limit. Keep the accepted final files together in one folder with the application number in each name. When the admit card or shortlist arrives weeks later and shows a clear photo of you, that small folder of careful copies is the reason why.",
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
