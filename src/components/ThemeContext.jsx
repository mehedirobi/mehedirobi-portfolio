import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

const THEME_KEY = "theme";

/**
 * Apply theme to DOM safely
 */
const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  /**
   * INIT (no flicker + SSR safe pattern ready)
   */
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);

    const systemPrefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

    const initialTheme = saved || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  /**
   * SYNC
   */
  useEffect(() => {
    if (!theme) return;

    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  /**
   * TOGGLE (stable function)
   */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme || "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};