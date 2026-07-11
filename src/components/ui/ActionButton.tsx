"use client";

import {
  ChevronRight,
  ExternalLink,
  GitFork,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

interface ActionButtonProps {
  href: string;
  icon?: "live" | "github" | "details" | LucideIcon;
  label: string;
  newTab?: boolean;
  size?: "sm" | "md";
  /** Optional custom icon element (overrides `icon` if provided) */
  customIcon?: ReactNode;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  live: ExternalLink,
  github: GitFork,
  details: ChevronRight,
};

/**
 * Compact, reusable action link button with hover effects.
 * Used for "Live" and "Code" links on project cards and elsewhere.
 */
export function ActionButton({
  href,
  icon,
  label,
  newTab = true,
  size = "md",
  customIcon,
  className = "",
}: ActionButtonProps) {
  const [hovered, setHovered] = useState(false);

  const IconComponent =
    typeof icon === "string" && icon in ICON_MAP ? ICON_MAP[icon] : null;
  const iconSize = size === "sm" ? 9 : 10;

  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-1 font-mono rounded-md whitespace-nowrap ${className}`}
      style={{
        color: hovered ? "var(--bg-primary)" : "var(--text-accent)",
        background: hovered ? "var(--text-accent)" : "transparent",
        border: "1px solid var(--border-accent)",
        transition: "all 0.2s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 12px rgba(52,211,153,0.25)" : "none",
        fontSize: size === "sm" ? "9px" : "10px",
        padding: size === "sm" ? "1px 6px" : "2px 8px",
        lineHeight: "20px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {customIcon ??
        (IconComponent ? (
          <IconComponent size={iconSize} aria-hidden="true" />
        ) : null)}
      {label}
    </a>
  );
}
