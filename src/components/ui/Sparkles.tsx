"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
};

export default function Sparkles({
  children,
  className = "",
  particleCount = 20,
}: {
  children?: ReactNode;
  className?: string;
  particleCount?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();

    const generated: Particle[] = Array.from(
      { length: particleCount },
      (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
        delay: Math.random() * 3,
      }),
    );
    setParticles(generated);
  }, [particleCount]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Sparkle particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-md pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "var(--text-accent)",
            animation: `sparkle 2s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      {children}
    </div>
  );
}
