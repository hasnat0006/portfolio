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
  const isSmall = size === "sm";
  const defaultIcon = isSmall ? DEFAULT_SM_ICON : DEFAULT_MD_ICON;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 transition-all duration-200 ${
        isSmall ? "p-1 -m-1" : ""
      }`}
      style={{
        color: hovered ? "var(--text-accent)" : "var(--text-muted)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label ?? href}
    >
      {icon ?? defaultIcon}
      {label && (
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
          {label}
        </span>
      )}
    </a>
  );
}
