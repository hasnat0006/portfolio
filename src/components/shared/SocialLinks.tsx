"use client";

import { SOCIAL_ICONS } from "@/data/social";
import type { CSSProperties } from "react";

interface SocialLinksProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Reusable social links bar used in both HeroSection and Footer.
 * Renders each SVG icon with inline path data for reliable rendering
 * across all browsers and frameworks.
 */
export function SocialLinks({ size = 22, className, style }: SocialLinksProps) {
  return (
    <div className={className} style={style}>
      {SOCIAL_ICONS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={
            link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
          }
          className="transition-all duration-300 hover:scale-110"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
          aria-label={link.label}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
