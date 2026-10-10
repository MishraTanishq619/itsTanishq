// Absolute site URL for metadata, sitemap and OG images.
// Netlify sets URL (main site address) at build time; local dev falls back to netlify dev's port.
export const siteUrl = process.env.URL ?? "http://localhost:8888";
