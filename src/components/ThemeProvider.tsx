"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage (if available) or the class set by beforeInteractive script
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      try {
        const stored = localStorage.getItem("portfolio-theme") as Theme | null;
        if (stored === "light" || stored === "dark") return stored;
      } catch {
        // localStorage unavailable
      }
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "dark";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Always render children immediately — no visibility:hidden flash */}
      {children}
    </ThemeContext.Provider>
  );
}
