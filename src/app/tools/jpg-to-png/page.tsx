import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import JpgToPng from "@/features/tools/jpg-to-png/JpgToPng";
import { content } from "@/features/tools/jpg-to-png/content";

const tool = getTool("jpg-to-png")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <JpgToPng />
    </ToolPage>
  );
}
