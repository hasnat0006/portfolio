// ─────────────────────────────────────────────────────────────────────────────
// Table
// ─────────────────────────────────────────────────────────────────────────────

export const TABLE_HEADERS = ["", "Rank", "Contest", "Team Name", "Articles"];

export const TABLE_HEADER_WIDTHS = [
  "pl-4 pr-2 w-9",
  "px-3 w-16",
  "px-3",
  "px-3 w-48",
  "px-3 w-44",
] as const;

export const ANIMATION = {
  fadeDuration: "0.55s",
  fadeDurationSlow: "0.6s",
  springCurve: "cubic-bezier(0.23,1,0.32,1)",
  cardStaggerDelay: 120,
  cardStaggerDelayFast: 90,
  tableRowDelay: 50,
  tableRowBaseDelay: 60,
  countPopDuration: "0.4s",
  statCardDelayStep: 80,
  hoverTransition:
    "transform 0.1s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  unhoverTransition:
    "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Glassmorphism base styles
// ─────────────────────────────────────────────────────────────────────────────

export const GLASS_BASE = {
  background: "rgba(52,211,153,0.03)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(52,211,153,0.13)",
  borderRadius: "12px",
} as const;

export const GLASS_CARD_BASE = {
  background: "var(--bg-card)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--border-accent)",
} as const;

export const GLASS_STAT_BASE = {
  background: "rgba(52,211,153,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(52,211,153,0.13)",
  borderRadius: "12px",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Rank thresholds
// ─────────────────────────────────────────────────────────────────────────────

export const RANK_TOP_THRESHOLD = 50;
export const RANK_MID_THRESHOLD = 80;
