import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { Marquee } from "@/components/chrome/Marquee";
import { TypeCover } from "./TypeCover";

// Dark project card: cover (screenshot or type cover), meta row and a tag ticker.
// Hover / keyboard focus: the cover blurs and a lime pill springs in ("Read case study" when there is one).
// `preload` loads the cover eagerly; pass it for cards above the fold.
export function ProjectCard({ project, preload = false }: { project: Project; preload?: boolean }) {
  const cta = project.slug in caseStudies ? "Read case study →" : "View project →";
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.name}, ${project.category}, ${project.year}. ${cta.replace(" →", "")}`}
      className="group block rounded-2xl bg-ink p-2 text-neutral-100 md:p-3 lg:rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-800 [container-type:size] lg:rounded-2xl">
        <div className="absolute inset-0 transition-[scale,filter] duration-700 ease-expo group-focus-visible:scale-105 group-focus-visible:blur-md group-focus-visible:brightness-75 [@media(hover:hover)]:group-hover:scale-105 [@media(hover:hover)]:group-hover:blur-md [@media(hover:hover)]:group-hover:brightness-75">
          {project.shot ? (
            <Image
              src={project.shot}
              alt={`${project.name} website`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              preload={preload}
              className="object-cover object-top"
            />
          ) : (
            <TypeCover project={project} className="bg-neutral-800" />
          )}
        </div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-ui font-semibold text-ink opacity-0 transition-[scale,opacity] duration-500 ease-spring group-focus-visible:scale-100 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100"
        >
          {cta}
        </span>
      </div>

      <div className="flex items-center gap-3 px-2 pt-4 md:px-3">
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-ink"
        >
          {project.name[0]}
        </span>
        <h3 className="min-w-0 flex-1 truncate text-ui font-semibold uppercase tracking-[0.025em]">{project.name}</h3>
        <span className="text-ui font-semibold uppercase tracking-[0.025em] text-neutral-300">{project.category}</span>
        <span className="text-ui font-semibold text-neutral-300">{project.year}</span>
      </div>
      <Marquee
        items={project.tags}
        repeat={3}
        className="mx-2 mb-2 mt-2 font-dot text-xs uppercase tracking-[0.1em] text-neutral-300 md:mx-3"
      />
    </Link>
  );
}
