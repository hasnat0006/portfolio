"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";

interface TooltipItem {
  id: number;
  name: string;
  image: string;
}

export default function AnimatedTooltip({
  items,
  iconSize = 32,
  borderless = false,
}: {
  items: TooltipItem[];
  iconSize?: number;
  borderless?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-row items-center gap-1.5 flex-wrap">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-3 py-1.5 text-xs shadow-xl"
              >
                <div className="absolute inset-x-8 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-8 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 font-semibold text-white font-mono">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.name}
            width={iconSize}
            height={iconSize}
            loading="lazy"
            suppressHydrationWarning
            className="relative rounded-md object-contain !p-0 transition duration-300 hover:scale-110"
            style={{
              background: borderless ? "transparent" : "var(--bg-badge)",
              border: borderless ? "none" : "1px solid var(--border-accent)",
              padding: borderless ? "6px" : "2px",
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
