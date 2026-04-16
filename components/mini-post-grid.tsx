import Link from "next/link";

import type { PostSummary } from "@/lib/posts";

export function MiniPostGrid({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {posts.map((post, index) => (
        <Link key={post.slug} href={`/posts/${post.slug}`} className="soft-card block overflow-hidden">
          <div className={`thumbnail-swatch thumbnail-swatch-${(index % 3) + 1}`} />
          <div className="mt-4 space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent-strong)]">{post.category}</p>
            <h3 className="line-clamp-2 text-base font-semibold tracking-tight">{post.title}</h3>
            <p className="line-clamp-2 text-sm leading-6 text-[var(--muted-foreground)]">{post.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
