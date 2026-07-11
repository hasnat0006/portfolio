"use client";

import { ActionButton } from "@/components/ui/ActionButton";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";
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
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div
          ref={ref}
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
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
              Interested to work together on something similar? Let&apos;s
              connect and build something great.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasActions && (
                <>
                  {liveUrl && (
                    <ActionButton
                      href={liveUrl}
                      icon="live"
                      label={`Visit ${projectTitle}`}
                      className="!text-sm !font-semibold !px-5 !py-2.5 !rounded-md"
                    />
                  )}
                  {githubUrl && (
                    <ActionButton
                      href={githubUrl}
                      icon="github"
                      label="View Source"
                      className="!text-sm !font-mono !px-5 !py-2.5 !rounded-md"
                    />
                  )}
                </>
              )}

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-mono transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                Get in Touch
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
