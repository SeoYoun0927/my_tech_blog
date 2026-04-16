"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SearchIcon } from "@/components/icons";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type PostsFilterProps = {
  posts: PostSummary[];
  initialTag?: string;
  initialCategory?: string;
};

export function PostsFilter({ posts, initialTag, initialCategory }: PostsFilterProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>(initialTag ?? "all");
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? "all");

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), [posts]);
  const categories = useMemo(() => Array.from(new Set(posts.map((post) => post.category))).sort(), [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = activeTag === "all" || post.tags.includes(activeTag);
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const normalized = query.trim().toLowerCase();
      const haystack = [post.title, post.description, post.category, ...post.tags].join(" ").toLowerCase();
      return matchesTag && matchesCategory && haystack.includes(normalized);
    });
  }, [activeCategory, activeTag, posts, query]);

  return (
    <div className="space-y-6">
      <div className="soft-card">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="포스트 제목, 태그, 주제를 검색해보세요"
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] pl-11 pr-4 text-sm outline-none transition focus:border-[var(--accent-strong)] focus:ring-4 focus:ring-[var(--accent-soft)]"
          />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveCategory("all")} className={activeCategory === "all" ? "soft-badge-active" : "soft-badge"}>
              전체 카테고리
            </button>
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? "soft-badge-active" : "soft-badge"}>
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveTag("all")} className={activeTag === "all" ? "soft-badge-active" : "soft-badge"}>
              전체 태그
            </button>
            {tags.map((tag) => (
              <button key={tag} type="button" onClick={() => setActiveTag(tag)} className={activeTag === tag ? "soft-badge-active" : "soft-badge"}>
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="soft-card">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
              <span>{formatDate(post.date)}</span>
              <span className="dot-divider" />
              <span>{post.readingTime}</span>
              <span className="dot-divider" />
              <span>{post.category}</span>
            </div>
            <Link href={`/posts/${post.slug}`} className="mt-4 block">
              <h3 className="text-xl font-semibold tracking-tight transition hover:text-[var(--accent-strong)]">{post.title}</h3>
            </Link>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{post.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <button key={tag} type="button" onClick={() => setActiveTag(tag)} className="soft-badge">
                  #{tag}
                </button>
              ))}
            </div>
          </article>
        ))}
        {filteredPosts.length === 0 ? (
          <div className="soft-card text-sm leading-7 text-[var(--muted-foreground)]">
            검색 결과가 없습니다. 다른 키워드나 필터로 다시 찾아보세요.
          </div>
        ) : null}
      </div>
    </div>
  );
}
