import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/work`, priority: 0.8 },
    ...projects.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      // Full case studies rank above basic project pages.
      priority: p.slug in caseStudies ? 0.7 : 0.4,
    })),
  ];
}
