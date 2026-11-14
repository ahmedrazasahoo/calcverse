import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import ProteinCalculator from "@/features/calculators/health/protein-calculator/ProteinCalculator";
import { content } from "@/features/calculators/health/protein-calculator/content";

const tool = getTool("protein-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <ProteinCalculator />
    </ToolPage>
  );
}
