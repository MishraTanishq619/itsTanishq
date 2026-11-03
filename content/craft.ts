import {
  siDocker,
  siFigma,
  siGooglecloud,
  siMongodb,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

// "Services" panel (was "How I build"). Draft copy based on real work (research/content-inventory.md); no metrics.
export const craftIntro =
  "I build for founders and small teams, end to end: the web app, the backend behind it, the automations around it, and the tracking that shows what's working.";

export type CraftRow = {
  title: string;
  body: string;
  chips: string[];
  visual: "form" | "flow" | "automation" | "tracking";
};

export const craftRows: CraftRow[] = [
  {
    title: "Web apps & sites",
    body: "Landing pages, dashboards and full products, from Figma to a fast, accessible, mobile-first build: multi-step forms, checkout, and the small states in between (loading, empty, error).",
    chips: ["React", "Next.js", "TypeScript", "Tailwind", "Figma to code", "Lighthouse"],
    visual: "form",
  },
  {
    title: "Backend & APIs",
    body: "APIs, auth and the glue between services: serverless functions, Postgres and Mongo schemas, real-time sync with WebSockets, Dockerised services on AWS or GCP, with API keys kept off the client.",
    chips: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Docker", "AWS / GCP"],
    visual: "flow",
  },
  {
    title: "Automation",
    body: "Workflows that run without anyone pressing a button: WhatsApp reminders, webhooks between tools, scheduled jobs and data exports your team can trigger themselves.",
    chips: ["Make.com", "WhatsApp", "Webhooks", "Cloud Functions", "Google Sheets", "CSV exports"],
    visual: "automation",
  },
  {
    title: "Tracking & SEO",
    body: "GTM and GA4 events that fire when they should, conversion events for ad platforms, and the metadata, sitemaps and page speed that help you get found.",
    chips: ["GTM", "GA4", "Conversion events", "SEO", "Sitemaps", "Core Web Vitals"],
    visual: "tracking",
  },
];

// "How I work" strip: the client process, start to finish.
export const processSteps = [
  { title: "Discovery", body: "A short call to understand the problem, the users and what done looks like." },
  { title: "Proposal", body: "Scope, timeline and a fixed price or hourly estimate, in writing, before any work starts." },
  { title: "Build", body: "Regular check-ins with a live preview link, so you see progress as it happens." },
  { title: "Launch & support", body: "Deploy, handover notes, and a support window for fixes after launch." },
] as const;

// Stack grid: first three are featured (large cells); the other eight fill one row (two on mobile).
export const stack: SimpleIcon[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siTailwindcss,
  siPostgresql,
  siMongodb,
  siDocker,
  siGooglecloud,
  siNetlify,
  siFigma,
];
