import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "프로젝트와 사용 기술을 정리한 페이지입니다.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="section-eyebrow">Projects</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">프로젝트</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          직접 만들었거나 실험적으로 운영한 프로젝트를 정리했습니다. 자세한 설명과 기술 스택은 각 카드에서 확인할 수 있습니다.
        </p>
      </section>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
