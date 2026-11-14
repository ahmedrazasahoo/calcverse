import type { GuidePost } from "@/lib/guides";

export const guide: GuidePost = {
  slug: "convert-heic-webp-avif-to-jpg-png",
  keyword: "heic to jpg + webp to png + avif to jpg (convert back cluster)",
  title: "HEIC to JPG, WebP to PNG and AVIF to JPG: How to Convert Back to Files Everything Opens",
  metaTitle: "Convert HEIC, WebP and AVIF to JPG or PNG: Full Guide",
  metaDescription: "Your phone saves photos in HEIC, websites serve WebP and AVIF, and half the software you use still wants JPG or PNG. Here is how to convert back cleanly.",
  excerpt: "HEIC, WebP and AVIF are smaller and smarter than JPG, but plenty of upload forms, printers and older programs still refuse them. This guide explains each format and how to convert back without wrecking quality.",
  category: "Files and Converters",
  toolSlug: "heic-to-jpg",
  updatedAt: "2026-11-14",
  intro: [
    "You take a photo on your iPhone, send it to your Windows laptop, and the file will not open. Or you save an image from a website and it arrives as a WebP file your photo editor has never heard of. Or a client sends you an AVIF product shot and your upload form flatly rejects it. None of these files are broken. They are just newer than the software trying to read them, and the fix is almost always the same: convert back to JPG or PNG, the two formats everything on earth accepts. The free [HEIC to JPG converter](/tools/heic-to-jpg) handles the phone photo case in seconds, and this guide covers all three modern formats in one place.",
    "It helps to understand why this keeps happening to you. Phone makers and website owners switched to HEIC, WebP and AVIF for one reason: smaller files. A HEIC photo can take up half the space of the same photo as a JPG, which means your phone holds twice as many pictures and websites load faster. That benefit is real, but it pushed the compatibility problem onto you, the person who has to open, upload, print or edit the file later. Converting back is not a step backward. It is a translation step, and done at the right quality setting it costs you almost nothing in image quality.",
    "This guide walks through what each format actually is, when JPG is the right target and when PNG is worth its bigger file size, and a set of worked situations drawn from real life: a job application photo that a portal rejects, a batch of product images for an older online store, screenshots for a school report, and prints for a family album. By the end you will know which converter to reach for and which settings to pick, and you can browse the rest of our [guides](/guides) for the size and compression problems that often come right after a conversion.",
  ],
  keyPoints: [
    "HEIC is the default photo format on recent iPhones; JPG is the format Windows, Android and most websites still expect.",
    "WebP and AVIF come mostly from websites, where they load faster than JPG and PNG at the same quality.",
    "Choose JPG for photos and PNG when you need transparency or crisp text and line art.",
    "Convert at high quality, around 90 to 95, and keep the original file as your master copy.",
    "Converting to JPG removes transparency, so transparent WebP or AVIF images need PNG instead.",
    "Batch conversion saves real time when a phone transfer or a website download leaves you with dozens of files.",
  ],
  sections: [
    {
      heading: "Why your files stopped being JPG in the first place",
      paragraphs: [
        "For about twenty years, JPG was simply what a photo was. That changed in stages. Apple made HEIC the default on iPhones starting with iOS 11 in 2017, because it stores the same photo in roughly half the space. Google built WebP for the web and pushed it through Chrome, so many saved website images now arrive as WebP. AVIF is the newest of the three, built on the AV1 video codec, and it squeezes files even smaller, which is why image hosts and some newer phones serve or save it.",
        "None of these formats won because they look better. At a sensible quality setting, a JPG, a HEIC file and an AVIF file of the same photo look nearly identical on screen. They won on storage and bandwidth: a catalog page with 40 images might drop from 12 MB of JPGs to 5 MB of AVIF files, and 10,000 HEIC photos take about 20 GB, while the same library in JPG could take 40 GB. The tradeoff lands later, in older software or upload forms that still test only JPG and PNG.",
      ],
      bullets: [
        "HEIC: default on iPhone cameras, also a high efficiency option on some Android phones.",
        "WebP: created by Google for the web, now common behind images saved from Chrome.",
        "AVIF: the newest and smallest of the three, spreading through image hosts and newer devices.",
        "JPG and PNG: older, larger, and still accepted by nearly every program and portal.",
      ],
    },
    {
      heading: "JPG or PNG: picking the right target format",
      paragraphs: [
        "The most common mistake in this area is treating JPG and PNG as interchangeable. JPG uses lossy compression designed for photographs: it throws away fine detail your eye barely notices, especially in gradients like skies and skin, and in return produces small files. A 12 megapixel photo saved as a JPG at quality 90 might be 3 to 5 MB. The same image as a PNG could be 25 MB or more, because PNG is lossless and keeps every pixel exact. For photos, that exactness buys you nothing you can see.",
        "PNG earns its size in two situations. The first is transparency. JPG has none at all: transparent areas become white or black when you convert. If a WebP logo, sticker or cutout has a transparent background, converting it to JPG ruins it, while PNG keeps the transparency intact. That is why the [WebP to PNG converter](/tools/webp-to-png) exists. The second situation is sharp edged content: screenshots with small text, charts and line art. JPG smears hard edges and can leave a faint fuzz around letters, while PNG keeps text pixel perfect. The rule: photographs go to JPG, and transparency, text, logos or sharp graphics go to PNG. If the resulting PNG is too large for an upload limit, our guide to how to [compress an image to 50KB](/guides/compress-image-to-50kb) shows how to bring it under a strict cap.",
      ],
      table: {
        caption: "JPG and PNG compared for converted files",
        headers: ["Feature", "JPG", "PNG"],
        rows: [
          ["Best for", "Photographs", "Logos, screenshots and graphics"],
          ["Transparency", "Not supported", "Fully supported"],
          ["Compression", "Lossy, smaller files", "Lossless, larger files"],
          ["Typical 12 MP photo", "3 to 5 MB at quality 90", "25 MB or more"],
          ["Text and sharp edges", "Slightly fuzzy", "Crisp and exact"],
          ["Accepted by forms", "Almost everywhere", "Almost everywhere"],
        ],
      },
    },
    {
      heading: "Converting HEIC photos from your phone",
      paragraphs: [
        "HEIC causes the most friction because it holds people's personal photos. Maria upgraded her iPhone, took about 300 photos on a family trip, plugged the phone into her Windows 10 laptop, and found that a third of the files would not open and none would upload to her photo book site. The photos were fine: Windows needed an extension she did not have, and the site accepted only JPG. Converting the folder with an [HEIC to JPG converter](/tools/heic-to-jpg) at quality 92 took a few minutes and produced JPGs the site accepted immediately, with no visible difference in the finished book.",
        "Quality is the one choice that matters here. At 95, a converted JPG is visually indistinguishable from the original, including prints up to about 8 by 10 inches. At 90, files get a little smaller with no visible difference on screen. Below about 80, softness appears in detailed areas like hair, grass and fabric. Keep the original HEIC files as masters, because the conversion is lossy and the discarded data cannot come back. You can also stop the problem at the source: the iPhone camera settings offer most compatible, which saves JPG directly at roughly double the storage. Our guide to the [WebP to JPG converter](/guides/webp-to-jpg-converter) covers the WebP version of this decision.",
      ],
      steps: [
        "Keep the HEIC files in one folder, separate from the converted copies.",
        "Open the HEIC to JPG converter and add the files, one photo or a batch.",
        "Set quality to 90 to 95 for prints and sharing.",
        "Convert and check two or three JPGs at full size.",
        "Upload or share the JPGs, and keep the original HEIC files as masters.",
      ],
    },
    {
      heading: "Converting WebP images you saved from the web",
      paragraphs: [
        "WebP sneaks up on people because it often arrives wearing a disguise. You right click an image, choose save image, and the file lands ending in .webp, or sometimes with a .jpg name that no editor can open because the contents are actually WebP. Browsers display WebP happily, so the file previews fine, but then PowerPoint refuses to insert it or a marketplace portal rejects the upload. If the extension says webp, it needs converting first.",
        "The target decision matters more here than with phone photos, because web images are a mixed bag. A WebP photograph should go to JPG, which keeps it small. A WebP logo, icon, infographic or meme with text should go to PNG, because it may rely on transparency and sharp edges. Take Jamal, who downloads supplier product images for a store running on older software. The photos became JPG, but the transparent brand logo had to go through the [WebP to PNG converter](/tools/webp-to-png) to sit cleanly on his pages. Logo to JPG would have given him a white box behind the logo on every page.",
        "One more WebP wrinkle is animation. Some WebP files are short looping animations, and converting one gives you a single still frame, usually the first. If a converted file looks oddly cropped, check whether the original moved. For still images, the vast majority, conversion is straightforward, and our guide to the [PNG to JPG converter](/guides/png-to-jpg-converter) covers the reverse trip, when a PNG photo is far heavier than the job needs.",
      ],
    },
    {
      heading: "Converting AVIF, the newest and least supported format",
      paragraphs: [
        "AVIF is where WebP was about eight years ago: better on paper, patchy in practice. It compresses harder than WebP at the same visual quality, handles transparency and animation, and browsers support it well. The gaps are everywhere else: many desktop editors, office suites and content management systems still cannot open AVIF at all. When a client or website hands you AVIF files, converting them with the [AVIF to JPG converter](/tools/avif-to-jpg) is usually faster than hunting down which programs can be coaxed into reading them.",
        "Consider Priya, a freelance designer who received AVIF versions of a client's product photos. Her layout program rejected every file. She converted the set to JPG at quality 93 for the print brochure, and made PNG copies of two images that used transparency for a catalog cutout effect. Her first test sent everything to JPG, and the two cutouts gained solid white backgrounds that had to be redone as PNG. That mistake takes five seconds to avoid by checking for transparency first. Do not worry when a 400KB AVIF photo becomes a 2.5 MB JPG at quality 92: that is normal arithmetic, trading bytes for compatibility.",
      ],
    },
    {
      heading: "Worked situations: which conversion for which job",
      paragraphs: [
        "Job application and ID photos, and printing. Government portals, exam boards and visa systems are the strictest uploaders of all, and they almost universally ask for JPG. If your passport style photo came off a recent iPhone, it is HEIC and will be rejected. Convert it to JPG at high quality, then check the size cap, because many portals set a maximum of 50KB to 300KB. Print labs are just as strict: many kiosks accept JPG and sometimes PNG, and nothing else. Convert HEIC and AVIF photos to JPG at quality 92 to 95, keep the dimensions untouched, and avoid converting a file that has already been heavily compressed once.",
        "School and office documents, and selling online. Screenshots in reports and slides are usually WebP in disguise. For a chart or small text, choose PNG so the words stay sharp. For a decorative photo, JPG keeps the file light. Marketplaces follow the same split: JPG for product photos, PNG for logos and cutouts. Convert a whole batch in one sitting and spot check a few before uploading fifty listings built on a bad setting.",
      ],
      bullets: [
        "Portal or exam photo: HEIC to JPG, then compress to the size cap.",
        "Print order: HEIC or AVIF to JPG at quality 92 to 95.",
        "Screenshot or chart: WebP to PNG to keep text sharp.",
        "Logo or cutout: WebP or AVIF to PNG, never to JPG.",
        "Product photos: batch convert to JPG and spot check before uploading.",
      ],
    },
    {
      heading: "Mistakes that quietly ruin converted images",
      paragraphs: [
        "The first mistake is converting twice. Each lossy step softens the image a little more. Always go back to the original file for a fresh conversion. The second mistake is choosing a low quality setting when no limit requires it: a photo converted at quality 60 is permanently downgraded. The third mistake is ignoring dimensions: shrinking a 4000 pixel wide photo to 800 pixels is fine for a thumbnail, a disaster for a print. Check that the output keeps the original width and height unless you asked for a resize.",
        "The fourth mistake is forgetting metadata. JPG conversions usually carry over date and location data, but not always, and some tools strip it for privacy. Decide which you want before a big batch. The fifth mistake is the transparency trap, the only one that visibly destroys an image: if an image might be a logo, sticker or cutout, PNG is the answer. Finally, verify before you send: open two or three converted files at 100 percent and check faces, text and edges. When everything checks out, the humble [HEIC to JPG converter](/tools/heic-to-jpg) and its WebP and AVIF siblings have done the whole job. Find the related walkthroughs in our [guides](/guides) hub.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why does my iPhone save photos as HEIC instead of JPG?",
      a: "Apple made HEIC the default in iOS 11 to save storage, because it holds the same photo in about half the space of a JPG. You can switch the camera setting to Most Compatible if you want JPG straight from the phone, at the cost of roughly double the storage per photo.",
    },
    {
      q: "Will converting HEIC to JPG lose quality?",
      a: "Conversion is lossy, so a little data is discarded, but at a quality setting of 90 to 95 the difference is invisible in normal viewing and in typical prints. Keep the original HEIC file as your master copy so you always have the full quality version stored.",
    },
    {
      q: "Should I convert WebP to JPG or to PNG?",
      a: "Convert photographs to JPG for small files, and convert logos, screenshots, text graphics and anything with transparency to PNG. JPG cannot store transparency at all, so a transparent WebP sent to JPG will gain a solid background you did not want.",
    },
    {
      q: "Why did my AVIF file turn into a much bigger JPG?",
      a: "That is expected. AVIF is a newer and more efficient compressor, so the same photo at the same visual quality needs more bytes as a JPG. You are trading file size for compatibility, and if the JPG then breaks an upload limit you can compress it as a separate step.",
    },
    {
      q: "Can I convert a whole folder of photos at once?",
      a: "Yes, batch conversion is the normal way to handle a phone transfer or a big download. Add all the files, pick one format and quality setting for the batch, convert, and then spot check a few outputs at full size before you rely on them.",
    },
    {
      q: "My upload form accepts JPG only, but my screenshot has small text. What should I do?",
      a: "Convert the screenshot to JPG at the highest quality setting and check the text at 100 percent zoom before uploading. If the text still looks fuzzy and the form also allows PNG, use PNG instead, since PNG keeps sharp edges and small letters exact.",
    },
  ],
  relatedSlugs: ["webp-to-jpg-converter", "png-to-jpg-converter", "compress-image-to-50kb"],
};
