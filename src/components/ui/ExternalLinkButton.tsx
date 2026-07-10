"use client";

import { EXTERNAL_LINK_PATH } from "@/constants/achievements";
import { useState, type ReactNode } from "react";

interface ExternalLinkButtonProps {
  href: string;
  label?: string;
  size?: "sm" | "md";
  icon?: ReactNode;
}

const DEFAULT_SM_ICON = (
  <svg
    className="inline-block h-2.5 w-2.5"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d={EXTERNAL_LINK_PATH} />
  </svg>
);

const DEFAULT_MD_ICON = (
  <svg
    className="inline-block w-3 h-3"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d={EXTERNAL_LINK_PATH} />
  </svg>
);

/**
 * External link button with consistent hover styling.
 * Two sizes: "sm" (icon-only for tables) and "md" (icon + label for cards).
 */
export function ExternalLinkButton({
  href,
  label,
  size = "md",
  icon,
}: ExternalLinkButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-mono rounded-md whitespace-nowrap"
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
      aria-label={label ?? href}
    >
      {icon ?? (size === "sm" ? DEFAULT_SM_ICON : DEFAULT_MD_ICON)}
      {label && <span>{label}</span>}
    </a>
  );
}
