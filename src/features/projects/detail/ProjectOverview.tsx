"use client";

import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface ProjectOverviewProps {
  fullDescription: string;
  collaborators?: { name: string; github: string }[];
}

/**
 * Two-column project overview section.
 * Left column: full project description.
 * Right column: collaborators / team info.
 */
export function ProjectOverview({
  fullDescription,
  collaborators,
}: ProjectOverviewProps) {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Overview"
          title="About this project"
          description="A closer look at what this project is all about."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.6s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {/* Description */}
          <div className="lg:col-span-3">
            {fullDescription.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-body leading-relaxed text-base"
                style={{
                  color: "var(--text-secondary)",
                  marginTop: i > 0 ? "1.25rem" : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Collaborators sidebar */}
          {collaborators && collaborators.length > 0 && (
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <h3
                  className="text-xs font-mono uppercase tracking-wider mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Team / Collaborators
                </h3>
                <div className="space-y-3">
                  {collaborators.map((collab) => (
                    <a
                      key={collab.github}
                      href={`https://github.com/${collab.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <div
                        className="w-9 h-9 rounded-full overflow-hidden shrink-0"
                        style={{
                          border: "2px solid var(--border-primary)",
                        }}
                      >
                        <Image
                          src={`https://github.com/${collab.github}.png?size=72`}
                          alt={collab.name}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium transition-colors"
                          style={{
                            color: "var(--text-primary)",
                          }}
                        >
                          {collab.name}
                        </p>
                        <p
                          className="text-[11px] font-mono"
                          style={{ color: "var(--text-muted)" }}
                        >
                          @{collab.github}
                        </p>
                      </div>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
