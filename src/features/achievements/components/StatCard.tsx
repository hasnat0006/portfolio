"use client";

import { ANIMATION } from "@/constants/achievements";
import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";
import { extractNumericValue, extractPrefix } from "@/utils/achievements";

interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  delay?: number;
  isNumeric?: boolean;
}

/**
 * Animated statistics card with a count-up effect.
 * Fades in when scrolled into view.
 */
export function StatCard({
  label,
  value,
  sub,
  delay = 0,
  isNumeric = true,
}: StatCardProps) {
  const { ref, inView } = useInView();
  const numericValue =
    typeof value === "number" ? value : extractNumericValue(String(value));
  const prefix = typeof value === "string" ? extractPrefix(value) : "";
  const counted = useCounter(numericValue, 1200, inView && isNumeric);
  const displayValue = isNumeric ? `${prefix}${counted}` : value;

  return (
    <div
      ref={ref}
      className="achievement-shimmer-hover"
      style={{
        background: "rgba(52,211,153,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(52,211,153,0.13)",
        borderRadius: "12px",
        padding: "1rem",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(20px)",
        transition: `opacity ${ANIMATION.fadeDuration} ease ${delay}ms, transform ${ANIMATION.fadeDuration} ease ${delay}ms`,
      }}
    >
      <p
        className="text-2xl font-bold font-mono"
        style={{
          color: "var(--text-accent)",
          textShadow: inView ? "0 0 20px rgba(52,211,153,0.3)" : "none",
          animation: inView
            ? `achievement-count-pop ${ANIMATION.countPopDuration} ease ${delay + 800}ms`
            : "none",
        }}
      >
        {displayValue}
      </p>
      <p
        className="text-xs font-semibold mt-0.5"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </p>
      <p
        className="text-[10px] font-mono"
        style={{ color: "var(--text-muted)" }}
      >
        {sub}
      </p>
    </div>
  );
}
