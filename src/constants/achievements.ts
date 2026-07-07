// ─────────────────────────────────────────────────────────────────────────────
// SVG paths
// ─────────────────────────────────────────────────────────────────────────────

export const EXTERNAL_LINK_PATH =
  "M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z";

export const EYE_ICON_PATH =
  "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.4 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zm-144-80c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16zm0 64c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16s-16-7.2-16-16V256c0-8.8 7.2-16 16-16z";

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

// ─────────────────────────────────────────────────────────────────────────────
// Animation timing constants
// ─────────────────────────────────────────────────────────────────────────────

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
