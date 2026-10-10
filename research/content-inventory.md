# Content inventory: Tanishq Mishra

Sources: CV (Google Drive "TANISHQ_MISHRA.docx", long final-year version), one-page resume (Google Doc "TANISHQ_MISHRA_RESUME", 1gGiQK_b_cItLDRLcVYlysZypYTXBEBYdAv0hD03uHS0), public GitHub (MishraTanishq619), AI Brain notes on HealthyDay.
Rule: only true claims. **[CONFIRM]** = needs your OK or a missing fact. **No HealthyDay numbers on the site** (decided 11 Oct).

## Identity
- **Name:** Tanishq Mishra
- **CV headline:** Full Stack Web Developer. Today you mostly do frontend and product work at HealthyDay. **[CONFIRM]** the positioning line.
- **Location:** Rajnandgaon, Chhattisgarh, India (IST)
- **Education:** B.Tech CSE, OP Jindal University, 2022–2026, 8.5 CGPA. That means you've graduated now, so the brief's "final-year student" is out of date.
- **Certifications:** Cisco (Cybersecurity), IBM (Linux and Shell Scripting), IBM (Databases and SQL)
- **Awards:** Winner, Technorollix 2025 HackSprint (hackathon). Winner, Technorollix 2025 Codigo (coding contest).
- **DSA:** 250+ LeetCode problems (CV number; may be higher now) **[CONFIRM]**
- **Outside code:** football (school national player, university team lead), athletics (won a 5 km run), reading and poetry. Good for an "About" line that adds personality.

### Links (public)
| | |
|---|---|
| Email | mishratanishq619@gmail.com |
| GitHub | github.com/MishraTanishq619 |
| LinkedIn | linkedin.com/in/tanishq-mishra-495541255 |
| X | x.com/Mi_Tanishq_619 |
| LeetCode | leetcode.com/u/Tannu619 |
| Old portfolios | tanishq-mishra-portfolio.netlify.app (live), tanishq-mishra-portfolio.vercel.app ("AI-Portfolio" repo) |

Phone (+91 on the CV): **leave it off the site** to avoid spam. **[CONFIRM]**

## Experience (newest first)
### HealthyDay Healthtech Ltd: Mar 2026 – present
Started as **SDE Intern** (Mar 2026), now **full-time**: main frontend dev on the student portal and pricing site.
Online live yoga and wellness platform, with Telugu and English batches.
- **Student portal** (class.healthyday.co.in): dashboards for free, paid and completed students; diet tabs; recordings; referral contest leaderboard; WhatsApp "Need Help?" button; a performance pass (lazy routes, caching, image optimisation, removed redundant API calls).
- **WHH care journey page**: 11 stages built from Figma, driven by a backend stage API, with auto-scroll to the current step (reduced-motion aware).
- **Secure diet PDF viewer**: pdf.js drawn to canvas, watermark burned into the pixels, no text layer, print/download blocked, served through a server-side proxy so storage stays private, and lazy-loaded so most students never download pdf.js.
- **Pricing, registration and checkout site**: sign-up flows, Razorpay checkout, renewals, seasonal offers. WHH landing/upgrade page with an ordered eligibility → slots → payment flow. A 9-step mobile-first, Telugu-first assessment form (uploads, State/District data for all of India, slot booking).
- **Security**: moved an internal API key out of the browser bundle into server functions.
- **CSV export service** (built and owned): Flask on Cloud Run plus a frontend. Marketing builds Meta and Google Ads audience files with SHA-256 hashed personal data and no script edits.
- **Growth/data**: AiSensy WhatsApp campaigns, Short.io click data, Meta CAPI, GTM/dataLayer, SQL pulls. GCP: Cloud Run, Firestore (logs), Cloud SQL.

### Aurika Tech (startup), Full-Stack Intern: Jun – Sep 2024
E-commerce platform for jewellery sellers (products, pricing, orders), integrated with ONDC's API gateway and protocols.
- Gold-rate input for admins, used in product pricing (new feature)
- Optimised core APIs. Big frontend UX changes.
- Optimised Dockerfiles for faster builds and deploys
- Built and deployed a side app that moves subscriptions from pre-production to production
- Stack: Nginx, Node.js (JS for web/gateway/notifications, TS for IGM and bugzilla services), React, Flask (protocol layer), Docker Compose, Portainer, EC2, S3

### Technorollix 2025, Software Project Lead: Feb – Mar 2025
Registration system for the college's technical and management fest. [Live](https://technorollix25-mishratanishq.netlify.app/) · [GitHub](https://github.com/MishraTanishq619/Technorollix2025)
- Led requirement analysis and system design
- Users, JWT auth, team building with invite links
- Admin portal with roles: admins (event conveners) and managers (event heads)
- Nodemailer emails: OTP, password reset, welcome, team invites
- Next.js + server actions, MongoDB, Nginx, AWS EC2 t3.large

### GSSOC 2024, Contributor: May – Jun 2024
10+ PRs across projects: Dockerfiles and Compose for dev and prod, frontend bug fixes, new features.

### Technorollix 2024, Front End Lead: Feb – Mar 2024
Fest registration platform: React/Next.js, Tailwind, Framer Motion. Cross-browser fixes. Worked with copywriters and designers.

### Hacktoberfest 2023 and 2024, Contributor
Next.js, Django and Flask fixes across repos.

### Prodigy InfoTech, Front End Intern: Nov – Dec 2023
One-month training, 5 beginner projects (Next.js, Tailwind, TS). **Suggest leaving this off the portfolio**: it's weaker than everything else.

