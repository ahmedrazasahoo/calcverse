import type { ToolContent } from "@/lib/content";

/** Page metadata and intro copy for this tool. */
export const pageMeta = {
  title: "SVG to PNG Converter Online Free, Exact Pixel Size or Scale",
  metaDescription:
    "Convert SVG files to PNG at an exact pixel size or at 0.5x to 4x scale, with a transparent or coloured background. Free in your browser, no upload.",
  intro:
    "SVG artwork scales to any size, but apps, documents and upload forms often need a PNG at exact pixels. This converter renders your SVG to a PNG at the width, height or scale factor you choose, with a transparent or coloured background, entirely in your browser.",
};

export const content: ToolContent = {
  seoTitle: "SVG to PNG Converter Online Free, Exact Pixel Size or Scale",
  howTo: [
    "Drop an SVG file into the box, click to browse for one, or paste the SVG markup straight into the text box.",
    "Set an exact output width, an exact output height, or both. Leave both empty and pick a scale instead: 0.5x, 1x, 2x, 3x or 4x the intrinsic size.",
    "Choose a transparent background, or pick a colour to render behind the artwork.",
    "Check the rendered preview and the exact output dimensions, then download the PNG.",
  ],
  explanationTitle: "How SVG rendering decides your PNG size",
  explanation: [
    "An SVG file does not contain pixels at all. It contains drawing instructions: paths, shapes, text and fills, plus a coordinate system defined by its viewBox and, usually, a width and height. To make a PNG, something has to decide how many pixels those instructions get drawn onto, and that decision is yours here. Give an exact width and the height follows the artwork's aspect ratio; give both and the PNG is exactly that rectangle; give neither and the scale factor multiplies the intrinsic size, so a 200 by 100 icon at 3x comes out at a crisp 600 by 300. For app icons, retina images and print, rendering one clean large PNG from the vector beats upscaling a small raster every time.",
    "Two behaviours of SVG-as-image are worth knowing before you convert. First, an SVG loaded as an image cannot run scripts, by design, so animated or scripted SVGs render as their static first state. Second, external references inside the file do not load: an SVG that points at a separate image file, web font or stylesheet will render without those pieces. Self contained SVGs, with shapes and fills written inline, convert exactly as designed. The background is transparent unless you pick a colour, which suits logos and icons that need to sit on different surfaces. Everything renders locally in your browser; the file is never uploaded.",
  ],
  faqs: [
    {
      q: "What size will my PNG be if I change nothing?",
      a: "The converter reads the intrinsic size from the SVG itself, from its width and height attributes or its viewBox, and applies the scale you pick (2x by default). Set an exact width or height whenever you need a specific pixel size, and the other side follows the aspect ratio.",
    },
    {
      q: "My SVG has no width or height, only a viewBox. Does it still work?",
      a: "Yes. The viewBox defines the coordinate system, so its width and height become the intrinsic size and scaling works from there. Only an SVG with no viewBox and no size attributes is a problem, and for that case you can type both an exact width and an exact height.",
    },
    {
      q: "Why does my converted PNG look different from the SVG in my editor?",
      a: "Usually an external reference: a linked image, a web font or an external stylesheet inside the SVG cannot load when the file is rendered as an image, so those parts fall back or disappear. Embedding the font or inlining the referenced pieces in the SVG fixes it. Scripts inside an SVG also never run in image mode.",
    },
    {
      q: "Which scale should I choose for a logo or icon?",
      a: "For screens, 2x the display size is the safe standard: a logo shown at 200 pixels wide should be exported at 400 so it stays sharp on retina displays. For print at 300 dpi, work out the pixels directly: a 2 inch wide print needs a 600 pixel wide PNG.",
    },
    {
      q: "Are my files uploaded anywhere?",
      a: "No. The SVG is rendered by your own browser on your own device, and nothing leaves it.",
    },
  ],
};
