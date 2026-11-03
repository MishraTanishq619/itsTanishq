"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TypeCover } from "./TypeCover";

const SLIDE_MS = 5500;

// Project slideshow that fills its parent. Screenshot slides pan top-to-bottom like a scroll recording;
// projects without media get a type-only slide. Auto-advances only while visible and motion is allowed.
// Sizes use container query units, so the parent must set `container-type: size`.
export function Reel({ items, preload = false }: { items: Project[]; preload?: boolean }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const go = (next: number) => {
    setPrev(index);
    setIndex(next);
  };

  useEffect(() => {
    if (reduced || !visible) return;
    const t = window.setTimeout(() => {
      setPrev(index);
      setIndex((index + 1) % items.length);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, visible, reduced, items.length]);

  const playing = visible && !reduced;
  const current = items[index];

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-ink">
      {items.map((p, i) => {
        const active = i === index;
        const panning = playing && (active || i === prev);
        return (
          <div
            key={p.slug}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 ease-standard ${active ? "opacity-100" : "opacity-0"}`}
          >
            {p.shot ? (
              <Image
                src={p.shot}
                alt={p.shotAlt ?? `${p.name} website`}
                sizes="(min-width: 1024px) 95vw, 100vw"
                preload={preload && i === 0}
                className={`h-auto w-full ${panning ? "animate-reel-pan" : ""}`}
                // Restart the pan every time the slide comes back.
                key={active ? `on-${index}` : "off"}
              />
            ) : (
              <TypeCover project={p} />
            )}
          </div>
        );
      })}

      {/* Progress + caption. The caption is keyed so it fades in with its slide. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-[3cqw] pb-[2.5cqw] pt-[8cqw] text-neutral-100">
        <div className="pointer-events-auto mb-[1.5cqw] flex gap-[0.6cqw]">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === index}
              className="relative h-[max(3px,0.35cqw)] flex-1 overflow-hidden rounded-full bg-white/25"
            >
              <span
                key={i === index ? `bar-${index}-${playing}` : "idle"}
                className={`absolute inset-0 origin-left rounded-full bg-accent ${
                  i === index && playing
                    ? "animate-reel-progress"
                    : i < index || i === index
                      ? "scale-x-100"
                      : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
        <div key={index} className="flex animate-fade-in items-end justify-between gap-4">
          <p className="text-[clamp(11px,1.7cqw,22px)] font-semibold uppercase leading-tight">
            {current.name}
            <span className="ml-[1ch] font-medium text-neutral-300">
              {current.category} · {current.year}
            </span>
          </p>
          <p aria-hidden="true" className="font-dot text-[clamp(10px,1.3cqw,16px)] text-neutral-300">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
