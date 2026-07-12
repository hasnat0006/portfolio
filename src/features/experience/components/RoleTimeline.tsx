"use client";

interface Role {
  name: string;
  start_date: string;
  end_date?: string;
}

interface RoleTimelineProps {
  roles: Role[];
}

/**
 * LinkedIn-style role history with dots and connecting vertical line.
 * Renders each role with a filled dot (first/current) or hollow dot (past)
 * connected by a thin vertical line.
 */
export function RoleTimeline({ roles }: RoleTimelineProps) {
  if (!roles || roles.length === 0) return null;

  return (
    <div className="mt-1.5">
      {roles.map((role, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === roles.length - 1;

        return (
          <div key={idx} className="relative flex gap-3">
            {/* Vertical connecting line + dot — LinkedIn-style */}
            <div
              className="flex flex-col items-center flex-shrink-0"
              style={{ width: "12px" }}
            >
              {/* Dot */}
              <div
                className="rounded-full flex-shrink-0 z-10"
                style={{
                  width: "8px",
                  height: "8px",
                  marginTop: "6px",
                  background: isFirst ? "var(--text-accent)" : "var(--bg-card)",
                  border: "2px solid var(--text-accent)",
                }}
                aria-hidden="true"
              />
              {/* Line extending down (except for last role) */}
              {!isLast && (
                <div
                  className="flex-1 w-px"
                  style={{ background: "var(--text-accent)", opacity: 0.25 }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Role content */}
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0 sm:gap-2">
                <p
                  className="text-sm font-mono"
                  style={{ color: "var(--text-accent)" }}
                >
                  {role.name}
                </p>
                <span
                  className="text-xs font-mono whitespace-nowrap"
                  style={{ color: "var(--text-muted)" }}
                >
                  {role.start_date} — {role.end_date ?? "Present"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
