import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import DecimalToFractionCalculator from "@/features/calculators/school/decimal-to-fraction-calculator/DecimalToFractionCalculator";
import { content } from "@/features/calculators/school/decimal-to-fraction-calculator/content";

const tool = getTool("decimal-to-fraction-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <DecimalToFractionCalculator />
    </ToolPage>
  );
}
