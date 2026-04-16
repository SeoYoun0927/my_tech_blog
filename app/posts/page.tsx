import type { Metadata } from "next";

import { PostsFilter } from "@/components/posts-filter";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description: "기술 글 목록과 태그별 탐색 페이지입니다.",
};

type PostsPageProps = {
  searchParams: Promise<{ tag?: string; category?: string }>;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const posts = await getAllPosts();
  const { tag, category } = await searchParams;

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="section-eyebrow">Posts</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">기술 글 모음</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          프론트엔드, 게임 UI, 개발 생산성, 회고를 차분한 톤으로 정리한 기록 모음입니다.
        </p>
      </section>
      <PostsFilter posts={posts} initialTag={tag} initialCategory={category} />
    </div>
  );
}
