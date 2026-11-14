import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "PNG to JPG Converter Online Free, With Background Colour Choice",
  metaDescription:
    "Convert PNG images to JPG free in your browser, with a quality slider and a background colour choice for transparent areas. No upload, files never leave your device.",
  intro:
    "PNG files are crisp and keep transparency, but they are often far bigger than the same picture needs to be, and some forms and tools still ask for JPG by name. This converter rewrites your PNG as a JPG right in your browser, with a quality slider and a background colour for the transparent parts.",
};

export const content: ToolContent = {
  seoTitle: "PNG to JPG Converter Online Free, With Background Colour Choice",
  howTo: [
    "Drop a PNG image into the box, or click to browse for one. Any image your browser can open is accepted.",
    "Set the JPG quality with the slider. Around 90 keeps photos looking clean while shrinking the file a lot.",
    "Choose the background colour: white, black or any custom colour. JPG cannot store transparency, so see-through areas are filled with this colour.",
    "Check the preview and the before and after sizes, then download the JPG.",
  ],
  explanationTitle: "What actually changes when a PNG becomes a JPG",
  explanation: [
    "PNG and JPG compress pictures in fundamentally different ways. PNG is lossless: it stores every pixel exactly, which is perfect for screenshots, logos and line art, but makes photographs heavy, often several megabytes for a single phone picture. JPG is lossy: it throws away fine detail your eyes barely notice, especially in gradual colour changes, and stores what is left very efficiently. The quality slider controls how much is thrown away. At 90 percent a converted photo is usually indistinguishable from the original at a fraction of the size, while at 50 percent you start to see soft blocks and fringing around sharp edges.",
    "The one structural difference you can see is transparency. PNG keeps a see-through channel, so logos and stickers can sit on any background. JPG has no such channel, which is why this converter asks for a background colour: transparent pixels are painted over white by default, or black, or any colour you pick to match the page or document the JPG is heading for. If you need the transparency itself, keep the PNG. Your file is processed locally by your browser and is never uploaded to a server.",
  ],
  faqs: [
    {
      q: "Why does my converted JPG have a white background?",
      a: "JPG cannot store transparency, so transparent areas have to be filled with something. White is the default here because most documents and forms sit on white, but you can switch to black or any custom colour before converting.",
    },
    {
      q: "What quality setting should I use?",
      a: "For photos, 85 to 95 is the sweet spot: the file shrinks dramatically and the picture still looks clean. For images with sharp text or thin lines, stay near 95, because JPG blurs hard edges first. For a quick thumbnail or preview, 70 is plenty.",
    },
    {
      q: "Will the JPG always be smaller than the PNG?",
      a: "For photographs, almost always, often by 70 percent or more. For flat graphics with few colours, a PNG can actually be smaller, because PNG compresses flat areas perfectly while JPG spends bytes describing them. The before and after sizes are shown so you can see which way it went.",
    },
    {
      q: "Can I convert a JPG back to PNG later and get the quality back?",
      a: "No. Detail discarded during JPG conversion is gone for good. Converting back to PNG preserves the JPG pixels exactly, but it cannot restore detail that was never saved. Keep your original PNG if the image matters.",
    },
    {
      q: "Are my images uploaded anywhere?",
      a: "No. The conversion runs in your browser on your own device, and the file never leaves it.",
    },
  ],
};
