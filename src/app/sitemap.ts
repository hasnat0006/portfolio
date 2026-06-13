import { safeFetch } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import type { MetadataRoute } from "next";

const BASE_URL = "https://hasnat0006.dev";

type SitemapData = {
  pages: Array<{ slug: string; _updatedAt: string }>;
  projects: Array<{ slug: string; _updatedAt: string }>;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // CRITICAL: stega: false to prevent invisible characters in sitemap URLs
  const data = await safeFetch<SitemapData>(
    SITEMAP_QUERY,
    {},
    { stega: false },
  );

  const pages: MetadataRoute.Sitemap = (data?.pages ?? []).map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projects: MetadataRoute.Sitemap = (data?.projects ?? []).map(
    (project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: new Date(project._updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages,
    ...projects,
  ];
}
