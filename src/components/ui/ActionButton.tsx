"use client";

import { useState } from "react";

interface ActionButtonProps {
  href: string;
  icon: "live" | "github" | "details";
  label: string;
  newTab?: boolean;
}

/**
 * Compact, reusable action link button with hover effects.
 * Used for "Live" and "Code" links on project cards and elsewhere.
 */
export function ActionButton({
  href,
  icon,
  label,
  newTab = true,
}: ActionButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-1 font-mono rounded-md whitespace-nowrap"
      style={{
        color: hovered ? "var(--bg-primary)" : "var(--text-accent)",
        background: hovered ? "var(--text-accent)" : "transparent",
        border: "1px solid var(--border-accent)",
        transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 12px rgba(52,211,153,0.25)" : "none",
        fontSize: "10px",
        padding: "2px 8px",
        lineHeight: "20px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon === "live" ? (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      ) : icon === "github" ? (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
        </svg>
      ) : (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      )}
      {label}
    </a>
  );
}
