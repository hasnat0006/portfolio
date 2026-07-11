"use client";

import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";
import { ProjectSectionHeader } from "./ProjectSectionHeader";

interface MetricItem {
  label: string;
  value: string;
}

interface ProjectMetricsProps {
  metrics: MetricItem[];
}

function parseMetricValue(value: string): {
  prefix: string;
  num: number;
  suffix: string;
} {
  const match = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function MetricCard({
  metric,
  index,
  inView,
}: {
  metric: MetricItem;
  index: number;
  inView: boolean;
}) {
  const { prefix, num, suffix } = parseMetricValue(metric.value);
  const count = useCounter(num, 1500, inView);

  return (
    <div
      className="rounded-2xl p-6 md:p-7 text-center group hover:-translate-y-1 transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-primary)",
        boxShadow: "var(--shadow-sm)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <p
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-2 tabular-nums"
        style={{ color: "var(--text-accent)" }}
      >
        {prefix}
        {count}
        {suffix}
      </p>
      <p
        className="text-xs font-mono uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {metric.label}
      </p>
    </div>
  );
}

/**
 * Animated project metrics section.
 * Shows statistics with count-up animations triggered on scroll.
 */
export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  const { ref, inView } = useInView(0.3);

  if (!metrics || metrics.length === 0) return null;

  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <ProjectSectionHeader
          label="Metrics"
          title="Key statistics"
          description="Quantifiable results that demonstrate the project's impact."
        />

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
