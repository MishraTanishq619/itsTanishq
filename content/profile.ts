// Single source of truth for personal info shown in the site chrome.
// Facts come from research/content-inventory.md. Keep claims accurate.

export const profile = {
  name: "Tanishq Mishra",
  role: "Full-Stack Engineer",
  email: "mishratanishq619@gmail.com",
  description:
    "Full-stack product engineer based in India. Building healthtech at HealthyDay; real-time systems, RAG apps and mobile-first web on the side.",
} as const;

// Top info row: label / value pairs (left to right).
export const infoRow = [
  { label: "Based in India", value: "Rajnandgaon, CG" },
  { label: "Building at", value: "HealthyDay" },
  { label: "Daily stack", value: "React · Next.js · Node" },
] as const;

// Dock marquee. Each entry must be true.
export const marqueeRoles = [
  "Full-stack engineer",
  "Mobile-first builder",
  "Real-time systems nerd",
  "RAG tinkerer",
  "Open-source contributor",
  "Hackathon winner",
  "Footballer",
] as const;

// Home "About" section. Draft copy in Tanishq's voice; edit freely, keep it true.
export const about = {
  statement:
    "I'm Tanishq, a full-stack engineer who likes shipping things people actually use. Right now that's a Telugu-first wellness platform at HealthyDay: mobile-first frontends, the APIs behind them, and the boring bits that keep them fast and safe.",
  facts: [
    { label: "Now", value: "Full-time at HealthyDay" },
    { label: "Before", value: "Aurika Tech · GSSOC · Technorollix" },
    { label: "Studied", value: "B.Tech CSE, OP Jindal University, 2022–26" },
    { label: "Off-screen", value: "Football, running, poetry" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: `mailto:${profile.email}` },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/MishraTanishq619" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tanishq-mishra-495541255/" },
  { label: "X", href: "https://x.com/Mi_Tanishq_619" },
  { label: "LeetCode", href: "https://leetcode.com/u/Tannu619/" },
] as const;
