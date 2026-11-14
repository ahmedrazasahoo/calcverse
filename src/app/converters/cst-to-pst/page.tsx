import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TimeZonePairConverter from "@/features/converters/time-zone-converter/TimeZonePairConverter";
import { getPair } from "@/features/converters/time-zone-converter/pairs";
import { contentForPair } from "@/features/converters/time-zone-converter/content";

const tool = getTool("cst-to-pst")!;
const pair = getPair("cst-to-pst")!;
const { content } = contentForPair(pair);

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <TimeZonePairConverter pairSlug="cst-to-pst" />
      </Suspense>
    </ToolPage>
  );
}
