import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "@/components/GuideArticle";
import { getGuide, guidePath, guides } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Cache Components: pages are generated from generateStaticParams; opt
// out of instant prerendering and render on demand, like the tool pages.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getGuide(slug);
  if (!post) return {};
  const url = `${SITE_URL}${guidePath(post)}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.metaTitle} | ${SITE_NAME}`,
      description: post.metaDescription,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.updatedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const post = getGuide(slug);
  if (!post) notFound();

  const url = `${SITE_URL}${guidePath(post)}`;
  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.updatedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    articleSection: post.category,
    keywords: post.keyword,
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <GuideArticle post={post} />
    </>
  );
}
