import Link from "next/link";

import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="post-list-item group">
      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted-foreground)]">
        <span>{formatDate(post.date)}</span>
        <span className="dot-divider" />
        <span>{post.readingTime}</span>
        <span className="dot-divider" />
        <span>{post.category}</span>
      </div>
      <div className="mt-3 space-y-2">
        <Link href={`/posts/${post.slug}`} className="block">
          <h3 className="text-xl font-semibold tracking-tight transition group-hover:text-[var(--accent-strong)]">{post.title}</h3>
        </Link>
        <p className="text-sm leading-7 text-[var(--muted-foreground)]">{post.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.slice(0, 2).map((tag) => (
          <Link key={tag} href={{ pathname: "/posts", query: { tag } }} className="soft-badge">
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
