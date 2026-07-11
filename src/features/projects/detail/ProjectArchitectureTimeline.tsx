"use client";

import { useInView } from "@/hooks/useInView";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface ArchitectureStep {
  title: string;
  description: string;
}

interface ProjectArchitectureTimelineProps {
  architecture?: string;
  architectureSteps?: ArchitectureStep[];
}

const defaultSteps: ArchitectureStep[] = [
  {
    title: "Planning & Research",
    description:
      "Defining requirements, choosing the tech stack, and designing the system architecture.",
  },
  {
    title: "Design & Prototyping",
    description:
      "Creating wireframes, component trees, and data flow diagrams before writing code.",
  },
  {
    title: "Core Development",
    description:
      "Building the main features iteratively, with regular testing and code reviews.",
  },
  {
    title: "Optimization & Polish",
    description:
      "Performance tuning, accessibility improvements, and visual refinements.",
  },
  {
    title: "Deployment & Launch",
    description:
      "CI/CD pipeline setup, staging environment testing, and production deployment.",
  },
  {
    title: "Maintenance & Iteration",
    description:
      "Monitoring, bug fixes, and feature updates based on user feedback.",
  },
];

/**
 * Architecture / Development Process section.
 * Displays a responsive vertical timeline with major technical decisions.
 */
export function ProjectArchitectureTimeline({
  architecture,
  architectureSteps,
}: ProjectArchitectureTimelineProps) {
  const { ref, inView } = useInView(0.1);
  const steps = architectureSteps || defaultSteps;

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Architecture"
          title="Development process"
          description="How this project was planned, built, and delivered."
        />

        {/* Architecture description */}
        {architecture && (
          <div
            className="mb-10 rounded-2xl p-6 md:p-8"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "color-mix(in srgb, var(--text-accent) 10%, transparent)",
                  color: "var(--text-accent)",
                }}
              >
                <svg
                  width="18"
                  height="18"
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
              </div>
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  System Architecture
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

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px"
            style={{
              background: `linear-gradient(to bottom, var(--text-accent), var(--border-primary))`,
              opacity: inView ? 0.3 : 0,
              transition: "opacity 0.8s ease",
            }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex items-start gap-6 group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.1}s`,
                }}
              >
                {/* Timeline dot */}
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "var(--bg-card)",
                    border: "2px solid var(--text-accent)",
                    color: "var(--text-accent)",
                  }}
                >
                  <span className="text-xs font-mono font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className="flex-1 rounded-xl p-5 transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-primary)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
