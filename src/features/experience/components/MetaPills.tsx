"use client";

import { IconLink, IconMapPin } from "@/components/icons/experience";

interface MetaPillsProps {
  location?: string;
  website?: string;
  cgpa?: string;
  isCurrent?: boolean;
}

/**
 * Optional metadata pills row — CGPA badge, location chip, and website link.
 */
export function MetaPills({
  location,
  website,
  cgpa,
  isCurrent,
}: MetaPillsProps) {
  const hasPills = isCurrent || cgpa || location || website;
  if (!hasPills) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {isCurrent && (
        <span
          className="text-xs font-mono px-3 py-1 rounded-md"
          style={{
            color: "var(--text-accent)",
            background:
              "color-mix(in srgb, var(--text-accent) 8%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--text-accent) 20%, transparent)",
          }}
        >
          Present
        </span>
      )}

      {cgpa && (
        <span
          className="text-xs font-mono px-3 py-1 rounded-md"
          style={{
            color: "var(--text-accent)",
            background: "rgba(52,211,153,0.06)",
            border: "1px solid rgba(52,211,153,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(52,211,153,0.14)";
            e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(52,211,153,0.06)";
            e.currentTarget.style.borderColor = "rgba(52,211,153,0.2)";
          }}
        >
          CGPA {cgpa}
        </span>
      )}

      {location && (
        <span
          className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-md"
          style={{
            color: "var(--text-muted)",
            background: "var(--bg-code)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <IconMapPin size={10} />
          {location}
        </span>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-md transition-all duration-200"
          style={{
            color: "var(--text-muted)",
            background: "var(--bg-code)",
            border: "1px solid var(--border-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-accent)";
            e.currentTarget.style.borderColor = "var(--text-accent)";
            e.currentTarget.style.background =
              "color-mix(in srgb, var(--text-accent) 6%, transparent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border-primary)";
            e.currentTarget.style.background = "var(--bg-code)";
          }}
          aria-label="Visit website"
        >
          <IconLink size={10} />
          Website
        </a>
      )}
    </div>
  );
}
