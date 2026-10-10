"use client";

import { useRef } from "react";
import { about } from "@/content/profile";
import { gsap, useGSAP } from "@/lib/gsap";

// Extra gap (em) added before each word, cycled. Gaps accumulate along a line, so words drift apart
// to the right without ever overlapping, then close up as you scroll.
const GAPS = [0.9, 0.35, 1.4, 0.6, 1.1, 0.25, 1.6, 0.5, 0.8, 1.2];

// About: the statement's words start spread out and slide into a normal paragraph as you scroll (scrubbed).
// A short facts list sits on the right (stands in for a portrait until there is one).
export function About() {
  const root = useRef<HTMLElement>(null);
  const words = about.statement.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-word]");

        // Start offset per word = sum of gaps since the start of its line (offsetTop ignores transforms).
        const startX = () => {
          const xs: number[] = [];
          let lineTop = -1;
          let acc = 0;
          els.forEach((el, i) => {
            if (el.offsetTop !== lineTop) {
              lineTop = el.offsetTop;
              acc = 0;
            }
            acc += GAPS[i % GAPS.length];
            xs.push(acc);
          });
          return xs;
        };
        let xs = startX();

        gsap.fromTo(
          els,
          { x: (i) => `${xs[i]}em`, opacity: 0.2 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-statement]",
              start: "top 90%",
              end: "bottom 65%",
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: () => {
                xs = startX();
              },
            },
          },
        );
        gsap.from("[data-fact]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-facts]", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      className="grid grid-cols-12 gap-x-4 gap-y-16 overflow-x-clip px-4 pb-28 pt-32 lg:gap-x-8 lg:px-8 lg:pt-56"
    >
      <h2 className="sr-only">About</h2>
      <p data-statement className="col-span-12 text-statement font-semibold lg:col-span-8">
        {words.map((w, i) => (
          <span key={i}>
            <span data-word className="inline-block">
              {w}
            </span>{" "}
          </span>
        ))}
      </p>

      <dl data-facts className="col-span-12 self-end md:col-span-8 lg:col-span-3 lg:col-start-10">
        {about.facts.map((f) => (
          <div key={f.label} data-fact className="border-t border-neutral-300 py-4">
            <dt className="text-ui-sm font-semibold uppercase text-muted">{f.label}</dt>
            <dd className="text-ui font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
