"use client";

import { GLASS_BASE } from "@/constants/achievements";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Glassmorphism wrapper used for the achievements table container.
 */
export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`achievement-shimmer-hover ${className}`}
      style={GLASS_BASE}
    >
      {children}
    </div>
  );
}
