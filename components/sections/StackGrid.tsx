"use client";

import { useRef } from "react";
import { stack } from "@/content/craft";
import { gsap, useGSAP } from "@/lib/gsap";

const TITLE = ["Tools I", "ship with"];

// Two-line title (characters rise out of a mask on enter) and a hairline logo grid: 3 featured + the rest.
export function StackGrid() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-char]", {
          yPercent: 105,
          duration: 1,
          ease: "expo.out",
          stagger: 0.03,
          scrollTrigger: { trigger: "[data-stack-title]", start: "top 80%" },
        });
        gsap.from("[data-cell]", {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: { trigger: "[data-grid]", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  const [featured, rest] = [stack.slice(0, 3), stack.slice(3)];

  return (
    <section ref={root} aria-labelledby="stack-title" className="px-4 pb-24 pt-32 lg:px-8 lg:pb-32 lg:pt-56">
      <h2 id="stack-title" className="sr-only">
        Tools I ship with
      </h2>
      <div
        data-stack-title
        aria-hidden="true"
        className="text-center text-[clamp(48px,12vw,200px)] font-bold uppercase leading-[0.85] tracking-[-0.03em]"
      >
        {TITLE.map((line) => (
          <div key={line} className="overflow-hidden pb-[0.04em]">
            {line.split("").map((ch, i) => (
              <span key={i} data-char className="inline-block whitespace-pre">
                {ch}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-24 text-ui font-semibold uppercase lg:mt-40">Used daily</p>
      {/* Hairlines come from the 1px gaps showing the grid's background. */}
      <div data-grid className="mt-4 grid gap-px bg-neutral-300">
        <ul className="grid grid-cols-3 gap-px">
          {featured.map((icon, i) => (
            <li
              key={icon.slug}
              data-cell
              className={`flex aspect-[4/3] flex-col items-center justify-center gap-3 md:aspect-[2/1] ${
                i === 0 ? "bg-ink text-neutral-100" : "bg-page"
              }`}
            >
              <Logo path={icon.path} className="size-8 md:size-14" />
              <span className="text-ui-sm font-medium">{icon.title}</span>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-4 gap-px md:grid-cols-8">
          {rest.map((icon) => (
            <li
              key={icon.slug}
              data-cell
              className="flex aspect-square flex-col items-center justify-center gap-2 bg-page px-1 text-center transition-colors duration-500 ease-standard md:gap-3 [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-accent"
            >
              <Logo path={icon.path} className="size-6 md:size-9" />
              <span className="text-ui-sm font-medium leading-tight">{icon.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Logo({ path, className }: { path: string; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={path} />
    </svg>
  );
}
