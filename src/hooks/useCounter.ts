"use client";

import { useEffect, useState } from "react";

/**
 * Animates a numeric count-up/down effect using requestAnimationFrame.
 * Uses cubic ease-out for smooth animation.
 * @param target - The final number to count to
 * @param duration - Animation duration in ms
 * @param active - Whether the animation should start
 */
export function useCounter(target: number, duration = 1400, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      /** Cubic ease-out: 1 - (1 - t)^3 */
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(Math.round(eased * target));

      if (elapsed < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
}
