"use client";

export function LoadingSkeleton() {
  return (
    <div
      className="space-y-8 animate-pulse"
      aria-label="Loading dashboard…"
      role="status"
    >
      {/* Hero */}
      <div
        className="rounded-md p-8 h-56"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      />
      {/* Stat grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md h-24"
            style={{ background: "var(--bg-card-hover)" }}
          />
        ))}
      </div>
      {/* Chart */}
      <div
        className="rounded-md h-72"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      />
      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-md h-64"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          />
        ))}
      </div>
      {/* Heatmap */}
      <div
        className="rounded-md h-40"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      />
      {/* Table */}
      <div
        className="rounded-md h-80"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      />
    </div>
  );
}
