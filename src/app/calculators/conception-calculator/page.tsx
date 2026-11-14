import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import ConceptionCalculator from "@/features/calculators/health/conception-calculator/ConceptionCalculator";
import { content } from "@/features/calculators/health/conception-calculator/content";

const tool = getTool("conception-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <ConceptionCalculator />
      </Suspense>
    </ToolPage>
  );
}
