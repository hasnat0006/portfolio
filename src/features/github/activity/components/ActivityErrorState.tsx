"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ActivityErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ActivityErrorState({
  message,
  onRetry,
}: ActivityErrorStateProps) {
  return (
    <div
      className="rounded-md p-8 text-center"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(239,68,68,0.2)",
      }}
    >
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center mx-auto mb-4"
        style={{
          background: "rgba(239,68,68,0.1)",
          color: "#ef4444",
        }}
        aria-hidden="true"
      >
        <AlertTriangle size={20} />
      </div>
      <p
        className="text-sm font-medium mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Failed to load activity
      </p>
      <p
        className="text-xs max-w-sm mx-auto mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        {message ??
          "There was a problem fetching your GitHub activity. Please try again later."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 hover:scale-[1.02]"
          style={{
            color: "var(--text-accent)",
            background: "var(--bg-code)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <RefreshCw size={12} />
          Try Again
        </button>
      )}
    </div>
  );
}
