import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BacCalculator from "@/features/calculators/health/bac-calculator/BacCalculator";
import { content } from "@/features/calculators/health/bac-calculator/content";

const tool = getTool("bac-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <BacCalculator />
    </ToolPage>
  );
}
