"use client";

import { ANIMATION } from "@/constants/achievements";
import { useTilt } from "@/hooks/useTilt";
import type { ReactNode } from "react";

interface HoverCardProps {
  children: (hovered: boolean) => ReactNode;
  className?: string;
  style?: React.CSSProperties;
  topAccent?: boolean;
}

/**
 * Interactive card with 3D tilt, dynamic spotlight, and glassmorphism styling.
 * Uses a render-prop pattern to expose the `hovered` state to children
 * for conditional inner-element effects (e.g., text-shadow, icon glow).
 */
export function HoverCard({
  children,
  className = "",
  style,
  topAccent = false,
}: HoverCardProps) {
  const { ref, tilt, spotlight, hovered, onMove, onEnter, onLeave } = useTilt();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`achievement-shimmer-hover relative overflow-hidden rounded-md ${className}`}
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: hovered
          ? "1px solid rgba(52,211,153,0.4)"
          : "1px solid var(--border-accent)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(52,211,153,0.15), 0 0 40px rgba(52,211,153,0.06)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(4px)`,
        transition: hovered
          ? ANIMATION.hoverTransition
          : ANIMATION.unhoverTransition,
        cursor: "default",
        ...style,
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Top accent gradient bar (used by OtherAchievementCard) */}
      {topAccent && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-md pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(90deg, rgba(52,211,153,0.7), rgba(34,211,238,0.5), transparent)"
              : "linear-gradient(90deg, rgba(52,211,153,0.3), transparent)",
            transition: "background 0.4s ease",
          }}
        />
      )}

      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 rounded-md pointer-events-none"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, transparent 50%, rgba(34,211,238,0.04) 100%)"
            : "transparent",
          transition: "background 0.4s ease",
        }}
      />

      {/* Cursor spotlight */}
      {hovered && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: spotlight.x,
            top: spotlight.y,
            width: 280,
            height: 280,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
      )}

      {children(hovered)}
    </div>
  );
}
