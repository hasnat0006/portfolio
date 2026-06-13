"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function TracingBeam({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const scrolled = Math.abs(rect.top);
      const progress = Math.min(
        Math.max(scrolled / (totalHeight - window.innerHeight), 0),
        1,
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Beam line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
        style={{
          background: "var(--border-primary)",
          opacity: 0.3,
        }}
      />
      {/* Animated beam dot */}
      <div
        className="absolute left-0 w-px pointer-events-none transition-all duration-150"
        style={{
          top: `${scrollProgress * 100}%`,
          height: "40px",
          background: `linear-gradient(to bottom, var(--text-accent), transparent)`,
          opacity: scrollProgress > 0 ? 0.6 : 0,
        }}
      />
      {children}
    </div>
  );
}
