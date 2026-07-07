"use client";

import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "accent" | "muted";
  bold?: boolean;
  uppercase?: boolean;
  className?: string;
}

/**
 * Small pill badge used for tags like contest type, percentile, year.
 */
export function Badge({
  children,
  variant = "accent",
  bold = false,
  uppercase = false,
  className = "",
}: BadgeProps) {
  const isAccent = variant === "accent";

  return (
    <span
      className={`text-[10px] font-mono px-2.5 py-1 rounded-md ${bold ? "font-bold" : ""} ${uppercase ? "uppercase tracking-widest" : ""} ${className}`}
      style={{
        color: `var(--text-${isAccent ? "accent" : "muted"})`,
        background: isAccent ? "rgba(52,211,153,0.1)" : "rgba(52,211,153,0.06)",
        border: `1px solid ${
          isAccent ? "rgba(52,211,153,0.3)" : "rgba(52,211,153,0.15)"
        }`,
      }}
    >
      {children}
    </span>
  );
}
