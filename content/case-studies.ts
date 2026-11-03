// Full case studies, keyed by project slug. Projects without an entry get the basic project page.
// Whiteboard facts come from the repo (readme.md, PlanOfExecution.md, TEST_STATUS.md, prisma schemas), Oct 2026.
// Technorollix facts come from the Technorollix2025 repo (models, actions, middleware, app routes) + resume, Oct 2026.
// To confirm with Tanishq: the `rule` wording, why payments were verified manually, team size, EC2 hosting period.
// DocuMind facts come from the DocuMind repo (README, lib/indexers/pinecone.ts, API routes, proxy.ts), Oct 2026.
// HealthyDay facts come from Tanishq's work notes (ai-brain). Employer work: no numbers, no internal endpoints,
// no internal incidents. Needs Tanishq's (and possibly HealthyDay's) OK before publishing.

export type Decision = { title: string; why: string; tradeoff: string };
export type ArchNode = { name: string; tech: string; does: string };
// Architecture as top-down rows. `label` sits on the arrow into the row; null keeps a column empty.
export type ArchRow = { label?: string; nodes: (ArchNode | null)[] };

export type CaseStudy = {
  headline: string;
  role: string;
  timeline: string;
  status: string;
  question: string;
  rule: string;
  architecture: ArchRow[];
  flows: { name: string; path: string }[];
  decisions: Decision[];
  details: { title: string; items: string[] };
  quality: string[];
  next: string[];
  nextTitle?: string;
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
    architecture: [
      { nodes: [{ name: "React app", tech: "Vite · Canvas · RoughJS · Yjs · Zustand", does: "Draws, edits and merges everything" }] },
      { nodes: [{ name: "API gateway", tech: "Fastify", does: "JWT checks, CORS, rate limits, routing. No business logic" }] },
      {
        label: "REST · WebSocket",
        nodes: [
          { name: "Auth service", tech: "Fastify · PostgreSQL · Prisma", does: "Users, boards, permissions" },
          { name: "Realtime sync", tech: "ws · Yjs · y-protocols", does: "Relays updates and presence per board room. No database" },
        ],
      },
      {
        label: "Snapshots + updates",
        nodes: [null, { name: "Persistence", tech: "Fastify · PostgreSQL · Prisma", does: "Yjs binary snapshots + an update log" }],
      },
    ],
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

  documind: {
    headline: "Chat with a PDF, answered only from the PDF.",
    role: "Solo: design, frontend, backend",
    timeline: "Dec 2025 – Feb 2026",
    status: "Built; live demo offline",
    question:
      "Language models answer confidently from memory. I wanted answers that come only from a document I upload, with the document open next to the chat, and I wanted to understand every step of a RAG pipeline by building it myself instead of using a hosted tool.",
    rule: "If the answer isn't in the document, say so.",
    architecture: [
      {
        nodes: [
          {
            name: "Next.js app",
            tech: "React 19 · Tailwind · shadcn/ui",
            does: "Chat list, streaming chat window, PDF viewer, drag-and-drop upload, voice input",
          },
        ],
      },
      { nodes: [{ name: "API routes", tech: "Next.js · JWT · bcrypt", does: "Auth, chats, messages, upload, sharing" }] },
      {
        label: "Index + retrieve",
        nodes: [
          { name: "Gemini", tech: "Embeddings · 2.0 Flash", does: "Embeds chunks and queries, rewrites questions, writes answers" },
          { name: "Pinecone", tech: "One namespace per chat", does: "Vector search over that chat's document only" },
        ],
      },
      {
        label: "Persist",
        nodes: [
          { name: "MongoDB", tech: "Mongoose", does: "Users, chats, messages, share links" },
          { name: "Cloud Storage", tech: "GCS", does: "Uploaded PDFs in production" },
        ],
      },
    ],
    flows: [
      { name: "Index", path: "PDF → text → 1,000-char chunks (200 overlap) → embeddings → Pinecone" },
      { name: "Ask", path: "Question + last 12 messages → standalone query → top 10 chunks → streamed answer" },
      { name: "Share", path: "Owner creates a link → another user opens it → the chat is copied to their account" },
    ],
    decisions: [
      {
        title: "One Pinecone namespace per chat",
        why: "Retrieval can only ever see the document uploaded to that chat, and deleting a chat removes its vectors and file with it.",
        tradeoff: "No search across documents. And anything that copies a chat has to copy or point at its vectors too, which sharing currently doesn't.",
      },
      {
        title: "Rewrite the question before searching",
        why: "Follow-ups like \"what about the second one?\" are turned into a standalone question using the last 12 messages, so the search embeds something meaningful.",
        tradeoff: "One extra model call per message, adding latency and cost. If the rewrite fails, it falls back to the original question.",
      },
      {
        title: "Answer only from the retrieved context",
        why: "The model gets the top 10 chunks and must reply \"I could not find the answer in the provided document\" when they don't cover the question.",
        tradeoff: "It refuses questions the model could answer from general knowledge, and the answer is only as good as the chunks that came back.",
      },
      {
        title: "Stream the answer over Server-Sent Events",
        why: "Tokens appear as they are generated instead of after a long wait, and errors arrive as events so the UI never hangs.",
        tradeoff: "The full answer is only saved once the stream finishes, and every client has to parse the event format.",
      },
      {
        title: "Fixed-size chunks with overlap",
        why: "LangChain's recursive splitter keeps paragraphs together where it can, and the 200-character overlap keeps sentences that cross a boundary.",
        tradeoff: "Fixed sizes ignore structure like tables and headings, and I haven't measured retrieval quality to tune them.",
      },
      {
        title: "Sharing forks the chat",
        why: "The person you share with gets their own copy to keep asking in, without touching your chat.",
        tradeoff: "The copy is a snapshot that doesn't update, and it needs the original document's vectors to answer new questions.",
      },
    ],
    details: {
      title: "In the app",
      items: [
        "Multiple chats, each with its own document and saved history",
        "Drag-and-drop upload with live indexing status",
        "Resizable panels with the PDF open next to the chat",
        "Voice input through the Web Speech API, editable before sending",
        "Markdown answers: bold, code, lists",
        "Export a conversation as a PDF",
        "Share links that copy a chat into another account",
        "Deleting a chat cleans up its file and vectors",
      ],
    },
    quality: [
      "Passwords hashed with bcrypt, sessions as JWTs in httpOnly cookies",
      "Falls back to the original question if the rewrite fails",
      "Streamed errors instead of a hanging spinner",
      "Typed models and API routes in TypeScript",
    ],
    nextTitle: "What I'd fix next",
    next: [
      "Check the signed-in user and chat ownership inside every API route",
      "Let shared copies use the original document's vectors so follow-up questions work",
      "Replace the leftover tutor-style system prompt with a neutral one",
      "Build a small question set to measure retrieval before tuning chunk size and top K",
      "Bring the live demo back once the above is done",
    ],
    learned:
      "Most of the work in RAG happens before the model writes a word: how you split the document, what you embed, and which question you actually search for.",
  },
  ade: {
    headline: "Several Claude Code sessions at once, each in its own git worktree.",
    role: "Solo: design, desktop app, host process",
    timeline: "Oct 2026 – present",
    status: "My daily tool; private repo, newer features on branches",
    question:
      "I wanted something like VS Code's Agents window without Copilot or an API key: several Claude sessions working in parallel, each isolated on its own branch, with an editor, diff review and merge in one place, running on my Claude subscription.",
    rule: "Never reimplement the agent. Drive the official claude CLI and give every task its own worktree.",
    architecture: [
      {
        nodes: [
          {
            name: "Renderer",
            tech: "React 19 · Monaco · xterm.js",
            does: "Sidebar, chat with tool cards, editor, diffs, terminal",
          },
        ],
      },
      { nodes: [{ name: "Electron main", tech: "IPC · notifications", does: "Window, IPC wiring, Dock badge, quit cleanup" }] },
      {
        label: "Host (Node)",
        nodes: [
          { name: "Session manager", tech: "claude -p · stream-json", does: "Runs sessions, permission prompts, queued messages, stop" },
          { name: "Git", tech: "Worktrees · diff · merge", does: "Creates worktrees, commits, merges into the base branch" },
        ],
      },
      {
        label: "Local state",
        nodes: [
          { name: "SQLite", tech: "node:sqlite · migrations", does: "Repos, worktrees, sessions and their events" },
          { name: "Shells", tech: "node-pty", does: "One terminal per session, output replayed on return" },
        ],
      },
    ],
    flows: [
      { name: "New task", path: "+ worktree → branch from base → Claude session in that folder" },
      { name: "Approve", path: "Tool request → approval card → allow once, for the session, or deny" },
      { name: "Ship", path: "Changes list → diff → commit → merge into base → discard the worktree" },
    ],
    decisions: [
      {
        title: "Drive the official CLI, not an API",
        why: "Sessions behave exactly like Claude Code in a terminal and run on my subscription. The app talks to the CLI over its stream-json events.",
        tradeoff: "The app depends on the CLI's event format, which can change between versions, so the parser has to be kept up to date.",
      },
      {
        title: "One git worktree per task",
        why: "Parallel sessions never edit the same files. Each task is a branch that can be reviewed, merged or thrown away on its own.",
        tradeoff: "Every worktree needs its own dependencies, and dev servers need different ports, so each worktree gets its own PORT.",
      },
      {
        title: "Permission prompts over the CLI's control channel",
        why: "Simpler than running an MCP server, and the same channel the Agent SDK uses. \"Allow for this session\" sends session-only rules, so the repo's settings files are never written.",
        tradeoff: "Approvals depend on protocol details I had to verify against the real CLI rather than a spec.",
      },
      {
        title: "Merges that can't leave a mess",
        why: "Merge refuses a dirty worktree, conflicts abort cleanly, and merge is blocked while a session in that worktree is still running.",
        tradeoff: "I sometimes have to commit or clean up before I can merge, even for small changes.",
      },
      {
        title: "Stop means interrupt, not kill",
        why: "Stopping sends the CLI's interrupt request, so the session keeps its context and the next message doesn't reload the whole conversation.",
        tradeoff: "The CLI reports an interrupt differently mid-text and mid-tool, so the app marks the result as interrupted itself.",
      },
      {
        title: "No native dependencies where Node has one built in",
        why: "Built-in node:sqlite and recursive fs.watch instead of native packages, so nothing has to be rebuilt for Electron.",
        tradeoff: "Newer, smaller APIs with fewer features than the popular libraries.",
      },
    ],
    details: {
      title: "In the app",
      items: [
        "Parallel sessions with a running cap and a queue",
        "Chat with tool cards, with subagent steps nested under their parent",
        "Approval cards: allow once, allow for the session, or deny with a reason",
        "Monaco editor with live reload when Claude edits a file",
        "Changes list, side-by-side diffs, commit, merge and discard",
        "A terminal per session that keeps running in the background",
        "Model and effort picker, plan-usage meter, notifications and Dock badge",
        "Notes panel, voice dictation and a phone view for sending prompts",
      ],
    },
    quality: [
      "Unit tests for the host, git and event parsing (Vitest)",
      "UI checked through a DevTools-protocol driver, with screenshots saved per test run",
      "Every spawned process gets a clean environment, so the app's own variables never leak into sessions",
      "Typed IPC between renderer and host in TypeScript",
    ],
    nextTitle: "What's next",
    next: [
      "Merge the feature branches (terminal, notes, workspaces) into main",
      "Workspaces: one branch across several repos that share context",
      "Finish the phone view: diffs, commit and merge from the phone",
    ],
    learned:
      "Building on a CLI means treating its output as a protocol: parse the events instead of the text, and test against the real binary, because the docs don't cover every case.",
  },
};

