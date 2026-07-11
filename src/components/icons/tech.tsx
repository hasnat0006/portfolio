import { useTheme } from "@/components/ThemeProvider";
import { skillIconUrl } from "@/data/skills";
import { AnimatePresence, motion } from "framer-motion";
import { Code } from "lucide-react";
import { useState, type ReactNode } from "react";

// ── Individual tech icon ───────────────────────────────────────────────────

interface TechIconProps {
  name: string;
  size?: number;
}

/**
 * Renders a brand icon for the given technology name using skillicons.dev.
 * Theme is read from the active site theme (light/dark).
 * Falls back to a generic code icon for unknown techs.
 *
 * Uses a plain <img> tag because skillicons.dev serves SVGs, which Next.js
 * Image optimization cannot handle (returns 400 errors).
 */
export function TechIcon({ name, size = 20 }: TechIconProps) {
  const { theme } = useTheme();
  const url = skillIconUrl(name, theme);

  if (!url) {
    // Fallback: generic terminal/code icon
    return <Code size={size} aria-label={name} role="img" />;
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element -- skillicons.dev SVGs can't use next/image */
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      aria-label={name}
      role="img"
      style={{ objectFit: "contain" }}
      loading="lazy"
      suppressHydrationWarning
    />
  );
}

// ── Reusable tooltip wrapper ───────────────────────────────────────────────

interface TooltipProps {
  label: string;
  children: ReactNode;
}

/**
 * Wraps a child element and shows an animated floating label above it on hover.
 * The tooltip animates in/out from above so it never covers the child.
 */
export function Tooltip({ label, children }: TooltipProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 10 },
            }}
            exit={{ opacity: 0, y: 8, scale: 0.6 }}
            className="absolute -top-9 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-3 py-1.5 text-xs shadow-xl whitespace-nowrap pointer-events-none"
          >
            <div className="absolute inset-x-8 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute -bottom-px left-8 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
            <div className="relative z-30 font-semibold text-white font-mono">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

// ── Tech icon row with tooltip ─────────────────────────────────────────────

interface TechIconsRowProps {
  techStack: string[];
  max?: number;
  size?: number;
}

/**
 * Renders a horizontal row of tech icons with a "+N" overflow indicator.
 * Each icon shows an AnimatedTooltip-style floating label on hover.
 */
export function TechIconsRow({
  techStack,
  max = 5,
  size = 20,
}: TechIconsRowProps) {
  const visible = techStack.slice(0, max);
  const overflow = techStack.length - max;

  return (
    <div
      className="flex items-center gap-1.5"
      role="list"
      aria-label="Technologies used"
    >
      {visible.map((tech) => (
        <div key={tech} role="listitem">
          <Tooltip label={tech}>
            <TechIcon name={tech} size={size} />
          </Tooltip>
        </div>
      ))}
      {overflow > 0 && (
        <span
          className="text-[10px] font-mono"
          style={{ color: "var(--text-muted)" }}
          title={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
