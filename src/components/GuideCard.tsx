import Link from "next/link";
import type { GuidePost } from "@/lib/guides";
import { guidePath, guideReadingTime } from "@/lib/guides";
import GuideBanner from "@/components/visuals/GuideBanner";

/** Card for a guide post, used on the /guides hub and in related reading. */
export default function GuideCard({ post }: { post: GuidePost }) {
  return (
    <Link
      href={guidePath(post)}
      className="group relative flex h-full min-h-11 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-150 hover:border-slate-300 hover:shadow-[0_10px_30px_-14px_rgb(15_23_42/0.18)] focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-brand-600 transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <GuideBanner category={post.category} variant="card" className="block aspect-[800/120] w-full shrink-0" />
      <span className="flex flex-1 flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.1em] text-slate-600 uppercase">
          {post.category}
        </span>
        <span className="text-xs text-slate-400">{guideReadingTime(post)} min read</span>
      </div>
      <h3 className="mt-3.5 text-[15px] leading-snug font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-slate-900">
        Read the guide
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
      </span>
    </Link>
  );
}
