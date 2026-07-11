"use client";

import type { Project } from "@/data/projects";
import { ProjectImageSlider } from "@/features/projects/components/ProjectImageSlider";
import Link from "next/link";

interface ProjectHeroProps {
  project: Project;
}

/**
 * Premium hero section for project case-study pages.
 * Features: large title, summary, action buttons, browser mockup with image slider,
 * and metadata cards (Role, Duration, Status, Year).
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  const {
    title,
    short_description,
    liveUrl,
    githubUrl,
    photoUrl,
    role,
    duration,
    status,
  } = project;

  const year = project.duration?.match(/\d{4}/)?.[0]?.toString();

  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(5,150,105,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 pt-28 pb-8 md:pb-12">
        {/* Back navigation */}
        <div className="mb-8">
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

        {/* Title row */}
        <div className="max-w-5xl mb-8">
          <h1
            className="text-hero mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h1>
          <p
            className="text-body text-base md:text-lg leading-relaxed max-w-5xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {short_description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(5,150,105,0.15)]"
              style={{
                color: "var(--text-accent)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-accent)",
              }}
            >
              <svg
                width="16"
                height="16"
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
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source Code
            </a>
          )}
        </div>

        {/* Browser mockup — full width */}
        {photoUrl && photoUrl.length > 0 && (
          <div className="mb-6">
            <ProjectImageSlider images={photoUrl} title={title} />
          </div>
        )}

        {/* Metadata cards — full-width row below the mockup */}
        {(role || duration || status || year) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {role && (
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Role
                </span>
                <p
                  className="text-sm font-semibold mt-1 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {role}
                </p>
              </div>
            )}
            {duration && (
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Duration
                </span>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {duration}
                </p>
              </div>
            )}
            {status && (
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Status
                </span>
                <p
                  className="text-sm font-semibold mt-1 flex items-center gap-1.5"
                  style={{ color: "var(--text-accent)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {status}
                </p>
              </div>
            )}
            {year && (
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Year
                </span>
                <p
                  className="text-sm font-semibold mt-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {year}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
