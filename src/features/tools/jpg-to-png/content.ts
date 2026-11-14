import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "JPG to PNG Converter Online Free, Lossless Pixel Copy",
  metaDescription:
    "Convert JPG images to PNG free in your browser. PNG preserves the JPG pixels losslessly for editing, at a larger file size. No upload, files never leave your device.",
  intro:
    "Sometimes a tool, an editor or a design workflow needs a PNG, not a JPG. This converter rewrites your JPG as a PNG in your browser. Be clear about what that does: the PNG preserves the pixels your JPG already has, exactly, but it cannot add quality the JPG never stored, and the file usually gets bigger.",
};

export const content: ToolContent = {
  seoTitle: "JPG to PNG Converter Online Free, Lossless Pixel Copy",
  howTo: [
    "Drop a JPG image into the box, or click to browse for one. Any image your browser can open is accepted.",
    "Wait a moment while the image is decoded and rewritten as PNG. There is no quality setting, because PNG is lossless.",
    "Check the preview and the before and after sizes. The PNG will usually be larger than the JPG.",
    "Download the PNG.",
  ],
  explanationTitle: "What a JPG to PNG conversion can and cannot do",
  explanation: [
    "JPG is a lossy format: when a photo was saved as JPG, fine detail was discarded to keep the file small, and that detail is simply not in the file anymore. PNG is lossless: it stores every pixel it is given, exactly. Converting JPG to PNG therefore gives you a perfect copy of the JPG's pixels in a new container, nothing more and nothing less. The picture will look identical, because it is identical at the pixel level, but it will not look better, sharper or cleaner than the JPG you started with. Any softness or blockiness in the JPG is preserved faithfully too.",
    "So why convert at all? Three good reasons. First, compatibility: some editors, upload forms, print tools and design programs ask for PNG specifically. Second, editing headroom: every time you re-save a JPG it loses a little more quality, while a PNG can be edited and re-saved endlessly without drifting, so converting before a long editing session protects the image. Third, graphics work: if you plan to add text, shapes or transparency around the picture, PNG is the safer working format. The trade is size. PNG files for photos usually land several times larger than the JPG, which is why the before and after sizes are shown honestly on this page. Your file is processed locally and never uploaded.",
  ],
  faqs: [
    {
      q: "Will converting JPG to PNG improve the quality?",
      a: "No. The PNG holds exactly the pixels the JPG had. Detail that JPG compression discarded is not in the file, so no converter can bring it back. What PNG does guarantee is that no further quality is lost from this point on.",
    },
    {
      q: "Why is there no quality slider?",
      a: "Because it would do nothing. PNG compression is lossless, meaning the exported file stores the decoded pixels exactly. Quality settings only exist for lossy formats like JPG and WebP, where the encoder chooses how much detail to discard.",
    },
    {
      q: "Why is the PNG so much bigger than the JPG?",
      a: "JPG achieves small files by discarding detail; PNG keeps everything, so for photographs it needs far more bytes to describe the same picture. For simple graphics with flat colours the gap is much smaller, and a PNG can occasionally be the smaller file.",
    },
    {
      q: "Can I add transparency to my photo with this conversion?",
      a: "Not automatically. A JPG has no transparency to recover, so the PNG starts fully opaque. You can remove the background afterwards in an image editor, and the PNG format will then store the transparency properly, which is one reason people convert first.",
    },
    {
      q: "Are my images uploaded anywhere?",
      a: "No. The conversion runs in your browser on your own device, and the file never leaves it.",
    },
  ],
};
