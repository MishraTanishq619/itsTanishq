import type { Metadata } from "next";
import { Doto, Geist } from "next/font/google";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { Loader } from "@/components/chrome/Loader";
import { InfoRow } from "@/components/chrome/InfoRow";
import { ContactPill } from "@/components/chrome/ContactPill";
import { Dock } from "@/components/chrome/Dock";
import { Footer } from "@/components/chrome/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.role}`,
  description: profile.description,
  openGraph: { type: "website", siteName: profile.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", creator: "@Mi_Tanishq_619" },
};

// Runs before first paint: skip the loader on repeat visits in a session and for reduced motion.
const loaderGate = `try{if(sessionStorage.getItem("tm-loaded")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.loader="skip"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${doto.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderGate }} />
      </head>
      <body className="min-h-svh bg-page text-ink" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-full bg-accent text-ui font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:px-5 focus:py-3"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Loader />
          <header>
            <InfoRow />
            <ContactPill />
          </header>
          {children}
          <Footer />
          <Dock />
        </SmoothScroll>
      </body>
    </html>
  );
}
