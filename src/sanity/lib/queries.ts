import { groq } from "next-sanity";

// ── Page Queries ──────────────────────────────────────────────────────

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageContent,
    "seoTitle": coalesce(seo.title, title),
    "seoDescription": coalesce(
      seo.description,
      "Portfolio of Yusuf Reza Hasnat, featuring competitive programming achievements and peer-reviewed research."
    ),
    "seoKeywords": coalesce(seo.keywords, "competitive programming, ICPC, biomedical research, software engineering"),
    "seoOgImage": seo.ogImage
  }
`;

export const PAGES_QUERY = groq`
  *[_type == "page"] {
    _id,
    title,
    slug
  }
`;

// ── Project Queries ───────────────────────────────────────────────────

export const PROJECT_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    dynamicComplexity,
    githubUrl,
    productionUrl,
    technicalHurdles,
    "seoTitle": coalesce(seo.title, title),
    "seoDescription": coalesce(
      seo.description,
      "A project by Yusuf Reza Hasnat — Algorithmic Systems Engineer & Competitive Programmer."
    ),
    "seoKeywords": coalesce(seo.keywords, "project, algorithm, competitive programming, software engineering"),
    "seoOgImage": seo.ogImage
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    dynamicComplexity,
    githubUrl,
    productionUrl,
    technicalHurdles,
    "seoTitle": coalesce(seo.title, title),
    "seoDescription": coalesce(
      seo.description,
      "A project by Yusuf Reza Hasnat."
    )
  }
`;

// ── Sitemap Queries ───────────────────────────────────────────────────

export const SITEMAP_QUERY = groq`
  {
    "pages": *[_type == "page"] { "slug": slug.current, _updatedAt },
    "projects": *[_type == "project"] { "slug": slug.current, _updatedAt }
  }
`;
