"use client";

interface ProjectMetricsProps {
  metrics: { label: string; value: string }[];
}

/**
 * Displays a row of metric badges with labelled values.
 * Used inside ProjectCard and FeaturedProjectCard to highlight
 * quantifiable project impact data.
 */
export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (!metrics.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map((m) => (
        <span
          key={m.label}
          className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md"
          style={{
            color: "var(--text-primary)",
            background:
              "color-mix(in srgb, var(--text-accent) 6%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--text-accent) 15%, transparent)",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>{m.label}:</span>
          <span style={{ color: "var(--text-accent)", fontWeight: 600 }}>
            {m.value}
          </span>
        </span>
      ))}
    </div>
  );
}
