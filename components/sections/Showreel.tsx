"use client";

import { useRef } from "react";
import { reelProjects } from "@/content/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { introPending, onIntro } from "@/lib/intro";
import { Reel } from "@/components/ui/Reel";

const SMALL_TOP = 104; // px from the viewport top for the small card, just below the info row
// Full-size card sits between the info row and the dock (stage padding pt-[88px] pb-28).
const STAGE_TOP = 88;
const STAGE_BOTTOM = 112;

// Desktop (lg+, motion allowed): the section overlaps the hero; its card starts small at the top of the
// hero and grows to full width while you scroll one viewport, then holds before scrolling away.
// Reduced motion: a static full-size card in the page flow. Below lg: see ShowreelCard.
export function Showreel() {
  const wrap = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = card.current!;

        // Scale and offset that shrink the full-size card into the free space above the hero words.
        const start = () => {
          const words = document.querySelector("[data-hero-words]");
          const wordsTop = words ? words.getBoundingClientRect().top + window.scrollY : innerHeight * 0.55;
          const h = Math.max(90, Math.min(wordsTop - 32 - SMALL_TOP, innerHeight * 0.32, (innerWidth * 0.34 * 9) / 16));
          const s = h / el.offsetHeight;
          const naturalCenter = STAGE_TOP + (innerHeight - STAGE_TOP - STAGE_BOTTOM) / 2;
          return { s, y: SMALL_TOP + h / 2 - naturalCenter };
        };

        gsap.fromTo(
          el,
          { scale: () => start().s, y: () => start().y, borderRadius: () => 14 / start().s },
          {
            scale: 1,
            y: 0,
            borderRadius: 24,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: () => `+=${innerHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        const pending = introPending();
        return onIntro(() => {
          gsap.to(el, { autoAlpha: 1, duration: pending ? 0.9 : 0, delay: pending ? 0.6 : 0, ease: "power2.out" });
        });
      });
    },
    { scope: wrap },
  );

  return (
    <section
      ref={wrap}
      aria-label="Project showreel"
      className="pointer-events-none relative hidden lg:block lg:h-svh lg:motion-safe:-mt-[100svh] lg:motion-safe:h-[250svh]"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center pb-28 pt-[88px]">
        <div
          ref={card}
          className="pointer-events-auto relative aspect-video w-[min(calc(100vw-4rem),calc((100svh-216px)*16/9))] overflow-hidden rounded-3xl [container-type:size] motion-safe:opacity-0"
        >
          <Reel items={reelProjects} preload />
        </div>
      </div>
    </section>
  );
}

// Below lg the reel is a plain card that fills the free space in the hero (see Hero's `media` slot).
export function ShowreelCard() {
  return (
    <div
      role="region"
      aria-label="Project showreel"
      className="relative h-full w-full overflow-hidden rounded-2xl [container-type:size]"
    >
      <Reel items={reelProjects} preload />
    </div>
  );
}
