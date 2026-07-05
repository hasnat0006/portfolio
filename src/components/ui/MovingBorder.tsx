"use client";

import { type ReactNode } from "react";

export default function MovingBorder({
  children,
  className = "",
  duration = 3000,
  as: Component = "button",
  ...props
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  as?: "button" | "a" | "div";
} & Record<string, unknown>) {
  return (
    <Component
      className={`relative inline-flex overflow-hidden rounded-md p-[1px] ${className}`}
      {...props}
    >
      {/* Rotating border */}
      <span
        className="absolute inset-[-100%] animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, var(--text-accent) 10%, transparent 20%)`,
          animationDuration: `${duration}ms`,
        }}
      />
      {/* Content */}
      <span
        className="relative inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium backdrop-blur-xl"
        style={{
          background: "var(--bg-card)",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </span>
    </Component>
  );
}
