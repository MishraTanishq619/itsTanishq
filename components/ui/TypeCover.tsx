import type { Project } from "@/content/projects";

// Type-only cover for projects without media (reel slides, project cards).
// Sizes use container query units, so an ancestor must set `container-type: size`.
export function TypeCover({ project, className = "bg-ink" }: { project: Project; className?: string }) {
  return (
    <div className={`flex h-full flex-col justify-center gap-[2.5cqw] px-[6cqw] text-neutral-100 ${className}`}>
      <p className="font-dot text-[clamp(9px,1.6cqw,24px)] uppercase tracking-[0.1em] text-accent">{project.category}</p>
      <p className="text-[11cqw] font-bold uppercase leading-[0.85] tracking-[-0.025em]">{project.name}</p>
      <p className="max-w-[min(60cqw,36em)] text-[clamp(11px,2.2cqw,30px)] leading-snug text-neutral-400">
        {project.summary}
      </p>
      <p className="font-dot text-[clamp(9px,1.4cqw,20px)] uppercase tracking-[0.1em] text-neutral-300">
        {project.tags.join(" · ")}
      </p>
    </div>
  );
}
