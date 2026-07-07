"use client";

import { useRef, useState } from "react";

interface TiltState {
  x: number;
  y: number;
}

interface SpotlightState {
  x: number;
  y: number;
}

interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  tilt: TiltState;
  spotlight: SpotlightState;
  hovered: boolean;
  onMove: (e: React.MouseEvent) => void;
  onEnter: () => void;
  onLeave: () => void;
}

/**
 * Provides 3D tilt and spotlight tracking for card hover effects.
 * @param tiltFactor - Degrees of tilt per axis, defaults to 5
 */
export function useTilt(tiltFactor = 5): UseTiltReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState<SpotlightState>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    setTilt({
      x: (dy / (rect.height / 2)) * -tiltFactor,
      y: (dx / (rect.width / 2)) * tiltFactor,
    });
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return { ref, tilt, spotlight, hovered, onMove, onEnter, onLeave };
}
