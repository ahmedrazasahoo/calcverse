import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import BusinessDaysCalculator from "@/features/calculators/everyday/business-days-calculator/BusinessDaysCalculator";
import { content } from "@/features/calculators/everyday/business-days-calculator/content";

const tool = getTool("business-days-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <BusinessDaysCalculator />
      </Suspense>
    </ToolPage>
  );
}
