import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import ElectricityBillCalculator from "@/features/calculators/everyday/electricity-bill-calculator/ElectricityBillCalculator";
import { content } from "@/features/calculators/everyday/electricity-bill-calculator/content";

const tool = getTool("electricity-bill-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <ElectricityBillCalculator />
    </ToolPage>
  );
}