## Projects
Ranked by portfolio strength (my suggestion):

| # | Project | What it shows | Links | Notes |
|---|---|---|---|---|
| 1 | **Whiteboard** (Excalidraw-inspired) | Real-time systems: Canvas + RoughJS, Yjs CRDT (offline, merge, undo), microservices (gateway, auth, realtime, persistence), Fastify WebSockets, Postgres/Prisma CRDT snapshots, TurboRepo | [GitHub](https://github.com/MishraTanishq619/WhiteBoard) | **No live link [CONFIRM]**. Best "how I think" case study. |
| 2 | **DocuMind**: RAG document chat | GenAI: PDF ingestion → chunk → embed → Pinecone, Gemini query rewrite + grounded answers, SSE streaming, multi-chat, JWT httpOnly auth, voice input, share links, PDF export | [Live](https://docu-mind-murex.vercel.app) · [GitHub](https://github.com/MishraTanishq619/DocuMind) | Check the live demo still works (API keys/quotas) |
| 3 | **Zcrum** (Jira clone) | Product: Kanban drag-and-drop, Clerk auth, NeonDB + Prisma, shadcn | [Live](https://jira-clone-mishratanishq.netlify.app/) · [GitHub](https://github.com/MishraTanishq619/jira-clone) | |
| 4 | **Technorollix 2025** | Backend leadership, RBAC, real users | see Experience | Could be both experience and a project card |
| 5 | **Invoice Generator** | Next.js + Express, PdfMake PDFs, Multer uploads, Recoil, Docker | [GitHub](https://github.com/MishraTanishq619/InvoiceGenerator) | CV stack line says only "NextJs, Docker" but the bullets mention Express/PdfMake. Fix it on the CV. No live link. |
| 6 | **CricScorer** | React Native (Expo), Firebase Auth, cricket API | [GitHub](https://github.com/MishraTanishq619/cricScorer) | The CV says "vibe coded". Fine on a CV, but say it carefully on the site. |
| 7 | **MyStory** (open source) | Docker/Compose for dev and prod, theme scrollbar | [Live](https://mystorybuild.vercel.app/) · [PR #72](https://github.com/Sayak-Bhunia/mystory/pull/72) | Better as an "Open source" line than a card |
| 8 | **YouTube clone** (streaming site) | Next.js, Tailwind, TS, MUI frontend clone | [Live](https://youtube-clone-mishratanishq619.netlify.app/) · [GitHub](https://github.com/MishraTanishq619/Youtube_Clone) | **CV bug:** this entry repeats CricScorer's text. It's from Feb 2024, so it's weak; suggest dropping it. |
| 9 | **TomatoApp**, **Notifications-LLD** | Low-level design / OOP patterns (TomatoApp: food delivery; Notifications: C++) | GitHub repos exist | Not on the CV. Could be one "LLD practice" card. |
| 10 | **AcadEx** | Academic resource sharing | GitHub repo exists (empty description) | Not on the CV. **[CONFIRM]** built or idea only? |
| – | Also on GitHub | TaskFlow (Chrome sidebar extension), Youtube Thumbnail Board, AI Career Coach, LicencePlateSystem, two internship take-homes (booklt, mock-ecom-cart) | | **[CONFIRM]** whether any of these matter. I'd skip the take-homes. |

## Skills (from CV + current work)
- **Languages:** JavaScript, TypeScript, Python, SQL (C++ for LLD)
- **Frontend:** React, Next.js, Vite, Tailwind, shadcn/ui, Framer Motion, React Native (Expo)
- **Backend:** Node.js, Express, Fastify, Flask, Django, REST, WebSockets (Socket.io), SSE. Auth: JWT, NextAuth, Clerk, Firebase.
- **Data:** PostgreSQL, MongoDB, MySQL, Prisma, Redis, Pinecone. Messaging: RabbitMQ, Kafka.
- **Cloud/DevOps:** Docker, Compose, GitHub Actions, Nginx, AWS (EC2, S3, Lambda), GCP (Cloud Run, Firestore, Cloud SQL, GCS), Netlify, Vercel
- **AI:** LangChain, Gemini, RAG pipelines, vector search
- **Monorepo:** TurboRepo
- Suggested **big 3** for the stack grid: React, Next.js, TypeScript (matches what you ship daily) **[CONFIRM]**
- Be careful listing Kafka/RabbitMQ/Lambda on the portfolio unless a project shows them. Interviewers will ask.

## Media needed
- Portrait photo
- Recordings or screenshots: Whiteboard (multi-cursor demo), DocuMind (streaming answer), Zcrum (drag and drop), Technorollix (registration + admin)
- HealthyDay screens only from preview/stub modes, never with real student data
- Small round logos/icons per project

## One-page resume vs long CV (checked 11 Oct)
- Same facts. The one-pager has tighter phrasing worth reusing on the site: "Production RAG Platform", "Real-Time Collaboration System", "scalable full-stack applications … real-time systems, RAG-based AI platforms, and microservices".
- **HealthyDay is missing** from the one-pager. Add it (full-time role) before you send it anywhere.
- **Whiteboard's [Link] points to the Zcrum (jira-clone) site**, and its [Git] link too. Fix: GitHub → github.com/MishraTanishq619/WhiteBoard.
- DocuMind and CricScorer have a "[Link]" label with no URL. DocuMind's live URL is docu-mind-murex.vercel.app.
- Only HackSprint is listed under awards (the Codigo win is missing). University name is missing under Education.
- CricScorer says "Built and shipped". The long CV says "vibe coded" and there's no store link, so keep "built" on the portfolio.
