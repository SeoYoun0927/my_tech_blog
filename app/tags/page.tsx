import type { Metadata } from "next";
import Link from "next/link";

import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "태그별로 글을 탐색할 수 있습니다.",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="section-eyebrow">Tags</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">태그</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          자주 다루는 주제를 태그 단위로 정리했습니다.
        </p>
      </section>
      <div className="soft-card">
        <div className="flex flex-wrap gap-2">
          {tags.map((item) => (
            <Link key={item.tag} href={{ pathname: "/posts", query: { tag: item.tag } }} className="soft-badge">
              #{item.tag} <span className="ml-1 opacity-70">{item.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
