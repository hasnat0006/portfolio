import NavigationBar from "@/components/NavigationBar";
import { Footer } from "@/components/layout/Footer";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import {
  ProjectArchitectureTimeline,
  ProjectBottomCTA,
  ProjectChallengeSolutionImpact,
  ProjectFeatureShowcase,
  ProjectHero,
  ProjectLessonsLearned,
  ProjectMetrics,
  ProjectOverview,
  ProjectScreenshotGallery,
  ProjectTechStack,
  ProjectTechnicalHighlights,
} from "@/features/projects/detail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ISR: revalidate every 24 hours
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
    photoUrl,
    collaborators,
    problem,
    solution,
    challenges,
    impact,
    metrics,
    architecture,
    technicalHighlights,
    lessons,
    architectureSteps,
    features,
    techStackDetails,
  } = project;

  const hasMedia = photoUrl && photoUrl.length > 0;

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
        {/* ── Hero Section ─────────────────────────────── */}
        <ProjectHero project={project} />

        {/* ── Background alternation rhythm ───────────── */}

        {/* Overview */}
        <ProjectOverview
          fullDescription={full_description}
          collaborators={collaborators}
        />

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <>
            <div
              className="h-px w-full"
              style={{ background: "var(--border-primary)" }}
            />
            <ProjectMetrics metrics={metrics} />
          </>
        )}

        {/* Challenge → Solution → Impact */}
        {(problem || solution || impact) && (
          <>
            <div
              className="h-px w-full"
              style={{ background: "var(--border-primary)" }}
            />
            <ProjectChallengeSolutionImpact
              problem={problem}
              solution={solution}
              challenges={challenges}
              impact={impact}
            />
          </>
        )}

        {/* Architecture / Development Process */}
        <ProjectArchitectureTimeline
          architecture={architecture}
          architectureSteps={architectureSteps}
        />

        {/* Feature Showcase */}
        {features && features.length > 0 && (
          <>
            <div
              className="h-px w-full"
              style={{ background: "var(--border-primary)" }}
            />
            <ProjectFeatureShowcase features={features} />
          </>
        )}

        {/* Screenshot Gallery */}
        {hasMedia && (
          <>
            <div
              className="h-px w-full"
              style={{ background: "var(--border-primary)" }}
            />
            <ProjectScreenshotGallery images={photoUrl} title={title} />
          </>
        )}

        {/* Tech Stack */}
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

        {/* Technical Highlights */}
        <ProjectTechnicalHighlights highlights={technicalHighlights} />

        {/* Lessons Learned */}
        {lessons && lessons.length > 0 && (
          <>
            <div
              className="h-px w-full"
              style={{ background: "var(--border-primary)" }}
            />
            <ProjectLessonsLearned lessons={lessons} />
          </>
        )}

        {/* Bottom CTA */}
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
