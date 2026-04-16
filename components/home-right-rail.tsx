import Link from "next/link";

import { HomeSearchPanel } from "@/components/home-search-panel";
import type { PostSummary } from "@/lib/posts";

type TagSummary = {
  tag: string;
  count: number;
};

type HomeRightRailProps = {
  posts: PostSummary[];
  tags: TagSummary[];
};

export function HomeRightRail({ posts, tags }: HomeRightRailProps) {
  const updatedPosts = posts.slice(0, 4);
  const trendingTags = tags.slice(0, 8);

  return (
    <aside className="space-y-10 lg:w-[260px] lg:shrink-0">
      <HomeSearchPanel posts={posts} />

      <section className="space-y-3">
        <div>
          <p className="section-eyebrow">Recently Updated</p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">최근 업데이트</h2>
        </div>
        <div className="space-y-3">
          {updatedPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="block group">
              <p className="text-sm font-medium leading-6 transition group-hover:text-[var(--accent-strong)]">
                {post.title}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {post.updatedAt ?? post.date} · {post.category}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="section-eyebrow">Trending Tags</p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">인기 태그</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((item) => (
            <Link key={item.tag} href={{ pathname: "/posts", query: { tag: item.tag } }} className="soft-badge">
              #{item.tag}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
