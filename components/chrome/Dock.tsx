"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { marqueeRoles, navLinks, profile, socialLinks } from "@/content/profile";
import { Marquee } from "./Marquee";

// Floating bottom dock: avatar, name, role ticker and the menu toggle.
// The menu opens upward inside the same dark card.
export function Dock() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="fixed bottom-4 left-1/2 z-50 w-[min(700px,calc(100%-2rem))] -translate-x-1/2"
    >
      <div className="overflow-hidden rounded-2xl bg-ink text-neutral-100 ring-1 ring-white/10 md:rounded-[20px]">
        <div
          id="dock-menu"
          inert={!open}
          className={`grid transition-[grid-template-rows] duration-700 ease-expo ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <ul className="flex flex-col gap-1 px-5 pt-6 md:px-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.endsWith(".pdf") ? (
                    <a href={link.href} target="_blank" rel="noreferrer" onClick={close} className="text-ui-lg font-semibold transition-colors hover:text-accent">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} onClick={close} className="text-ui-lg font-semibold transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ul className="mx-5 mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t border-white/10 pb-2 pt-4 md:mx-6">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ui-sm text-neutral-400 transition-colors hover:text-neutral-100"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4 p-2 pr-4 md:pr-6">
          <div
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent font-dot text-xl text-ink md:size-20 md:text-2xl"
          >
            TM
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold uppercase md:text-lg">{profile.name}</p>
            <Marquee items={marqueeRoles} className="font-dot text-xs uppercase tracking-[0.1em] text-neutral-300" />
          </div>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="dock-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative size-10 shrink-0 rounded-lg"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-transform duration-500 ease-spring ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current transition-transform duration-500 ease-spring ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
