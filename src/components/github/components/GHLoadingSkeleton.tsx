"use client";

export function GHLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse" aria-label="Loading dashboard…" role="status">
      {/* Hero */}
      <div className="rounded-2xl h-60" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }} />
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-xl h-24" style={{ background: "var(--bg-card-hover)" }} />
        ))}
      </div>
      {/* Heatmap */}
      <div className="rounded-2xl h-44" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }} />
      {/* Two-col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl h-64" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }} />
        <div className="rounded-2xl h-64" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }} />
      </div>
      {/* Featured */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl h-52" style={{ background: "var(--bg-card-hover)" }} />
        ))}
      </div>
      {/* Wide */}
      <div className="rounded-2xl h-72" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }} />
    </div>
  );
}
