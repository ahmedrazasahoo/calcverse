import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import WebpToJpg from "@/features/tools/webp-to-jpg/WebpToJpg";
import { content } from "@/features/tools/webp-to-jpg/content";

const tool = getTool("webp-to-jpg")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <WebpToJpg />
    </ToolPage>
  );
}
