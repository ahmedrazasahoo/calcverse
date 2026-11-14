import { GUIDE_CATEGORIES, guidePath, guidesInCategory } from "@/lib/guides";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { GROUP_LABELS, GROUP_PATHS, toolPath, tools, type ToolGroup } from "@/lib/tools";

/**
 * /llms.txt: a plain text map of the whole site for AI assistants and
 * crawlers, generated from the tool and guide registries so it can never
 * drift from what is actually live.
 */
export function GET() {
  const lines: string[] = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(
    "Every tool on CalcVerse runs locally in the visitor's browser: no signup, no uploads, no watermarks. " +
      "Tool pages explain the formula behind each answer, and the guides below go deeper with worked examples."
  );
  lines.push("");

  const groups = Object.keys(GROUP_PATHS) as ToolGroup[];
  for (const group of groups) {
    lines.push(`## ${GROUP_LABELS[group]}`);
    lines.push("");
    for (const tool of tools.filter((t) => t.group === group)) {
      const status = tool.status === "live" ? "" : " (coming soon)";
      lines.push(`- [${tool.name}](${SITE_URL}${toolPath(tool)}): ${tool.description}${status}`);
    }
    lines.push("");
  }

  lines.push("## Guides");
  lines.push("");
  lines.push(
    `- [All guides](${SITE_URL}/guides): Long-form explanations of the topics behind the tools, with formulas, worked examples and FAQs.`
  );
  lines.push("");
  for (const category of GUIDE_CATEGORIES) {
    const posts = guidesInCategory(category);
    if (posts.length === 0) continue;
    lines.push(`### ${category} guides`);
    lines.push("");
    for (const post of posts) {
      lines.push(`- [${post.title}](${SITE_URL}${guidePath(post)}): ${post.excerpt}`);
    }
    lines.push("");
  }

  lines.push("## About");
  lines.push("");
  lines.push(`- [About CalcVerse](${SITE_URL}/about)`);
  lines.push(`- [Contact](${SITE_URL}/contact)`);
  lines.push(`- [Privacy policy](${SITE_URL}/privacy)`);
  lines.push(`- [Terms](${SITE_URL}/terms)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
