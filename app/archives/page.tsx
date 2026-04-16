import type { Metadata } from "next";
import Link from "next/link";

import { getArchiveGroups } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Archives",
  description: "월별 아카이브 페이지입니다.",
};

export default async function ArchivesPage() {
  const archives = await getArchiveGroups();

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="section-eyebrow">Archives</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">아카이브</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          작성 시점을 기준으로 글을 다시 찾아볼 수 있습니다.
        </p>
      </section>

      <div className="space-y-4">
        {archives.map((group) => (
          <section key={group.key} className="soft-card">
            <h2 className="text-lg font-semibold tracking-tight">{group.key}</h2>
            <div className="mt-4 space-y-3">
              {group.items.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="archive-link">
                  <span className="text-sm text-[var(--muted-foreground)]">{formatDate(post.date)}</span>
                  <span className="font-medium">{post.title}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
