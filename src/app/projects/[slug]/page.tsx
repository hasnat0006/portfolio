import { Footer } from "@/components/layout/Footer";
import NavigationBar from "@/components/layout/NavigationBar";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import {
  ProjectBottomCTA,
  ProjectHero,
  ProjectOverview,
  ProjectTechStack,
} from "@/features/projects/detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Yusuf Reza Hasnat`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | Yusuf Reza Hasnat`,
      description: project.short_description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const {
    title,
    full_description,
    techStack,
    githubUrl,
    liveUrl,
    collaborators,
    techStackDetails,
  } = project;

  return (
    <>
      <NavigationBar />

      <main
        className="min-h-screen"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <ProjectHero project={project} />
        <ProjectOverview
          fullDescription={full_description}
          collaborators={collaborators}
        />
        {techStack && techStack.length > 0 && (
          <>
            <div
              className="h-px w-full"
              style={{ background: "var(--border-primary)" }}
            />
            <ProjectTechStack
              techStack={techStack}
              techStackDetails={techStackDetails}
            />
          </>
        )}
        <ProjectBottomCTA
          liveUrl={liveUrl}
          githubUrl={githubUrl}
          projectTitle={title}
        />
      </main>

      <Footer />
    </>
  );
}
