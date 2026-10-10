// Full case studies, keyed by project slug. Projects without an entry get the basic project page.
// Whiteboard facts come from the repo (readme.md, PlanOfExecution.md, TEST_STATUS.md, prisma schemas), Oct 2026.

export type Decision = { title: string; why: string; tradeoff: string };
export type ArchNode = { name: string; tech: string; does: string };

export type CaseStudy = {
  headline: string;
  role: string;
  timeline: string;
  status: string;
  question: string;
  rule: string;
  architecture: {
    client: ArchNode;
    gateway: ArchNode;
    auth: ArchNode;
    realtime: ArchNode;
    persistence: ArchNode;
  };
  flows: { name: string; path: string }[];
  decisions: Decision[];
  details: { title: string; items: string[] };
  quality: string[];
  next: string[];
  learned: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  whiteboard: {
    headline: "A whiteboard where the server never looks at your drawing.",
    role: "Solo: design, frontend, backend",
    timeline: "Dec 2025 – Jan 2026",
    status: "Core complete, deployment next",
    question:
      "How do tools like Excalidraw let several people draw on one board at the same time without overwriting each other, and what does the backend for that look like if it has to scale? I built one to find out, architecture first rather than a quick demo.",
    rule: "All canvas intelligence lives on the client. The backend never interprets drawings, shapes or text.",
    architecture: {
      client: { name: "React app", tech: "Vite · Canvas · RoughJS · Yjs · Zustand", does: "Draws, edits and merges everything" },
      gateway: { name: "API gateway", tech: "Fastify", does: "JWT checks, CORS, rate limits, routing. No business logic" },
      auth: { name: "Auth service", tech: "Fastify · PostgreSQL · Prisma", does: "Users, boards, permissions" },
      realtime: { name: "Realtime sync", tech: "ws · Yjs · y-protocols", does: "Relays updates and presence per board room. No database" },
      persistence: { name: "Persistence", tech: "Fastify · PostgreSQL · Prisma", does: "Yjs binary snapshots + an update log" },
    },
    flows: [
      { name: "Editing", path: "Client → Realtime → other clients" },
      { name: "Saving", path: "Realtime → Persistence → PostgreSQL" },
      { name: "Loading", path: "Client → Gateway → Persistence → Yjs binary" },
    ],
    decisions: [
      {
        title: "A CRDT (Yjs) instead of a server that owns the state",
        why: "Concurrent edits merge on their own, people can keep drawing offline, and the servers stay thin because they never have to resolve conflicts.",
        tradeoff: "The document carries its history, so it grows. That is why snapshots and cleanup exist. Binary updates are also harder to debug than JSON.",
      },
      {
        title: "Store the Yjs binary, not JSON shapes",
        why: "Loading a board restores exactly the state the clients had, and writes are cheap byte blobs.",
        tradeoff: "The database cannot query shapes. Any analytics or search would have to decode the document first.",
      },
      {
        title: "Snapshots plus an incremental update log",
        why: "Every update is stored with a sequence number; a full snapshot is taken every 100 updates or 5 minutes. Loading = latest snapshot + updates since it.",
        tradeoff: "Old versions pile up, so there is a cleanup endpoint (keep the last N versions, drop old ones).",
      },
      {
        title: "The realtime service has no database access",
        why: "It only relays messages and manages rooms (created on first join, destroyed 30 minutes after the last person leaves), so it stays small and easy to reason about.",
        tradeoff: "Persisting costs an extra HTTP hop to the persistence service, and running more than one instance would need board-based sticky routing.",
      },
      {
        title: "Undo is local-only",
        why: "Pressing Cmd+Z only undoes your own changes, so it can never delete someone else's work.",
        tradeoff: "There is no shared history to rewind the whole board.",
      },
      {
        title: "A gateway in front of every service",
        why: "One entry point for the frontend, and JWT checks, CORS, request IDs and rate limits (100 requests per 15 min per IP and per user, 20 for login/register) live in one place.",
        tradeoff: "One more network hop, and the discipline to keep it dumb: it never touches canvas state or WebSocket rooms.",
      },
    ],
    details: {
      title: "The canvas engine",
      items: [
        "HTML Canvas scaled for devicePixelRatio, requestAnimationFrame render loop",
        "Pan and zoom viewport with a grid background",
        "RoughJS shapes: rectangle, ellipse, line, arrow, freehand",
        "Select, multi-select, 8-point resize and rotation handles",
        "Text editing through a DOM overlay, then drawn to canvas",
        "Remote cursors, colours and selections through Yjs Awareness",
        "Context menu: bring to front, send to back, duplicate, delete",
        "Board list, sharing by email, login and register",
      ],
    },
    quality: [
      "145 Vitest tests across auth (37), gateway (22), persistence (25), realtime (15) and shared utils (46)",
      "Playwright set up for end-to-end tests",
      "TurboRepo monorepo with shared types, config and utils packages",
      "Structured logs (Pino) and consistent error responses",
    ],
    next: [
      "Dockerfiles per service and a real deployment",
      "Load test the realtime service with 100 concurrent users",
      "Dirty-rectangle rendering and Yjs update batching",
      "WebSocket compression and database index tuning",
    ],
    learned:
      "Most of the hard problems were not in the drawing code. They were in deciding which service is allowed to know what. Writing the rule down first (the backend never interprets drawings) made every later decision easier.",
  },
};
