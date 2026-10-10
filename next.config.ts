import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Off: every page is prerendered, and with it on, unknown /work/<slug> URLs crashed (500) on Netlify
  // because notFound() ran inside the streamed Suspense boundary. Off = params awaited up front = real 404s.
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
