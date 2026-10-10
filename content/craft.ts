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

// "How I build" panel. Draft copy based on real work (research/content-inventory.md); no metrics.
export const craftIntro =
  "Most of the people I build for are on their phones. So I design mobile-first, keep secrets on the server, and measure before I optimise.";

export type CraftRow = {
  title: string;
  body: string;
  chips: string[];
  visual: "form" | "flow" | "checklist";
};

export const craftRows: CraftRow[] = [
  {
    title: "Product UI",
    body: "Figma to fast, accessible interfaces: landing pages, multi-step forms, dashboards, and the small states in between (loading, empty, error).",
    chips: ["React", "Next.js", "TypeScript", "Tailwind", "Figma to code", "Accessibility"],
    visual: "form",
  },
  {
    title: "Backend & data",
    body: "APIs, auth and the glue between services: serverless functions, Postgres and Mongo schemas, real-time sync with WebSockets and CRDTs, data exports for marketing.",
    chips: ["Node.js", "Flask", "PostgreSQL", "MongoDB", "WebSockets", "GCP"],
    visual: "flow",
  },
  {
    title: "Performance & reliability",
    body: "Lazy routes, cached assets, images sized right, API keys kept off the client, and preview modes so features get tested without real user data.",
    chips: ["Code splitting", "Caching", "Lighthouse", "Docker", "CI/CD", "Security"],
    visual: "checklist",
  },
];

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
