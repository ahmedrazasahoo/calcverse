import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PngToJpg from "@/features/tools/png-to-jpg/PngToJpg";
import { content } from "@/features/tools/png-to-jpg/content";

const tool = getTool("png-to-jpg")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PngToJpg />
    </ToolPage>
  );
}
