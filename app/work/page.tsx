import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work | Tanishq Mishra",
  description: "Selected projects: product work at HealthyDay, real-time systems, GenAI and full-stack platforms.",
};

const years = projects.map((p) => p.year);

export default function WorkPage() {
  return (
    <main id="main" tabIndex={-1} className="pt-36 lg:pt-48">
      <div className="px-4 lg:px-8">
        <p className="text-ui font-medium text-muted">
          [{Math.min(...years)}–{Math.max(...years)}]
        </p>
        <h1 className="text-[clamp(48px,10vw,200px)] font-bold uppercase leading-[0.85] tracking-[-0.03em]">
          Selected work
        </h1>
      </div>
      <div className="mx-2 mt-8 rounded-3xl bg-neutral-200 p-2 lg:mx-4 lg:mt-12 lg:p-4">
        <h2 className="sr-only">Projects</h2>
        <Reveal className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-4" stagger={0.06}>
          {projects.map((p, i) => (
            <div key={p.slug} className="min-w-0">
              <ProjectCard project={p} preload={i < 4} />
            </div>
          ))}
        </Reveal>
      </div>
    </main>
  );
}
