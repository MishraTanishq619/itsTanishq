import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { ProjectHeader } from "@/components/case-study/ProjectHeader";
import { CaseStudyView, ProjectNav } from "@/components/case-study/CaseStudyView";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Work | Tanishq Mishra" };
  return { title: `${project.name} | Tanishq Mishra`, description: caseStudies[slug]?.headline ?? project.summary };
}

// params are awaited inside <Suspense> (Partial Prefetching): the dark panel is the instant static shell.
export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<main className="mx-2 mt-28 min-h-[70svh] rounded-3xl bg-ink lg:mx-4 lg:mt-32" />}>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const study = caseStudies[slug];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" tabIndex={-1}>
      {study ? (
        <CaseStudyView project={project} study={study} />
      ) : (
        <>
          <ProjectHeader project={project} summary={project.summary} />
          <p className="px-4 pt-16 text-ui text-muted lg:px-8">A full case study for this project is on the way.</p>
        </>
      )}
      <ProjectNav prev={prev} next={next} />
    </main>
  );
}
