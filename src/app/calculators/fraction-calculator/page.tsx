import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import FractionCalculator from "@/features/calculators/school/fraction-calculator/FractionCalculator";
import { content } from "@/features/calculators/school/fraction-calculator/content";

const tool = getTool("fraction-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <FractionCalculator />
    </ToolPage>
  );
}
