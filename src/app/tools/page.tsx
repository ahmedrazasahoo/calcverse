import type { Metadata } from "next";
import HubPage from "@/components/HubPage";

export const metadata: Metadata = {
  title: "File Tools: Compress PDF and Images in Your Browser",
  description:
    "Free PDF and image compression tools that run entirely in your browser. Hit exact size limits like 200KB, 100KB, 50KB and 20KB with no uploads and no signup.",
};

export default function Page() {
  return (
    <HubPage
      group="tools"
      title="File Tools"
      intro="Application forms, exam portals and job sites love to reject files that are a few kilobytes too big. These tools shrink PDFs and images to the exact limit you need, and they do it locally in your browser, so your documents are never uploaded to a server."
      categoryOrder={["PDF Tools", "Image Tools"]}
    />
  );
}
