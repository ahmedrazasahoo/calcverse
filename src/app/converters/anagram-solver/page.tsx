import type { Metadata } from "next";
import ToolPage from "@/components/ToolPage";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/seo";
import AnagramSolver from "@/features/converters/anagram-solver/AnagramSolver";
import { content } from "@/features/converters/anagram-solver/content";

const tool = getTool("anagram-solver")!;

export const metadata: Metadata = toolMetadata(tool, content.seoTitle, tool.description);

export default function Page() {
  return (
    <ToolPage tool={tool} content={content}>
      <AnagramSolver />
    </ToolPage>
  );
}
