import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import HoursCalculator from "@/features/calculators/everyday/hours-calculator/HoursCalculator";
import { content } from "@/features/calculators/everyday/hours-calculator/content";

const tool = getTool("hours-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <HoursCalculator />
    </ToolPage>
  );
}
