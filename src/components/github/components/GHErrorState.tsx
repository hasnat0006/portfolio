"use client";

interface Props { message?: string }

export function GHErrorState({ message = "Failed to load GitHub data" }: Props) {
  return (
    <div
      className="rounded-md p-8 flex flex-col items-center gap-4 text-center"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
      role="alert"
    >
      <span className="text-4xl" aria-hidden="true">⚠️</span>
      <div>
        <p className="text-subheading font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
          Unable to load GitHub dashboard
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{message}</p>
      </div>
      <a
        href="https://github.com/hasnat0006"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm transition-colors"
        style={{ color: "var(--text-accent)" }}
      >
        View GitHub profile directly →
      </a>
    </div>
  );
}
