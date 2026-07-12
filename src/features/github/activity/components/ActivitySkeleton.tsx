"use client";

export function ActivitySkeleton() {
  return (
    <div className="space-y-1">
      {/* Date group header skeleton */}
      <div className="flex items-center gap-3 py-2">
        <div
          className="h-3 w-20 rounded-sm animate-pulse"
          style={{ background: "var(--bg-code)" }}
        />
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border-primary)" }}
        />
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="relative flex items-start gap-3 py-2.5"
          style={{
            animationDelay: `${i * 80}ms`,
          }}
        >
          {/* Dot skeleton */}
          <div
            className="w-[26px] h-[26px] rounded-md animate-pulse shrink-0"
            style={{ background: "var(--bg-code)" }}
          />

          <div className="flex-1 min-w-0 space-y-2 pt-1">
            {/* Title line */}
            <div
              className="h-3 w-3/4 rounded-sm animate-pulse"
              style={{ background: "var(--bg-code)" }}
            />
            {/* Repo line */}
            <div
              className="h-2.5 w-1/3 rounded-sm animate-pulse"
              style={{ background: "var(--bg-code)" }}
            />
          </div>

          {/* Timestamp skeleton */}
          <div
            className="h-2.5 w-12 rounded-sm animate-pulse shrink-0 mt-1"
            style={{ background: "var(--bg-code)" }}
          />
        </div>
      ))}
    </div>
  );
}
