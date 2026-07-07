"use client";

interface GlowIconProps {
  icon: string;
  hovered?: boolean;
}

/**
 * Glowing icon bubble used in achievement cards.
 * Shows a subtle glow effect on hover.
 */
export function GlowIcon({ icon, hovered = false }: GlowIconProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-md text-xl"
      style={{
        background: hovered ? "rgba(52,211,153,0.15)" : "rgba(52,211,153,0.08)",
        border: hovered
          ? "1px solid rgba(52,211,153,0.35)"
          : "1px solid rgba(52,211,153,0.18)",
        boxShadow: hovered ? "0 0 16px rgba(52,211,153,0.25)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {icon}
    </div>
  );
}
