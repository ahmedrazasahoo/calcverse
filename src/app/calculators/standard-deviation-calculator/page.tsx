import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import StandardDeviationCalculator from "@/features/calculators/school/standard-deviation-calculator/StandardDeviationCalculator";
import { content } from "@/features/calculators/school/standard-deviation-calculator/content";

const tool = getTool("standard-deviation-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <StandardDeviationCalculator />
    </ToolPage>
  );
}
