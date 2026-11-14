import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "WebP to JPG Converter Online Free, With Quality and Background Choice",
  metaDescription:
    "Convert WebP images to JPG free in your browser, with a quality slider and a background colour for transparent areas. No upload, files never leave your device.",
  intro:
    "You saved a picture from a website and it arrived as a WebP file that your editor, document or upload form will not accept. This converter turns WebP images into plain JPG files that open almost anywhere, in your browser, with a quality slider and a background colour choice for transparent areas.",
};

export const content: ToolContent = {
  seoTitle: "WebP to JPG Converter Online Free, With Quality and Background Choice",
  howTo: [
    "Drop a WebP image into the box, or click to browse for one.",
    "Set the JPG quality with the slider. Around 90 is a good default for photos saved from the web.",
    "Choose the background colour: white, black or any custom colour. JPG cannot store transparency, so see-through areas of the WebP are filled with this colour.",
    "Check the preview and the before and after sizes, then download the JPG.",
  ],
  explanationTitle: "Why WebP files cause trouble, and what JPG fixes",
  explanation: [
    "WebP is Google's web image format, built to make pages load faster: it compresses photos harder than JPG at the same visual quality, and most images you save from modern websites arrive in it whether you asked or not. Inside a browser it behaves beautifully. Outside one, support is patchy: older image editors, office suites, some printers, marketplace upload forms and plenty of content systems still refuse WebP files or handle them badly. JPG is the opposite trade: a bigger file, but a format that essentially every program made in the last thirty years can open.",
    "The conversion decodes the WebP picture and writes the same pixels out as a JPEG, at the quality you choose. One thing to plan for is transparency. WebP can store see-through areas, JPG cannot, so transparent pixels are painted over a background colour: white by default, black, or any custom colour that matches where the image is going. If the see-through background is the whole point of the image, convert to PNG instead, which keeps it. Conversion happens locally in your browser and your files are never uploaded.",
  ],
  faqs: [
    {
      q: "Why did the website give me a WebP file when I saved a JPG?",
      a: "Many sites store and serve images as WebP behind the scenes because the files are smaller, whatever the original format was. Your browser downloads what the server sends, so the saved file is a WebP even if the page called it a JPG.",
    },
    {
      q: "What happens to the transparent parts of my WebP?",
      a: "They are filled with the background colour you choose: white by default, black, or a custom colour. JPG has no transparency channel, so something has to go there. If you need the transparency itself, use a WebP to PNG conversion instead.",
    },
    {
      q: "Why is the JPG bigger than the WebP?",
      a: "WebP compression is roughly a generation ahead of JPG, so at the same quality the JPG needs more bytes. That size increase is the normal cost of a file that opens everywhere, and the before and after sizes are shown so you can judge the trade yourself.",
    },
    {
      q: "Can this converter handle an animated WebP?",
      a: "It converts the first frame into a still JPG. The animation itself cannot survive in JPG, which is a still image format. For motion, a video or GIF tool is the right choice.",
    },
    {
      q: "Are my images uploaded anywhere?",
      a: "No. The conversion runs in your browser on your own device, and the file never leaves it.",
    },
  ],
};
