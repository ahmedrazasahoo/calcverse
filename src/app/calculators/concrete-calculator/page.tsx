import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import ConcreteCalculator from "@/features/calculators/everyday/concrete-calculator/ConcreteCalculator";
import { content } from "@/features/calculators/everyday/concrete-calculator/content";

const tool = getTool("concrete-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <ConcreteCalculator />
    </ToolPage>
  );
}
