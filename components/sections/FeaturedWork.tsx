"use client";

import Link from "next/link";
import { useRef } from "react";
import { featuredProjects } from "@/content/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { ProjectCard } from "@/components/ui/ProjectCard";

const YEAR = "'26";

// Home work section: giant "WORK '26" title (letters rise from a mask on enter), 2×2 cards, "See all".
export function FeaturedWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-title]", start: "top 80%" } })
          .from("[data-title-letter]", { yPercent: 105, duration: 1.1, ease: "expo.out", stagger: 0.05 })
          .from("[data-title-year]", { yPercent: 105, duration: 1.1, ease: "expo.out" }, 0.2);
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
          // opacity, not autoAlpha: visibility:hidden would drop the links from the Tab order.
          gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: (i % 2) * 0.1,
            scrollTrigger: { trigger: card, start: "top 90%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="pb-16 lg:pb-24">
      <h2 id="work-title" className="sr-only">
        Selected work
      </h2>
      <div
        data-title
        aria-hidden="true"
        className="flex items-end justify-between overflow-hidden px-4 text-[clamp(64px,12vw,220px)] font-bold leading-[0.8] tracking-[-0.03em] lg:px-8"
      >
        <span className="flex">
          {"WORK".split("").map((ch, i) => (
            <span key={i} data-title-letter className="inline-block">
              {ch}
            </span>
          ))}
        </span>
        <span data-title-year className="inline-block">
          {YEAR}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-2 px-2 md:grid-cols-2 lg:mt-12 lg:gap-4 lg:px-4">
        {featuredProjects.map((p) => (
          <div key={p.slug} data-card className="min-w-0">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center lg:mt-16">
        <Link href="/work" className="group flex items-center gap-2 text-ui-lg font-medium">
          See all
          <span aria-hidden="true" className="transition-transform duration-500 ease-spring group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
