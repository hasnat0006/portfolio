import { getAllSlugs, getPageBySlug } from "@/data/pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ISR: revalidate every 24 hours
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: `Page Not Found | ${new URL(process.env.NEXT_PUBLIC_BASE_URL!).hostname}`,
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

  const page = getPageBySlug(slug);

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
          className="text-heading text-3xl md:text-4xl mb-8"
          style={{ color: "var(--text-accent)" }}
        >
          {page.title}
        </h1>
        <div className="max-w-none">
          <p style={{ color: "var(--text-secondary)" }}>{page.content}</p>
        </div>
      </div>
    </main>
  );
}
