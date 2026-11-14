import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import UuidGenerator from "@/features/generators/uuid-generator/UuidGenerator";
import { content } from "@/features/generators/uuid-generator/content";

const tool = getTool("uuid-generator")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <UuidGenerator />
    </ToolPage>
  );
}
