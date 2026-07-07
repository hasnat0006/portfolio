"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is visible in the viewport using IntersectionObserver.
 * @param threshold - Visibility threshold (0-1), defaults to 0.1
 */
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
