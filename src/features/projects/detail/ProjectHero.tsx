"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import type { Project } from "@/data/projects";
import { ProjectImageSlider } from "@/features/projects/components/ProjectImageSlider";
import { Calendar, Clock, User } from "lucide-react";

interface ProjectHeroProps {
  project: Project;
}

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
        {/* <div className="mb-8">
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
        </div> */}

        {/* Title row */}
        <div className="max-w-5xl mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-uppercase text-center mb-4"
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

        {/* Browser mockup — full width */}
        {photoUrl && photoUrl.length > 0 && (
          <div className="mb-6">
            <ProjectImageSlider images={photoUrl} title={title} />
          </div>
        )}

        {/* Metadata + Actions — consistent button row */}
        {(role || duration || status || year || liveUrl || githubUrl) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {role && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <User
                  size={15}
                  style={{ color: "var(--text-muted)", flexShrink: 0 }}
                  aria-hidden="true"
                />
                {role}
              </div>
            )}
            {duration && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <Clock
                  size={15}
                  style={{ color: "var(--text-muted)", flexShrink: 0 }}
                  aria-hidden="true"
                />
                {duration}
              </div>
            )}
            {status && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-accent)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                {status}
              </div>
            )}
            {year && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <Calendar
                  size={15}
                  style={{ color: "var(--text-muted)", flexShrink: 0 }}
                  aria-hidden="true"
                />
                {year}
              </div>
            )}
            {liveUrl && (
              <ActionButton
                href={liveUrl}
                icon="live"
                label="Live Demo"
                className="!text-sm !font-semibold !px-4 !py-2.5 !rounded-md"
              />
            )}
            {githubUrl && (
              <ActionButton
                href={githubUrl}
                icon="github"
                label="Source Code"
                className="!text-sm !font-semibold !px-4 !py-2.5 !rounded-md"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