// Written but not published: projects without an entry above get the basic project page.
// healthyday: needs Tanishq's (and possibly HealthyDay's) OK. technorollix-2025: its "What I'd fix" list
// describes holes in a site that is still live; publish only after the live site is fixed or taken down.
export const draftCaseStudies: Record<string, CaseStudy> = {
  "technorollix-2025": {
    headline: "Registration for OP Jindal University's techno-cultural fest, from signup to payment clearance.",
    role: "Software project lead: requirements, system design, backend",
    timeline: "Feb – Mar 2025",
    status: "Ran for the fest",
    question:
      "Technorollix has 22 events across technical and management tracks, with solo and team entries, students from our own university and outside it, and organisers who each run a different event. The fest needed one system where participants sign up, form teams and pay, and organisers see who is coming.",
    rule: "A participant should be able to sign up, build a team and pay without messaging an organiser.",
    architecture: [
      {
        nodes: [
          {
            name: "Next.js app",
            tech: "React · React Hook Form · Zod · shadcn/ui · Framer Motion",
            does: "Event pages, signup, dashboard, team pages, admin views",
          },
        ],
      },
      { nodes: [{ name: "Middleware", tech: "jose · JWT", does: "Guards /dashboard, /admin, /events-selection and /team-details" }] },
      {
        nodes: [
          {
            name: "Server actions",
            tech: "Next.js · Mongoose",
            does: "Users, teams, invites, payments, accommodation. No separate API server",
          },
        ],
      },
      {
        label: "Data · Email",
        nodes: [
          { name: "MongoDB", tech: "Mongoose models", does: "Users, events, teams, invitations, transactions, accommodation" },
          { name: "Nodemailer", tech: "SMTP", does: "OTP emails for signup and password reset" },
        ],
      },
    ],
    flows: [
      { name: "Register", path: "Email → OTP → profile → pick events" },
      { name: "Build a team", path: "Leader invites by email → invitee accepts → team fills to event size" },
      { name: "Pay", path: "Submit transaction ID → admin acknowledges amount → dashboard shows clearance" },
    ],
    decisions: [
      {
        title: "Server actions instead of a separate API",
        why: "One Next.js codebase for pages and backend logic kept a student team fast against a fixed fest date, with no API server to deploy or version.",
        tradeoff: "Every server action is a public endpoint. Each one needs its own auth and role check, which is easy to forget when they feel like plain function calls.",
      },
      {
        title: "Teams as invitations with a status, not free-form member lists",
        why: "Only the leader can invite, invites are capped at the event's team size, and an invite moves through PENDING, ACCEPTED, REJECTED or CANCELED, so nobody is added to a team without saying yes.",
        tradeoff: "Members are stored by email, so the team, invitation and user records have to stay consistent, and changing an email is awkward.",
      },
      {
        title: "One flag for outside students",
        why: "An isOutsider flag on the user drives the parts that only apply to students from other universities: entry fees and accommodation requests.",
        tradeoff: "Fee rules live in code (solo outside entries are charged by count), so changing pricing means a deploy.",
      },
      {
        title: "Payments verified by admins",
        why: "Participants submit a transaction ID; an admin records the amount received, and clearance is automatic once acknowledged amounts cover what is owed.",
        tradeoff: "It depends on admins checking every transaction by hand, and there is no instant confirmation for the participant.",
      },
      {
        title: "Admins and event managers in the user model",
        why: "Conveners are admins; event heads are managers with a list of the events they run, and the dashboard shows each manager their own events.",
        tradeoff: "The roles are modelled, but enforcing them has to happen on every admin page and action, not only in the dashboard.",
      },
    ],
    details: {
      title: "What participants and organisers got",
      items: [
        "Signup with an email OTP, login and OTP password reset",
        "22 event pages across technical and aiMBiAtion (management) tracks",
        "Event selection and teams built through email invites",
        "Dashboard with the teams you lead, joined, or were invited to",
        "Accommodation requests for outside participants",
        "Admin views for per-event participants, counts, payments and accommodation",
        "Hosted on AWS EC2 (t3.large) behind Nginx for the fest",
        "Branch and pull-request workflow for the student team",
      ],
    },
    quality: [
      "Typed Mongoose models for every collection",
      "Zod validation on every form",
      "Route protection through Next.js middleware",
      "Clear errors for team rules: full team, already registered, leader-only invites",
    ],
    nextTitle: "What I'd fix today",
    next: [
      "Hash passwords (bcrypt or argon2) instead of storing them as entered",
      "Generate and verify OTPs on the server, with expiry and attempt limits",
      "Set the session cookie on the server as httpOnly and secure",
      "Check the user's role inside every admin page and server action, not only at login",
    ],
    learned:
      "Shipping on a fixed date taught me scope: what has to work on day one and what can wait. Looking back at the code taught me the rest. Security cannot be a later task, because the shortcuts you take under a deadline are the ones that stay in production.",
  },

  healthyday: {
    headline: "Mobile-first, Telugu-first product work for a live yoga and wellness platform.",
    role: "Frontend developer (full-time), plus backend and data work",
    timeline: "Mar 2026 – present",
    status: "Ongoing",
    question:
      "HealthyDay runs live yoga and wellness programmes in Telugu and English, and most students join from their phones. I build the student portal and the sites people use to sign up, pay and upgrade, and lately the Women's Hormonal Health care plan end to end: landing page, assessment form, journey page and diet plan.",
    rule: "Build for the phone first, in Telugu first, and never put a secret in the browser.",
    architecture: [
      {
        nodes: [
          {
            name: "Student portal + sign-up sites",
            tech: "React · TypeScript · Vite · Tailwind",
            does: "Dashboards, diet plans, care journey, registration, checkout",
          },
        ],
      },
      {
        nodes: [
          {
            name: "Netlify Functions",
            tech: "Node",
            does: "Server-side calls: keys and private files never reach the browser",
          },
        ],
      },
      {
        label: "APIs · Storage",
        nodes: [
          { name: "Backend APIs", tech: "Google Cloud Run", does: "Students, plans, care-plan journey" },
          { name: "Cloud Storage", tech: "Private buckets", does: "Diet PDFs, streamed through a function" },
        ],
      },
      {
        label: "Payments · Messaging",
        nodes: [
          { name: "Razorpay", tech: "Checkout", does: "Plan purchases and upgrades" },
          { name: "WhatsApp", tech: "Support + nudges", does: "Help buttons and campaign messages" },
        ],
      },
    ],
    flows: [
      { name: "Upgrade", path: "Care plan page → eligibility + slots checked in parallel → price for your plan → checkout" },
      { name: "Assessment", path: "9-step form → uploads → preferred slot → submitted to the care team" },
      { name: "Care plan", path: "Journey page shows the current stage → diet plan PDF on the diet tab" },
    ],
    decisions: [
      {
        title: "A diet PDF viewer that is hard to copy",
        why: "Diet plans are personal health documents. The PDF is streamed from private storage through a function, drawn to canvas with the student's name watermarked into the pixels, with no text layer and download or print blocked.",
        tradeoff: "The text can't be selected or read by assistive tech, a screenshot is still possible (the watermark deters sharing), and pdf.js is heavy, so it is lazy-loaded and regular students never download it.",
      },
      {
        title: "Reuse data the page already has",
        why: "The diet page decides between the normal meal cards and the care plan PDF from a status already in the student response, so most students make no new calls.",
        tradeoff: "The page depends on that field staying in the response; a backend change can silently switch views.",
      },
      {
        title: "A function between the browser and internal APIs",
        why: "Calls that need an internal key go through a Netlify function, which returns only the fields the page needs.",
        tradeoff: "One more hop and a cold start now and then, and responses are capped in size, which matters for large PDFs.",
      },
      {
        title: "Ordered checks where the first failure wins",
        why: "The upgrade flow runs its checks in parallel but reports them in a fixed order (invalid number, not eligible, seats full, and so on), so a student sees one clear reason instead of a pile of errors.",
        tradeoff: "Every state needs its own copy and design, and the page waits for all checks before deciding.",
      },
      {
        title: "Auto-scroll that gets out of the way",
        why: "The journey page glides to the student's current stage and highlights it once, but stops the moment they scroll themselves, and jumps instantly with reduced motion.",
        tradeoff: "The last stages can't be centred because the page ends below them.",
      },
      {
        title: "Preview modes for every state",
        why: "URL preview flags let the team walk through every stage, error and form step without a real student's data.",
        tradeoff: "Preview paths need care so they never expose real data or skip a check in production.",
      },
    ],
    details: {
      title: "What I've shipped",
      items: [
        "Student dashboards for free, paid and completed students",
        "Diet tabs with recipes, tips and precautions",
        "Session recordings for paid students, with a live tag",
        "Referral contest leaderboard driven by backend cutoffs",
        "WhatsApp \"Need Help?\" buttons for each kind of student",
        "Care plan landing and upgrade page, built from Figma",
        "9-step assessment form with uploads, state and district data, and slot booking",
        "11-stage care journey page and the care plan diet view",
        "A marketing landing page on FlexiFunnels, parity-tested against the main site",
        "A CSV export service so marketing can build ad audiences without editing scripts",
      ],
    },
    quality: [
      "Performance pass: lazy-loaded routes, cached assets, optimised images, a redundant API call removed",
      "Lighthouse pass on the sign-up landing page",
      "Analytics events on every funnel step",
      "Preview and test modes for flows that touch real student data",
    ],
    nextTitle: "Up next",
    next: [
      "End-to-end tests for the care journey and help buttons",
      "Designed states for missing journey data",
      "Address autofill from pincode on the assessment form",
    ],
    learned:
      "On a small product team there is no separate QA. The preview modes, stub data and checklists I build are the QA, so I build them first.",
  },
};
