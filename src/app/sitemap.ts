import type { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseStudies = getProjects("en").filter((project) => project.caseStudy);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/how-i-start"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...caseStudies.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
