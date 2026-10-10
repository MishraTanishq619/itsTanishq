"use client";

import { useRef } from "react";
import { craftIntro, craftRows, type CraftRow } from "@/content/craft";
import { gsap, useGSAP } from "@/lib/gsap";

// Dark panel: intro statement, then three numbered rows that stack on top of each other while scrolling (lg+).
export function HowIBuild() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-intro] > *", {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-intro]", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="craft-title"
      className="mx-2 rounded-3xl bg-ink px-2 pb-2 pt-24 text-neutral-100 lg:mx-4 lg:px-4 lg:pb-4 lg:pt-40"
    >
      <div data-intro className="grid grid-cols-12 gap-4 px-2 pb-20 lg:gap-8 lg:px-4 lg:pb-32">
        <h2 id="craft-title" className="col-span-12 font-dot text-sm uppercase tracking-[0.1em] text-accent lg:col-span-3">
          How I build
        </h2>
        <p className="col-span-12 text-heading font-medium lg:col-span-9">{craftIntro}</p>
      </div>

      <ol>
        {craftRows.map((row, i) => (
          <li
            key={row.title}
            style={{ top: `calc(96px + ${i * 28}px)` }}
            className="grid grid-cols-12 gap-x-4 gap-y-6 rounded-2xl border-t border-white/10 bg-neutral-800 px-4 py-8 lg:sticky lg:min-h-[420px] lg:gap-x-8 lg:px-6"
          >
            <span className="col-span-12 font-dot text-sm text-neutral-400 lg:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="col-span-12 text-heading font-medium lg:col-span-4">{row.title}</h3>
            <div className="col-span-12 md:col-span-7 lg:col-span-4">
              <p className="text-ui text-neutral-300">{row.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {row.chips.map((c) => (
                  <li key={c} className="rounded-md bg-neutral-700 px-2 py-1 font-dot text-[11px] uppercase tracking-[0.1em]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-5 lg:col-span-3">
              <Visual kind={row.visual} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// Small HTML illustrations based on real work, instead of stock images.
function Visual({ kind }: { kind: CraftRow["visual"] }) {
  const frame = "aspect-[4/3] rounded-xl bg-ink p-4 ring-1 ring-white/10";

  if (kind === "form") {
    return (
      <div aria-hidden="true" className={`${frame} flex flex-col gap-2.5`}>
        <div className="flex items-center justify-between font-dot text-[10px] uppercase tracking-[0.1em] text-neutral-400">
          <span>Step 3 of 9</span>
          <span>Address</span>
        </div>
        <div className="h-1 rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-accent" />
        </div>
        {["House no.", "Area", "District"].map((f) => (
          <div key={f} className="rounded-md bg-neutral-800 px-3 py-2 text-xs text-neutral-400">
            {f}
          </div>
        ))}
        <div className="mt-auto self-end rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-ink">Next →</div>
      </div>
    );
  }

  if (kind === "flow") {
    const steps = ["Browser", "Serverless fn", "Cloud Run API", "Postgres"];
    return (
      <div aria-hidden="true" className={`${frame} flex flex-col justify-center gap-1 font-dot text-[11px] uppercase tracking-[0.1em]`}>
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-start">
            <span className={`rounded-md px-2.5 py-1.5 ${i === 1 ? "bg-accent text-ink" : "bg-neutral-800 text-neutral-200"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <span className="pl-3 text-neutral-500">↓</span>}
          </div>
        ))}
        <span className="mt-1 text-[10px] normal-case tracking-normal text-neutral-400">API key lives here, never in the browser</span>
      </div>
    );
  }

  const checks = ["Lazy-loaded routes", "Cached assets", "Right-sized images", "Keys server-side", "Reduced motion"];
  return (
    <ul aria-hidden="true" className={`${frame} flex flex-col justify-center gap-2 text-xs`}>
      {checks.map((c) => (
        <li key={c} className="flex items-center gap-2.5 text-neutral-200">
          <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-ink">✓</span>
          {c}
        </li>
      ))}
    </ul>
  );
}
