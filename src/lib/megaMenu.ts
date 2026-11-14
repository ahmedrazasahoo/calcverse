/**
 * Header mega menu data, generated from the tools and guides registries so
 * the navigation can never drift out of date when a tool or guide is added.
 * Pure data in, pure data out: the Header component only renders this.
 */
import {
  CALCULATOR_CATEGORIES,
  GROUP_LABELS,
  GROUP_PATHS,
  liveTools,
  toolPath,
  type Tool,
  type ToolGroup,
} from "@/lib/tools";
import {
  GUIDE_CATEGORIES,
  guidePath,
  guides,
  guidesInCategory,
  type GuideCategory,
} from "@/lib/guides";

export interface MegaLink {
  label: string;
  href: string;
  /** Small muted note shown next to the label, e.g. "12 guides". */
  note?: string;
}

export interface MegaColumn {
  heading: string;
  links: MegaLink[];
}

export interface MegaCategoryLink {
  name: string;
  count: number;
  href: string;
}

export interface MegaSection {
  id: string;
  label: string;
  hubPath: string;
  hubLabel: string;
  /** Category columns of tool links (empty for the guides section). */
  columns: MegaColumn[];
  /** Full-width strip under the columns, used for the US state sales tax pages. */
  wideSection?: { heading: string; links: MegaLink[] };
  /** Guides only: the seven guide categories with their post counts. */
  categories?: MegaCategoryLink[];
  /** Guides only: a few featured posts. */
  featured?: { heading: string; links: MegaLink[] };
}

const NAV_GROUPS: ToolGroup[] = ["calculators", "tools", "converters", "generators"];

/** Slugs of the per-state sales tax pages (the hub calculator itself excluded). */
function isStateSalesTaxPage(tool: Tool): boolean {
  return tool.slug !== "sales-tax-calculator" && tool.slug.endsWith("-sales-tax-calculator");
}

function toLink(tool: Tool): MegaLink {
  return { label: tool.name, href: toolPath(tool) };
}

/** Live tools of one group, grouped into one column per registry category. */
function categoryColumns(group: ToolGroup): MegaColumn[] {
  const live = liveTools().filter((tool) => tool.group === group);
  const categories: string[] =
    group === "calculators"
      ? [...CALCULATOR_CATEGORIES]
      : [...new Set(live.map((tool) => tool.category))];
  return categories
    .map((category) => ({
      heading: category,
      links: live
        .filter((tool) => tool.category === category && !isStateSalesTaxPage(tool))
        .map(toLink),
    }))
    .filter((column) => column.links.length > 0);
}

function stateSalesTaxSection(): MegaSection["wideSection"] {
  const states = liveTools().filter(isStateSalesTaxPage);
  if (states.length === 0) return undefined;
  return {
    heading: "Sales tax by US state",
    links: states.map((tool) => ({
      label: tool.name.replace(/ Sales Tax Calculator$/, ""),
      href: toolPath(tool),
    })),
  };
}

function guidesSection(): MegaSection {
  const categories: MegaCategoryLink[] = GUIDE_CATEGORIES.map((category: GuideCategory) => ({
    name: category,
    count: guidesInCategory(category).length,
    href: "/guides",
  }));
  const featuredPosts = [...guides]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);
  return {
    id: "guides",
    label: "Guides",
    hubPath: "/guides",
    hubLabel: "View all guides",
    columns: [],
    categories,
    featured: {
      heading: "Featured guides",
      links: featuredPosts.map((post) => ({ label: post.title, href: guidePath(post) })),
    },
  };
}

/** The five header sections, in display order. */
export function buildMegaMenu(): MegaSection[] {
  const sections: MegaSection[] = NAV_GROUPS.map((group) => ({
    id: group,
    label: GROUP_LABELS[group],
    hubPath: GROUP_PATHS[group],
    hubLabel: `View all ${GROUP_LABELS[group].toLowerCase()}`,
    columns: categoryColumns(group),
    wideSection: group === "calculators" ? stateSalesTaxSection() : undefined,
  }));
  sections.push(guidesSection());
  return sections;
}
