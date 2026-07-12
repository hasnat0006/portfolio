
export const EXP_STYLES = `
@keyframes exp-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes exp-node-pop {
  0%   { transform: scale(0.5); opacity: 0; }
  70%  { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes timeline-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .exp-item { transition: none !important; animation: none !important; }
  .timeline-pulse { animation: none !important; }
}
.exp-show-more-content {
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.25s ease;
}
`;


export const EXP_ANIMATION = {
  fadeDuration: "0.5s",
  fadeCurve: "cubic-bezier(0.23,1,0.32,1)",
  nodePopCurve: "cubic-bezier(0.34,1.56,0.64,1)",
  staggerDelay: 80,
  nodePopDuration: "0.4s",
  nodeBaseDelay: 60,
} as const;


export const TIMELINE_CARD_STYLE: React.CSSProperties = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-accent)",
  boxShadow: "var(--shadow-sm)",
};
