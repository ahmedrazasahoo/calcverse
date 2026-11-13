import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import DateCalculator from "@/features/calculators/everyday/date-calculator/DateCalculator";
import { content } from "@/features/calculators/everyday/date-calculator/content";

const tool = getTool("date-calculator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <DateCalculator />
      </Suspense>
    </ToolPage>
  );
}
