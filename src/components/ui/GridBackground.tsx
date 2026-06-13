"use client";

import { type ReactNode } from "react";

export default function GridBackground({
  children,
  className = "",
  variant = "grid",
}: {
  children?: ReactNode;
  className?: string;
  variant?: "grid" | "dots";
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            variant === "grid"
              ? `linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)`
              : `radial-gradient(circle, var(--text-muted) 1px, transparent 1px)`,
          backgroundSize: variant === "grid" ? "40px 40px" : "20px 20px",
          opacity: 0.3,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
