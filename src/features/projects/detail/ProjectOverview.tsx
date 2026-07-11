"use client";

import { useInView } from "@/hooks/useInView";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface ProjectOverviewProps {
  fullDescription: string;
  collaborators?: { name: string; github: string }[];
}

export function ProjectOverview({
  fullDescription,
  collaborators,
}: ProjectOverviewProps) {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <ProjectSectionHeader label="Overview" title="About this project" />

        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition:
              "opacity 0.6s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Description */}
            <div className="lg:col-span-3 order-2 lg:order-1">
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

            {collaborators && collaborators.length > 0 && (
              <div className="lg:sticky lg:top-24 lg:self-start lg:col-span-1 order-1 lg:order-2">
                <div
                  className="rounded-md p-2"
                  style={{
                    // background: "var(--bg-card)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  <h3
                    className="text-xs font-mono text-center uppercase tracking-wider mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Team / Collaborators
                  </h3>
                  <div className="space-y-2 p-2 gap-2">
                    {collaborators.map((collab) => (
                      <a
                        key={collab.github}
                        href={`https://github.com/${collab.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center py-1 gap-2 group rounded-md transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-emerald-500/10"
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
                        <ExternalLink
                          size={12}
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "var(--text-muted)" }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
