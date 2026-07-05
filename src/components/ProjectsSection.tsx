"use client";

import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { useState } from "react";

const INITIAL_COUNT = 4;

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState(false);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_COUNT);

  return (
    <section
      id="projects"
      className="px-4 py-16 md:py-24"
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-code text-sm"
            style={{ color: "var(--text-accent)" }}
          >
            $
          </span>
          <h2
            className="text-heading text-2xl md:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            ls ./projects
          </h2>
        </div>
        <p
          className="text-code text-sm ml-6 mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Engineering projects &amp; algorithmic solutions
        </p>

        <div className="columns-1 md:columns-2 gap-6 space-y-0">
          {visibleProjects.map((project) => (
            <div key={project.title} className="break-inside-avoid mb-6">
              <ProjectCard
                title={project.title}
                description={project.short_description}
                techStack={project.techStack}
                githubUrl={project.githubUrl}
                duration={project.duration}
                photoUrl={project.photoUrl}
                liveUrl={project.liveUrl}
                collaborators={project.collaborators}
              />
            </div>
          ))}
        </div>

        {/* ── View More / Show Less ── */}
        <div className="flex justify-center mt-8 md:mt-12 ">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md cursor-pointer border-2 border-dashed border-green-500"
            style={{
              color: hovered ? "var(--bg-primary)" : "var(--text-accent)",
              background: hovered ? "var(--text-accent)" : "transparent",
              border: "1px solid var(--border-accent)",
              transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
              transform: hovered ? "translateY(-1px)" : "translateY(0)",
              boxShadow: hovered ? "0 4px 12px rgba(52,211,153,0.25)" : "none",
            }}
          >
            {showAll
              ? "Show Less"
              : `View More (${PROJECTS.length - INITIAL_COUNT} more)`}
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200"
              style={{
                transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
