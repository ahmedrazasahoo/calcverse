import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import UsernameGenerator from "@/features/generators/username-generator/UsernameGenerator";
import { content } from "@/features/generators/username-generator/content";

const tool = getTool("username-generator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <UsernameGenerator />
      </Suspense>
    </ToolPage>
  );
}
