import { safeFetch } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageData = {
  _id: string;
  title: string;
  slug: { current: string };
  pageContent: unknown[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgImage?: unknown;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // CRITICAL: stega: false to prevent invisible characters in <head> metadata
  const page = await safeFetch<PageData>(
    PAGE_QUERY,
    { slug },
    { stega: false },
  );

  if (!page) {
    return {
      title: "Page Not Found | hasnat0006.dev",
    };
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.seoKeywords,
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      type: "website",
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = await safeFetch<PageData>(PAGE_QUERY, { slug });

  if (!page) {
    notFound();
  }

  return (
    <main
      className="min-h-screen px-4 py-20"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold font-mono mb-8"
          style={{ color: "var(--text-accent)" }}
        >
          {page.title}
        </h1>
        <div className="max-w-none">
          {page.pageContent ? (
            <p style={{ color: "var(--text-secondary)" }}>
              Content loaded from Sanity CMS.
            </p>
          ) : (
            <p className="italic" style={{ color: "var(--text-muted)" }}>
              No content available for this page.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
