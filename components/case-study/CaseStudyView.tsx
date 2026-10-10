import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ProjectHeader } from "./ProjectHeader";

// Full case study: header, question + rule, architecture, decisions, details, quality / next, takeaway.
export function CaseStudyView({ project, study }: { project: Project; study: CaseStudy }) {
  return (
    <>
      <ProjectHeader
        project={project}
        meta={[
          { label: "Role", value: study.role },
          { label: "Timeline", value: study.timeline },
          { label: "Status", value: study.status },
        ]}
        summary={study.headline}
      />

      <section className="grid grid-cols-12 gap-x-4 gap-y-10 px-4 pt-28 lg:gap-x-8 lg:px-8 lg:pt-40">
        <Label className="col-span-12 lg:col-span-3">The question</Label>
        <Reveal className="col-span-12 lg:col-span-9">
          <p className="text-heading font-medium">{study.question}</p>
          <blockquote className="mt-12 border-l-4 border-accent pl-6 text-statement font-semibold">“{study.rule}”</blockquote>
        </Reveal>
      </section>

      <section className="px-4 pt-28 lg:px-8 lg:pt-40">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-8">
          <Label className="col-span-12 lg:col-span-3">Architecture</Label>
          <ul className="col-span-12 grid gap-3 md:grid-cols-3 lg:col-span-9">
            {study.flows.map((f) => (
              <li key={f.name} className="border-t border-neutral-300 pt-3">
                <p className="text-ui-sm font-semibold uppercase text-muted">{f.name}</p>
                <p className="text-ui font-medium">{f.path}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16">
          <ArchitectureDiagram arch={study.architecture} />
        </div>
      </section>

      <section aria-labelledby="decisions" className="mx-2 mt-28 rounded-3xl bg-ink px-2 pb-2 pt-20 text-neutral-100 lg:mx-4 lg:mt-40 lg:px-4 lg:pb-4 lg:pt-28">
        <div className="grid grid-cols-12 gap-4 px-2 pb-12 lg:gap-8 lg:px-4 lg:pb-16">
          <h2 id="decisions" className="col-span-12 font-dot text-sm uppercase tracking-[0.1em] text-accent lg:col-span-3">
            Decisions and trade-offs
          </h2>
          <p className="col-span-12 text-heading font-medium lg:col-span-9">
            Every choice here bought something and cost something. These are the ones that shaped the system.
          </p>
        </div>
        <Reveal className="grid gap-2 md:grid-cols-2 lg:gap-4" stagger={0.06}>
          {study.decisions.map((d, i) => (
            <article key={d.title} className="flex flex-col rounded-2xl bg-neutral-800 p-5 lg:p-8">
              <span className="font-dot text-sm text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-ui-lg font-semibold">{d.title}</h3>
              <p className="mt-4 text-ui text-neutral-300">
                <span className="font-semibold text-accent">Why. </span>
                {d.why}
              </p>
              <p className="mt-3 text-ui text-neutral-400">
                <span className="font-semibold text-neutral-200">Trade-off. </span>
                {d.tradeoff}
              </p>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="grid grid-cols-12 gap-x-4 gap-y-12 px-4 pt-28 lg:gap-x-8 lg:px-8 lg:pt-40">
        <Label className="col-span-12 lg:col-span-3">{study.details.title}</Label>
        <Reveal className="col-span-12 grid gap-x-8 sm:grid-cols-2 lg:col-span-9" stagger={0.04}>
          {study.details.items.map((item) => (
            <p key={item} className="border-t border-neutral-300 py-4 text-ui font-medium">
              {item}
            </p>
          ))}
        </Reveal>
      </section>

      <section className="grid grid-cols-12 gap-x-4 gap-y-12 px-4 pt-28 lg:gap-x-8 lg:px-8 lg:pt-40">
        <ListBlock title="Quality" items={study.quality} className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-4" />
        <ListBlock title="What's next" items={study.next} className="col-span-12 md:col-span-6 lg:col-span-4" />
      </section>

      <section className="grid grid-cols-12 gap-x-4 gap-y-10 px-4 pt-28 lg:gap-x-8 lg:px-8 lg:pt-40">
        <Label className="col-span-12 lg:col-span-3">What I learned</Label>
        <Reveal className="col-span-12 lg:col-span-9">
          <p className="text-statement font-semibold">{study.learned}</p>
        </Reveal>
      </section>
    </>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-dot text-sm uppercase tracking-[0.1em] text-muted ${className}`}>{children}</h2>;
}

function ListBlock({ title, items, className }: { title: string; items: string[]; className: string }) {
  return (
    <div className={className}>
      <Label>{title}</Label>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item} className="border-t border-neutral-300 py-4 text-ui font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Previous / next project links at the bottom of every project page.
export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav aria-label="More projects" className="grid grid-cols-2 gap-2 px-2 pt-28 lg:gap-4 lg:px-4 lg:pt-40">
      {[
        { p: prev, dir: "Previous" },
        { p: next, dir: "Next" },
      ].map(({ p, dir }) => (
        <Link
          key={dir}
          href={`/work/${p.slug}`}
          className={`group rounded-2xl bg-neutral-200 p-5 transition-colors duration-500 ease-standard hover:bg-ink hover:text-neutral-100 lg:rounded-3xl lg:p-8 ${
            dir === "Next" ? "text-right" : ""
          }`}
        >
          <p className="text-ui-sm font-semibold uppercase text-neutral-600 group-hover:text-neutral-400">
            {dir === "Previous" ? "← Previous" : "Next →"}
          </p>
          <p className="mt-2 text-[clamp(24px,4vw,64px)] font-bold uppercase leading-none tracking-[-0.03em]">{p.name}</p>
        </Link>
      ))}
    </nav>
  );
}
