import NavigationBar from "@/components/NavigationBar";
import { Footer } from "@/components/layout/Footer";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { ProjectImageSlider } from "@/features/projects/components/ProjectImageSlider";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

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

/* ── Reusable content section ──────────────────────────────────── */
function SectionBlock({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-16 md:mb-20">
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-1 h-5 rounded-full shrink-0"
          style={{ background: "var(--text-accent)" }}
        />
        <span
          className="text-[11px] font-mono uppercase tracking-[0.15em] font-semibold"
          style={{ color: "var(--text-accent)" }}
        >
          {label}
        </span>
      </div>
      <h2
        className="text-heading text-2xl md:text-3xl mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        {heading}
      </h2>
      {children}
    </div>
  );
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
    short_description,
    techStack,
    githubUrl,
    duration,
    liveUrl,
    photoUrl,
    collaborators,
    problem,
    solution,
    challenges,
    impact,
    metrics,
    architecture,
    role,
  } = project;

  const hasMedia = photoUrl && photoUrl.length > 0;
  const hasActions = liveUrl || githubUrl;

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
        {/* ── Back navigation ──────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono transition-all duration-200 hover:gap-2 group"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  HERO                                                  */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 pb-12 md:pb-16">
          {/* Meta chips row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {role && (
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded-md font-medium"
                style={{
                  background: "var(--bg-badge)",
                  color: "var(--text-accent)",
                  border: "1px solid var(--border-accent)",
                }}
              >
                {role}
              </span>
            )}
            {duration && (
              <span
                className="text-[11px] font-mono flex items-center gap-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {duration}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-hero mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h1>

          {/* Lead description */}
          <p
            className="text-body text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            {short_description}
          </p>

          {/* Action buttons + tech stack in a single row-wrapping group */}
          <div className="flex flex-wrap items-center gap-3">
            {hasActions && (
              <>
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(5,150,105,0.15)]"
                    style={{
                      color: "var(--text-accent)",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-accent)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Visit Live
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)]"
                    style={{
                      background: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View Source
                  </a>
                )}
              </>
            )}

            {/* Tech stack tags — inline with actions */}
            {techStack.length > 0 && (
              <span
                className="flex flex-wrap gap-1.5"
                role="list"
                aria-label="Technologies used"
              >
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-1 rounded-md"
                    style={{
                      background: "var(--bg-code)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </span>
            )}
          </div>
        </section>

        {/* ── Image slider — full bleed within max-w-6xl ──────── */}
        {hasMedia && (
          <section className="max-w-6xl mx-auto px-4 pb-16 md:pb-24">
            <ProjectImageSlider images={photoUrl} title={title} />
          </section>
        )}

        {/* ─────────────────────────────────────────────────────── */}
        {/*  CONTENT — all at max-w-4xl to match hero              */}
        {/* ─────────────────────────────────────────────────────── */}
        <article className="max-w-4xl mx-auto px-4 pb-16 md:pb-24">
          {/* ── Full description ──────────────────────────────── */}
          <div
            className="mb-16 md:mb-20 p-6 md:p-8 rounded-md"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <p
              className="text-body leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {full_description}
            </p>
          </div>

          {/* ── Problem ───────────────────────────────────────── */}
          {problem && (
            <SectionBlock
              label="Problem"
              heading="The challenge we set out to solve"
            >
              <p
                className="text-body leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {problem}
              </p>
            </SectionBlock>
          )}

          {/* ── Solution + Architecture ────────────────────────── */}
          {solution && (
            <SectionBlock label="Solution" heading="How we approached it">
              <p
                className="text-body leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {solution}
              </p>

              {architecture && (
                <div
                  className="mt-6 p-5 md:p-6 rounded-md"
                  style={{
                    background: "var(--bg-code)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "color-mix(in srgb, var(--text-accent) 10%, transparent)",
                        color: "var(--text-accent)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                    </span>
                    <div>
                      <h3
                        className="text-sm font-semibold font-mono mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Architecture
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {architecture}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SectionBlock>
          )}

          {/* ── Challenges ─────────────────────────────────────── */}
          {challenges && challenges.length > 0 && (
            <SectionBlock label="Challenges" heading="Obstacles along the way">
              <div className="space-y-3">
                {challenges.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-md"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <span
                      className="relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold"
                      style={{
                        background:
                          "color-mix(in srgb, var(--text-accent) 10%, transparent)",
                        color: "var(--text-accent)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <p
                      className="text-sm leading-relaxed pt-0.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* ── Impact & Metrics ──────────────────────────────── */}
          {(impact || (metrics && metrics.length > 0)) && (
            <SectionBlock label="Impact" heading="What we achieved">
              {impact && (
                <p
                  className="text-body leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {impact}
                </p>
              )}

              {metrics && metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                  {metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-md p-5 text-center"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-primary)",
                      }}
                    >
                      <p
                        className="text-2xl md:text-3xl font-bold font-mono mb-1"
                        style={{ color: "var(--text-accent)" }}
                      >
                        {m.value}
                      </p>
                      <p
                        className="text-[11px] font-mono"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </SectionBlock>
          )}

          {/* ── Collaborators ───────────────────────────────────── */}
          {collaborators && collaborators.length > 0 && (
            <SectionBlock label="Team" heading="People behind the project">
              <div className="flex flex-wrap gap-3">
                {collaborators.map((collab) => (
                  <a
                    key={collab.github}
                    href={`https://github.com/${collab.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)]"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <div
                      className="relative w-8 h-8 rounded-full overflow-hidden shrink-0"
                      style={{ border: "2px solid var(--border-primary)" }}
                    >
                      <Image
                        src={`https://github.com/${collab.github}.png?size=64`}
                        alt={collab.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-xs font-mono font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {collab.name}
                      </span>
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "var(--text-muted)" }}
                      >
                        @{collab.github}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* ── Bottom CTA ──────────────────────────────────────── */}
          {hasActions && (
            <div
              className="rounded-md p-6 md:p-8 text-center"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <h3
                className="text-subheading font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Interested in this project?
              </h3>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                Check it out live or explore the source code.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(5,150,105,0.15)]"
                    style={{
                      color: "var(--text-accent)",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-accent)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Visit Live
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)]"
                    style={{
                      background: "transparent",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View Source
                  </a>
                )}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
