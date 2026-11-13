import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import GstCalculator from "@/features/calculators/tax/gst-calculator/GstCalculator";
import { content } from "@/features/calculators/tax/gst-calculator/content";

const tool = getTool("gst-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <GstCalculator />
    </ToolPage>
  );
}
