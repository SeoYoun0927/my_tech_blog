import type { Metadata } from "next";
import Link from "next/link";

import { getAllCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Categories",
  description: "카테고리별 글 탐색 페이지입니다.",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="section-eyebrow">Categories</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">카테고리</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          글을 주제별로 묶어 볼 수 있도록 카테고리를 정리했습니다.
        </p>
      </section>
      <div className="soft-card">
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((item) => (
            <Link key={item.category} href={{ pathname: "/posts", query: { category: item.category } }} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 transition hover:border-[var(--accent-strong)]">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">{item.category}</span>
                <span className="text-sm text-[var(--muted-foreground)]">{item.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
