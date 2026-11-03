import type { StaticImageData } from "next/image";
import technorollixShot from "@/public/reel/technorollix.jpg";
import zcrumShot from "@/public/reel/zcrum.jpg";
import adeShot from "@/public/reel/ade.jpg";
import whiteboardCover from "@/public/reel/whiteboard.jpg";
import documindCover from "@/public/reel/documind.jpg";

// Project data, reused by the showreel now and the work grid / case studies later.
// Facts come from research/content-inventory.md. No HealthyDay numbers.
export type Project = {
  slug: string;
  name: string;
  year: number;
  category: string;
  summary: string;
  tags: string[];
  live?: string;
  repo?: string;
  // Full-page screenshot, panned top-to-bottom in the reel. Without one the reel shows a type-only slide.
  shot?: StaticImageData;
  // Alt text when the image isn't a screenshot of the site (e.g. an architecture cover).
  shotAlt?: string;
};

export const projects: Project[] = [
  {
    slug: "healthyday",
    name: "HealthyDay",
    year: 2026,
    category: "Product",
    summary: "Student portal, checkout and the Women's Hormonal Health programme for a Telugu-first yoga platform.",
    tags: ["React", "TypeScript", "Netlify Functions", "GCP", "Razorpay", "pdf.js"],
  },
  {
    slug: "whiteboard",
    name: "Whiteboard",
    year: 2026,
    category: "Real-time",
    summary: "Excalidraw-style canvas with conflict-free multi-user sync, offline edits and undo/redo.",
    tags: ["React", "Yjs (CRDT)", "WebSockets", "Fastify", "PostgreSQL", "Prisma", "TurboRepo"],
    repo: "https://github.com/MishraTanishq619/WhiteBoard",
    // Architecture cover (rendered from the case study's real design) until there are screenshots.
    shot: whiteboardCover,
    shotAlt: "Whiteboard architecture: React clients, Fastify API gateway, auth, realtime sync and persistence services",
  },
  {
    slug: "documind",
    name: "DocuMind",
    year: 2026,
    category: "GenAI",
    summary: "Chat with your PDFs: ingestion, Pinecone vector search, Gemini answers streamed over SSE.",
    tags: ["Next.js 15", "Gemini", "Pinecone", "LangChain", "MongoDB", "SSE"],
    // Live URL docu-mind-murex.vercel.app returned 404 on 11 Oct 2026; add it back once redeployed.
    repo: "https://github.com/MishraTanishq619/DocuMind",
    // RAG pipeline cover until the app is redeployed and can be screenshotted.
    shot: documindCover,
    shotAlt: "DocuMind RAG pipeline: PDF to chunks, Gemini embeddings and Pinecone; question rewrite, vector search and streamed answer",
  },
  {
    slug: "ade",
    name: "ADE",
    year: 2026,
    category: "Desktop app",
    summary: "Agentic dev environment: parallel Claude Code sessions, each in its own git worktree, with diff review and merge built in.",
    tags: ["Electron", "React", "TypeScript", "Node.js", "SQLite", "Monaco"],
    // Personal tool; the repo is private. Screenshot from its UI test run (diff review).
    shot: adeShot,
    shotAlt: "ADE desktop app: a Claude Code session, its changed files and a code diff",
  },
  {
    slug: "technorollix-2025",
    name: "Technorollix 2025",
    year: 2025,
    category: "Platform",
    summary: "Registration platform for the college fest: email OTP signup, teams via invites, payments and an admin portal.",
    tags: ["Next.js", "Server Actions", "MongoDB", "JWT", "Nodemailer", "Nginx", "AWS EC2"],
    live: "https://technorollix25-mishratanishq.netlify.app/",
    repo: "https://github.com/MishraTanishq619/Technorollix2025",
    shot: technorollixShot,
  },
  {
    slug: "zcrum",
    name: "Zcrum",
    year: 2025,
    category: "Product",
    summary: "Jira-inspired project management with drag-and-drop Kanban boards and sprints.",
    tags: ["Next.js", "Prisma", "NeonDB", "Clerk", "shadcn/ui"],
    live: "https://jira-clone-mishratanishq.netlify.app/",
    repo: "https://github.com/MishraTanishq619/jira-clone",
    shot: zcrumShot,
  },
  {
    slug: "aurika",
    name: "Aurika Tech",
    year: 2024,
    category: "Internship",
    summary: "Jewellery seller platform on ONDC: admin gold-rate pricing, API and Docker build improvements.",
    tags: ["React", "Node.js", "Flask", "ONDC", "Docker", "AWS"],
  },
];

// Order of slides in the home showreel.
export const reelSlugs = ["technorollix-2025", "ade", "whiteboard", "zcrum", "documind"];
export const reelProjects = reelSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

// Home "Work" section: 2×2 grid.
export const featuredSlugs = ["healthyday", "whiteboard", "documind", "technorollix-2025"];
export const featuredProjects = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)!);
