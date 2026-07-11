"use client";

import { useInView } from "@/hooks/useInView";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface ProjectChallengeSolutionImpactProps {
  problem?: string;
  solution?: string;
  challenges?: string[];
  impact?: string;
}

/**
 * Three visually connected cards presenting Challenge → Solution → Impact.
 * Uses a connecting line/arrow on desktop and stacked layout on mobile.
 */
export function ProjectChallengeSolutionImpact({
  problem,
  solution,
  challenges,
  impact,
}: ProjectChallengeSolutionImpactProps) {
  const { ref, inView } = useInView(0.1);
  const hasContent = problem || solution || impact;

  if (!hasContent) return null;

  const cards = [
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      label: "Challenge",
      title: "The problem",
      content: problem,
      color: "var(--text-accent-secondary)",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      label: "Solution",
      title: "How we built it",
      content: solution,
      color: "var(--text-accent)",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      label: "Impact",
      title: "What we achieved",
      content: impact,
      color: "var(--text-accent)",
    },
  ].filter((c) => c.content);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Process"
          title="Challenge → Solution → Impact"
          description="From identifying the problem to delivering measurable results."
        />

        <div
          ref={ref}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-12 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--text-accent-secondary), var(--text-accent), var(--text-accent))",
              opacity: inView ? 0.3 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }}
          />

          {cards.map((card, i) => (
            <div
              key={card.label}
              className="rounded-2xl p-6 md:p-8 relative transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-sm)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.15}s`,
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `color-mix(in srgb, ${card.color} 10%, transparent)`,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>

              {/* Step number */}
              <span
                className="text-[10px] font-mono uppercase tracking-wider mb-2 block"
                style={{ color: "var(--text-muted)" }}
              >
                {card.label}
              </span>

              <h3
                className="text-base font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {card.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {card.content}
              </p>

              {/* Number indicator */}
              <div
                className="absolute top-6 right-6 text-4xl font-bold font-mono"
                style={{
                  color: "var(--border-primary)",
                  opacity: 0.4,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Challenges sub-section */}
        {challenges && challenges.length > 0 && (
          <div
            className="mt-10 rounded-2xl p-6 md:p-8"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <h3
              className="text-sm font-semibold font-mono mb-5 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                style={{ color: "var(--text-accent)" }}
              >
                <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Specific obstacles overcome
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {challenges.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  <span
                    className="relative w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono font-bold"
                    style={{
                      background: `color-mix(in srgb, var(--text-accent) 10%, transparent)`,
                      color: "var(--text-accent)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
