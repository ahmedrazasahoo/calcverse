import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import TypingTest from "@/features/converters/typing-test/TypingTest";
import { content } from "@/features/converters/typing-test/content";

const tool = getTool("typing-test")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <TypingTest />
      </Suspense>
    </ToolPage>
  );
}
