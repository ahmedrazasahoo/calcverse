import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PpfCalculator from "@/features/calculators/finance/ppf-calculator/PpfCalculator";
import { content } from "@/features/calculators/finance/ppf-calculator/content";

const tool = getTool("ppf-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <PpfCalculator />
    </ToolPage>
  );
}
