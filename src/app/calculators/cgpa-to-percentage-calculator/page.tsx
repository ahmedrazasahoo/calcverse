import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import CgpaToPercentageCalculator from "@/features/calculators/school/cgpa-to-percentage-calculator/CgpaToPercentageCalculator";
import { content } from "@/features/calculators/school/cgpa-to-percentage-calculator/content";

const tool = getTool("cgpa-to-percentage-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <CgpaToPercentageCalculator />
    </ToolPage>
  );
}
