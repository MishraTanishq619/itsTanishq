"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Lenis inertia scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Off for users who prefer reduced motion (native scroll; ScrollTrigger still works).
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  const lenis = useLenis(() => ScrollTrigger.update());
  const pathname = usePathname();

  // On client-side navigation Lenis keeps its old scroll target; jump to the top (hash links scroll themselves).
  useEffect(() => {
    if (!location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  useEffect(() => {
    if (reduced) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [reduced]);

  return (
    <>
      {!reduced && <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, anchors: true, autoRaf: false }} />}
      {children}
    </>
  );
}
