"use client";

import { IconChevron } from "@/components/icons/experience";
import { useState } from "react";

interface ResponsibilityListProps {
  items: string[];
  maxVisible?: number;
}

/**
 * Bullet list of responsibilities with a "Show more / Show less" toggle.
 * Uses smooth max-height animation for the expand/collapse.
 */
export function ResponsibilityList({
  items,
  maxVisible = 4,
}: ResponsibilityListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > maxVisible;
  const visible = expanded ? items : items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);

  return (
    <div>
      <ul className="space-y-1 mt-2" role="list">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="flex-shrink-0 w-1 h-1 rounded-md"
              style={{ background: "var(--text-accent)", marginTop: "0.45rem" }}
              aria-hidden="true"
            />
            <span
              className="text-sm font-mono leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <>
          <div
            className="exp-show-more-content"
            style={{
              maxHeight: expanded ? `${hidden.length * 40}px` : "0px",
              opacity: expanded ? 1 : 0,
            }}
          >
            <ul className="space-y-1 mt-1" role="list">
              {hidden.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="flex-shrink-0 w-1 h-1 rounded-md"
                    style={{
                      background: "var(--text-accent)",
                      marginTop: "0.45rem",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm font-mono leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 mt-2 text-sm font-mono transition-colors duration-200"
            style={{
              color: "var(--text-accent)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? "Show fewer responsibilities"
                : "Show more responsibilities"
            }
          >
            <IconChevron size={11} up={expanded} />
            {expanded ? "Show less" : `Show ${hidden.length} more`}
          </button>
        </>
      )}
    </div>
  );
}
