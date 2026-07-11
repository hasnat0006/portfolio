"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface ExpandableDetailProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  count?: number;
}

/**
 * Reusable expand/collapse section with Framer Motion animation.
 * Used inside cards to show extra detail (achievements, coursework, etc.)
 * without overwhelming the compact card layout.
 */
export function ExpandableDetail({
  title,
  children,
  defaultOpen = false,
  icon,
  count,
}: ExpandableDetailProps) {
  return (
    <details
      open={defaultOpen}
      className="group mt-3 rounded-md"
      style={{
        background: "var(--bg-code)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <summary
        className="flex items-center gap-2 px-3 py-2 cursor-pointer text-xs font-mono select-none"
        style={{ color: "var(--text-muted)" }}
        role="button"
        aria-expanded={defaultOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            (e.currentTarget.closest("details") as HTMLDetailsElement).open = !(
              e.currentTarget.closest("details") as HTMLDetailsElement
            ).open;
          }
        }}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1">{title}</span>
        {count !== undefined && (
          <span
            className="flex-shrink-0 px-1.5 py-0.5 rounded-sm text-[10px] leading-tight"
            style={{
              background:
                "color-mix(in srgb, var(--text-accent) 12%, transparent)",
              color: "var(--text-accent)",
            }}
          >
            {count}
          </span>
        )}
        <motion.div
          className="flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
          animate={{ rotate: defaultOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={12} />
        </motion.div>
      </summary>

      <AnimatePresence initial={false}>
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="px-3 pb-3 pt-1">{children}</div>
        </motion.div>
      </AnimatePresence>
    </details>
  );
}
