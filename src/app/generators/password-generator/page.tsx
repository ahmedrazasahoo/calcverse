import type { Metadata } from "next";
import { Suspense } from "react";
import ToolPage from "@/components/ToolPage";
import type { ToolContent } from "@/lib/content";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import PasswordGenerator from "@/features/generators/password-generator/PasswordGenerator";
import { content } from "@/features/generators/password-generator/content";

const tool = getTool("password-generator")!;

const toolContent: ToolContent = {
  seoTitle: content.title,
  howTo: content.howTo,
  explanationTitle: content.explanationTitle,
  explanation: content.explanation,
  faqs: content.faqs,
};

export const metadata: Metadata = toolMetadata(tool, content.title, content.metaDescription);

export default function Page() {
  return (
    <ToolPage tool={tool} content={toolContent}>
      <Suspense fallback={<div className="min-h-48" aria-hidden="true" />}>
        <PasswordGenerator />
      </Suspense>
    </ToolPage>
  );
}
