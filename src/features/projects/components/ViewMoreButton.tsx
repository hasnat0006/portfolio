"use client";

import { INITIAL_COUNT } from "@/constants/projects";
import { PROJECTS } from "@/data/projects";

interface ViewMoreButtonProps {
  showAll: boolean;
  onToggle: () => void;
}

/**
 * Animated "View More / Show Less" toggle button for the projects grid.
 */
export function ViewMoreButton({ showAll, onToggle }: ViewMoreButtonProps) {
  const remaining = PROJECTS.length - INITIAL_COUNT;

  return (
    <div className="flex justify-center mt-8 md:mt-12">
      <button
        onClick={onToggle}
        className="group flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md cursor-pointer"
        style={{
          color: "var(--text-accent)",
          background: "transparent",
          border: "1px solid var(--border-accent)",
          transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.color = "var(--bg-primary)";
          el.style.background = "var(--text-accent)";
          el.style.transform = "translateY(-1px)";
          el.style.boxShadow = "0 4px 12px rgba(52,211,153,0.25)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.color = "var(--text-accent)";
          el.style.background = "transparent";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {showAll ? "Show Less" : `View More (${remaining} more)`}
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
  );
}
