"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { introPending, onIntro } from "@/lib/intro";

const WORDS = ["A", "Full-stack", "Product"];
const BIG = "Engineer";

// Hero: small words spread over one giant word, scroll hints in the corners.
// The intro (letters rising out of a mask) plays only right after the first-visit loader.
// `media` fills the space above the headline below lg (the desktop showreel overlaps the hero instead).
export function Hero({ media }: { media?: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!introPending()) return; // repeat visit / reduced motion: render the final state as is
      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]");
      gsap.set(letters, { yPercent: 110 });
      gsap.set(fades, { autoAlpha: 0, y: 12 });
      return onIntro(() => {
        gsap
          .timeline({ delay: 0.15 })
          .to(letters, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.045 })
          .to(fades, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.35);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex h-svh flex-col gap-6 px-4 pb-28 pt-[88px] md:pb-36 lg:block lg:px-8 lg:py-0"
    >
      {media && <div className="relative min-h-0 flex-1 lg:hidden">{media}</div>}
      <h1 className="lg:absolute lg:inset-x-8 lg:bottom-36">
        <span className="sr-only">A full-stack product engineer</span>
        <span aria-hidden="true" data-hero-words className="flex justify-between text-ui font-semibold uppercase">
          {WORDS.map((w) => (
            <span key={w} data-fade>
              {w}
            </span>
          ))}
        </span>
        {/* Sized so the one word spans the full row (width ≈ 4.85 × font-size). */}
        <span
          aria-hidden="true"
          className="flex overflow-hidden text-[calc((100vw-2rem)/4.9)] font-bold uppercase leading-[0.85] tracking-[-0.025em] lg:text-[calc((100vw-4rem)/4.9)]"
        >
          {BIG.split("").map((ch, i) => (
            <span key={i} data-letter className="inline-block">
              {ch}
            </span>
          ))}
        </span>
      </h1>

      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-[52px] hidden justify-between text-ui font-medium xl:flex"
      >
        <span data-fade>↓ Scroll to see</span>
        <span data-fade>what I&apos;ve shipped ↓</span>
      </div>
    </section>
  );
}
