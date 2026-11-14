import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import FancyTextGenerator from "@/features/generators/fancy-text-generator/FancyTextGenerator";
import { content } from "@/features/generators/fancy-text-generator/content";

const tool = getTool("fancy-text-generator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <FancyTextGenerator />
    </ToolPage>
  );
}
