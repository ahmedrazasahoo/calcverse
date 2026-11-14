import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import StampDutyCalculator from "@/features/calculators/tax/stamp-duty-calculator/StampDutyCalculator";
import { content } from "@/features/calculators/tax/stamp-duty-calculator/content";

const tool = getTool("stamp-duty-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <StampDutyCalculator />
    </ToolPage>
  );
}
