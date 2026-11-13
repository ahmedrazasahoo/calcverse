import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import { toolMetadata } from "@/lib/seo";
import { getToolInGroup } from "@/lib/tools";

const GROUP = "tools" as const;

// These catch-all pages are fully driven by the slug param, so they opt
// out of instant prerendering and render on demand.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolInGroup(GROUP, slug);
  if (!tool) return {};
  return toolMetadata(tool, `${tool.name} (Coming Soon)`, tool.description);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tool = getToolInGroup(GROUP, slug);
  if (!tool || tool.status !== "soon") notFound();
  return <ComingSoon tool={tool} />;
}
