"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SearchIcon } from "@/components/icons";
import type { PostSummary } from "@/lib/posts";

export function HomeSearchPanel({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    return posts
      .filter((post) =>
        [post.title, post.description, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 5);
  }, [posts, query]);

  return (
    <section className="space-y-3">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="글 제목이나 태그 검색"
          className="h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 text-sm outline-none transition focus:border-[var(--accent-strong)]"
        />
      </div>
      {query ? (
        <div className="space-y-2 text-sm">
          {results.length > 0 ? (
            results.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block rounded-xl px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
              >
                {post.title}
              </Link>
            ))
          ) : (
            <p className="px-1 text-[var(--muted-foreground)]">검색 결과가 없습니다.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
