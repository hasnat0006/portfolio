"use client";

import { useInView } from "@/hooks/useInView";
import Link from "next/link";

interface ProjectBottomCTAProps {
  liveUrl?: string;
  githubUrl?: string;
  projectTitle: string;
}

/**
 * Bottom Call-to-Action section.
 * Encourages visitors to explore more projects or get in touch.
 */
export function ProjectBottomCTA({
  liveUrl,
  githubUrl,
  projectTitle,
}: ProjectBottomCTAProps) {
  const { ref, inView } = useInView(0.2);
  const hasActions = liveUrl || githubUrl;

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div
          ref={ref}
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-lg)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.6s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {/* Subtle decorative gradient */}
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 60%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h2
              className="text-heading text-2xl md:text-3xl mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Like what you see?
            </h2>
            <p
              className="text-body text-sm md:text-base mb-8 max-w-lg mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Interested in this project or want to work together on something
              similar? Let&apos;s connect and build something great.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasActions && (
                <>
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
                      Visit {projectTitle}
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
                      View Source
                    </a>
                  )}
                </>
              )}

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                Get in Touch
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
