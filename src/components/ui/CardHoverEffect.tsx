"use client";

import { useState, type ReactNode } from "react";

type CardItem = {
  id: string;
  content: ReactNode;
};

export default function CardHoverEffect({
  items,
  className = "",
}: {
  items: CardItem[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group p-1"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Animated highlight background */}
          <div
            className="absolute inset-0 rounded-md transition-all duration-300"
            style={{
              background: hoveredIndex === idx ? "var(--border-accent)" : "transparent",
              opacity: hoveredIndex === idx ? 1 : 0,
              transform: hoveredIndex === idx ? "scale(1)" : "scale(0.95)",
            }}
          />
          {/* Card content */}
          <div
            className="relative rounded-md border p-5 h-full transition-all duration-300"
            style={{
              background: "var(--bg-card)",
              borderColor: hoveredIndex === idx ? "var(--border-hover)" : "var(--border-primary)",
              boxShadow: hoveredIndex === idx ? "var(--shadow-lg)" : "var(--shadow-sm)",
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
