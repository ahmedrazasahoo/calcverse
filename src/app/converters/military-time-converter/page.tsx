import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import MilitaryTimeConverter from "@/features/converters/military-time-converter/MilitaryTimeConverter";
import { content } from "@/features/converters/military-time-converter/content";

const tool = getTool("military-time-converter")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <MilitaryTimeConverter />
      </Suspense>
    </ToolPage>
  );
}
