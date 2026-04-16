import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "블로그 작성자와 관심 분야를 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="section-eyebrow">About</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">블로그 소개</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">{siteConfig.author.bio}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="soft-card">
          <h2 className="text-xl font-semibold tracking-tight">이 블로그에서 다루는 것</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted-foreground)]">
            <li>프론트엔드 설계와 컴포넌트 구조</li>
            <li>게임 UI와 인터랙션 설계 메모</li>
            <li>개발 경험 개선과 협업 과정 기록</li>
            <li>프로젝트 회고와 제품 제작 노트</li>
          </ul>
        </article>
        <article className="soft-card">
          <h2 className="text-xl font-semibold tracking-tight">기록 방식</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
            긴 자기소개보다 읽을 만한 기록이 먼저 보이도록 구성합니다. 글은 짧은 요약, 명확한 구조, 차분한 톤을 우선합니다.
          </p>
        </article>
      </div>
    </div>
  );
}
