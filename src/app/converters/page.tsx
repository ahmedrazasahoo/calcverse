import type { Metadata } from "next";
import HubPage from "@/components/HubPage";

export const metadata: Metadata = {
  title: "Converters: Shoe Sizes, Roman Numerals, Binary, HEIC and More",
  description:
    "Convert shoe sizes between US, UK and EU, numbers to Roman numerals, binary to text, HEIC photos to JPG and WebP to PNG. Free converters that work in your browser.",
};

export default function Page() {
  return (
    <HubPage
      group="converters"
      title="Converters"
      intro="Some formats only make sense in the place that created them: a shoe size from another country, a photo format only Apple uses, a date in Roman numerals. These converters translate between them in seconds, right in your browser."
      categoryOrder={["Converters", "Image Converters", "Text Tools"]}
    />
  );
}
