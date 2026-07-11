"use client";

import { useTheme } from "@/components/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "home", href: "#hero" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "achievements", href: "#achievements" },
  { label: "experience", href: "#experience" },
  { label: "github", href: "#github" },
  { label: "codeforces", href: "#codeforces" },
];

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(NAV_LINKS[0].label);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress (0-100%)
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0,
      );

      const THRESHOLD = 200;

      // Find the last (bottom-most) section whose top has scrolled past the threshold.
      // Iterating forward gives us the section closest to the bottom that is still
      // "at or above" the threshold line — that's the section the user is currently viewing.
      let current = NAV_LINKS[0].label;

      for (const link of NAV_LINKS) {
        if (link.external) continue; // skip external links (they have no section)
        const el = document.querySelector(link.href);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= THRESHOLD) {
          current = link.label;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialise on mount (handles page load with hash fragment)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--bg-nav)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-primary)"
          : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-md)" : "none",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-150"
        style={{
          width: `${scrollProgress}%`,
          background:
            "linear-gradient(90deg, var(--text-accent), var(--text-accent-secondary))",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/#hero"
          className="text-code text-sm flex items-center gap-1.5 transition-colors"
          style={{ color: "var(--text-accent)" }}
        >
          <span style={{ color: "var(--text-muted)" }}>~/</span>
          <span className="font-bold">
            {new URL(process.env.NEXT_PUBLIC_BASE_URL!).hostname}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-small text-xs px-3 py-1.5 rounded transition-all duration-200"
                style={{
                  color:
                    activeSection === label
                      ? "var(--text-accent)"
                      : "var(--text-muted)",
                  background:
                    activeSection === label ? "var(--bg-badge)" : "transparent",
                  border:
                    activeSection === label
                      ? "1px solid var(--border-accent)"
                      : "1px solid transparent",
                }}
              >
                {label}
                <ExternalLink size={10} className="inline-block ml-1 -mt-0.5" />
              </a>
            ) : (
              <Link
                key={label}
                href={`/${href}`}
                className="text-small text-xs px-3 py-1.5 rounded transition-all duration-200"
                style={{
                  color:
                    activeSection === label
                      ? "var(--text-accent)"
                      : "var(--text-muted)",
                  background:
                    activeSection === label ? "var(--bg-badge)" : "transparent",
                  border:
                    activeSection === label
                      ? "1px solid var(--border-accent)"
                      : "1px solid transparent",
                }}
              >
                {label}
              </Link>
            ),
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-md transition-colors"
            style={{
              color: "var(--text-secondary)",
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden px-4 pb-4 overflow-hidden"
            style={{
              background: "var(--bg-nav)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href, external }) =>
                external ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="text-small text-sm px-3 py-2 rounded transition-colors"
                    style={{
                      color: "var(--text-secondary)",
                      background: "transparent",
                    }}
                  >
                    {label}
                    <ExternalLink
                      size={10}
                      className="inline-block ml-1 -mt-0.5"
                    />
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={`/${href}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-small text-sm px-3 py-2 rounded transition-colors"
                    style={{
                      color:
                        activeSection === label
                          ? "var(--text-accent)"
                          : "var(--text-secondary)",
                      background:
                        activeSection === label
                          ? "var(--bg-badge)"
                          : "transparent",
                    }}
                  >
                    {label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
