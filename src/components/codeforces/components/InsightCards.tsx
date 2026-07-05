"use client";

import { useEffect, useRef, useState } from "react";
import type { Insight } from "../types";

const CSS = `
@keyframes cf-insight-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .cf-insight-card { animation: none !important; }
}
`;

interface Props {
  insights: Insight[];
}

interface IconProps {
  name: string;
}

function InsightIcon({ name }: IconProps) {
  if (name === "rating") {
    return (
      <polyline
        points="22 7 13.5 15.5 8.5 10.5 2 17"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    );
  }

  if (name === "rank") {
    return (
      <>
        <path
          d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M18 2H6v7a6 6 0 0 0 12 0V2z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M4 22h16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </>
    );
  }

  if (name === "activity") {
    return (
      <polyline
        points="22 12 18 12 15 21 9 3 6 12 2 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    );
  }

  if (name === "code") {
    return (
      <>
        <polyline
          points="16 18 22 12 16 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <polyline
          points="8 6 2 12 8 18"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </>
    );
  }

  if (name === "average") {
    return (
      <>
        <line
          x1="18"
          x2="18"
          y1="20"
          y2="10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <line
          x1="12"
          x2="12"
          y1="20"
          y2="4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <line
          x1="6"
          x2="6"
          y1="20"
          y2="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </>
    );
  }

  if (name === "contribution") {
    return (
      <>
        <circle
          cx="9"
          cy="7"
          fill="none"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M3 21v-2a4 4 0 0 1 4-4h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M16 11l2 2 4-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </>
    );
  }

  if (name === "solved") {
    return (
      <polyline
        points="20 6 9 17 4 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    );
  }

  return (
    <>
      <rect
        fill="none"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        x="3"
        y="4"
      />
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        x1="16"
        x2="16"
        y1="2"
        y2="6"
      />
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        x1="8"
        x2="8"
        y1="2"
        y2="6"
      />
      <line
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        x1="3"
        x2="21"
        y1="10"
        y2="10"
      />
    </>
  );
}

export function InsightCards({ insights }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div ref={ref}>
        <div className="mb-4">
          <h3
            className="text-subheading font-semibold text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Personal Insights
          </h3>
          <p
            className="text-meta mt-0.5"
            style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
          >
            Derived statistics from your competitive programming journey
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          role="list"
          aria-label="Personal insights"
        >
          {insights.map((insight, index) => (
            <div
              key={insight.label}
              role="listitem"
              className="cf-insight-card rounded-md p-4 flex flex-col gap-1.5 transition-all duration-200"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
                animation: visible
                  ? `cf-insight-in 0.4s ease-out ${index * 50}ms both`
                  : "none",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = "var(--border-hover)";
                event.currentTarget.style.transform = "translateY(-2px)";
                event.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = "var(--border-primary)";
                event.currentTarget.style.transform = "";
                event.currentTarget.style.boxShadow = "";
              }}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                style={{ color: "var(--text-accent)" }}
              >
                <InsightIcon name={insight.icon} />
              </svg>
              <p
                className="text-code font-bold text-sm leading-tight"
                style={{ color: "var(--text-accent)" }}
              >
                {insight.value}
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {insight.label}
              </p>
              {insight.sub && (
                <p
                  className="text-meta"
                  style={{ color: "var(--text-muted)", fontSize: "0.62rem" }}
                >
                  {insight.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
