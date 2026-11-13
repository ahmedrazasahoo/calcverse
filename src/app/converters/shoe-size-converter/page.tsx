import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import ShoeSizeConverter from "@/features/converters/shoe-size-converter/ShoeSizeConverter";
import { content } from "@/features/converters/shoe-size-converter/content";

const tool = getTool("shoe-size-converter")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <ShoeSizeConverter />
    </ToolPage>
  );
}
