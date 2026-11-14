import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import FuelCostCalculator from "@/features/calculators/everyday/fuel-cost-calculator/FuelCostCalculator";
import { content } from "@/features/calculators/everyday/fuel-cost-calculator/content";

const tool = getTool("fuel-cost-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <FuelCostCalculator />
    </ToolPage>
  );
}
