"use client";

import { useEffect, useRef, useState } from "react";
import { INTRO_EVENT } from "@/lib/intro";

const COUNT_MS = 900;

// First-visit loader: counts 0→100, then the panel slides up and unmounts.
// Hidden by CSS (html[data-loader="skip"]) on repeat visits and for reduced motion.
export function Loader() {
  const [phase, setPhase] = useState<"count" | "exit" | "done">("count");
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Already hidden by CSS; nothing to animate.
    if (document.documentElement.dataset.loader === "skip") return;
    let raf = 0;
    let exitTimer = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("tm-loaded", "1");
        document.documentElement.dataset.loader = "done";
        window.dispatchEvent(new Event(INTRO_EVENT));
        setPhase("exit");
        exitTimer = window.setTimeout(() => setPhase("done"), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      data-loader-root
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-page transition-transform duration-[600ms] ease-expo ${
        phase === "exit" ? "-translate-y-full" : ""
      }`}
    >
      <span
        ref={countRef}
        className={`text-sm font-semibold tabular-nums tracking-tight transition-opacity duration-300 ${
          phase === "exit" ? "opacity-0" : ""
        }`}
      >
        0
      </span>
    </div>
  );
}
