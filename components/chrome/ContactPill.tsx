import { profile } from "@/content/profile";

// Fixed "Get in touch" pill, top-right. On hover the emoji springs in from the left.
export function ContactPill() {
  return (
    <a
      href={`mailto:${profile.email}`}
      className="group fixed right-4 top-4 z-50 flex items-center overflow-hidden rounded-full bg-ink px-5 py-3 text-ui font-semibold text-neutral-100 ring-1 ring-white/10 lg:right-8 lg:top-6 lg:px-6 lg:py-3.5"
    >
      <span
        aria-hidden="true"
        className="inline-block w-0 -translate-x-4 scale-50 opacity-0 transition-all duration-700 ease-spring [@media(hover:hover)]:group-hover:mr-2 [@media(hover:hover)]:group-hover:w-[1.2em] [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100"
      >
        🤙
      </span>
      Get in touch
    </a>
  );
}
