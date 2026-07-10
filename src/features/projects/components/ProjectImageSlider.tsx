"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
}

/**
 * A minimal, elegant image carousel for project screenshots.
 * Supports auto-scroll, keyboard navigation, dot indicators, and arrow controls.
 */
export function ProjectImageSlider({ images, title }: ProjectImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = images.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setIsPaused(true);
    // Resume auto-scroll after 6 seconds of inactivity
    setTimeout(() => setIsPaused(false), 6000);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  }, [total]);

  // Auto-scroll
  useEffect(() => {
    if (total <= 1 || isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      }
      if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  if (total === 0) return null;

  return (
    <div className="relative group select-none">
      {/* Image container */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: "16/10",
          background: "var(--bg-code)",
          border: "1px solid var(--border-primary)",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.04)",
              transitionDuration: "600ms",
            }}
          >
            <Image
              src={`/${src}`}
              alt={`${title} — screenshot ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlays for arrows */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Arrow controls — only show when more than 1 image */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
              aria-label="Previous screenshot"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
              aria-label="Next screenshot"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots + counter strip */}
      {total > 1 && (
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  background:
                    i === current
                      ? "var(--text-accent)"
                      : "var(--border-primary)",
                }}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
          <span
            className="text-[11px] font-mono tabular-nums"
            style={{ color: "var(--text-muted)" }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
