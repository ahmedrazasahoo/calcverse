import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SvgToPng from "@/features/tools/svg-to-png/SvgToPng";
import { content } from "@/features/tools/svg-to-png/content";

const tool = getTool("svg-to-png")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <SvgToPng />
    </ToolPage>
  );
}
