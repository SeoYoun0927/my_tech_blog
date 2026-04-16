import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className={compact ? "project-inline-card" : "soft-card"}>
      <div className="flex items-start gap-3">
        <div className="project-icon">{project.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold tracking-tight">{project.name}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{project.summary}</p>
            </div>
            <a href={project.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-[var(--accent-strong)]">
              GitHub
            </a>
          </div>

          {!compact ? (
            <>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{project.description}</p>
              <p className="mt-4 text-sm font-medium">{project.highlight}</p>
            </>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, compact ? 2 : 4).map((item) => (
              <span key={item} className="soft-badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
