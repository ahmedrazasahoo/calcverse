import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import SimpleInterestCalculator from "@/features/calculators/finance/simple-interest-calculator/SimpleInterestCalculator";
import { content } from "@/features/calculators/finance/simple-interest-calculator/content";

const tool = getTool("simple-interest-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <SimpleInterestCalculator />
    </ToolPage>
  );
}
