"use client";

import { useInView } from "@/hooks/useInView";

interface SectionDividerProps {
  label: string;
}

/**
 * Thin horizontal separator with a centered label pill.
 * Animated with fade-up on scroll into view.
 */
export function SectionDivider({ label }: SectionDividerProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-6 mt-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(8px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(52,211,153,0.5), transparent)",
        }}
      />
      <span
        className="text-xs font-mono uppercase tracking-[0.15em] px-2 py-1 rounded-md flex-shrink-0"
        style={{
          color: "var(--text-accent)",
          border: "1px solid rgba(52,211,153,0.25)",
          background: "rgba(52,211,153,0.07)",
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(52,211,153,0.5))",
        }}
      />
    </div>
  );
}
