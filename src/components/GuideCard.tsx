import Link from "next/link";
import type { GuidePost } from "@/lib/guides";
import { guidePath, guideReadingTime } from "@/lib/guides";

/** Card for a guide post, used on the /guides hub and in related reading. */
export default function GuideCard({ post }: { post: GuidePost }) {
  return (
    <Link
      href={guidePath(post)}
      className="glass group relative flex h-full min-h-11 flex-col overflow-hidden rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 sm:p-7"
    >
      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-amber-400 transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div className="flex items-center justify-between gap-3">
        <span className="glass-chip rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-gray-700 uppercase">
          {post.category}
        </span>
        <span className="text-xs font-medium text-gray-500">{guideReadingTime(post)} min read</span>
      </div>
      <h3 className="mt-4 text-base leading-snug font-semibold text-gray-900 transition-colors group-hover:text-brand-800">
        {post.title}
      </h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
      <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-brand-700">
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
    </Link>
  );
}
