import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import OvertimeCalculator from "@/features/calculators/tax/overtime-calculator/OvertimeCalculator";
import { content } from "@/features/calculators/tax/overtime-calculator/content";

const tool = getTool("overtime-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <OvertimeCalculator />
    </ToolPage>
  );
}
