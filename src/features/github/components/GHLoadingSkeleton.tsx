"use client";

export function GHLoadingSkeleton() {
  return (
    <div
      className="space-y-8 animate-pulse"
      aria-label="Loading dashboard…"
      role="status"
    >
      {/* Hero */}
      <div
        className="rounded-md p-6 md:p-8"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Avatar placeholder */}
          <div
            className="rounded-full shrink-0"
            style={{
              width: 96,
              height: 96,
              background: "var(--bg-card-hover)",
            }}
          />
          {/* Info + chips */}
          <div className="flex-1 w-full">
            <div
              className="rounded-md h-5 w-48 mx-auto md:mx-0 mb-3"
              style={{ background: "var(--bg-card-hover)" }}
            />
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-md h-16"
                  style={{ background: "var(--bg-card-hover)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div
        className="rounded-md h-44"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-primary)",
        }}
      />

      {/* Two-col: Languages + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-md h-64"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        />
        <div
          className="rounded-md h-64"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        />
      </div>
    </div>
  );
}
