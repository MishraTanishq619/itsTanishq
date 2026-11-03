"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

const NEEDS = ["Web app or website", "Backend / API", "Automation", "Tracking & SEO", "Something else"];
const BUDGETS = ["Not sure yet", "Under $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000+"];

type Status = "idle" | "sending" | "sent" | "error";

// "Start a project" form. Netlify Forms picks the form up from public/__forms.html (same name and fields)
// and we POST to that static file, as the Netlify Next.js runtime requires. Submissions only work on a deploy.
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const body = new URLSearchParams(new FormData(e.currentTarget) as unknown as Record<string, string>).toString();
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl bg-neutral-800 px-4 py-3 text-ui text-neutral-100 placeholder:text-neutral-500 outline-none ring-1 ring-white/10 focus:ring-accent";
  const label = "mb-2 block text-ui-sm font-semibold uppercase text-neutral-400";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-2 mt-24 grid grid-cols-12 gap-x-4 gap-y-12 rounded-3xl bg-ink px-4 pb-10 pt-24 text-neutral-100 lg:mx-4 lg:mt-32 lg:gap-x-8 lg:px-8 lg:pb-16 lg:pt-32"
    >
      <div className="col-span-12 lg:col-span-5">
        <h2 id="contact-title" className="font-dot text-sm uppercase tracking-[0.1em] text-accent">
          Start a project
        </h2>
        <p className="mt-6 text-heading font-medium">Tell me what you&apos;re building. I reply within two working days.</p>
        <ul className="mt-10 flex flex-col gap-3 text-ui">
          <li>
            <a href={`mailto:${profile.email}`} className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent">
              {profile.email}
            </a>
          </li>
          <li>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent">
              Download resume (PDF) ↗
            </a>
          </li>
        </ul>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        {status === "sent" ? (
          <div role="status" className="rounded-2xl bg-neutral-800 p-8">
            <p className="text-ui-lg font-medium">Thanks, got it.</p>
            <p className="mt-2 text-ui text-neutral-300">I&apos;ll get back to you by email soon.</p>
          </div>
        ) : (
          <form name="project" onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
            <input type="hidden" name="form-name" value="project" />
            <p hidden>
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>
            <div>
              <label htmlFor="c-name" className={label}>Name</label>
              <input id="c-name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="c-email" className={label}>Email</label>
              <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="c-need" className={label}>What do you need?</label>
              <select id="c-need" name="need" required defaultValue="" className={field}>
                <option value="" disabled>Choose one</option>
                {NEEDS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-budget" className={label}>Budget</label>
              <select id="c-budget" name="budget" defaultValue={BUDGETS[0]} className={field}>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="c-message" className={label}>Project details</label>
              <textarea id="c-message" name="message" required rows={5} placeholder="What are you building, and by when?" className={field} />
            </div>
            <div className="flex flex-wrap items-center gap-4 md:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-accent px-6 py-3 text-ui font-semibold text-ink transition-opacity disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send project details"}
              </button>
              {status === "error" && (
                <p role="alert" className="text-ui-sm text-neutral-300">
                  That didn&apos;t send. Email me at {profile.email} instead.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
