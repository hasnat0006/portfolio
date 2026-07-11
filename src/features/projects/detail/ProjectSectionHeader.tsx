"use client";

import { useInView } from "@/hooks/useInView";

interface ProjectSectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

/**
 * Reusable section header used across all project detail sections.
 * Features an accent label bar, section title, and optional description.
 * Animates into view using IntersectionObserver.
 */
export function ProjectSectionHeader({
  label,
  title,
  description,
}: ProjectSectionHeaderProps) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="mb-10 md:mb-12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity 0.6s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {/* Accent label bar */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-1 h-6 rounded-full"
          style={{ background: "var(--text-accent)" }}
        />
        <span
          className="text-[11px] font-mono uppercase tracking-[0.15em] font-semibold"
          style={{ color: "var(--text-accent)" }}
        >
          {label}
        </span>
      </div>

      {/* Title */}
      <h2
        className="text-heading text-2xl md:text-3xl mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>

      {/* Optional description */}
      {description && (
        <p
          className="text-body text-base max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
