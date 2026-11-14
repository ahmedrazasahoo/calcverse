import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import JsonFormatter from "@/features/converters/json-formatter/JsonFormatter";
import { content } from "@/features/converters/json-formatter/content";

const tool = getTool("json-formatter")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <JsonFormatter />
    </ToolPage>
  );
}
