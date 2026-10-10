import Link from "next/link";
import { profile, socialLinks } from "@/content/profile";

const social = Object.fromEntries(socialLinks.map((l) => [l.label, l.href]));

// Bento of frosted tiles over a giant wordmark: the word is crisp in the gaps and blurred behind the tiles.
const tiles = [
  { label: "Work", href: "/work", area: "col-span-2 lg:col-span-2 lg:row-span-1 min-h-48 lg:min-h-[22rem]" },
  { label: "GitHub", href: social.GitHub, area: "lg:col-start-3 lg:row-start-1 min-h-40" },
  { label: "Contact", href: `mailto:${profile.email}`, area: "lg:col-start-1 lg:row-start-2 min-h-40" },
  { label: "LeetCode", href: social.LeetCode, area: "lg:col-start-1 lg:row-start-3 min-h-40" },
  { label: "LinkedIn", href: social.LinkedIn, area: "lg:col-start-2 lg:row-start-2 lg:row-span-2 min-h-40" },
  { label: "X", href: social.X, area: "col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:row-span-2 min-h-40" },
];

export function Footer() {
  return (
    <footer className="px-2 pb-36 pt-24 lg:px-4 lg:pt-32">
      <div className="relative">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[clamp(64px,16vw,300px)] font-bold leading-none tracking-[-0.04em]"
        >
          tanishq
        </p>
        <nav aria-label="Footer" className="relative grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4">
          {tiles.map((t) => {
            const external = t.href.startsWith("http");
            const className = `group flex flex-col justify-between rounded-2xl bg-neutral-200/60 p-5 backdrop-blur-xl transition-colors duration-500 ease-standard hover:bg-ink hover:text-neutral-100 lg:rounded-3xl lg:p-6 ${t.area}`;
            const inner = (
              <>
                <span aria-hidden="true" className="self-end text-ui-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {external ? "↗" : "→"}
                </span>
                <span className="text-ui-lg font-medium">{t.label}</span>
              </>
            );
            return external || t.href.startsWith("mailto:") ? (
              <a key={t.label} href={t.href} {...(external && { target: "_blank", rel: "noreferrer" })} className={className}>
                {inner}
              </a>
            ) : (
              <Link key={t.label} href={t.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-8 flex flex-col justify-between gap-2 px-2 text-ui-sm text-muted md:flex-row lg:px-4">
        <p>© 2026 {profile.name}</p>
        <p>Built with Next.js, GSAP and Lenis. Hosted on Netlify.</p>
      </div>
    </footer>
  );
}
