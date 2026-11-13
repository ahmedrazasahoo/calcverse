import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import OvulationCalculator from "@/features/calculators/health/ovulation-calculator/OvulationCalculator";
import { content } from "@/features/calculators/health/ovulation-calculator/content";

const tool = getTool("ovulation-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <OvulationCalculator />
      </Suspense>
    </ToolPage>
  );
}
