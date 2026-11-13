import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import { toolMetadata } from "@/lib/seo";
import { getToolInGroup, toolsInGroup } from "@/lib/tools";

const GROUP = "calculators" as const;

export function generateStaticParams() {
  return toolsInGroup(GROUP)
    .filter((tool) => tool.status === "soon")
    .map((tool) => ({ slug: tool.slug }));
}

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
