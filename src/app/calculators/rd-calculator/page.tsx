import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import RdCalculator from "@/features/calculators/finance/rd-calculator/RdCalculator";
import { content } from "@/features/calculators/finance/rd-calculator/content";

const tool = getTool("rd-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <RdCalculator />
    </ToolPage>
  );
}
