import type { Project } from "@/content/projects";

// Dark header panel shared by full case studies and basic project pages.
export function ProjectHeader({
  project,
  meta = [],
  summary,
}: {
  project: Project;
  meta?: { label: string; value: string }[];
  summary: string;
}) {
  return (
    <header className="mx-2 mt-28 rounded-3xl bg-ink px-4 pb-12 pt-20 text-neutral-100 lg:mx-4 lg:mt-32 lg:px-8 lg:pb-16 lg:pt-24">
      <p className="font-dot text-sm uppercase tracking-[0.1em] text-accent">
        {project.category} · {project.year}
      </p>
      <h1 className="mt-4 text-[clamp(48px,10vw,200px)] font-bold uppercase leading-[0.85] tracking-[-0.03em]">
        {project.name}
      </h1>
      <p className="mt-10 max-w-4xl text-heading font-medium">{summary}</p>

      <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-12">
        {meta.map((m) => (
          <div key={m.label} className="md:col-span-2">
            <p className="text-ui-sm font-semibold uppercase text-neutral-400">{m.label}</p>
            <p className="text-ui font-medium">{m.value}</p>
          </div>
        ))}
        <div className={meta.length ? "md:col-span-6" : "md:col-span-8"}>
          <p className="text-ui-sm font-semibold uppercase text-neutral-400">Stack</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <li key={t} className="rounded-md bg-neutral-700 px-2 py-1 font-dot text-xs uppercase tracking-[0.1em]">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-5 text-ui font-semibold">
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-accent">
                Live site ↗
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="hover:text-accent">
                Source ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
